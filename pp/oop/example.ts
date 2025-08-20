import { Deck } from "./Deck"
import { Hand, Player } from "./Player"
import { PokdengGame } from "./PokdengGame"

class mockPlayer extends Player {
    constructor(money: number, id: string, hands: Hand[]) {
        super(money, id, hands)
    }
}
const pokdengGame = new PokdengGame(new mockPlayer(1, 'dealer', [new Hand()]), new Deck())
pokdengGame.addPlayer(new Player(5000, 'player1', [new Hand(), new Hand()]))
pokdengGame.play()