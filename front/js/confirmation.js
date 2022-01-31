(function confirm(){

    const newUrl = new URL(window.location.href);
    const getOrder = newUrl.searchParams.get("name");
    document.querySelector('#orderId').innerHTML = getOrder;
    console.log('getorder:', getorder) 
  
})()






/*//Récupération du numéro de commande en passant par l'URL
//Déclaration de la constante url
const urlConfirm = new URL(window.location.href);
//Fonction pour récupérer l'orderId de l'url
const getOrderId = () => {  
    const params = urlConfirm.searchParams;
    const orderConfirm = params.get('name');
    document.querySelector('#orderId').innerHTML = orderConfirm;
};
getOrderId();*/
