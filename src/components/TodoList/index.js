import './index.css'
import TodoItem from '../TodoItem/index'

const TodoList = props =>{
    const {todoList} = props;
    
    return(
        <div className='todo-list-container'>
            <ul className="todo-list">
                {todoList.map(eachTodo=>(<TodoItem title={eachTodo.title} key={eachTodo.id}/>))}
            </ul>
        </div>
       
    )
}

export default TodoList