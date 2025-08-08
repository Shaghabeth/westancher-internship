const STORAGE_KEY = 'animal_tags_v1'

const defaultTags = [
  'All Animal Causes','Elephants','Giraffes','Manatees','Pandas',
  'Penguins','Polar Bears','Primates','Raptors','Rhinos',
  'Sea Turtles','Sharks','Sloths','Whales & Dolphins','Wild Cats'
].map((label, idx) => ({ id: idx + 1, label, selected: false }))

export function getTags() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTags))
    return defaultTags
  }
  try {
    return JSON.parse(raw)
  } catch {
    return defaultTags
  }
}

export function saveTags(tags) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tags))
}
