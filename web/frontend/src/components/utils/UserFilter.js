export const filteredList = (data, filter) => {
    var filtered = []
    data.forEach(doc => {
        if (filter['role'].includes("User") && !doc.Role) filtered = filtered.concat(doc)
        if (filter['role'].length > 0 && !filter['role'].includes(doc.Role)) return
        filtered = filtered.concat(doc)
    });
    return filtered
}

export const sortedByCreateDate = (data, order) => {
    if (order[0].value) 
        return data.sort((a, b) => parseFloat(a.ReportDate.toMillis()) - parseFloat(b.ReportDate.toMillis()));
    if (order[1].value) 
        return data.sort((a, b) => parseFloat(b.ReportDate.toMillis()) - parseFloat(a.ReportDate.toMillis()));
    return data
}