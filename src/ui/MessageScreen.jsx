import styled from "styled-components";
import Button from "./Button";


const StyledMessageScreen = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function MessageScreen() {
    return(
       <StyledMessageScreen>
        <p>This row has already been duplicated</p>
       </StyledMessageScreen>
    )
}



export default MessageScreen;
