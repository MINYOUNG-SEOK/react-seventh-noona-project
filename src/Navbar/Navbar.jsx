import React, { useEffect, useState } from 'react';
import './Navbar.style.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCaretDown } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [keyword, setKeyword] = useState('');
  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const categories = [
    { href: '/', label: '홈' },
    { href: '/series', label: '시리즈' },
    { href: '/movies', label: '영화' },
    { href: '/my-list', label: '내가 찜한 리스트' },
    { href: '/languages', label: '언어별로 찾아보기' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/movies?q=${encodeURIComponent(keyword)}&genre=null`);
      setKeyword('');
      setShowSearch(false);
    }
  };

  const isMoviePage = location.pathname.includes('/movies');

  return (
    <div className={`nav ${show ? 'nav__black' : ''}`}>
      <div className='logo__area'>
        <a href="/">
          <img
            src='/img/netflix__logo.png'
            alt='netflix__logo'
            className='nav__logo'
          />
        </a>
      </div>

      <div className='menu__button' onClick={() => setShowMenu(!showMenu)}>
        <div className="menu__container">
          <span className='menu__text'>메뉴</span>
          <FontAwesomeIcon icon={faCaretDown} className='menu__icon' />
        </div>
      </div>

      <div className={`category__area ${showMenu ? 'show' : ''}`}>
        {categories.map((category, index) => (
          <a key={index} href={category.href}>
            {category.label}
          </a>
        ))}
      </div>

      <div className='searchAndAvatar__container'>
        {!isMoviePage && (
          <>
            <button className='search__icon' onClick={() => setShowSearch(!showSearch)}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <form onSubmit={handleSearchSubmit} className={`search__input-container ${showSearch ? 'active' : ''}`}>
              <input
                type='text'
                className='search__input'
                placeholder='어떤 영화를 볼까요?'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </form>
          </>
        )}
        <img
          src='/img/netflix__avatar.png'
          alt='netflix__avatar'
          className='nav__avatar'
        />
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
