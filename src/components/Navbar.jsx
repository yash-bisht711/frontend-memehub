import { Search } from "lucide-react";
import { Link } from "react-router-dom";

function Navigation() {

  return (
    <nav className="bg-surface-a0/90 backdrop-blur border-b border-surface-a30 shadow sticky top-0 z-50 p-2 px-6 flex justify-between">

      <Link to="/" className="text-2xl font-bold text-primary-a10">
        Meme Stream
      </Link>

      <div className="flex items-center bg-surface-a20/30 rounded-full p-2 hover:bg-surface-a10 duration-300 ease-in-out active:bg-amber-100">
        <Search className="text-white/30 w-6 h-6" />
        <input
          type="text"
          className="w-120 ps-1 outline-0"
          placeholder="Search Meme"
        />
      </div>

      <Link
        to='/login'
        className="bg-primary-a10 p-2 px-3 rounded-3xl text-white font-semibold flex justify-center items-center hover:bg-primary-a0"
      >
        Log in
      </Link>

    </nav>
  );
}

export default Navigation;
