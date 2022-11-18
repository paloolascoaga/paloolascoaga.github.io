const CarritoId = CART_INFO_URL + "25801" + EXT_TYPE; 
let Cart = ""
let envio= ""
 


document.addEventListener("DOMContentLoaded", function () {


    getJSONData(CarritoId).then(function (resultObj) {
        if (resultObj.status === "ok") {
            Cart = resultObj.data;
            ShowCart(Cart);
            document.getElementById("tarj").checked = true
            envio = 0.15
            document.getElementById("flexRadioDefault1").checked = true
            Envio();
            InputD();
            FormPago();
            
            


            (() => {
              'use strict'
            
              const forms = document.querySelectorAll('.needs-validation')
            
              Array.from(forms).forEach(form => {
                form.addEventListener('submit', event => {
                  if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                  } else {
                    document.getElementsByTagName('body')[0].innerHTML += `
                    <div class="alert alert-success" role="alert">
                    Has comprado con éxito!
                    </div>`
                  }

                  modalPago();

                  
            
                  form.classList.add('was-validated')
                }, false)
              })
            })()
            
            
        }


    });

})

function ShowCart (Carrito) {
    let htmlContentToAppend = ''
    let CartProd = Carrito.articles[0]

    htmlContentToAppend += `
    <h1 class="text-center">Carrito De Compras</h1>
    <h2 class="fs-3">Artículos a comprar</h2>
    <table class="table">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Nombre</th>
      <th scope="col">Costo</th>
      <th scope="col">Cantidad</th>
      <th scope="col">Subtotal</th>
    </tr>
  </thead>
  <tbody class="table-group-divider">
    <tr>
      <th scope="row" class="col-lg-3"> <img class="img-thumbnail" style="width:30%" src="${CartProd.image}"> </th>
      <td>${CartProd.name}</td>
      <td>${CartProd.currency} ${CartProd.unitCost}</td>
      <td><input class="form-control"type="number" value="${CartProd.count}" id="cant" min="1" required></td>
      <td class="fw-bold" id="cant2">${CartProd.currency} ${CartProd.unitCost*CartProd.count}</td>
    </tr>
  </tbody>
</table>

<hr>
<h2 class="fs-3 mb-4">Tipo de Envío</h2>


<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
  <label class="form-check-label" for="flexRadioDefault1">
    Premium 2 a 5 días (15%)
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
  <label class="form-check-label" for="flexRadioDefault2">
    Express 5 a 8 días (7%)
  </label>
</div>
<div class="form-check mb-3">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3">
  <label class="form-check-label" for="flexRadioDefault3">
    Standard 12 a 15 días (5%)
  </label>
</div>

<div class="mb-3 row">
<div class="col-6">
    <label for="exampleFormControlInput1" class="form-label">Calle</label>
    <input type="address" class="form-control" id="exampleFormControlInput1" required> 
    <div class="invalid-feedback">
        Ingresa una calle
      </div>
</div>
<div class="col-3">
    <label for="exampleFormControlInput2" class="form-label">Número</label>  
    <input type="text" class="form-control" id="exampleFormControlInput2" required> 
    <div class="invalid-feedback">
        Ingresa un número
      </div>
</div>
<div class="col-6 mt-3">
    <label for="exampleFormControlInput3" class="form-label">Esquina</label>  
    <input type="text" class="form-control" id="exampleFormControlInput3" required> 
    <div class="invalid-feedback">
       Ingresa una esquina
      </div>
</div>
</div> 

<hr>
<h2 class="fs-3 mb-4">Costos</h2>
<ul class="list-group col-10">
  <li class="list-group-item"> <p class="fw-bold">Subtotal</p>
  <p class="small">Costo unitario del producto por cantidad</p> <p>USD ${CartProd.unitCost}</p>
  </li>
  <li class="list-group-item"><p class="fw-bold">Costo de envío</p>
  <p class="small">Según el tipo de envío</p> <p id="envio"></p>
  </li>
  <li class="list-group-item fw-bold" id="Ttl">Total ($) <p id="total" class="fw-bold"></p></li>
</ul>

<hr> 
<h2 class="fs-3 mb-4">Forma de Pago</h2>
<p id="pago">No ha seleccionado</p> 

<a type="button" id="modal-btn" class="link-primary mb-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
Seleccionar
</a>
<div class="invalid-feedback">
        Debe seleccionar una forma de pago
      </div>


<div>
<button type="submit" class="btn btn-primary btn-lg col-10" id="FC">Finalizar Compra</button></div>

<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
      
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Forma de Pago</h1>
      </div>
      <div class="modal-body">
      <div class="form-check mb-3">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="tarj">
  <label class="form-check-label" for="tarj">
   Tarjeta de crédito </label>
   <hr>
   <div class="mb-3 row">
   <div class="col-6">
       <label for="nrotarj" class="form-label">Número de tarjeta</label>
       <input type="address" class="form-control" id="nrotarj" required> 
   </div>
   <div class="col-4">
    <label for="codseg" class="form-label">Código de seg.</label>  
    <input type="text" class="form-control" id="codseg" required> 
</div>
<div class="col-6 mt-3">
    <label for="venc" class="form-label">Vencimiento MM/AA</label>  
    <input type="text" class="form-control" id="venc" required> 
  </div>
  <div class="form-check mb-3">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="transf">
  <label class="form-check-label" for="transf">
   Transferencia bancaria </label>
   <hr>
   <div class="mb-3 row">
   <div class="col-6">
       <label for="nrocuenta" class="form-label">Número de cuenta</label>
       <input type="address" class="form-control" id="nrocuenta" required> 
   </div>
</div>
</div>
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
      </div>

    </div>


    
  </div>
</div>



`

document.getElementsByClassName("container")[1].innerHTML = htmlContentToAppend;
}

