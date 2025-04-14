import React from 'react'

const Home = () => {
  return (
    <div className="bg-blue-900 text-white min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-12">
      <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          The only all-in-one labor management suite for agriculture.
        </h1>
        <p className="text-lg text-gray-300">
          Hire, track, pay. It’s never been this easy to stay compliant, analyze labor costs, and run payroll.
        </p>
      </div>
      <div className="md:w-1/2 flex flex-col md:flex-row items-center justify-center gap-6">
        
        <div className="flex flex-col items-center">
          <span className="mb-2 text-sm tracking-wide">HIRE</span>
          <img
            src="../images/HireImage.png"
            alt="Hire Screenshot"
            className="w-48 h-auto rounded-xl shadow-lg transition-transform hover:scale-105"
          />
        </div>

        <div className="flex flex-col items-center">
          <span className="mb-2 text-sm tracking-wide">TRACK</span>
          <img
            src="../images/TrackImage.png"
            alt="Track Screenshot"
            className="w-48 h-auto rounded-xl shadow-lg transition-transform hover:scale-105"
          />
        </div>

        <div className="flex flex-col items-center">
          <span className="mb-2 text-sm tracking-wide">PAY</span>
          <img
            src="../images/PayImage.png"
            alt="Pay Screenshot"
            className="w-48 h-auto rounded-xl shadow-lg transition-transform hover:scale-105"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
