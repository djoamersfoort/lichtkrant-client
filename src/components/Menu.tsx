import {Game} from "~/types/interfaces";
import {For} from "solid-js";
import GameComponent from '~/components/Game'
import style from './Menu.module.css'

export default function Menu({ games, play } : { games: Game[], play: (game: Game) => void }) {
    return (
        <div class={style.menu}>
            <For each={games}>{game =>
                <GameComponent game={game} play={() => play(game)} />
            }</For>
        </div>
    )
}
