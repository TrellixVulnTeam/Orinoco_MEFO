let productsContainer = document.getElementById('products');
const url = 'https://orinoco-op.herokuapp.com/api/cameras';
let formSubmit = document.getElementById('formSubmit');

fetch (url)
    .then((response) => response.json())
    .then((data) => createCards(data));


function createCards(array) {
    const container = document.getElementById('container');
    const length = array.length;

    for (let i=0; i<length; i++) {
        const card = createCard(array[i]);
        container.appendChild(card);
    }
}

function createCard(obj) {
    const card = document.createElement('section');

    const name = document.createElement('heading');
    const price = document.createElement('p');
    const img = document.createElement('img');
    const description = document.createElement('description');

    card.classList.add('card');

    name.innerHTML = obj.name;
    price.innerHTML = obj.price;
    description.innerHTML = obj.description;

    img.setAttribute('src', obj.imageUrl);

    name.style.fontSize = "1.6rem";
    price.style.fontSize = "1.2rem";
    description.style.fontSize = "1.2rem";

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(description);

    return card;
}