const expresReg =/[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;

const loginValidation = (email, password) => {
        if(email==''|| password=='')
        {
            alert ('Complete los espacios en blanco');
        } 
        else if(password.length<=6)
        {alert('La cantidad minima son 6 caracteres');}

        else if (!expresReg.test(email))
             {alert('Correo electrónico no es valido');}
        else {
            ingresoVal(email,password);
        }
}

