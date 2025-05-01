import SidebarCalendar from "./SidebarCalendar"
import SidebarHealthComponent from "./SidebarHealthComponent"
import SidebarBudgetComponent from "./SidebarBudgetComponent";
// import Calendar from "../calendar/calendar";

function LSidebarComponent() {
    return (
        <>
            <div className="sidebar sidebar-left bg-body-tertiary">
                <SidebarHealthComponent />
                <SidebarCalendar />
                <SidebarBudgetComponent />                
            </div>
        </>
    );
}

export default LSidebarComponent