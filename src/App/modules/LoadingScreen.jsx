/*react*/import React, { useEffect, useState } from "react";
/*css*/import "./assets/style/loadingScreen.css";
/*loading*/import ReactLoading from "react-loading";
/*lib*/import { GetCssVar, Portal, timeout, waitForElm } from "../../modules/lib";
import { useSelector, useDispatch } from 'react-redux';
export const LoadingScreen=(/*{ls:{setLoading,loading}}*/)=>{
    const settings=useSelector(state=>state.settings);
    useEffect(()=>{
        window.onload=()=>{
            setTimeout(()=>{
                if(document.getElementById("loadingScreen")){
                    try{
                        document.getElementById("loadingScreen").style.transition="1s";
                        document.getElementById("loadingScreen").style.opacity="0";
                        document.getElementById("loadingScreen").style.pointerEvents="none";
                        document.getElementById("loadingScreen").style.userSelect="none";
                        timeout(1000)
                            .then(()=>{document.getElementById("loadingScreen")
                                .remove();});
                    }catch{}
                }
            },50);
            /* new MutationObserver((mutations)=>{
                mutations.forEach((mutationRecord)=>{fadeOutLs()});    
            }).observe(document.getElementById('loadingScreen'),
                {attributes:true,attributeFilter:['style']}); */
        };
    },[]);
    return(<>
        {/* <Portal>
            <div id="loadingScreen">
                <ReactLoading
                    type="bars"
                    id="loadingani"
                    // color={"#c0c0c0"}
                    height={75}
                    width={75}/>
            </div>
        </Portal> */}
    </>);
}
