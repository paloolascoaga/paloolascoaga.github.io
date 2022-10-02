const ProdInfo = PRODUCT_INFO_URL + localStorage.getItem("ProdID") + EXT_TYPE
const CtsProducts = PRODUCT_INFO_COMMENTS_URL  + localStorage.getItem("ProdID") + EXT_TYPE
let ProdInfoArray = [];
let CtsArray = [];



function ShowProductInfo(InfoArray) {
    let htmlContentToAppend = ''

    htmlContentToAppend += `
    <div> 
    <h1 class="display-6 mt-4">${InfoArray.name}</h1>
    <hr>
    <p class="fw-bold">Precio</p>
    <p>${InfoArray.cost}</p> <br>
    <p class="fw-bold">Descripción</p>
    <p>${InfoArray.description}</p> <br>
    <p class="fw-bold">Categoría</p>
    <p>${InfoArray.category}</p> <br>
    <p class="fw-bold">Cantidad de vendidos</p>
    <p>${InfoArray.soldCount}</p>
    <p class="fw-bold">Imagenes Ilustrativas</p>
    <div class="d-flex w-25">
    <img src="${InfoArray.images[0]}" class="img-thumbnail m-2" alt="..."> 
    <img src="${InfoArray.images[1]}" class="img-thumbnail m-2" alt="...">
    <img src="${InfoArray.images[2]}" class="img-thumbnail m-2" alt="...">
    <img src="${InfoArray.images[3]}" class="img-thumbnail m-2" alt="...">
     </div>
</div>
`
;

document.getElementById("info-container").innerHTML = htmlContentToAppend;
};

function Estrellitas(puntos){
    let estrellas ="";
    for(let i = 1; i <= 5; i++){
    if (i<=puntos){
        estrellas += `<span class="fa fa-star checked"></span>`;
    }else{
        estrellas += `<span class="fa fa-star"></span>`;
    }
    
};

return estrellas;

}

function ShowProductCts(CmmsArray) {
    let htmlContentToAppend = ''

for (let i = 0; i < CmmsArray.length; i++) {
    const comment = CmmsArray[i];
    
    htmlContentToAppend += ` 
    <li class="list-group-item fs-6">
  
    <div class="d-flex w-100 ">
      <h5 class="mb-1 fw-bold">${comment.user}</h5>-<small class="fs-6"> ${comment.dateTime}</small> - ${Estrellitas(parseInt(comment.score))}
      
    </div>
    <p class="mb-1">${comment.description}</p>
   
 
    </li>
    
    `
    
}

 document.getElementById("cts").innerHTML += htmlContentToAppend;

};




document.addEventListener("DOMContentLoaded", function () {


    getJSONData(ProdInfo).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProdInfoArray = resultObj.data;
            ShowProductInfo(ProdInfoArray);
        }
    });


     getJSONData(CtsProducts).then(function (resultObj) {
        if (resultObj.status === "ok") {
            CtsArray = resultObj.data;
            ShowProductCts(CtsArray);
        }
    }); 

})