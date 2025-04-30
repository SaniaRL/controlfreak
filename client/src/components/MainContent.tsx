import ActivityfeedComponent from "./activityfeed/activityfeedComponent";
import Calendar from "./calendar/calendar";
import LSidebarComponent from "./sidebar-left/LSidebarComponent";
import RSidebarComponent from "./sidebar-right/RSidebarComponent";


function MainContent({ view }: { view: string }) {
    return(
      <div className="main-content">
      <LSidebarComponent />
      { view === 'activity' ? <ActivityfeedComponent /> : <Calendar />}
      <RSidebarComponent />
      </div>
    );
}

export default MainContent