const adminPage = require('../pages/AdminPage.po');
const frontPage = require('../pages/FrontPage.po');
const {credentials, url, roomTypes} = require('../constants/index');
const { test } = require('@playwright/test');


test.beforeEach(async({page}) => {
    global.page = page;
});

test('Create room', async() => {
    
    await adminPage.openUrl(url.adminUrl);
    await adminPage.logIn(credentials.username, credentials.password);
    await adminPage.createRoom('002',roomTypes.Family,'34');
});

test('Book created room', async() => {
    await frontPage.openUrl(url.frontUrl);
    await frontPage.bookCreatedRoom();

});

test('Send email for hotel', async() => {

    await frontPage.openUrl(url.frontUrl);
    await frontPage.contactHotel();
});