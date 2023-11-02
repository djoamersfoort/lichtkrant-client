import style from "./Menu.module.css"
import GameComponent from "~/components/Game"
import { For } from "solid-js"
import { Game } from "~/types/interfaces"

export default function Menu({ games, play } : { games: Game[], play: (game: Game) => void }) {
    return (
        <div class={style.menu}>
            <For each={games}>{game =>
                <GameComponent game={game} play={() => play(game)} />
            }</For>
        </div>
    )
}
