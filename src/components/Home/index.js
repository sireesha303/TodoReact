import {Component} from 'react'
import './index.css'
import TodoList  from'../TodoList';
import Header from '../Header';
import Cookies from 'js-cookie';


// const todoList =[
//     {
//         id:1,
//         title:'learning frontend'
//     },
//     {
//         id:2,
//         title:'learning backend'
//     }
//     ,{
//         id:3,
//         title:'Watching Movie'
//     },{
//         id:4,
//         title:'learning frontend'
//     },
//     {
//         id:5,
//         title:'learning backend'
//     }
//     ,{
//         id:6,
//         title:'Watching Movie'
//     },{
//         id:7,
//         title:'learning frontend'
//     },
//     {
//         id:8,
//         title:'learning backend'
//     }
//     ,{
//         id:9,
//         title:'Watching Movie'
//     },{
//         id:10,
//         title:'learning backend'
//     }
//     ,{
//         id:11,
//         title:'Watching Movie'
//     }
// ]

class Home extends Component{
    state = {userSearchInput:"",todoList:[]}

    componentDidMount() {
        this.loadMyTasks()
      }

    onChangeOfInputEl = event =>{
        console.log(event.target.value);
        this.setState({userSearchInput:event.target.value})
    }
    onClickOfAddTask = () => {
        const taskDescription = {title:this.state.userSearchInput,is_completed:false,owner:"0b9b5cb5-161f-4279-a2df-7b4c8bc9bc45"};
        const jwtToken = Cookies.get('todo-access-token');
        const url = "http://127.0.0.1:8000/todos/add/";
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 
                    'application/json;charset=utf-8',
                Authorization: `Bearer ${jwtToken}`,    
            },
            body: JSON.stringify(taskDescription)
        }

        let fetchRes = fetch(url, options);
        fetchRes.then(res =>res.json()).then(d => {
                            console.log(d)
        })
        this.setState({userSearchInput:""});
        this.loadMyTasks();
    }
    loadMyTasks = async () =>{
        const url = "http://127.0.0.1:8000/todos/";
        const jwtToken = Cookies.get('todo-access-token');

        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 
                    'application/json;charset=utf-8',
                    Authorization: `Bearer ${jwtToken}`,
            },
        }
        const response = await fetch(url, options);
        console.log(response)
        const todoList = await response.json()
        console.log(todoList)
        this.setState({todoList:todoList})
    }

    render(){
       const {todoList} = this.state;

        return(
            <div className='app-bg-container'>
                <Header />
                <h1 className='main-heading'>My Tasks</h1>
                <div className='app-todo-container'>

                    <label htmlFor='todo-input' className='label-el'>Create Task</label>
                    <div className='btn-input-container'>
                        <input className='input-el' id='todo-input' type="text" onChange={this.onChangeOfInputEl} value={this.state.userSearchInput}/>
                        <button className='task-add-btn' onClick={this.onClickOfAddTask}>Add Task</button>
                    </div>
                    <TodoList  todoList={todoList}/>
                                    
                </div>    
            </div>
        )
    }
}

export default Home
