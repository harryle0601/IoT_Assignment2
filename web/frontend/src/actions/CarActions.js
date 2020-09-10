import { db } from "../firebase";

export function FilterAvailableCar(carsdb) {
    return carsdb.where("Available","==",true)
}

export function GetCarsFromPosition(carsdb, limit) {
    return carsdb.limit(parseInt(limit)).get()
}

export function GetAllCar() {
    return db.collection("cars")
}

export function FilterCarsByBrand(carsdb, brand) {
    return carsdb.where("Brand","==",brand)
}

export function FilterCarsByModel(carsdb, model) {
    return carsdb.where("Model","==",model)
}

export function FilterCarsByColor(carsdb, color) {
    return carsdb.where("Color","==",color)
}

export function FilterCarsByPrice(carsdb, minPrice, maxPrice) {
    return carsdb.where("Price",">=",minPrice).where("Price","<=",maxPrice)
}