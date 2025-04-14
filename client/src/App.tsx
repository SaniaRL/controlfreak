import NavbarComponent from "./components/navbar/NavbarComponent"
import SidebarComponent from "./components/sidebar/SidebarComponent"
import ActivityfeedComponent from "./components/activityfeed/activityfeedComponent"

function App() {
  return (
    <>
      <NavbarComponent />
        <div className="main-content">
          <SidebarComponent />
          <ActivityfeedComponent />
        </div>
    </>
  )
}

export default App