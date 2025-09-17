import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

// Import the new CSS file
import '../styles/navbar.css';

import AuthContext from '../context/AuthContext';
import Logo from './Logo';
import { MdPostAdd, MdAddCircleOutline } from 'react-icons/md';
import { RxAvatar, RxDashboard } from 'react-icons/rx';
import { RiLogoutBoxRLine } from 'react-icons/ri';

const react_base_url = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignout = async () => {
    logout();
    navigate('/');
    try {
      await axios.post(`${react_base_url}/users/logout`);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className='navbar-header'>
      <nav className='navbar-container'>
        <div className='navbar-brand'>
          <Link to={user ? '/home' : '/'} aria-label='Go to homepage'>
            <Logo />
          </Link>
        </div>

        <div className='navbar-actions'>
          {user ? (
            // Authenticated User View
            <>
              <div className='navbar-actions-desktop'>
                <Link to='/blogs/blog/create-blog' className='navbar-btn primary'>
                  <MdAddCircleOutline size={20} />
                  <span>Add Blog</span>
                </Link>

                {/* VISIBLE PROFILE LINK */}
                <NavLink
                  to='/profile'
                  className={({ isActive }) =>
                    isActive ? 'navbar-link profile-link active' : 'navbar-link profile-link'
                  }
                >
                  <RxAvatar size={18} />
                  <span>Profile</span>
                </NavLink>
              </div>

              {/* User Dropdown Menu */}
              <div className='dropdown-wrapper' ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className='avatar-button'
                >
                  {user.avatar_url ? (
                    <img src={user.avatar_url} alt='User avatar' className='avatar-img'/>
                  ) : (
                    <div className='avatar-initials'>
                      {user.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
                    </div>
                  )}
                </button>

                {showDropdown && (
                  <div className='dropdown-menu'>
                    <div className='dropdown-header'>
                      <p className='dropdown-user-name'>{user.name}</p>
                      <p className='dropdown-user-email'>{user.email}</p>
                    </div>
                    <ul className='dropdown-list'>
                      <li className='dropdown-item-mobile'>
                        <NavLink to='/blogs/blog/create-blog' className={({ isActive }) => (isActive ? 'dropdown-link active' : 'dropdown-link')}>
                          <MdPostAdd /> Add Blog
                        </NavLink>
                      </li>
                      <li className='dropdown-item-mobile'>
                        <NavLink to='/profile' className={({ isActive }) => (isActive ? 'dropdown-link active' : 'dropdown-link')}>
                          <RxAvatar /> Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to='/dashboard' className={({ isActive }) => (isActive ? 'dropdown-link active' : 'dropdown-link')}>
                          <RxDashboard /> Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <button onClick={handleSignout} className='dropdown-link logout-btn'>
                          <RiLogoutBoxRLine /> Sign Out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Unauthenticated User View
            <div className='auth-buttons'>
              <Link to='/login' className='navbar-btn'>
                Login
              </Link>
              <Link to='/register' className='navbar-btn secondary'>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;