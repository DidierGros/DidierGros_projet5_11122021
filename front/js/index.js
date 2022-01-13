// Création d'une variable avec l'url 
let url = `http://localhost:3000/api/products`;

// Je créer une fonction 
function getProducts(){

    // Utilisation de fetch pour récupérer la données dans l'API
    fetch(url).then((data) =>{
        data.json()

        // La réponse du fetch
        .then((data) => {
   
            // je boucle sur la data pour l'afficher dans le DOM
            for (let i = 0; i < data.length; i++){
              
                let name = data[i].name;
                let description = data[i].description;
                let imageUrl =  data[i].imageUrl;
                let altTxt =  data[i].altTxt;
                let price =  data[i].price;
                let id = data[i]._id;

                // Création d'une variables avec le contenu HTML ainsi que la données dynamiques
                let items = `<a href="./product.html?id=${id}">
                 <article>
                    <img src="${imageUrl}" alt="${altTxt}">
                    <h3 class="productName">${name}</h3>
                    <p class="productDescription">${description}</p>
                    <p>Prix : ${price} Euros</p>
                 </article>
                </a> 
                `;

                // Modification du DOM pour afficher la données dans "ITEMS"
                document.querySelector('.items').innerHTML += items;

            }
        })
    })
}

getProducts();
