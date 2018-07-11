const registrar = () => {
    let email = document.getElementById('email').value,
    password = document.getElementById('password').value;

    // Registrar Usuario FIREBASE
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
   
}