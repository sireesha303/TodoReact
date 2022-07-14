import './index.css'
import { RiDeleteBin6Fill } from "react-icons/ri";


const TodoItem = props => {
    const {todo,updateTodo,deleteTodo} = props;
    const {id,title,isCompleted} = todo;

    const onChangeOfCheckbox = () =>{
        updateTodo(id)
    }
    
    const onClickOfDelete = () =>{
        deleteTodo(id)
        
    }


    const labelClass = isCompleted ? "todo-text-crossed":"todo-text";

    return(
        <li className="todo-item-container">
            <div className='text-delete-container'>
                <div className='input-lable-container'>
                    {isCompleted ? <input type="checkbox" id={id} className="checkbox-el" onChange={onChangeOfCheckbox} checked></input>:<input type="checkbox" id={id} className="checkbox-el" onChange={onChangeOfCheckbox}></input>}
                    <label className={labelClass} htmlFor={id}>{title}</label>
                </div>
                <button onClick={onClickOfDelete} className="delete-button"><RiDeleteBin6Fill className='delete-icon'/></button>   
            </div>      
        </li>     
    )
       
    
}


export default TodoItem