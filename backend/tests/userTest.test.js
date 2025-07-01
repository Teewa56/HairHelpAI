const request = require('supertest');
const app = require('../server'); 

describe('API Endpoints', () => {
    it('should predict hair data', async () => {
        const res = await request(app)
            .post('/predict_hair_data')
            .send({});
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('hair_information_prediction');
    });

    it('should predict image data', async () => {
        const res = await request(app)
            .post('/predict_image_data')
            .send({ image_url: 'http://example.com/image.jpg' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('hair_image_prediction');
    });
});