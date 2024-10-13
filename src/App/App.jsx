import React,{ useState, useEffect } from 'react';
import "./style/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faGear } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, removeTask, modifyState } from '../store/slices/todo';
import { setSelectedTask } from '../store/slices/selectedTask';
import { $with, generateId } from '../modules/lib';
import { Task } from './modules/Task';
import { SettingsTab } from './modules/Settings';
import { Helmet } from 'react-helmet-async';
const App=(prop)=>{
    const todo=useSelector(state=>state.todo);
    const selectedTask=useSelector(state=>state.selectedTask);
    const settings=useSelector(state=>state.settings);
    const dispatch=useDispatch();
    useEffect(()=>{
        console.table(todo);
        document.getElementById("home").click(); // to update screen (bc states r kinda broken)
        document.getElementById("taskWrapper").scrollTop=document.getElementById("taskWrapper").scrollHeight;
    },[todo]);
    useEffect(()=>{
        console.table(selectedTask);
    },[selectedTask]);
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
                        onKeyDown={(e)=>{
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
                        onKeyDown={(e)=>{
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
        </>);
    }
    const tabs={
        home:{id:generateId(),title:"Home",content:HomeTab},
        settings:{id:generateId(),title:"Settings",content:SettingsTab},
    };
    const[currentTabs,setCurrentTabs]=useState(tabs.home);
    return(<>
        <Helmet>
            <title>Todura V2</title>
            <link rel="stylesheet" id="theme" href={`/themes/${settings.theme}.css`} />
        </Helmet>
        <div id="sidebar">
            <button 
                id="home" 
                className="sbbutton" 
                onClick={()=>{setCurrentTabs(tabs.home)}}>
                    <FontAwesomeIcon icon={faHome} className='sbicon'/>
            </button>
            <button 
                id="settings" 
                className="sbbutton" 
                onClick={()=>{setCurrentTabs(tabs.settings)}}>
                    <FontAwesomeIcon icon={faGear} className='sbicon'/>
            </button>
        </div>
        <div>
            <div id="content">
                <currentTabs.content/>
            </div>
        </div>
        <div id="taskview">
            <div 
                id="taskview_title" 
                contentEditable 
                suppressContentEditableWarning={true}
                onKeyDown={(e)=>{
                    switch(e.key){
                        case "Enter":
                            e.preventDefault();
                            document.getElementById("taskview_desc").focus();
                        break;
                    }
                }}>{selectedTask.title}</div>
            <div 
                id="taskview_desc" 
                contentEditable 
                suppressContentEditableWarning={true}
                onKeyDown={(e)=>{
                    switch(e.key){
                        case "Enter":
                            e.preventDefault();
                            e.target.blur();
                            document.getElementById("taskview_savechanges").click();
                        break;
                    }
                }}>{selectedTask.desc}</div>
            <button id="taskview_savechanges" onClick={(e)=>{
                e.preventDefault();
                console.log("saving changes!")
                dispatch(modifyState({
                    target:selectedTask.id,
                    new:{
                        ...selectedTask,
                        title:document.getElementById("taskview_title").innerHTML,
                        desc:document.getElementById("taskview_desc").innerHTML,
                    }
                }));
                document.getElementById("taskview").style.transform="translateX(calc(100% + 10vmin))";
            }}>Save Changes</button>
        </div>
    </>);
}
export default App;
