const menuOpen = document.querySelector('#menu')
const nav = document.querySelector('#nav')
const select = document.querySelector('#category')

const cartContent = document.querySelector("#carrito-contenedor")
const btnCartContent = document.querySelector("#cart-content")
const cartModal = document.querySelector(".modal")
const modalCart = document.querySelector("#carritoModal")
const countContentCart = document.getElementById("countContentCart")
const opcionesNav = nav.querySelectorAll('li')

const contentDetalles = document.querySelector('.contentDetalles')

const buttonArticulo = document.querySelector('#articulos')
const modalDetalles = document.querySelector('.modalDetalles')
const toastMessage = document.querySelector('.toastMessage')

const totalCarrito = document.querySelector('#total')
const cerrarCarrito = document.querySelector('#cerrarCarrito')



let ExistingToCart = false
let carrito = []

const Toast = (viewToast) =>{
    
    if (viewToast){
        toastMessage.classList.remove('hiddenToast')
        setTimeout(()=>{
            toastMessage.classList.add('hiddenToast') 
            viewToast = false}, 4000)
    }
}


//array con articulos
const articulos = [{
    "id":0,
    "img":"ram.jpg",
    "titulo":"Ram FURY",
    "descripcion":"Ram FURY 16GB DDR4 3600mhz",
    "stock":20,
    "category":"hardware",
    "precio":2000
},
{
    "id":1,
    "img":"hdmi.jpg",
    "titulo":"Cable HDMI",
    "descripcion":"Cable HDMI soporte 4K - 3Mts",
    "stock":4,
    "category":"cables",
    "precio":4000
},
{
    "id":2,
    "img":"noga.png",
    "titulo":"Mouse gamer Noga",
    "descripcion":"Mouse gamer retroiluminado 1000DPI con cable",
    "stock":6,
    "category":"accesorios",
    "precio": 10000
},
{
    "id":3,
    "img":"redragon.png",
    "titulo":"Teclado Redragon",
    "descripcion":"Teclado mecanico Redragon, retroiluminado 60%",
    "stock":15,
    "category":"accesorios",
    "precio": 10000
},
{
    "id":4,
    "img":"aire.jpg",
    "titulo":"Aire comprimido",
    "descripcion":"Removedor de Partículas con gas inerte de gran presión",
    "stock":30,
    "category":"proteccion",
    "precio": 10000
},
{
    "id":5,
    "img":"coler.jpg",
    "titulo":"Cooler Intel",
    "descripcion":"Intel Cooler CPU Original Cobre LGA1200 K69237-001",
    "stock":100,
    "category":"hardware",
    "precio": 10000
}]



modalCart.addEventListener('click', (e) =>{
    e.stopPropagation()
})

document.addEventListener('click', (e) =>{
    if(!cartModal.classList.contains('ocultarCarrito') && !modalCart.contains(e.target)){
        cartModal.classList.add('ocultarCarrito')
        document.body.style.overflow = 'auto';
    }

    if(!modalDetalles.classList.contains('ocultarDetalles') && !contentDetalles.contains(e.target)){
        modalDetalles.classList.add('ocultarDetalles')
        document.body.style.overflow = 'auto';
    }

})

contentDetalles.addEventListener('click', (e) =>{
    e.stopPropagation()
    const addToCartButton = e.target.closest('.agregarCarrito')
    const payNowButton = e.target.closest('.comprarAhora')

    if(addToCartButton){
        addCart(articulos[addToCartButton.id])
        viewCart()
        Toast(true)
    }
    if(payNowButton){
        alert("Gracias por tu compra!")
    }
})



cerrarCarrito.addEventListener('click',(e)=>{
    e.stopPropagation()
    cartModal.classList.add('ocultarCarrito')
    document.body.style.overflow = 'auto';
})

buttonArticulo.addEventListener('click', (e)=>{
    e.stopPropagation()
    const cardDetails = e.target.closest('.card')
    console.log(cardDetails)
    if (cardDetails){
        modalDetalles.classList.remove('ocultarDetalles')
        document.body.style.overflow = 'hidden';
        mostrarDetalles(articulos[cardDetails.id])

    }
})



