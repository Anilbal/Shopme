import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { CiFacebook } from "react-icons/ci";
import { FaTiktok } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { FaSnapchat } from "react-icons/fa6";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="first_footer">
        <p>Do you want to be among the first to know about sale time?</p>
        <form>
        <input type="text" name="" id="" placeholder="Enter Your Mail" />
        <button>Subscribe</button>
        </form>
      </div>
      <div className="main_footer">
        <div className="main_one">
          <h2>Shop Me</h2>
          <p>
            Worldwide fashion store with wide collection of styles with over 100
            international fashion brands.
          </p>
          <div className="icons">
            <ul>
              <li>
                <IoLogoInstagram />
              </li>
              <li>
                <CiFacebook />
              </li>
              <li>
                <FaTiktok />
              </li>
              <li>
                <FiYoutube />
              </li>
              <li>
                <FaSnapchat />
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-info">
        <div className="main_two">
          <h2>Information</h2>
          <ul>
            <li>About us</li>
            <li>Search</li>
            <li>Contacts</li>
          </ul>
        </div>
        <div className="main_two">
          <h2>GET SHOPPING</h2>
          <ul>
            <li>Men</li>
            <li>Women</li>
            <li>Accesssories </li>
          </ul>
        </div>
        <div className="main_two">
          <h2>CONTACTS</h2>
          <ul>
            <li>Phone:999999999</li>
            <li>Email:anilbal@gmail.com</li>
            <li>Address: Boudha,Kathmandu</li>
          </ul>
        </div>
        </div>
      </div>
      <div className="last_footer">
        <p>&copy;2023, Shopme.com</p>
        <div className="payment">
            <img src="./images/visa.jpg" alt="" />
            <img src="./images/Esewa.png" alt="" />
            <img src="./images/Khalti.jpg" alt="" />
            <img src="./images/imepay.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
