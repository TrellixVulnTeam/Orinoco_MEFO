let cartItems = JSON.parse(localStorage.getItem('cart'));

for (let i in cartItems) {
    console.log(cartItems[i]);

    let tr = document.createElement('tr');

    let imageCart = document.createElement('img');
    let nameCart = document.createElement('p');
    let lensCart = document.createElement('td');
    let priceCart = document.createElement('td');
    let btnRemoveCart = document.createElement('td');
    let divNameCart = document.createElement('td');
    let quantityCart = document.createElement('td');

}


/*function showCartItems() {
let cartItems = JSON.parse(localStorage.getItem('cart'));
    if (cartItems)    
        for (let i in cartItems) {
                let tableRow = document.createElement('tr');
            }
}
showCartItems();
*/
