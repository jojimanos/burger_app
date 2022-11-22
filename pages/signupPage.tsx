import axios from 'axios'
import { useEffect, useState } from 'react';
import { isAuth } from '../helpers/auth'
import Router from 'next/router';
import Navbar from './components/navbar/navbar';

export default function SignupPage() {

  const [name, setName] = useState([]);
  const [address, setAddress] = useState([]);
  const [postalCode, setPostalCode] = useState([]);
  const [birthDate, setBirthDate] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [buttonText, setButtonText] = useState("REGISTER");
  const [success, setSuccess] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    isAuth() && Router.push("/")
  })

  const onSubmit = (e: any) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/register', {
      name: name, address: address, postalCode: postalCode,
      birthDate: birthDate, email: email, password: password
    })
      .then(response => {
        setName([]), setAddress([]),
          setBirthDate([]), setPostalCode([]),
          setEmail([]), setPassword([]),
          setButtonText("REGISTERING"),
          setSuccess(response.data.message)
      })
      .catch(error => {
        setError(error.response.data);
        setButtonText('REGISTER')
      });

  }

  return (
    <div>
      <Navbar />
      <p>{success && success || error && error}</p>
      <div className='p-4 bg-blue-600'>Please complete the following registration form:</div>
      <form className='grid grid-row-7 py-3 px-8 gap-3' onSubmit={onSubmit}>
        <input placeholder="Name" value={name} onChange={(e: any) => { setName(e.target.value) }} />
        <input placeholder="Address" value={address} onChange={(e: any) => { setAddress(e.target.value) }} />
        <input placeholder="Postal Code" value={postalCode} onChange={(e: any) => { setPostalCode(e.target.value) }} />
        <input placeholder="Birth Date" value={birthDate} onChange={(e: any) => { setBirthDate(e.target.value) }} />
        <input placeholder="email" value={email} onChange={(e: any) => { setEmail(e.target.value) }} />
        <input placeholder="Password" type="password" value={password} onChange={(e: any) => { setPassword(e.target.value) }} />
        <div className='grid place-items-center'>
        <button className="border-2 border-white p-2">{buttonText}</button>
        </div>
      </form>
    </div>
  )
}