var model = require('../models/subscriberModel');

module.exports={
    
    insertSubscriber:function(req, res){
      
        model.insertSubscriber(function(data){
            res.send(data);
        },req);
    },
    fetchSubscriber:function(req, res){
      
        model.fetchSubscriber(function(data){
            res.send(data);
        },req);
    },

}