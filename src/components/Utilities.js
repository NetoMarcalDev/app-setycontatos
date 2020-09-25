export function testValidPhone(number) {

 if(number.length <= 8) {  
    
    return false;
  }
  
  if(number.length === 9) {
    
    if(number.charAt(0) === '4' || number.charAt(0) === '3') {
      return true;
    }
    else {
      return false;      
    }
  }

  if(number.length === 11) { 
    
    if((number.charAt(0) === '9') && ((number.charAt(2) === '9') || (number.charAt(2) === '8') )) {     
     
      return true;
    }
    else {
     
      return false;
    }
  } 
    
}