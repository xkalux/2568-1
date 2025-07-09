
export enum Rank {
    A = 1,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    J,
    Q,
    K
}

export enum Suit {
    Spades = 0,
    Hearts,
    Diamonds,
    Clubs
}

export type Card = {
    rank: Rank
    suit: Suit
}

export type Deck = Card[]

export type GameData = {
    deck: Deck
    playerCards: Card[]
    dealerCards: Card[]
    playerBet: number
    playerMoney: number
    battleResult: 'playerWin' | 'dealerWin' | 'draw' | null
}

export function setBet(limit: number): number {
    const input = prompt("Enter your bet:") || '1'
    const bet = parseInt(input) || 1
    return bet > limit ? limit : bet < 1 ? 1 : bet
}

export function newDeck(gameData: GameData): GameData {
    const copyGameData = { ...gameData }
    copyGameData.deck = createDeck()
    return copyGameData
}

export function shuffle(gameData: GameData): GameData {
    const copyGameData = { ...gameData }
    copyGameData.deck = shuffleDeck(copyGameData.deck)
    return copyGameData
}

export function dealCard(gameData: GameData): GameData {
    const copyGameData = { ...gameData }
    copyGameData.playerCards.push(copyGameData.deck[0]!)
    copyGameData.dealerCards.push(copyGameData.deck[1]!)
    copyGameData.playerCards.push(copyGameData.deck[2]!)
    copyGameData.dealerCards.push(copyGameData.deck[3]!)

    return copyGameData
}

export function versus(gameData: GameData): GameData {
    const copyGameData = { ...gameData }
    const playerPoints = copyGameData.playerCards.reduce((sum, card) => sum + card.rank, 0) % 10
    const dealerPoints = copyGameData.dealerCards.reduce((sum, card) => sum + card.rank, 0) % 10

    if (playerPoints > dealerPoints) {
        copyGameData.battleResult = 'playerWin'
    } else if (playerPoints < dealerPoints) {
        copyGameData.battleResult = 'dealerWin'
    } else if (playerPoints === dealerPoints) {
        const playerSuitPoints = copyGameData.playerCards.reduce((sum, card) => sum + card.suit, 0)
        const dealerSuitPoints = copyGameData.dealerCards.reduce((sum, card) => sum + card.suit, 0)
        if (playerPoints === dealerSuitPoints)
            copyGameData.battleResult = 'draw'
        else if (playerSuitPoints < dealerSuitPoints)
            copyGameData.battleResult = 'playerWin'
        else
            copyGameData.battleResult = 'dealerWin'
    }
    // console.log(`Player Points: ${playerPoints}, Dealer Points: ${dealerPoints}`)
    // console.log(`Battle Result: ${copyGameData.battleResult}`)
    return copyGameData
}

export function reward(gameData: GameData): GameData {
    const copyGameData = { ...gameData }
    switch (copyGameData.battleResult) {
        case "dealerWin":
            copyGameData.playerMoney -= copyGameData.playerBet
            break

        case "playerWin":
            copyGameData.playerMoney += copyGameData.playerBet
            break
        default:
            break
    }
    return copyGameData
}

export function report(gameData: GameData): void {
    // console.table(gameData)
    console.log(`Player Money: ${gameData.playerMoney}`)
    console.log(`Player Bet: ${gameData.playerBet}`)
    console.log(`Battle Result: ${gameData.battleResult}`)
    console.log(`Player Cards: ${gameData.playerCards.map(card => `${Rank[card.rank]} of ${Suit[card.suit]}`).join(', ')}`)
    console.log(`Dealer Cards: ${gameData.dealerCards.map(card => `${Rank[card.rank]} of ${Suit[card.suit]}`).join(', ')}`)

}

function createDeck(): Deck {
    const deck: Deck = []
    for (let suit = Suit.Spades; suit <= Suit.Clubs; suit++) {
        for (let rank = Rank.A; rank <= Rank.K; rank++) {
            deck.push({ rank, suit })
        }
    }
    return deck
}

function shuffleDeck(deck: Deck): Deck {
    for (let i = 0; i < 200; i++) {
        const i = Math.floor(Math.random() * (deck.length - 1))
        const j = Math.floor(Math.random() * (deck.length - 1))
        const temp = deck[i]
        //@ts-ignore
        deck[i] = deck[j]
        //@ts-ignore
        deck[j] = temp
    }
    return deck
}

