import React, {useState} from 'react'
 

function Task(){

    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState([])
    const [priority, setPriority] = useState("Normal")

    const handleSubmit = (e) => {
        e.preventDefault()
        if(task){
            setTasks(prev=>[...prev, {title:task, priority:priority, date: new Date()}])
            setTask("")
        }
    }

    const deleteTask = (date) => {
        setTasks(prev=>prev.filter(item=>item.date!==date))
    }



    return (
        <div className="container">
            <h2>Input a task</h2>
            <form onSubmit={handleSubmit}>
            <select onChange = {(e)=>setPriority(prev=>e.target.value)}>
                <option>Normal</option>
                <option>Low</option>
                <option>High</option>
            </select>
            <input
                type="text"
                value={task}
                placeholder="Write here..."
                onChange={(e)=>setTask(prev=>e.target.value)}
            />
            <button type="submit">Add new</button>
            </form>
            <hr />
            <h2>Tasks in progress</h2>
            {tasks.map((item, index)=>
                <div
                    className={`${item.priority} task`}
                    key={index}
                >
                    <div>
                        {index+1}. {item.title}
                    </div>
                    <div>
                        <span
                            onClick={()=>deleteTask(item.date)}
                            className="x">
                                &times;
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Task