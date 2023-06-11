import {BaseKeyExplanation, GridKeyExplanation, KeyType, LargeKeyExplanation} from "~/types/interfaces";
import {For} from "solid-js";
import style from './KeyHint.module.css'

function Grid({ explanation } : { explanation: GridKeyExplanation }) {
    return (
        <div class={style.grid}>
            <For each={explanation.layout}>{(row) =>
                <div class={style.row}>
                    <For each={row}>{(key) =>
                        <div class={style.item}>
                            {key && <div class={style.key}>{key}</div>}
                        </div>
                    }</For>
                </div>
            }</For>
        </div>
    )
}
function Large({ explanation } : { explanation: LargeKeyExplanation }) {
    return (
        <div class={`${style.large} ${style.key}`}>
            {explanation.text}
        </div>
    )
}

export default function KeyHint({ explanation } : { explanation: BaseKeyExplanation }) {
    return (
        <>
            <div>
                {explanation.type === KeyType.GRID && <Grid explanation={explanation as GridKeyExplanation} />}
                {explanation.type === KeyType.LARGE && <Large explanation={explanation as LargeKeyExplanation} />}
            </div>
            <div class={style.description}>
                {explanation.description}
            </div>
        </>
    )
}
