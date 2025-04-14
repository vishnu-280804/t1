import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-gradient-to-r from-emerald-900 to-lime-700 text-amber-100 fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="text-2xl font-bold tracking-wide text-amber-200">
            <Link to="/" className="hover:text-amber-400 transition">CoolieMitra</Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-6 font-medium">
            <Link to="/" className="hover:text-amber-400 transition">Home</Link>
            <Link to="/user-login" className="hover:text-amber-400 transition">Login as User</Link>
            <Link to="/admin-login" className="hover:text-amber-400 transition">Login as Admin</Link>
            <Link to="/new-user" className="hover:text-amber-400 transition">New User?</Link>
            <Link to="/contact" className="hover:text-amber-400 transition">Contact Us</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-amber-200 focus:outline-none">
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Links */}
      {isOpen && (
        <div className="md:hidden bg-emerald-800 px-4 pt-2 pb-4 space-y-2 font-medium text-amber-100 shadow">
          <Link to="/" className="block hover:text-amber-400" onClick={toggleMenu}>Home</Link>
          <Link to="/user-login" className="block hover:text-amber-400" onClick={toggleMenu}>Login as User</Link>
          <Link to="/admin-login" className="block hover:text-amber-400" onClick={toggleMenu}>Login as Admin</Link>
          <Link to="/new-user" className="block hover:text-amber-400" onClick={toggleMenu}>New User?</Link>
          <Link to="/contact" className="block hover:text-amber-400" onClick={toggleMenu}>Contact Us</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
