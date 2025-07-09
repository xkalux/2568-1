import { pipe } from "./helper"
import { dealCard, newDeck, report, reward, setBet, shuffle, versus, type GameData } from "./playing-card"

const gameData: GameData = {
    deck: [],
    playerCards: [],
    dealerCards: [],
    playerBet: 0,
    playerMoney: 500,
    battleResult: null
}

const playSimplePokdeng = pipe(newDeck, shuffle, dealCard, versus, reward)
let round = 1
function main(gameData: GameData) {
    if (gameData.playerMoney > 0 && gameData.playerMoney < 20000) {
        gameData.playerBet = setBet(gameData.playerMoney)
        // report(gameData)
        console.log("Start playing Pokdeng Round ", round)
        gameData = playSimplePokdeng(gameData)
        report(gameData)
        main(gameData)
    }

    if (gameData.playerMoney <= 0) {
        console.log("You are out of money! Game Over.")
    } else {
        console.log("Congratulations! You have reached your goal of 20,000 money. Game Over.")
    }
}

main(gameData)