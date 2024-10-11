import React,{ useState, useEffect } from 'react';
import "./style/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux'
import { addTask, removeTask, modifyState } from '../store/slices/todo';
import { $with, generateId } from '../modules/lib';
import { Task } from './modules/Task';
const App=(prop)=>{
    const todo=useSelector(state=>state.todo);
    const dispatch=useDispatch();
    useEffect(()=>{
        console.table(todo);
        document.getElementById("home").click(); // to update screen (bc states r kinda broken)
        document.getElementById("taskWrapper").scrollTop=document.getElementById("taskWrapper").scrollHeight;
    },[todo]);
    const HomeTab=({})=>{
        return(<>
            <div id="taskWrapper">
                {todo.map(({id,title,desc,meta},index)=><Task
                    id={id}
                    title={title}
                    desc={desc}
                    meta={meta}
                    key={`task_${id}_${btoa(title)}`.replaceAll("=","")}/>)}
            </div>
            <div id="taskScrollShade"></div>
            <div id="taskCreateInputWrapper">
                <div id="taskCreateTitleWrapper">
                    <input 
                        type="text"
                        placeholder="Task Title"
                        id="taskCreateTitle" 
                        onKeyPress={(e)=>{
                            switch(e.key){
                                case "Enter":
                                    e.preventDefault();
                                    document.getElementById("taskCreateDescription").focus();
                                break;
                            }
                        }} />
                </div>
                <div id="taskCreateDescriptionWrapper">
                    <input 
                        type="text"
                        placeholder="Task Description"
                        id="taskCreateDescription"
                        onKeyPress={(e)=>{
                            switch(e.key){
                                case "Enter":
                                    e.preventDefault();
                                    e.target.blur();
                                    document.getElementById("taskCreateButton").click();
                                break;
                            }
                        }} />
                </div>
                <div id="taskCreateButtonWrapper">
                    <button id="taskCreateButton" onClick={(e)=>{
                        e.preventDefault();
                        $with(document.getElementById("taskCreateTitle").value).then((title)=>{
                        $with(document.getElementById("taskCreateDescription").value).then((desc)=>{
                            dispatch(addTask({
                                title,
                                desc,
                                id:generateId(),
                                meta:{},
                            }));
                        });});
                    }}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </div>
        </>)
    }
    const tabs={
        home:{id:generateId(),title:"Home",content:HomeTab},
    };
    const[currentTabs,setCurrentTabs]=useState(tabs.home);
    return (<>
        <div id="sidebar">
            <button 
                id="home" 
                className="sbbutton" 
                onClick={()=>{setCurrentTabs(tabs.home)}}>
                    <FontAwesomeIcon icon={faHome} className='sbicon'/>
            </button>
        </div>
        <div>
            <div id="content">
                <currentTabs.content/>
            </div>
        </div>
    </>);
}
export default App;
