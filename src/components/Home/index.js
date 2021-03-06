import { useEffect, useState,useContext} from 'react'
import './index.css'
import Header from '../Header';
import AuthContext from '../../context/UserContext';
import TodoItem from '../TodoItem';

const Home = () => {
    const [todoInput,setTodoInput] = useState("")
    const [todoList,setTodoList]  = useState([])
    const [isTodoAddingFailed,setTodoAddingFailedStatus] = useState(false)
    const [isTodosExisted,setIsTodosExisted] = useState()

    let {user,accessToken} = useContext(AuthContext)
    let jwtToken = accessToken.access
    let userId = user.user_id

    const onChangeOfInputEl = event =>{
        setTodoInput(event.target.value)
    }

    const onClickOfAddTask = async () => {
        const taskDescription = {title:todoInput,is_completed:false,owner:user.user_id};
        const jwtToken = accessToken.access

        const url = "https://todoapp-django-backend.herokuapp.com/todos/add/";
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 
                    'application/json;charset=utf-8',
                Authorization: `Bearer ${jwtToken}`,    
            },
            body: JSON.stringify(taskDescription)
        }

        let response = await fetch(url, options);
        if(response.status === 200){
            loadMyTasks();
            setTodoInput("")
        }
        else{
            setTodoAddingFailedStatus(true)
        }
        
    }

    const loadMyTasks = async () =>{
        const url = "https://todoapp-django-backend.herokuapp.com/todos/";
        const jwtToken = accessToken.access;
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 
                    'application/json;charset=utf-8',
                    Authorization: `Bearer ${jwtToken}`,
            },
        }
        const response = await fetch(url, options);
        const todoListFromBackend = await response.json()
        const updatedTodoList = todoListFromBackend.map(eachTodo =>({
            id:eachTodo.id,
            title:eachTodo.title,
            isCompleted:eachTodo.is_completed,
            owner:eachTodo.owner
        }))
        setTodoList(updatedTodoList)
        console.log(updatedTodoList.length)
        if(updatedTodoList.length>0){
            setIsTodosExisted(true)
        }else{
            setIsTodosExisted(false)
        }
    }

    const updateTodo = async id =>{
        for(const todo of todoList){
            if(todo.id === id){
                var updatedTodo = todo
            }
        }

        if(updatedTodo !== null || updateTodo !== undefined){
            const {title,isCompleted} = updatedTodo;

            const todoUpdated = {id:id,title:title,is_completed:!isCompleted,owner:userId}

        
            const url = `https://todoapp-django-backend.herokuapp.com/todos/${id}/update/`;
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 
                        'application/json;charset=utf-8',
                    Authorization: `Bearer ${jwtToken}`, 
                },
                body: JSON.stringify(todoUpdated)
            }

            let response = await fetch(url, options);
            if(response.status === 200){
                alert("your todo updated successfully..")
                loadMyTasks()
            }
            else{
                alert("your updation failed..")
            }

        }  
    }
    
    const deleteTodo = async id =>{
        const url = `https://todoapp-django-backend.herokuapp.com/todos/${id}/delete/`;

        let options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 
                    'application/json;charset=utf-8',
                Authorization: `Bearer ${jwtToken}`, 
            },
        }

        let response = await fetch(url, options);
        if(response.status === 200){
            alert("your todo deleted successfully..")
            loadMyTasks()
        }
        else{
            alert("your deletion failed..")
        }
    }

    useEffect(() =>{
        loadMyTasks()
    }
    ,[])
    
    return(
        <div className='app-bg-container'>
            <Header />
            <h1 className='main-heading'>My Tasks</h1>
            <div className='app-todo-container'>
                <label htmlFor='todo-input' className='label-el'>Create Task</label>
                <div className='btn-input-container'>
                    <input className='input-el' id='todo-input' type="text" onChange={onChangeOfInputEl} value={todoInput}/>
                    <button className='task-add-btn' onClick={onClickOfAddTask}>Add Task</button>
                </div>
                {isTodoAddingFailed && <p>Some thing went wrong, your todo not added.</p>}
                {isTodosExisted ? 
                    <div className='todo-list-container'>
                        <ul className="todo-list">
                            {todoList.map(eachTodo=>(<TodoItem todo={eachTodo} key={eachTodo.id} updateTodo={updateTodo} deleteTodo={deleteTodo}/>))}
                        </ul>
                    </div>:<div className='no-todos-container'>
                        <img src="https://res.cloudinary.com/sireesha30/image/upload/v1657094877/mployee-empowerment_gsmdq9.png" alt="productiveity-img" className='productivity-img'/>
                        <p className='no-todos-text'>You don't have any Todos existed..add here your Todo's to increase Productivity!..</p>
                    </div>
                   
                }
                    
                
                                    
            </div>    
        </div>
    )
}

export default Home
