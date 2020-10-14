import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { Drawer, Button } from "antd";
import "antd/dist/antd.css";
import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import SideDrawer from "./SideDrawer";



const element = <FontAwesomeIcon icon={faBars} />

function showDrawer() {
//   const [visible, setVisible] = useState(false);

//   const showDrawer = () => {
//     setVisible(true);
//   };

//   const onClose = () => {
//     setVisible(false);
//   };

  return (

    <>  
        {/* <div type="primary" onClick={showDrawer} className="hamberger">
          
          <FontAwesomeIcon icon={faBars} style={{ height: '30px',width:'30px' }} />
          
        </div> */}
     

      <Drawer
        // title="Basic Drawer"
        zIndex="0"
        bodyStyle={{ marginTop: "47px" }}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        >
        <div>
          <a href="#">Home</a>
        </div>
        <div>
          <a href="#">Search</a>
        </div>
        <div>
          <a href="#">About Us</a>
        </div>
        <div>
          <a href="#">Contact Us</a>
        </div>
        <div>
          <a href="#">Login</a>
        </div>
        <div>
          <a href="#">Register</a>
        </div>

        {/* <a href="#">My Profile</a>
        <a href="#">My Task</a>
        <a href="#">Home</a>
        <a href="#">Search</a>
        <a href="#">About Us</a>
        <a href="#">Contact Us</a>
        <a href="#">Register as provider</a>
      <a href="#">Logout</a> */}

        {/* <a href="#">My Profile</a>
        <a href="#">My Task</a>
        <a href="#">Home</a>
        <a href="#">Search</a>
        <a href="#">About Us</a>
        <a href="#">Contact Us</a>
        <a href="#">Login as provider</a>
      <a href="#">Logout</a> */}

        {/* <a href="#">My Profile</a>
        <a href="#">My Task</a>
        <a href="#">Home</a>
        <a href="#">Search</a>
        <a href="#">About Us</a>
        <a href="#">Contact Us</a>
        <a href="#">Login as customer</a>
      <a href="#">Logout</a> */}
      </Drawer>
      
    </>
  );
}

export default SideDrawer;



