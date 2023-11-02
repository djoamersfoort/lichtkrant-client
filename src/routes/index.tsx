import Menu from "~/components/Menu"
import Play from "~/components/Play"
import Ready from "~/components/Ready"
import { Game } from "~/types/interfaces"
import { createSignal } from "solid-js"
import { io } from "socket.io-client"

enum State {
    LOADING = 'loading',
    MENU = 'menu',
    READYING = 'readying',
    PLAYING = 'playing'
}

export default function Home() {
    const [state, setState] = createSignal(State.LOADING)
    const [game, setGame] = createSignal(null as Game | null)
    const [games, setGames] = createSignal([] as Game[])
    const socket = io(import.meta.env.DEV ? "http://localhost:8080" : '/')

    document.addEventListener('keyup', ({ code }) => {
        if (code !== 'Escape') return
        if ([State.LOADING, State.MENU].includes(state())) return

        socket.emit('leave')
        setState(State.MENU)
    })

    socket.on('games', (games: Game[]) => {
        setGames(games)
        setState(State.MENU)
    })
    socket.on('state', (state: State) => {
        setState(state)
    })

    function play(game: Game) {
        socket.emit('join', game.id)
        setGame(game)
    }

    return (
        <>
            {state() === State.MENU && <Menu games={games()} play={play}/>}
            {state() === State.READYING && <Ready socket={socket} />}
            {state() === State.PLAYING && <Play game={game() as Game} socket={socket}/>}
        </>
    );
}
