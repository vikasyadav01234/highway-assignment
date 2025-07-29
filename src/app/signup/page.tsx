'use client';

import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ToastContainer,toast } from 'react-toastify';

interface ApiResponse {
  success: boolean;
  message: string;
  otp?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  token?:any;
}

export default function SignupPage() {
  const [step, setStep] = useState<'request-otp' | 'verify-otp'>('request-otp');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [otp, setOtp] = useState('');
  const [otpsent, setotpsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post<ApiResponse>('/api/users/sendotp', {
        name,
        email,
        dob: dateOfBirth,
      });
      toast.success("Otp Sent Check Your Email")
      if (response.data?.message) setSuccessMessage(response.data.message);

      setotpsent(true);
      setStep('verify-otp');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response) {
          const errorData = error.response.data as { message?: string };
          setError(errorData?.message || 'Server error occurred');
          toast.error('Server Error During Sending Otp')
        } else if (error?.request) {
          setError('Network error. Please check your connection.');
          toast.error('Network Error During Sending Otp')
        } else {
          setError('Something went wrong. Please try again.');
          toast.error('Something Went Wrong During Sending Otp')
        }
      } else {
        setError('Unexpected error occurred.');
        toast.error('Unexpected Error During Sending Otp')
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post<ApiResponse>('/api/users/signup', {
        name,
        email,
        dob: dateOfBirth,
        otp,
      });
      toast.success("User Created Successfully")
      

      const data = response.data;
      //console.log(data)
      if (data) {
        setSuccessMessage(data.message || 'Signed up successfully!');
        e.preventDefault();
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        router.push('/profile')
        toast.success("welcome to Profile")
        
      } else {
        setError(data || 'Verification failed');
        toast.error("Something Went Wrong During Verification")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorData = error.response.data as { message?: string };
          setError(errorData?.message || 'Verification failed');
          toast.error('Verification failed')
        } else if (error?.request) {
          setError('Network error. Please check your connection.');
          toast.error('Network error. Please check your connection.');
        } else {
          setError('Something went wrong. Please try again.');
          toast.error('Something went wrong. Please try again.');
        }
      } else {
        setError('Unexpected error occurred.');
        toast.error('Unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError('');
    setSuccessMessage('');
    try {
      const response = await axios.post<ApiResponse>('/api/users/sendotp', {
        name,
        email,
        dob: dateOfBirth,
      });
      toast.success("Otp Resend Successfully")
      setOtp('');
      setotpsent(true);
      setStep('verify-otp');
      if (response.data?.message) {
        setSuccessMessage(response.data.message || 'OTP resent successfully.');
        
      } else {
        setSuccessMessage('OTP resent successfully.');

      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorData = error.response.data as { message?: string };
          setError(errorData?.message || 'Could not resend OTP');
          toast.error("Somthing went wrong during resending otp")
        } else if (error?.request) {
          setError('Network error. Please check your connection.');
          toast.error('Network error. Please check your connection.');
        } else {
          setError('Something went wrong. Please try again.');
          toast.error('Something went wrong. Please try again.');
        }
      } else {
        setError('Unexpected error occurred.');
        toast.error('Unexpected error occurred.');
      }
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

          <h1 className="text-2xl sm:text-3xl font-bold mb-2.5 text-gray-800">Sign up</h1>
          <p className="mb-6 sm:mb-7 text-gray-600 text-sm sm:text-base">
            Sign up to enjoy the feature of HD
          </p>

          {/* Messages */}
          {error && (
            <div className="p-3 mb-4 rounded-md text-center bg-red-100 text-red-800 border border-red-200 text-sm">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="p-3 mb-4 rounded-md text-center bg-green-100 text-green-800 border border-green-200 text-sm">
              {successMessage}
            </div>
          )}

          <form onSubmit={step === 'request-otp' ? handleRequestOtp : handleVerifyOtp}>
            {/* Name */}
            <div className="mb-4 sm:mb-5">
              <label className="block mb-2 font-semibold text-gray-800 text-sm sm:text-base">
                Your Name
              </label>
              <input
                type="text"
                className="w-full p-3 border text-black border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                disabled={step === 'verify-otp' || loading}
              />
            </div>

            {/* DOB */}
            <div className="mb-4 sm:mb-5">
              <label className="block mb-2 font-semibold text-gray-800 text-sm sm:text-base">
                Date of Birth
              </label>
              <input
                type="date"
                className="w-full p-3 text-black border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
                disabled={step === 'verify-otp' || loading}
              />
            </div>

            {/* Email */}
            <div className="mb-4 sm:mb-5">
              <label className="block mb-2 font-semibold text-gray-800 text-sm sm:text-base">
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 border text-black border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={step === 'verify-otp' || loading}
              />
            </div>

            {/* OTP */}
            {otpsent && (
              <div>
                <div className="mb-4 sm:mb-5">
                  <label className="block mb-2 font-semibold text-gray-800 text-sm sm:text-base">
                    OTP
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border text-black border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    //maxLength={6}
                    required
                    disabled={loading}
                  />
                </div>

                {/* Resend */}
                <div className="pb-2 mb-2">
                  <button
                    type="button"
                    className="text-blue-600 text-sm font-semibold underline hover:text-blue-800"
                    onClick={handleResendOtp}
                    disabled={loading}
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:bg-blue-300"
              disabled={loading}
            >
              {step === 'request-otp'
                ? loading
                  ? 'Sending OTP...'
                  : 'Get OTP'
                : loading
                  ? 'Verifying...'
                  : 'Sign Up'}
            </button>

            {/* Login link */}
            <div className="text-center text-black text-sm mt-4">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-blue-500 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>

        {/* Image */}
        <div className="hidden lg:flex flex-1 relative overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-white p-8 border rounded-sm">
              <Image src="/right-column.png" alt="right column" height={1000} width={825} />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
    
  );
}
