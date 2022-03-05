import {Component} from 'react'
import './index.css'

class Home extends Component{
    state = {userSearchInput:""}

    onClickOfAddTask =event=>{
        const taskDescription = {title:'Learning BootStrap'};
        console.log(taskDescription)
        const url = "https://todolist-django-backend.herokuapp.com/todo/";
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 
                    'application/json;charset=utf-8'
            },
            // body: JSON.stringify(taskDescription)
        }

        let fetchRes = fetch(url, options);
        fetchRes.then(res =>res.json()).then(d => {
                            console.log(d)
        })
    }

    render(){
        return(
            <div className='app-bg-container'>
                <h1 className='main-heading'>My Tasks</h1>
                <div className='app-todo-container'>

                    <label htmlFor='todo-input' className='label-el'>Create Task</label>
                    <div className='btn-input-container'>
                        <input className='input-el' id='todo-input' type="search"/>
                        <button className='task-add-btn' onClick={this.onClickOfAddTask}>Add Task</button>
                    </div>
                    
                </div>    
            </div>
        )
    }
}

export default Home
