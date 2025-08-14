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
    <nav className="bg-gradient-to-r from-emerald-700 via-green-700 to-lime-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">

        {/* Left Section */}
        <Link
          to="/"
          className="font-bold text-2xl tracking-wide flex items-center gap-2 hover:scale-105 transition-transform"
        >
          📚 BookStore
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {authed && (
            <Link
              to="/add"
              className="hover:bg-white border border-white hover:text-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:shadow-md transition-all duration-200"
            >
              ➕ Add Book
            </Link>
          )}

          {authed ? (
            <button
              onClick={() => {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                navigate('/')
              }}
              className="hover:bg-white border border-white hover:text-green-600 text-white font-medium px-4 py-2 rounded-lg shadow hover:shadow-lg transition-all duration-200"
            >
              ☄ Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-green-700 font-semibold px-4 py-2 rounded-lg shadow hover:shadow-md hover:bg-green-50 transition-all duration-200 border border-green-200"
              >
                🔑 Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-400 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-yellow-500 hover:shadow-lg transition-all duration-200"
              >
                📝 Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-green-50 to-lime-100">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddBook />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  )
}
