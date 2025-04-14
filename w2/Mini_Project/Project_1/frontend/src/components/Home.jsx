import React from 'react'
import HireImage from '/images/hire.png'    // replace with actual path
import TrackImage from '/images/track.png'  // replace with actual path
import PayImage from '/images/pay.png'      // replace with actual path

const Home = () => {
  return (
    <div className="bg-blue-900 text-white min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-12">
      
      {/* Left Text Section */}
      <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          The only all-in-one labor management suite for agriculture.
        </h1>
        <p className="text-lg text-gray-300">
          Hire, track, pay. It’s never been this easy to stay compliant, analyze labor costs, and run payroll.
        </p>
      </div>

      {/* Right Visual Section */}
      <div className="md:w-1/2 flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Hire */}
        <div className="flex flex-col items-center">
          <span className="mb-2 text-sm tracking-wide">HIRE</span>
          <img
            src={HireImage}
            alt="Hire Screenshot"
            className="w-48 h-auto rounded-xl shadow-lg"
          />
        </div>

        {/* Track */}
        <div className="flex flex-col items-center">
          <span className="mb-2 text-sm tracking-wide">TRACK</span>
          <img
            src={TrackImage}
            alt="Track Screenshot"
            className="w-48 h-auto rounded-xl shadow-lg"
          />
        </div>

        {/* Pay */}
        <div className="flex flex-col items-center">
          <span className="mb-2 text-sm tracking-wide">PAY</span>
          <img
            src={PayImage}
            alt="Pay Screenshot"
            className="w-48 h-auto rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
