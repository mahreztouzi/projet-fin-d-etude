import React from "react";
import { AuthActions } from "../../redux/actions";
import { LogoutIcon } from "../../icons/index";
import Popup from "reactjs-popup";
import "../../index.css";
import { useDispatch, useSelector } from "react-redux";

const UserInfo = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    // Dispatch l'action de déconnexion
    dispatch(AuthActions.logout());
  };
  return (
    <div className="bg-gray-50 flex ">
      <div className=" bg-white p-5 border-2 rounded-xl mx-auto mt-20 mb-10 lg:w-1/2 md:w-3/5 sm:w-4/5">
        <div>
          <h1 className="lg:text-3xl md:text-xl font-medium antialiased text-left p-5">
            Profile
          </h1>
        </div>
        <div class="flex items-stretch space-x-12">
          {/* main form */}
          <form className="flex-1 min-w-min">
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Nom
              </label>
              <input
                value={user.name}
                name="name"
                // onChange={(e) => this.inputChange(e)}
                type="text"
                className={`w-full p-2 text-primary border rounded outline text-sm transition duration-150 ease-in-out mb-4`}
                id="name"
                // placeholder={dname ? dname : "John Doe"}
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                value={user.email}
                name="email"
                // onChange={(e) => this.inputChange(e)}
                type="email"
                className={`w-full p-2 text-primary border rounded outline text-sm transition duration-150 ease-in-out mb-4`}
                id="email"
                // placeholder={demail}
              />
            </div>
            <div>
              <label htmlFor="companyname" className="text-sm font-medium">
                nom
              </label>
              <input
                value={user.name}
                name="companyName"
                // onChange={(e) => this.inputChange(e)}
                type="text"
                className={`w-full p-2 text-primary border rounded outline text-sm transition duration-150 ease-in-out mb-4`}
                id="companyname"
                // placeholder={dcompanyName}
              />
            </div>
            <div>
              <label htmlFor="location" className="text-sm font-medium">
                role
              </label>
              <input
                name="location"
                value={user.role}
                // onChange={(e) => this.inputChange(e)}
                type="text"
                className={`w-full p-2 text-primary border rounded outline-none text-sm transition duration-150 ease-in-out mb-4`}
                id="location"
              />
            </div>

            <button
              // onClick={submitForm}
              type="submit"
              className={`w-full  cursor-pointer bg-primary hover:bg-indigo-700 transition-all py-2 px-4 text-sm text-white rounded-lg border focus:outline-none`}
            >
              save changes
            </button>
          </form>
        </div>
        {/* logout button */}

        <Popup
          trigger={
            <button
              className={`w-full transition-all duration-300 cursor-pointer bg-red-100 py-2 px-4 text-sm text-red-500 rounded-lg border hover:bg-red-500 hover:text-white`}
            >
              Deconnexion
            </button>
          }
          modal
        >
          {(close) => (
            <div className="p-8 rounded-xl flex space-y-2 flex-col">
              <div className="p-4 bg-indigo-200 rounded-full w-16 h-16 flex justify-center items-center">
                <LogoutIcon stroke="indigo"></LogoutIcon>
              </div>
              <h1 className="text-xl font-bold">Vous êtes sure ?</h1>
              <h2 className="text-md font-medium text-subtle">
                Vous allez être déconnecté du systeme
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    console.log("modal closed ");
                    close();
                  }}
                  className={`w-full transition-all duration-300 cursor-pointer bg-gray-100 py-2 px-4 text-sm text-primary rounded-lg border hover:bg-primary hover:text-white`}
                >
                  Annuler
                </button>
                <button
                  onClick={handleLogout}
                  className={`w-full transition-all duration-300 cursor-pointer bg-red-500 py-2 px-4 text-sm text-white rounded-lg border hover:bg-red-700 hover:text-white`}
                >
                  Deconnexion
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default UserInfo;
