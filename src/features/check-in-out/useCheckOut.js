import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckOut(){
    const queryClient=useQueryClient();
    const navigate=useNavigate();

    const {mutate:checkOut, isLoading:isCheckingOut}=useMutation({
        mutationFn:(bookingId)=>updateBooking(bookingId,{
            status:"checked-out",
        }),
        onSuccess:(data)=>{
            toast.success(`Booking #${data.id} sucessfully checked-Out`)
            queryClient.invalidateQueries({active:true});
            navigate('/bookings');
        },
        onError:()=>toast.error('There was an error checking out ..')
    })

    return {checkOut,isCheckingOut};
}