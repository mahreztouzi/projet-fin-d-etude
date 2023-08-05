import React, { useState } from "react";
import { connect } from "react-redux";
import { AuthActions } from "../../redux/actions";
import Loader from "../loader";
import { EyeIcon, EyeOffIcon } from "../../icons/index";

const UserInfo = ({ dispatch, error, isLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const handleClickShowPassword = () => {
    setHidePassword(!hidePassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const inputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    dispatch(
      AuthActions.login({
        email: email,
        password: password,
      })
    );
  };

  return (
    <form>
      <div>
        <label htmlFor="email" className="text-sm font-medium">
          E-mail
        </label>
        <div>
          <input
            value={email}
            name="email"
            onChange={inputChange}
            type="email"
            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out `}
            id="email"
            placeholder="name@example.com"
            required
          />
          {!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) &&
          email.length >= 4 ? (
            <div className="text-error text-xs py-1 font-medium">
              Entrer un email valid svp !
            </div>
          ) : null}
        </div>
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium">
          Mot de passe
        </label>
        <div
          className={`password w-full flex p-0 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out  `}
        >
          <input
            name="password"
            value={password}
            onChange={inputChange}
            type={hidePassword ? "password" : "text"}
            className={`w-full p-2 text-primary border-none rounded-md outline-none text-sm transition duration-150 ease-in-out `}
            id="password"
            placeholder="Votre mot de passe"
            required
          />
          <button
            className="pr-2"
            type="button"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {hidePassword ? (
              <EyeIcon stroke="#a39ab6" />
            ) : (
              <EyeOffIcon stroke="#a39ab6" />
            )}
          </button>
        </div>
        {password.length < 8 && password.length >= 1 ? (
          <div className="text-error text-xs py-1 font-medium">
            Le mot de passe doit être superieure a 8 caractère
          </div>
        ) : null}
      </div>

      {!isLoading ? (
        <div className="flex mt-6">
          <button
            type="submit"
            onClick={submitForm}
            className={`w-full cursor-pointer justify-center items-center bg-primary hover:bg-indigo-700 transition-all py-2 px-4 rounded border focus:outline-none`}
          >
            <div className=" text-sm text-white">Connexion</div>
          </button>
        </div>
      ) : (
        <div className="flex mt-6">
          <button
            className={`w-full flex cursor-pointer justify-center items-center bg-primary hover:bg-indigo-700 transition-all py-2 px-4 rounded border focus:outline-none`}
          >
            <div className="justify-self-center">
              <Loader color="#ffffff" />
            </div>
          </button>
        </div>
      )}
      {error.length > 0 && !isLoading ? (
        <p className="text-error text-sm text-center py-1 font-medium">
          {error}
        </p>
      ) : null}
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.auth.errorMessage,
    isLoading: state.auth.isLoading,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps)(UserInfo);
