export const filteredList = (data, filter) => {
    var filtered = []
    data.forEach(doc => {
        if (filter['status'] && doc.ReturnDate) return
        if (filter['fromDate'] !== undefined && doc.RentDate < filter['fromDate']) return
        if (filter['toDate'] !== undefined && doc.RentDate > filter['toDate']) return
        filtered = filtered.concat(doc)
    });
    return filtered
}

export const sortedByRentDate = (data, order) => {
    if (order[0].value) 
        return data.sort((a, b) => parseFloat(a.RentDate.toMillis()) - parseFloat(b.RentDate.toMillis()));
    if (order[1].value) 
        return data.sort((a, b) => parseFloat(b.RentDate.toMillis()) - parseFloat(a.RentDate.toMillis()));
    return data
}