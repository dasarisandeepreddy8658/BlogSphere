import RegisterForm from '../components/auth/RegisterForm';
import { Helmet } from 'react-helmet';

const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>Register | Blogshpere</title>
      </Helmet>
      
      {/* Main container: Centers the form vertically and horizontally on a light gray background */}
      <div className='flex min-h-screen w-full items-center justify-center bg-gray-50 p-4'>

        {/* Form Wrapper: Sets a max-width for readability on larger screens */}
        <div className='w-full max-w-md'>
          <RegisterForm />
        </div>
        
      </div>
    </>
  );
};

export default RegisterPage;