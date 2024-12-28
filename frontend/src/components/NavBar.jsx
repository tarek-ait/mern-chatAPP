
import { useAuthStore } from '../store/useAuthStore.js'; // Adjust the import path as necessary
import { Link } from 'react-router-dom';
import { MessageSquare, Settings, User, LogOut } from 'lucide-react'; // Adjust the import path as necessary

const NavBar = () => {
  const { logout } = useAuthStore();

  const {  authUser } = useAuthStore();

  return (
    <header className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 background-blur-lg bg-base-100/80'>
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap=2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary">

                </MessageSquare>
              </div>
              <h1 className='text-lg font-blog'>&nbsp;&nbsp;Chatty</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">

            <Link to={"/settings"}
              className={`btn btn-sm gap-2 transition-colors`}>
              <Settings className="w-4 h-4"></Settings>
              <span className="hidden sm:inline">Settings</span>
            </Link>

            { authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                <User className="size-5"></User>
                <span className="hidden sm:inline">Profile</span>
                </Link>
                
                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5"></LogOut>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavBar
