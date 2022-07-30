const fs = require('fs')

class Contenedor {
    constructor(ruta) {
        this.ruta = ruta

    }
    async save(obj) {
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            if (dataArchParse.lenght) {
                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchParse, { obj, id: dataArchParse[dataArchParse.lenght-1].id + 1 }], null, 2))

            } else {
                await fs.promises.writeFile(this.ruta, JSON.stringify([{ ...obj, id:1 }], null, 2))
            }

        } catch (error) {
            console.log(error);
        }


    }


    async getByID(id) {
        try {
            let dataFile = await fs.promises.readFile(this.ruta, 'utf-8')
            let dataFileParse = JSON.parse(dataFile)
            let prod = dataFileParse.find(prod => prod.id === id)
            if (prod) {
                console.log(prod);
            } else {
                console.log('el producto no existe');
            }
        } catch (error) {

        }
    }


    async getByIdRandom(){
        try {
            let dataFile = await fs.promises.readFile(this.ruta, 'utf-8')
            let dataFileParse = JSON.parse(dataFile)

            let producto = dataFileParse [Math.floor(Math.random()*dataFileParse.length)]
            return producto
        } catch (error) {
            console.log(error);
        }
    }


    async getAll() {
        try {
            let dataFile = await fs.promises.readFile(this.ruta, 'utf-8')
            let dataFileParse = JSON.parse(dataFile)
            if (dataFileParse.length) {
                return dataFileParse

            } else {
                console.log('sin productos');
            }
        } catch (error) {

        }

    }


    async delete(id){
        try {
            let dataFile = await fs.promises.readFile(this.ruta, 'utf-8')
            let dataFileParse = JSON.parse(dataFile)
            let prod = dataFileParse.find(prod => prod.id === id)
            if (prod) {
                let dataFileParseF = dataFileParse.filter(prod=>prod.id !== id)
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataFileParseF, null,2))
                console.log('Se elimino el producto');
            } else {
                console.log('el producto no existe');
            }
        } catch (error) {

        }
    }


    async deleteALL(){
        await fs.promises.writeFile(this.ruta, JSON.stringify([], null,2))
    }

}

module.exports = Contenedor