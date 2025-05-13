
// Menú de bebidas gatunas
const menuBebidas = [
    { id: 1, nombre: "Cat‑puccino",     precio: 55 },
    { id: 2, nombre: "Miau‑latte",      precio: 60 },
    { id: 3, nombre: "Ginger Cat Tea",  precio: 45 },
    { id: 4, nombre: "Whisker Mocha",   precio: 65 },
  ];
  
  // Carrito de compras
  let carrito = [];
  
  // Política de descuento
  const UMBRAL_DESCUENTO   = 250;  
  const PORCENTAJE_DESC    = 0.1;  

 
   
   const menuDiv = document.getElementById("menu");
   const carritoContenido = document.getElementById("carritoContenido");
   const totalesDiv = document.getElementById("totales");
   const mostrarResumenBtn = document.getElementById("mostrarResumen");

   
  function renderMenu() {
  menuBebidas.forEach(bebida => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${bebida.nombre}</h3>
      <p>$${bebida.precio}</p>
      <input type="number" id="cant-${bebida.id}" min="1" value="1" />
      <button onclick="agregarAlCarrito(${bebida.id})">Agregar</button>
    `;

    menuDiv.appendChild(card);
  });
}
    function agregarAlCarrito(id) {
  const bebida = menuBebidas.find(b => b.id === id);
  const input = document.getElementById(`cant-${id}`);
  const cantidad = parseInt(input.value);

  if (isNaN(cantidad) || cantidad <= 0) return;

  const existente = carrito.find(i => i.id === id);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ ...bebida, cantidad });
  }

  localStorage.setItem("carritoYaong", JSON.stringify(carrito));
}
   function mostrarResumen() {
  carritoContenido.innerHTML = "";
  totalesDiv.innerHTML = "";

  if (carrito.length === 0) {
    carritoContenido.innerHTML = "<p>Tu carrito está vacío 🐱</p>";
    return;
  }

  let subtotal = 0;

  carrito.forEach(item => {
    const linea = item.precio * item.cantidad;
    subtotal += linea;

    const p = document.createElement("p");
    p.textContent = `${item.cantidad} × ${item.nombre} — $${item.precio} c/u = $${linea}`;
    carritoContenido.appendChild(p);
  });

  let descuento = subtotal >= UMBRAL_DESCUENTO ? subtotal * PORCENTAJE_DESC : 0;
  let total = subtotal - descuento;

  totalesDiv.innerHTML = `
    <p>Subtotal: $${subtotal}</p>
    <p>Descuento: $${descuento}</p>
    <p><strong>Total a pagar: $${total}</strong></p>
  `;
}
     mostrarResumenBtn.addEventListener("click", mostrarResumen);
renderMenu();


