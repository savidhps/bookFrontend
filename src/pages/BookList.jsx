import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

export default function BookList() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/api/books')
        setBooks(data)
      } catch (err) {
        setError('Failed to load books')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <h2>All Books</h2>
      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {books.map(b => (
          <Link key={b._id} to={`/books/${b._id}`} style={{ border: '1px solid #eee', padding: 12, borderRadius: 8, textDecoration: 'none', color: 'inherit' }}>
            <img src={b.coverImage} alt={b.title} style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 6 }} />
            <h3>{b.title}</h3>
            <p style={{ opacity: 0.7 }}>by {b.author}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
