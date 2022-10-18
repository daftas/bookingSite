const { expect } = require('@playwright/test');
const {persons, messages} = require('../constants/index');

    module.exports = {

        buttonLetMeHack : '//button[text()="Let me hack!"]',
        buttonBookThisRoom : '(//button[@type="button"][normalize-space()="Book this room"])[2]', 
        inputFirstName : '[name="firstname"]',
        inputLastName : '[name="lastname"]',
        inputEmail : '[name="email"]',
        inputPhone : '[name="phone"]',
        buttonBook : '//button[normalize-space()="Book"]',
        selectorDateFrom : '//div[@class="rbc-day-bg rbc-today"]', 
        selectorDateTo : '(//div[@class="rbc-date-cell"])[21]', // improve to be dynamic
        inputName : '#name',
        inputEmailToContact : '#email',
        inputPhoneToContact : '#phone',
        inputSubject : '#subject',
        inputDescription : '#description',
        buttonSubmit : '#submitContact',
        messageSuccess : '.col-sm-5 h2',

        async openUrl(url){

            await page.goto(url);
            await page.locator(this.buttonLetMeHack).click();
        },
    
        async bookCreatedRoom() {
    
            await page.locator(this.buttonBookThisRoom).click();
            await page.locator(this.selectorDateFrom).dragTo(page.locator(this.selectorDateTo));
            await page.locator(this.inputFirstName).fill(persons.firstName);
            await page.locator(this.inputLastName).fill(persons.lastName);
            await page.locator(this.inputEmail).fill(persons.email);
            await page.locator(this.inputPhone).fill(persons.phone);
            await page.locator(this.buttonBook).click();
        },
    
        async contactHotel() {
    
            await page.locator(this.inputName).fill(persons.firstName);
            await page.locator(this.inputEmailToContact).fill(persons.email);
            await page.locator(this.inputPhoneToContact).fill(persons.phone);
            await page.locator(this.inputSubject).fill(messages.cancelReservation);
            await page.locator(this.inputDescription).fill(messages.cancelDescription);
            await page.locator(this.buttonSubmit).click();
            const success = await page.locator(this.messageSuccess).textContent();
            await expect(success).toContain(messages.successAfterContact);
        }
    }