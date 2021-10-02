let cartItems = JSON.parse(localStorage.getItem('cart'));
const tableHtml = document.getElementById('result');

    
if (typeof(Storage) !== "undefined") {
    for (let i in cartItems) {
        console.log(cartItems[i]);

        let name = cartItems[i].name;
        let cameraName = document.createElement('td');
        cameraName.innerHTML = name;
        result.appendChild(cameraName);

        let price = cartItems[i].price.toFixed(2)/100;
        let cameraPrice = document.createElement('td');
        cameraPrice.innerHTML = `$` + price;
        result.appendChild(cameraPrice);
        
        let selectLenses = cartItems[i].selectLenses;
        let select = document.createElement("td");
        select.innerHTML = selectLenses;
        result.appendChild(select);

        let imageUrl = document.createElement('img');
        imageUrl.src = cartItems[i].imageUrl;
        imageUrl.style.height = '20%';
        imageUrl.style.width = '20%';
        document.getElementById('result').appendChild(imageUrl);

    }
}


/*
    let tr = document.createElement('tr');
    let imageCart = document.createElement('img');
    let nameCart = document.createElement('p');
    let lensCart = document.createElement('td');
    let priceCart = document.createElement('td');
    let btnRemoveCart = document.createElement('td');
    let divNameCart = document.createElement('td');
    let quantityCart = document.createElement('td');
*/
