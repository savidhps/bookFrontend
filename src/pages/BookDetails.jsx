import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'

const authed = () => !!localStorage.getItem('token')

export default function BookDetails() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  const load = async () => {
    try {
      const { data } = await api.get(`/api/books/${id}`)
      setBook(data.book)
      setReviews(data.reviews || [])
    } catch (err) {
      setError('Failed to load book')
    }
  }

  useEffect(() => { load() }, [id])

  const submitReview = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post(`/api/books/${id}/reviews`, { rating: Number(rating), comment })
      setComment('')
      setRating(5)
      await load()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add review')
    }
  }

  if (!book) return <div>Loading...</div>

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16 }}>
        <img src={book.coverImage} alt={book.title} style={{ width: 200, height: 280, objectFit: 'cover', borderRadius: 6 }} />
        <div>
          <h2>{book.title}</h2>
          <p style={{ opacity: 0.7 }}>by {book.author}</p>
          <p>{book.description}</p>
        </div>
      </div>

      <h3>Reviews</h3>
      <div style={{ display: 'grid', gap: 8 }}>
        {reviews.length === 0 && <div>No reviews yet</div>}
        {reviews.map((r) => (
          <div key={r._id} style={{ border: '1px solid #eee', padding: 10, borderRadius: 6 }}>
            <strong>Rating:</strong> {r.rating} / 5
            <div>{r.comment}</div>
            <small style={{ opacity: 0.7 }}>by {r.user?.name || 'Anonymous'}</small>
          </div>
        ))}
      </div>

      {authed() && (
        <form onSubmit={submitReview} style={{ display: 'grid', gap: 10, maxWidth: 420, marginTop: 12 }}>
          <h4>Add a Review</h4>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <select value={rating} onChange={(e)=>setRating(e.target.value)} required>
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </select>
          <textarea placeholder="Comment" value={comment} onChange={(e)=>setComment(e.target.value)} required />
          <button type="submit">Submit Review</button>
        </form>
      )}
    </div>
  )
}
