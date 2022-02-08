(function index() {
   
// connection à l'API
const products = fetch("http://localhost:3000/api/products");

products.then(async (response)=>{
        
try {

    // récupération des données et affichage dans le DOM
    const productsData = await response.json()

    for (let i = 0; i < productsData.length; i++) {
        
       let productId = productsData[i]._id;
        let productaltTxt = productsData[i].altTxt;      
        let productName = productsData[i].name;        
        let productImageUrl = productsData[i].imageUrl;
        let productDescription = productsData[i].description;

        // Affichage dans le DOM

        let productDom = document.querySelector("#items").innerHTML +=`
        <a href="./product.html?id=${productId}">
          <article>
              <img src="${productImageUrl} " alt="${productaltTxt} ">
              <h3 class="productName">${productName}</h3>
              <p class="productDescription">${productDescription}</p>
            </article>
          </a>      
        `
  }

} catch (error) {

    console.log("Rien ne s'affiche" + error)   
}

}).catch((erreur)=> console.error("Pas de réponse de l'API" + erreur)
)
    }
)()


