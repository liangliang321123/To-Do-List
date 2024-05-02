import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const EditPage = () => {
    const params = useParams();
    const itemID = params.ID;

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [important, setImportant] = useState('');
    const [isChecked, setIsChecked] = useState('');
    const [dueDate, setDueDate] = useState('');

    const getData = () => {
        axios.get(`https://localhost:44394/api/ToDoList/${itemID}`)
            .then((result) => {
                setTaskName(result.data.taskName);
                setTaskDescription(result.data.taskDescription);
                setPriority(result.data.priority);
                setImportant(result.data.important);
                setIsChecked(result.data.isChecked);
                setDueDate(result.data.dueDate);
            })
    }

    const handleUpdate = () => {
        const url = `https://localhost:44394/api/ToDoList/${itemID}`
        const data = {
            "Id": itemID,
            "taskName": taskName,
            "taskDescription": taskDescription,
            "priority": priority,
            "important": important,
            "dueDate": dueDate,
            "isChecked": isChecked,
        }
        axios.put(url, data)
            .then((result) => {
                getData();
                alert("Update Successfully");
            })
            .catch((error) => {
                console.log(error.response.data);
            })
    }

    const handleDelete = () => {
        axios.delete(`https://localhost:44394/api/ToDoList/${itemID}`)
            .then((result) => {
                if (result.status === 200) {
                    window.location.href = '/'; 
                    // getData();
                    // alert("Delete Successfully");
                    
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='homePage_margin'>
            <div className="homePage_content">
                <header className="homePage_header">
                    <h3>{taskName}</h3>
                    <select onChange={(e) => setPriority(e.target.value)} value={priority}>
                        <option value='normal'>normal</option>
                        <option value='important'>important</option>
                        <option value='not important'>not important</option>
                        <option value='urgent'>urgent</option>
                    </select>
                    <select onChange={(e) => setImportant(e.target.value)} value={priority}>
                        <option value='normal'>normal</option>
                        <option value='important'>important</option>
                        <option value='not important'>not important</option>
                        <option value='urgent'>urgent</option>
                    </select>
                    <button className="standard_button" onClick={() => handleDelete()}>Delete</button>
                    <Link to={`/`}><button className="standard_button" >Back</button></Link>
                </header>
                <textarea rows="7" cols="95"
                    onChange={(e) => setTaskDescription(e.target.value)}
                    value={taskDescription}
                />
                <button className="standard_button" onClick={() => handleUpdate()}>Save</button>
            </div>
        </div>
    )
}
export default EditPage