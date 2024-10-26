import { test } from '@playwright/test';
import { Login } from '../paginas/login';
import { Principal } from '../paginas/principal';
import { Todo } from '../paginas/todo';
import { task } from '../data/data';


test.describe('Todoism Pruebas', () => {

  test.beforeEach(async ({ page }) => {
    test.slow();

    const principal = new Principal(page);
    const login = new Login(page);
    
    await principal.openWebPage();
    await principal.clickOnLogin();

    await login.clickOnGetTestAccount();
    await login.awaitForUserGeneration();
    await login.clickOnLogin();
  });

  test('Crear una tarea', async ({ page }) => {
    test.slow();

    const todo = new Todo(page);

    await todo.awaitForAppToBeReady();
    await todo.createTask(task);

    await todo.validateTaskCreation(task);

    await page.screenshot({ path: `ss/tarea-creada.png` });
  });

  test('Completar una tarea', async ({ page }) => {
    test.slow();

    const todo = new Todo(page);

    await todo.awaitForAppToBeReady();
    await todo.createTask(task);
    await todo.completeTask(task);

    await todo.validateTaskCompletion(task);

    await page.screenshot({ path: `ss/tarea-completada.png` });
  });

  test('Limpiar tareas completadas', async ({ page }) => {
    test.slow();

    const todo = new Todo(page);

    await todo.awaitForAppToBeReady();
    await todo.createTask(task);
    await todo.completeTask(task);
    await todo.clearCompletedTasks();

    await todo.validateTaskCleared(task);

    await page.screenshot({ path: `ss/limpiar-tarea.png` });
  });

});