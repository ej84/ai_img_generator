import useAuth from "../hooks/useAuth";
import AuthButton from "./AuthButton";
import SignOutButton from "./SignoutButton";

const Nav = () => {
  const { user } = useAuth();
  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-white shadow">
      <div className="container md:mx-auto flex justify-between items-center px-9 py-4">
        <a
          className="fixed md:left-14 font-bold text-md md:text-3xl text-gray-800"
          href="/"
        >
          LOGO
        </a>
        <div className="absolute w-full max-w-sm mx-auto md:max-w-xl">
          <input
            type="search"
            className="w-full h-14 pl-8 pr-10 border border-gray-300 rounded-full text-sm focus:outline-none"
            placeholder="Search for an illustration..."
          />
          <button
            type="submit"
            className="absolute right-0 top-2 px-4 mt-1 mr-3 h-8 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none"
          >
            Search
          </button>
        </div>
        <div className="fixed right-6">
          {user ? <SignOutButton /> : <AuthButton title="Log in for more" />}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
