import React, { useState } from 'react'

export default function TagForm({ onAdd }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const label = value.trim()
    if (!label) return
    onAdd(label)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="tag-form">
      <input
        placeholder="Add new tag (e.g., Tigers)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  )
}
