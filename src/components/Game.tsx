import {Game} from "~/types/interfaces";
import styles from './Game.module.css'

export default function GameComponent({ game, play } : { game: Game, play: () => void }) {
    return (
        <div onclick={play} class={styles.game} style={{
            "--from": game.color.from,
            "--to": game.color.to
        }}>
            <h1 class={styles.title}>{game.name}</h1>
            <p>{game.description}</p>
        </div>
    )
}
