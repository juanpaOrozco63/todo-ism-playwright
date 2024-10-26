import { expect, Locator, Page } from "@playwright/test";

export class Todo {
    private readonly page      : Page;
    private readonly inputField: Locator;
    private readonly taskList  : Locator;
    private readonly resetBtn  : Locator;

    constructor(page: Page) {
        this.page       = page;
        this.inputField = this.page.locator('#item-input');
        this.taskList   = this.page.locator('.items');
        this.resetBtn   = this.page.locator('#clear-btn');
    }

    awaitForAppToBeReady = async () => {
        await expect(this.inputField).toBeVisible();
    }

    createTask = async (taskName: string) => {
        await this.inputField.click();
        await this.inputField.pressSequentially(taskName);
        await this.inputField.press('Enter');
    }

    completeTask = async (taskName: string) => {
        const taskToggle = this.page.locator(`//span[@class = "item-body" and contains(.,"${taskName}")]/a/i`);
        await taskToggle.click();
    }

    clearCompletedTasks = async () => {
        await this.resetBtn.click();
    }

    validateTaskCreation = async (taskName: string) => {
        await expect(this.taskList.getByText(taskName)).toHaveClass('active-item');
    }

    validateTaskCompletion = async (taskName: string) => {
        await expect(this.taskList.getByText(taskName)).toHaveClass('inactive-item');
    }

    validateTaskCleared = async (taskName: string) => {
        await expect(this.taskList).not.toHaveText(taskName);
    }
}
