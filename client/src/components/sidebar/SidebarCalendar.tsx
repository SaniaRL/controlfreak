import { Table, Button } from "react-bootstrap"

//Jag vill att alla dagar är knappar och att knapparna har olika färg baserat på om de har innehåll eller inte och
//Har en border kanske om det är dagens datum

const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day;
};

//Hämta rätt data och kolla vilken dag som ska komma först etc
function SidebarCalendar() {
    const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

    return(
        <>
        <Table bordered striped className="sidebar-calendar">
          <tbody>
            {Array.from({ length: 5 }, (_, rowIndex) => (
              <tr key={rowIndex}>
                {daysInMonth.slice(rowIndex * 7, rowIndex * 7 + 7).map((day) => (
                  <td key={day}>
                    <p className={isToday(day) ? 'text-danger' : 'text-secondary'}>
                      {day}
                    </p>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        </>
    );
}

export default SidebarCalendar