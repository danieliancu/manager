import React, {useState, useEffect} from 'react'
 

function Task(){

    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState(
        JSON.parse(localStorage.getItem("tasks")) || []
    );
    const [priority, setPriority] = useState(
        localStorage.getItem("priority") || "Normal"
    );
    const [done, setDone] = useState(
        JSON.parse(localStorage.getItem("done")) || []
    );

    // Actualizați Local Storage atunci când stările se schimbă
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem("priority", priority);
    }, [priority]);

    useEffect(() => {
        localStorage.setItem("done", JSON.stringify(done));
    }, [done]);

    const dataDisplay = new Date().toLocaleString('us-US', {
        month:  'numeric',
        day:    'numeric',
        hour:   'numeric',
        minute: 'numeric',
        second: 'numeric'
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if(task){
            setTasks(prev=>[...prev, {title:task, priority:priority, date: dataDisplay}])
            setTask("")
            setPriority("Normal")
        }
    }

    const deleteTask = (date) => {
        setTasks(prev=>prev.filter(item=>item.date!==date))
    }

    const deleteTaskDone = (date) => {
        setDone(prev=>prev.filter(item=>item.date!==date))
    }

    const changePriority = (newPriority, date) => {
        setTasks(prev=>prev.map(task=>task.date===date?{...task, priority:newPriority}:task))
    }

    const moveTask = (date) => {
        const taskToMove = tasks.find(task=>task.date===date)
        const updatedTask = {...taskToMove, newDate: dataDisplay}
        setDone(prev=>[...prev, updatedTask])
        setTasks(prev=>prev.filter(item=>item.date!==date))
    }

    const moveTaskBack = (date) => {
        const taskToMoveBack = done.find(item=>item.date===date)
        setTasks(prev=>[...prev, taskToMoveBack])
        setDone(prev=>prev.filter(item=>item.date!==date))
    }


    return (
        <div className="container">
            <div className="card">
                <h2>Input a task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="inputs">
                        <select
                            value={priority}
                            onChange = {(e)=>setPriority(prev=>e.target.value)}
                        >
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
                    </div>
                </form>
            </div>

            <div className="card">
                <h2>Tasks in progress</h2>
                {tasks.map((item, index)=>
                    <div
                        className={`${item.priority} task`}
                        key={index}
                    >
                        <div style={{fontWeight:"bold"}}>
                            {item.title}
                        </div>
                        <div>
                            <select
                                className="details"
                                value={item.priority}
                                onChange={(e)=>changePriority(e.target.value, item.date)}
                            >
                                <option>Normal</option>
                                <option>Low</option>
                                <option>High</option>                            
                            </select>
                            
                            <span className="details">{item.date}</span>
                            <span
                                onClick={()=>deleteTask(item.date)}
                                className="x">
                                    &times;
                            </span>
                            <span
                                onClick={()=>moveTask(item.date)}
                                className="v"
                            >
                                <i class="bi bi-check"></i>
                            </span>
                        </div>
                    </div>
                )}
            </div>
            <div className="card">
                <h2>Tasks done</h2>
                {done.map((item, index)=>
                    <div className="task taskDone">
                        <div style={{fontWeight:"bold"}}>
                            {item.title}
                        </div>
                        <div>
                            <span className='details'>
                                {item.date}
                            </span>
                            <span
                                className="x"
                                onClick={()=>deleteTaskDone(item.date)}
                            >
                                &times;
                            </span>
                            <span
                                className="u"
                                onClick={()=>moveTaskBack(item.date)}
                            >
                                <i class="bi bi-arrow-counterclockwise"></i>
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Task