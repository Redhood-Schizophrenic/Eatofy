"use client"

import HotelSideNav from '@/components/SideNavHotel';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Switch from 'react-switch';
import { throws } from 'assert';
import { ApiHost } from '@/constants/url_consts';
import Link from 'next/link';

const EatofyApp = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchBar, setsearchBar] = useState('');
  const [ThemeMode, setThemeMode] = useState('Light');
  const [hotel_id, sethotel_id] = useState('');
  const [isOpen, setisOpen] = useState(false);
  const [message, setmessage] = useState('');
  const search = useRef();
  const darkMode = useRef();
  const [parent, enableAnimations] = useAutoAnimate()
  //booleans for on and off
  const [isDarkTheme, setisDarkTheme] = useState(false);
  const [NotificationON, setNotificationON] = useState(false);
  //booleans for dropdown
  const [isVat, setisVat] = useState(false);
  const [isGst, setisGst] = useState(false);
  const [isEtoCoin, setisEtoCoin] = useState(false);
  // Eatocoins Variables
  const [isEtocoinOn, setisEtocoinOn] = useState(false);
  const [credit_limit_amt, setCredit_limit_amt] = useState('');
  const [credit_limit_rate, setCredit_limit_rate] = useState('');
  const [redeem_limit_amt, setRedeem_limit_amt] = useState('');
  const [redeem_limit_rate, setRedeem_limit_rate] = useState('');
  // GST variables
  const [isGstOn, setisGstOn] = useState(false);
  const [GstInput, setGstInput] = useState('');
  // Vat variables
  const [isVatOn, setisVatOn] = useState(false);
  const [VatInput, setVatInput] = useState('');


  function handleDarkMode() {
    setisDarkTheme(!isDarkTheme);
    handledark();
  }

  function handledark() {
  }

  async function CheckAndLoadSettings() {
    try {

      // Vat
      const vat = await fetch(`${ApiHost}/api/hotel/settings/vat/read`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'hotel_id': hotel_id,
        }),
      });

      if (vat.ok) {
        const vat_settings = await vat.json();
        const vat_visibility = vat_settings?.output[0]?.Visibility || false;
        const vat_percent = vat_settings?.output[0]?.VATPercent || 0;
        setVatInput(vat_percent);
        setisVatOn(vat_visibility);
      }

      // Gst
      const gst = await fetch(`${ApiHost}/api/hotel/settings/gst/read`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'hotel_id': hotel_id,
        }),
      });

      if (gst.ok) {
        const gst_settings = await gst.json();
        const gst_visibility = gst_settings?.output[0]?.Visibility || false;
        const gstpercent = gst_settings?.output[0]?.GSTPercent || 0;
        setGstInput(gstpercent);
        setisGstOn(gst_visibility);
      }

      // Eatocoins
      const eatocoins = await fetch(`${ApiHost}/api/hotel/settings/eatocoins/read`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'hotel_id': hotel_id,
        }),
      });

      if (eatocoins.ok) {
        const eatocoins_settings = await eatocoins.json();
        const eatocoins_visibility = eatocoins_settings?.output[0]?.Visibility || false;
        const credit_amt = eatocoins_settings?.output[0]?.CreditLimitAmt || 0;
        const credit_rate = eatocoins_settings?.output[0]?.CreditLimitPercent || 0;
        const redeem_amt = eatocoins_settings?.output[0]?.RedeemLimitAmount || 0;
        const redeem_rate = eatocoins_settings?.output[0]?.RedeemLimitPercent || 0;
        setCredit_limit_amt(credit_amt);
        setCredit_limit_rate(credit_rate);
        setRedeem_limit_amt(redeem_amt);
        setRedeem_limit_rate(redeem_rate);
        setisEtocoinOn(eatocoins_visibility);
      }

      // if (localStorage.getItem('darkmode')) {
      //   setisDarkTheme(true);
      // }
      // if (localStorage.getItem('isvaton')) {
      //   setisVatOn(true);
      // }
      // if (localStorage.getItem('isgston')) {
      //   setisGstOn(true);
      // }
      // if (localStorage.getItem('iseatocoinson')) {
      //   setisEtocoinOn(true);
      // }
    } catch (e) {
      throw console.error(e);
    }
  }

  async function handleSettingsDarkMode() {
    try {
      const result = await fetch(`${ApiHost}/api/hotel/settings/dark_mode/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'hotel_id': hotel_id,
          'mode': isDarkTheme
        }),
      });

      if (result.ok) {
        const data = await result.json();
        console.log(data);
        setmessage('Dark mode');
        setTimeout(() => {
          setNotificationON(true);
        }, 800);
        setNotificationON(false);
      }
    } catch (e) {
      throw console.error(e);
    }
  }

  async function handleSettingsVat() {
    try {
      const result = await fetch(`${ApiHost}/api/hotel/settings/vat/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'hotel_id': hotel_id,
          'visibility': isVatOn,
          'vat_percent': parseInt(VatInput)
        }),
      });

      if (result.ok) {
        const data = await result.json();
        console.log(data);
        setmessage('Vat');
        setTimeout(() => {
          setNotificationON(true);
        }, 2000);
        setNotificationON(false);
      }
    } catch (e) {
      throw console.error(e);
    }
  }

  async function handleSettingsGst() {
    try {
      const result = await fetch(`${ApiHost}/api/hotel/settings/gst/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'hotel_id': hotel_id,
          'visibility': isGstOn,
          'gst_percent': parseInt(GstInput)
        }),
      });

      if (result.ok) {
        const data = await result.json();
        console.log(data);
        setmessage('Gst');
        setTimeout(() => {
          setNotificationON(true);
        }, 2000);
        setNotificationON(false);
      }
    } catch (e) {
      throw console.error(e);
    }
  }

  async function handleSettingsEatocoins() {
    try {

      const result = await fetch(`${ApiHost}/api/hotel/settings/eatocoins/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'hotel_id': hotel_id,
          'visibility': isEtocoinOn,
          "credit_limit_amt": parseFloat(credit_limit_amt) || 0,
          "credit_limit_percent": parseFloat(credit_limit_rate) || 0,
          "redeem_limit_amt": parseFloat(redeem_limit_amt) || 0,
          "redeem_limit_percent": parseFloat(redeem_limit_rate) || 0,
          "rate": 10
        }),
      });

      if (result.ok) {
        const data = await result.json();
        console.log(data);
        setmessage('Eatocoins');
        setTimeout(() => {
          setNotificationON(true);
        }, 2000);
        setNotificationON(false);
      }
    } catch (e) {
      throw console.error(e);
    }
  }

  useEffect(() => {
    sethotel_id(localStorage.getItem('hotel_id'));
    if (hotel_id) {
      CheckAndLoadSettings();
    }

  }, [hotel_id])

  useEffect(() => {
    if (hotel_id) {
      if (search.current) {
        search.current.focus();
      }
    }
  }, [hotel_id, search])


  return (
    <>
      <HotelSideNav />
      <div ref={parent} className="h-screen flex items-center justify-center ml-[70px]">
        <div ref={darkMode} className="w-screen h-screen p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-start items-center mb-6">
            <h1 className="bg-gradient-to-r from-red-600 via-orange-500 to-red-400 inline-block text-transparent bg-clip-text text-3xl uppercase font-bold mb-4">Settings</h1>
          </div>
          <div ref={parent} className="flex flex-col gap-8">
            {/*<div ref={parent} className='w-full rounded-md shadow-gray-400 shadow-md py-4 px-4'>
              <div className='flex justify-between items-center'>
                <span>Theme</span>
                <div className='inline-flex items-center gap-8'>
                  <button onClick={handleSettingsDarkMode} className='py-2 px-4 bg-red-500 active:bg-red-600 text-white font-bold rounded-md shadow-gray-400 shadow-sm'>Save</button>
                  <Fragment>
                    <Switch
                      checked={isDarkTheme}
                      onHandleColor='#fff'
                      onColor='#ef4444'
                      onChange={() => { setisDarkTheme(!isDarkTheme); localStorage.setItem('darkmode', isDarkTheme); }}
                    />
                  </Fragment>
                </div>
              </div>
            </div>*/}
            <div ref={parent} className='w-full rounded-md shadow-gray-400 shadow-md py-4 px-4'>
              <div className='flex justify-between items-center'>
                <span className='text-xl font-bold'>VAT Settings</span>
                <div className='inline-flex items-center gap-4'>
                  <button onClick={() => { setisVat(!isVat) }} className='py-2 px-4 bg-red-500 active:bg-red-600 text-white font-bold rounded-md shadow-gray-400 shadow-sm'>Change</button>
                  <Fragment>
                    <Switch
                      checked={isVatOn}
                      onHandleColor='#fff'
                      onColor='#ef4444'
                      onChange={() => { setisVatOn(!isVatOn); localStorage.setItem('isvaton', isVatOn); }}
                    />
                  </Fragment>
                </div>
              </div>
              {
                isVat && (
                  <div className='flex items-center w-full h-auto my-6'>
                    <div className='flex flex-col gap-4'>
                      <div className='flex flex-col gap-2'>
                        <label> Vat Rate(%) </label>
                        <input type='text' defaultValue={VatInput} onChange={(e) => { setVatInput(e.target.value); }} placeholder='Enter Vat in percentage' className='rounded-md' />
                      </div>
                      <button onClick={handleSettingsVat} className='py-2 px-4 h-10 bg-red-500 active:bg-red-600 text-white font-bold rounded-md shadow-gray-400 shadow-sm'>Save</button>
                    </div>
                  </div>
                )
              }
            </div>
            <div ref={parent} className='w-full rounded-md shadow-gray-400 shadow-md py-4 px-4'>
              <div className='flex justify-between items-center'>
                <span className='text-xl font-bold'>GST Settings</span>
                <div className='inline-flex items-center gap-4'>
                  <button onClick={() => { setisGst(!isGst) }} className='py-2 px-4 bg-red-500 active:bg-red-600 text-white font-bold rounded-md shadow-gray-400 shadow-sm'>Change</button>
                  <Fragment>
                    <Switch
                      checked={isGstOn}
                      onHandleColor='#fff'
                      onColor='#ef4444'
                      onChange={() => { setisGstOn(!isGstOn); localStorage.setItem('isgston', isGstOn); }}
                    />
                  </Fragment>
                </div>
              </div>
              {
                isGst && (
                  <div className='flex items-center w-full h-auto my-6'>
                    <div className='flex flex-col gap-4'>
                      <label> GST Rate(%) </label>
                      <input type='text' defaultValue={GstInput} onChange={(e) => { setGstInput(e.target.value); }} placeholder='Enter GST in percentage' className='rounded-md' />
                      <button onClick={handleSettingsGst} className='py-2 px-4 h-10 bg-red-500 active:bg-red-600 text-white font-bold rounded-md shadow-gray-400 shadow-sm'>Save</button>
                    </div>
                  </div>
                )
              }
            </div>
            <div ref={parent} className='w-full rounded-md shadow-gray-400 shadow-md py-4 px-4'>
              <div className='flex justify-between items-center'>
                <span className='font-bold text-xl'>EatoCoins</span>
                <div className='inline-flex items-center gap-4'>
                  <button onClick={() => { setisEtoCoin(!isEtoCoin) }} className='py-2 px-4 bg-red-500 active:bg-red-600 text-white font-bold rounded-md shadow-gray-400 shadow-sm'>Change</button>
                  <Fragment>
                    <Switch
                      checked={isEtocoinOn}
                      onHandleColor='#fff'
                      onColor='#ef4444'
                      onChange={() => { setisEtocoinOn(!isEtocoinOn); localStorage.setItem('iseatocoinson', isEtocoinOn) }}
                    />
                  </Fragment>
                </div>
              </div>
              {
                isEtoCoin && (
                  <div className='flex items-center w-full h-auto my-6'>
                    <div className='flex flex-col gap-4 w-full'>
                      <div className='flex gap-4 w-full'>
                        <div className='flex flex-col gap-2 w-1/4'>
                          <label htmlFor="credit_limit_amt">Credit Limit Amount (Rs.)</label>
                          <input
                            type='text'
                            placeholder='Minimum Order Amount(Rs.)'
                            defaultValue={credit_limit_amt}
                            onChange={(e) => { setCredit_limit_amt(e.target.value) }}
                            className='rounded-md w-full'
                          />
                        </div>
                        <div className='flex flex-col gap-2 w-1/4'>
                          <label htmlFor="credit_limit_rate">Credit Limit Rate (%)</label>
                          <input
                            type='text'
                            placeholder='Rate of bill for credit(%)'
                            defaultValue={credit_limit_rate}
                            onChange={(e) => { setCredit_limit_rate(e.target.value) }}
                            className='rounded-md w-full'
                          />
                        </div>
                      </div>
                      <div className='flex gap-4 w-full'>
                        <div className='flex flex-col gap-2 w-1/4'>
                          <label htmlFor="redeem_limit_amt">Redeem Limit Amt. (Rs.)</label>
                          <input
                            type='text'
                            placeholder='Minimum Order Amount for Redeemtion'
                            defaultValue={redeem_limit_amt}
                            onChange={(e) => { setRedeem_limit_amt(e.target.value) }}
                            className='rounded-md w-full'
                          />
                        </div>
                        <div className='flex flex-col gap-2 w-1/4'>
                          <label htmlFor="redeem_limit_rate">Redeem Limit Rate (%)</label>
                          <input
                            type='text'
                            placeholder='Maximum Rate of Redeemtion %'
                            defaultValue={redeem_limit_rate}
                            onChange={(e) => { setRedeem_limit_rate(e.target.value) }}
                            className='rounded-md w-full'
                          />
                        </div>
                      </div>
                      <div>
                        <button
                          className='py-2 px-4 h-10 bg-red-500 active:bg-red-600 text-white font-bold rounded-md shadow-gray-400 shadow-sm'
                          onClick={handleSettingsEatocoins}
                        >Save</button>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
            <div>
              <Link
                href="/hotels/backoffice"
                className='py-2 px-4 h-10 bg-red-500 active:bg-red-600 text-white font-bold rounded-md text-xl shadow-gray-400 shadow-sm'
              >
                More Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
      {
        NotificationON && (
          <div className='fixed top-10 right-[40%] text-lg bg-green-200 p-8 border-l-[10px] border-green-400 rounded-md'>
            <p>{`Your ${message} Settings are Saved`}</p>
          </div>
        )
      }
    </>
  );
};

export default EatofyApp;