const registrar = () => {
    let email = document.getElementById('email').value; //estamos rescatando el valor del id del input, se jaara del html y se guardaen la varible
    password = document.getElementById('password').value;

    // Registrar Usuario FIREBASE
    firebase.auth().createUserWithEmailAndPassword(email, password)
    //hace una promesa cath, que si no funciona se le pasa una funcion con el ´parametro error
    .catch(function(error) { 
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
   
}