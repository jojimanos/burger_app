import Navbar from '../components/navbar/navbarBody';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userService, alertService } from 'services';

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
    const { register, handleSubmit, formState } = useForm(formOptions);
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
    <div>
      <Navbar />
      <div className='p-4 bg-blue-600'>Please complete the following registration form:</div>
      <form className='grid grid-row-7 py-3 px-8 gap-3' onSubmit={handleSubmit(onSubmit)}>
        <input name="name" type="text" {...register('name')} />
        <input name="Password" type="password" {...register('password')} />
        <div className='grid place-items-center'>
          <button className="border-2 border-white p-2" disabled={formState.isSubmitting}>REGISTER</button>
        </div>
      </form>
    </div>
  )
}