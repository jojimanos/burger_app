export default function AddRemoveComponent(add: Function, remove: Function, ingedient: number, setIngedient: number, ingrerdientName: string) {

    return (
        <div>
            <p>{ingrerdientName}</p>
            <button onClick={() => { add(ingedient, setIngedient) }}>I want more</button>
            <button onClick={() => { remove(ingedient, setIngedient) }}>I want less</button>
        </div>)
}