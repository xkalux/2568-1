import type { Card } from "./Card"

export class Hand {
    private cards: Card[] = [];

    addCard(card: Card): void {
        this.cards.push(card)
    }

    get Value(): number {
        return this.cards.reduce((total, card) => total + card.Value, 0) % 10
    }

    reset(): void {
        this.cards = []
    }

    get isPok(): boolean {
        return this.cards.length === 2 && this.Value >= 8
    }
    get isDeng(): boolean {
        return this.cards.length === 2 && this.cards[0]?.suit === this.cards[1]?.suit
    }

    toString(): string {
        let text = `Hand: ${this.Value} `
        if (this.isPok) {
            text += 'Pok '
        }
        if (this.isDeng) {
            text += 'Deng '
        }
        return text
    }
}

export class Player {
    private _bet: number = 0
    constructor(
        private _money: number,
        private readonly _id: string,
        private _hands: Hand[]
    ) { }

    set money(amount: number) {
        this._money = this._money + amount
    }
    get money(): number {
        return this._money < 0 ? 0 : this._money
    }

    get id(): string {
        return this._id
    }

    get hands(): Hand[] {
        return this._hands
    }

    reset(): void {
        for (const hand of this._hands) {
            hand.reset()
        }
    }

    setBet(amount: number): void {
        if (amount < 0 || amount > this.money) {
            amount = this.money
        }
        this._bet = amount
    }

    get bet(): number {
        return this._bet
    }
}