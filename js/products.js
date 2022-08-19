const autos= "https://japceibal.github.io/emercado-api/cats_products/101.json"
let productsArray = [];

function showProductsList (array){
    let htmlContentToAppend = '<div class="text-center p-4"><h2>Productos</h2><p class="lead">Verás aquí todos los productos de la categoría Autos</p></div>';
    for(let i = 0; i < array.products.length; i++){
        let products = array.products[i];

    
            htmlContentToAppend += `
            <div onclick="setCatID(${products.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" alt="foto auto" class="img-thumbnail"> 
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name} - ${products.currency}${products.cost}</h4> 
                            <small class="text-muted">${products.soldCount} vendidos</small>
                            
                        </div>
                        <p class="mb-1">${products.description}</p>
                    </div>
                </div>
            </div>
            `
        
    }
    document.getElementById("products-container").innerHTML = htmlContentToAppend;
}




document.addEventListener("DOMContentLoaded", function(){
    getJSONData(autos).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            showProductsList(productsArray);
        }
    });
});