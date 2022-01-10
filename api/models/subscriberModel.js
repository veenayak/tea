const mongoose=require('mongoose');
const db = require('../database');
var model = require('../models/loginModel');

const { isEmail } = require('validator');

const subscriberSchema = new mongoose.Schema({
    email: { 
        type: String, 
        index: true, 
        unique: true,

        validate: [ isEmail, 'You have entered invalid email.Try again' ],
        required: "Oops..email is required what are you doing?"
    },
    createdOn: {
        type : Date,
        default: Date.now()
    }    

});

subscriberTable = mongoose.model('subscribers',subscriberSchema);


module.exports={

    insertSubscriber:function(callback,req){

        const email = req.body.email;
        subscriberTable.findOne({email:email},function (err,data) {
            if(err) return callback({messsage:err})
            if(data === null){
                const subscriberData = new subscriberTable({email: email});
                subscriberData.save(function (err) {
                    if(err) return callback({message:err.errors.email.message,status:400})
                    return callback({message:"Thanks for subscribing we will notify you about all the updates!",status:200});
                });
            }
            else{
                return callback({message:"You are already subscribed!",status:409});
            }
        });
    },
    fetchSubscriber:function(callback,req){
        model.validateToken(function(data){
            if(data.status==200){
                subscriberTable.find({},function (err,data) {
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
