import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";


function useEditCabin() {  
const queryClient=useQueryClient();

const {mutate:editCabin,isLoading:isEditing}=useMutation({
 mutationFn:({newCabinData,id})=>createEditCabin(newCabinData,id),
 onSuccess:()=> {toast.success('Cabin sucessfully Edited')
 queryClient.invalidateQueries({
   queryKey:['cabins']
 });
 },
 onError: (err)=>toast.error(err.message)
})

return {editCabin,isEditing};
}

export default useEditCabin;
