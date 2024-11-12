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
import Markdown from 'react-markdown';
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
export const Task=({
    id,
    title,
    desc,
    meta,
    taskviewOpen,
    setTaskviewOpen,
    taskeditOpen,
    setTaskeditOpen,
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
        <motion.div 
            className={`task ${!isNaN(state.meta.color)&&state.meta.color>=0&&state.meta.color<=7?`task_clr${state.meta.color}`:""}`} 
            id={`${btoa(title)}_${id}`.replaceAll("=","")} 
            onContextMenu={(e)=>{contextMenuHandler(e,{id,title,desc,meta})}}
            transition={{ delay:.1,duration:.15 }}
            initial={{
                opacity:0,
                scale:.95,
                y:5,}}
            whileInView={{
                opacity:1,
                scale:1,
                y:0,}}
            onDoubleClick={(e)=>{
                if(e.target.id==`${btoa(title)}_${id}`.replaceAll("=","")){
                    dispatch(setSelectedTask({...state,taskeditOpen:true}));
                    // document.getElementById("taskview").style.transform="translateX(0)";
                }
            }}>
                <div className="task_checkmarkWrapper">
                    <motion.label 
                        transition={{ delay:.15,duration:.15 }}
                        initial={{
                            opacity:0,
                            scale:.85,
                            y:5,}}
                        whileInView={{
                            opacity:1,
                            scale:1,
                            y:0,}}
                        className="checkmarkContainer">
                        <input type="checkbox" defaultChecked={state.meta.checked} onChange={(e)=>{
                            /* e.preventDefault();
                            e.stopPropagation(); */
                            dispatch(modifyState({
                                target: id,
                                new:{id,title,desc,meta:{...meta,checked:e.target.checked,}}
                            })); 
                        }}/><span className="checkmark"></span>
                    </motion.label>
                </div>
                <motion.div 
                    transition={{ delay:.2,duration:.15 }}
                    initial={{
                        opacity:0,
                        scale:.985,
                        y:5,}}
                    whileInView={{
                        opacity:1,
                        scale:1,
                        y:0,}}
                    className={`task_contentWrapper ${state.meta.checked?"checked":""}`}>
                    <h1 className="task_text">{state.title}</h1>
                    <ClampLines
                        text={state.desc}
                        lines={2}
                        className="task_desc"
                        id="desc"
                        moreText={<>Read More <FontAwesomeIcon icon={faChevronDown} /></>}
                        lessText={<>Read Less <FontAwesomeIcon icon={faChevronUp} /></>} />
                </motion.div>
                <motion.div
                    transition={{ delay:.25,duration:.15 }}
                    initial={{
                        opacity:0,
                        scale:.985,
                        y:5,}}
                    whileInView={{
                        opacity:1,
                        scale:1,
                        y:0,}}
                    className="task_dataWrapper">
                        {/* <p className="creationDateLabel">Creation time:</p>
                        <p className="creationDate">
                            {new Intl.DateTimeFormat('en-US', 
                                { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', })
                                    .format(state.meta.creationTime)}</p> */}
                        <p className="dueDateLabel">Due Date:</p>
                        <motion.input 
                            type="date" id="dueDate" 
                            defaultValue={new Date(state.meta.dueDate).toDateInputValue()} 
                            onFocus={(e)=>e.target.showPicker()}
                            onChange={(e)=>{setDueDate(e.target.valueAsNumber);}}
                            transition={{ delay:.3,duration:.15 }}
                            initial={{
                                opacity:0,
                                scale:.985,
                                y:5,}}
                            whileInView={{
                                opacity:1,
                                scale:1,
                                y:0,}}/>
                        <motion.div 
                            transition={{ delay:.35,duration:.15 }}
                            initial={{
                                opacity:0,
                                scale:.985,
                                y:5,}}
                            whileInView={{
                                opacity:1,
                                scale:1,
                                y:0,}}
                            className="task_optionsWapper">
                                <FontAwesomeIcon 
                                    icon={faTrash} 
                                    className="task_option_icon"
                                    onClick={(e)=>{
                                        /* e.preventDefault();
                                        e.stopPropagation(); */
                                        dispatch(removeTask(id));
                                        toast("Deleted Task Successfully",{autoClose:5000});
                                    }}/>
                                <FontAwesomeIcon 
                                    icon={faEdit} 
                                    className="task_option_icon"
                                    onClick={(e)=>{
                                        /* e.preventDefault();
                                        e.stopPropagation(); */
                                        dispatch(setSelectedTask(state));
                                        // document.getElementById("taskedit").style.transform="translateX(0)";
                                        setTaskeditOpen(true);
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
                        </motion.div>
                </motion.div>
        </motion.div>
    :null}</>);
}
