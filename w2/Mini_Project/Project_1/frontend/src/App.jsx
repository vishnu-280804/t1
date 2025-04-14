import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import AdminPage from './pages/AdminPage'
import WorkerPage from './pages/WorkerPage'
import HireEmployee from './pages/HireEmployee'
import PaymentPage from './pages/PaymentPage'
import ContactUs from './pages/ContactUs'
import AdminLoginPage from './pages/adminLoginPage'
import WorkerLoginPage from './pages/workerLoginPage'

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="pt-16"> {/* Push content below navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/user-login" element={<WorkerLoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/worker" element={<WorkerPage />} />
          <Route path="/new-user" element={<HireEmployee />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
