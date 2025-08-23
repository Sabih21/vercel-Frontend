import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 px-4">
        
        {/* Contact Us */}
        <div>
          <h4 className="font-bold text-lg mb-4">CONTACT US</h4>
          <p className="mb-2">
            Sapphire Retail Head Office 1.5-Km, Defence Road, Bhobtian Chowk, Off Raiwind Road,
            Opposite University of Lahore, Lahore.
          </p>
          <p className="mb-1">Email: wecare@sapphireonline.pk</p>
          <p>Phone: +92 (0)42 111-738-245</p>
        </div>
        
        {/* Customer Care */}
        <div>
          <h4 className="font-bold text-lg mb-4">CUSTOMER CARE</h4>
          <p>Exchange & Return Policy</p>
          <p>FAQs</p>
          <p>Contact Us</p>
        </div>
        
        {/* Information */}
        <div>
          <h4 className="font-bold text-lg mb-4">INFORMATION</h4>
          <p>About Us</p>
          <p>Privacy Policy</p>
          <p>Payments</p>
          <p>Store Locator</p>
          <p>Fabric Glossary</p>
          <p>Blogs</p>
          <a href="/dashboard"><p>Dashboard</p></a>
        </div>
        
        {/* Newsletter Signup */}
        <div>
          <h4 className="font-bold text-lg mb-4">NEWSLETTER SIGNUP</h4>
          <p className="mb-3">Subscribe to our Newsletter for Exclusive Updates</p>
          <div className="flex w-full">
            <input
              type="email"
              placeholder="Your email address"
              defaultValue="dojipeteku@mailinator.com"
              className="border border-gray-300 px-3 py-2 w-full rounded-l-md focus:outline-none"
            />
            <button className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-800">
              Subscribe
            </button>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 text-gray-600">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              <FaFacebookF size={20} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              <FaLinkedinIn size={20} />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
