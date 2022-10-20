const {persons, messages} = require('../constants/index');

    module.exports = {

        buttonLetMeHack : '//button[text()="Let me hack!"]',
        buttonBookThisRoom : '(//button[@type="button"][normalize-space()="Book this room"])[last()]', 
        buttonBook : '//button[normalize-space()="Book"]',
        buttonSubmit : '#submitContact',
        inputFirstName : '[name="firstname"]',
        inputLastName : '[name="lastname"]',
        inputEmail : '[name="email"]',
        inputPhone : '[name="phone"]',
        inputName : '#name',
        inputEmailToContact : '#email',
        inputPhoneToContact : '#phone',
        inputSubject : '#subject',
        inputDescription : '#description',
        selectorDateTo : '(//div[@class="rbc-date-cell"])[28]',
        selectorDateFrom : '(//div[@class="rbc-date-cell"])[22]', 
        messageBookingSuccess : '//h3[text()="Booking Successful!"]',
        messageContactSuccess : '(//h2)[2]',
        messageError : '//div[@class="alert alert-danger"]',
        mapOfHotel : '//div[@class="pigeon-overlays"]',
        messageWelcome: '//div[@class="col-sm-10"]//p',

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

        async bookCreatedRoomInvalid() {
    
            await page.locator(this.buttonBookThisRoom).click();
            await page.locator(this.buttonBook).click();
        },
    
        async contactHotel() {
    
            await page.locator(this.inputName).fill(persons.firstName);
            await page.locator(this.inputEmailToContact).fill(persons.email);
            await page.locator(this.inputPhoneToContact).fill(persons.phone);
            await page.locator(this.inputSubject).fill(messages.cancelReservation);
            await page.locator(this.inputDescription).fill(messages.cancelDescription);
            await page.locator(this.buttonSubmit).click();
        },
        async contactHotelInvalid() {
    
            await page.locator(this.buttonSubmit).click();
        },
        
        
    }