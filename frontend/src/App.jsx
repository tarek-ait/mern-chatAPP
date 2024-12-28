import NavBar from './components/NavBar'
import { useEffect } from 'react'
import { Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { useAuthStore } from './store/useAuthStore'
import { useThemeStore } from './store/useThemeStore'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
const App = () => {
  const { authUser, isCheckingAuth, checkAuth,onlineUsers } = useAuthStore();
 
  console.log("online users",onlineUsers);

  const {theme} = useThemeStore()
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }



  return (
    <div  className="flex flex-col min-h-screen" data-theme={theme}>
      <NavBar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={authUser ? "/" : "/login"} />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;