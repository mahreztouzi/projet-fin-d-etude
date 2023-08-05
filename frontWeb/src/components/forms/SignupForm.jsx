import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AuthActions } from "../../redux/actions";
import Loader from "../loader";
import "../../index.css";
import { EyeIcon, EyeOffIcon } from "../../icons/index";

const UserInfo = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.errorMessage);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [hidePassword, setHidePassword] = useState(true);

  const handleClickShowPassword = () => {
    setHidePassword(!hidePassword);
  };

  const inputChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target.value, event.target.name);
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "name") {
      setName(value);
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    console.log(email, password);
    dispatch(
      AuthActions.signup({
        email,
        password,
        name,
      })
    );
  };

  return (
    <form className="flex-column space-y-2">
      <div>
        <label htmlFor="email" className="text-sm font-medium">
          E-mail
        </label>
        <input
          name="email"
          value={email}
          onChange={inputChange}
          type="email"
          className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out"
          id="email"
          placeholder="name@example.com"
          required
        />
        {!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) &&
        email.length >= 4 ? (
          <div className="text-error text-xs py-1 font-medium">
            Entrez un email valid svp !
          </div>
        ) : null}
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium">
          Mot de passe
        </label>
        <div className="password w-full flex p-0 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out">
          <input
            name="password"
            value={password}
            onChange={inputChange}
            type={hidePassword ? "password" : "text"}
            minLength="8"
            className="w-full p-2 text-primary border-none rounded-md outline-none text-sm transition duration-150 ease-in-out"
            id="password"
            placeholder="Votre mot de passe"
            required
          />
          <button
            type="button"
            className="pr-2"
            onClick={handleClickShowPassword}
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
            Le mot de passe doit être plus de 8 caractère svp
          </div>
        ) : null}
      </div>
      <div>
        <label htmlFor="companyname" className="text-sm font-medium">
          Nom
        </label>
        <input
          value={name}
          name="name"
          onChange={inputChange}
          type="text"
          className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out"
          id="companyname"
          placeholder="Votre nom "
          required
        />
      </div>

      {!isLoading ? (
        <div className="flex mt-6">
          <button
            type="submit"
            onClick={submitForm}
            className="w-full cursor-pointer justify-center items-center bg-primary hover:bg-indigo-700 transition-all py-2 px-4 rounded border focus:outline-none"
          >
            <div className="text-sm text-white">Inscription</div>
          </button>
        </div>
      ) : (
        <div className="flex mt-6">
          <button className="w-full flex disable cursor-pointer justify-center items-center bg-primary py-2 px-4 rounded border focus:outline-none">
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

export default UserInfo;
