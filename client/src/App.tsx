import { useState } from "react"
import MainContent from "./components/MainContent"
import NavbarComponent from "./components/navbar/NavbarComponent"

function App() {
  const [view, setView] = useState('activity')

  return (
    <>
      <NavbarComponent currentView={view} setView={setView} />
      <MainContent view={view} />
    </>
  )
}

export default App