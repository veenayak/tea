var model = require('../models/contactModel');

module.exports={
    
    insertMessage:function(req, res){
      
        model.insertMessage(function(data){
            res.send(data);
        },req);
    },
    fetchMessage:function(req, res){
      
        model.fetchMessage(function(data){
            res.send(data);
        },req);
    },

}