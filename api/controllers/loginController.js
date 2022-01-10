var model = require('../models/loginModel');

module.exports={
    validatePassword:function(req, res){
      
        model.validatePassword(function(data){
            res.send(data);
        },req)
    },

    validateToken:function(req, res){
      
        model.validateToken(function(data){
            res.send(data);
        },req)
    },

    // updatePassword:function(req, res){
      
    //     model.updatePassword(function(data){
    //         res.send(data);
    //     },req)
    // },

    insertUser:function(req, res){
      
        model.insertUser(function(data){
            res.send(data);
        },req)
    },
    
}