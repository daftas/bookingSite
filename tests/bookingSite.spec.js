const AdminPage = require('../pages/AdminPage.po');
const FrontPage = require('../pages/FrontPage.po');
const {credentials, url, roomTypes} = require('../constants/index');
const { test } = require('@playwright/test');

let adminPage;
let frontPage;

test.beforeEach(async({page}) => {
    adminPage = new AdminPage(page);
    frontPage = new FrontPage(page);

})

test('Create room', async() => {
    
    await adminPage.openUrl(url.adminUrl);
    await adminPage.logIn(credentials.username, credentials.password);
    await adminPage.createRoom('002',roomTypes.Family,'34');
});

test('Book created room', async({page}) => {
    await frontPage.openUrl(url.frontUrl);
    await frontPage.bookCreatedRoom();
    await page.pause();

});

test('Send email for hotel', async() => {

    await frontPage.openUrl(url.frontUrl);
    await frontPage.contactHotel();
});