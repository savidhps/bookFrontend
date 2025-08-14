// src/pages/BookList.jsx
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

export default function BookList() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await api.get('/api/books')
        setBooks(data)
      } catch (err) {
        setError('Failed to load books. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchBooks()
  }, [])

  if (loading) return <div className="text-center py-6">Loading books...</div>
  if (error) return <div className="text-red-600 text-center">{error}</div>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Books</h2>
      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
        {books.map(b => (
          <Link
            key={b._id}
            to={`/books/${b._id}`}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white"
          >
            <img
              src={b.coverImage}
              alt={b.title}
              className="w-full aspect-[2/3] object-cover" // Keeps 2:3 book cover ratio
            />
            <div className="p-3">
              <h3 className="text-md font-semibold truncate">{b.title}</h3>
              <p className="text-gray-500 text-sm truncate">by {b.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
