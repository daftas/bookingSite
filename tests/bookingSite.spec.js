const adminPage = require('../pages/AdminPage.po');
const frontPage = require('../pages/FrontPage.po');
const assertations = require('../pages/Assertations.po');
const {credentials, url, roomTypes, persons, messages} = require('../constants/index');
const { test } = require('@playwright/test');


test.beforeEach(async({page}) => {
    global.page = page;
});

    test(`Connect to admin panel as ${credentials.username} `, async() => {
        await adminPage.openUrl(url.adminUrl);
        await adminPage.logIn(credentials.username, credentials.password);
        await assertations.toBeVisible(adminPage.managementBar);
    });

    test('All 6 navigations links are visible', async() => {
        await adminPage.openUrl(url.adminUrl);
        await adminPage.logIn(credentials.username, credentials.password);
        const actualCount = await adminPage.countNavigationLinks();
        await assertations.toBeEqual(actualCount, '6')

    });

    test(`Create ${roomTypes.Double} room`, async() => {
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms)); // I guess instead of this command we can use something better?
        let randomRoomName = 'Room'+ (Math.floor(Math.random() * 1000));

        await adminPage.openUrl(url.adminUrl);
        await adminPage.logIn(credentials.username, credentials.password);
        await adminPage.createRoom(randomRoomName,roomTypes.Double,'39');
        await delay(1000); //here need 1 sec delay after room creation for successful assertation
        await assertations.toContain(adminPage.listRoomsLast,randomRoomName) ;
    });

    test('Successful booking of created room', async() => {
        await frontPage.openUrl(url.frontUrl);
        await frontPage.bookCreatedRoom();
        await assertations.toBeVisible(frontPage.messageBookingSuccess);  //failing sometimes because of drag&drop calendar
    });

    test('Not successful booking of created room', async() => {
        await frontPage.openUrl(url.frontUrl);
        await frontPage.bookCreatedRoomInvalid();
        await assertations.toBeVisible(frontPage.messageError);
    });

    test('Send valid email for hotel', async() => {
        await frontPage.openUrl(url.frontUrl);
        await frontPage.contactHotel();
        await assertations.toContain(frontPage.messageContactSuccess,persons.firstName);
    });

    test('Sent email is received in Admin panel email box', async() => {
        await adminPage.openUrl(url.adminUrl);
        await adminPage.logIn(credentials.username, credentials.password);
        await adminPage.openEmailBox();
        await assertations.toBeVisible(adminPage.lastReceivedEmail);
        
        await assertations.toContain(adminPage.receivedFrom, persons.firstName);
    });
    
    test('Send invalid email for hotel', async() => {
        await frontPage.openUrl(url.frontUrl);
        await frontPage.contactHotelInvalid();
        await assertations.toBeVisible(frontPage.messageError);
    });

    test('Hotel visibility in map', async() => {
        await frontPage.openUrl(url.frontUrl);
        await assertations.toBeVisible(frontPage.mapOfHotel);
    });

    test('Welcome message is correct', async() => {
        await frontPage.openUrl(url.frontUrl);
        await assertations.toContain(frontPage.messageWelcome, messages.welcomeMessage);
    });



