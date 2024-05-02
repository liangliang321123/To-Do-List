//import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Eisenhower = () => {

    const [data, setData] = useState('');

    const getData = () => {
        axios.get(`https://localhost:44394/api/ToDoList`)
            .then((result) => {
                setData(result.data);
            })
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='homePage_margin'>
            <div className="homePage_content">
                <div className="homePage_header">
                    <h2>Eisenhower Graph</h2>
                    <Link to={'/'}><button className="standard_button">Back</button></Link>
                </div>
                <header className="seperate_content">
                    <p>Urgent</p>
                    <p>Not Urgent</p>
                </header>
                <div class="seperate_content">
                    <div>
                        <p class="width_50">Important</p>
                        <p class="width_50" >Not Important</p>
                    </div>

                    <div class="width_100">
                        <div class="row noMargin">
                            <div class="one">
                                {
                                    data && data.length > 0 ?
                                        data.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    {item.priority === "Urgent" && item.important === "Important" ? (<td>{item.taskName}</td>) : (<br></br>)}
                                                </tr>
                                            )
                                        })
                                        : (
                                            <td colSpan="5">No Task...</td>
                                        )
                                }
                            </div>
                            <div class="two">
                                {
                                    data && data.length > 0 ?
                                        data.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    {item.priority === "Not Urgent" && item.important === "Important" ? (<td>{item.taskName}</td>) : (<p></p>)}
                                                </tr>
                                            )
                                        })
                                        : (
                                            <td colSpan="5">No Task...</td>
                                        )
                                }
                            </div>
                        </div>
                        <div class="row noMargin">
                            <div class="three">
                                {
                                    data && data.length > 0 ?
                                        data.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    {item.priority === "Urgent" && item.important === "Not Important" ? (<td>{item.taskName}</td>) : (<p></p>)}
                                                </tr>
                                            )
                                        })
                                        : (
                                            <td colSpan="5">No Task...</td>
                                        )
                                }
                            </div>
                            <div class="four">
                                {
                                    data && data.length > 0 ?
                                        data.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    {item.priority === "Not Urgent" && item.important === "Not Important" ? (<td>{item.taskName}</td>) : (<p></p>)}
                                                </tr>
                                            )
                                        })
                                        : (
                                            <td colSpan="5">No Task...</td>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Eisenhower