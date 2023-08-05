import React, { useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  createMessageRequest,
  getMessagesRequest,
} from "../redux/actions/message.action";

function MessagesComponent() {
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  console.log("users", selectedUserId, inputValue);
  const [selectedUserName, setSelectedUserName] = useState(null);
  const dispatch = useDispatch();
  const ref = useRef(null);

  const user = useSelector((state) => state.auth.user.user);
  const messages = useSelector((state) => state.message.messages);
  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    setActiveUser(userId);

    const selectedUserName = users.find((user) => user.id === userId);

    if (selectedUserName) {
      setSelectedUserName(selectedUserName);
    }
  };
  console.log("selcted user name ", selectedUserName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ref.current.value === "") {
      ref.current.focus();
    } else if (selectedUserId && inputValue.trim() !== "") {
      dispatch(createMessageRequest(selectedUserId, inputValue));
      setInputValue("");
    }
  };
  useEffect(() => {
    // Fetch users from API
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    dispatch(getMessagesRequest(selectedUserId));
  }, [selectedUserId, dispatch]);

  const messagesContainerRef = useRef(null);
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div
      style={{ height: "47vw", display: "flex" }}
      className="mt-3 lg:w-4/5 w-full p-3 bg-gray-50 ml-auto"
    >
      <div
        className="w-2/6"
        style={{
          marginTop: "2vw",
          height: "44vw",
          // border: "2px solid gray",
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
        }}
      >
        <ul
          style={{
            // borderBottom: "1px solid blue",

            justifyContent: "flex-start",
            paddingLeft: "5px",
            fontSize: "25px",
            position: "fixed",
            width: "78%",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            display: "flex",
            fontWeight: "bold",
          }}
          className="bg-gray-50"
        >
          <h3 className="w-2/4 text-gray-500 ">Liste des utilisateurs</h3>
          <h3 className="w-3/4 ml-8 text-gray-500 ">Nos messages</h3>
          <h3
            className="w-4/4 text-primary"
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              textTransform: "capitalize",
              marginTop: "10px",
              width: "30%",
              textAlign: "end",
            }}
          >
            {" "}
            {selectedUserName && selectedUserName.name}{" "}
          </h3>
        </ul>
        <div
          style={{
            height: "21vw",

            margin: "2px",
          }}
        >
          <div
            style={{
              position: "fixed",
              textAlign: "center",
              width: "25.7%",
              fontSize: "18px",
              fontWeight: "bold",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
            className="bg-gray-200 text-gray-500"
          >
            <h3>Liste des professeurs</h3>
          </div>
          <div
            style={{
              marginTop: "40px",
              overflow: "auto",
              height: "20.7vw",
              paddingTop: "30px",
            }}
            className="bg-purple-100  rounded-2xl"
          >
            <ul>
              {users &&
                users.map((user) =>
                  user.role === "professeur" ? (
                    <div
                      key={user.id}
                      style={{ display: "flex", cursor: "pointer" }}
                      className={`hover:bg-gray-50 ${
                        activeUser === user.id
                          ? "bg-blue-200 hover:bg-blue-200"
                          : ""
                      } `}
                      onClick={() => handleUserClick(user.id)}
                    >
                      <div className="w-10 h-10 bg-primary m-2 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {user.name.substr(0, 2).toUpperCase()}
                      </div>
                      <li className="mt-4 ml-1  font-bold">{user.name}</li>
                    </div>
                  ) : null
                )}
            </ul>
          </div>
        </div>
        <div
          style={{
            height: "19vw",

            margin: "2px",
          }}
        >
          <div
            style={{
              position: "fixed",
              textAlign: "center",
              width: "25.7%",
              fontSize: "18px",
              fontWeight: "bold",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
            className="bg-gray-200 text-gray-500"
          >
            <h3>Liste des apprenant</h3>
          </div>
          <div
            style={{
              overflow: "auto",

              paddingTop: "30px",
              height: "18.7vw",
            }}
            className="bg-purple-100  rounded-2xl"
          >
            <ul>
              {users &&
                users.map((user) =>
                  user.role === "apprenant" ? (
                    <div
                      key={user.id}
                      style={{ display: "flex", cursor: "pointer" }}
                      className={`hover:bg-gray-50 ${
                        activeUser === user.id
                          ? "bg-blue-200 hover:bg-blue-200"
                          : ""
                      } `}
                      onClick={() => handleUserClick(user.id)}
                    >
                      <div className="w-10 h-10 bg-secondary m-2 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {user.name.substr(0, 2).toUpperCase()}
                      </div>
                      <li className="mt-4 ml-1  font-bold">{user.name}</li>
                    </div>
                  ) : null
                )}
            </ul>
          </div>
        </div>
      </div>
      <div className="container w-4/6 ">
        <div style={{ height: "46vw" }} className="flex flex-col ">
          <div
            style={{
              height: "40vw ",
              marginTop: "2vw",

              // border: "2px solid gray",
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
            className="flex-grow p-6 bg-gray-50 "
          >
            <div
              style={{ height: "36vw", overflow: "auto" }}
              className="flex flex-col space-y-4"
              ref={messagesContainerRef}
            >
              {messages &&
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex mt-10 ${
                      message.sender.id === user.userId
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      style={{
                        borderRadius: "20px",
                        height: "auto",
                        wordWrap: "break-word",
                      }}
                      className={`${
                        message.sender.id === user.userId
                          ? "bg-purple-700"
                          : "bg-gray-500"
                      } rounded-lg p-2  text-white max-w-sm`}
                    >
                      {message.contenu}
                    </div>
                  </div>
                ))}
            </div>
            <form
              onSubmit={handleSubmit}
              style={{ marginTop: "2vw" }}
              className="flex-none p-1"
            >
              <div className="flex rounded-lg   ">
                <input
                  type="text"
                  ref={ref}
                  style={{
                    border:
                      ref.current && ref.current.value === ""
                        ? "2px solid rgba(71, 107, 143, 0.71)"
                        : "none",
                    boxShadow: " 0px 0px 8px 2px  rgba(189,189,189,0.86)",
                    borderRadius: "20px",
                  }}
                  className="flex-grow px-4 py-2 bg-gray-200 mr-3  rounded-lg text-primary border-none placeholder-primary focus:outline-none"
                  placeholder="Ecire un message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                  type="submit"
                  style={{ borderRadius: "20px" }}
                  className="bg-purple-500 rounded-lg px-4  py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagesComponent;
