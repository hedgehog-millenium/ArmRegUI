var express = require('express');
var router = express.Router();
var config = require('../config')
var mongojs = require('mongojs')

router.get('/', function(req, res, next) {
  searchString = 'կոմիտաս'
  // db = mongojs(config.db.path,config.db.collections)
  // db.arm_register.find({$text:{$search:"կոմիտաս"}},{score:{$meta:"textScore"}}).sort({score:{$meta:"textScore"}},(err,docs)=>{
  //     res.send(docs);
  // })
});

router.post('/', function(req, res, next) {
   searchText = req.body.searchText
   db = mongojs(config.db.path,config.db.collections)
   db.arm_register.find({$text:{$search:searchText}},{score:{$meta:"textScore"}}).sort({score:{$meta:"textScore"}}).limit(500,(err,docs)=>{
      res.send(docs);
  })   
})

router.post('/searchByAdress',(req,res,next)=>{
  srch_address = req.body.address
   db = mongojs(config.db.path,config.db.collections)
   db.arm_register.find({'address':{'$eq':srch_address}}).limit(100,(err,docs)=>{
      res.send(docs);
  })     
});

module.exports = router;


