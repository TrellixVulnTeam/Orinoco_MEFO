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
let fName = document.getElementById('firstName');
let lName = document.getElementById('lastName');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');

formSubmit.addEventListener('click', () => {
    let userDetails = [];
    let products = [];
    let cartItems = JSON.parse(localStorage.getItem('cart'));

    for (let i = 0; i < cartItems.length; i++) {
      let cameraId = cartItems[i].cameraId;
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

    if (fName.value == "") {
      alert("Please enter your first name.");
      fName.focus();
      return false;
    }
    if (lName.value == "") {
      alert("Please enter your last name.");
      lName.focus();
      return false;
    }
    if (address.value == "") {
      alert("Please enter your address.");
      address.focus();
      return false;
    }
    if (city.value == "") {
      alert("Please enter your city.");
      city.focus();
      return false;
    }
    if (email.value == "") {
      alert("Please enter a valid e-mail address.");
      email.focus();
      return false;
    }
    if (email.value.indexOf("@", 0) < 0) {
      alert("Please enter a valid e-mail address.");
      email.focus();
      return false;
    }
    if (email.value.indexOf(".", 0) < 0) {
      alert("Please enter a valid e-mail address.");
      email.focus();
      return false;
    }

    document.querySelector('form').reset();
    localStorage.removeItem('cart');
    localStorage.removeItem('cartNumber');
    sendData(data);
  }
);



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


