import axios from 'axios'
import { useEffect, useState } from 'react';
import { isAuth } from '../helpers/auth'
import Router from 'next/router';
import Navbar from './components/navbar/navbar';

export default function SignupPage() {

  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [buttonText, setButtonText] = useState("LOGIN");
  const [success, setSuccess] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    isAuth() && Router.push("/")
  })

  const onSubmit = (e: any) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/login', {
      email: email, password: password
    })
      .then(response => {
        setEmail([]), setPassword([]),
          setButtonText("LOGING IN"),
          setSuccess(response.data.message)
      })
      .catch(error => {
        setError(error.response.data);
        setButtonText('LOGIN')
      });

  }

  return (
    <div>
      <Navbar />
      <p>{success && success || error && error}</p>
      <div className='p-4 bg-blue-600'>Please complete the following registration form:</div>
      <div className='grid grid-row-7 py-3 px-8 gap-3'>
        <form className='grid grid-row-7 py-3 px-8 gap-3' onSubmit={onSubmit}>
          <input placeholder="email" value={email} onChange={(e: any) => { setEmail(e.target.value) }} />
          <input placeholder="password" type="password" value={password} onChange={(e: any) => { setPassword(e.target.value) }} />
          <div className='grid place-items-center'>
            <button className="border-2 border-white p-2">{buttonText}</button>
          </div>
        </form>
      </div>
    </div>
  )
}