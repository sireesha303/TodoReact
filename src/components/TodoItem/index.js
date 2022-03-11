import './index.css'

const TodoItem = props =>{
    const {title,id} = props;
    console.log(title);

    return(
        
        <li className="todo-item-container">
            <input type="checkbox" id={id} className="checkbox-el"></input>
            <label className="todo-text" htmlFor={id}>{title}</label>
        </li>
        
        
    )
}

export default TodoItem