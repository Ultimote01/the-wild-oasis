import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings(){
const {isLoading,isError,data:settings}=useQuery(
    {
        queryKey:['settings'],
        queryFn:getSettings
    }
);

return {isLoading,isError,settings}
}