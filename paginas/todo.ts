import { Locator, Page } from "@playwright/test";

export class Todo {

    readonly pagina: Page;
    readonly campoTarea: Locator;
    readonly botonLimpiarListaTareas: Locator;

    private readonly TEXTO_PLACEHOLDER_TAREA = '¿Qué necesita hacerse?';
    private readonly TEXTO_BOTON_LIMPIAR_LISTA_TAREAS = 'limpiar_todo';

    constructor(pagina) {
        this.pagina = pagina;
        this.campoTarea = pagina.getByPlaceholder(this.TEXTO_PLACEHOLDER_TAREA);
        this.botonLimpiarListaTareas = pagina.getByText(this.TEXTO_BOTON_LIMPIAR_LISTA_TAREAS);
    }

    async agregarTareaALista(tarea: string): Promise<void> {
        await this.agregarTarea(tarea);
    }

    async marcarTareaComoCompleta(textoTarea: string): Promise<void> {
        const FILTRO_TAREA_CREADA = `check_box_outline_blank ${textoTarea}`;
        const checkboxTareaCreada: Locator = this.pagina.locator('span').filter({ hasText: FILTRO_TAREA_CREADA }).locator('i');
        await checkboxTareaCreada.click();
    }

    async limpiarListaTareas(): Promise<void> {
        await this.botonLimpiarListaTareas.click();
    }

    async verificarSiTareaEsCompleta(textoTarea: string): Promise<boolean> {
        const SELECTOR_TAREA_COMPLETA = this.obtenerSelectorTareaCompleta(textoTarea);
        await this.pagina.waitForSelector(SELECTOR_TAREA_COMPLETA);
        const checkboxTareaCompleta: Locator = this.pagina.locator(SELECTOR_TAREA_COMPLETA);
        return await checkboxTareaCompleta.isVisible();
    }

    async verificarSiTareaFueEliminada(): Promise<boolean> {
        const SELECTOR_TAREA_COMPLETA = this.obtenerSelectorTareaCompleta();
        await this.pagina.waitForSelector(SELECTOR_TAREA_COMPLETA, { state: 'detached' });
        const cantidadElementosExistentes = await this.pagina.locator(SELECTOR_TAREA_COMPLETA).count();
        return !cantidadElementosExistentes;
    }

    async obtenerTextoTareaGenerada(textoTarea: string): Promise<string> {
        const SELECTOR_TAREA_CREADA = `//span[@class = "active-item" and contains(., "${textoTarea}")]`;
        const tareaCreada: Locator = this.pagina.locator(SELECTOR_TAREA_CREADA);
        return await tareaCreada.textContent() || '';
    }

    private async agregarTarea(tarea: string): Promise<void> {
        await this.campoTarea.click();
        await this.campoTarea.fill(tarea);
        await this.campoTarea.press('Enter');
    }

    private obtenerSelectorTareaCompleta(textoTarea?: string): string {
        if (textoTarea) {
            return `//span[@class = "inactive-item" and contains(., "${textoTarea}")]`;
        }
        return `//span[@class = "inactive-item"]`;
    }
}
