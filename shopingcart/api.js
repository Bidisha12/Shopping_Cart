const API_URL = './data.json';

const listentries=()=>{
fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return (document.getElementsByClassName(
      "shop-items"
    )[0].innerHTML = `${data.music.map((item) => {
      return `<div class="shop-item">
        <span class="shop-item-title">${item.name}</span>
        <img class="shop-item-image" src="${item.image}">
        <div class="shop-item-details">
            <span class="shop-item-price">${item.price}</span>
            <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
        </div>
    </div>`;
    })}`);
  })
  .catch((e) => console.log(e));
};

module.exports={
    listentries
}