const {expect} = require('@playwright/test') ;

    module.exports = {
        buttonletMeHack : '//button[text()="Let me hack!"]',
        buttonLogin : '//button[@id="doLogin"]',
        buttonCreateRoom : '//button[@id="createRoom"]',
        buttonsNavigation: '//a[@class="nav-link"]',
        buttonInbox : '//i[@class="fa fa-inbox"]',
        inputUsername: '//input[@id="username"]',
        inputPassword : '//input[@id="password"]',
        inputRoomId : '//input[@id="roomName"]',
        inputRoomPrice : '//input[@id="roomPrice"]',
        selectorType : '//select[@id="type"]',
        selectorAccesible : '//select[@id="accessible"]',
        managementBar : '//a[@href="#/admin"]',
        listRoomsLast : '(//div[@class="row detail"])[last()]',
        lastReceivedEmail: '(//div[@class="row detail read-true"])[last()]',
        receivedFrom: '//div[@id="message1"]//div[@class="col-sm-2"]',
    


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
        },

        async updateBranding(){

            await page.locator(this.buttonBranding).click();
            await page.locator(this.buttonUpdateBranding).click();
        },

        async countNavigationLinks(){
            const result = (await page.locator(this.buttonsNavigation).count()).toString();
            return result;
        },

        async openEmailBox(){
            await page.locator(this.buttonInbox).click();
            await page.locator(this.lastReceivedEmail).click();
        }

        
       


    }


    
