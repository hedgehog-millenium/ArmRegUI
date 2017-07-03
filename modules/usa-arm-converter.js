
usaLetterDict = {
    'a':'ա',
    'b':'բ',
    'c':'ց',
    'd':'դ',
    'e':'ե',
    'f':'ֆ',
    'g':'գ',
    'h':'հ',
    'i':'ի',
    'j':'ջ',
    'k':'կ',
    'l':'լ',
    'm':'մ',
    'n':'ն',
    'o':'ո',
    'p':'պ',
    'q':'ք',
    'r':'ր',
    's':'ս',
    't':'տ',
    'u':'ու',
    'v':'վ',
    'w':'օ',
    'x':'խ',
    'y':'յ',
    'z':'զ',
    'ch':'չ',
    'zh':'ժ',
    'gh':'ղ',
    'th':'թ',
    'ph':'փ',
    'jh':'ճ',
    'dz':'ձ',
    'ts':'ծ',
    'r`':'ռ',
    'y`':'ը',
    'e`':'է',
    '&':'և'
}

module.exports= {    
    convertToArm:convertToArm2
}

function convertToArm(usatext){
    armstring = ''
    for ( r in usatext )
        armstring+= usaLetterToArm(usatext[r])
    return armstring
}

function usaLetterToArm(letter){    
    var arm_let = usaLetterDict[letter]
    return arm_let?arm_let:letter
}

function convertToArm2(usatext){
    armstring = ''
    var i=0
    while (i<usatext.length){
        var arm_let = usaLetterDict[usatext.substr(i,2)]
        if(arm_let){
            armstring+=arm_let
            i+=2
            continue;
        
        }       
        armstring+=usaLetterToArm(usatext.substr(i,1))
        i +=1        
    }
    return armstring
}