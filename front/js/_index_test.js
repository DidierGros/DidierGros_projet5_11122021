const api = `http://localhost:3000/api/products`

function getProducts(){

  //recuperation de API
    fetch(api)
    .then(function(res) {
      // reponse du fetch
    
      if (res.ok) {
          console.log(res); // affichage dans la console
        return res.json();
      }
    })
    // récupération des données de l'API
    .then(function(value) {
      console.log(value);
        for (let i = 0; i < value.length; i++) {
            
            console.log(value[i]); // affichage dans la console 
            
            let name = value[i].name;            
            let description = value[i].description;
            let imageUrl =  value[i].imageUrl;
            let altTxt =  value[i].altTxt;
            let price =  value[i].price;
            let id = value[i]._id;

           // Modification de la page  : élément "items" 

            let itemsProducts = `<a href="./product.html?id=${id}">
            <article>
               <img src="${imageUrl}" alt="${altTxt}">
               <h3 class="productName">${name}</h3>
               <p class="productDescription">${description}</p>
               <p>Prix : ${price} Euros</p>
            </article>
           </a> 
           `;

            //window.confirm(itemsProducts)
            console.log(itemsProducts); // affichage dans la console


            //let items = document.querySelector('#items');

            const items = document.getElementById('items') 
            
            items.innerHTML += itemsProducts

                   
        }

    })
    .catch(function(err) {
      // Une erreur est survenue
    });


}

getProducts()



