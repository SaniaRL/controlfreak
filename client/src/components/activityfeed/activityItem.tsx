import { Card, Form } from "react-bootstrap"
import '../../App.css'

function ActivityItem({ description, isCompleted }: { description: string; isCompleted: boolean }) {
    return(
        <Card className="activity-item">
            <p>{description}</p>
            <Form.Check type="checkbox" label="Done" checked={isCompleted} /> 
        </Card>
    );
}

export default ActivityItem