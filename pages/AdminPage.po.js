
const {expect} = require('@playwright/test')
module.exports = class{

    constructor(page){
        this.page = page;
        this.letMeHack = page.locator('.btn-primary').first();
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#doLogin');
        this.managementBar = page.locator('.navbar-brand');

        this.roomId = page.locator('#roomName');
        this.roomType = page.locator('select').first();
        this.roomAccessible = page.locator('select').last();
        this.roomPrice = page.locator('#roomPrice');
        this.createRoomButton = page.locator('#createRoom');
    }

    async openUrl(url){
        await this.page.goto(url);
        await this.letMeHack.click();
    }
    
    async logIn(username, password){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await expect(this.managementBar).toBeVisible();
    }

    async createRoom(id,type,price){

        await this.roomId.fill(id);
        await this.roomType.selectOption(type);
        await this.roomAccessible.selectOption('true');
        await this.roomPrice.fill(price)
        await this.createRoomButton.click();
    }
}