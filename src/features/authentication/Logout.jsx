import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogut";

function Logout() {
const {logout,isLoading}=useLogout();

    return(
        <ButtonIcon disabled={isLoading} onClick={logout}>
            <HiArrowRightOnRectangle/>
        </ButtonIcon>
    )
}

export default Logout;
