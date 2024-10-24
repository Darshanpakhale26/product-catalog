import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-blue-600 p-4 shadow-md text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">© 2024 MyStore. All rights reserved.</p>
        <p className="text-sm">Made with ❤️ by Darshan Pakhale</p>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF className="text-white hover:text-blue-500 transition-colors" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter className="text-white hover:text-blue-400 transition-colors" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram className="text-white hover:text-pink-500 transition-colors" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn className="text-white hover:text-blue-600 transition-colors" />
          </a>
        </div>

        {/* Additional Links */}
        <div className="mt-4">
          <a href="/privacy-policy" className="text-sm hover:underline mx-2">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="text-sm hover:underline mx-2">
            Terms of Service
          </a>
          <a href="/contact" className="text-sm hover:underline mx-2">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
