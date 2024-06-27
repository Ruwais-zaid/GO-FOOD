import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
const Login = () => {
  let navigate=useNavigate()
  const [cred, setCred] = useState({ email: "", password: ""});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCred({ ...cred, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({email:cred.email,password:cred.password}))
    try {
      // Send login request to server
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        credentials:"include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: cred.email, password: cred.password }), // Only send email and password
      });

      // Check if the response is not ok
      if (!response.ok) {
        const errorData = await response.json(); // Parse error response
        console.error('Error:', errorData);
        alert(`Login failed: ${errorData.message || 'Invalid credentials'}`);
        return;
      }

      // Parse the successful response
      const data= await response.json()
      const authToken = data.token;
      
      // Store the token in local storage
      localStorage.setItem('authToken', authToken);
      console.log('Auth token stored:', authToken);

      navigate('/')

    } catch (error) {
      console.error('Error:', error);
      alert("Login failed. Please try again later.");
    }
  };

  return (
    <div>
      <section className="bg-green-600">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-3xl font-bold text-gray-900 dark:text-white">
            GoFood
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input
                    type="email"
                    name="email"
                    value={cred.email}
                    onChange={handleChange}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={cred.password}
                    onChange={handleChange}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up here</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
