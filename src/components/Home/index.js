import {Component} from 'react'
import './index.css'
import TodoList  from'../TodoList'

const todoList =[
    {
        id:1,
        title:'learning frontend'
    },
    {
        id:2,
        title:'learning backend'
    }
    ,{
        id:3,
        title:'Watching Movie'
    },{
        id:4,
        title:'learning frontend'
    },
    {
        id:5,
        title:'learning backend'
    }
    ,{
        id:6,
        title:'Watching Movie'
    },{
        id:7,
        title:'learning frontend'
    },
    {
        id:8,
        title:'learning backend'
    }
    ,{
        id:9,
        title:'Watching Movie'
    },{
        id:10,
        title:'learning backend'
    }
    ,{
        id:11,
        title:'Watching Movie'
    }
]

class Home extends Component{
    state = {userSearchInput:""}

    onChangeOfInputEl = event =>{
        console.log(event.target.value);
        this.setState({userSearchInput:event.target.value})
    }
    onClickOfAddTask = () => {
        const taskDescription = {title:this.state.userSearchInput};
        console.log(taskDescription)
        const url = "https://todolist-django-backend.herokuapp.com/todo/";
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 
                    'application/json;charset=utf-8'
            },
            body: JSON.stringify(taskDescription)
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
                        <input className='input-el' id='todo-input' type="text" onChange={this.onChangeOfInputEl}/>
                        <button className='task-add-btn' onClick={this.onClickOfAddTask}>Add Task</button>
                    </div>
                    <TodoList  todoList={todoList}/>
                                    
                </div>    
            </div>
        )
    }
}

export default Home
