import "../index.css";
import Header from "../components/header";
import Sidebar from "../components/sidebar/sidebar";

import MesCoursComponent from "../components/MesCoursComponent";

const MesCours = () => {
  return (
    <div>
      <Header />
      {/* sidebar */}
      <div className="flex w-full overflow-x-hidden">
        <Sidebar place="2" />
        {/* main content container */}
        <MesCoursComponent />
      </div>
    </div>
  );
};

export default MesCours;
