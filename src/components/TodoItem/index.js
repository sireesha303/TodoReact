import './index.css'
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Component } from 'react';

// const TodoItem = props =>{
//     const {title,id} = props;
//     console.log(title);
    
//     return(
        
//         <li className="todo-item-container">
//             <input type="checkbox" id={id} className="checkbox-el" ></input>
//             <div className='test-delete-icon'>
//             <label className="todo-text" htmlFor={id}>{title}</label>
//             <RiDeleteBin6Fill className='delete-icon'/>
//             </div>
            
//         </li>
        
        
//     )
// }

class TodoItem extends Component{
    constructor(props){
        super(props);
        this.state = {isChecked:false}
    }
    
    onChangeOfCheckbox = () =>{
        this.setState(prevState=>({isChecked:!prevState.isChecked}))
    }

    render(){
        const {isChecked} = this.state;
        const {id,title} = this.props;
        const labelClass = isChecked ? "todo-text-crossed":"todo-text";

        return(
            <li className="todo-item-container">
                <div className='text-delete-container'>
                    <div className='input-lable-container'>
                        <input type="checkbox" id={id} className="checkbox-el" onChange={this.onChangeOfCheckbox}></input>
                        <label className={labelClass} htmlFor={id}>{title}</label>
                    </div>
                    <RiDeleteBin6Fill className='delete-icon'/>
                </div>
                        
            </li>
        )

    }
}


export default TodoItem