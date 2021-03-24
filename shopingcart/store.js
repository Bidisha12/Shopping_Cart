// const datam=[
//     {
//         "name": "Album 1",
//         "image": "Images/download.jpg",
//         "price": "$12.99"
//     },
//     {
//         "name": "Album 2",
//         "image": "Images/4486167e8fec4d4438a12707da02537f.jpg",
//         "price": "$14.99"
//     },
//     {
//         "name": "Album 3",
//         "image": "Images/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg",
//         "price": "$9.90"
//     },
//     {
//         "name": "Album 4",
//         "image": "Images/ea1f64668a0af149a3277db9e9e54824.jpg",
//         "price": "$20.80"
//     }
// ];
// document.getElementsByClassName("shop-items")[0].innerHTML=`${
//     datam.map((item)=>{
//         return `<div class="shop-item">
//         <span class="shop-item-title">${item.name}</span>
//         <img class="shop-item-image" src="${item.image}">
//         <div class="shop-item-details">
//             <span class="shop-item-price">${item.price}</span>
//             <button class="btn btn-primary shop-item-button"type="button">ADD TO CART</button>
//         </div>
//     </div>`
//     })
// }`;

fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const allItemContainer = document.getElementById("all-items");
    console.log(allItemContainer);

    data.music.forEach((item) => {
      let container = document.createElement("div");
      container.classList.add("shop-item");

      let textHeading = document.createElement("span");
      textHeading.classList.add("shop-item-title");
      textHeading.appendChild(document.createTextNode(item.name));

      let images = document.createElement("img");
      images.classList.add("shop-item-image");
      images.src = item.image;

      let innerDiv = document.createElement("div");
      innerDiv.classList.add("shop-item-details");

      let price = document.createElement("span");
      price.classList.add("shop-item-price");
      price.appendChild(document.createTextNode(item.price));

      // let butt2 = document.createElement("button");
      // butt2.classList.add("btn", "btn-primary", "shop-item-button");
      // butt2.innerText = "-";
      // butt2.onclick = minusONe;

      let butt = document.createElement("button");
      butt.classList.add("btn", "btn-primary", "shop-item-button");
      butt.innerText = "ADD TO CART";
      butt.onclick = addToCartClicked;

      // let butt1 = document.createElement("button");
      // butt1.classList.add("btn", "btn-primary", "shop-item-button");
      // butt1.innerText = "+";
      // butt1.onclick = addONe;

      innerDiv.appendChild(price);
      // innerDiv.appendChild(butt2);
       innerDiv.appendChild(butt);
      // innerDiv.appendChild(butt1);

      container.appendChild(textHeading);
      container.appendChild(images);
      container.appendChild(innerDiv);
      allItemContainer.appendChild(container);
    });
    // return (document.getElementsByClassName(
    //   "shop-items"
    // )[0].innerHTML = `${data.music.map((item) => {
    //   return `<div class="shop-item">
    //     <span class="shop-item-title">${item.name}</span>
    //     <img class="shop-item-image" src="${item.image}">
    //     <div class="shop-item-details">
    //         <span class="shop-item-price">${item.price}</span>
    //         <button class="btn btn-primary shop-item-button" type="button" >ADD TO CART</button>
    //     </div>
    // </div>`;
    // })}`);
  })
  .catch((e) => console.log(e));

var removeCartItemButtons = document.getElementsByClassName("btn-danger");
for (var i = 0; i < removeCartItemButtons.length; i++) {
  var button = removeCartItemButtons[i];
  button.addEventListener("click", removeCartItem);
}

var quantityInputs = document.getElementsByClassName("cart-quantity-input");
for (var i = 0; i < quantityInputs.length; i++) {
  var input = quantityInputs[i];
  input.addEventListener("change", quantityChanged);
}

document
  .getElementsByClassName("btn-purchase")[0]
  .addEventListener("click", purchaseClicked);

function purchaseClicked() {
  alert("Thank you for your purchase");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  let cartItem=buttonClicked.parentElement.parentElement;
  let title = cartItem.getElementsByClassName("cart-item-title")[0].innerText;
  var shopItems = document.getElementsByClassName("shop-items")[0];
  var shopItemNames = shopItems.getElementsByClassName("shop-item-title");
   console.log(shopItemNames[0].parentElement.parentElement.getElementsByClassName("shop-item-button-minus"));
  for (var i = 0; i < shopItemNames.length; i++) {
    if (shopItemNames[i].innerText == title) {
          shopItemNames[i].parentElement.getElementsByClassName("shop-item-details")[0].getElementsByClassName("shop-item-button-minus")[0].remove();
          shopItemNames[i].parentElement.getElementsByClassName("shop-item-details")[0].getElementsByClassName("shop-item-button-add")[0].remove();
          shopItemNames[i].parentElement.getElementsByClassName("shop-item-details")[0].getElementsByClassName("shop-item-input")[0].remove();
          let butt = document.createElement("button");
          butt.classList.add("btn", "btn-primary", "shop-item-button");
          butt.innerText = "ADD TO CART";
          butt.onclick = addToCartClicked;
          shopItemNames[i].parentElement.getElementsByClassName("shop-item-details")[0].appendChild(butt);
          console.log( shopItemNames[i].parentElement.getElementsByClassName("shop-item-details")[0]);
    }
  }
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addONe(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  let recParent=button.parentElement;
  let cinput=recParent.getElementsByClassName("shop-item-input")[0];
  cinput.value++;
  let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  var cartinput = cartItems.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      cartinput[i].value++;
    }
  }
  updateCartTotal();
}

function minusONe(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  let recParent=button.parentElement;
  let cinput=recParent.getElementsByClassName("shop-item-input")[0];
  if(cinput.value>1){
  cinput.value--;
  }
  let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  var cartinput = cartItems.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title && cartinput[i].value > 1) {
      cartinput[i].value--;
    }
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  addItemToCart(title, price, imageSrc);
  var changebutt = button.parentElement;

  let butt2 = document.createElement("button");
  butt2.classList.add("btn", "btn-primary", "shop-item-button-minus");
  butt2.innerText = "-";
  butt2.onclick = minusONe;

  let input = document.createElement("input");
  input.classList.add("shop-item-input","cart-quantity-input");
  input.value = 1;

  let butt1 = document.createElement("button");
  butt1.classList.add("btn", "btn-primary", "shop-item-button-add");
  butt1.innerText = "+";
  butt1.onclick = addONe;

  button.remove();  

  changebutt.appendChild(butt2);
  changebutt.appendChild(input);
  changebutt.appendChild(butt1);
  
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}
