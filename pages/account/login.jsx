import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Navbar from '../components/navbar/navbarBody';

import Link from 'next/link';
import { userService, alertService } from '../../services';

export default function Login() {
  const router = useRouter();

  // form validation rules 
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    password: Yup.string().required('Password is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ name, password }) {
    return userService.login(name, password)
      .then(() => {
        // get return url from query parameters or default to '/'
        const returnUrl = router.query.returnUrl || '/';
        router.push(returnUrl);
      })
      .catch(alertService.error);
  }

  return (
    <div>
      <Navbar />
      <div className='p-4 bg-blue-600'>Please complete the following registration form:</div>
      <div className='grid grid-row-7 py-3 px-8 gap-3'>
        <form className='grid grid-row-7 py-3 px-8 gap-3' onSubmit={handleSubmit(onSubmit)}>
          <label>Name</label>
          <input name="name" type="text" {...register('name')} />
          <div>{errors.username?.message}</div>
          <label>Password</label>
          <input name="password" type="password" {...register('password')} />
          <div>{errors.username?.message}</div>
          <div className='grid  grid-cols-2 place-items-center'>
            <button className="border-2 border-white p-2" disabled={formState.isSubmitting}>Login</button>
            <Link href="/account/register" className="text-blue-500 hover:text-orange-600">Register</Link>
          </div>
        </form>
      </div>
    </div>
  )
}