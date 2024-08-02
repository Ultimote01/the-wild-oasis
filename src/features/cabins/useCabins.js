import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCabin } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constatnts";
import { currentClick } from "../../ui/Pagination";


export function useCabins() {
const[searchParams]=useSearchParams();
const queryClient =useQueryClient();


//Pagination
const page=!searchParams.get('page')?1:Number(searchParams.get('page'));


const{isLoading,data:{data:cabins,count}={}}= useQuery({
        queryKey:['cabins',page],
        queryFn:()=>getCabin(page)
        });

//Prefetch
//We can aslo use prefetchInfiniteQuery
const pageCount=Math.ceil(count/PAGE_SIZE);
const addOns=currentClick()
const values ={page,queryClient}

if (!addOns){
    if (page !== pageCount)prefetchData({...values,page:page+1})
    if (page !== 1) prefetchData({...values,page:page-1})
} 
else if (addOns === '+' && page !== pageCount) prefetchData({...values,page:page+1});
else if (addOns === '-' && page !== 1) prefetchData({...values,page:page-1});



return {isLoading,cabins,count};
}


function prefetchData({page,queryClient}){

    queryClient.prefetchQuery({
        queryKey:['cabins',page],
            queryFn:()=>getCabin(page)
                  
            }  
    )

}

