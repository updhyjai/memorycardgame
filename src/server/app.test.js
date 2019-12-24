const request = require('supertest')
const app = require('./app');

describe('Routes',()=>{
    it('/draw  drawing 9 random cards from the deck', async() =>{
        const response = await request(app).get('/draw');
        // console.log(response.text);
        expect(response.statusCode).toBe(200);
        const data = JSON.parse(response.text);
        expect(data.remaining).toBe(43);
        expect(data.cards).toHaveLength(9);
        expect(data.success).toBe(true);
    })
})