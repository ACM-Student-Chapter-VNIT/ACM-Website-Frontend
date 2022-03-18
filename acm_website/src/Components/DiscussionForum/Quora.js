import React , {useState} from "react";
import Feed from "./Feed";
import QuoraHeader from "./QuoraHeader";
import Sidebar from "./Sidebar";
import Widget from "./Widget";
import Footer from "../UI/Footer";
import "./css/Quora.css";




function Quora() {

  const [searchTerm , setSearchTerm] = useState('');

  return (
    <div className="quora">
      <QuoraHeader 
        setSearchTerm={setSearchTerm}
      />
      <div className="quora__contents">
        <div className="quora__content">
          <Sidebar />
          <Feed searchTerm={searchTerm}/>
          <Widget />
        </div>
      </div>
      <Footer id="contact"/>
    </div>
  );
}

export default Quora;