btnCartContent.addEventListener('click', (e) =>{
    e.stopPropagation()
    cartModal.classList.remove("ocultarCarrito")
    document.body.style.overflow = 'hidden';
})

menuOpen.addEventListener('click', ()=>{
    const expanded = menuOpen.getAttribute('aria-expanded') === 'true' || 'false'
    menuOpen.setAttribute('aria-expanded', !expanded)
    nav.classList.toggle('mostrar')
    menuOpen.classList.toggle('bi-x-lg')
})

opcionesNav.forEach(opcion =>{
    opcion.addEventListener('click', ()=>{
        menuOpen.setAttribute('aria-expanded', 'false')
        nav.classList.remove('mostrar')
    })
})

//filtrar articulos por categoria
const filterArticules = () => {
    //verificamos si el selector esta en la categoria 'todos'
    if (select.value === "todos"){
        return articulos //-> retorno el array normal
    }
    //de lo contrario retorno el filtro al articulo que coincida con el selector
    return articulos.filter(items => items.category === select.value)
}


 
//mostramos el filtro para inyectarlo en el DOM
const mostrarFiltro = () => {

    const filtro = filterArticules()

    const contenedor = document.getElementById('articulos')

    contenedor.innerHTML = "";



    filtro.forEach(items =>{
        const precioFormateado = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS', 
          }).format(items.precio);
        let div = document.createElement('div');

        div.classList.add("card");
        div.id = items.id

        div.innerHTML = `
                <div class="header-card">
                    <img src="public/assets/${items.img}" alt="${items.titulo}">
                        <div>
                            <h1>${items.titulo}</h1>
                            <strong class="">Precio: <span>${precioFormateado.replace(',00','')}</span></strong>
                        </div>
                </div>
                <div class="descripcion-card">
                    <p>Ver detalles!</p>
                </div>
                `;

        contenedor.appendChild(div);

      });

      //Manejo de eventos del boton 'agregar' dentro del contenedor 'card'
      contenedor.addEventListener('click', (e)=>{

        if(e.target.matches('.btnCart')){

            const idArticulo = parseInt(e.target.id);

            const articuloSeleccionado = articulos[idArticulo];

            e.stopPropagation();

            addCart(articuloSeleccionado);

            viewCart();
        };
    });

      
    
}

const mostrarDetalles = (articulo) =>{
    const articuloFind = articulos.filter(item => item.id === articulo.id)
    contentDetalles.innerHTML = ""

    articuloFind.forEach(item => {
        const precioFormateado = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS', 
          }).format(item.precio);
        contentDetalles.innerHTML = `
        <div class="imgDetalles">
                <img src="public/assets/${item.img}" alt="name">
                <div class="headerDetalles">
                    <div>
                        <h1>${item.titulo}</h1>
                        <span>${precioFormateado.replace(",00","")}</span>
                    </div>
                    <div>
                        <h4>Stock: <span>${item.stock}</span></h4>
                    </div>
                </div>
            </div>
            <div class="bodyDetalles">
                <div>
                    <h4>Detalles</h4>
                    <div>
                        <p>${item.descripcion}</p>
                    </div>
                </div>
                <div class="bodyButtons">
                    <button class="comprarAhora" id="${item.id}">Comprar ahora</button>
                    <button class="agregarCarrito" id="${item.id}">Agregar al carrito</button>
                </div>
            </div>`
        
    })
}

//funcion para agregar losa articulos al array
const addCart = (articulo) =>{
    //busco el articulos por ID
    const findArticulo = carrito.find(item => item.id === articulo.id)

    //si existe, le sumo la propiedad cantidad del articulo
    if (findArticulo){
        findArticulo.cantidad += 1
    }
    //si no existe, pusheo con el spread operator copiando los objetos del array 'articulos'  dentro del array carrito y le asigno una nueva propiedad a cada objeto 'cantidad: 1'
    else{
        carrito.push({...articulo, cantidad: 1})
    }
    

}


