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
    } catch {
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

  if (!book) return <div className="text-center py-6">Loading...</div>

  return (
    <div className="p-6 space-y-8">
      {/* Book Info */}
      <div className="grid md:grid-cols-[200px_1fr] gap-6 bg-white p-6 rounded-lg shadow">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-52 h-72 object-cover rounded"
        />
        <div>
          <h2 className="text-3xl font-bold">{book.title}</h2>
          <p className="text-gray-600 mb-3">by {book.author}</p>
          <p className="text-gray-800">{book.description}</p>
        </div>
      </div>

      {/* Reviews Section */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
        <div className="space-y-4">
          {reviews.length === 0 && (
            <div className="text-gray-500 italic">No reviews yet</div>
          )}
          {reviews.map((r) => (
            <div
              key={r._id}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-yellow-500">
                  ⭐ {r.rating} / 5
                </span>
                <small className="text-gray-500">
                  by {r.user?.name || 'Anonymous'}
                </small>
              </div>
              <p className="mt-2 text-gray-700">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Review Form */}
      {authed() && (
        <form
          onSubmit={submitReview}
          className="bg-white p-6 rounded-lg shadow space-y-4 max-w-lg"
        >
          <h4 className="text-xl font-semibold">Add a Review</h4>
          {error && <div className="bg-red-100 text-red-600 p-2 rounded">{error}</div>}
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </select>
          <textarea
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            rows={4}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition w-full"
          >
            Submit Review
          </button>
        </form>
      )}
    </div>
  )
}
