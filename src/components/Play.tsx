import {Game} from "~/types/interfaces"
import { Socket } from 'socket.io-client'
import ColorSettings from "~/components/ColorSettings";
import {For} from "solid-js";
import KeyHint from "~/components/KeyHint";
import style from './Play.module.css'
import {Title} from "solid-start";

export default function Play({ game, socket, leave } : { game: Game, socket: Socket, leave: () => void }) {
    document.addEventListener('keydown', ({ key }) => {
        if (!game.keys.includes(key)) return

        socket.emit('key_down', key)
    })
    document.addEventListener('keyup', ({ key }) => {
        if (key === 'Escape') return leave()
        if (!game.keys.includes(key)) return

        socket.emit('key_up', key)
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
