
// Menú de bebidas gatunas
let menuBebidas = [];

fetch("js/productos.json")
  .then(res => res.json())
  .then(data => {
    menuBebidas = data;
    renderMenu();  
  });
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

   Swal.fire({
    title: "¡Bebida añadida!",
    text: `${cantidad} × ${bebida.nombre}`,
    icon: "success",
    timer: 1500,
    showConfirmButton: false
  });
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

    document.getElementById("finalizarCompra").addEventListener("click", () => {
  if (carrito.length === 0) {
    Swal.fire("Tu carrito está vacío 😿");
    return;
  }

  Swal.fire({
    title: "¿Confirmar pedido?",
    text: "Tu orden será enviada al universo gatuno",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, confirmar",
    cancelButtonText: "No, aún no"
  }).then(result => {
    if (result.isConfirmed) {
      carrito = [];
      localStorage.removeItem("carritoYaong");
      renderCart(); // limpia pantalla
      Swal.fire("¡Gracias por tu pedido! 😻", "", "success");
    }
  });
});
