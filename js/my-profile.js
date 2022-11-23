let EmailProfile= ''
let PrimerNombre = document.getElementById("primnombre");
let SegundoNombre= document.getElementById("segnombre");
let PrimerApellido= document.getElementById("PrimApellido"); 
let SegundoApellido= document.getElementById("segapellido");
let Telefono = document.getElementById("tel");




document.addEventListener('DOMContentLoaded', function() {
    MostrarEmail();
    MostrarLS();
    
})

function MostrarEmail(){
    EmailProfile = localStorage.getItem("Username")
    document.getElementById("emailjj").value = EmailProfile

   

}

(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
         
        }
    GuardarLS()
    MostrarLS()

        form.classList.add('was-validated')
      }, false)
    })
  })()

function GuardarLS() {
    localStorage.setItem("Nombre", PrimerNombre.value);
    localStorage.setItem("Apellido", PrimerApellido.value);
    localStorage.setItem("TelContacto", Telefono.value);
    localStorage.setItem("SeguNombre", SegundoNombre.value);
    localStorage.setItem("SeguApellido", SegundoApellido.value);

}

function MostrarLS(){
    PrimerNombre.value = localStorage.getItem("Nombre") 
    PrimerApellido.value =   localStorage.getItem("Apellido") 
    Telefono.value = localStorage.getItem("TelContacto")
    SegundoNombre.value = localStorage.getItem("SeguNombre")
    SegundoApellido.value = localStorage.getItem("SeguApellido") 
}

