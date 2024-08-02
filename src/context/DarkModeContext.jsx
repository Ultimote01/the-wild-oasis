import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext=createContext();


function DarkModeProvider({children}){
    const [isDarkMode, setIsDarkMode]=useLocalStorageState(false,"isDarkMode");




    useEffect(function(){

    if (isDarkMode){
       
        document.documentElement.classList.remove("light-mode")

        document.documentElement.classList.add("dark-mode")
    }else{
        document.documentElement.classList.remove("dark-mode")

        document.documentElement.classList.add("light-mode")
    }
    },[isDarkMode])

    function toggleDarkMode(){
        setIsDarkMode((isDark)=>!isDark);
    }


    return <DarkModeContext.Provider value={{isDarkMode,toggleDarkMode}}>
        {children}
    </DarkModeContext.Provider>
}


function useDarkMode(){
    const context=useContext(DarkModeContext);

    if (context === undefined) throw new Error("DarkmodeContext was used outside of darkmode provider")

    return context;        
}


export {DarkModeProvider,useDarkMode};