//Logica para manejar los events listener dentro de contenedor "carrito", con esto
//puedo detectar cuando ocurren eventos dentro del contenedor, para asi buscar botones correctos y evitar la duplicacion de eventos
const contenedor = document.getElementById('carrito-contenedor')
contenedor.addEventListener('click', (e)=>{
    const botonDelete = e.target.closest('.deleteCart')
    const botonResta = e.target.closest('.restCart')

    //el boton se clickea, entonces se elimina el articulo por ID
    if (botonDelete){
        e.stopPropagation()

        const idArticulo = parseInt(botonDelete.id);
        const articuloSeleccionado = articulos.find(item => item.id === idArticulo);
        eliminarProducto(articuloSeleccionado)

    }
    
    //el boton se clickea, entonces resto el articulo por ID
    if (botonResta){
        e.stopPropagation()

        const idArticulo = parseInt(botonResta.id);
        const articuloSeleccionado = articulos.find(item => item.id === idArticulo);
        restarProducto(articuloSeleccionado)
    }
})

function viewCart(){
    //contar la cantidad de articulos que tienen el carrito
    const countObject = carrito.reduce((prev, item) =>{
        return prev + item.cantidad
    },0)

    //Obtenemos el total sumando el total de cada artiuclo
    const totalCart = carrito.reduce((totalAnt, totalAct) =>{
        return totalAnt + totalAct.precio * totalAct.cantidad //-> retornamos el total
    }, 0)

    //formateo el precio en la moneda local
    const precioFormateado = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS', 
      }).format(totalCart)
;
    totalCarrito.textContent = precioFormateado.replace(',00',"")
    //se los asigno al texto de la etiqueta <span>
    countContentCart.textContent = countObject
    if (countContentCart.classList.contains('viewNotContentCart') && countContentCart >= 1){
        countContentCart.classList.remove('viewNotContentCart')
    }
    

    contenedor.innerHTML = ""

    carrito.forEach(items=>{
        let div = document.createElement('div')
        div.classList.add('viewCartData')


        div.innerHTML = `
            <img src="public/assets/${items.img}" alt="icon">
                <div class="headerCart">
                    <h1>${items.titulo}</h1>
                    <span>Cantidad: ${items.cantidad}</span>
                </div>
                <div class="btnsCart">
                    
                    <button class="restCart" id="${items.id}" ><i class="bi bi-cart-x-fill" ></i></button>
                    <button class="deleteCart" id="${items.id}" ><i class="bi bi-trash3-fill"></i></button>
                    
                </div>
        `
        contenedor.appendChild(div)
    })
    
}
const eliminarProducto = (articulo) => {
    const findArticulo = carrito.find(item => item.id === articulo.id)

    //-> se encontro el articulo
    if (findArticulo){
        //obtengo el index del articulo
        const deleteObject = carrito.findIndex(item => item.id === articulo.id)

        //->verifica si la variable deleteObjec es diferentes de -1 (el objeto existe) 
        if (deleteObject !== -1){
            //lo elimino mediante el indice 
            const deleting = carrito.splice(deleteObject, 1)[0]
            viewCart()
            
        }
        
    }
};
const restarProducto = (articulo) => {
    const findArticulo = carrito.find(item => item.id === articulo.id);

    //siempre que sea mayor a 2 articulos se va a restar
    if(findArticulo.cantidad >= 2){
        findArticulo.cantidad -= 1
    }
    //en caso de que sea estrictamente igual a 1, se elimina al volver apretar el boton de resta
    else if (findArticulo.cantidad === 1){
        eliminarProducto(findArticulo)
    }
    viewCart()

    
};
//llamamos a la constante para que se carguen los articulos
mostrarFiltro() 

//del elemento con la ID category esperamos el evento 'change' para aplicar el filtro
document.getElementById('category').addEventListener('change', mostrarFiltro)

