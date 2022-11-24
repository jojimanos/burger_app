export default function AddRemoveComponent(add: Function, remove: Function, ingredient: number, setIngredient: Function, ingrerdientName: string, maxItems: number) {

    return (
        <div className="grid grid-rows-2">
            <div className="grid grid-cols-2 border-2 border-orange-700 text-center p-2"><p>{ingrerdientName}</p><p>{ingredient}</p></div>
            <div className="grid grid-cols-2 text-center p-2 gap-2">
                <button type="button" className="bg-orange-400 text-center rounded-md border-1 border-red-900 p-2" onClick={() => { add(ingredient, maxItems, setIngredient) }}>I want more</button>
                <button type="button" className="bg-orange-400 text-center rounded-md border-1 border-red-900 p-2" onClick={() => { remove(ingredient, setIngredient) }}>I want less</button>
            </div>
        </div>)
}