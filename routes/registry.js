const express = require('express');
const router = express.Router();
const repo = require('../repo/RegistersRepoMongo')
const converter = require('../modules/usa-arm-converter')
const languageDetector = require('../modules/language-detector')

router.get('/', function(req, res, next) {
  text = req.query.text  
  convertedText = converter.convertToArm(text)  
  res.send(convertedText)
});

router.post('/', function(req, res, next) {
   searchText = req.body.searchText.toLowerCase();  
   searchText = ImproveSearchText(searchText)

   repo.SearchRegister(searchText).then(docs=>{
     res.send(CreateReturnObject(searchText,docs));
   }).catch(err=>{     
      res.status(503).send({message:'Please check Database connection !'});
   })   
})

router.post('/searchByAdress',(req,res,next)=>{
    srch_address = req.body.address.toLowerCase();    
    repo.SearchByAdress(srch_address).then(docs=>{
        res.send(CreateReturnObject(srch_address,docs));
    }).catch(err=>{        
        res.status(503).send({err});
    })   
});

router.post('/SearchByFieldValue',(req,res,next)=>{
    fld_name = req.body.field
    schText = req.body.searchText.toLowerCase();   
    schText = ImproveSearchText(schText)

    repo.SearchByFieldValue(fld_name,schText).then(docs=>{
        res.send(CreateReturnObject(schText,docs));
    }).catch(err=>{        
        res.status(503).send({err});
    })   
});

function CreateReturnObject(schText,items){
    return {searchText:schText,registries:items}
}

function ImproveSearchText(text){
    if(languageDetector.IsTextInEnglish(text))
        return converter.convertToArm(text)      
    else
        return text
}

module.exports = router;


