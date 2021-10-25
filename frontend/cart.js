let cartItems = JSON.parse(localStorage.getItem('cart'));
const tableHtml = document.getElementById('result');
let cartNumber = document.getElementById('cartNumber');  

for (let i in cartItems) {

    let itemRow = document.createElement("tr");
    itemRow.style.border = "thin solid silver";

    let imageUrl = document.createElement('img');
    imageUrl.src = cartItems[i].imageUrl;
    imageUrl.style.height = '65%';
    imageUrl.style.width = '65%';
    imageUrl.style.margin = "0.5rem";

    let cameraName = document.createElement('td');
    let name = cartItems[i].name;
    cameraName.innerHTML = name;
    cameraName.style.fontWeight = "600";
    cameraName.style.padding = "1rem";

    let lens = document.createElement('td');
    let selectLenses = cartItems[i].selectLenses;
    lens.innerHTML = selectLenses;
    lens.style.fontSize = "0.8rem";
    lens.style.padding = "1rem";

    let cameraPrice = document.createElement('td');
    let price = cartItems[i].price.toFixed(2)/100;
    cameraPrice.innerHTML = `$` + price;
    cameraPrice.style.fontWeight = "550";
    cameraPrice.style.padding = "1rem";

    tableHtml.appendChild(itemRow);
    itemRow.appendChild(imageUrl);
    itemRow.appendChild(cameraName);
    itemRow.appendChild(lens);
    itemRow.appendChild(cameraPrice);
    
    let quantityTd = document.createElement('td');
    let input = document.createElement('input');
    let quantity = cartItems[i].quantity;
    input.setAttribute('type', 'number');
    input.setAttribute('min', '1');
    input.setAttribute('value', quantity);
        input.addEventListener('change', () => {
	        quantity = Number.parseInt(input.value);
        })
    quantityTd.style.padding = "1rem";
    itemRow.appendChild(quantityTd);
    quantityTd.appendChild(input);

    let deleteBtn = document.createElement('td');
    deleteBtn.innerHTML = `
        <input type="button" class="btn btn-danger" value="Delete" onclick="deleteRow(this)">`;
    deleteBtn.style.paddingRight = "1rem";
    itemRow.appendChild(deleteBtn);
}


/*
function changeQuantity(value) {
  for (let i in cartItems) {
  let quantity = cartItems[i].quantity;
  quantity = parseInt(value);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  totalInCart();
  totalCartPrice();
  }
}
*/


function totalInCart() {
    localStorage.setItem('cartNumber', JSON.stringify(cartItems.length));
    cartNumber.innerHTML = cartItems.length;
}
totalInCart();


function totalCartPrice() {
    let totalHtml = document.getElementById('total');
    let cartPrice = 0;
        if (cartItems) {
            for (let i=0; i < cartItems.length; i++) {
                let cartTotal = cartItems[i].price.toFixed(2)/100;
                let quantity = cartItems[i].quantity;
                let totalPrice = cartTotal * quantity;
                cartPrice += totalPrice;
            }
            if (totalHtml) {
                localStorage.setItem('total', JSON.stringify(cartPrice));
                totalHtml.innerHTML = "Total: $" + cartPrice;
                totalHtml.style.fontSize = "1.5rem";
            }
        }
}
totalCartPrice();


function deleteRow(r) {
  let i = r.parentNode.parentNode.rowIndex;
  document.getElementById("result").deleteRow(i);
  cartItems.splice(i, 1);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  localStorage.setItem('cartNumber', JSON.stringify(cartItems.length));

  totalInCart();
  totalCartPrice();
}


const formSubmit = document.getElementById('formSubmit');

let userDetails = [];
    const addUserDetails = (ev) => {
    ev.preventDefault();

    let products = [];
    let cartItems = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < cartItems.length; i++) {
      let cameraId = cartItems[i]._id;
      products.push(cameraId);
    }

    let contact = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      email: document.getElementById('email').value,
    }
    let data = {
      contact: contact,
      products: products
    }
    console.log(data);
    userDetails.push(contact);

    document.querySelector('form').reset();
    localStorage.removeItem('cart');
    localStorage.removeItem('cartNumber');

    //sendData(data);

}

  document.addEventListener ('DOMContentLoaded', () => {
  document.getElementById ('formSubmit').addEventListener('click', addUserDetails);

});

function sendData(data) {
  fetch('http://localhost:3000/api/cameras/order', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data);

    orderId = data.orderId;
    localStorage.setItem("orderId", orderId);

    location.replace('receipt.html');

  }).catch((error) => console.error("FETCH ERROR:", error))
};


firstName.addEventListener('blur', () => {
    const regName = /^[a-zA-Z]+$/;
    if (!regName.test(firstName.value)) {
      firstName.style.border = 'red solid 1px';
      return false;
    }
    else {
      firstName.style.border = 'green solid 1px';
      isFirstNameValid = true;
    }
})

lastName.addEventListener('blur', () => {
    const regName = /^[a-zA-Z]+$/;
    if (!regName.test(lastName.value)) {
      lastName.style.border = 'red solid 1px';
      return false;
    }
    else {
      lastName.style.border = 'green solid 1px';
      isLastNameValid = true;
    }
})

address.addEventListener('blur', () => {
    if (address.value) {
      address.style.border = 'green solid 1px';
      return false;
    }
    else {
      address.style.border = 'red solid 1px';
      isAddressValid = true;
    }
})

city.addEventListener('blur', () => {
    const regName = /^[a-zA-Z]+$/;
    if (!regName.test(city.value)) {
      city.style.border = 'red solid 1px';
      return false;
    }
    else {
      city.style.border = 'green solid 1px';
      isCityValid = true;
    }
})

email.addEventListener('blur', () => {
    const regName = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!regName.test(email.value)) {
      email.style.border = 'red solid 1px';
      return false;
    }
    else {
      email.style.border = 'green solid 1px';
      isEmailValid = true;
    }
})
    
