import React, { useState, useEffect, useRef } from "react"; // Added React import
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";


import { 
  Home, 
  User, 
  LogOut, 
  Menu, 
  X,
  Info,
  Mail,
  LayoutDashboard,
  HeartHandshake,
  Trophy,
  Search,
  Package,
  Shield,
  Sparkles,
  ChevronDown
} from "lucide-react";

// Custom Hover Border Gradient Component
const HoverBorderGradient = ({ children, className, onClick, containerClassName = "" }) => {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState("top");

  const movingMap = {
    top: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    bottom: "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    left: "radial-gradient(25.7% 50% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    right: "radial-gradient(25.7% 50% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  };

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={`relative flex rounded-full content-center bg-black/10 hover:bg-black/20 transition duration-500 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px ${containerClassName}`}
    >
      <div className={`w-auto text-white z-10 bg-black px-6 py-2.5 rounded-[inherit] font-medium ${className}`}>
        {children}
      </div>
      <motion.div
        className="flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit] blur-sm"
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? movingMap[direction]
            : movingMap[direction],
        }}
        transition={{ duration: 0.5 }}
      />
      <div className="bg-black absolute z-1 flex-none inset-[2px] rounded-[100px]" />
    </button>
  );
};

// Background Gradient Component
const BackgroundGradient = ({ children, className = "", onClick }) => {
  return (
    <div className="relative p-[2px] group" onClick={onClick}>
      <div className="absolute inset-0 rounded-xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500 bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]" />
      <div className="absolute inset-0 rounded-xl z-[1] bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]" style={{ backgroundSize: '400% 400%' }} />
      <div className={`relative z-10 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 ${className}`}>
        {children}
      </div>
    </div>
  );
};

// Animated Logo Component
const AnimatedLogo = () => {
  return (
    <div className="relative">
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 border-2 border-dashed border-emerald-300/30 rounded-full"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-green-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20"
      >
        <motion.span 
          className="text-white font-bold text-lg"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          FN
        </motion.span>
      </motion.div>
     
    </div>
  );
};

// Floating Navigation Item Component - FIXED with proper React import
const FloatingNavItem = ({ item, isActive, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
   <Link
  to={item.path}
  onClick={onClick}
  className="relative flex items-center space-x-2 px-4 py-2 rounded-full"
>
  {isActive && (
    <motion.div
      layoutId="activeNav"
      className="absolute inset-0 bg-gradient-to-r from-emerald-100/80 to-teal-100/80 backdrop-blur-sm rounded-full border border-emerald-200 shadow-sm shadow-emerald-200"
      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
    />
  )}
  <motion.div
    animate={isActive ? { scale: 1.1 } : { scale: 1 }}
    className="relative z-10 flex items-center space-x-2"  // Added space-x-2 and wrapped everything
  >
    {React.cloneElement(item.icon, {
      className: `w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-gray-600'}`
    })}
    <motion.span
      
    
   className={`font-medium text-sm transition-colors ${
    isActive ? 'text-emerald-700' : 'text-gray-700'
      }`}
    >
      {item.label}
    </motion.span>
  </motion.div>
</Link>
    </motion.div>
  );
};

// Animated User Avatar Component
const AnimatedAvatar = ({ user }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <div className="relative">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 border-2 border-dashed border-emerald-300 rounded-full"
        />
        <div className={`w-10 h-10 bg-gradient-to-br rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg ${user?.userType === "donor" 
          ? "from-amber-400 to-orange-500" 
          : "from-blue-400 to-cyan-500"
        }`}>
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
        />
      </div>
    </motion.div>
  );
};

