const dateFormatText = d => {
    //input 2022-09-01 ->
    //一年以内の場合-> 9月1日
    //今年じゃない場合->2023年9月1日
    //昨日、今日、明日、二日後〜一週間後、一ヶ月後〜11ヶ月後、一年後〜
    let date = new Date(d)
    let formatDate = `${date.getFullYear()}年${
        date.getMonth() + 1
    }月${date.getDate()}日`
    let formatDateNearNow = `${date.getMonth() + 1}月${date.getDate()}日`
    const today = new Date()
    const getToday = () => {
        let today = new Date()
    }
    const isEqual = (date1, date2) => {
        let year1 = new Date(date1).getFullYear()
        let month1 = new Date(date1).getMonth() + 1
        let day1 = new Date(date1).getDate()

        let year2 = new Date(date2).getFullYear()
        let month2 = new Date(date2).getMonth() + 1
        let day2 = new Date(date2).getDate()

        if (year1 == year2) {
            if (month1 == month2) {
                if (day1 == day2) {
                    return true
                }
            }
        }
        return false
    }
    if (isEqual(date, new Date())) {
        return formatDateNearNow + '(今日)'
    } else if (isEqual(date, new Date().setDate(new Date().getDate() + 1))) {
        return formatDateNearNow + '(明日)'
    } else if (isEqual(date, new Date().setDate(new Date().getDate() - 1))) {
        return formatDateNearNow + '(昨日)'
    }
    for (let i = 1; i <= 10; i++) {
        if (
            date >= new Date().setYear(new Date().getFullYear() + i) &&
            date < new Date().setYear(new Date().getFullYear() + i + 1)
        ) {
            return formatDate + `(${i}年後)`
        } else if (
            date <= new Date().setYear(new Date().getFullYear() - i) &&
            date > new Date().setYear(new Date().getFullYear() - i - 1)
        ) {
            return formatDate + `(${i}年前)`
        }
    }
    for (let i = 1; i <= 11; i++) {
        if (
            date >= new Date().setMonth(new Date().getMonth() + i) &&
            date < new Date().setMonth(new Date().getMonth() + i + 1)
        ) {
            return formatDateNearNow + `(${i}ヶ月後)`
        } else if (
            date <= new Date().setMonth(new Date().getMonth() - i) &&
            date > new Date().setMonth(new Date().getMonth() - i - 1)
        ) {
            return formatDateNearNow + `(${i}ヶ月前)`
        }
    }
    for (let i = 2; i <= 31; i++) {
        if (isEqual(date, new Date().setDate(new Date().getDate() + i))) {
            return formatDateNearNow + `(${i}日後)`
        } else if (
            isEqual(date, new Date().setDate(new Date().getDate() - i))
        ) {
            return formatDateNearNow + `(${i}日前)`
        }
    }

    return formatDate
}

export default dateFormatText
