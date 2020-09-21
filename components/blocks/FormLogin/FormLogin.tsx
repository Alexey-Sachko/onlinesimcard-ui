import React, { useState, useCallback } from "react";

import Typography from "../../layout/Typography";
import SimpleInput from "../../controls/SimpleInput";
import Checkbox from "../../controls/Checkbox";
import Button from "../../controls/Button";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remeberMe, setRemeberMe] = useState(false);

  const onSubmitForm = useCallback(() => {
    console.log("submit form");
  }, []);

  return (
    <>
      <style jsx>
        {`
          .email {
            margin-bottom: 50px;
          }
          .password {
            margin-bottom: 40px;
          }
          .remmember-me {
            margin-bottom: 60px;
          }
        `}
      </style>
      <div className="email">
        <SimpleInput
          value={email}
          onChangeHandler={(value: string) => setEmail(value)}
          label="Email"
        />
      </div>
      <div className="password">
        <SimpleInput
          value={password}
          onChangeHandler={(value: string) => setPassword(value)}
          label="Password"
          type="password"
        />
      </div>

      <div className="remmember-me">
        <Checkbox
          checked={remeberMe}
          onChange={setRemeberMe}
          variant="medium"
          color="mangoBasic"
          hoverColor="mangoBackground"
          label="Запомнить меня"
        />
      </div>

      <div className="submit-form">
        <Button
          color="mangoBasic"
          hoverColor="mangoHard"
          onClick={onSubmitForm}
          text="Войти"
        />
      </div>
    </>
  );
};

export default FormLogin;
