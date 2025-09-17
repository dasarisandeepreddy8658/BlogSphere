import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';

import { validateRegisterForm } from '../../validators/auth/registerValidator';
import InputComponent from '../ui/InputComponent';
import Logo from '../Logo';

const react_base_url = import.meta.env.VITE_API_BASE_URL;

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    address: '',
    gender: '',
    dob: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Common base styles for input fields
  const inputBaseClasses = 'block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6';
  const inputErrorClasses = 'ring-red-500 focus:ring-red-500';

  // Handle input change
  const handleChange = (e) => {
    setErrors({});
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateRegisterForm(formData);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const response = await axios.post(`${react_base_url}/users/register`, formData);
      console.log('User created', response.data);
      // Optional: Delay for user to see success state before redirecting
      setTimeout(() => {
        navigate('/login', {
          state: { message: 'You have been registered. Login now.' },
        });
      }, 1500); // Reduced timeout for better UX
    } catch (error) {
      console.log(error);
      setErrors({ server: error.response?.data?.message || 'An unexpected error occurred.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full bg-white p-8 rounded-xl shadow-lg'>
      {/* Branding */}
      <div className='flex justify-center mb-6'>
        <Link to='/'>
          <Logo />
        </Link>
      </div>

      {/* Header */}
      <div className='text-center mb-8'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Create an Account</h2>
        <p className='mt-2 text-sm text-gray-600'>Join us and start your journey today.</p>
      </div>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-6'>
        <InputComponent
          type='text'
          name='name'
          id='name'
          label='Full Name'
          value={formData.name}
          onChange={handleChange}
          className={`${inputBaseClasses} ${errors.name ? inputErrorClasses : ''}`}
          error={errors.name}
          required={true}
        />

        {/* Responsive Grid for Gender and DOB */}
        <div className='grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2'>
          <div>
            <label htmlFor='gender' className='block text-sm font-medium leading-6 text-gray-900'>
              Gender <span className='text-red-500'>*</span>
            </label>
            <div className='mt-2'>
              <select
                id='gender'
                name='gender'
                value={formData.gender}
                onChange={handleChange}
                className={`${inputBaseClasses} ${errors.gender ? inputErrorClasses : ''}`}
              >
                <option value=''>Select Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </select>
            </div>
            {errors.gender && <p className='mt-2 text-xs text-red-600'>{errors.gender}</p>}
          </div>

          <div>
            <label htmlFor='dob' className='block text-sm font-medium leading-6 text-gray-900'>
              Date of Birth <span className='text-red-500'>*</span>
            </label>
            <div className='mt-2'>
              <input
                type='date'
                id='dob'
                name='dob'
                value={formData.dob}
                onChange={handleChange}
                min='1950-01-01'
                max={new Date().toISOString().split('T')[0]}
                className={`${inputBaseClasses} ${errors.dob ? inputErrorClasses : ''}`}
              />
            </div>
            {errors.dob && <p className='mt-2 text-xs text-red-600'>{errors.dob}</p>}
          </div>
        </div>

        <InputComponent
          type='text'
          name='address'
          id='address'
          label='Address'
          value={formData.address}
          onChange={handleChange}
          className={`${inputBaseClasses} ${errors.address ? inputErrorClasses : ''}`}
          error={errors.address}
          required={true}
        />
        <InputComponent
          type='email'
          name='email'
          id='email'
          label='Email Address'
          value={formData.email}
          onChange={handleChange}
          className={`${inputBaseClasses} ${errors.email ? inputErrorClasses : ''}`}
          error={errors.email}
          required={true}
        />
        <InputComponent
          type='text'
          name='username'
          id='username'
          label='Username'
          value={formData.username}
          onChange={handleChange}
          className={`${inputBaseClasses} ${errors.username ? inputErrorClasses : ''}`}
          error={errors.username}
          required={true}
        />
        <InputComponent
          type='password'
          name='password'
          id='password'
          label='Password'
          value={formData.password}
          onChange={handleChange}
          className={`${inputBaseClasses} ${errors.password ? inputErrorClasses : ''}`}
          error={errors.password}
          required={true}
        />
        
        {errors.server && (
            <p className='text-sm text-red-600 bg-red-50 p-3 rounded-md'>{errors.server}</p>
        )}

        {/* Submit Button */}
        <div>
          <button
            type='submit'
            disabled={isLoading}
            className='flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed'
          >
            {isLoading ? (
              <TailSpin visible={true} height='20' width='20' color='#FFF' radius='1' />
            ) : (
              'Create Account'
            )}
          </button>
        </div>
      </form>

      {/* Footer Link */}
      <p className='mt-8 text-center text-sm text-gray-500'>
        Already have an account?{' '}
        <Link to='/login' className='font-semibold leading-6 text-blue-600 hover:text-blue-500 hover:underline'>
          Login here
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;