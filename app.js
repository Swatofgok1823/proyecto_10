require('colors');
const fs = require('fs');
const readline = require('readline');

const datosArchivos = require('./datos.json');

const main = async () => {
    console.clear();
    console.log('*****************************');
    console.log('**     PROYECTO CLASES     **');
    console.log('*****************************\n');

    class Producto {
        #codigoProducto;
        #nombreProducto;
        #inventarioProducto;
        #precioProducto;

        constructor() {
            this.#codigoProducto = '';
            this.#nombreProducto = '';
            this.#inventarioProducto = 0;
            this.#precioProducto = 0;
        }

        setCodigoProducto(value) {
            this.#codigoProducto = value;
        }

        getCodigoProducto() {
            return this.#codigoProducto;
        }

        setNombreProducto(value) {
            this.#nombreProducto = value;
        }

        getNombreProducto() {
            return this.#nombreProducto;
        }

        setInventarioProducto(value) {
            this.#inventarioProducto = value;
        }

        getInventarioProducto() {
            return this.#inventarioProducto;
        }

        setPrecioProducto(value) {
            this.#precioProducto = value;
        }

        getPrecioProducto() {
            return this.#precioProducto;
        }
    }

    class ProductoTienda {
        #listaProductos;

        constructor() {
            this.#listaProductos = [];
        }

        getListaProductos() {
            return this.#listaProductos;
        }

        cargaArchivosProductos() {
            let contador = 0;
            if (datosArchivos.length > 0) {
                datosArchivos.forEach((objeto) => {
                    contador++;
                    let producto = new Producto();
                    producto.setCodigoProducto(objeto.codigoProducto);
                    producto.setNombreProducto(objeto.nombreProducto);
                    producto.setInventarioProducto(objeto.inventarioProducto);
                    producto.setPrecioProducto(objeto.precioProducto);
                    this.#listaProductos.push(producto);
                });
            } else {
                console.log(`ERROR, el archivo datos.json no contiene datos\n`.bgRed);
            }
            console.log(`total de productos cargados ===>`.bgBlue + ` ${contador}`.bgRed);
        }

        grabaArchivoProducto() {
            const instanciaClaseAObjetos = this.#listaProductos.map((producto) => {
                return {
                    codigoProducto: producto.getCodigoProducto(),
                    nombreProducto: producto.getNombreProducto(),
                    inventarioProducto: producto.getInventarioProducto(),
                    precioProducto: producto.getPrecioProducto(),
                };
            });

            const cadenaJson = JSON.stringify(instanciaClaseAObjetos, null, 2);
            const nombreArchivo = 'datos.json';
            fs.writeFileSync(nombreArchivo, cadenaJson, 'UTF-8');

            console.log(`DATOS GUARDADOS EN ${nombreArchivo}`.bgMagenta);
        }

        mostrarProductos() {
            this.#listaProductos.forEach((producto) => {
                console.log(
                    `|    ` +
                    producto.getCodigoProducto() +
                    `      |` +
                    `|    ` +
                    producto.getNombreProducto() +
                    `      |` +
                    `|    ` +
                    producto.getInventarioProducto() +
                    `       |` +
                    `|    ` +
                    producto.getPrecioProducto() +
                    `      |`
                );
            });
        }

        addNuevoProducto() {
        
            
            const readl = require ('readline').createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            const produtosTienda = this;

            function siOrNO (){
                readl.question("¿Quiere agregar un nuevo producto? (si/no)",  (respuesta) =>{
                    if (respuesta.toLowerCase()==='si'){
                        addProducto();
                    } else if(respuesta.toLowerCase() === 'no'){
                        console.log(`saliendo//--//-//`)
                        readl.close();
                    } else{
                        console.log(`solo se puede responder Si. o No.`);
                        siOrNO();
                    }
                });
            }
            siOrNO();

            function addProducto(){
            readl.question('Digite el código de un nuevo producto: ', (codigo) => {
                readl.question('Digite el nombre del nuevo producto: ', (nombre) => {
                    readl.question('Ingrese el inventario del nuevo producto: ', (inventario) => {
                        readl.question('Digite el precio del nuevo producto: ', (precio) => {
                            // readl.question('Ingrese el nombre del cliente: ', (cliente) => {
                                const nuevoProducto = new Producto();
                                nuevoProducto.setCodigoProducto(codigo);
                                nuevoProducto.setNombreProducto(nombre);
                                nuevoProducto.setInventarioProducto(parseInt(inventario));
                                nuevoProducto.setPrecioProducto(parseFloat(precio));
                                
                                // this.ListaProductos.push(addProducto);
                                // this.grabaArchivoProducto();
                                productosTienda.getListaProductos().push(nuevoProducto);
                                productosTienda.grabaArchivoProducto();

                                readl.close();
                                
                            // });
                        });
                    });
                });
            });
        }   
    }}    
    
   
    
    

    let productosTienda = new ProductoTienda();

    productosTienda.cargaArchivosProductos();
    

    console.log(`DATOS APERTURA TIENDA`.bgBlue);
    
    productosTienda.mostrarProductos();
    
    productosTienda.getListaProductos().forEach((producto) => {
        producto.setInventarioProducto(Math.floor(Math.random() * (20 - 1) + 1));
    });
    
    console.log(`DATOS CIERRE TIENDA`.bgGreen);
    productosTienda.mostrarProductos();
    
    productosTienda.grabaArchivoProducto();

    productosTienda.addNuevoProducto();
}

main();
