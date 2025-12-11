// ===============================
// VARIABLES
// ===============================
let productos = [];
let carrito = [];
let admin = false;
const PIN_CORRECTO = "1234";


// ===============================
// CAMBIO DE PANTALLA
// ===============================
function mostrarPantalla(id) {
    document.querySelectorAll(".pantalla").forEach(p => p.classList.add("oculto"));
    document.getElementById(id).classList.remove("oculto");

    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("activo"));
    const btn = [...document.querySelectorAll(".nav-btn")].find(x => x.textContent.toLowerCase() === id);
    if (btn) btn.classList.add("activo");

    if (id === "catalogo") mostrarCatalogo();
    if (id === "carrito") mostrarCarrito();
}


// ===============================
// CARGAR JSON
// ===============================
async function cargarProductos() {
    const res = await fetch("productos.json");
    productos = await res.json();
}
cargarProductos();


// ===============================
// CATALOGO
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

    carrito.forEach((idProd, i) => {
        const prod = productos.find(p => p.id === idProd);

        const card = document.createElement("div");
        card.className = "producto";

        card.innerHTML = `
            <h3>${prod.nombre}</h3>
            <p>$ ${prod.precio}</p>
            <button onclick="eliminarDelCarrito(${i})">Quitar</button>
        `;

        cont.appendChild(card);
    });
}

function eliminarDelCarrito(i) {
    carrito.splice(i, 1);
    mostrarCarrito();
}


// ===============================
// ADMIN
// ===============================
function verificarPin() {
    const pin = document.getElementById("pinAdmin").value;

    if (pin === PIN_CORRECTO) {
        admin = true;
        document.getElementById("admin-panel").classList.remove("oculto");
        alert("Modo administrador activado");
    } else {
        admin = false;
        alert("PIN incorrecto");
    }
}

function agregarMacetaAdmin() {
    if (!admin) {
        alert("No sos admin");
        return;
    }

    const nueva = {
        id: productos.length + 1,
        nombre: document.getElementById("admin-nombre").value,
        precio: Number(document.getElementById("admin-precio").value),
        material: document.getElementById("admin-material").value,
        tamano: document.getElementById("admin-tamano").value,
        ideal: document.getElementById("admin-ideal").value,
        caracteristicas: document.getElementById("admin-caract").value,
        imagen: document.getElementById("admin-imagen").value
    };

    productos.push(nueva);
    mostrarCatalogo();
    alert("Maceta agregada");
}


// ===============================
// COMPRA Y CONTACTO
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

function mensajeEnviado() {
    alert("Mensaje enviado");
}

