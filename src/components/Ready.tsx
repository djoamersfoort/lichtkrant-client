import styles from "./Ready.module.css"
import { createSignal, createEffect, onMount, onCleanup } from "solid-js"
import { Socket } from "socket.io-client"

export default function Ready({ socket } : { socket: Socket }) {
    const [ready, setReady] = createSignal(false)
    createEffect(() => {
        socket.emit('ready_state', ready())
    })

    const pressListener = ({ code }: KeyboardEvent) => {
        if (code !== 'Space') return

        setReady(!ready())
    }
    onMount(() => {
        document.addEventListener('keypress', pressListener)
    })
    onCleanup(() => {
        document.removeEventListener('keypress', pressListener)
    })

    return (
        <div class={styles.container} style={{ background: ready() ? 'lightgreen' : 'salmon' }}>
            <img class={styles.icon} src={ready() ? '/check-solid.svg' : '/x-solid.svg' } alt="" />
            <h2>{ready() ? 'Ready' : 'Not ready'}</h2>

            <div class={styles.footer}>Use <div class={styles.key}>Space</div> to ready up</div>
        </div>
    )
}
