import style from './ColorSettings.module.css'
import { createEffect, createSignal } from "solid-js";
import { Socket } from "socket.io-client";
import { ColorPreferences } from "~/types/interfaces";

export default function ColorSettings({ settings, socket } : { settings: ColorPreferences, socket: Socket }) {
    const [color, setColor] = createSignal(localStorage.getItem('color') || '#57e389')
    createEffect(() => {
        if (!settings.configurable) return

        socket.emit('color', color())
        localStorage.setItem('color', color())
    })
    socket.on('color', (color: string) => {
        setColor(color)
    })

    return (
        <div class={style.line}>
            <label for="color">Color</label>
            <div class={style.pickerContainer}>
                <input class={style.picker} type="color" id="color" disabled={!settings.configurable} value={color()} onChange={(e) => {
                    setColor(e.target.value)
                }} />
            </div>
        </div>
    )
}
