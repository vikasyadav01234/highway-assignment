'use client';

import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Step 1: Request OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/users/sendotp', { email });
      const data = response.data;
      console.log(data)
      if (data) {
        setOtpSent(true);
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Something went wrong while requesting OTP.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/users/login', { email, otp });
      const data = response.data;
      console.log(response)

      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        router.push('/profile')
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Something went wrong during OTP verification.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex max-w-6xl w-full shadow-2xl rounded-xl overflow-hidden bg-white">
        {/* Form Section */}
        <div className="p-6 sm:p-8 lg:p-10 flex-1 lg:flex-[0.6]">
          {/* Logo */}
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2.5">
              <Image src="/logo.png" alt="Logo" width={100} height={100} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold mb-2.5 text-gray-800">Sign in</h1>
          <p className="mb-6 sm:mb-7 text-gray-600 text-sm sm:text-base">
            Login with your email and OTP
          </p>

          {/* Error Message */}
          {error && (
            <div className="p-3 mb-4 rounded-md text-center bg-red-100 text-red-800 border border-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={otpSent ? handleVerifyOtp : handleRequestOtp}>
            {/* Email Field */}
            <div className="mb-4 sm:mb-5">
              <label className="block mb-2 font-semibold text-gray-800 text-sm sm:text-base">
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 border text-black border-gray-300 rounded-lg transition-colors duration-300 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={loading || otpSent}
              />
            </div>

            {/* OTP Field (after email is submitted) */}
            {otpSent && (
              <div className="mb-6">
                <label className="block mb-2 font-semibold text-gray-800 text-sm sm:text-base">
                  OTP
                </label>
                <input
                  type="text"
                  className="w-full p-3 border text-black border-gray-300 rounded-lg transition-colors duration-300 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  required
                  disabled={loading}
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 sm:p-4 bg-blue-500 text-white border-none rounded-lg text-sm sm:text-base font-semibold mb-4 transition-colors duration-300 hover:bg-blue-600 disabled:bg-blue-300"
              disabled={loading}
            >
              {loading
                ? otpSent
                  ? 'Verifying...'
                  : 'Sending OTP...'
                : otpSent
                ? 'Verify OTP'
                : 'Send OTP'}
            </button>

            {/* Links */}
            <div className="text-center text-sm sm:text-base">
              <p className='text-black'>
                Don't have an account?{' '}
                <Link href="/signup" className="text-blue-500 font-semibold hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Visual Section */}
        <div className="hidden lg:flex flex-1 relative overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-white p-8 border rounded-sm">
              <Image src="/right-column.png" alt="right column" height={1000} width={825} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

