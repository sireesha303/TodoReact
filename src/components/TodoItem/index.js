import './index.css'
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Component } from 'react';

class TodoItem extends Component{
    constructor(props){
        super(props);
        this.state = {isChecked:false, isDeleted:false,isOpen:false}
    }
    
    onChangeOfCheckbox = () =>{
        this.setState(prevState=>({isChecked:!prevState.isChecked}))
    }
    
    deleteTodo = async () =>{
        const {id} = this.props;
        const url = `https://todolist-django-backend.herokuapp.com/todo/${id}/`;
        console.log("url",url);
        let options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 
                    'application/json;charset=utf-8'
            },
        }

        let response = await fetch(url, options);
        console.log(response);
        this.setState({isDeleted:true})
        
    }

    openModal = () =>{
        console.log("opende modal");
        this.setState({isOpen:true})
    }

    closeModal = () =>{
        console.log("closed modal");
        this.setState({isOpen:false})
    }

    render(){
        const {isChecked,isDeleted} = this.state;
        const {id,title} = this.props;
        const labelClass = isChecked ? "todo-text-crossed":"todo-text";

        if(!isDeleted){
            return(
                <li className="todo-item-container">
                        <div className='text-delete-container'>
                            <div className='input-lable-container'>
                                <input type="checkbox" id={id} className="checkbox-el" onChange={this.onChangeOfCheckbox}></input>
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