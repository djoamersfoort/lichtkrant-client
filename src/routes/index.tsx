import Menu from "~/components/Menu";
import {Game, KeyType} from "~/types/interfaces";
import {createEffect, createSignal} from "solid-js";
import Play from "~/components/Play";
import {io} from "socket.io-client";

enum State {
    LOADING,
    MENU,
    PLAYING
}

export default function Home() {
    const [state, setState] = createSignal(State.LOADING)
    const [game, setGame] = createSignal(null as Game | null)
    const [games, setGames] = createSignal([] as Game[])
    const socket = io(import.meta.env.DEV ? "http://localhost:5000" : '/')

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
