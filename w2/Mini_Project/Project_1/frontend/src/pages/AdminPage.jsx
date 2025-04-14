import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AdminPage = () => {
  const [workers, setWorkers] = useState([])
  const [pendingWorkers, setPendingWorkers] = useState([])

  // Fetch accepted workers
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/workers/getWorker?status=accepted')
      .then((res) => setWorkers(res.data))
      .catch((err) => console.error(err))
  }, [])

  // Fetch pending workers
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/workers/getWorker?status=pending')
      .then((res) => setPendingWorkers(res.data))
      .catch((err) => console.error(err))
  }, [])

  const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    const date = new Date(dateStr)
    return isNaN(date) ? '—' : date.toLocaleString()
  }

  const handleAccept = async (id) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/workers/${id}/accept`)
      setPendingWorkers(pendingWorkers.filter((w) => w._id !== id))
      setWorkers([...workers, res.data])
    } catch (err) {
      console.error(err)
    }
  }

  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/workers/${id}/reject`)
      setPendingWorkers(pendingWorkers.filter((w) => w._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* New Users Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">New Users</h2>
        {pendingWorkers.length === 0 ? (
          <p>No pending workers.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white rounded shadow">
              <thead>
                <tr className="bg-green-700 text-white">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingWorkers.map((w) => (
                  <tr key={w._id} className="text-center border-t">
                    <td className="px-4 py-2">{w.name}</td>
                    <td className="px-4 py-2">{w.phone}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleAccept(w._id)}
                        className="bg-green-600 text-white px-4 py-1 rounded mr-2 hover:bg-green-700"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(w._id)}
                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Accepted Workers Section */}
      <h2 className="text-xl font-semibold mb-4">Accepted Workers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white rounded shadow">
          <thead>
            <tr className="bg-green-700 text-white">
              <th className="px-4 py-2">Worker</th>
              <th className="px-4 py-2">Start Time</th>
              <th className="px-4 py-2">End Time</th>
              <th className="px-4 py-2">Paid</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((w, index) => (
              <tr key={index} className="text-center border-t">
                <td className="px-4 py-2">{w.name}</td>
                <td className="px-4 py-2">{formatDate(w.startTime)}</td>
                <td className="px-4 py-2">{formatDate(w.endTime)}</td>
                <td className="px-4 py-2">{w.isPaid ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPage