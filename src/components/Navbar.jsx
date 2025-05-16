import { Link } from "react-router-dom";

function Navigation() {

  return (
    <nav className="bg-surface-a0/90 backdrop-blur border-b border-surface-a30 shadow sticky top-0 z-50 p-2 px-6 flex justify-between">

      <Link to="/" className="text-2xl font-bold text-blue-600">
        MemeHub 🚀
      </Link>



      <Link
        to='/login'
        className="bg-primary-a10 p-2 px-3 rounded-3xl text-white font-semibold hover:bg-primary-a0"
      >
        Log in
      </Link>

    </nav>
  );
}

export default Navigation;
