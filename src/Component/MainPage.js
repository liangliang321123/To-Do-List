import { useState, useEffect } from 'react';
import '../CSS/MainPage.css';
import '../index.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MainPage = () => {

    const [isChecked, setIsChecked] = useState('');
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [priority, setPriority] = useState('Urgent');
    const [important, setImportant] = useState('Important');

    let editId = '';
    let editTaskName = '';
    let editTaskDescription = '';
    let editPriority = '';
    let editImportant = '';
    let editDueDate = '';

    const [data, setData] = useState('');

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get("https://localhost:44394/api/ToDoList")
            .then((result) => {
                setData(result.data)
                console.log(result.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleAdd = () => {

        if (taskName != '') {
            const url = `https://localhost:44394/api/ToDoList`;
            const data = {
                "isChecked": 0,
                "taskName": taskName,
                "taskDescription": null,
                "priority": priority,
                "important": important,
                "dueDate": null,
            }
            axios.post(url, data)
                .then((result) => {
                    getData();
                    clearData();

                })
        }
        else {
            alert("Please key in a Task Title!")
        }
    }

    const handleGetEditCheckBox = (id, editIsChecked) => {
        axios.get(`https://localhost:44394/api/ToDoList/${id}`)
            .then((result) => {
                editTaskName = result.data.taskName;
                editId = id;
                editTaskDescription = result.data.taskDescription;
                editPriority = result.data.priority;
                editImportant = result.data.important;
                editDueDate = result.data.dueDate

                console.log("Checking :" + editIsChecked);
                console.log(result.data);
                handleUpdate(editIsChecked);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleUpdate = (editIsChecked) => {
        const url = `https://localhost:44394/api/ToDoList/${editId}`
        console.log("what is this number" + editId);
        const data = {
            "Id": editId,
            "taskName": editTaskName,
            "taskDescription": editTaskDescription,
            "priority": editPriority,
            "important": editImportant,
            "dueDate": editDueDate,
            "isChecked": editIsChecked,
        }
        axios.put(url, data)
            .then((result) => {
                getData();
                clearData();
            })
            .catch((error) => {
                console.log(error.response.data);
            })
    }


    const handleDelete = (id) => {
        axios.delete(`https://localhost:44394/api/ToDoList/${id}`)
            .then((result) => {
                if (result.status === 200) {
                    getData();
                    alert("Delete Successfully");
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleActiveChange = (e, itemId) => {
        const editIsChecked = e.target.checked ? 1 : 0;
        handleGetEditCheckBox(itemId, editIsChecked);
    }

    const clearData = () => {
        setTaskName('');
        // setPriority('');
    }

    return (
        <div className='homePage_margin'>
            <div className="homePage_content">
                <h3>To Do List</h3>
                <header className="homePage_header">
                    <input
                        type="text"
                        placeholder="Add Task"
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <label>Urgency : </label>
                    <select onChange={(e) => setPriority(e.target.value)}>
                        <option value='Urgent'>Urgent</option>
                        <option value='Not Urgent'>Not Urgent</option>
                    </select>
                    <label>Importancy : </label>
                    <select onChange={(e) => setImportant(e.target.value)}>
                        <option value='Important'>Important</option>
                        <option value='Not Important'>Not important</option>
                    </select>
                    <button className="standard_button" onClick={() => handleAdd()}>Add Task</button>
                </header>
            </div>
            <div className="homePage_content_body">
                <header className="homePage_header">
                    <h3>Tasks</h3>
                    <Link to={`/ESHG/`}><button className="standard_button">Eisenhower Graph</button></Link>
                </header>

                <table className='table_form'>
                    <tr>
                        <th>CheckList</th>
                        <th>To-Do</th>
                        <th>Urgent?</th>
                        <th>Important?</th>
                        <th>Action</th>
                    </tr>
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>


                                        <td>
                                            <input
                                                type='checkbox'
                                                value={item.isChecked}
                                                checked={item.isChecked === 1 ? true : false}
                                                onChange={(e) => handleActiveChange(e, item.id)}
                                            />
                                        </td>
                                        <td>{item.taskName}</td>
                                        <td>{item.priority}</td>
                                        <td>{item.important}</td>
                                        <td colSpan={2}>
                                            <Link to={`/EDIT/${item.id}`}><button className="standard_button">Edit</button></Link>
                                            <button className="standard_button" onClick={() => handleDelete(item.id)}>Delete</button>
                                        </td>

                                    </tr>
                                )
                            })
                            : (
                                <td colSpan="5">No Task...</td>
                            )
                    }

                </table>
            </div>
        </div>
    )
}
export default MainPage