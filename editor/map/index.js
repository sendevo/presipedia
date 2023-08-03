const PROVINCES = ["BuenosAires", "LaRioja", "Misiones", "SantaCruz", "LaPampa", "Mendoza", "Salta", "SantiagoDelEstero", "TierraDelFuego", "RioNegro", "Catamarca", "Jujuy", "Chaco", "Formosa", "EntreRios", "Chubut", "Neuquen", "Cordoba", "Tucuman", "SantaFe", "Corrientes", "SanJuan", "SanLuis", "CABA", "CABA2"];

const setProvinceSelected = (name,selected) => {
    document.getElementById(name).style.fill = selected ? "rgba(0,0,255,0.7)" : "#DDDDDD";
};