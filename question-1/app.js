function sum(a, b) {
    if (typeof (a) !== 'number' || typeof (b) !== 'number')
        throw new Error("Error")
    return `${+a + +b}`
}

const result = sum("12", "2")
console.log(result, typeof result);
console.log(sum("12", "abc"));