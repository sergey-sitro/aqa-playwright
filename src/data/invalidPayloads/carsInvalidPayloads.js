export const mileageInvalidTypePayload = {
    "carBrandId": 1,
    "carModelId": 1,
    "mileage": ""
};

export const mileageInvalidValuePayload = {
    "carBrandId": 1,
    "carModelId": 1,
    "mileage": -1
}

export const mileageAbsentPayload = {
    "carBrandId": 1,
    "carModelId": 1
}

export const nonExistingModelIdPayload = {
    "carBrandId": 1,
    "carModelId": 0,
    "mileage": 1
}

export const nonExistingBrandIdPayload = {
    "carBrandId": 0,
    "carModelId": 1,
    "mileage": 1
}