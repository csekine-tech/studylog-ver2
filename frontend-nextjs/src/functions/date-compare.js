const isPast = (compared, today) => {
    //過去か判定
    var date1 = compared
    var date2 = today

    var year1 = date1.getFullYear()
    var month1 = date1.getMonth() + 1
    var day1 = date1.getDate()

    var year2 = date2.getFullYear()
    var month2 = date2.getMonth() + 1
    var day2 = date2.getDate()

    if (year1 == year2) {
        if (month1 == month2) {
            return day1 < day2
        } else {
            return month1 < month2
        }
    } else {
        return year1 < year2
    }
}

export default isPast