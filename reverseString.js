var reverseString = function(s) {
    let newString = "";
    for (let i = s.length - 1; i >= 0; i--){
        newString += s[i];
    }
    return newString;
    // s.reverse()
};


console.log(reverseString("hello"))