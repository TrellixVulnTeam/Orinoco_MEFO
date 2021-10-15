function getProductId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    return id;
}

function getSingleProductId(id) {
    fetch('http://localhost:3000/api/cameras/' + id)
    .then((response) => {
        return response.json();
    })
    .then(data => {
      product = data;
      console.log(product);
      showProduct(data);
    })
    .catch((error) => console.error("FETCH ERROR:", error));
}
const id = getProductId();
getSingleProductId(id);


function showProduct(data) {
    let name = data.name;
    let cameraName = document.createElement('h5');
    cameraName.innerHTML = name;
    nameHtml.appendChild(cameraName);

    let price = data.price.toFixed(2)/100;
    let cameraPrice = document.createElement('p');
    cameraPrice.innerHTML = `$` + price;
    priceHtml.appendChild(cameraPrice);

    let description = data.description;
    let cameraDescrip = document.createElement('i');
    cameraDescrip.innerHTML = description;
    descriptionHtml.appendChild(cameraDescrip);

    let imageUrl = document.createElement('img');
    image.src = data.imageUrl;
    document.getElementById('image').appendChild(imageUrl);
    image.innerHTML = imageUrl;

    let lenses = data.lenses;
    let select = document.getElementById("lensOption");

    for (let i in lenses) {
        let lensChoice = document.createElement("option");
        lensChoice.textContent = lenses[i];
        select.appendChild(lensChoice);
      }
}


const addToCart = document.getElementById('addToCart');
let select = document.getElementById('lensOption');
let cartItems = JSON.parse(localStorage.getItem('cart'));
let cartNumber = document.getElementById('cartNumber');

addToCart.addEventListener('click', () => {
    let cameraChoice = [];
    let lStorageData = localStorage.getItem('cart');
    
    if (lStorageData) {
      cameraChoice = JSON.parse(lStorageData);
    } else {
      cameraChoice = [];
    }

    localStorage.setItem('cartNumber', JSON.stringify(cameraChoice.length + 1));
    let cameraAdded = {
      imageUrl: product.imageUrl,
      price: product.price,
      selectLenses: select.value,
      name: product.name,
      cameraId: product._id,
      quantity: 1
    };

    cameraChoice.push(cameraAdded);
    localStorage.setItem('cart', JSON.stringify(cameraChoice));
    alert('Camera added to cart!');
    totalInCart(cameraChoice.length);
})


function totalInCart() {
  if (cartItems) {
      localStorage.setItem('cartNumber', JSON.stringify(cartItems.length));
      cartNumber.innerHTML = cartItems.length;
  }
}
totalInCart()