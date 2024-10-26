import test, { expect } from '@playwright/test';
import { Principal } from '../paginas/principal';
import { Login } from '../paginas/login';
import { Todo } from '../paginas/todo';


test.describe('Casos de prueba de Todoism', () => {
    
    test.beforeEach(async ({ page }) => {
        test.slow();
        const paginaPrincipal: Principal = new Principal(page);
        const paginaLogin: Login = new Login(page);

        await paginaPrincipal.abrirPagina();
        await paginaPrincipal.clickBotonIniciarSesion();
        await paginaLogin.clickBotonObtenerCuentaPrueba();
        await paginaLogin.clickBotonIniciarSesion();
    });

    test('Crear una nueva tarea', async ({ page }) => {
        test.slow();
        const textoTarea = 'Tarea de Prueba';
        const paginaTodo = new Todo(page);
        await paginaTodo.agregarTareaALista(textoTarea);
        const textoTareaGenerada = await paginaTodo.obtenerTextoTareaGenerada(textoTarea);        
        expect(textoTareaGenerada).toBe(textoTarea);
    });
    
    test('Crear una tarea y marcarla como completa', async ({ page }) => {
        test.slow();
        const textoTarea = 'Tarea de Prueba';
        const paginaTodo = new Todo(page);
        await paginaTodo.agregarTareaALista(textoTarea);
        await paginaTodo.marcarTareaComoCompleta(textoTarea);
        const esTareaCompleta = await paginaTodo.verificarSiTareaEsCompleta(textoTarea);
        expect(esTareaCompleta).toBeTruthy();
    });
    
    test('Limpiar lista de tareas', async ({ page }) => {
        test.slow();
        const textoTarea = 'Tarea de Prueba';
        const paginaTodo = new Todo(page);
        await paginaTodo.agregarTareaALista(textoTarea);
        await paginaTodo.marcarTareaComoCompleta(textoTarea);
        await paginaTodo.limpiarListaTareas();
        const esTareaEliminada = await paginaTodo.verificarSiTareaFueEliminada();
        expect(esTareaEliminada).toBeTruthy(); 
    });

});
