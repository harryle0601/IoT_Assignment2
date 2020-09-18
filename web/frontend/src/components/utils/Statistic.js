export const carStatusPieChart = (data) => {
    var idle = 0
    var fixing = 0
    var renting = 0
    data.forEach(doc => {
        if (doc.Available === "Idle") idle = idle + 1
        if (doc.Available === "Fixing") fixing = fixing + 1
        if (doc.Available === "Renting") renting = renting + 1
    });
    return [
        ['Car', 'Status'],
        ['Idle', idle],
        ['Fixing', fixing],
        ['Renting', renting]
    ]
}