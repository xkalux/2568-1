import { pipe } from "./helper"
import type { newDeck } from "./playing-card"

type weapon = 'Rock' | 'Paper' | 'Scissors'

let score: number = 0

function userInput(myPrompt: string): weapon { // not pure
    const userChoice = prompt(myPrompt)
    if (userChoice?.toLocaleLowerCase() === 'Rock'.toLocaleLowerCase() || userChoice?.toLocaleLowerCase() === 'R'.toLocaleLowerCase())
        return 'Rock'

    if (userChoice?.toLocaleLowerCase() === 'Scissors'.toLocaleLowerCase() || userChoice?.toLocaleLowerCase() === 'S'.toLocaleLowerCase())
        return 'Scissors'
    return 'Paper'
}

function isPlayerWin(playerWeapon: weapon): boolean | undefined { // pure
    const ranNumber = Math.floor(Math.random() * 3)
    let comWeapon: weapon = 'Paper'
    if (ranNumber === 0)
        comWeapon = 'Rock'
    if (ranNumber === 1)
        comWeapon = 'Scissors'
    if (playerWeapon === comWeapon)
        return undefined
    if (playerWeapon === 'Rock' && comWeapon === 'Scissors')
        return true
    if (playerWeapon === 'Scissors' && comWeapon === 'Paper')
        return true
    if (playerWeapon === 'Paper' && comWeapon === 'Rock')
        return true
    return false
}

function reward(isPlayerWin: boolean | undefined): number { // pure
    if (isPlayerWin === undefined)
        return 0
    if (isPlayerWin)
        return 1
    else
        return -1
}

function report(round: number, score: number): string { // pure
    return `Round: ${round}, Score: ${score}` // template string
}

const play = pipe(isPlayerWin, reward) // pure

function main(): void {// not pure
    let round = 1
    while (score < 10) {
        const playerWeapon = userInput('Choose your weapon: Rock, Paper, or Scissors')
        const newScore = play(playerWeapon) + score
        // if (score === newScore)
        //     console.log('Tie')
        // if (score > newScore)
        //     console.log('You lose')
        // if (score < newScore)
        //     console.log('You win')
        score = newScore
        const reportMessage = report(round, score)
        console.log(reportMessage)
        round++
    }
}

main()