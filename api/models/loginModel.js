const mongoose=require('mongoose');
const db = require('../database');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs')
const saltRounds = 10;
const TokenGenerator = require('uuid-token-generator');
const  { nanoid } = require('nanoid');

const nodemailer = require('nodemailer');


const loginSchema = new mongoose.Schema({

    email:  { 
        type: String, 
        index: true, 
        unique: true,

        validate: [ isEmail, 'You have entered invalid email.Try again' ],
        required: "Oops..email is required what are you doing?"
    },
    password: {
        type: String, 
        required: "Oops..password is required what are you doing?"

    },
    token: {
        type: Object,
        value:{
            type: String,
            required: true
        },
        expiryTime: {
            type: Date,
            default:  Date.now(),
            required: true,
        },
        creationTime:{
            type : Date,
            default: () => Date.now() + 12*60*60*1000,
            required: true
        }       
    },
    lastLogin : {
        type : Date,
        default: Date.now()
    }

    
});

loginSchema.pre('save', async function(next) {
    if(!this.isModified("password")) {
        next();
    }
    try {
        this.password = await bcrypt.hash(this.password, saltRounds);
        next();
    } 
    catch (err) {
        next(err);
    }
});


loginTable = mongoose.model('logins',loginSchema);


module.exports={
     
    validatePassword:function(callback,req){
        const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);
        const token =  {
            value : tokgen.generate(),
            expiryTime : Date.now() + 12*60*60*1000,
            creationTime : Date.now(),
            email : req.body.email
        } 
         loginTable.findOne({email: req.body.email}, function(err,data){
            if(err) return callback({messsage:err});
            if(data === null){
                return callback({message:"incorrect email or password" ,status: 401});
            }
            else{
                bcrypt.compare(req.body.password, data.password, function(err, res) {
                    if(err) return callback({messsage:err});                
                    if (res){
                        data.token = token;
                        data.save();
                        return callback({message:"success" ,status: 200 ,token: token});
                    } 
                    else {
                        return callback({message:"incorrect email or password" ,status: 401});
                    }
                });
            }            
        });
    },

    validateToken:function(callback,req){
        loginTable.findOne({email: req.email}, function(err,data){
            if(err) return callback({messsage:err});
            if(data === null) return callback({message:"Email does not exist" ,status: 401});
            if(data.token.value === req.value){
                return callback({message:"success" ,status: 200});
            }
            else{
                return callback({message:"Session expired login again" ,status: 498});
            }
        });
    },

    // updatePassword:function(callback,req){
    //     loginTable.findOne({email: req.body.email}, function(err,data){
    //         if(err) return callback({messsage:err});
    //         if(data === null) return callback({message:"Email does not exist" ,status: 401});
    //         if(data.token.value === req.body.token){
    //             data.password = req.body.newPassword;
    //             data.save();
    //             return callback({message:"Your pasword has been changed." ,status: 200});
    //         }
    //         else{
    //             return callback({message:"Session expired login again" ,status: 498});
    //         }
    //     });
    // },

    insertUser:function(callback,req){

        const data = {email: req.body.email, password: req.body.password};

        const loginData = new loginTable(data);
        loginData.save(function (err) {
            if(err) return callback({messsage:err.errors})
            return callback({message:"success",status: 200});
        });
        
    }

}
// const code = nanoid();
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'dungeon8888@gmail.com',
        //         pass: 'dungeon@2015'
        //     }
        // });

        // const mailOptions = {
        //     from: 'dungeon8888@gmail.com',
        //     to: email,
        //     subject: 'Sending Email using Node.js',
        //     text: 'That was easy!'
        // };

        // transporter.sendMail(mailOptions, function(error, info){
        //     if (error) {
        //         console.log(error);
        //         return callback({message:error,status:500});
        //     }
        //     else {
        //         if(data == null){
        //             const subscriberData = new subscriberTable({email: email, code: code});
        //             subscriberData.save(function (err) {
        //                 if(err) return callback({messsage:err})
        //                 return callback({message:"success",code: cod,status:200});
        //             });
        //         }
        //         else{
        //             data.email = email;
        //             data.code = code;
        //             data.save(function (err) {
        //                 if(err) return callback({messsage:err})
        //                 return callback({message:"success",code: code,status:200});
        //             });
        //         }
        //     }
        // });