function Subtotal(){ 
    document.getElementById("cant2").innerHTML = "USD " + 15200 * parseInt(document.getElementById("cant").value)
}

document.addEventListener("change", Subtotal)

function Envio(){
  

  if (document.getElementById("flexRadioDefault1").checked){
    envio = parseInt(document.getElementById("cant2").textContent.slice(3))*0.15 
    document.getElementById("envio").innerHTML = "USD " + envio
    document.getElementById("total").innerHTML = "USD " + (envio + parseInt(document.getElementById("cant2").textContent.slice(3)))
    
    
  }

  else if (document.getElementById("flexRadioDefault2").checked) {
    envio = parseInt(document.getElementById("cant2").textContent.slice(3))*0.07
    document.getElementById("envio").innerHTML = "USD " + envio
    document.getElementById("total").innerHTML = "USD " + (envio + parseInt(document.getElementById("cant2").textContent.slice(3)))

  }

  else if (document.getElementById("flexRadioDefault3").checked){
    envio = parseInt(document.getElementById("cant2").textContent.slice(3))*0.05
    document.getElementById("envio").innerHTML = "USD " + envio
    document.getElementById("total").innerHTML = "USD " + (envio + parseInt(document.getElementById("cant2").textContent.slice(3)))
  }

}


document.addEventListener("change", Envio)


function InputD(){
  if (document.getElementById("tarj").checked) {
    document.getElementById("nrocuenta").disabled = true
    document.getElementById("nrotarj").disabled = false
    document.getElementById("codseg").disabled = false
    document.getElementById("venc").disabled = false
  }
  else if(document.getElementById("transf").checked) {
    document.getElementById("nrotarj").disabled = true
    document.getElementById("codseg").disabled = true
    document.getElementById("venc").disabled = true
    document.getElementById("nrocuenta").disabled = false

    
  }
}
document.addEventListener("input", InputD)

function FormPago(){
  if  (document.getElementById("tarj").checked) {
    document.getElementById("pago").innerHTML = "Tarjeta de crédito"
  } else if (document.getElementById("transf").checked) {
    document.getElementById("pago").innerHTML = "Transferencia bancaria"
  }
}
document.addEventListener("input", FormPago)

function modalPago(){

  if(document.getElementById("nrotarj").checkValidity() && document.getElementById("codseg").checkValidity() && document.getElementById("venc").checkValidity() && document.getElementById("nrocuenta").checkValidity()===true){
    document.getElementById("modal-btn").classList.add('is-valid');
    document.getElementById("modal-btn").classList.remove('is-invalid');
  } else {
    document.getElementById("modal-btn").classList.remove('is-valid');
    document.getElementById("modal-btn").classList.add('is-invalid');
  }

}



  





