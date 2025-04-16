import { Card, Form } from "react-bootstrap"
import '../../App.css'

function ActivityItem() {
    return(
        <Card className="activity-item">
            <p>This is an Activity</p>
            <Form.Check type="checkbox" label="Done"/> 
        </Card>
    );
}

export default ActivityItem