
document.addEventListener('DOMContentLoaded',()=>{
    if(document.querySelector('#ubicacion-curso')){
        mostrarMapa();
    }
})

function mostrarMapa(){
const lat= document.querySelector('#lat').value,
      lng= document.querySelector('#lng').value,
      direccion= document.querySelector('#direccion').value;

    var map = L.map('ubicacion-curso').setView([lat, lng], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([lat, lng]).addTo(map)
        .bindPopup(direccion)
        .openPopup();
}

