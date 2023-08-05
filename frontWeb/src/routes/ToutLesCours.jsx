import "../index.css";
import Header from "../components/header";
import Sidebar from "../components/sidebar/sidebar";

import AllCoursComponent from "../components/AllCoursComponent";

const Product = () => {
  // const [search_product, setSearchProduct] = useState("");
  console.log("Product Reached");
  return (
    <div>
      <Header />
      {/* sidebar */}
      <div className="flex w-full overflow-x-hidden">
        <Sidebar place="3" />
        {/* main content container */}
        <AllCoursComponent />
      </div>
    </div>
  );
};

export default Product;
