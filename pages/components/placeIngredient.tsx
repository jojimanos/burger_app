export default function PlaceIngredient(lettuce: number, tomato: number) {

        let burger: any = []
    
        for (let i = 0; i < lettuce; i++) {
          burger.push(<div key={burger.length} className='lettuce'></div>)
          console.log(burger)
        }
        for (let i = 0; i < tomato; i++) {
          burger.push(<div key={burger.length} className='tomato'></div>)
          console.log(burger)
        }
        return burger
    
      }