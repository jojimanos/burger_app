import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link } from 'components';
import { userService, alertService } from 'services';

export { AddEdit };

function AddEdit(props) {
    const user = props?.user;
    const isAddMode = !user;
    const router = useRouter();
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            .concat(isAddMode ? Yup.string().required('Password is required') : null)
            .min(6, 'Password must be at least 6 characters')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (!isAddMode) {
        formOptions.defaultValues = props.user;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        return isAddMode
            ? createUser(data)
            : updateUser(user.id, data);
    }

    function createUser(data) {
        return userService.register(data)
            .then(() => {
                alertService.success('User added', { keepAfterRouteChange: true });
                router.push('.');
            })
            .catch(alertService.error);
    }

    function updateUser(id, data) {
        return userService.update(id, data)
            .then(() => {
                alertService.success('User updated', { keepAfterRouteChange: true });
                router.push('..');
            })
            .catch(alertService.error);
    }

return (
    <div>
      <Navbar />
      <p>{success && success || error && error}</p>
      <div className='p-4 bg-blue-600'>Please complete the following registration form:</div>
      <form className='grid grid-row-7 py-3 px-8 gap-3' onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="name" {...register('name')} />
        <div>{errors.name?.message}</div>
        <input placeholder="Password" type="password" {...register('lastName')} />
        <div>{errors.password?.message}</div>
        <div className='grid place-items-center'>
            <button type="submit" disabled={formState.isSubmitting}>Save</button>
          <button className="border-2 border-white p-2">{buttonText}</button>
          <Link href="users/">Cancel</Link>
        </div>
      </form>
    </div>
  )
}