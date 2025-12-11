// ===== VARIABLES =====
let productos = [];
let carrito = [];
const PIN_ADMIN = "1234"; // Podés cambiarlo
let adminActivo = false;


// ===== CAMBIO DE PANTALLA =====
function mostrarPantalla(id) {
    document.querySelectorAll(".pantalla").forEach(p => p.classList.add("oculto"));
    document.getElementById(id).classList.remove("oculto");

    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("activo"));
    const btn = [...document.querySelectorAll(".nav-btn")].find(x => x.textContent.toLowerCase() === id);
    if (btn) btn.classList.add("activo");

    if (id === "catalogo") mostrarProductos();
    if (id === "carrito") mostrarCarrito();
}


// ===== CARGAR JSON =====
async function cargarProductos() {
    try {
        const res = await fetch("productos.json");
        productos = await res.json();
        mostrarProductos();
    } catch (e) {
        console.log("Error cargando JSON:", e);
    }
}


// ===== MOSTRAR CATÁLOGO =====
function mostrarProductos() {
    const cont = document.getElementById("catalogo-lista");
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
            <button onclick="agregarAlCarrito(${prod.id})">+</button>
        `;

        cont.appendChild(card);
    });
}


// ===== AGREGAR AL CARRITO =====
function agregarAlCarrito(id) {
    carrito.push(id);
    alert("Agregado al carrito");
}


// ===== QUITAR DEL CARRITO =====
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
}


// ===== MOSTRAR CARRITO =====
function mostrarCarrito() {
    const cont = document.getElementById("carrito-lista");
    cont.innerHTML = "";

    if (carrito.length === 0) {
        cont.innerHTML = "<p>El carrito está vacío.</p>";
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


// ===== FINALIZAR COMPRA =====
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    alert("Pedido exitoso");
    carrito = [];
    mostrarPantalla("inicio");
}


// ===== MENSAJE DE CONTACTO =====
function enviarMensaje() {
    alert("Mensaje enviado");
}


// ===== VALIDAR PIN ADMIN =====
function entrarAdmin() {
    const pin = document.getElementById("admin-pin").value;

    if (pin === PIN_ADMIN) {
        adminActivo = true;
        document.getElementById("admin-panel").style.display = "block";
        alert("Modo administrador activado");
    } else {
        alert("PIN incorrecto");
        adminActivo = false;
    }
}


// ===== AGREGAR MACETA DESDE ADMIN =====
function agregarMacetaAdmin() {
    if (!adminActivo) {
        alert("No sos admin");
        return;
    }

    const nombre = document.getElementById("nombre-maceta").value;
    const precio = document.getElementById("precio-maceta").value;
    const descripcion = document.getElementById("descripcion-maceta").value;
    const imagen = document.getElementById("imagen-maceta").value;

    if (!nombre || !precio || !descripcion || !imagen) {
        alert("Faltan datos");
        return;
    }

    const nueva = {
        id: productos.length + 1,
        nombre,
        precio: Number(precio),
        material: "Material no especificado",
        tamano: "Tamaño no especificado",
        ideal: "No especificado",
        caracteristicas: descripcion,
        imagen
    };

    productos.push(nueva);

    mostrarProductos();
    alert("Maceta agregada localmente");
}


// ===== INICIALIZAR =====
cargarProductos();
