const ctgries= "https://japceibal.github.io/emercado-api/cats_products/"+localStorage.getItem("catID")+".json"
const ORDER_ASC_BY_PRICE = "MAY-MEN";
const ORDER_DESC_BY_PRICE = "MEN-MAY";
const ORDER_BY_PROD_SELL = "Rel.";
let productsArray = [];
let currentCriteria = undefined; 
let minCount = undefined;
let maxCount = undefined;



function sortCategories(criteria, array){
    
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( parseInt(a.cost) < parseInt(b.cost )){ return 1; }
            if ( parseInt(a.cost) > parseInt(b.cost)){ return -1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( parseInt(a.cost) > parseInt(b.cost)){ return 1; }
            if ( parseInt(a.cost) < parseInt(b.cost)){ return -1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SELL){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList () {
    
    let htmlContentToAppend = '';
    for(let i = 0; i < productsArray.products.length; i++){
        let products = productsArray.products[i];





        if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))){

    
            htmlContentToAppend += `
            <div onclick="setProdID(${products.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" alt="foto auto" class="img-thumbnail"> 
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name} - ${products.currency}${products.cost}</h4> 
                            <small class="text-muted">${products.soldCount} vendidos </small>
                            
                        </div>
                        <p class="mb-1">${products.description}</p>
                    </div>
                </div>
            </div>
            `
        }
        document.getElementById("products-container").innerHTML = htmlContentToAppend;
    }
    
}


function sortAndShowCategories(sortCriteria, categoriesArray){
    currentCriteria = sortCriteria;

    if(categoriesArray != undefined){
        productsArray.products = categoriesArray;
    }

    productsArray.products = sortCategories(currentCriteria, productsArray.products);

    //Muestro las categorías ordenadas
    showProductsList();
}


function setProdID(id) {
    localStorage.setItem("ProdID", id);
    window.location ="./product-info.html"
}




document.addEventListener("DOMContentLoaded", function(){

    getJSONData(ctgries).then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data;
            document.getElementsByClassName('text-center')[0].innerHTML += '<h2>Productos</h2><p class="lead">Verás aquí todos los productos de la categoría ' + productsArray.catName + '</p>'
            showProductsList(productsArray);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_SELL);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });
});




