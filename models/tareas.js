const Tarea = require("./tarea")
const colors = require('colors')


class Tareas {

    constructor () {
        this._listado = {}
    }

    borrarTarea ( id= '') {
        if (this._listado[id]) {
            delete this._listado[id]
        }
    }

    cargarTareasFromArray ( tareas = []) {
        tareas.forEach(tarea => {this._listado[tarea.id] = tarea})
    }

    get listadoArray() {
        const listado = []
        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key])
        })
        return listado
    }

    crearTarea (desc = '') {
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }

    listadoCompleto () {
        console.log();
        let listadoString = ''
        this.listadoArray.forEach((tarea, index) => {
            let {desc, completadoEn} = tarea
            listadoString += `${(index + 1 + '.').green} ${desc} :: ${ completadoEn ? 'Completada'.green : 'Pendiente'.red}\n`
        })
        return listadoString
    }

    listarPendientesCompletadas ( completadas = true ) {
        console.log();
        let contador = 0
        this.listadoArray.forEach((tarea, index) => {
            const {desc, completadoEn} = tarea
            const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red
            if( completadas) {
                // mostrar completadas
                if (completadoEn) {
                    contador += 1
                    console.log(`${contador + '.'.green} ${desc} :: ${completadoEn.green}`)
                }
            } else {
                if (!completadoEn) {
                    contador += 1
                    console.log(`${contador + '.'.green} ${desc} :: ${'Pendiente'.red}`)
                }
            }
            
        })
    }

    toggleCompletadas ( ids = []) {
        ids.forEach( id => {
            const tarea = this._listado[id]
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArray.forEach( tarea => {
            if (! ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null
            }
        })
    }
}

module.exports = Tareas