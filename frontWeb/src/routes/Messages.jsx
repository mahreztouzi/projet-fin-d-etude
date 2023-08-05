import "../index.css";
import Header from "../components/header";
import Sidebar from "../components/sidebar/sidebar";
import MessagesComponent from "../components/MessagesComponent";

const Messages = () => {
  return (
    <div>
      <Header />
      {/* sidebar */}
      <div className="flex w-full overflow-x-hidden">
        <Sidebar place="4" />
        {/* main content container */}
        <MessagesComponent />
      </div>
    </div>
  );
};

export default Messages;
