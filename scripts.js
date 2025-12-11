// ===============================
// VARIABLES
// ===============================
let productos = [];
let carrito = [];
let admin = false;
const PIN_CORRECTO = "1234"; // podés cambiarlo


// ===============================
// CAMBIAR PANTALLAS
// ===============================
function mostrarPantalla(id) {
    document.querySelectorAll(".pantalla").forEach(p => p.classList.add("oculto"));
    document.getElementById(id).classList.remove("oculto");

    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("activo"));

    const btnActivo = [...document.querySelectorAll(".nav-btn")].find(b =>
        b.textContent.toLowerCase() === id.toLowerCase()
    );

    if (btnActivo) btnActivo.classList.add("activo");

    if (id === "catalogo") mostrarCatalogo();
    if (id === "carrito") mostrarCarrito();
}


// ===============================
// CARGAR PRODUCTOS JSON
// ===============================
async function cargarProductos() {
    try {
        const res = await fetch("productos.json");
        productos = await res.json();
    } catch (err) {
        console.log("Error cargando JSON:", err);
    }
}

cargarProductos();


// ===============================
// MOSTRAR CATALOGO
// ===============================
function mostrarCatalogo() {
    const cont = document.getElementById("lista-productos");
    cont.innerHTML = "";

    productos.forEach(prod => {
        const card = document.createElement("div");
        card.className = "producto";

        card.innerHTML = `
            <h3>${prod.nombre}</h3>
            <p><strong>Material:</strong> ${prod.material}</p>
            <p><strong>Tamaño:</strong> ${prod.tamano}</p>
            <p><strong>Ideal para:</strong> ${prod.ideal}</p>
            <p><strong>Características:</strong> ${prod.caracteristicas}</p>
            <h3>$ ${prod.precio}</h3>
            <button onclick="agregarAlCarrito(${prod.id})">Agregar</button>
        `;

        cont.appendChild(card);
    });
}


// ===============================
// CARRITO
// ===============================
function agregarAlCarrito(id) {
    carrito.push(id);
    alert("Agregado al carrito");
}

function mostrarCarrito() {
    const cont = document.getElementById("lista-carrito");
    cont.innerHTML = "";

    if (carrito.length === 0) {
        cont.innerHTML = "<p>Tu carrito está vacío.</p>";
        return;
    }

    carrito.forEach((idProd, index) => {
        const prod = productos.find(p => p.id === idProd);

        const card = document.createElement("div");
        card.className = "producto";

        card.innerHTML = `
            <h3>${prod.nombre}</h3>
            <p>$ ${prod.precio}</p>
            <button onclick="eliminarDelCarrito(${index})">Quitar</button>
        `;

        cont.appendChild(card);
    });
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
}


// ===============================
// ADMIN
// ===============================
function verificarPin() {
    const pinIngresado = document.getElementById("pinAdmin").value;

    if (pinIngresado === PIN_CORRECTO) {
        admin = true;
        alert("Modo administrador activado (simulado)");
    } else {
        admin = false;
        alert("PIN incorrecto");
    }
}

function entrarComoCliente() {
    mostrarPantalla("catalogo");
}


// ===============================
// COMPRA
// ===============================
function compraExitosa() {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    alert("Pedido realizado con éxito");
    carrito = [];
    mostrarPantalla("inicio");
}


// ===============================
// CONTACTO
// ===============================
function mensajeEnviado() {
    alert("Mensaje enviado");
}

