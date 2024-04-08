const fs = require('fs');
const readline = require('readline');

class Usuario {
    constructor(nombre, correo, contraseña, archivo) {
        this.nombre = nombre;
        this.correo = correo;
        this.contraseña = contraseña;
        this.archivo = archivo;
    }

    autenticar(correo, contraseña) {
        return correo === this.correo && contraseña === this.contraseña;
    }

    registrarTransaccion(monto, categoria, descripcion = '') {
        const transaccion = `${monto},${categoria},${descripcion}\n`;
        fs.appendFileSync(this.archivo, transaccion);
        console.log("Transacción registrada con éxito.");
    }

    establecerPresupuesto(categoria, limite) {
        fs.writeFileSync(this.archivo, `${categoria}:${limite}\n`, { flag: 'a' });
        console.log(`Presupuesto para ${categoria} establecido en ${limite}.`);
    }

    establecerMeta(monto, plazo) {
        fs.writeFileSync(this.archivo, `Meta:${monto}:${plazo}\n`, { flag: 'a' });
        console.log("Meta financiera establecida.");
    }

    generarEstadisticas() {
        const data = fs.readFileSync(this.archivo, 'utf8');
        const transacciones = data.split('\n').filter(linea => linea !== ''); // Filtrar líneas vacías
        let totalIngresos = 0;
        let totalGastos = 0;

        transacciones.forEach(transaccion => {
            const [monto, categoria] = transaccion.split(',');
            if (parseFloat(monto) > 0) {
                totalIngresos += parseFloat(monto);
            } else {
                totalGastos += parseFloat(monto);
            }
        });

        const balance = totalIngresos + totalGastos;

        console.log("----- Estadísticas -----");
        console.log("Total de ingresos:", totalIngresos);
        console.log("Total de gastos:", totalGastos);
        console.log("Balance:", balance);
    }
}

// Función para leer las credenciales de usuarios desde el archivo
function leerCredenciales(archivo) {
    const data = fs.readFileSync(archivo, 'utf8');
    const lineas = data.split('\n');
    const credenciales = lineas[0].split(',');
    return credenciales;
}

// Función para autenticar usuario
function autenticarUsuario(usuario, correo, contraseña) {
    const [nombre, correoUsuario, contraseñaUsuario] = leerCredenciales(usuario.archivo);
    if (correo === correoUsuario && contraseña === contraseñaUsuario) {
        console.log("¡Bienvenido! Autenticación exitosa.");
        return true;
    } else {
        console.log("Error de autenticación. Verifica tus credenciales.");
        return false;
    }
}

// Función para iniciar sesión por consola
function iniciarSesion(usuario) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Correo electrónico: ', (correo) => {
        rl.question('Contraseña: ', (contraseña) => {
            if (autenticarUsuario(usuario, correo, contraseña)) {
                mostrarMenu(usuario);
            } else {
                rl.close();
            }
        });
    });
}

// Función para mostrar el menú de opciones después de iniciar sesión
function mostrarMenu(usuario) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log(`¡Bienvenido, ${usuario.nombre}!`);

    console.log("1. Registrar Transacción");
    console.log("2. Establecer Presupuesto");
    console.log("3. Establecer Meta Financiera");
    console.log("4. Generar Estadísticas");
    console.log("5. Salir");

    rl.question('Seleccione una opción: ', (opcion) => {
        // Ignorar entradas vacías
        if (opcion.trim() === '') {
            mostrarMenu(usuario);
            return;
        }

        switch (opcion) {
            case '1':
                registrarTransaccion(usuario, rl);
                break;
            case '2':
                establecerPresupuesto(usuario, rl);
                break;
            case '3':
                establecerMeta(usuario, rl);
                break;
            case '4':
                usuario.generarEstadisticas();
                mostrarMenu(usuario);
                break;
            case '5':
                rl.close();
                break;
            default:
                console.log("Opción no válida.");
                mostrarMenu(usuario);
                break;
        }
    });
}

// Función para registrar una transacción
function registrarTransaccion(usuario, rl) {
    rl.question('Monto: ', (monto) => {
        rl.question('Categoría: ', (categoria) => {
            rl.question('Descripción (opcional): ', (descripcion) => {
                usuario.registrarTransaccion(monto, categoria, descripcion);
                mostrarMenu(usuario);
            });
        });
    });
}

// Función para establecer un presupuesto
function establecerPresupuesto(usuario, rl) {
    rl.question('Categoría: ', (categoria) => {
        rl.question('Límite: ', (limite) => {
            usuario.establecerPresupuesto(categoria, limite);
            mostrarMenu(usuario);
        });
    });
}

// Función para establecer una meta financiera
function establecerMeta(usuario, rl) {
    rl.question('Monto objetivo: ', (monto) => {
        rl.question('Plazo para alcanzarla: ', (plazo) => {
            usuario.establecerMeta(monto, plazo);
            mostrarMenu(usuario);
        });
    });
}

// Ejemplo de uso
const archivoDB = 'usuarios.txt';
const [nombre, correo, contraseña] = leerCredenciales(archivoDB);
const usuario1 = new Usuario(nombre, correo, contraseña, archivoDB);

// Iniciar sesión por consola
iniciarSesion(usuario1);
