// Etape 1 : Récupération de l'id du produit dans l'url 
let url = `http://localhost:3000/api/products/`
let newUrl = new URL(window.location.href);
let getId = newUrl.searchParams.get("id");

// Etape 2 : Récupérer le produit 
function getProduct (){
fetch(url + getId)
.then((data) =>{
    data.json()
    .then((data) => {

        let name = data.name;
        let price = data.price;
        let description = data.description;
        let altTxt = data.altTxt;
        let imageUrl = data.imageUrl;
        let colors = data.colors;
     

        // création des balises img et de l'attribut "alt"
        let image =  `<img src="${imageUrl}" alt="${altTxt}" id="imgKanap"/>`;
        document.querySelector('.item__img').innerHTML = image;
 

        // Affichage du contenus
        document.querySelector('#title').innerHTML = name;
        document.querySelector('#price').innerHTML = price;
        document.querySelector('#description').innerHTML = description;

        // Affichage des couleurs
        for(value in colors){
                  
            document.querySelector('#colors').innerHTML += 
            `<option value="${colors[value]}">${colors[value]}</option>`;

        }
    })
})
}

getProduct();


document.querySelector('#addToCart').addEventListener('click', (event) => {

    // Stop la propagation 
    event.preventDefault();
  
    // Récupération du produit.
    const nameKanap = document.getElementById('title').innerText;
    const quantity = document.getElementById('quantity').value;
    const colors = document.getElementById('colors').value;

    const price = document.getElementById('price').innerText;
    const imageUrl = document.getElementById('imgKanap').src;
    const description =  document.getElementById('description').innerHTML;


    // Création d'un objet pour le localstorage
    let products = {
        getId,        
        nameKanap,
        quantity,
        colors,
        price,
        imageUrl,
        description
    }   


    // Récupération du localstorage
    let produitLocalStorage = JSON.parse(localStorage.getItem('articles')) || []; 

    // On déclare une variable dans le cas ou le produit est déjà présent dans le localstorage
    let found = false;

    // On boucle sur le localstorage pour modifier la quantité 
    for(let product of produitLocalStorage){
       
        // On vérifie si l'id est la couleurs que l'on souhaite ajouté est déjà présent dans le localstorage.
        if(getId === product.getId && colors === product.colors){         
            product.quantity = parseInt(product.quantity) + parseInt(quantity);

            // On modifie la valeur de la variable pour déclarer que le produit existe déjà dans le localstorage
            found = true;

            // On fait une pause
            break;
        } 

    };

    // !found = found = true
    if(!found){
        let product = {
            getId,        
            nameKanap,
            quantity,
            colors,
            price,
            imageUrl,
            description                  
        }  
     
    // Ajout du nouveau produit dans la variable
    produitLocalStorage.push(product);
    alert('Panier modifié')
    }

    // On pousse la nouvelle valeur dans le localstorage
    localStorage.setItem('articles',JSON.stringify(produitLocalStorage));
    


    // Quand j'ajoute un produit, vérifier si le localstorage est vide si oui le créer si non
    // ajouter le produit dedans 

    // Si le localstorage existe vérifier si le produit que tu souhaite ajouté n'est pas déjà présent dedans 

})



// Afficher les produit dans la home 
// Afficher le produit dynamiquement ( 1 seul produit )
// Regarder le localstorage (afin de créer un panier) : localStorage.setItem("name", "price","quantity");
// Ajouter des produits dans le localstorage 
// Afficher le panier du localstorage dans la page cart.html
