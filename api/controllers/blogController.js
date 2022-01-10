var model = require('../models/blogModel');

module.exports={
    fetchData:function(req, res){
      
        model.fetchData(function(data){
            res.send(data);
        },req)
    },
    insertData:function(req, res){
      
        model.insertData(function(data){
            res.send(data);
        },req)
    },
    updateData:function(req, res){
      
        model.updateData(function(data){
            res.send(data);
        },req)
    },
    
    
}