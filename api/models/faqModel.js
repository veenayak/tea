const mongoose=require('mongoose');
const db = require('../database');
var model = require('../models/loginModel');

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        index: {unique: true, dropDups: true},
        required: "Oops..question is required what are you doing?"
    },

    createdOn: {
        type : Date,
        default: Date.now()
    },
    updatedOn: {
        type : Date,
        default: Date.now()
    },

    answer: {
        type: String,
        required: "Oops..answer is required what are you doing?",        
    },



});

faqTable = mongoose.model('faqs',faqSchema);     

module.exports={
     
    fetchData:function(callback,req){
        faqTable.find({},function(err, data){
            if(err) callback({message:err.message,status:500});
            return callback({data:data,status:200});
        });
    },
    insertData:function(callback,req){
        model.validateToken(function(data){
            if(data.status==200){                
                faqTable.findOne({question:req.body.question},function (err,data) {
                    if(err) return callback({message:err.message,status:500})
                    if(data === null){  
                        const sa = {question: req.body.question, answer: req.body.answer};

                        const faqData = new faqTable(sa);

                        faqData.save(function (err) {
                            if(err) return callback({message:err.message,status:400})
                            return callback({message:"Faq has been created.",status:200});
                        });
                    }
                    else{
                        return callback({message:"Faq already exists!",status:409});
                    }
                });

            }
            else{
                return callback({message:"Session expired login again" ,status: 498});
            }
        },req.body.token);
    },
    updateData:function(callback,req){
        const sa = {question: req.body.question, answer: req.body.answer, updatedOn:Date.now()};
        model.validateToken(function(data){
            if(data.status==200){                
                faqTable.findOneAndUpdate({_id:req.body.id},sa,function (err,data) {
                    if(err) return callback({message:err.message,status:400})
                    if(data === null){
                        return callback({message:"Faq does not exist" ,status: 401});

                    }
                    else{
                        return callback({message:"Faq has been updated",status:200});
                    }
                });

            }
            else{
                return callback({message:"Session expired login again" ,status: 498});
            }
        },req.body.token);
    },
}
