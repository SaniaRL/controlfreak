import { JSX } from 'react'

export default function highlightMatch(text: string, search: string): JSX.Element {
  if (!search) return <>{text}</>

  const index = text.toLowerCase().indexOf(search.toLowerCase())
  if (index === -1) return <>{text}</>

  const before = text.slice(0, index)
  const match = text.slice(index, index + search.length)
  const after = text.slice(index + search.length)

  return (
    <>
      {before}
      <span className="highlight">{match}</span>
      {after}
    </>
  )
}
