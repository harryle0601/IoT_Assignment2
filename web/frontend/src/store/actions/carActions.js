export const getCarFiltered = (available=true, brand="", model="", color="", minPrice="", maxPrice="") => {
    return (dispatch, getState, { getFirestore }) => {
        const firebase = getFirestore();
        var filtered = firebase.collection("cars")

        if (brand !== "") filtered = filtered.where("Brand","==",brand)
        if (model !== "") filtered = filtered.where("Model","==",model)
        if (color !== "") filtered = filtered.where("Color","==",color)
        if (available) filtered = filtered.where("Available","==",available)
        if (maxPrice !== "") filtered = filtered.where("Price","<=",maxPrice)
        if (minPrice !== "") filtered = filtered.where("Price",">=",minPrice)

        filtered.get().then((querySnapshot) => {
            var cars = []
            querySnapshot.forEach((doc) => {
                let car = doc.data();
                car.id = doc.id;
                cars = cars.concat(car)
            });
            dispatch({ 
                type: 'FETCH_SUCCESS', 
                cars: cars
            });
        }).catch((err) => {
            dispatch({ 
                type: 'FETCH_ERROR', err 
            });
        });
    }
}