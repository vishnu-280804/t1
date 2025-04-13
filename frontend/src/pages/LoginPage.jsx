import React, { useState } from 'react'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle login logic
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6">User Login</h2>
        <input type="text" placeholder="Username" className="w-full mb-4 px-4 py-2 border rounded" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full mb-4 px-4 py-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  )
}

export default LoginPage