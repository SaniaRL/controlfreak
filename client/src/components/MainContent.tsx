import ActivityfeedComponent from "./activityfeed/activityfeedComponent";
import Calendar from "./calendar/calendar";
import SidebarComponent from "./sidebar/SidebarComponent";


function MainContent({ view }: { view: string }) {
    return(
      <div className="main-content">
      <SidebarComponent />
      { view === 'activity' ? <ActivityfeedComponent /> : <Calendar />}
      </div>
    );
}

export default MainContent