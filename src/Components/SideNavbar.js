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
        width: "13%",
        backgroundColor: "#ededed",
        height: "100%",
        position: "fixed",
       
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
          <ul style={{ marginTop: "55%",marginLeft:"15%" }}>
            <li className="animation-li">
              <a href="/" className="ahref">
                <FaHome className="icons" />
                Home
              </a>
            </li>

            <br />
            <li className="animation-li">
              <a href="/" className="ahref">
                <GrCircleInformation className="icons2" />
                Information
              </a>
            </li>
            <br />
            <li className="animation-li">
              <a href="/" className="ahref">
                {" "}
                <GrContact className="icons3" />
                Contact Us
              </a>
            </li>
          </ul>

          <div style={{ marginTop: "170%" }}>
            <h3
              style={{
                marginLeft: "95px",
                marginBottom: "25px",
                fontFamily: "Delicious Handrawn, cursive",
              }}
            >
              Follow Us!
            </h3>
            <ul style={{ display: "flex", listStyle: "none", gap: "25px",  }}>
              <li>
                <FaFacebook className="follow-icons" />
              </li>
              <li>
                <FaInstagramSquare className="follow-icons" />
              </li>
              <li>
                <FaTwitter className="follow-icons" />
              </li>
              <li>
                <FaLinkedin className="follow-icons" />
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
