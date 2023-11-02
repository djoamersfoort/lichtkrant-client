import style from "./Play.module.css"
import KeyHint from "~/components/KeyHint"
import ColorSettings from "~/components/ColorSettings"
import { Title } from "solid-start"
import { For, onMount, onCleanup } from "solid-js"
import { Socket } from "socket.io-client"
import { Game } from "~/types/interfaces"

export default function Play({ game, socket } : { game: Game, socket: Socket }) {
    const downListener = ({ key }: KeyboardEvent) => {
        if (!game.keys.includes(key)) return

        socket.emit('key_down', key)
    }
    const upListener = ({ key }: KeyboardEvent) => {
        if (!game.keys.includes(key)) return

        socket.emit('key_up', key)
    }

    onMount(() =>  {
        document.addEventListener('keydown', downListener)
        document.addEventListener('keyup', upListener)
    })
    onCleanup(() => {
        document.removeEventListener('keydown', downListener)
        document.removeEventListener('keyup', upListener)
    })

    return (
        <div class={style.container} style={{
            "--from": game.color.from,
            "--to": game.color.to,
        }}>
            <Title>{`Playing ${game.name}`}</Title>
            <div class={style.page}>
                <h2>{game.name}</h2>
                {game.colors.visible &&
                    <div class={style.component}>
                        <h3>Profile</h3>
                        <ColorSettings settings={game.colors} socket={socket} />
                    </div>
                }
                <div class={style.component}>
                    <h3>Keys</h3>
                    <div class={style.explanations}>
                        <For each={game.explanation}>{(explanation) =>
                            <KeyHint explanation={explanation} />
                        }</For>
                    </div>
                </div>
            </div>
        </div>
    )
}
