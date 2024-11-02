import React, { useState, useEffect } from "react";
//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTrash, 
    faEdit, 
    faChevronDown, 
    faChevronUp, 
    faDotCircle,
    faCircle, 
    faStar 
} from '@fortawesome/free-solid-svg-icons';
import { 
    faStar as faStarBorder, 
    faCircle as faCircleDot 
} from '@fortawesome/free-regular-svg-icons';
//redux
import { useSelector, useDispatch } from 'react-redux'
import { addTask, removeTask, modifyState } from '../../store/slices/todo';
import { setSelectedTask } from '../../store/slices/selectedTask';
//external modules
import ClampLines from 'react-clamp-lines';
import { toast } from 'react-toastify';
export const Task=({
    id,
    title,
    desc,
    meta,
    contextMenuHandler=()=>{},
})=>{
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
            className={`task ${!isNaN(state.meta.color)&&state.meta.color>=0&&state.meta.color<=7?`task_clr${state.meta.color}`:""}`} 
            id={`${btoa(title)}_${id}`.replaceAll("=","")} 
            onContextMenu={(e)=>{contextMenuHandler(e,{id,title,desc,meta})}}
            onDoubleClick={(e)=>{
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
                        <FontAwesomeIcon 
                            icon={state.meta.important?faStar:faStarBorder}
                            className="task_option_icon"
                            onClick={(e)=>{
                                dispatch(modifyState({
                                    target: id,
                                    new:{id,title,desc,meta:{...meta,important:!state.meta.important,}}
                                })); 
                            }}/>
                        {/* for colors */}
                        <FontAwesomeIcon 
                            icon={!isNaN(state.meta.color)&&state.meta.color>=0&&state.meta.color<=7?faCircle:faCircleDot}
                            className={`task_option_icon clrselectico ${!isNaN(state.meta.color)&&state.meta.color>=0&&state.meta.color<=7?`task_clr${state.meta.color}_clrselectico`:""}`}
                            onClick={(e)=>{
                                // [...Array(7).keys(),NaN]
                                dispatch(modifyState({
                                    target: id,
                                    new:{id,title,desc,meta:{...meta,
                                        color:
                                            isNaN(state.meta.color)?0:
                                            state.meta.color<7?state.meta.color+1:
                                            state.meta.color>=7?NaN:NaN,
                                    }}
                                })); 
                            }}/>
                    </div>
                </div>
        </div>
    :null}</>);
}