// Glass Morphism Logout Modal Component
const LogoutModal = ({ show, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={onCancel}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-black/20 max-w-md w-full p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-2xl" />
            
            <div className="relative">
              <div className="flex items-center space-x-4 mb-6">
                <motion.div
                  animate={{ rotate: [0, 20, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-2xl border border-red-200/50"
                >
                  <LogOut className="w-7 h-7 text-red-600" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-red-600 bg-clip-text text-transparent">
                    Leaving so soon?
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Are you sure you want to log out?
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onCancel}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 rounded-xl font-semibold transition-all duration-200 border border-gray-300/50 shadow-sm"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onConfirm}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 hover:from-red-600 hover:via-rose-600 hover:to-pink-600 text-white rounded-xl font-semibold shadow-lg shadow-red-500/25 transition-all duration-200 relative overflow-hidden group"
                >
                  <span className="relative z-10">Yes, Logout</span>
                  <motion.div
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600"
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Header Component - FIXED
export default function ModernHeader() {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const baseNavItems = [{ 
    path: "/", 
    label: "Home", 
    icon: <Home /> 
  }];

  const getUserSpecificNavItems = () => {
    if (!isAuthenticated) {
      return [
        { path: "/about", label: "About", icon: <Info /> },
        { path: "/contact", label: "Contact", icon: <Mail /> },
      ];
    }

    if (user?.userType === "donor") {
      return [
        { path: "/donor/dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
        { path: "/donor/donations", label: "My Donations", icon: <HeartHandshake /> },
        { path: "/donor/impact", label: "My Impact", icon: <Trophy /> },
      ];
    }

    if (user?.userType === "recipient") {
      return [
        { path: "/recipient/dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
        { path: "/recipient/food-listings", label: "Find Food", icon: <Search /> },
        { path: "/recipient/requests", label: "My Requests", icon: <Package /> },
      ];
    }

    return [];
  };

  const navItems = [...baseNavItems, ...getUserSpecificNavItems()];

  const handleLogout = async () => {
    try {
      setShowLogoutModal(false);
      setIsMobileMenuOpen(false);
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-200/60" 
            : "bg-white/95 backdrop-blur-md"
        }`}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-300/10 to-teal-300/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-300/10 to-cyan-300/10 rounded-full blur-3xl" />
        </div>

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-14 lg:h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <AnimatedLogo />
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                    FeedTheNeed
                  </span>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                  </motion.div>
                </div>
                <p className="text-xs text-gray-500 font-medium tracking-wider hidden sm:block">
                  NOURISHING COMMUNITIES
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <FloatingNavItem
                  key={item.path}
                  item={item}
                  isActive={location.pathname === item.path}
                  onClick={() => {}}
                />
              ))}
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <motion.div 
                    className="flex items-center space-x-3"
                    whileHover={{ scale: 1.02 }}
                  >
                    <AnimatedAvatar user={user} />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-900 max-w-[120px] truncate">
                        {user?.name}
                      </span>
                      <span className="text-xs text-gray-500 capitalize flex items-center">
                        <Shield className="w-3 h-3 mr-1" />
                        {user?.userType}
                      </span>
                    </div>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowLogoutModal(true)}
                    className="relative px-4 py-2 rounded-xl overflow-hidden border border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="relative flex items-center space-x-2 text-gray-700 hover:text-red-600">
                      <LogOut className="w-4 h-4" />
                      <span className="font-medium">Logout</span>
                    </div>
                  </motion.button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login">
                    <button className="px-6 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium">
                      Login
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold shadow-lg shadow-emerald-500/25 transition-all duration-200">
                      Get Started
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="w-5 h-5 text-gray-700" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="w-5 h-5 text-gray-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                ref={mobileMenuRef}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden"
                style={{ zIndex: 999 }}
              >
                <div className="py-4">
                  <div className="space-y-1 px-2">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.path}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={item.path}
                          onClick={closeMobileMenu}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                            location.pathname === item.path
                              ? "bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${
                            location.pathname === item.path
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}>
                            {React.cloneElement(item.icon, { className: "w-5 h-5" })}
                          </div>
                          <span className={`font-medium ${
                            location.pathname === item.path
                              ? "text-emerald-700"
                              : "text-gray-700"
                          }`}>
                            {item.label}
                          </span>
                          {location.pathname === item.path && (
                            <motion.div
                              layoutId="mobileActive"
                              className="ml-auto w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                            />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                    
                    {/* Auth Section Mobile */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="pt-4 mt-4 border-t border-gray-200"
                    >
                      {isAuthenticated ? (
                        <div className="space-y-3 px-2">
                          <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200">
                            <AnimatedAvatar user={user} />
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-gray-900 truncate">
                                {user?.name}
                              </div>
                              <div className="text-sm text-gray-500 capitalize truncate">
                                {user?.userType}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setShowLogoutModal(true);
                              closeMobileMenu();
                            }}
                            className="w-full flex items-center justify-center space-x-2 p-4 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl font-medium transition-all duration-200"
                          >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3 px-2">
                          <Link
                            to="/login"
                            onClick={closeMobileMenu}
                            className="block p-4 text-center text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-200"
                          >
                            Login
                          </Link>
                          <Link
                            to="/register"
                            onClick={closeMobileMenu}
                            className="block p-4 text-center text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl font-semibold shadow-lg shadow-emerald-500/25 transition-all duration-200"
                          >
                            Get Started Free
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* Logout Modal */}
      <LogoutModal
        show={showLogoutModal}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
      />

      {/* Add spacing for fixed header */}
      <div className="h-14 lg:h-16" />
    </>
  );
}