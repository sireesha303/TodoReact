import {Component} from 'react'
import './index.css'
import TodoList  from'../TodoList';
import Header from '../Header';
import Cookies from 'js-cookie';
import UserContext from '../../context/UserContext';


class Home extends Component{
    state = {userSearchInput:"",todoList:[]}
    static contextType = UserContext;

    componentDidMount() {
        this.loadMyTasks()
      }

    componentDidUpdate(){
        this.loadMyTasks()
    }
    
    onChangeOfInputEl = event =>{
        console.log(event.target.value);
        this.setState({userSearchInput:event.target.value})
    }

    onClickOfAddTask = () => {
        const context = this.context;
        const taskDescription = {title:this.state.userSearchInput,is_completed:false,owner:context.userId};
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
        // console.log(response)
        const todoList = await response.json()
        // console.log(todoList)
        const updatedTodoList = todoList.map(eachTodo =>({
            id:eachTodo.id,
            title:eachTodo.title,
            isCompleted:eachTodo.is_completed,
            owner:eachTodo.owner
        }))
        this.setState({todoList:updatedTodoList})
    }

    render(){
       const {todoList} = this.state;
       const context = this.context;
    //    console.log(context)

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
