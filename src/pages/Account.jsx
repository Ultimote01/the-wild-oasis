import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm"
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";

const StyledAccount=styled.div`
  
`;

function Account() {
  return (
    <StyledAccount>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm/>
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
       <UpdatePasswordForm/>
      </Row>
    </StyledAccount>
  );
}

export default Account;
