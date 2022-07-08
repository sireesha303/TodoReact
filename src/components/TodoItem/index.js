import './index.css'
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Component } from 'react';
import Cookies from 'js-cookie';
import UserContext from '../../context/UserContext';

class TodoItem extends Component{
    constructor(props){
        super(props);
        this.state = {isCompleted:this.props.todo.isCompleted,isDeleted:false}
    }
    static contextType = UserContext

    onChangeOfCheckbox = async () =>{
        const {todo} = this.props;
        const {id,title,isCompleted,owner} = todo;

        const todoUpdated = {id:id,title:title,is_completed:!isCompleted,owner:owner}

        var jwtToken = Cookies.get('todo-access-token');
        const url = `http://127.0.0.1:8000/todos/${id}/update/`;
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 
                    'application/json;charset=utf-8',
                Authorization: `Bearer ${jwtToken}`, 
            },
            body: JSON.stringify(todoUpdated)
        }

        // eslint-disable-next-line
        let response = await fetch(url, options);
        this.setState({isCompleted:!isCompleted})
    }
    
    deleteTodo = async () =>{
        const {todo} = this.props;
        const {id} = todo
        const url = `http://127.0.0.1:8000/todos/${id}/delete/`;

        var jwtToken = Cookies.get('todo-access-token');

        let options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 
                    'application/json;charset=utf-8',
                Authorization: `Bearer ${jwtToken}`, 
            },
        }

        let response = await fetch(url, options);
        this.setState({isDeleted:true})
        
    }

    

    render(){
        const {isDeleted,isCompleted} = this.state;
        const {todo} = this.props;
        const {id,title} = todo;
        const labelClass = isCompleted ? "todo-text-crossed":"todo-text";

        if(!isDeleted){
            return(
                <li className="todo-item-container">
                        <div className='text-delete-container'>
                            <div className='input-lable-container'>
                            {isCompleted ? <input type="checkbox" id={id} className="checkbox-el" onChange={this.onChangeOfCheckbox} checked></input>:<input type="checkbox" id={id} className="checkbox-el" onChange={this.onChangeOfCheckbox}></input>}
                            <label className={labelClass} htmlFor={id}>{title}</label>
                            </div>
                            <button onClick={this.deleteTodo} className="delete-button"><RiDeleteBin6Fill className='delete-icon'/></button>   
                        </div>      
                </li>     
            )
        }
        else{
            return null
        }

    }
}


export default TodoItem