"use client"
import { ApiHost } from '@/constants/url_consts';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Auth() {

  const route = useRouter();
  const [isRegister, setIsRegister] = useState(true);
  const [passwordVisiable, setPasswordVisiable] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    old_password: '',
    new_password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData.email," ",formData.email)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let url;
    let payload;
    let method;

    if (isForgotPassword) {
      url = `${ApiHost}/api/eatofy/auth/forgot_password`;
      method = 'PUT';
      payload = {
        email: formData.email,
        old_password: formData.old_password,
        new_password: formData.new_password,
      };
    } else if (isRegister) {
      url = `${ApiHost}/api/eatofy/auth/register`;
      method = 'POST';
      payload = formData;
    } else {
      url = `${ApiHost}/api/eatofy/auth/login`;
      method = 'POST';
      payload = formData;
      console.log("I'm at Login")
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json(); // Assuming the server sends back JSON data

      if (data.returncode === 200) {
        setMessage(
          isRegister
            ? 'Registration successful!'
            : isForgotPassword
              ? 'Password reset successful!'
              : 'Login successful!'
        );
        console.log(data);
        route.push('/eatofy/dashboard');
      } else {
        setMessage(
          isRegister
            ? 'Registration failed. Please try again.'
            : isForgotPassword
              ? 'Password reset failed. Please try again.'
              : 'Login failed. Please try again.'
        );
      }
    } catch (error) {
      setMessage(
        isRegister
          ? 'Registration failed. Please try again.'
          : isForgotPassword
            ? 'Password reset failed. Please try again.'
            : 'Login failed. Please try again.'
      );
    }
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setIsForgotPassword(false);
    setFormData({
      username: '',
      email: '',
      password: '',
      old_password: '',
      new_password: '',
    });
    setMessage('');
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    setFormData({
      username: '',
      email: '',
      password: '',
      old_password: '',
      new_password: '',
    });
    setMessage('');
  };

  function toggleEye(){
    setPasswordVisiable(!passwordVisiable);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className=" p-8 rounded  w-full max-w-md">
        <h2 className="text-5xl font-bold mb-6 text-gray-900">
          {isForgotPassword ? 'Forgot Password' : isRegister ? 'Register' : 'Login'}
        </h2>
        <form onSubmit={handleSubmit}>
          {isRegister && !isForgotPassword && (
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 text-black border rounded"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-black">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 text-black py-2 border rounded"
              required
            />
          </div>
          {!isForgotPassword && (
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <div className="inline-flex items-center w-full border">
                <input
                  type={passwordVisiable ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-black border rounded focus:outline-none"
                  required
                >
                </input>
                <button type='button' onClick={toggleEye} className="w-[50px] h-[40px] inline-flex items-center justify-center">
                  {passwordVisiable ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
          )}
          {isForgotPassword && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Old Password</label>
                <input
                  type={passwordVisiable ? 'text' : 'password'}
                  name="old_password"
                  value={formData.old_password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-black border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">New Password</label>
                <input
                  type={passwordVisiable ? 'text' : 'password'}
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-black border rounded"
                  required
                />
              </div>
            </>
          )}
          <button type="submit" className="w-full font-bold bg-red-500 rounded-lg text-white py-2 px-4 hover:bg-red-600">
            {isForgotPassword ? 'Reset Password' : isRegister ? 'Register' : 'Login'}
          </button>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </form>
        {!isForgotPassword && (
          <button
            onClick={toggleForm}
            className="w-full mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            {isRegister ? 'Switch to Login' : 'Switch to Register'}
          </button>
        )}
        {!isForgotPassword && (
          <button
            onClick={toggleForgotPassword}
            className="w-full mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Forgot Password
          </button>
        )}
        {isForgotPassword && (
          <button
            onClick={toggleForgotPassword}
            className="w-full mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Back to {isRegister ? 'Register' : 'Login'}
          </button>
        )}
      </div>
    </div>
  );
}
