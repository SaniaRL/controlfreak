import { useState } from 'react'

import MainContent from './components/MainContent'
import NavbarComponent from './components/navbar/NavbarComponent'

export default function App() {
  const [view, setView] = useState('activity')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <>
      <NavbarComponent 
        currentView={view} 
        setView={setView} />

      <MainContent 
        view={view} 
        setIsLoading={setIsLoading} 
        setError={setError}
        setView={setView}/>

      {/* Footer for loading */}
    </>
  )
}
