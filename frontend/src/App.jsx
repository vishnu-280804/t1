import React from 'react';
import { Routes, Route } from 'react-router-dom'; // ✅ No BrowserRouter here
import Home from './pages/Home';
import Navbar from './components/Navbar';
import "./index.css"
import AdminPage from './pages/AdminPage';
import SchedulePage from './pages/SchedulePage';
import ContactPage from './pages/ContactUs';
import WorkerProfile from './pages/WorkerProfile';
import HireEmployee from './pages/HireEmployee';
import PaymentPage from './pages/PaymentPage';
import PasswordReset from './pages/PasswordReset';
import AdminLoginPage from './pages/adminLoginPage';
import WorkerLoginPage from './pages/workerLoginPage';
import AnalyticsPage from './pages/AnalyticsPage';

const App = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Routes>
        <Route path="/" element={<Home />} />
              <Route path="/admin-login" element={<AdminLoginPage />} />
              <Route path="/user-login" element={<WorkerLoginPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/new-user" element={<HireEmployee />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/worker-profile/:id" element={<WorkerProfile />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/password-reset" element={<PasswordReset />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
