import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation, NavLink } from "react-router-dom";

import "./header.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);

  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState("");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // location ka use karne se if new page me enter karte hai to starting position se page start hota hai 
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  // controller here scrolling y axis
  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide")
      } else {
        setShow("show")
      }
    } else {
      setShow("top") // by default top set hoti hai 
    }
    setLastScrollY(window.scrollY)
  }

  useEffect(() => {
    // if react me event lister add karte hai to use remove bhi karna hota hai nahi to memory crash issuse create hota hai
    window.addEventListener("scroll", controlNavbar)
    return () => {
      window.removeEventListener("scroll", controlNavbar)
    }
  }, [lastScrollY])

  // input box
  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
      setTimeout(() => {
        setShowSearch(false)
      }, 1000);
    }
  };

  // serach menu
  const openSearch = () => {
    setMobileMenu(false)
    setShowSearch(true)
  };

  // Hamberger menu
  const openMobileMenu = () => {
    setMobileMenu(true)
    setShowSearch(false)
  }

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie")
    } else {
      navigate("/explore/tv")
    }
    setMobileMenu(false)
  }

  return (
    <>
      <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`
      }>
        <ContentWrapper>
          <div className="logo" onClick={() => navigate("/")}>
            <img src={logo} alt="logo image" />
          </div>
          <ul className="menuItems">
            <li className="menuItem" onClick={() => navigationHandler("movie")}>Movies</li>
            <li className="menuItem" onClick={() => navigationHandler("tv")}>Tv</li>
            <li className="menuItem" onClick={openSearch} ><HiOutlineSearch /></li>
          </ul>
          <div className="mobileMenuItems">
            <HiOutlineSearch onClick={openSearch} />
            {
              mobileMenu ?
                (<VscChromeClose
                  onClick={() => setMobileMenu(false)}
                />) :
                (<SlMenu
                  onClick={openMobileMenu}
                />)
            }
          </div>
        </ContentWrapper>
        {showSearch && <div className="searchBar">
          <ContentWrapper>
            <div className='searchInput'>
              <input
                type="text"
                placeholder='Search for a movie & tv show...'
                onChange={(event) => setQuery(event.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose
                onClick={() => setShowSearch(false)}
              />
            </div>
          </ContentWrapper>
        </div>}
      </header>
    </>
  );
};

export default Header;
