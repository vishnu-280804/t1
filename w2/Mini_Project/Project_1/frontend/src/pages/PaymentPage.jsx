import React, { useEffect, useState } from 'react'

const PaymentPage = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Fetch unpaid users
  }, [])

  const handlePay = (userId) => {
    // Mark user as paid
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-6">Process Payments</h1>
      <ul className="space-y-4">
        {users.map(user => (
          <li key={user._id} className="bg-gray-100 p-4 rounded shadow flex items-center justify-between">
            <span>{user.name}</span>
            <button
              onClick={() => handlePay(user._id)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Pay Now
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PaymentPage