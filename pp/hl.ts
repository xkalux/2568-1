type dice = 1 | 2 | 3 | 4 | 5 | 6

const diceFace: string[] = ['⚀', '⚁', '3', '4', '5', '6']

function rollDice(numberOfDice: number): dice[] { // pure
    const dices: dice[] = []
    for (let index = 0; index < numberOfDice; index++) {
        dices.push(Math.floor(Math.random() * 6 + 1) as dice)
    }
    return dices
}

function sumDices(dices: dice[]): number { // pure
    const copy = [...dices]
    return copy.reduce((acc, cur) => acc + cur, 0)
}

function reportDices(dices: dice[]): string { // pure
    const copy = [...dices]
    return copy.map((dice, index) => `Dice ${index + 1}: ${diceFace[dice - 1]}`).join('\n')
}   