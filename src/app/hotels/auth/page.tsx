"use client"
import { ApiHost } from '@/constants/url_consts';
import { useRouter } from 'next/navigation';
import React, { useState, FormEvent } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Widget: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [role, setRole] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isfailed, setFailed] = useState<boolean>(false);
  const timeout = 3000;
  const route = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        sessionStorage.setItem('hotel_id', data.output[0].result[0].HotelId);
        // Save user data to sessionStorage
        setMessage(data.message);
        setIsLogged(true);
        setFailed(false);
        const userData = data.output[0].result[0];
        sessionStorage.setItem('userData', JSON.stringify(userData));
        console.log("user info");
        console.log('Login successful:', data);
        setTimeout(() => {
          setIsLogged(false);
        }, timeout);

        switch (role) {
          case 'owner':
            route.push('/hotels/dashboard');
            break;

          case 'backoffice':
            route.push('/hotels/backoffice');
            break;

          case 'waiter':
            const id = JSON.stringify(data.output[0].result[0].id);
            sessionStorage.setItem('waiter_id',JSON.parse(id));
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
        sessionStorage.setItem('role',role);

      } else {
        console.error('Login failed:', response.statusText);
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

  const handleChange = (e: any) => {
    setRole(e.target.value);
  }

  console.log(role);

  return (
    <>
      <div
        style={{ backgroundImage: 'url(/bgimg.jpg)', backgroundSize: 'cover', backgroundOrigin: 'inherit' }}
        className="h-dvh flex flex-col items-center justify-center gap-4"
      >
        {
          isLogged ? (
            <div className={`w-1/4 h-[90px] border-t-[8px] rounded-lg inline-flex justify-center items-center ${isfailed ? 'bg-red-200 text-red-500 border-red-500' : 'bg-green-200 text-green-500 border-green-500'}`}>
              <div className="text-xl font-bold">{message}</div>
            </div>
          )
            :
            []
        }
        <div className=" bg-black text-white p-8 rounded-lg shadow-lg lg:w-1/3 w-1/2">
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
                <option value="owner">Owner</option>
                <option value="backoffice">Backoffice</option>
                <option value="waiter">waiter</option>
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

export default Widget;

