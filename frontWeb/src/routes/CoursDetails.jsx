import "../index.css";
import Header from "../components/header";
import Sidebar from "../components/sidebar/sidebar";
import CoursDetailsComponent from "../components/CoursDetailsComponent";

const CoursDetails = () => {
  return (
    <div>
      <Header />
      {/* sidebar */}
      <div className="flex w-full overflow-x-hidden">
        <Sidebar place="3" />
        {/* main content container */}
        <CoursDetailsComponent />
      </div>
    </div>
  );
};

export default CoursDetails;
