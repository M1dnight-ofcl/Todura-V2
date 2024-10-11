import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCaretDown, faCaretUp, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux'
import { addTask, removeTask, modifyState } from '../../store/slices/todo';
import { setSelectedTask } from '../../store/slices/selectedTask';
import ClampLines from 'react-clamp-lines';
import React, { useState, useEffect } from "react";
export const Task=({id,title,desc,meta})=>{
    const todo=useSelector(state=>state.todo);
    const selectedTask=useSelector(state=>state.selectedTask);
    const state=useSelector(state=>state.todo[state.todo.findIndex(data=>data.id==id)]);
    // console.log(state); // for debug
    const dispatch=useDispatch();
    return(<>{state?
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
                <ClampLines
                    text={state.desc}
                    lines={2}
                    className="task_desc"
                    id="desc"
                    moreText={<>Read More <FontAwesomeIcon icon={faChevronDown} /></>}
                    lessText={<>Read Less <FontAwesomeIcon icon={faChevronUp} /></>} />
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
                            dispatch(setSelectedTask(state));
                            document.getElementById("taskview").style.transform="translateX(0)";
                            document.getElementById("taskview_title").focus();
                        }}/>
                </div>
            </div>
        </div>
    :null}</>);
}
