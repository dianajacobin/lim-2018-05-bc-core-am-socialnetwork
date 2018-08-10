expresionCorreo = /\w+@[a-z]+\.+[a-z]/;

const emailValidation = (email,password)=>{
  if (email.trim().length === 0 || password.trim().length === 0) {
    showMessage('dangerMessage', 'Debe de ingresar email y contraseña');
    return;
  }  
  if (!expresionCorreo.test(email)){
    alert('El correo electrónico no es valido'); 
    return;   
  }
  if (password.length<7){
    alert('La contraseña debe ser mayor de 6 caracteres'); 
    return; 
  }
  else {
    login(email,password);
  }
}

const registroValidation = (email,password)=>{
  if (email.trim().length === 0 || password.trim().length === 0) {
    showMessage('dangerMessage', 'Debe de ingresar email y contraseña');
    return;
  }  
  if (!expresionCorreo.test(email)){
    alert('El correo electrónico no es valido'); 
    return;   
  }
  if (password.length<7){
    alert('La contraseña debe ser mayor de 6 caracteres'); 
    return; 
  }
  else {
    registro(email,password);
  }
}