import { pipe } from "./helper"

const scores = [20, 60, 10, -9, 0.25, -9, 120, 101, 10.5, 105.2]

const removeLessThanOrEqualZero = (numbers: number[]) => numbers.filter((n) => n > 0)
const removeGreaterThanOneHundred = (numbers: number[]) => numbers.filter((n) => n <= 100)

// const removeLessThanOrEqualZeroAndGreaterThanOneHundred = pipe(removeLessThanOrEqualZero, removeGreaterThanOneHundred)

const multiplyTenWhenLessThanTen = (numbers: number[]) =>
    numbers.map((n) => (n < 10 ? n * 10 : n))

// const filterMoreThanZeroAndLessThanOneHundredThenMultiplyTenWhenLessThanTen = pipe(
//     removeLessThanOrEqualZero,
//     removeGreaterThanOneHundred,
//     multiplyTenWhenLessThanTen
// )

const average = (numbers: number[]) =>
    numbers.reduce((acc, n) => acc + n, 0) / numbers.length

const filterMoreThanZeroAndLessThanOneHundredThenMultiplyTenWhenLessThanTenAndAverage = pipe(
    removeLessThanOrEqualZero,
    removeGreaterThanOneHundred,
    multiplyTenWhenLessThanTen,
    average
)

// console.log(filterMoreThanZeroAndLessThanOneHundredThenMultiplyTenWhenLessThanTenAndAverage(scores))

// const x = function (name: string) { console.log("foo", name) }("xxxxx")

const curry = (fn: Function, arity = fn.length) => {
    const curried = (args: any[]) => {
        return (arg: any) => {
            const newArgs = [...args, arg]
            if (newArgs.length >= arity) {
                return fn(...newArgs)
            }
            return curried(newArgs)
        }
    }
    return curried([])
}
