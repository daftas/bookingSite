const {expect} = require('@playwright/test');

module.exports = {

    async toBeVisible(selector){
        await expect(page.locator(selector)).toBeVisible();
    },
    
    async toContain(message, item){
        const expectedValue = await page.locator(message).textContent();
        await expect(expectedValue).toContain(item)

    },

    async toBeEqual(actual, expected){
        await expect(actual).toEqual(expected)
    }

    


}