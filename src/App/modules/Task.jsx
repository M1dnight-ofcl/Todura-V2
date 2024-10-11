import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux'
import { addTask, removeTask, modifyState } from '../../store/slices/todo';
import React, { useState, useEffect } from "react";
export const Task=({id,title,desc,meta})=>{
    const todo=useSelector(state=>state.todo);
    const state=useSelector(state=>state.todo[state.todo.findIndex(data=>data.id==id)]);
    // console.log(state); // for debug
    const dispatch=useDispatch();
    return(<>
        <div className="task" id={`${btoa(title)}_${id}`.replaceAll("=","")}>
            <div className="task_checkmarkWrapper">
                <label className="checkmarkContainer">
                    <input type="checkbox" defaultChecked={state.meta.checked} onChange={(e)=>{
                        dispatch(modifyState({
                            target: id,
                            new:{id,title,desc,meta:{...meta,checked:e.target.checked,}}
                        })); 
                    }}/><span className="checkmark"></span>
                </label>
            </div>
            <div className={`task_contentWrapper ${state.meta.checked?"checked":""}`}>
                <h1 className="task_text">{state.title}</h1>
                <p className="task_desc">{state.desc}</p>
            </div>
            <div className="task_dataWrapper">
                <p className="creationDateLabel">Creation time:</p>
                <p className="creationDate">
                    {new Intl.DateTimeFormat('en-US', 
                        { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', })
                            .format(state.meta.creationTime)}</p>
                <div className="task_optionsWapper">
                    <FontAwesomeIcon 
                        icon={faTrash} 
                        className="task_option_icon"
                        onClick={(e)=>{
                            dispatch(removeTask(id));
                        }}/>
                    <FontAwesomeIcon 
                        icon={faEdit} 
                        className="task_option_icon"
                        onClick={(e)=>{
                            
                        }}/>
                </div>
            </div>
        </div>
    </>);
}
