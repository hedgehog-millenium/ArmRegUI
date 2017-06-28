const express = require('express');
const router = express.Router();
const repo = require('../repo/RegistersRepoMongo')

router.get('/', function(req, res, next) {
  searchString = 'կոմիտաս'
  // db = mongojs(config.db.path,config.db.collections)
  // db.arm_register.find({$text:{$search:"կոմիտաս"}},{score:{$meta:"textScore"}}).sort({score:{$meta:"textScore"}},(err,docs)=>{
  //     res.send(docs);
  // })
});

router.post('/', function(req, res, next) {
   searchText = req.body.searchText  
   repo.SearchRegister(searchText).then(docs=>{
     res.send(docs);
   }).catch(err=>{     
      res.status(503).send({message:'Please check Database connection !'});
   })   
})

router.post('/searchByAdress',(req,res,next)=>{
    srch_address = req.body.address
    repo.SearchByAdress(srch_address).then(docs=>{
        res.send(docs);
    }).catch(err=>{        
        res.status(503).send({err});
    })   
});

router.post('/SearchByFieldValue',(req,res,next)=>{
    fld_name = req.body.field
    schText = req.body.searchText    
    repo.SearchByFieldValue(fld_name,schText).then(docs=>{
        res.send(docs);
    }).catch(err=>{        
        res.status(503).send({err});
    })   
});


module.exports = router;


