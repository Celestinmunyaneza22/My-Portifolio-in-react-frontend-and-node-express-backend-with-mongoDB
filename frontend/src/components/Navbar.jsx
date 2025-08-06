import React, { useState, useEffect } from 'react';
import photo from '../assets/celestin2.jpg';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  // Scroll listener for color change + active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      const sections = ['home', 'skills', 'experiences', 'about'];
      for (let id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveLink(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <img
            src={photo}
            alt="Profile"
            className="h-12 w-12 rounded-full mr-2"
          />
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-800 dark:text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Nav links */}
        <div className={`md:flex md:items-center w-full md:w-auto ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-0 md:ml-auto">
            {['home', 'skills', 'experiences', 'about'].map((id) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`font-medium transition-colors ${
                    activeLink === id
                      ? 'text-blue-600'
                      : 'text-gray-800 dark:text-gray-100 hover:text-blue-600'
                  }`}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;