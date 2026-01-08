import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Package,
  LogOut,
  User,
  Heart,
  MessageSquare,
  Phone,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import ImageSlider from "./ImageSlider";

interface MainPageProps {
  defaultModal?: "login" | "register";
}

export default function FashionHeader({ defaultModal }: MainPageProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modal, setModal] = useState<"login" | "register" | null>(null);

  const [user, setUser] = useState<{
    userName: string;
    userEmail: string;
    role: string;
    profileImage?: string;
    _id: string;
  } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const isLoggedIn = !!user;

  useEffect(() => {
    if (defaultModal) setModal(defaultModal);
  }, [defaultModal]);

  const openRegister = () => setModal("register");
  const openLogin = () => setModal("login");
  const closeModal = () => setModal(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out successfully");
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleWishlistClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>
  ) => {
    if (!isLoggedIn) {
      e.preventDefault();
      toast.error("Please login to see your wishlist!");
      return;
    }
    setIsMenuOpen(false);
    navigate("/wishlist");
  };

  useEffect(() => {
      if (modal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
  
      return () => {
        document.body.style.overflow = "unset";
      };
    }, [modal]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <header className="relative flex items-center justify-between px-6 py-4  top-0 z-40">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          </div>
          <span className="text-2xl font-bold">Fashion</span>
        </div>

        <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <Link
            to="/product"
            className="font-bold text-gray-700 hover:text-purple-600 transition-colors"
          >
            Products
          </Link>
          <Link
            to="/wishlist"
            onClick={handleWishlistClick}
            className="font-bold text-gray-700 hover:text-purple-600 transition-colors"
          >
            My Wishlist
          </Link>
          <Link
            to="/aiChat"
            className="font-bold text-gray-700 hover:text-purple-600 transition-colors"
          >
            AI CHAT
          </Link>
          <Link
            to="/contact"
            className="font-bold text-gray-700 hover:text-purple-600 transition-colors"
          >
            Contact Us
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 bg-gray-50 border border-purple-300 pl-3 pr-4 py-2 rounded-full hover:shadow-md transition-all duration-300">
                <img
                  src={
                    user.profileImage ||
                    `https://ui-avatars.com/api/?name=${user.userName}`
                  }
                  alt="profile"
                  className="w-9 h-9 rounded-full object-cover border-2 border-purple-500"
                />
                <div className="text-left">
                  <p className="text-sm text-gray-500 leading-none">Welcome</p>
                  <p className="text-md font-bold text-gray-800">
                    {user.userName}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform duration-300" />
              </button>

              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
                <div className="p-2">
                  <Link
                    to="/myOrders"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-colors"
                  >
                    <Package className="w-4 h-4" /> My Orders
                  </Link>
                  <Link
                    to="/wishlist"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-xl transition-colors"
                  >
                    <User className="w-4 h-4" /> My Wishlist
                  </Link>
                  <div className="h-px bg-gray-100 my-1 mx-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              className="bg-purple-600 text-white px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 hover:bg-purple-700 transition-all transform hover:scale-105"
              onClick={openRegister}
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

        <button
          className="lg:hidden p-2 text-gray-600"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={28} />
        </button>

        {isMenuOpen && (
          <div className="fixed inset-0 z-[100] flex lg:hidden">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="relative w-80 bg-white h-full flex flex-col shadow-2xl transition-all duration-300">
              <div className="flex justify-between items-center p-6 border-b">
                <span className="font-bold text-2xl text-purple-600">
                  Fashion
                </span>
                <X
                  onClick={() => setIsMenuOpen(false)}
                  className="cursor-pointer text-gray-500"
                />
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {user && (
                  <div className="flex items-center gap-3 mb-8 p-4 bg-purple-50 rounded-2xl">
                    <img
                      src={
                        user.profileImage ||
                        `https://ui-avatars.com/api/?name=${user.userName}`
                      }
                      alt="profile"
                      className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                    />
                    <div className="overflow-hidden">
                      <p className="font-bold text-gray-800 truncate">
                        {user.userName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.userEmail}
                      </p>
                    </div>
                  </div>
                )}

                <nav className="flex flex-col gap-2">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-2">
                    Menu
                  </h3>
                  <Link
                    to="/product"
                    className="flex items-center gap-3 p-3 font-semibold text-gray-700 hover:bg-purple-50 rounded-xl"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Package size={20} className="text-purple-500" /> Products
                  </Link>
                  <button
                    onClick={handleWishlistClick}
                    className="w-full flex items-center gap-3 p-3 font-semibold text-gray-700 hover:bg-purple-50 rounded-xl"
                  >
                    <Heart size={20} className="text-purple-500" /> My Wishlist
                  </button>
                  <Link
                    to="/aiChat"
                    className="flex items-center gap-3 p-3 font-semibold text-gray-700 hover:bg-purple-50 rounded-xl"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MessageSquare size={20} className="text-purple-500" /> AI
                    CHAT
                  </Link>
                  <Link
                    to="/contact"
                    className="flex items-center gap-3 p-3 font-semibold text-gray-700 hover:bg-purple-50 rounded-xl"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Phone size={20} className="text-purple-500" /> Contact Us
                  </Link>

                  {user && (
                    <>
                      <div className="h-px bg-gray-100 my-4" />
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-2">
                        Account
                      </h3>
                      <Link
                        to="/myOrders"
                        className="flex items-center gap-3 p-3 font-semibold text-gray-700 hover:bg-purple-50 rounded-xl"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Package size={20} /> My Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        className="flex items-center gap-3 p-3 font-semibold text-gray-700 hover:bg-purple-50 rounded-xl"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User size={20} /> My Wishlist
                      </Link>
                    </>
                  )}
                </nav>
              </div>

              <div className="p-6 border-t bg-gray-50">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-3 p-3 font-bold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                  >
                    <LogOut size={20} /> Logout
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setTimeout(() => {
                        openRegister(); 
                      }, 50); 
                    }}
                    className="w-full bg-purple-600 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    Get Started <ArrowRight size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {modal && (
          <div className="fixed inset-0 z-[110] flex items-start sm:items-center justify-center p-4 sm:pt-0 pt-14 overflow-auto">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeModal}
            />
            <div className="bg-white rounded-3xl shadow-lg w-full max-w-5xl relative flex overflow-hidden border-2 border-purple-400 z-10 pt-10 sm:pt-0">
              <button
                onClick={closeModal}
                className="absolute top-3 right-4 w-8 h-8 rounded-full bg-gray-200 text-2xl font-bold z-20 hover:bg-gray-300 transition-colors"
              >
                ×
              </button>
              <ImageSlider />
              {modal === "register" ? (
                <RegisterForm onSignInClick={openLogin} onClose={closeModal} />
              ) : (
                <LoginForm
                  onRegisterClick={openRegister}
                  onClose={closeModal}
                  onLoginSuccess={(userData) => {
                    setUser(userData);
                    localStorage.setItem("user", JSON.stringify(userData));
                    closeModal();
                  }}
                />
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
