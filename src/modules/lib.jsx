export const releaseData={
    v:"v0.4.1",
    changelog:[
        "Improved Settings UI",
        "Added options to settings",
    ]
}
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCaretDown, 
    faCaretUp, 
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarBorder } from '@fortawesome/free-regular-svg-icons';
export const generateId=(length=10)=>{
    let result='';
    const characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter=0;
    while (counter<length) {
        result+=characters.charAt(Math.floor(Math.random() * charactersLength));
        counter+=1;
    }
    return btoa(result);
}
export const timeout=(ms)=>{
    return new Promise(resolve => setTimeout(resolve, ms));
}
export function getQueryParams(qs) {
    qs = qs.split('+').join(' ');
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;
    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
}
export const queryParams=getQueryParams(window.location.search);
export const $with=(value)=>{return new Promise((resolve,reject)=>{resolve(value)});}
export const $=(query)=>{return document.querySelector(query)}
export const $range=(length,start=0)=>{return [...Array(5).keys()].map(i=>i+start);}
export const Collapsable=({id,title,children,opened=true})=>{
    const[open,setOpen]=useState(opened);
    useEffect(()=>{//!barely fucking works
        document.getElementById(`tw:c_${id}`).style.paddingBottom=`calc(${document.getElementById(`tw:c_${id}`).scrollHeight}px + .5rem)`;
    },[open]);
    return(<>
        <button className="collapsableButton" onClick={(e)=>{setOpen(!open);}}>
            <h1>{title}&nbsp;</h1><FontAwesomeIcon className={`collapsableButtonCaret ${open?"ctwi_open":""}`} icon={faCaretDown}/></button>
        <div className={`collapsableTaskWrapper ${open?"ctw_open":""}`} id={`tw:c_${id}`}>
            {children}
        </div>
    </>);
}
Date.prototype.toDateInputValue=(function() {
    var local=new Date(this);
    local.setMinutes((this.getMinutes()/*+1440*/)+this.getTimezoneOffset());
    return String(`${local.getFullYear()}-${String(local.getMonth()+1).padStart(2,'0')}-${String(local.getDate()).padStart(2,'0')}`);
});
Date.prototype.fixDate=(function() {
    var local=new Date(this);
    local.setMinutes(local.getMinutes()+this.getTimezoneOffset());
    return local;
});
export const Portal=({children})=>{return createPortal(children, document.body);}
