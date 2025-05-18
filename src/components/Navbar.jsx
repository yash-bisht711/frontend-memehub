import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPost } from "../redux/AppSlice";
import { logoutFirebase } from "../redux/AppSlice";

function Navigation() {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceTimeout = useRef(null);
  const { user } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    navigate("/");

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      dispatch(searchPost(value));
    }, 400);
  };

  return (
    <nav className="bg-surface-a0/90 backdrop-blur border-b border-surface-a30 shadow sticky top-0 z-50 p-2 px-6 flex justify-between">
      <Link to="/" className="text-2xl font-bold text-primary-a10">
        <img src="" alt="" sizes="" srcset="" />
        Meme Stream
      </Link>

      <div className="flex items-center bg-surface-a20/30 rounded-full p-2 hover:bg-surface-a10 duration-300 ease-in-out">
        <Search className="text-white/30 w-6 h-6" />
        <input
          type="text"
          className="w-120 ps-1 outline-0"
          placeholder="Search Meme"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {user ? (
        <button
          onClick={() => dispatch(logoutFirebase())}
          className="bg-primary-a10 p-2 px-3 rounded-3xl text-white font-semibold flex justify-center items-center hover:bg-primary-a0"
          type="button"
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="bg-primary-a10 p-2 px-3 rounded-3xl text-white font-semibold flex justify-center items-center hover:bg-primary-a0"
        >
          Log In
        </Link>
      )}
    </nav>
  );
}

export default Navigation;
