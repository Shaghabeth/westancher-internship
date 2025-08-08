import React, { useEffect, useState } from 'react'
import TagForm from './components/TagForm'
import TagList from './components/TagList'
import * as storage from './services/storage'

export default function App() {
  const [tags, setTags] = useState([])

  // Load on mount
  useEffect(() => {
    setTags(storage.getTags())
  }, [])

  // Persist whenever tags change
  useEffect(() => {
    storage.saveTags(tags)
  }, [tags])

  // CREATE
  const addTag = (label) => {
    // simple id; in a real app use uuid
    const id = Date.now()
    setTags((prev) => [...prev, { id, label, selected: false }])
  }

  // UPDATE (label or selected)
  const updateTag = (id, updates) => {
    setTags((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
  }

  // TOGGLE selection
  const toggleTag = (id) => {
    setTags((prev) => prev.map((t) => (t.id === id ? { ...t, selected: !t.selected } : t)))
  }

  // DELETE
  const deleteTag = (id) => {
    setTags((prev) => prev.filter((t) => t.id !== id))
  }

  const showSelected = () => {
    const list = tags.filter((t) => t.selected).map((t) => t.label)
    alert(list.length ? 'Selected: ' + list.join(', ') : 'No selection')
    console.log('Selected:', list)
  }

  const clearSelected = () => {
    setTags((prev) => prev.map((t) => ({ ...t, selected: false })))
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Animal Causes — tags (React CRUD)</h1>

        <TagForm onAdd={addTag} />

        <div className="controls">
          <button onClick={showSelected}>Show selected</button>
          <button onClick={clearSelected} style={{ marginLeft: 8 }}>Clear selected</button>
        </div>

        <TagList
          tags={tags}
          onToggle={toggleTag}
          onEdit={(id, label) => updateTag(id, { label })}
          onDelete={deleteTag}
        />
      </div>
    </div>
  )
}
