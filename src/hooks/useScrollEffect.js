import { useEffect } from "react";


let isActive=false;
export default function useScrollEffect(active,setPosition,element){


useEffect(function(){
    
    const handleScrollEvent= (event)=>{
        if (isActive){ 
            const rect=element?.getBoundingClientRect()
            setPosition({
                x: window.innerWidth - rect?.width - rect?.x,
                y: rect?.y + rect?.height + 8,
              })
            }
         
    }
   
   document.addEventListener('scroll',handleScrollEvent,true);
    
    return()=>document.removeEventListener('scroll',handleScrollEvent)

},[active]) 

} 

export function setActive(value){
    isActive=value
}