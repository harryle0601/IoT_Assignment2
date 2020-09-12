export const filteredList = (data, filter) => {
    var filtered = []
    data.forEach(doc => {
        if (filter['available'] && !doc.Available) return
        if (filter['brand'].length > 0 && !filter['brand'].includes(doc.Brand)) return
        if (doc.Seats < filter['minSeats'] && filter['minSeats'] !== undefined) return
        if (doc.Seats > filter['maxSeats'] && filter['maxSeats'] !== undefined) return
        if (filter['color'].length > 0 && !filter['color'].includes(doc.Color)) return
        if (doc.Price < filter['minPrice'] && filter['minPrice'] !== undefined) return
        if (doc.Price > filter['maxPrice'] && filter['maxPrice'] !== undefined) return
        filtered = filtered.concat(doc)
    });
    return filtered
}

export const getFilterTags = (data) => {
    var filter = {
        available: false,
        brand: [],
        minSeats: 99999,
        maxSeats: -1,
        color: [],
        minPrice: 99999,
        maxPrice: -1
    }

    data.forEach(doc => {
        if (!filter['brand'].includes(doc.Brand)) filter['brand'] = filter['brand'].concat(doc.Brand)
        if (!filter['color'].includes(doc.Color)) filter['color'] = filter['color'].concat(doc.Color)
        if (doc.Price < filter['minPrice']) filter['minPrice'] = doc.Price 
        if (doc.Price > filter['maxPrice']) filter['maxPrice'] = doc.Price   
        if (doc.Seats < filter['minSeats']) filter['minSeats'] = doc.Seats 
        if (doc.Seats > filter['maxSeats']) filter['maxSeats'] = doc.Seats 
    });

    return filter
}

export const sortedByPrice = (data, order) => {
    var ordered = []
    if (order == "ascending") 
        return data.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price));
    if (order == "descending") 
        return data.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price));
}