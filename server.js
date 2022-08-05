console.log('corriendo');

const express = require('express');
const Contenedor = require('./contenedor');
const {Router} = express

const app = express()
const routerProductos = Router()
const PORT = process.env.PORT || 8080



app.use(express.json())
app.use(express.static('public')) // se va a mostrar primero por prioridad y hace referencia a la carpeta public y adentro al index
app.use(express.urlencoded({extended:true}))

app.use('/api/productos', routerProductos)

//// ****************************  - para usar con router /////

// routerProductos.get('/productos', (req,res)=>{
//     const contenedor = new Contenedor('./productos.txt')
//     const productos = contenedor.getAll()
//     console.log(productos);
//     res.send('prod') // aca modificar para ver el TXT
// })

// routerProductos.post('/', ()=>{})

// ////// ***********  ///////
// app.use('/productos', routerProductos)

////// ****************************************************************////


app.get('/productos', async (req,res)=>{
    const contenedor = new Contenedor('./productos.txt')
    try {
        const productos = await contenedor.getAll()
    console.log(productos);
    res.json({
        productos
    })
    } catch (error) {
        
    }
    
})

app.get('/productosramdom', async (req,res)=>{
    const contenedor = new Contenedor('./productos.txt')
    try {
        const producto = await contenedor.getByIdRandom()
        res.send(producto)
    } catch (error) {
        
    }

})

app.listen(PORT, ()=>{
    console.log('server andando');
})



///////



routerProductos.post('/',(req,res)=>{
    const objProducto = req.body
    res.json({
        mensaje:'producto guardado',
        objProducto
    })
    // const contenedor = new contenedor('')
    

})




routerProductos.get('/',)


routerProductos.put('/:id',(req,res)=>{
    const {id} = req.params
    const objProducto = req.body
    // const {title,price, thumbnail} = req.body
    const contenedor = new Contenedor('./productos.txt')
    contenedor.upById({id: parseInt(id), ...objProducto})
    const respuesta = upById({id,title,price,thumbnail})
    res.json({respuesta})
})









