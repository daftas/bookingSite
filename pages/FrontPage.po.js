const { expect } = require('@playwright/test');
const {persons, messages} = require('../constants/index');
module.exports = class{

    constructor(page){
        this.page = page;

        this.letMeHack = page.locator('.btn-primary').first();
        this.bookThisRoom = page.locator('.openBooking').last();
        this.firstName = page.locator('[name="firstname"]');
        this.lastName = page.locator('[name="lastname"]');
        this.email = page.locator('[name="email"]')
        this.phone = page.locator('[name="phone"]');
        this.bookButton = page.locator('.book-room').last();
        this.dateFrom = page.locator("(//div[@role='cell'])[22]");
        this.dateTo = page.locator("(//div[@role='cell'])[28]");

        this.name = page.locator('#name');
        this.emailToContact = page.locator('#email');
        this.phoneToContact = page.locator('#phone');
        this.subject = page.locator('#subject');
        this.description = page.locator('#description');
        this.submitButton = page.locator('#submitContact');
        this.successMessage = page.locator('.col-sm-5 h2');

    }

    async openUrl(url){

        await this.page.goto(url);
        await this.letMeHack.click();
    }

    async bookCreatedRoom(){

        await this.bookThisRoom.click();
        await this.dateFrom.dragTo(this.dateTo);
        await this.firstName.fill(persons.firstName);
        await this.lastName.fill(persons.lastName);
        await this.email.fill(persons.email);
        await this.phone.fill(persons.phone);
        await this.bookButton.click();
    }

    async contactHotel(){

        await this.name.fill(persons.firstName);
        await this.emailToContact.fill(persons.email);
        await this.phoneToContact.fill(persons.phone);
        await this.subject.fill(messages.cancelReservation);
        await this.description.fill(messages.cancelDescription);
        await this.submitButton.click();
        const success = await this.successMessage.textContent();
        await expect(success).toContain(messages.successAfterContact);

    }

}