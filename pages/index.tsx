import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import AddRemoveComponent from './components/addRemoveComponent'
import PlaceIngredient from './components/placeIngredient'

export default function Home() {

  const [lettuce, setLettuce] = useState(0)
  const [tomato, setTomato] = useState(0)
  const [beef, setBeef] = useState(0)
  const [bacon, setBacon] = useState(0)
  const [cheese, setCheese] = useState(0)

  const ingredientNames = { lettuce: "Lettuce", tomato: "Tomato" }

  function add(ingredient: number, setIngredient: Function) { setIngredient(ingredient + 1) }
  function remove(ingredient: number, setIngredient: Function) { setIngredient(ingredient > 0 ? ingredient - 1 : ingredient) }

  //const burgerContents: any = () => {
//
  //  let burger: any = []
//
  //  for (let i = 0; i < lettuce; i++) {
  //    burger.push(<div key={burger.length} className='lettuce'></div>)
  //    console.log(burger)
  //  }
  //  for (let i = 0; i < tomato; i++) {
  //    burger.push(<div key={burger.length} className='tomato'></div>)
  //    console.log(burger)
  //  }
  //  return burger
//
  //}

  return (
    <div className={styles.container}>
      <Head>
        <title>Burger App</title>
        <meta name="Burger App" content="Build and taste your favourite burger!!!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className='burgerContainer'>
          <div className='burgerTop'></div>
          <div>{PlaceIngredient(lettuce, tomato)}</div>
          <div className='burgerBottom'></div>
        </div>
        <div>{AddRemoveComponent(add, remove, lettuce, setLettuce, ingredientNames.lettuce)}</div>
        <div>{AddRemoveComponent(add, remove, tomato, setTomato, ingredientNames.tomato)}</div>
      </main>
    </div>
  )
}
