import React,{ useState, useEffect } from 'react';
import "./style/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faGear, faXmark, faEdit, faPencil, faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, removeTask, modifyState } from '../store/slices/todo';
import { setSelectedTask } from '../store/slices/selectedTask';
import { $with, generateId, Collapsable } from '../modules/lib';
import { Task } from './modules/Task';
import { SettingsTab } from './modules/Settings';
import { Helmet } from 'react-helmet-async';
const App=(prop)=>{
    const todo=useSelector(state=>state.todo);
    const selectedTask=useSelector(state=>state.selectedTask);
    const settings=useSelector(state=>state.settings);
    const dispatch=useDispatch();
    // const [scrolled,setScrolled]=useState(0);
    useEffect(()=>{
        console.table(todo);
    },[todo]);
    useEffect(()=>{
        console.table(selectedTask);
    },[selectedTask]);
    const HomeTab=({})=>{
        return(<>
            <div id="taskWrapper" /* onScroll={(e)=>{setScrolled(e.target.scrollTop);}} */>
                {/* <Collapsable id={generateId(5)} title={<>Important</>}> */}
                    {/* important and unchecked */}
                    {todo.filter(item=>item.meta.important&&!item.meta.checked)
                        .map(({id,title,desc,meta},index)=><Task
                            id={id}
                            title={title}
                            desc={desc}
                            meta={meta}
                            key={`task_${id}_${btoa(title)}`.replaceAll("=","")}/>)}
                {/* </Collapsable> */}
                {/* not important or unchecked */}
                {todo.filter(item=>!item.meta.important&&!item.meta.checked)
                    .map(({id,title,desc,meta},index)=><Task
                        id={id}
                        title={title}
                        desc={desc}
                        meta={meta}
                        key={`task_${id}_${btoa(title)}`.replaceAll("=","")}/>)}
                {/* important and checked */}
                {todo.filter(item=>item.meta.important&&item.meta.checked)
                    .map(({id,title,desc,meta},index)=><Task
                        id={id}
                        title={title}
                        desc={desc}
                        meta={meta}
                        key={`task_${id}_${btoa(title)}`.replaceAll("=","")}/>)}
                {/* not important but checked */}
                {todo.filter(item=>!item.meta.important&&item.meta.checked)
                    .map(({id,title,desc,meta},index)=><Task
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
                                meta:{
                                    creationTime: Date.now(),
                                    dueDate: NaN,//should be set by user
                                    checked: false,
                                    color: NaN,
                                },
                            }));
                            setTimeout(()=>document.getElementById("taskWrapper").scrollTo({
                                top:document.getElementById("taskWrapper").scrollHeight,
                            }),5);
                        });});
                    }}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </div>
        </>);
    }
    const tabs={
        home:{id:generateId(),title:"Home",qid:"h"},
        settings:{id:generateId(),title:"Settings",qid:"s"},
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
                {currentTabs.qid=="h"?<HomeTab/>:
                currentTabs.qid=="s"?<SettingsTab/>:
                null}
            </div>
        </div>
        <div id="taskedit">
            <div 
                id="taskedit_title" 
                contentEditable 
                suppressContentEditableWarning={true}
                onKeyDown={(e)=>{
                    switch(e.key){
                        case "Enter":
                            e.preventDefault();
                            document.getElementById("taskedit_desc").focus();
                        break;
                    }
                }}>{selectedTask.title}</div>
            <div 
                id="taskedit_desc" 
                contentEditable 
                suppressContentEditableWarning={true}
                onKeyDown={(e)=>{
                    switch(e.key){
                        case "Enter":
                            e.preventDefault();
                            e.target.blur();
                            document.getElementById("taskedit_savechanges").click();
                        break;
                    }
                }}>{selectedTask.desc}</div>
            <button id="taskedit_savechanges" onClick={(e)=>{
                e.preventDefault();
                console.log("saving changes!")
                dispatch(modifyState({
                    target:selectedTask.id,
                    new:{
                        ...selectedTask,
                        title:document.getElementById("taskedit_title").innerHTML,
                        desc:document.getElementById("taskedit_desc").innerHTML,
                    }
                }));
                document.getElementById("taskedit").style.transform="translateX(calc(100% + 10vmin))";
            }}><FontAwesomeIcon icon={faSave}/> Save Changes</button>
        </div>
        <div id="taskview">
            <FontAwesomeIcon 
                icon={faXmark} 
                id='taskview_close' 
                onClick={(e)=>{document.getElementById("taskview").style.transform="translateX(calc(100% + 10vmin))";}}/>
            <h1 className='taskview_title'>{selectedTask.title}</h1>
            <div className='taskview_desc'>{selectedTask.desc}</div>
            <div className='taskview_duedate'><div id="tvdlabel">Due Date</div><div id="tvddate">{selectedTask.meta?!isNaN(selectedTask.meta.dueDate)?new Intl.DateTimeFormat('en-US', 
                { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', })
                    .format(new Date(selectedTask.meta.dueDate).fixDate()):"Not Set":null}</div></div>
            <button id="taskview_edit" onClick={(e)=>{
                document.getElementById("taskview").style.transform="translateX(calc(100% + 10vmin))";
                document.getElementById("taskedit").style.transform="translateX(0)";
                document.getElementById("taskedit_title").focus();
            }}><FontAwesomeIcon icon={faEdit}/> Edit</button>
        </div>
    </>);
}
export default App;
