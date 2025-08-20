function devide(a: number, b: number): number {
    if (b === 0) throw new Error("Cannot divide by zero")
    return Math.floor(a / b)
}
//--------------------------------------------

try {
    devide(10, 0)
} catch (e) {

}
