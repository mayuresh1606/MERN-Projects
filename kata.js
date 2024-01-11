function rowWithMax1s(arr, n, m){
    let values = {
        '5': 2
    }
    if (arr)
        arr.forEach((insideArr, index) => {
            insideArr.forEach((element) => {
                if (element === 1){
                    if (!values[index]) values[index] = 0
                    values[index] += 1;
                }
            })
        })
    console.log(values)
    let tempVal = 0
    console.log(Object.values(values))
    Object.values(values).forEach(value => {
        if (value > tempVal){
            tempVal = value
        }
    })
    let returningIndex;
    Object.values(values).forEach((num, index) => {
        if (num === tempVal){
            returningIndex = index
        }
    })
    return returningIndex;
}

console.log(rowWithMax1s([
    [0, 0],
    [0, 1],
    [0, 0],
    [0, 1],
    [0, 0],
    [0, 1],
], 6, 2))


//            6 2
// 0 0 0 1 0 0 0 0 0 1 0 1