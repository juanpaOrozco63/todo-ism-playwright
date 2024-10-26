import { expect, Locator, Page } from "@playwright/test";

export class Login {

    readonly pagina: Page;
    readonly botonObtenerCuentaPrueba: Locator;
    readonly botonIniciarSesion: Locator;
    readonly campoUsuario: Locator;

    readonly TEXTO_BOTON_OBTENER_CUENTA_PRUEBA = 'Obtener una cuenta de prueba';
    readonly ID_BOTON_INICIAR_SESION = '#login-btn';
    readonly ID_CAMPO_USUARIO = '#username-input';

    constructor(pagina) {
        this.pagina = pagina;
        this.botonObtenerCuentaPrueba = pagina.getByText(this.TEXTO_BOTON_OBTENER_CUENTA_PRUEBA);
        this.botonIniciarSesion = pagina.locator(this.ID_BOTON_INICIAR_SESION);
        this.campoUsuario = pagina.locator(this.ID_CAMPO_USUARIO);
    }

    clickBotonObtenerCuentaPrueba = async () => {
        await this.botonObtenerCuentaPrueba.click();
        await expect(this.campoUsuario).not.toBeEmpty();
    }

    clickBotonIniciarSesion = async () => {
        await this.botonIniciarSesion.click();
    }
}
