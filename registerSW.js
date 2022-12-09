// Verifico si el navegador soporta SW
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./serviceworker.js')
    .then((message) => {
        console.log('Service Worker OK');
    });
}else {
    console.log('Service Worker no esta soportado en este navegador');
}