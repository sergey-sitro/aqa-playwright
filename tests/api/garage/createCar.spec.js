import {test, expect, request as apiRequest} from "../../../src/fixtures/userFixtures.js";
import {MODELS} from "../../../src/data/models.js";
import {BRANDS} from "../../../src/data/brands.js";
import {
    mileageInvalidTypePayload,
    mileageInvalidValuePayload,
    mileageAbsentPayload,
    nonExistingModelIdPayload,
    nonExistingBrandIdPayload
} from "../../../src/data/invalidPayloads/carsInvalidPayloads.js"

test.describe("Cars API", ()=>{
    test.describe("Create Car Positive", ()=>{
        test("Create all possible cars", async ({request})=>{
                
            for (const brandKey in BRANDS) {
                const brand = BRANDS[brandKey];

                for (const modelKey in MODELS[brand.id]) {
                    const model = MODELS[brand.id][modelKey];

                    await test.step(`Create car with brand "${brand.title}" and model ${model.title}`, async ()=>{
                        const requestBody = {
                            "carBrandId": brand.id,
                            "carModelId": model.id,
                            "mileage": Math.floor(Math.random() * 100)
                        }
                        const response = await request.post('/api/cars', {
                            data: requestBody
                        })

                        const body = await response.json()
                        const expected = {
                            "id": expect.any(Number),
                            "carBrandId": requestBody.carBrandId,
                            "carModelId": requestBody.carModelId,
                            "initialMileage": requestBody.mileage,
                            "updatedMileageAt": expect.any(String),
                            carCreatedAt: expect.any(String),
                            "mileage": requestBody.mileage,
                            "brand": brand.title,
                            "model": model.title,
                            "logo": brand.logoFilename
                        }

                        expect(response.status()).toBe(201)
                        expect(body.status).toBe('ok')
                        expect(body.data).toEqual(expected)

                        
                    })
                }
            }

            // Remove added cars after test
            const createdCarsResponse = await request.get('/api/cars');
            const carsResponseJson = await createdCarsResponse.json();

            const cars = carsResponseJson.data;

            for (const car of cars) {
                await request.delete(`/api/cars/${car.id}`);
            }
        })
    })

    test.describe("Create Car Negative", ()=>{
        test("Mileage type validation", async ({request})=>{
            
            const response = await request.post('/api/cars', {
                data: mileageInvalidTypePayload
            })

            const body = await response.json()

            expect(response.status()).toBe(400);
            expect(body.status).toBe('error');
            expect(body.message).toBe('Invalid mileage type')
        })

        test("Mileage value validation", async ({request})=>{
            
            const response = await request.post('/api/cars', {
                data: mileageInvalidValuePayload
            })

            const body = await response.json()

            expect(response.status()).toBe(400);
            expect(body.status).toBe('error');
            expect(body.message).toBe('Mileage has to be from 0 to 999999')
        })

        test("Mileage is required validation", async ({request})=>{
            
            const response = await request.post('/api/cars', {
                data: mileageAbsentPayload
            })

            const body = await response.json()

            expect(response.status()).toBe(400);
            expect(body.status).toBe('error');
            expect(body.message).toBe('Mileage is required');
        })

        test("Model not found validation", async ({request})=>{
            
            const response = await request.post('/api/cars', {
                data: nonExistingModelIdPayload
            })

            const body = await response.json()

            expect(response.status()).toBe(404);
            expect(body.status).toBe('error');
            expect(body.message).toBe('Model not found');
        })

        test("Brand not found validation", async ({request})=>{
            
            const response = await request.post('/api/cars', {
                data: nonExistingBrandIdPayload
            })

            const body = await response.json()

            expect(response.status()).toBe(404);
            expect(body.status).toBe('error');
            expect(body.message).toBe('Brand not found');
        })
    })
})