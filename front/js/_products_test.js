const api = `http://localhost:3000/api/products`
let getUrl = new URL(window.location.href); // retourne la page en cours
let getId = getUrl.searchParams.get("id");

console.log(getId);
console.log(getUrl);

// Affichage des contenus dans le DOM

function getProduct(){
    fetch(api)
    .then(function(res) {
        console.log(res)
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      console.log(value);
// récupération des données 
        for (let i = 0; i < value.length; i++) {
            console.log(value[i])

            let name = value.name;
            let price = value.price;
            let description = value.description;
            let altTxt = value.altTxt;
            let imageUrl = value.imageUrl;
            let colors = value.colors;

            
        }


    })
    .catch(function(err) {
      // Une erreur est survenue
    });
 
}

getProduct()

