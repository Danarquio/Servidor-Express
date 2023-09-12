import {promises as fs} from "fs"


class ProductManager {
    constructor (){ 
        this.path = "./src/models/products.json"
    }

    readProducts = async () => {
        let products = await fs.readFile(this.path , "utf-8")
        return JSON.parse(products)
    }

    writeProducts = async (product) =>{
        await fs.writeFile(this.path , JSON.stringify(product))
        
    }

    exist = async(id) => {
        let products= await this.readProducts()
        return products.find(prod => prod.id === id)
    }

    addProducts = async (product) => {
        const { title, description, code, price, status, stock, category } = product;
  
        if (
            typeof title !== "string" ||
            typeof description !== "string" ||
            typeof code !== "string" ||
            typeof price !== "number" ||
            typeof status !== "boolean" ||
            typeof stock !== "number" ||
            typeof category !== "string"
        ) {
            return "Todos los campos son requeridos y deben tener el tipo de valor correcto";
        }
    
        let productsOld = await this.readProducts();

        product.id = productsOld.length + 1;
        let productAll = [...productsOld, product];
        await this.writeProducts(productAll);
        return "Producto Agregado";
    }
    
    
    
    getProducts = async () => {
        return await this.readProducts()
    }

    getProductsById = async (id) => {
        let productsById = await this.exist(id)
        if ( !productsById) return "Producto no encontrado :("
        return productsById
    }

    updateProducts = async (id, product) => {
        let productsById= await this.exist(id)
        if ( !productsById) return "Producto no encontrado :("
        await this.deleteProducts(id)
        let productsOld =await this.readProducts()
        let products = [{...product, id:id}, ...productsOld]
        await this.writeProducts(products)
        return "Producto Actualizado"
    }

    deleteProducts = async (id) => {
        let products= await this.readProducts()
        let existProducts = products.some( prod => prod.id === id)
        if (existProducts) {
            let filterProducts = products.filter( prod => prod.id != id)
            await this.writeProducts(filterProducts)
            return "Producto eliminado"
        } 
        return "Producto no existe"
    }

}

export default ProductManager

