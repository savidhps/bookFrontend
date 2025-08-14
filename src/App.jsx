import React from 'react'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import BookList from './pages/BookList'
import BookDetails from './pages/BookDetails'
import AddBook from './pages/AddBook'

const isAuthed = () => !!localStorage.getItem('token')

const ProtectedRoute = ({ children }) => {
  if (!isAuthed()) return <Navigate to="/login" replace />
  return children
}

const Navbar = () => {
  const navigate = useNavigate()
  const authed = isAuthed()
  return (
    <nav style={{ display: 'flex', gap: 12, padding: 12, borderBottom: '1px solid #ddd' }}>
      <Link to="/">Books</Link>
      {authed && <Link to="/add">Add Book</Link>}
      <div style={{ marginLeft: 'auto' }}>
        {authed ? (
          <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/'); }}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <span style={{ margin: '0 8px' }}>|</span>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: 16, maxWidth: 900, margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/add" element={<ProtectedRoute><AddBook /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  )
}
