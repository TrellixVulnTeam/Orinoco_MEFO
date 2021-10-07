let cartItems = JSON.parse(localStorage.getItem('cart'));
const tableHtml = document.getElementById('result');

    
if (typeof(Storage) !== "cart") {
    for (let i in cartItems) {
        console.log(cartItems[i]);

        let itemRow = document.createElement("tr");

        let imageUrl = document.createElement('img');
        imageUrl.src = cartItems[i].imageUrl;
        imageUrl.style.height = '72%';
        imageUrl.style.width = '72%';
        imageUrl.style.marginTop = "0.5rem";
        imageUrl.style.marginBottom = "0.5rem";
        imageUrl.style.paddingLeft = "0.5rem";

        let cameraName = document.createElement('td');
        let name = cartItems[i].name;
        cameraName.innerHTML = name;
        cameraName.style.fontWeight = "600";

        let lens = document.createElement('td');
        let selectLenses = cartItems[i].selectLenses;
        lens.innerHTML = selectLenses;
        lens.style.fontSize = "0.8rem";
        lens.style.paddingLeft = "0.5rem";

        let cameraPrice = document.createElement('td');
        let price = cartItems[i].price.toFixed(2)/100;
        cameraPrice.innerHTML = `$` + price;
        cameraPrice.style.fontWeight = "550";
        cameraPrice.style.paddingLeft = "0.5rem";

        tableHtml.appendChild(itemRow);
        itemRow.appendChild(imageUrl);
        itemRow.appendChild(cameraName);
        itemRow.appendChild(lens);
        itemRow.appendChild(cameraPrice);
        
        let quantity = document.createElement('td');
        quantity.innerHTML = `<input type="quantity-input" class="col-2" value ="${cartItems[i].quantity}" type="number" value="1">`;
        itemRow.appendChild(quantity);
        quantity.style.paddingLeft = "0.5rem";

        let deleteBtn = document.createElement('td');
        deleteBtn.innerHTML = `<input type="button" value="Delete" data-price="100" onclick="deleteRow(this)">`;
        itemRow.appendChild(deleteBtn);
        deleteBtn.style.paddingRight = "0.5rem";

        itemRow.style.border = "thin solid silver";
        itemRow.style.paddingBottom = "20px";

    }
}

function deleteRow(r) {
    let i = r.parentNode.parentNode.rowIndex;
    document.getElementById("result").deleteRow(i);

    let cartItems = JSON.parse(localStorage.getItem('cart'));
    cartItems.splice(r, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
}
