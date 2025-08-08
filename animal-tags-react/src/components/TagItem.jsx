import React, { useState } from 'react'

export default function TagItem({ tag, index, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [temp, setTemp] = useState(tag.label)

  const letter = String.fromCharCode(65 + (index % 26)) // A, B, C...

  const saveEdit = () => {
    const label = temp.trim()
    if (label) {
      onEdit(label)
      setIsEditing(false)
    }
  }

  return (
    <div
      className={`choice ${tag.selected ? 'selected' : ''}`}
      role="button"
      tabIndex={0}
      onClick={() => { if (!isEditing) onToggle() }}
      onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !isEditing) onToggle() }}
    >
      <span className="key">{letter}</span>

      {!isEditing ? (
        <span className="label">{tag.label}</span>
      ) : (
        <input
          className="edit-input"
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') saveEdit() }}
          onClick={(e) => e.stopPropagation()}
        />
      )}

      <div className="actions" onClick={(e) => e.stopPropagation()}>
        {!isEditing ? (
          <>
            <button className="small" onClick={() => { setIsEditing(true); setTemp(tag.label) }}>Edit</button>
            <button className="small delete" onClick={() => { if (confirm(`Delete "${tag.label}"?`)) onDelete() }}>Delete</button>
          </>
        ) : (
          <>
            <button className="small" onClick={saveEdit}>Save</button>
            <button className="small" onClick={() => { setIsEditing(false); setTemp(tag.label) }}>Cancel</button>
          </>
        )}
      </div>
    </div>
  )
}
