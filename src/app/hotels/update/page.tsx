"use client"

import { useState } from 'react';

const UpdateHotel = () => {
  const [hotelDetails, setHotelDetails] = useState({
    hotel_name: '',
    email: '',
    password: '',
    address: '',
    speciality: '',
    ratings: 0,
    contacts: '',
    website: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setHotelDetails({
      ...hotelDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const specialties = hotelDetails.speciality.split(',').map(s => s.trim());
    const contacts = hotelDetails.contacts.split(',').map(c => c.trim());
    
    const updatedDetails = {
      ...hotelDetails,
      speciality: specialties,
      contacts: contacts,
    };

    try {
      const response = await fetch('http://192.168.1.206:3000/api/eatofy/hotels/operations/update/details', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDetails),
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        console.error('Update failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-200 text-black p-4">
      <h1 className="text-2xl font-bold mb-4">Update Hotel Details</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="hotel_name" className="block text-sm font-medium text-gray-700">
            Hotel Name
          </label>
          <input
            type="text"
            name="hotel_name"
            id="hotel_name"
            value={hotelDetails.hotel_name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={hotelDetails.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={hotelDetails.password}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            name="address"
            id="address"
            value={hotelDetails.address}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="speciality" className="block text-sm font-medium text-gray-700">
            Speciality (comma separated)
          </label>
          <input
            type="text"
            name="speciality"
            id="speciality"
            value={hotelDetails.speciality}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="ratings" className="block text-sm font-medium text-gray-700">
            Ratings
          </label>
          <input
            type="number"
            name="ratings"
            id="ratings"
            value={hotelDetails.ratings}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="5"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="contacts" className="block text-sm font-medium text-gray-700">
            Contacts (comma separated)
          </label>
          <input
            type="text"
            name="contacts"
            id="contacts"
            value={hotelDetails.contacts}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700">
            Website
          </label>
          <input
            type="url"
            name="website"
            id="website"
            value={hotelDetails.website}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Update Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateHotel;
