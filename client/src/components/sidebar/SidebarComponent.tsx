import SidebarCalendar from "./SidebarCalendar"
import SidebarHealthComponent from "./SidebarHealthComponent"
import SidebarBudgetComponent from "./SidebarBudgetComponent";

function SidebarComponent() {
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

export default SidebarComponent