import Menu from "~/components/Menu"
import Play from "~/components/Play"
import { Game } from "~/types/interfaces"
import { createSignal } from "solid-js"
import { io } from "socket.io-client"

enum State {
    LOADING,
    MENU,
    PLAYING
}

export default function Home() {
    const [state, setState] = createSignal(State.LOADING)
    const [game, setGame] = createSignal(null as Game | null)
    const [games, setGames] = createSignal([] as Game[])
    const socket = io(import.meta.env.DEV ? "http://localhost:8080" : '/')

    socket.on('games', (games: Game[]) => {
        setGames(games)
        setState(State.MENU)
    })

    function play(game: Game) {
        socket.emit('join', game.id)
        setGame(game)
        setState(State.PLAYING)
    }
    function leave() {
        socket.emit('leave')
        setState(State.MENU)
    }

    return (
        <>
            {state() === State.MENU && <Menu games={games()} play={play}/>}
            {state() === State.PLAYING && <Play game={game() as Game} leave={leave} socket={socket}/>}
        </>
    );
}
