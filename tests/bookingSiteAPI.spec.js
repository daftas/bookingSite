const { expect } = require('@playwright/test');
const axios = require('axios');
const {credentials, url, roomTypes, envVariables, persons} = require('../constants/index');
const fs = require('fs');


describe('Create and book room' , async() => {
    it('Log in as admin', async () => {
        const response = await axios.post(url.login, 
        {
            "password": credentials.password,
            "username": credentials.username

        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.headers);
        //envVariables.cookie = response.data.roomid
        //fs.writeFileSync('./constants/envVariables.json', JSON.stringify(envVariables));  // Cant take token from response. After token is taken, write with fs to envVariables
        expect(response.status).toBe(200);
    });

    it('Create room', async() => {
        const response = await axios.post(url.createRoom, 
            {
                "accessible": true,
                "description": "Please enter a description for this room",
                "features": ["Radio", "Safe"],
                "image": url.image,
                "roomName": "014",
                "roomPrice": "56",
                "type": roomTypes.Double
            },
            { 
                headers: {
                'Content-Type': 'application/json',
                "cookie": envVariables.cookie

            }

        })
        envVariables.roomId = response.data.roomid
        fs.writeFileSync('./constants/envVariables.json', JSON.stringify(envVariables));
        expect(response.status).toBe(201);
        expect(response.statusText).toBe('Created');
    });

    it('Book created room', async() => {
        const response = await axios.post(url.bookRoom, 
        {
            "bookingdates": {checkin: "2022-10-20", checkout: "2022-10-25"}, //TO DO dynamic dates - today and tomorrow
            "depositpaid": false,
            "email": persons.email,
            "firstname": persons.firstName,
            "lastname": persons.lastName,
            "phone": persons.phone,
            "roomid": envVariables.roomId
        },
        {
            headers: {
                'Content-Type': 'application/json',
                "cookie": envVariables.cookie
            }

        });
        expect(response.status).toBe(201);
        expect(response.statusText).toBe('Created');
    })
    
    

});