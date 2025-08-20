import type { Deck } from "./Deck"
import type { Player } from "./Player"



export class PokdengGame {
    private _players: Player[] = [];
    constructor(private _dealer: Player, private _deck: Deck) { }

    addPlayer(player: Player): void {
        this._players.push(player)
    }

    dealerVsPlayer(player: Player): void {
        console.log(`Dealer vs ${player.id}`)
        const dealerHand = this._dealer.hands[0]!
        let handIndex = 1
        for (const playerHand of player.hands) {
            console.log(` -> hand: ${handIndex}`)
            let result: string = ''
            if (dealerHand.isPok && !playerHand.isPok) {// player lose
                let bet = player.bet
                player.money = -player.bet
                result = 'Dealer wins with Pok' + dealerHand.Value
                if (dealerHand.isDeng) {// dealer win with deng
                    player.money = -player.bet
                    bet += bet
                    result += ' and Deng'
                }
                result += `, Player ${playerHand.toString()} `
                result += ` loses ${bet}`

            } else if (dealerHand.isPok && playerHand.isPok) {// both pok
                if (dealerHand.Value > playerHand.Value) {// dealer win
                    player.money = -player.bet
                    result = `Dealer wins with Pok ${dealerHand.Value} vs Player's Pok ${playerHand.Value} , Player loses ${player.bet}`
                } else if (dealerHand.Value < playerHand.Value) {// player win
                    player.money = player.bet
                    result = `Player wins with Pok ${playerHand.Value} vs Dealer's Pok ${dealerHand.Value} , Player got ${player.bet}`
                }
            } else if (!dealerHand.isPok && playerHand.isPok) {
                player.money = player.bet
                let bet = player.bet
                result = `Dealer loses with ${dealerHand.toString()}`
                result += `Player wins with Pok ${playerHand.Value} , Player got ${player.bet}`
                if (playerHand.isDeng) {// player win with deng
                    player.money = player.bet
                    bet += bet
                    result += ' and Deng'
                }
                result += `, Player got ${bet}`
            } else {
                if (dealerHand.Value > playerHand.Value) {// dealer win
                    result = `Dealer wins with ${dealerHand.Value} vs Player's ${playerHand.Value} , Player loses ${player.bet}`
                    player.money = -player.bet
                } else if (dealerHand.Value < playerHand.Value) {// player win
                    player.money = player.bet
                    result = `Player wins with ${playerHand.Value} vs Dealer's ${dealerHand.Value} , Player got ${player.bet}`
                }
            }
            console.log(`   -> ${result}`)
            handIndex++
        }
    }

    deal(player: Player): void {
        for (const hand of player.hands) {
            hand.addCard(this._deck.getCard())
        }
    }
    play(): void {
        this._dealer.reset()
        this._deck.reset()
        this._deck.shuffle(50)
        for (const player of this._players) {
            player.reset()
            player.setBet(100) // Example bet amount, can be modified
        }

        for (let index = 0; index < 2; index++) {
            this.deal(this._dealer)
            for (const player of this._players) {
                this.deal(player)
            }
        }
        for (const player of this._players) {
            this.dealerVsPlayer(player)
        }
    }
}