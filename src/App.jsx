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
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex gap-4">
          <Link
            to="/"
            className="hover:bg-blue-500 px-3 py-2 rounded-md transition text-3xl"
          >
            📚 Books
          </Link>
          {authed && (
            <Link
              to="/add"
              className="hover:bg-blue-500 px-3 py-2 rounded-md transition text-l mt-2 border border-white"
            >
              ➕ Add Book
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {authed ? (
            <button
              onClick={() => {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                navigate('/')
              }}
              className="bg-blue-500 hover:bg-white hover:text-blue-600 px-3 py-2 border-2 border-white rounded-md transition "
            >
               Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:bg-blue-500 px-3 py-2 rounded-md transition"
              >
                🔑 Login
              </Link>
              <Link
                to="/register"
                className="hover:bg-blue-500 px-3 py-2 rounded-md transition"
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
    <div className="min-h-screen bg-gray-50">
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
