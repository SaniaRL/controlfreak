import TaskList from "./TaskList/Tasklist";

//Knapp för om avslutade ska visas

function RSidebarComponent() {
    return(
        <div className="sidebar sidebar-right bg-body-tertiary">
            <TaskList showCompletedTasks={false}/>
        </div>
    );
}

export default RSidebarComponent