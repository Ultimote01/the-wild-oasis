import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
// import {login as loginApi} from "../../services/apiAuth"


function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login,isloading}=useLogin();

  function handleSubmit(e) {
    e.preventDefault()

  if(!email || !password) return;

  login({email,password},{
    onSettled:()=>{
      setEmail("");
      setPassword("");
    }
  });

  // loginApi({email,password});

  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isloading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isloading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isloading}
        >{!isloading?"Login":<SpinnerMini/>}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
