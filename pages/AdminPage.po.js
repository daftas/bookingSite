const {expect} = require('@playwright/test') ;

    module.exports = {
        buttonletMeHack : '//button[text()="Let me hack!"]',
        inputUsername: '//input[@id="username"]',
        inputPassword : '//input[@id="password"]',
        buttonLogin : '//button[@id="doLogin"]',
        managementBar : '//a[@href="#"]',
        inputRoomId : '//input[@id="roomName"]',
        selectorType : '//select[@id="type"]',
        selectorAccesible : '//select[@id="accessible"]',
        inputRoomPrice : '//input[@id="roomPrice"]',
        buttonCreateRoom : '//button[@id="createRoom"]',

        async openUrl(url) {
            await page.goto(url);
            await page.locator(this.buttonletMeHack).click();
        },

        async logIn(username, password){
            await page.locator(this.inputUsername).fill(username);
            await page.locator(this.inputPassword).fill(password);
            await page.locator(this.buttonLogin).click();
            await expect(page.locator(this.managementBar)).toBeVisible();
        },
    
        async createRoom(id,type,price){
    
            await page.locator(this.inputRoomId).fill(id);
            await page.locator(this.selectorType).selectOption(type);
            await page.locator(this.selectorAccesible).selectOption('true');
            await page.locator(this.inputRoomPrice).fill(price)
            await page.locator(this.buttonCreateRoom).click();
        }

    }


    
