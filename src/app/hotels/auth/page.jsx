"use client"

import { ApiHost } from '@/constants/url_consts';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const HotelAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [waiter, setwaiter] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [isfailed, setFailed] = useState(false);
  const timeout = 3000;
  const route = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${ApiHost}/api/hotel/authentication/sign_in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.returncode === 200) {

        // Save token to sessionStorage
        sessionStorage.setItem('jwtToken', data.output[1].token);
        localStorage.setItem('hotel_id', data.output[0].result[0].HotelId);
        // Save user data to sessionStorage
        setMessage(data.message);
        setIsLogged(true);
        setFailed(false);
        const userData = data.output[0].result[0];
        const id = JSON.stringify(data.output[0].result[0].id);
        setwaiter(id);
        sessionStorage.setItem('userData', JSON.stringify(userData));
        setTimeout(() => {
          setIsLogged(false);
        }, timeout);

        if (userData.Role === role) {
          switch (role) {
            case 'Owner':
              sessionStorage.setItem('waiter_id', JSON.parse(id));
              route.push('/hotels/dashboard');
              break;

            case 'Backoffice':
              route.push('/hotels/backoffice');
              break;

            case 'Waiter':
              sessionStorage.setItem('waiter_id', JSON.parse(id));
              route.push('/hotels/home');
              break;

            default:
              setIsLogged(true);
              setMessage('Please select the role');
              setTimeout(() => {
                setIsLogged(false);
              }, timeout);
              break;
          }
          sessionStorage.setItem('role', role);
          localStorage.setItem('role', role);
        } else {
          alert("The account you entered is not Authorized for the role you selected, \n Please select proper role for account");
        }

      } else {
        setMessage(data.message);
        setIsLogged(true);
        setFailed(true);
        setTimeout(() => {
          setIsLogged(false);
        }, timeout);
        sessionStorage.clear();
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleChange = (e) => {
    setRole(e.target.value);
  }

  // useEffect(() => {
  //   if (localStorage.getItem('hotel_id') !== null) {
  //     alert('Hotel Id exist Logging you in');
  //     if (sessionStorage.getItem('waiter_id') === null) {
  //       sessionStorage.setItem('waiter_id', waiter);
  //     }
  //     if (localStorage.getItem('role') !== null) {
  //       const Role = localStorage.getItem('role');
  //       sessionStorage.setItem('role', Role);
  //     }
  //     route.push('/hotels/dashboard')
  //   }
  // }, []);

  return (
    <>
      <div
        className="w-full h-dvh flex flex-col items-center justify-center gap-4"
      >
        <div
          style={{ backgroundImage: 'url(/dish1.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundOrigin: 'inherit' }}
          className="w-full h-full fixed top-0 left-0 z-[-50]"
        ></div>
        <div
          className='w-full h-full bg-black bg-opacity-60 fixed top-0 left-0 z-[-20]'
        ></div>
        {
          isLogged ? (
            <div className={`w-1/4 h-[90px] border-t-[8px] rounded-lg inline-flex justify-center items-center ${isfailed ? 'bg-red-200 text-red-500 border-red-500' : 'bg-green-200 text-green-500 border-green-500'}`}>
              <div className="text-xl font-bold">{message}</div>
            </div>
          )
            :
            []
        }
        <div className="bg-black text-white p-8 rounded-lg shadow-lg lg:w-1/3 w-full">
          <div className="flex justify-center mb-6">
            <img src="/logo1.png" width={200} alt="EATOFY Logo" />
          </div>
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-card-foreground mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full p-3 rounded bg-input text-black border border-border focus:outline-none focus:ring focus:ring-primary"
                type="email"
                id="email"
                placeholder="Enter Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-card-foreground mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full p-3 rounded bg-input text-black border border-border focus:outline-none focus:ring focus:ring-primary"
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-zinc-500"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-card-foreground mb-2" htmlFor="password">
                Select your role
              </label>
              <select
                id="role"
                name="roleselector"
                className="w-full rounded text-black"
                value={role}
                onChange={handleChange}
              >
                <option value="">--Select--</option>
                <option value="Owner">Owner</option>
                <option value="Backoffice">Backoffice</option>
                <option value="Waiter">Waiter</option>
              </select>
            </div>
            {/* Login Button */}
            <button className="w-full p-3 mt-4 bg-red-500 text-primary-foreground rounded hover:bg-primary/80">
              Login
            </button>
          </form>
          {/* Additional Info */}
          <div className="mt-6 text-center">
            <h2 className="text-lg font-semibold text-card-foreground">Welcome To Eatofy</h2>
            <p className="text-muted-foreground">From ordering to paying, that&apos;s all contactless</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelAuth;

