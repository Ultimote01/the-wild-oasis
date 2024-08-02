import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constatnts";
import { currentClick } from "../../ui/Pagination";


export function useBookings() {
const queryClient = useQueryClient();
 const [searchParams]=useSearchParams();
 const filterValue=searchParams.get('status');

 //Filter
 const filter = !filterValue || filterValue === "all"?null:
 {field:'status',value:filterValue}

 //Sort
 const sortByRaw=searchParams.get('sortby') || 'startDate-desc';
 const [field,direction] = sortByRaw.split('-')

 const sortBy={field,direction};


 //Pagination
 const page=!searchParams.get('page')?1:Number(searchParams.get('page'));


const{isLoading,
    data:{data:bookings,count}={},
    }= useQuery({
        queryKey:['bookings',filter,sortBy,page],
        queryFn:()=>getBookings({filter,sortBy,page}),
        });




//Prefetch
//We can aslo use prefetchInfiniteQuery
const pageCount=Math.ceil(count/PAGE_SIZE);
const addOns=currentClick()
const values ={filter,sortBy,page,queryClient}

if (!addOns){
    if (page !== pageCount)prefetchData({...values,page:page+1})
    if (page !== 1) prefetchData({...values,page:page-1})
} 
else if (addOns === '+' && page !== pageCount) prefetchData({...values,page:page+1});
else if (addOns === '-' && page !== 1) prefetchData({...values,page:page-1});

 

return {isLoading,bookings,count};
}



function prefetchData({filter,sortBy,page,queryClient}){

    queryClient.prefetchQuery({
        queryKey:['bookings',filter,sortBy,page],
            queryFn:()=>getBookings({filter,sortBy,page})
                  
            }  
    )

}