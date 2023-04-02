import React, { useState } from "react";
import { Button } from "reactstrap";
import {
  FaRegTimesCircle,
  FaHome,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagramSquare,
} from "react-icons/fa";
import { GoThreeBars } from "react-icons/go";
import { GrCircleInformation, GrContact } from "react-icons/gr";

export default function SideNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [style, setStyle] = useState();
  

  function toggle() {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      setStyle({
        width: "300px",
        backgroundColor: "#ededed",
        height: "1065px",
        position: "fixed",
        marginTop:"0px"
      });
    } else {
      setIsMenuOpen(false);
      setStyle({
        backgroundColor: "white",
      });
    }
  }

 

  return (
    <div style={style}>
      <Button onClick={toggle} className="sidenav-btn">
        {isMenuOpen ? <FaRegTimesCircle /> : <GoThreeBars />}
      </Button>
      {isMenuOpen && (
        <div>
          <ul style={{ marginTop: "50px" }}>
            <li className="menu-items-style animation-li">
              <FaHome className="icons" />
              Home
            </li>

            <br />
            <li className="menu-items-style1 animation-li">
              <GrCircleInformation className="icons2" />
              Information
            </li>
            <br />
            <li className="menu-items-style2 animation-li">
              <GrContact className="icons3" />
              Contact Us
            </li>
            
          </ul>
          
          <div style={{marginTop:"430px"}}>
           <h3 style={{marginLeft:"95px",marginBottom:"25px",fontFamily:"Delicious Handrawn, cursive"}}>Follow Us!</h3>
            <ul style={{ display: "flex", listStyle: "none", gap: "25px" }}>
              <li>
                <FaFacebook className="follow-icons" />
              </li>
              <li>
                <FaInstagramSquare className="follow-icons"/>
              </li>
              <li>
                <FaTwitter className="follow-icons"/>
              </li>
              <li>
                <FaLinkedin className="follow-icons"/>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>

   
  );
}
