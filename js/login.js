
let emailDom= document.getElementById("E-mail");
let passwordDom= document.getElementById("contraseña")


document.getElementsByClassName("btn btn-primary")[0].addEventListener('click', function() {

    if (emailDom.value == '' || passwordDom.value == '') {

        alert('Ingrese todos los campos requeridos');
        
    } else {

        window.location.href = "./Findex.html"

    }
localStorage.setItem("Username", emailDom.value);

})