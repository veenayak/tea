const mongoose=require('mongoose');
const db = require('../database');
const { isEmail } = require('validator');
var model = require('../models/loginModel');

const contactSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: "Oops..name is required what are you doing?"

    },
    email: { 
        type: String, 
        validate: [ isEmail, 'You have entered invalid email.Try again' ],
        required: "Oops..email is required what are you doing?"
    },
    message: {
        type: String, 
        required: "Oops..message is required what are you doing?"
    },
    createdOn: {
        type : Date,
        default: Date.now()
    }   
});


contactTable = mongoose.model('contacts',contactSchema);

module.exports={

    insertMessage:function(callback,req){
        const email = req.body.email;
        const name = req.body.name;

        const message = req.body.message;

        const contactData = new contactTable({email: email,name: name, message: message});
        contactData.save(function (err) {
            if(err) return callback({message:err.errors,status:400})
            return callback({message:"Thanks for contacting we will reach out to you soon!",status:200});
        });
    },
    fetchMessage:function(callback,req){

        model.validateToken(function(data){
            if(data.status==200){
                contactTable.find({},function (err,data) {
                    if(err) return callback({message:err.errors,status:400})
                    return callback({data:data,status:200});
                });
            }
            else{
                return callback({message:"Session expired login again" ,status: 498});
            }
        },req.body.token);
      
    },


}
