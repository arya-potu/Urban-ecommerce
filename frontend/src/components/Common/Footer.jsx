import React from 'react'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'
import { FiPhoneCall } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-gradient-to-b from-gray-50 to-gray-100 border-t pt-12 pb-8'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6 lg:px-0'>

        {/* Newsletter */}
        <div>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>Newsletter</h3>
          <p className='text-gray-500 mb-4 leading-relaxed'>
            Be the first to hear about new products, exclusive events, and online offers.
          </p>
          <p className='font-medium text-sm text-gray-700 mb-6'>
            Sign up and get <span className='text-black font-bold'>25% off</span> on your first order.
          </p>
          <form className='flex'>
            <input 
              type='email'
              placeholder='Enter your email'
              className='p-3 w-full text-sm border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-black transition-all'
              required
            />
            <button 
              type='submit' 
              className='bg-black text-white px-6 py-3 text-sm rounded-r-full hover:bg-gray-800 transition-all'
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>Shop</h3>
          <ul className='space-y-2 text-gray-600'>
            {["Men's Top Wear", "Women's Top Wear", "Men's Bottom Wear", "Women's Bottom Wear"].map((item, idx) => (
              <li key={idx}>
                <Link to="#" className="hover:text-black hover:underline underline-offset-4 transition-all">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>Support</h3>
          <ul className='space-y-2 text-gray-600'>
            {["Contact Us", "About Us", "FAQs", "Features"].map((item, idx) => (
              <li key={idx}>
                <Link to="#" className="hover:text-black hover:underline underline-offset-4 transition-all">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>Follow Us</h3>
          <div className='flex items-center space-x-5 mb-6'>
            <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer' 
              className='hover:text-black transition-transform transform hover:scale-110'>
              <TbBrandMeta className='h-6 w-6'/>
            </a>
            <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer' 
              className='hover:text-black transition-transform transform hover:scale-110'>
              <IoLogoInstagram className='h-6 w-6'/>
            </a>
            <a href='https://twitter.com' target='_blank' rel='noopener noreferrer' 
              className='hover:text-black transition-transform transform hover:scale-110'>
              <RiTwitterXLine className='h-5 w-5'/>
            </a>
          </div>
          <p className='text-gray-800 font-medium'>Call Us</p>
          <p className='text-gray-700 flex items-center mt-1'>
            <FiPhoneCall className='inline-block mr-2'/> +91 6305413271
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className='container mx-auto mt-12 px-6 lg:px-0 border-t border-gray-200 pt-6'>
        <p className='text-gray-500 text-sm tracking-tight text-center'>
          © 2025, <span className='text-black font-medium'>CompileTab</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
