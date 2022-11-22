import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import AddRemoveComponent from './components/addRemoveComponent'
import PlaceIngredient from './components/placeIngredient'
import Navbar from './components/navbar/navbar'
import axios from 'axios'
import { isAuth } from '../helpers/auth'
import Router from 'next/router'

export default function Home() {

  const [lettuce, setLettuce] = useState(0)
  const [tomato, setTomato] = useState(0)
  const [beef, setBeef] = useState(0)
  const [cheese, setCheese] = useState(0)
  const [success, setSuccess] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    isAuth() && Router.push("/")
  })

  const ingredientNames = {
    lettuce: "Lettuce",
    tomato: "Tomato",
    beef: "Beef",
    cheese: "Cheese"
  }

  function add(ingredient: number, setIngredient: Function) { setIngredient(ingredient + 1) }
  function remove(ingredient: number, setIngredient: Function) { setIngredient(ingredient > 0 ? ingredient - 1 : ingredient) }

  const onSubmit = (e: any) => {
    e.preventDefault();

    axios.
      post('http://localhost:8000/api/order', {
        lettuce: lettuce, tomato: tomato, beef: beef, cheese: cheese
      }).then(response => {
        setLettuce(0), setTomato(0),
          setBeef(0), setCheese(0),
          console.log(response.data.message)
      })
      .catch(error => {
        console.log(error.response.message)
      });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Burger App</title>
        <meta name="Burger App" content="Build and taste your favourite burger!!!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navbar />
        <div className='burgerContainer'>
          <div className='burgerTop'></div>
          <div>{PlaceIngredient(lettuce, tomato, beef, cheese)}</div>
          <div className='burgerBottom'></div>
        </div>
        <form onSubmit={onSubmit}>
          <div className='grid-rows-5 gap-1 border-2 border-yellow-400 bg-orange-600 p-4'>
            <div className='grid place-items-center'>
              <div className='text-center bg-green-500 m-1 border border-white w-16'>{`${lettuce * 1 + tomato * 2 + beef * 4 + cheese * 3}$`}</div>
            </div>
            <div>{AddRemoveComponent(add, remove, lettuce, setLettuce, ingredientNames.lettuce)}</div>
            <div>{AddRemoveComponent(add, remove, tomato, setTomato, ingredientNames.tomato)}</div>
            <div>{AddRemoveComponent(add, remove, beef, setBeef, ingredientNames.beef)}</div>
            <div>{AddRemoveComponent(add, remove, cheese, setCheese, ingredientNames.cheese)}</div>
          </div>
          <div className='grid place-items-center'>
            <button className='text-center bg-red-600 border border-red-400 m-2 p-2 rounded'>ORDER</button>
          </div>
        </form>
        <p>{success && success || error && error}</p>
      </main>
    </div>
  )
}
