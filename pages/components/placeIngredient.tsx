export default function PlaceIngredient(lettuce: number, tomato: number, beef: number, cheese: number) {

    let burger: any = []

    for (let i = 0; i < lettuce; i++) {
        burger.push(<div key={burger.length} className='lettuce'></div>)
        console.log(burger)
    }
    for (let i = 0; i < tomato; i++) {
        burger.push(<div key={burger.length} className='tomato'></div>)
        console.log(burger)
    }
    for (let i = 0; i < beef; i++) {
        burger.push(<div key={burger.length} className='beef'></div>)
        console.log(burger)
    }
    for (let i = 0; i < cheese; i++) {
        burger.push(<div key={burger.length} className='cheese'></div>)
        console.log(burger)
    }
    return burger

}