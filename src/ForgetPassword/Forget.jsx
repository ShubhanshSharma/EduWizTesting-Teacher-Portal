//import React from "react"
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import logo_light from '../assets/logo_light.svg'
import ThemeToggleButton from '../Components/ThemeToggle'
import { useEffect, useState } from 'react'


const Forget = () => {
    const [logoSrc, setLogoSrc] = useState(logo);
    const [theme] = useState(localStorage.getItem('theme') || 'dark'); // Get theme
    const [email, setEmail] = useState(''); // State for email input
    useEffect(() => {
       
      if (theme === 'light') {
        setLogoSrc(logo_light); 
        console.log(theme);
      } else {
        setLogoSrc(logo); 
        console.log(theme);
      }
    }, [localStorage.getItem('theme')]); 
    const handleEmailChange = (e) => {
      setEmail(e.target.value); // Capture email input
    };
    const handleResetPassword = () => {
      fetch('http://localhost:5000/teacher/forgot-password', {
        method: 'POST',
        headers: {
           email 
        },
        body: JSON.stringify({ email }) // Send email in the body
      })
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        if (data.success) {
          alert('Password reset link sent successfully!'); // Show success message
        } else {
          alert('Failed to send password reset link.'); // Show failure message
        }
      })
      .catch((error) => {
        alert('An error occurred: ' + error.message); // Handle any errors
      });
      
    };

  return (
    <div  className='m-0  w-screen h-screen flex justify-center items-center bg-[#F3F4F6] text-black dark:bg-[#010B18] dark:text-white' >
    <ThemeToggleButton/>
     <div className='m-auto rounded-lg w-[40%] h-[62%] flex flex-col  justify-start items-center bg-[#FFFFFF]  text-black dark:bg-[#1F2937] dark:text-white'>
       <div className='flex-col mt-6 px-10 w-full h-fit flex justify-start items-center'>
           <img src={logoSrc} className='w-[60px] h-[60px] mb-4' />
         <h1 className="mt-4 text-3xl justify-center font-bold">Forget Password</h1>
         <h1 className="text-lg justify-center text-black dark:text-slate-400  mt-2 mt-3 ">Enter Your Email to Rest Your Password</h1>
         <div className='flex flex-col font-bold mt-10 w-full gap-4 text-lg'><h1>Email:</h1>
         <input placeholder=' Enter Your Email'   onChange={handleEmailChange} className='flex border-2 h-12 rounded-md  border-slate-200 dark:border-2 dark:border-slate-500 items-center  dark:bg-transparent dark:bg-slate-700 min-h-8'></input></div>
         <button  onClick={handleResetPassword} className='mt-10 w-full h-[50px] bg-blue-900 hover:bg-blue-800 dark:hover:bg-blue-600 dark:bg-blue-500 text-white rounded-lg text-xl'>Reset Password</button>
         <div className='flex flex-row gap-1 items-center justify-center mt-4 w-full  text-lg'><h1>Remember Your Password?</h1>
         <Link to='/' className=' text-blue-500'>Sign In</Link></div>
       </div>
     </div>
     
    </div>
  )
}

export default Forget
