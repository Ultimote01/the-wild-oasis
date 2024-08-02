import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage= styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoute({children}) {

const naviagte=useNavigate();

const {isLoading,isAuthenticated}=useUser();

//We will use the useEffect hook to navigate base on condition 
useEffect(()=>{
    if(!isAuthenticated && !isLoading) naviagte("/login")
},[isLoading,isAuthenticated,naviagte])


if(isLoading) return <FullPage><Spinner/></FullPage>

if(isAuthenticated) return children;

}

export default ProtectedRoute;
