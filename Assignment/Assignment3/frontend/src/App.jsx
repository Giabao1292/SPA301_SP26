import { useMemo, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppNavbar from './components/AppNavbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Rooms from './pages/Rooms'
import MyBookings from './pages/MyBookings'
import Profile from './pages/Profile'
import CreateBooking from './pages/CreateBooking'
import StaffCustomers from './pages/staff/StaffCustomers'
import StaffRooms from './pages/staff/StaffRooms'
import StaffRoomTypes from './pages/staff/StaffRoomTypes'
import StaffBookings from './pages/staff/StaffBookings'
import StaffBookingDetails from './pages/staff/StaffBookingDetails'
import './App.css'

const getStoredAuth = () => ({
  token: localStorage.getItem('token'),
  role: localStorage.getItem('role'),
})

function App() {
  const [auth, setAuth] = useState(getStoredAuth())

  const handleAuth = (data) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('role', data.role)
    setAuth({ token: data.token, role: data.role })
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    setAuth({ token: null, role: null })
  }

  const isCustomer = useMemo(() => auth.role === 'CUSTOMER', [auth.role])
  const isStaff = useMemo(() => auth.role === 'STAFF', [auth.role])

  return (
    <div className="bg-light min-vh-100">
      <AppNavbar role={auth.role} onLogout={handleLogout} />
      <Container fluid className="px-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/login" element={<Login onAuth={handleAuth} />} />
          <Route path="/register" element={<Register onAuth={handleAuth} />} />
          <Route path="/my-bookings" element={isCustomer ? <MyBookings /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isCustomer ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/bookings/new" element={isCustomer ? <CreateBooking /> : <Navigate to="/login" />} />
          <Route path="/staff/customers" element={isStaff ? <StaffCustomers /> : <Navigate to="/login" />} />
          <Route path="/staff/rooms" element={isStaff ? <StaffRooms /> : <Navigate to="/login" />} />
          <Route path="/staff/room-types" element={isStaff ? <StaffRoomTypes /> : <Navigate to="/login" />} />
          <Route path="/staff/bookings" element={isStaff ? <StaffBookings /> : <Navigate to="/login" />} />
          <Route path="/staff/booking-details" element={isStaff ? <StaffBookingDetails /> : <Navigate to="/login" />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
