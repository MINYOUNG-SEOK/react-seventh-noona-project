import React, { useEffect, useState } from 'react';
import './Navbar.style.css';
import { Outlet } from 'react-router-dom';


const Navbar = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const categories = [
    { href: '#home', label: '홈' },
    { href: '#movies', label: '영화' },
    { href: '#new', label: 'NEW! 요즘 대세 콘텐츠' },
    { href: '#my-list', label: '내가 찜한 리스트' },
    { href: '#languages', label: '언어별로 찾아보기' },
  ];

  return (
    <div className={`nav ${show ? 'nav__black' : ''}`}>

      <div className='logo__area'>
        <img
          src='/img/netflix__logo.png'
          alt='netflix__logo'
          className='nav__logo'
          onClick={() => window.location.reload()}
        />
      </div>

      <div className='category__area'>
        {categories.map((category, index) => (
          <a key={index} href={category.href}>
            {category.label}
          </a>
        ))}
      </div>

      <div className='avatar__area'>
        <img
          src='/img/netflix__avatar.png'
          alt='netflix__avatar'
          className='nav__avatar'
        />
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
