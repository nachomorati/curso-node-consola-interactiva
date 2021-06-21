require('colors')
const { guardarDB, leerDB } = require('./helpers/guardarArchivo')
const { inquirerMenu, pausa, leerInput, listarTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer')
const Tareas = require('./models/tareas')

const main = async () => {
  let opt = ''
  const tareas = new Tareas()
  const tareasDB = leerDB()

  if (tareasDB) {
    //establecer las tareas
    // cargarTareasFromArray
    tareas.cargarTareasFromArray(tareasDB)
  }

  do {
    // Imprimir el menu
    opt = await inquirerMenu()

    switch (opt) {
      case '1':
        // crear opcion
        const desc = await leerInput('Descripción: ')
        tareas.crearTarea(desc)
      break
      case '2':
        // listado opciones
        console.log(tareas.listadoCompleto());
        // await pausa()
      break
      case '3':
        // listar tareas completadas
        tareas.listarPendientesCompletadas(true);
      break
      case '4':
        // listar tareas pendientes
        tareas.listarPendientesCompletadas(false);
      break
      case '5':
        // completado | pendiente
        const ids = await mostrarListadoChecklist( tareas.listadoArray)
        tareas.toggleCompletadas(ids)
      break
      case '6':
        // borrar
        const id = await listarTareasBorrar( tareas.listadoArray)
        if (id !== '0') {
          // preguntar si esta seguro
          const ok = await confirmar('¿Está seguro?')
          if(ok) {
            tareas.borrarTarea(id)
            console.log('Tarea borrada');
          }
          // console.log({ok});
        }
      break
    }

    guardarDB( tareas.listadoArray )

    if (opt !== '0') await pausa()
  } while (opt !== '0')

  // pausa()
}

main()
