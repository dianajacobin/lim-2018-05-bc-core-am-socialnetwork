//Cerrar Sesion
const btnLogout = document.getElementById("btnLogout");

function addPost(newPost, post_value, userId, userNom) {
    console.log(newPost);
    console.log(post_value);
    console.log(userId);
    console.log(userNom);
    var nomUsuario = document.createElement("label");
    nomUsuario.setAttribute("for", "");
    nomUsuario.setAttribute("type", "label");

    var btnUpdate = document.createElement("input");
    btnUpdate.setAttribute("value", "Modificar");
    btnUpdate.setAttribute("type", "button");


    var btnDelete = document.createElement("input");
    btnDelete.setAttribute("value", "Eliminar");
    btnDelete.setAttribute("type", "button");

    var btnLike = document.createElement("input");
    btnLike.setAttribute("value", "Like");
    btnLike.setAttribute("type", "button");

    var cantLikes = document.createElement("label");
    cantLikes.setAttribute("for", "");
    cantLikes.setAttribute("type", "label");

    var contPost = document.createElement('div');
    //var textPost = document.createElement('p');


    var textPost = document.createElement('textarea');
    textPost.setAttribute("id", newPost);


    textPost.innerHTML = post_value;
    nomUsuario.innerHTML = userNom + "  publicó...";
    textPost.disabled = true;

    var contador = 0;

   

        if (userId = 0) {
            console.log("Debe estar logueado");
        }
        else {
            contador++;
            if (contador == 1) {
                cantLikes.innerText = contador;
            }
            else {
                alert("Solo puedes dar 1 like");
            };

        };
    };

    

        if (window.confirm("¿Estás seguro de eliminar tu publicación?") == true) {

            //esto es en base de datos  
            firebase.database().ref().child('/user-posts/' + userId + '/' + newPost).remove();
            firebase.database().ref().child('posts/' + newPost).remove();
            //DOM

            const dbRef = firebase.database().ref();
            const userPostsRef = dbRef.child('user-posts');


            userPostsRef.on("child_added", snap => {
                let userPost = snap.val();
                /*let $li = document.createElement("li");
                $li.innerHTML = user.name;
                $li.setAttribute("child-key", snap.key); 
                $li.addEventListener("click", userClicked)
                userListUI.append($li);*/
                console.log("USER POST:")
                console.log(userPost);

                //addPost(userPost, userPost.body, userPost.uid, userNom);

            });

            //elimina todos los posts solo en js
            while (posts.firstChild) posts.removeChild(posts.firstChild);

            alert('El usuario ha sido eliminado con éxito!');

        }
        else {
            alert("Se procedió a cancelar");
        }


    });

   /*  btnUpdate.addEventListener('click', () => { */
window.
        textPost.disabled = false;

        
        btnUpdate.setAttribute("value", "Guardar");

      

        const newUpdate = document.getElementById(newPost);

        //alert("El post ha sido modificado correctamente");

        const nuevoPost = {
            body: newUpdate.value,
        };

        var updatesUser = {};
        var updatesPost = {};
        
        updatesUser['/user-posts/' + userId + '/' + newPost] = nuevoPost;
        updatesPost['/posts/' + newPost] = nuevoPost;

        console.log(nuevoPost);


        firebase.database().ref().update(updatesUser);
        firebase.database().ref().update(updatesPost);
    })

    //contPost.appendChild(logo);
    contPost.appendChild(nomUsuario);
    contPost.appendChild(textPost);
    contPost.appendChild(btnUpdate);
    contPost.appendChild(btnDelete);
    contPost.appendChild(btnLike);
    contPost.appendChild(cantLikes);
    posts.appendChild(contPost);
};


function reload_page() {
    window.location.reload();
}