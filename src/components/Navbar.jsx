import { useEffect, useState } from "react";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar({ searchTerm, setSearchTerm }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 80);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`nav ${show ? "nav_black" : ""}`}>
      <div className="nav_left">
        <h1 className="logo">NETFLIX</h1>

        <span>Home</span>
        <span>TV Shows</span>
        <span>Movies</span>
        <span>New & Popular</span>
        <span>My List</span>
      </div>

      <div className="nav_right">
        <div className="search_box">
          <FaSearch className="search_icon" />

          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <FaBell className="nav_icon" />

        <FaUserCircle className="profile_icon" />

        <button
          className="logout_btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}