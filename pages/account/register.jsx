import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userService, alertService } from 'services';

import styles from "../../styles/Home.module.css"
import Link from 'next/link';

export default function Register() {
  const router = useRouter();

  // form validation rules 
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('name is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, getValues, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(user) {
    return userService.register(user)
      .then(() => {
        alertService.success('Registration successful', { keepAfterRouteChange: true });
        router.push('login');
      })
      .catch(alertService.error);
  }

  return (
    <div className={styles.container}>
      <div className='bg-amber-100'>
        <h1 className='text-center p-2 text-3xl bg-amber-700'>Burger Builder App</h1>
        <div>
          <div className='p-4 bg-amber-300 text-black font-bold'>Please complete the following registration form for a superior burger experience:</div>
          <form className='grid place-items-center grid-row-7 py-3 px-8 gap-3' onSubmit={handleSubmit(onSubmit)}>
            <label className='text-black font-bold'>Name</label>
            <input name="name" type="text" {...register('name')} />
            <label className='text-black font-bold'>Password</label>
            <input name="Password" type="password" {...register('password')} />
            <div className='grid grid-cols-2 place-items-center'>
              <button className="border-2 border-black p-2 text-black font-bold" disabled={formState.isSubmitting}>REGISTER</button>
              <Link href={"/account/login"} className="text-black font-bold hover:text-orange-600">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}