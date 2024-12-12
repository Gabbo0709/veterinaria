import { app, BrowserWindow, ipcMain, session, protocol } from 'electron'
import path from 'path'

const url = 'https://www.github.com'

protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

// Function to create the main application window
function createWindow () {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(path.dirname(new URL(import.meta.url).pathname), 'preload.js') // Path to the preload script
    }
  })

  win.loadFile('./src/html/login.html') // Load the main HTML file into the window
}

// Handle IPC calls for repository operations
ipcMain.handle('repository-operation', async (event, repositoryName, methodName, ...args) => {
  // Object containing various repository modules for the application
  const repositories = {
    usuario: (await import('./src/js/data/repositories/usuario.repo.js')).default,
    cita: (await import('./src/js/data/repositories/cita.repo.js')).default,
    cliente: (await import('./src/js/data/repositories/cliente.repo.js')).default,
    empleado: (await import('./src/js/data/repositories/empleado.repo.js')).default,
    historialMedico: (await import('./src/js/data/repositories/historial-medico.repo.js')).default,
    mascota: (await import('./src/js/data/repositories/mascota.repo.js')).default,
    pago: (await import('./src/js/data/repositories/pago.repo.js')).default,
    proveedor: (await import('./src/js/data/repositories/proveedor.repo.js')).default,
    veterinario: (await import('./src/js/data/repositories/veterinario.repo.js')).default,
    producto: (await import('./src/js/data/repositories/producto.repo.js')).default
  }

  // Get the repository class based on the repository name
  const RepositoryClass = repositories[repositoryName]
  if (!RepositoryClass) {
    throw new Error(`El repositorio ${repositoryName} no existe`) // Throw error if repository does not exist
  }

  // Create an instance of the repository class
  const repositoryInstance = new RepositoryClass(args[0], args[1])
  if (typeof repositoryInstance[methodName] !== 'function') {
    throw new Error(`El método ${methodName} no existe en el repositorio ${repositoryName}`) // Throw error if method does not exist
  }

  // Call the method on the repository instance with the provided arguments
  if (repositoryName === 'usuario') {
    return await repositoryInstance[methodName]()
  }
  return await repositoryInstance[methodName](...args.slice(2))
})

ipcMain.handle('cookie-operation', async (event, operation, key, val) => {
  switch (operation) {
    case 'create':
      session.defaultSession.cookies.set({ url, name: key, value: val }).then(() => {
        session.defaultSession.cookies.get({ name: key }).then((cookies) => {
          console.log('Cookie creada:', cookies)
        })
      }, (error) => {
        console.error('Error al crear la cookie:', error)
      })
      break
    case 'read':
      return session.defaultSession.cookies.get({ name: key })
  }
})

// When the app is ready, create the main window
app.whenReady().then(createWindow)

// Quit the app when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Re-create the window when the app is activated (e.g., clicking the dock icon on macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
