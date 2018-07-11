module.exports= {    
    IsTextInEnglish:IsTextInEnglish
}

function IsTextInEnglish(text){
    text = text.replace(/[&\/\\#,@+()!^_$~%.'":*?<>{}]/g,'');    
    return text.match(/^[A-Za-z0-9 ]*$/)
}