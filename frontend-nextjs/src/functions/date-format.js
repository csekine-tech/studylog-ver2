const dateFormat = d => {
    let returnValue
    if (typeof d === 'string') {
        returnValue = d
    } else if (d === null) {
        returnValue = null
    } else {
        returnValue = `${d.getFullYear()}-${(d.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${d
            .getDate()
            .toString()
            .padStart(2, '0')}`.replace(/\n|\r/g, '')
    }

    return returnValue
}

export default dateFormat
