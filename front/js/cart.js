// ETAPE 1  Afficher tous les produits du localstorage dans le HTML 
let produitLocalStorage = JSON.parse(localStorage.getItem('articles'));



const displayCart = () => {
    if(produitLocalStorage.length === 0 ){
    document.getElementById('cart__items').innerHTML = '<p>Le panier est vide</p>';
}else{
    document.getElementById('cart__items').innerHTML = "";

    for( i = 0; i < produitLocalStorage.length; i++){
        const priceUnit = Number(produitLocalStorage[i].price);
        const quantityUnit = Number(produitLocalStorage[i].quantity);
        const totalPrice = priceUnit * quantityUnit;

        const produitPanier =  `
        <article class="cart__item" id="${produitLocalStorage[i].getId}" data-color="${produitLocalStorage[i].colors}">
        <div class="cart__item__img">
          <img src="${produitLocalStorage[i].imageUrl}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${produitLocalStorage[i].nameKanap}</h2>
            <p>${produitLocalStorage[i].colors}</p>
            <p>${produitLocalStorage[i].price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitLocalStorage[i].quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>
        
        `;
document.getElementById('cart__items').insertAdjacentHTML('beforeend', produitPanier);

addDeleteAction(produitLocalStorage[i].getId);

    }

}
};



const addDeleteAction = (id) => {

    const deleteItem = document.getElementById(id).querySelector('.deleteItem');
    const item = document.getElementById(id);
    console.log(item.getAttribute('data-color'))
    
    deleteItem.addEventListener('click', () => {
        const idItem = item.getAttribute('id');
        const colorItem = item.getAttribute('data-color');
        console.log(colorItem)

        produitLocalStorage = produitLocalStorage.filter(
            (p) => p.getId !== idItem || p.colors !== colorItem
        );

        localStorage.setItem('articles', JSON.stringify(produitLocalStorage));
        displayCart();

    })
}



displayCart();
// function pour afficher la donnée // Boucle

    // Si le panier est vide ? // Condition


    // Si le panier n'est pas vide ? 


// HTML dans le JS comme sur les autres pages ( innerHTML ) // DOM


//---------------------------------------------------------------------------


// Etape 2 : Supprimer un produit // CallBack 

// Etape 3 : Modifier la quantité en plus ou moins  // CallBack 

// Etape 4 : Calcul du prix total dynamiquement en fonction du panier  // CallBack 


//---------------------------------------------------------------------------


// Etape 5 : Validation du formulaire ( Regex )

// Etape 6 : Validation du panier envoyer le panier sur la route en "POST"