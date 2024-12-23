//core
import React,{ useState, useEffect } from 'react';
import "./style/style.css";
//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHome, 
    faPlus, 
    faGear, 
    faXmark, 
    faEdit, 
    faSave, 
    faCircle,
} from '@fortawesome/free-solid-svg-icons';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { addTask, removeTask, modifyState } from '../store/slices/todo';
import { setSelectedTask } from '../store/slices/selectedTask';
import { setCurrentTabs, tabs } from '../store/slices/currentTab';
//lib
import { $with, generateId, Collapsible, Portal, GetCssVar } from '../modules/lib';
//modules
import { Task } from './modules/Task';
import { LoadingScreen } from './modules/LoadingScreen';
//tabs
import { SettingsTab } from './modules/Settings';
//helmet
import { Helmet } from 'react-helmet-async';
//external modules
import { Menu, Item, Separator, Submenu, useContextMenu } from 'react-contexify';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { motion } from "framer-motion";
import 'react-toastify/dist/ReactToastify.css';
import 'react-contexify/ReactContexify.css';
const App=(prop)=>{
    const todo=useSelector(state=>state.todo);
    const selectedTask=useSelector(state=>state.selectedTask);
    const settings=useSelector(state=>state.settings);
    const currentTab=useSelector(state=>state.currentTab);
    const[taskeditOpen,setTaskeditOpen]=useState(false);
    const dispatch=useDispatch();
    // const [scrolled,setScrolled]=useState(0);
    useEffect(()=>{
        console.table(todo);
    },[todo]);
    useEffect(()=>{//settings renderer
        console.table({settings});
        Object.keys(settings).map((skey,index)=>{
            switch(skey){
                case "theme":
                    // document.body.classList.map((className,index)=>{document.body.classList.remove("className")});
                    document.body.className=settings[skey];
                break;
                case "advanced_settings":break;
                case "customCssVar":
                    Object.keys(settings[skey]).map((cssvar)=>{
                        if(settings[skey][cssvar].value!=""){
                            document.querySelector(`.${settings.theme}`).style.setProperty(cssvar,settings[skey][cssvar].value);
                        }
                    });
                break;
                default:console.error(`unknown settings key: ${skey} (value: ${settings[skey]})`);
            }
        });
    },[settings]);
    useEffect(()=>{
        console.table(selectedTask);
    },[selectedTask]);
    const ContextMenu=({})=>{
        return(<>
            <Portal>
                <Menu id="context_menu" animation="fade">
                    <Item id="delete" 
                        onClick={handleItemClick} 
                        keyMatcher={(e)=>{return e.key=="Delete"||e.key=="Backspace"}}>Delete</Item>
                    <Item id="edit" onClick={handleItemClick}>Edit</Item>
                    <Item id="toggleimportance" onClick={handleItemClick}>Toggle Importance</Item>
                    <Submenu label="Set Color">
                        <Item id="set_clr0" onClick={handleItemClick}>
                            <FontAwesomeIcon className='tx_clr0' icon={faCircle}/>&nbsp;White</Item>
                        <Item id="set_clr1" onClick={handleItemClick}>
                            <FontAwesomeIcon className='tx_clr1' icon={faCircle}/>&nbsp;Red</Item>
                        <Item id="set_clr2" onClick={handleItemClick}>
                            <FontAwesomeIcon className='tx_clr2' icon={faCircle}/>&nbsp;Orange</Item>
                        <Item id="set_clr3" onClick={handleItemClick}>
                            <FontAwesomeIcon className='tx_clr3' icon={faCircle}/>&nbsp;Yellow</Item>
                        <Item id="set_clr4" onClick={handleItemClick}>
                            <FontAwesomeIcon className='tx_clr4' icon={faCircle}/>&nbsp;Green</Item>
                        <Item id="set_clr5" onClick={handleItemClick}>
                            <FontAwesomeIcon className='tx_clr5' icon={faCircle}/>&nbsp;Blue</Item>
                        <Item id="set_clr6" onClick={handleItemClick}>
                            <FontAwesomeIcon className='tx_clr6' icon={faCircle}/>&nbsp;Purple</Item>
                        <Item id="set_clr7" onClick={handleItemClick}>
                            <FontAwesomeIcon className='tx_clr7' icon={faCircle}/>&nbsp;Pink</Item>
                    </Submenu>
                </Menu>
            </Portal>
        </>);
    }
    const {show}=useContextMenu({id:"context_menu",});
    const handleContextMenu=(event,props)=>{show({event,props,});}
    const handleItemClick=({id,event,props})=>{
        switch(id){
            case "delete":dispatch(removeTask(props.id));break;
            case "toggleimportance":dispatch(modifyState({target:props.id,new:{id:props.id,title:props.title,desc:props.desc,meta:{...props.meta,important:!props.meta.important,}}}));break;
            case "edit":
                dispatch(setSelectedTask(props));
                // document.getElementById("taskedit").style.transform="translateX(0)";
                setTaskeditOpen(true)
                document.getElementById("taskedit_title").focus();
            break;
            case "set_clr0":dispatch(modifyState({target:props.id,new:{id:props.id,title:props.title,desc:props.desc,meta:{...props.meta,color:0,}}}));break;
            case "set_clr1":dispatch(modifyState({target:props.id,new:{id:props.id,title:props.title,desc:props.desc,meta:{...props.meta,color:1,}}}));break;
            case "set_clr2":dispatch(modifyState({target:props.id,new:{id:props.id,title:props.title,desc:props.desc,meta:{...props.meta,color:2,}}}));break;
            case "set_clr3":dispatch(modifyState({target:props.id,new:{id:props.id,title:props.title,desc:props.desc,meta:{...props.meta,color:3,}}}));break;
            case "set_clr4":dispatch(modifyState({target:props.id,new:{id:props.id,title:props.title,desc:props.desc,meta:{...props.meta,color:4,}}}));break;
            case "set_clr5":dispatch(modifyState({target:props.id,new:{id:props.id,title:props.title,desc:props.desc,meta:{...props.meta,color:5,}}}));break;
            case "set_clr6":dispatch(modifyState({target:props.id,new:{id:props.id,title:props.title,desc:props.desc,meta:{...props.meta,color:6,}}}));break;
            case "set_clr7":dispatch(modifyState({target:props.id,new:{id:props.id,title:props.title,desc:props.desc,meta:{...props.meta,color:7,}}}));break;
        }
    }
    const HomeTab=({})=>{
        return(<>
            <Helmet>
                <title>Todura V2</title>
                <link rel="icon" type="image/x-icon" href="/logo.ico"/>
            </Helmet>
            <ContextMenu/>
            <LoadingScreen/>
            <div id="taskWrapper" onScroll={(e)=>{
                document.getElementById("taskScrollShadeTop").style.opacity=
                    (e.target.scrollTop>0)?"1":"0";
                document.getElementById("taskScrollShade").style.opacity=
                    (Math.abs(e.target.scrollHeight-e.target.scrollTop-e.target.clientHeight)<1)?
                        "0":"1";
            }}>
                {/* <Collapsible id={generateId(5)} title={<>Important</>}> */}
                    {/* important and unchecked */}
                    {todo.filter(item=>item.meta.important&&!item.meta.checked)
                        .map(({id,title,desc,meta},index)=><Task
                            id={id}
                            title={title}
                            desc={desc}
                            meta={meta}
                            taskeditOpen={taskeditOpen}
                            setTaskeditOpen={setTaskeditOpen}
                            contextMenuHandler={handleContextMenu}
                            key={`task_${id}_${btoa(title)}`.replaceAll("=","")}/>)}
                {/* </Collapsible> */}
                {/* not important or unchecked */}
                {todo.filter(item=>!item.meta.important&&!item.meta.checked)
                    .map(({id,title,desc,meta},index)=><Task
                        id={id}
                        title={title}
                        desc={desc}
                        meta={meta}
                        taskeditOpen={taskeditOpen}
                        setTaskeditOpen={setTaskeditOpen}
                        contextMenuHandler={handleContextMenu}
                        key={`task_${id}_${btoa(title)}`.replaceAll("=","")}/>)}
                {/* important and checked */}
                {todo.filter(item=>item.meta.important&&item.meta.checked)
                    .map(({id,title,desc,meta},index)=><Task
                        id={id}
                        title={title}
                        desc={desc}
                        meta={meta}
                        taskeditOpen={taskeditOpen}
                        setTaskeditOpen={setTaskeditOpen}
                        contextMenuHandler={handleContextMenu}
                        key={`task_${id}_${btoa(title)}`.replaceAll("=","")}/>)}
                {/* not important but checked */}
                {todo.filter(item=>!item.meta.important&&item.meta.checked)
                    .map(({id,title,desc,meta},index)=><Task
                        id={id}
                        title={title}
                        desc={desc}
                        meta={meta}
                        taskeditOpen={taskeditOpen}
                        setTaskeditOpen={setTaskeditOpen}
                        contextMenuHandler={handleContextMenu}
                        key={`task_${id}_${btoa(title)}`.replaceAll("=","")}/>)}
            </div>
            <div id="taskScrollShade"></div>
            <div id="taskScrollShadeTop"></div>
            <div id="taskCreateInputWrapper">
                <div id="taskCreateTitleWrapper">
                    <motion.input 
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
                        }} 
                        transition={{ duration:.15,delay:.05 }}
                        initial={{
                            y: 5,
                            scale:.95,
                            opacity: 0,
                        }}
                        animate={{ y:0,opacity:1,scale:1 }}/>
                </div>
                <div id="taskCreateDescriptionWrapper">
                    <motion.input 
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
                        }} 
                        transition={{ duration:.15,delay:.15 }}
                        initial={{
                            y: 5,
                            scale:.95,
                            opacity: 0,
                        }}
                        animate={{ y:0,opacity:1,scale:1 }}/>
                </div>
                <div id="taskCreateButtonWrapper">
                    <motion.button 
                        id="taskCreateButton" 
                        onClick={(e)=>{
                            e.preventDefault();
                            $with(String(document.getElementById("taskCreateTitle").value)).then((title)=>{
                            $with(String(document.getElementById("taskCreateDescription").value)).then((desc)=>{
                                if(!title&&desc)toast.error("Title is empty. Please fill in a title",{autoClose:5000});
                                else if(!desc&&title)toast.error("Description is empty. Please fill in a description",{autoClose:5000});
                                else if(!title&&!desc)toast.error("Title and description is empty. Please fill in title and description",{autoClose:5000});
                                else{
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
                                }
                            });});
                        }}
                        transition={{ duration:.15,delay:.05 }}
                        initial={{
                            y: 5,
                            scale:.95,
                            opacity: 0,
                        }}
                        animate={{ y:0,opacity:1,scale:1 }}><FontAwesomeIcon icon={faPlus} />
                    </motion.button>
                </div>
            </div>
        </>);
    }
    return(<>
        <Helmet>
            <title>Todura V2</title>
            {/* <link rel="stylesheet" id="theme" href={`./themes/${settings.theme}.css`} /> */}
        </Helmet>
        <Portal>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                transition={Slide}
                closeOnClick 
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                className="toastify"
                theme="dark"/>
        </Portal>
        <motion.div 
            id="sidebar"
            transition={{ duration:.15 }}
            initial={{
                x: "-100%",
                opacity: 0,
            }}
            animate={{ x:0,opacity:1 }}>
                <button 
                    id="home" 
                    className="sbbutton" 
                    onClick={()=>{dispatch(setCurrentTabs(tabs.home))}}>
                        <FontAwesomeIcon icon={faHome} className='sbicon'/>
                </button>
                <button 
                    id="settings" 
                    className="sbbutton" 
                    onClick={()=>{dispatch(setCurrentTabs(tabs.settings))}}>
                        <FontAwesomeIcon icon={faGear} className='sbicon'/>
                </button>
        </motion.div>
        <div>
            <div id="content">
                {currentTab.qid=="h"?<HomeTab/>:
                currentTab.qid=="s"?<SettingsTab/>:
                null}
            </div>
        </div>
        <motion.div 
            id="taskedit"
            transition={{ duration:.15 }}
            initial={{
                x: "100%",
                opacity: 0,
            }}
            animate={{
                x: taskeditOpen?"0%":"100%",
                opacity: taskeditOpen?1:0,
            }}>
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
                    console.log("saving changes!");
                    dispatch(modifyState({
                        target:selectedTask.id,
                        new:{
                            ...selectedTask,
                            title:String(document.getElementById("taskedit_title").innerHTML),
                            desc:String(document.getElementById("taskedit_desc").innerHTML),
                        }
                    }));
                    setTaskeditOpen(false);
                    // document.getElementById("taskedit").style.transform="translateX(calc(100% + 10vmin))";
                    toast("Edited Task Successfully",{autoClose:5000});
                }}><FontAwesomeIcon icon={faSave}/> Save Changes</button>
        </motion.div>
        <motion.div 
            id="taskview"
            transition={{ duration:.15 }}
            initial={{
                x: "100%",
                opacity: 0,
            }}
            animate={{
                x: selectedTask.taskeditOpen?"0%":"100%",
                opacity: selectedTask.taskeditOpen?1:0,
            }}>
                <FontAwesomeIcon 
                    icon={faXmark} 
                    id='taskview_close' 
                    onClick={(e)=>{
                        dispatch(setSelectedTask({taskeditOpen:false}));
                        // document.getElementById("taskview").style.transform="translateX(calc(100% + 10vmin))";
                    }}/>
                <h1 className='taskview_title'>{selectedTask.title}</h1>
                <div className='taskview_desc'>{selectedTask.desc}</div>
                <div className='taskview_duedate'><div id="tvdlabel">Due Date</div><div id="tvddate">{selectedTask.meta?!isNaN(selectedTask.meta.dueDate)?new Intl.DateTimeFormat('en-US', 
                    { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', })
                        .format(new Date(selectedTask.meta.dueDate).fixDate()):"Not Set":null}</div></div>
                <button id="taskview_edit" onClick={(e)=>{
                    // document.getElementById("taskview").style.transform="translateX(calc(100% + 10vmin))";
                    dispatch(setSelectedTask({...selectedTask,taskeditOpen:false}));
                    // document.getElementById("taskedit").style.transform="translateX(0)";
                    setTaskeditOpen(true);
                    document.getElementById("taskedit_title").focus();
                }}><FontAwesomeIcon icon={faEdit}/> Edit</button>
        </motion.div>
    </>);
}
export default App;
