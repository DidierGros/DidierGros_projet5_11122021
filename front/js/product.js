(function product() {
    const newUrl = new URL(window.location.href);
    const getId = newUrl.searchParams.get("id");
    const products = fetch(`http://localhost:3000/api/products`)



    
//affichage des données de l'API dans le DOM:


products.then(async (response)=>{
   
       try {
    
           let productsData = await response.json()    
           
           for (let i = 0; i < productsData.length; i++) {
               
                let product = productsData[i];
    
                let productId = productsData[i]._id;
                let productaltTxt = productsData[i].altTxt;       
                let productName = productsData[i].name;
                let productPrice = productsData[i].price;
                let productImageUrl = productsData[i].imageUrl;
                let productDescription = productsData[i].description;
                
    
//Affichage des données dans le DOM
                
                if (productId === getId) {
    
                document.querySelector('.item__img').innerHTML = `<img src="${productImageUrl} " alt="${productaltTxt}">`;
                document.querySelector("#title").innerText = productName;
                document.querySelector("#description").innerText = productDescription;
                document.querySelector("#price").innerText = productPrice;
                
//Récupération et affichage des couleurs         
                
                let productColors = productsData[i].colors;         
    
                for (let i= 0; i < productColors.length; i++){ 
                   let colorsValue = productColors[i];
    
                    document.querySelector("#colors").innerHTML +=`
                 <option value="${colorsValue}">${colorsValue}</option>`;
                  
                }
                    
                } 
    
           }
    
           const addToCart = document.querySelector("#addToCart")
    
           addToCart.addEventListener("click", (event) =>{
            event.preventDefault();
               
            let image = document.querySelector(".item__img img").src;
            let colors = document.querySelector("#colors").value;  
            let name = document.querySelector("#title").innerText;
            let desc = document.querySelector("#description").innerText;       
            let price = document.querySelector("#price").innerText;
            let quantity = document.querySelector("#quantity").value;
    
//création d'un objet "produit".....
    
           let product = {
    
            getId,
            image,
            name,
            desc,
            colors,
            price,
            quantity
    
           }
        
 //-----------------------------enregistrement du panier ---------------------------------------------------------------
           function saveCard(card) {
           localStorage.setItem("article", JSON.stringify(card));
            
        }
       
//-----------------------------création du panier ---------------------------------------------------------------
        function getCard() {
        
            let card = localStorage.getItem("article")        
            if (card == null) {
        
                return [];
                
            } else {
        
                return JSON.parse(card);
                
            }
          
        }

//-----------------------------Ajout d'un article au panier et Modification des quantité---------------------------------------------------------------
        
        function addCard(product) {
        
            let card = getCard();
            let foundProduct = card.find(p => p.id == product.id & p.colors == product.colors);

            if (foundProduct != undefined) {
    
            //Modification des quantité
            let newQuantity = document.querySelector("#quantity").value;
            
            foundProduct.quantity = newQuantity;
    
            console.log('foundProduct:', foundProduct.quantity)   
            
    
            alert("Les quantités de votre produit ont été modifiées");
    
            } else if (quantity == 0 || colors == ""){                
                
                alert("Votre produit est mal renseigné : veuillez indiquer un choix de couleur et une quantité")

            } else {

                //Ajout du produit au panier             
                card.push(product);
                alert("votre produit a été ajouté"); 
            }  
            
            saveCard(card);
            
        }
            addCard(product)
    
    
           })
    
       } catch (error) {
           console.log("ça bug grave !!!" + error)
       }
    
    }).catch(() => console.error("Pas de réponse" + erreur));
    
    }
    
)()












