function zeros (n) {
    let number = n;
    // for e.g n == 5
    // number = tempNumber * n - 1
    let tempNumber = 0;
    for (let i = n - 1; i > 0; i--){
        // console.log(i, tempNumber);
        if (tempNumber === 0){
            tempNumber = number * i;
        }else{
            tempNumber = tempNumber * i;
        }
    }
    tempNumber = tempNumber.toString(10)
    let count = 1;
    if (!tempNumber.includes(0)){
        return 0;
    }else{
        let tempList = tempNumber.split("0");
        let thisNum;
        let tempNum;
        tempList.forEach((num, index) => {
            let nextNumIndex = 1;
            if (num === "0"){
                thisNum = num;
            }
            while (nextNumIndex !== 0){
                if (thisNum === "0"){
                    nextNumIndex = index + 1;
                    tempNum = tempList[nextNumIndex];
                    if (tempNum === "0"){
                        thisNum = tempNum;
                        nextNumIndex = nextNumIndex + 1;
                        count += 1;
                    }
                }else{
                    nextNumIndex = 0;
                }
            }
        })
    }
    console.log(Number(tempNumber), count);
}

console.log(zeros(30));