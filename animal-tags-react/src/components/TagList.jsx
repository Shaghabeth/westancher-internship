import React from 'react'
import TagItem from './TagItem'

export default function TagList({ tags, onToggle, onEdit, onDelete }) {
  return (
    <div className="grid">
      {tags.map((tag, idx) => (
        <TagItem
          key={tag.id}
          tag={tag}
          index={idx}
          onToggle={() => onToggle(tag.id)}
          onEdit={(newLabel) => onEdit(tag.id, newLabel)}
          onDelete={() => onDelete(tag.id)}
        />
      ))}
    </div>
  )
}
