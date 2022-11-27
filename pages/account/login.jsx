import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Link from 'next/link';
import { userService, alertService } from '../../services';

import styles from '../../styles/Home.module.css'

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
    <div className={styles.container}>
      <div className='bg-amber-100'>
        <h1 className='text-center p-2 text-3xl bg-amber-700'>Burger Builder App</h1>
        <div className='grid place-items-center text-center grid-row-7 py-3 px-8 gap-3'>
          <form className='grid grid-row-3 py-3 gap-3' onSubmit={handleSubmit(onSubmit)}>
            <label className='text-black font-bold'>Name</label>
            <input name="name" type="text" {...register('name')} />
            <div>{errors.username?.message}</div>
            <label className='text-black font-bold'>Password</label>
            <input name="password" type="password" {...register('password')} />
            <div>{errors.username?.message}</div>
            <div className='grid  grid-cols-2 place-items-center'>
              <button className="border-2 border-black p-2 font-bold text-black" disabled={formState.isSubmitting}>Login</button>
              <Link href="/account/register" className="text-black font-bold hover:text-orange-600">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}