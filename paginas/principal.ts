import { Locator, Page } from "@playwright/test";

export class Principal {
    readonly pagina: Page;
    readonly botonIniciarSesion: Locator;

    private readonly URL_TODOISM = 'http://127.0.0.1:5000/';

    constructor(pagina: Page) {
        this.pagina = pagina;
        this.botonIniciarSesion = pagina.getByRole('navigation').getByRole('link', { name: 'Iniciar Sesión' });
    }

    abrirPagina = async () => {
        await this.pagina.goto(this.URL_TODOISM);
    }

    clickBotonIniciarSesion = async () => {
        await this.botonIniciarSesion.click();
    }
}
