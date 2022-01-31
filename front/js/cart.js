(function cart(){


// récuperation du panier
let card = JSON.parse(localStorage.getItem("article"))

function cardDisplay(){  

  if (card === null) {

    // alert("le panier est vide")

    document.querySelector("#cart__items").innerHTML= ' <p> Votre est panier est vide '
    
  }else {

    for (let i = 0; i < card.length; i++) {
      
      let articleId = card[i].getId;      
      let articleColors = card[i].colors;
      let articleDesc = card[i].desc;
      let articleImage = card[i].image;
      let articlename = card[i].name;
      let articleprice = card[i].price;
      let articleQuantity = card[i].quantity;


      let article = document.querySelector("#cart__items")
      article.innerHTML += `<article class="cart__item" data-id="${articleId}" data-color="${articleColors}">
      <div class="cart__item__img">
        <img src="${articleImage}" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${articlename}</h2>
          <p>${articleColors}</p>
          <p>${articleprice}€</p>
          <p>${articleDesc}</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté :</p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${articleQuantity}" data-id="${articleId}" data-color="${articleColors}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`


    removeFromCard()
    changeQuantity()
 
    }
 
  }
 
}


 // supprimer un produit------------------------------------------------//
 
  function removeFromCard () {

  let deleteItem = document.querySelectorAll(".deleteItem")
  
    deleteItem.forEach(supprimer => {

      supprimer.addEventListener("click",()=>{
        
        const dataId = document.querySelector(".deleteItem").closest(".cart__item").dataset.id;
        const dataColor = document.querySelector(".deleteItem").closest(".cart__item").dataset.color;

        console.log('dataId:', dataId);
        console.log('dataColor:', dataColor);

        card = card.filter((p) => p.getId != dataId || p.colors != dataColor);

        alert("produit supprimé");

        localStorage.setItem("article", JSON.stringify(card));

        if (card.length == 0) { 

         localStorage.clear()
          
        } 

        window.location.reload();
  
      })
    
  });

 }

// Changement des quantités du panier---------------//

 
function changeQuantity(){

let itemQuantity = document.querySelectorAll(".itemQuantity");


itemQuantity.forEach(change => {

    change.addEventListener("change",(event)=> {

        const dataId = event.target.dataset.id;
        const dataColor = event.target.dataset.color;
        const newQuantity = event.target.value;

        console.log('card:', card)

        for (let i= 0; i < card.length; i++) {
                
                        
          if (dataId === card[i].getId && dataColor === card[i].colors) {

        card[i].quantity = newQuantity;        

        localStorage.setItem("article", JSON.stringify(card))

        cardTotalPrice()     
        totalQuantity ()                 
      }
      }
  })

})

}


//--------------Calcul du prix total du panier-------------------//

function cardTotalPrice() {
  
  if (card !== null) {
    const totalPrice = card.reduce(
    (a, b) => a + (b.quantity * b.price), 0); 

    document.querySelector("#totalPrice").innerHTML = totalPrice; 
  }
 
}
cardTotalPrice()



//-----------------Calcul du nombre total d'articles----------------------//


function totalQuantity (){

  if (card !== null) {

    const totalQuantity = card.reduce(
    (a, b) => a + Number(b.quantity), 0); 

    document.querySelector("#totalQuantity").innerHTML = totalQuantity;
  }
 

}

totalQuantity ()

cardDisplay()



 /////////////////////////////////////////////////////////////////////////////////////////


//Formulaire - mise en place des RegEX pour vérifier les entrées de l'utilisateur

let firstName = document.querySelector("#firstName");

firstName.addEventListener("input", ()=>{

  let firstNameRegex = new RegExp("^[a-zA-Z][a-zA-Z .,'-]*$", "g");

  if (firstName.value == "") {
  
    let firstNameError = document.querySelector(`#firstNameErrorMsg`);
    firstNameError.innerHTML = "Indiquez votre prénom";
    firstNameError.style.color = `white`;
    firstNameError.style.fontWeight = `bolder`;
    
  } else if(firstNameRegex.test(firstName.value) == false) {
  
    let firstNameError = document.querySelector(`#firstNameErrorMsg`);
    firstNameError.innerHTML = "Indiquez votre prénom en respectant la casse // ne pas indiquer de chiffre";
    firstNameError.style.color = `red`;
    firstNameError.style.fontWeight = `bolder`;
   
  }

})


let lastName = document.querySelector("#lastName");

lastName.addEventListener("input",() =>{

  let lastNameRegex = new RegExp("^[a-zA-Z][a-zA-Z .,'-]*$", "g");

  if (lastName.value == "") {
  
    let lastNameError = document.querySelector(`#lastNameErrorMsg`);
    lastNameError.innerHTML = "Indiquez votre nom";
    lastNameError.style.color = `white`;
    lastNameError.style.fontWeight = `bolder`;
   
  } else if(lastNameRegex.test(lastName.value) == false) {
  
    let lastNameError = document.querySelector(`#lastNameErrorMsg`);
    lastNameError.innerHTML = "Indiquez votre prénom en respectant la casse // ne indiquer de chiffres";
    lastNameError.style.color = `red`;
    lastNameError.style.fontWeight = `bolder`;
   
  }

})

let address = document.querySelector("#address");

address.addEventListener("input",() =>{

  let addressRegex = new RegExp("^[a-zA-Z][a-zA-Z .,'-]*$");

  if (address.value == "") {
  
    let addressError = document.querySelector(`#addressErrorMsg`);
    addressError.innerHTML = "Indiquez votre adresse compléte";
    addressError.style.color = `white`;
    addressError.style.fontWeight = `bolder`;
   
  } else if(addressRegex.test(address.value) == false) {
  
    let addressError = document.querySelector(`#addressErrorMsg`);
    addressError.innerHTML = "Indiquez votre adresse compléte";
    addressError.style.color = `red`;
    addressError.style.fontWeight = `bolder`;
   
  }

})



let city = document.querySelector("#city");

city.addEventListener("input",() =>{

  let cityRegex = new RegExp ("^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$","g");

  if (city.value == "") {
  
    let cityError = document.querySelector(`#cityErrorMsg`);
    cityError.innerHTML = "Indiquez votre ville";
    cityError.style.color = `white`;
    cityError.style.fontWeight = `bolder`;
   
  } else if(cityRegex.test(address.value) == false) {
  
    let cityErrorsError = document.querySelector(`#cityErrorMsg`);
    cityError.innerHTML = "Indiquez votre ville";
    cityError.style.color = `red`;
    cityError.style.fontWeight = `bolder`;
   
  }

})


let email = document.querySelector("#email");

email.addEventListener("input",() =>{

  let emailRegex = new RegExp ("^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,63})+$","g");

  if (city.value == "") {
  
    let emailError = document.querySelector(`#cityErrorMsg`);
    emailError.innerHTML = "Indiquez votre email";
    emailError.style.color = `white`;
    emailError.style.fontWeight = `bolder`;
   
  } else if(emailRegex.test(email.value) == false) {
  
    let cityErrorsError = document.querySelector(`#cityErrorMsg`);
    emailError.innerHTML = "Indiquez un email valide";
    emailError.style.color = `red`;
    emailError.style.fontWeight = `bolder`;;
   
  }

})

//Requête POST pour envoyer les données à l'API et récupérer le numéro de commande

const orderCommand = (commandOrder) => {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/JSON",
    },
    body: JSON.stringify(commandOrder),
  })
    .then((data) => data.json())
    .then((data) => {      
      const orderId = data.orderId;

//Envoi de l'utilisateur vers la page de confirmation en supprimant le localStorage
      window.location.href = "confirmation.html" + "?" + "name" + "=" + orderId;
      localStorage.clear();
    });
};

//Soumission du formulaire et envoi de la commande

const sendCommand = () => {
  document.querySelector("#order").addEventListener("click", (event) => {
    event.preventDefault();
    if (firstName && lastName && address && city && email) {
      const contact = {
        lastName: lastName.value,
        firstName: firstName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      };

      const order = JSON.parse(localStorage.getItem("article"));

      const products = [];
      for (i = 0; i < order.length; i++) {
        let allProduct = order[i].getId;
        products.push(allProduct);
      }

      let commandOrder = {
        contact,
        products,
      };

      localStorage.setItem("commandOrder", JSON.stringify(commandOrder));

      orderCommand(commandOrder);
    } else {
      alert("Remplissez correctement le formulaire!");
    }
  });
};
sendCommand();


})()





