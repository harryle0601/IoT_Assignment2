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

export const userGrowth = (data, lastnday) => {
    var linePoint = [[
        { type: 'date', label: 'Day' },
        'User Growth'
    ]]
    var newDict = {}
    for (var i = lastnday; i >= 0; i--) {
        var d = new Date();
        d.setDate(d.getDate() - i)
        d.setHours(0, 0, 0, 0)
        newDict[d.toDateString()] = 0
    }
    var count = 0;
    data.forEach(doc => {
        if (!doc.Role) {
            var createDate = doc.CreateDate.toDate()
            createDate.setHours(0, 0, 0, 0)
            count = count + 1;
            if (createDate.toDateString() in newDict) newDict[createDate.toDateString()] = count
        }
    });
    var track = 0;
    for (const [key, value] of Object.entries(newDict)) {
        if (value !== 0) track = value
        var dateFromKey = new Date(Date.parse(key))
        console.log("Date from key", dateFromKey, typeof dateFromKey)
        linePoint.push([dateFromKey, track])
    }
    console.log("linepoint", linePoint)
    return linePoint
}

export const weeklyBookCancel = (data) => {
    var filteredUser = []
    var linePoint = [
        ['User', 'Day'],
        ['Monday', 0],
        ['Tuesday', 10],
        ['Wednesday', 23],
        ['Thursday', 17],
        ['Friday', 18],
        ['Saturnday', 9],
        ['Sunday', 11]
    ]
    data.forEach(doc => {
        var getDate = doc.ReportDate.toDate()
    });
}