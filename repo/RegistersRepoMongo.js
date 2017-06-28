const mongojs = require('mongojs')
const config = require('../config')
db = mongojs(config.db.path,config.db.collections)
const collection = config.db.collections[0]
const dbConnected = true

db.on('error', function(err) {
   console.log('database connections error.', err)      
});

db.on('timeout', function (err) {
    console.log('database timeout');
});

module.exports = {
    SearchRegister:SearchRegister,    
    SearchByAdress:SearchByAdress,
    SearchByFieldValue:SearchByFieldValue
}


function SearchRegister(criteria){    
    return new Promise((resolve,reject)=>{                
        db[collection].find({$text:{$search:criteria}},{score:{$meta:"textScore"}}).sort({score:{$meta:"textScore"}}).limit(1000,(err,docs)=>{                     
            err?reject(err):resolve(docs);            
        })   
        
    })   
}

function SearchByAdress(searchAddress){
    return new Promise((resolve,reject)=>{
        db[collection].find({address:{$eq:searchAddress}}).limit(500,(err,docs)=>{
            err?reject(err):resolve(docs);            
        })
    })
}

function SearchByFieldValue(field,value){    
    //replace regex vital simbols RegExp.escape(value) ,split by space (split(' ')) , filter empty elements in arrar (filter(Boolean)), attt regex any simbol mutch beetween words(join('.*'))
    var toRegexStyle = RegExp.escape(value)
    var schReg = new RegExp(toRegexStyle.split(' ').filter(Boolean).join('.*'),'i');    
    
    return new Promise((resolve,reject)=>{      
        var query = {};
        query[field] = schReg        
        db[collection].find(query).limit(1000,(err,docs)=>{
            err?reject(err):resolve(docs);            
        })
    })
}

RegExp.escape = function(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
};