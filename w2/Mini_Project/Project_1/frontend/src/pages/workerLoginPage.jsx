import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const WorkerLoginPage = () => {
  const [workerId, setWorkerId] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    localStorage.setItem('workerId', workerId)
    navigate('/worker')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">Worker Login</h2>
        <input
          type="text"
          placeholder="Enter Worker ID"
          value={workerId}
          onChange={(e) => setWorkerId(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        <button type="submit" className="bg-green-600 text-white py-2 w-full rounded hover:bg-green-700">
          Login
        </button>
      </form>
    </div>
  )
}

export default WorkerLoginPage
