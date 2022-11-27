import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import AddRemoveComponent from './components/addRemoveComponent'
import PlaceIngredient from './components/placeIngredient'
import Router from 'next/router'

export default function Home() {

  const [lettuce, setLettuce] = useState(0)
  const [tomato, setTomato] = useState(0)
  const [beef, setBeef] = useState(0)
  const [cheese, setCheese] = useState(0)
  const [success, setSuccess] = useState("");
  const [error, setError] = useState({});
  const [errorMessage, setErrorMessage] = useState("")
  const [buttonText, setButtonText] = useState("ORDER")

  const ingredientNames = {
    lettuce: "Lettuce",
    tomato: "Tomato",
    beef: "Beef",
    cheese: "Cheese"
  }

  const maxItems = {
    lettuce: 4,
    tomato: 4,
    beef: 2,
    cheese: 2
  }

  function add(ingredient, maxItems, setIngredient) { setIngredient(ingredient === maxItems ? ingredient : ingredient + 1) }
  function remove(ingredient, setIngredient) { setIngredient(ingredient > 0 ? ingredient - 1 : ingredient) }

  const handleValidation = () => {
    let tempErrors = { lettuce: true, tomato: true, beef: true, cheese: true };
    let isValid = false;

    if (lettuce > 0) {
      tempErrors.lettuce = false;
      isValid = true;
    }
    if (tomato > 0) {
      tempErrors.tomato = false;
      isValid = true;
    }
    if (beef > 0) {
      tempErrors.beef = false;
      isValid = true;
    }
    if (cheese > 0) {
      tempErrors.cheese = false;
      isValid = true;
    }

    setError({ ...tempErrors });
    console.log("errors", error);
    return isValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let isValidForm = handleValidation();

    if (isValidForm) {
      setButtonText("ORDERING");
      const res = await fetch("/api/sendgrid", {
        body: JSON.stringify({
          lettuce: lettuce,
          tomato: tomato,
          beef: beef,
          cheese: cheese,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();
      if (error) {
        console.log(error);
        setSuccess("");
        setErrorMessage("There was an error receiving your order. Please try again");
        setButtonText("ORDER");

        // Reset form fields
        setLettuce(0);
        setTomato(0);
        setBeef(0);
        setCheese(0);
        return;
      }
      setSuccess("Your order was received. We will land your meal in no time");
      setError("");
      setButtonText("ORDER");
      // Reset form fields
      setLettuce(0);
      setTomato(0);
      setBeef(0);
      setCheese(0);
    }
    console.log(lettuce, tomato, beef, cheese);
  };

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
          <div>{PlaceIngredient(lettuce, tomato, beef, cheese)}</div>
          <div className='burgerBottom'></div>
        </div>
        <form onSubmit={onSubmit}>
          <div className='grid-rows-5 gap-1 border-2 border-yellow-900 bg-amber-600 p-4 rounded-lg'>
            <div className='grid place-items-center'>
              <div className='text-center bg-green-500 m-1 border border-white w-16'>{`${lettuce * 1 + tomato * 2 + beef * 4 + cheese * 3}$`}</div>
            </div>
            <div>{AddRemoveComponent(add, remove, lettuce, setLettuce, ingredientNames.lettuce, maxItems.lettuce)}</div>
            {error.lettuce && (<p>Place at least one piece</p>)}
            <div>{AddRemoveComponent(add, remove, tomato, setTomato, ingredientNames.tomato, maxItems.tomato)}</div>
            {error.tomato && (<p>Place at least one piece</p>)}
            <div>{AddRemoveComponent(add, remove, beef, setBeef, ingredientNames.beef, maxItems.beef)}</div>
            {error.beef && (<p>Place at least one piece</p>)}
            <div>{AddRemoveComponent(add, remove, cheese, setCheese, ingredientNames.cheese, maxItems.cheese)}</div>
            {error.cheese && (<p>Place at least one piece</p>)}
          </div>
          <div className='grid place-items-center'>
            <button className='text-center bg-red-600 border border-red-400 m-2 p-2 rounded'>{buttonText}</button>
          </div>
          <div className="text-left">
            {success && (
              <p className="text-green-500 font-semibold text-sm my-2">
                Ευχαριστούμε! Το μήνυμά σας παρελείφθη!
              </p>
            )}
            {errorMessage && (
              <p className="text-red-500">
                Κάτι πήγε στραβά. Παρακαλώ προσπαθήστε ξανά.
              </p>
            )}
          </div>
        </form>
      </main>
    </div>
  )
}
