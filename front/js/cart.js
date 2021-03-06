(function cart(){

 // récuperation de l'API

  const products = fetch(`http://localhost:3000/api/products`)

// récuperation du panier

  let card = JSON.parse(localStorage.getItem("article"));
  
// Affichage du panier
  
  function cardDisplay(){  
  
    if (card === null) {
  
      document.querySelector("#cart__items").innerHTML= ' <p> Votre est panier est vide ';
      
    }else{

      products.then(async (response)=>{

          try {
      
              let productsData = await response.json() 
        
              for (const product of card) {

                  for (let i = 0; i < productsData.length; i++) {
      
                      let productId = productsData[i]._id;
                      let productPrice = productsData[i].price;
                      
                      
                      if (productId === product.getId ) {
              
            
                        let price = ( product.quantity * productPrice)
                    
                        let article = document.querySelector("#cart__items");
      
                        article.innerHTML += `<article class="cart__item" data-id="${product.getId}" data-color="${product.colors}">
                          <div class="cart__item__img">
                            <img src="${product.image}" alt="Photographie d'un canapé">
                          </div>
                          <div class="cart__item__content">
                            <div class="cart__item__content__description">
                              <h2>${product.name}</h2>
                              <p>${product.desc}</p> 
                              <p>${product.colors}</p>
                              <p class="price">${productPrice}€</p>
                                       
                            </div>
                            <div class="cart__item__content__settings">
                              <div class="cart__item__content__settings__quantity">
                                <p>Qté :</p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                              </div>
                              <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                              </div>
                            </div>
                          </div>
                        </article>`;

                    changeQuantity();  
                    removeFromCard();         
                 } 
            }  
          } 
//---Calcul du prix total du panier-------//


          totalPrice = 0;

          for (let q = 0; q < card.length; q++) {

             for (let p = 0; p < productsData.length; p++) {

              if (card[q].getId === productsData[p]._id) {
  
              let productPrice = productsData[p].price;

              let quantityCard = card[q].quantity

              let total = quantityCard * productPrice

              console.log('total:', total)
           
              totalPrice += total;
            }
           }
          } 
            document.querySelector("#totalPrice").innerHTML = totalPrice; 

          } catch (error) {
      
              console.log("ça bug grave !!!" + error)
          }
      })
     }
  }
  
//-----supprimer un produit----//
  
  
  function removeFromCard(){
  
      let deleteItem = document.querySelectorAll(".deleteItem");     
    
      deleteItem.forEach(supprimer => {
  
        supprimer.addEventListener("click",(event)=>{

          const dataId = event.target.closest(".cart__item").dataset.id;
          const dataColor = event.target.closest(".cart__item").dataset.color;
  
          console.log('dataId:', dataId)
          console.log('dataColor:', dataColor)
  
          card = card.filter((p) => p.getId != dataId || p.colors != dataColor);
  
          alert("produit supprimé");
  
          localStorage.setItem("article", JSON.stringify(card));
  
          if (card.length == 0) { 
  
           localStorage.clear();  
          } 
          window.location.reload();
        })
    })
   };
  
  //--Changement des quantités du panier----//
  
    
  function changeQuantity(){
  
    let itemQuantity = document.querySelectorAll(".itemQuantity");
    
    itemQuantity.forEach(change => {
  
      change.addEventListener("change",(event)=> {

          const dataId = event.target.closest(".cart__item").dataset.id;
          const dataColor = event.target.closest(".cart__item").dataset.color;               
          const newQuantity = event.target.value;
                        
           for (let i= 0; i < card.length; i++) {
    
            if (dataId === card[i].getId && dataColor === card[i].colors) {

           
            card[i].quantity = newQuantity; 
            
            localStorage.setItem("article", JSON.stringify(card));

            window.location.reload();
         
            totalQuantity ();                   
        }
      }
    })
  })
  };
  
  
  //----Calcul du nombre total d'articles----//
  
  
  function totalQuantity (){
  
    if (card !== null) {
  
      const totalQuantity = card.reduce(
      (a, b) => a + Number(b.quantity), 0); 
  
      document.querySelector("#totalQuantity").innerHTML = totalQuantity;
    }
  };
  totalQuantity ();
  
  
  cardDisplay();




  
   ///////////////////////////////////VALIDATION DE LA COMMANDE//////////////////////////////////////////////////////




  
      //Formulaire - mise en place des RegEX pour vérifier les entrées de l'utilisateur
  
      let firstName = document.querySelector("#firstName");
  
      firstName.setAttribute("placeholder","Indiquer votre prénom sans aucun chiffre SVP !!!");
  
      firstName.addEventListener("input", ()=>{
    
        let firstNameRegex = new RegExp("^[a-zA-Z][a-zA-Z .,'-]*$", "g");
    
        if (firstName.validity.valueMissing) {

          let firstNameError = document.querySelector(`#firstNameErrorMsg`);
            firstNameError.textContent = "Indiquez votre prénom";
            firstNameError.style.color = `white`;
            firstNameError.style.fontWeight = `bolder`;
    
          setTimeout(function() {
            firstNameError.textContent = "";
          },4000); 
       
      } else if(firstNameRegex.test(firstName.value) == false) {

        let firstNameError = document.querySelector(`#firstNameErrorMsg`);
          firstNameError.textContent = "Indiquez votre prénom sans mettre de chiffre";
          firstNameError.style.color = `red`;
          firstNameError.style.fontWeight = `bolder`;
    
        setTimeout(function() {
          firstNameError.textContent = "";          
        },4000);
        
        firstName.value = "";
      }
    });
    
    
    let lastName = document.querySelector("#lastName");
  
    lastName.setAttribute("placeholder","Indiquer votre nom sans aucun chiffre SVP !!!");
    
    lastName.addEventListener("input",() =>{
    
      let lastNameRegex = new RegExp("^[a-zA-Z][a-zA-Z .,'-]*$", "g");
    
      if (lastName.validity.valueMissing) {

        let lastNameError = document.querySelector(`#lastNameErrorMsg`);
          lastNameError.textContent= "Indiquez votre nom";
          lastNameError.style.color = `white`;
          lastNameError.style.fontWeight = `bolder`;

        setTimeout(function() {
          lastNameError.textContent = "";
        },4000); 
       
      } else if(lastNameRegex.test(lastName.value) == false) {
      
        let lastNameError = document.querySelector(`#lastNameErrorMsg`);
          lastNameError.textContent = "Indiquez votre prénom en respectant la casse // ne pas indiquer de chiffres";
          lastNameError.style.color = `red`;
          lastNameError.style.fontWeight = `bolder`;
    
        setTimeout(function() {
          lastNameError.textContent = "";
  
        },4000);
  
        lastName.value = "";
  
      }
    });
    
    let address = document.querySelector("#address");
  
    address.setAttribute("placeholder","Indiquer votre adresse...");
    
    address.addEventListener("input",() =>{
    
      let addressRegex = new RegExp("^[0-9\s]+)?)+[a-zA-Z]*((\s?)*[a-zA-Z](\s?)*)(([0-9\s]+)?*$","g");
  
      if (address.validity.valueMissing) {
      
        let addressError = document.querySelector(`#addressErrorMsg`);
          addressError.textContent = "Indiquez votre adresse compléte";
          addressError.style.color = `white`;
          addressError.style.fontWeight = `bolder`;
  
        setTimeout(function() {
          addressError.textContent = "";
        },4000); 
       
      } else if(addressRegex.test(address.value) == false) {
      
        let addressError = document.querySelector(`#addressErrorMsg`);
          addressError.textContent = "Indiquez votre adresse compléte";
          addressError.style.color = `red`;
          addressError.style.fontWeight = `bolder`;
    
        setTimeout(function() {
          addressError.textContent = "";
        },4000);
      }
    });
    
    let city = document.querySelector("#city");
  
    city.setAttribute("placeholder","Indiquer votre ville...");
    
    city.addEventListener("input",() =>{
    
      let cityRegex= new RegExp("^[0-9\s]+)?)+[a-zA-Z]*((\s?)*[a-zA-Z](\s?)*)(([0-9\s]+)?*$","g");
  
       if (city.validity.valueMissing) {
      
        let cityError = document.querySelector(`#cityErrorMsg`);
        cityError.textContent = "Indiquez votre ville";
        cityError.style.color = `white`;
        cityError.style.fontWeight = `bolder`;
  
        setTimeout(function() {
          cityError.textContent.textContent = "";
        },4000); 
       
      } else if(cityRegex.test(city.value) == false) {
      
        let cityError = document.querySelector(`#cityErrorMsg`);
        cityError.textContent = "Indiquez votre ville";
        cityError.style.color = `red`;
        cityError.style.fontWeight = `bolder`;
    
        setTimeout(function() {
          cityError.textContent.textContent = "";
        },4000);
      }
    });
    
    let email = document.querySelector("#email");
  
    email.setAttribute("placeholder",'Indiquer un email valide : "votrenom@service.com"...');
    
    email.addEventListener("input",() =>{
    
      let emailRegex = new RegExp ("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");
  
      if (email.validity.valueMissing) {
      
        let emailError = document.querySelector(`#emailErrorMsg`);
          emailError.textContent = "Indiquez votre email";
          emailError.style.color = `white`;
          emailError.style.fontWeight = `bolder`;
    
        setTimeout(function() {
          emailError.textContent = "";
        },4000); 
       
      } else if(emailRegex.test(email.value) == false) {
      
        let emailError = document.querySelector(`#emailErrorMsg`);
          emailError.textContent = "Indiquez un email valide";
          emailError.style.color = `red`;
          emailError.style.fontWeight = `bolder`;
  
        setTimeout(function() {
          emailError.textContent = "";          
        },4000);
    
      }
    });
  
  
  //Validation du formulaire et envoi de la commande
  
  const sendCommand = () => {
    document.querySelector("#order").addEventListener("click", (event) => {
      event.preventDefault();
  
      let nameRegex = /^[a-zA-Z-/s]+$/;
      let sendRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
  
      if (nameRegex.test(firstName.value ) == false || nameRegex.test(lastName.value) == false || address.value == "" || city.value == "" || sendRegex.test(email.value) == false) {
        
        alert("Remplissez correctement les champs du formulaire!");
           
      } else {
  
        const contact = {
          lastName: lastName.value,
          firstName: firstName.value,
          address: address.value,
          city: city.value,
          email: email.value,
        };
  
        const order = JSON.parse(localStorage.getItem("article"));
  
        if (order == null) {
          
          alert("votre panier est vide, il faut un produit pour passer commande !!!")
  
          window.location.reload()
        }
  
  
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
  
      }
    })
  };
  sendCommand();
  
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
      })
  };
  
  })()

