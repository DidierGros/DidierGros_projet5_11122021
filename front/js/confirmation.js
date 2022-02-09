(function confirm(){

//---Récupération et affichage du numéro de commande
 
    const newUrl = new URL(window.location.href);
    const getOrder = newUrl.searchParams.get("name");
    document.querySelector('#orderId').innerHTML = getOrder;  
})()



