export const filteredList = (data, filter) => {
    var filtered = []
    data.forEach(doc => {
        if (filter['status'] && doc.Resolved) return
        if (filter['fromDate'] !== undefined && doc.ReportDate < filter['fromDate']) return
        if (filter['toDate'] !== undefined && doc.ReportDate > filter['toDate']) return
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