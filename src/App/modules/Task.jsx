import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCaretDown, faCaretUp, faChevronDown, faChevronUp, faDotCircle, faCircleDot, faCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux'
import { addTask, removeTask, modifyState } from '../../store/slices/todo';
import { setSelectedTask } from '../../store/slices/selectedTask';
import ClampLines from 'react-clamp-lines';
import React, { useState, useEffect } from "react";
import { faCircleDown } from '@fortawesome/free-solid-svg-icons/faCircleDown';
export const Task=({id,title,desc,meta})=>{
    const todo=useSelector(state=>state.todo);
    const selectedTask=useSelector(state=>state.selectedTask);
    const state=useSelector(state=>state.todo[state.todo.findIndex(data=>data.id==id)]);
    // console.log(state); // for debug
    const dispatch=useDispatch();
    const setDueDate=(value)=>{
        dispatch(modifyState({
            target: id,
            new:{id,title,desc,meta:{...meta,dueDate:value,}}
        })); 
    }
    return(<>{state?
        <div 
            className="task" 
            id={`${btoa(title)}_${id}`.replaceAll("=","")} 
            onClick={(e)=>{
                if(e.target.id==`${btoa(title)}_${id}`.replaceAll("=","")){
                    dispatch(setSelectedTask(state));
                    document.getElementById("taskview").style.transform="translateX(0)";
                }
            }}>
                <div className="task_checkmarkWrapper">
                    <label className="checkmarkContainer">
                        <input type="checkbox" defaultChecked={state.meta.checked} onChange={(e)=>{
                            /* e.preventDefault();
                            e.stopPropagation(); */
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
                    {/* <p className="creationDateLabel">Creation time:</p>
                    <p className="creationDate">
                        {new Intl.DateTimeFormat('en-US', 
                            { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', })
                                .format(state.meta.creationTime)}</p> */}
                    <p className="dueDateLabel">Due Date:</p>
                    <input type="date" id="dueDate" 
                        defaultValue={new Date(state.meta.dueDate).toDateInputValue()} 
                        onFocus={(e)=>e.target.showPicker()}
                        onChange={(e)=>{setDueDate(e.target.valueAsNumber);}}/>
                    <div className="task_optionsWapper">
                        <FontAwesomeIcon 
                            icon={faTrash} 
                            className="task_option_icon"
                            onClick={(e)=>{
                                /* e.preventDefault();
                                e.stopPropagation(); */
                                dispatch(removeTask(id));
                            }}/>
                        <FontAwesomeIcon 
                            icon={faEdit} 
                            className="task_option_icon"
                            onClick={(e)=>{
                                /* e.preventDefault();
                                e.stopPropagation(); */
                                dispatch(setSelectedTask(state));
                                document.getElementById("taskedit").style.transform="translateX(0)";
                                document.getElementById("taskedit_title").focus();
                            }}/>
                        {/* for colors */}
                        {/* <FontAwesomeIcon 
                            icon={faCircle} 
                            className="task_option_icon"
                            onClick={(e)=>{
                                // ["red","orange","yellow","green","blue","purple","pink","white"]

                            }}/> */}
                    </div>
                </div>
        </div>
    :null}</>);
}
