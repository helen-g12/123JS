
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
 

  //  Mostrar menú
  function mostrarMenu() {
    console.clear();
    console.log("=========== MIAU BREW – MENÚ ===========");
    menuBebidas.forEach((item) =>
      console.log(`${item.id}. ${item.nombre} — $${item.precio}`)
    );
    console.log("========================================\n");
  }
  
  // Agregar bebida al carrito
  function agregarAlCarrito() {
    const idElegido = parseInt(
      prompt("Ingresa el número de la bebida que quieres probar:")
    );
  
    const bebida = menuBebidas.find((b) => b.id === idElegido);
  
    if (!bebida) {
      alert("❌ Esa bebida no existe. Intenta de nuevo, maullido.");
      return;
    }
  
    const cantidad = parseInt(
      prompt(`¿Cuántos ${bebida.nombre} deseas? (solo números)`)
    );
  
    if (isNaN(cantidad) || cantidad <= 0) {
      alert("❌ Cantidad inválida, miau.");
      return;
    }
  
    carrito.push({ ...bebida, cantidad });
    alert(` Añadiste ${cantidad} × ${bebida.nombre} a tu carrito.`);
  }
  
  //  Mostrar resumen y aplicar descuento
  function mostrarResumen() {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío 😿");
      return;
    }
  
    let subtotal = 0;
    console.log("========= RESUMEN DE TU PEDIDO =========");
    carrito.forEach((item) => {
      const linea = item.precio * item.cantidad;
      subtotal += linea;
      console.log(
        `${item.cantidad} × ${item.nombre} — $${item.precio} c/u = $${linea}`
      );
    });
    console.log("----------------------------------------");
    console.log(`Subtotal: $${subtotal}`);
  
    let descuento = 0;
    if (subtotal >= UMBRAL_DESCUENTO) {
      descuento = subtotal * PORCENTAJE_DESC;
      console.log(`Descuento gatuno 10 %: -$${descuento}`);
    }
  
    const total = subtotal - descuento;
    console.log(`TOTAL A PAGAR: $${total}`);
    console.log("========================================\n");
  
    alert(
      `¡Gracias por apoyar a nuestros michis!\n` +
      `Subtotal: $${subtotal}\n` +
      `Descuento: $${descuento}\n` +
      `TOTAL: $${total}`
    );
  }
  
  /* ====== FLUJO PRINCIPAL ====== */
  
  mostrarMenu();
  
  let seguirComprando = true;
  while (seguirComprando) {
    agregarAlCarrito();
    seguirComprando = confirm("¿Quieres añadir otra bebida?");
  }
  
  mostrarResumen();
  