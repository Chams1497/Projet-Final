//contenu du panier
let iconCart = document.querySelector('.icon-panier')
let cart=document.querySelector('.cartTab')
let closeCart=document.querySelector('.close')

iconCart.onclick = ()=>{
  cart.classList.add("active");
}

closeCart.onclick = ()=>{
  cart.classList.remove("active");
}

if (document.readyState=="loading") {
  document.addEventListener("DOMContentLoaded",ready);
}else{
  ready();
}

function removeCartbox (event){
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

function ready() {
  var removeCartbutton = document.getElementsByClassName('cart-remove')
  console.log(removeCartbutton)
  for (var i = 0; i < removeCartbutton.length;i++ ){
    var button=removeCartbutton[i]
    console.log(button);
    button.addEventListener("click",removeCartbox)
    updatetotal();
  }
  
  var quantityInput = document.getElementsByClassName('box-quantity')
  for (var i = 0; i <quantityInput.length;i++ ){
    var Input = quantityInput[i];
    Input.addEventListener('change',quantityChanged);
  }
  //ajouter au panier
  var addCart = document.getElementsByClassName('addcart')
  for (var i = 0; i <addCart.length;i++ ){
    var button = addCart[i]
    button.addEventListener('click',addCartClicked)
  }
  // valider le panier
document.getElementsByClassName("checkout")[0].addEventListener("click",buyButtonClicked);

function buyButtonClicked() {
  alert ('panier validé')
  var cartContent = document.getElementsByClassName('cart-content')[0];
  while(cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild);
  }
}
updatetotal();
}



function quantityChanged(event){
  var input = event.target;
  if (isNaN(input.value)|| input.value <=0){
 input.value = 1
  } 
  updatetotal();
}
// ajouter au panier

 function addCartClicked(event){
  var button = event.target;
  var shopProducts = button.parentElement.parentElement;
  var title = shopProducts.getElementsByClassName("titre-article")[0].innerText;
  var prix = shopProducts.getElementsByClassName("prix-article")[0].innerText;
  var image  = shopProducts.getElementsByClassName("img-article")[0].src;
  addProductToCart(title,prix,image);
  updatetotal();
 }
 
 function addProductToCart(title,prix,image) {
  var cartshopBox = document.createElement("div");
   cartshopBox.classList.add('cart-box');
  var cartItems = document.getElementsByClassName('cart-content')[0];  
  var cartItemsNames = cartItems.getElementsByClassName('cart-box-name'); 

  var cartBoxContent = ` 
  <img src="${image}"
  alt="" class="cart-box-img">
  <div class="box-details">
  <div class="cart-box-name">${title}</div>
  <div class="cart-box-price">${prix}</div>
  <input type="number" value="1" class="box-quantity">
  </div>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
  class="bi bi-trash-fill cart-remove" viewBox="0 0 16 16">
  <path
      d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
  </svg>`
  
  cartshopBox.innerHTML = cartBoxContent
  cartItems.append(cartshopBox)
  cartshopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartbox);
  cartshopBox.getElementsByClassName('box-quantity')[0].addEventListener('change',quantityChanged);

  for (var i = 0; i <cartItemsNames.length;i++ ){
    alert("cet article a  été ajouté au panier");
  }

 }


function updatetotal() {
  var cartContent = document.getElementsByClassName('cart-content')[0]
  var cartBoxes = cartContent.getElementsByClassName('cart-box')
  var total = 0;
  for (var i = 0; i < cartBoxes.length;i++ ){
    var cartBox=cartBoxes[i]
    var priceElement = cartBox.getElementsByClassName('cart-box-price')[0]
  var quantityElement = cartBox.getElementsByClassName('box-quantity')[0]
  var price = parseFloat( priceElement.innerText.replace("XOF",""))
  var quantity = quantityElement.value;
  total = total + (price * quantity);
}
  document.getElementsByClassName('total-price')[0].innerText = "XOF" + total ;
 

}