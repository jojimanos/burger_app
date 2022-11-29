import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import AddRemoveComponent from './components/addRemoveComponent'
import PlaceIngredient from './components/placeIngredient'
import Router from 'next/router'

export default function Home() {

  const [lettuce, setLettuce] = useState(0);
  const [tomato, setTomato] = useState(0);
  const [beef, setBeef] = useState(0);
  const [cheese, setCheese] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [instructions, setInstructions] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonText, setButtonText] = useState("ORDER");
  const [order, setOrder] = useState(false);

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
    let isValid = true;

    if (lettuce === 0) {
      tempErrors.lettuce = true;
      isValid = false;
    }
    if (tomato === 0) {
      tempErrors.tomato = true;
      isValid = false;
    }
    if (beef === 0) {
      tempErrors.beef = true;
      isValid = false;
    }
    if (cheese === 0) {
      tempErrors.cheese = true;
      isValid = false;
    }
    if (name.length == 0) {
      tempErrors.name = true,
        isValid = false;
    }
    if (phone.length == 0) {
      tempErrors.phone = true,
        isValid = false;
    }
    if (address.length == 0) {
      tempErrors.address = true,
        isValid = false;
    }
    if (zipCode.length !== 5) {
      tempErrors.zipCode = true,
        isValid = false;
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
          name: name,
          phone: phone,
          address: address,
          zipCode: zipCode,
          instructions: instructions
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
        setName("");
        setPhone("");
        setAddress("");
        setZipCode("");
        setInstructions("");
        setOrder(false);
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
      setName("");
      setPhone("");
      setAddress("");
      setZipCode("");
      setInstructions("");
      setOrder(false);
    }
    console.log(lettuce, tomato, beef, cheese, name, phone, address, zipCode, instructions);
  };

  return (
    <div className='bg-stone-200'>
      <main className={styles.main}>
        <div className='burgerContainer'>
          <div className='burgerTop'></div>
          <div>{PlaceIngredient(lettuce, tomato, beef, cheese)}</div>
          <div className='burgerBottom'></div>
        </div>
        <div>
          {order == false && (
            <form>
              <div className='text-black grid-rows-5 gap-1 border-2 border-amber-900 bg-amber-100 p-4 rounded-lg'>
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
              <div className="text-left">
                {success && (
                  <p className="text-green-500 font-semibold text-sm my-2">
                    Your order is set! We 'll get you that burger in no time!'
                  </p>
                )}
                {errorMessage && (
                  <p className="text-red-500">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
              <div className='grid place-items-end'>
                <button className='text-center bg-amber-900 border border-red-400 m-2 p-2 rounded' onClick={() => setOrder(!order)}>Order&rarr;</button>
              </div>
            </form>
          )}
        </div>
        <div>{order == true && (
          <form onSubmit={onSubmit}>
            <div className='text-black grid-rows-10 gap-1 border-2 border-amber-900 bg-amber-100 p-4 rounded-lg mx-5'>
            <div>
              <h2 className='text-center'>Your Burger</h2>
              <div className='grid grid-cols-2 p-2 text-center'>
                <label>Lettuce</label>
                <p>{lettuce}</p>
                {error.lettuce && (<p className='text-red-500'>Place at least one piece</p>)}
              </div>
              <div className='grid grid-cols-2 p-2 text-center'>
                <label>Tomato</label>
                <p>{tomato}</p>
                {error.tomato && (<p className='text-red-500'>Place at least one piece</p>)}
              </div>
              <div className='grid grid-cols-2 p-2 text-center'>
                <label>Beef</label>
                <p>{beef}</p>
                {error.beef && (<p className='text-red-500'>Place at least one piece</p>)}
              </div>
              <div className='grid grid-cols-2 p-2 text-center'>
                <label>Cheese</label>
                <p>{cheese}</p>
                {error.cheese && (<p className='text-red-500'>Place at least one piece</p>)}
              </div>
              <h2 className='text-center'>Order Info</h2>
              <div className='grid grid-cols-2 text-center px-2 py-1'>
                <label>Name</label>
                <input className='text-white' onChange={(e) => setName(e.target.value)} />
              </div>
              <div className='grid grid-cols-2 text-center px-2 py-1'>
                <label>Phone</label>
                <input className='text-white' onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className='grid grid-cols-2 text-center px-2 py-1'>
                <label>Address</label>
                <input className='text-white' onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className='grid grid-cols-2 text-center px-2 py-1'>
                <label>Zip Code</label>
                <input className='text-white' onChange={(e) => setZipCode(e.target.value)} />
              </div>
              {error.zipCode && (<p className='text-red-500'>Zip code is not valid</p>)}
              <div className='grid grid-rows-2 text-center px-2 py-1'>
                <label>Instructions</label>
                <textarea className='text-white' onChange={(e) => setInstructions(e.target.value)} />
              </div>
            </div>
            </div>
            <div className='grid place-items-center'>
              <button className='text-center bg-amber-900 border border-amber-500 m-2 p-2 rounded'>{buttonText}</button>
            </div>
            <div>
              <button className='text-center bg-amber-900 border border-amber-500 m-2 p-2 rounded' onClick={() => setOrder(!order)}>&larr;Back to Ingredients</button>
            </div>
          </form>)}</div>
      </main>
    </div>
  )
}
