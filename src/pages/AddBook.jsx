import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function AddBook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/api/books', { title, author, description, coverImage })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book')
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 500 }}>
      <h2>Add Book</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
      <input placeholder="Author" value={author} onChange={e=>setAuthor(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} required />
      <input placeholder="Cover Image URL" value={coverImage} onChange={e=>setCoverImage(e.target.value)} required />
      <button type="submit">Create</button>
    </form>
  )
}
