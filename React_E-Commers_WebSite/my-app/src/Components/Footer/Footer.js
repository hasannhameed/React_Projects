import React from 'react';
import { Image } from 'react-bootstrap';
import './Footer.css';
import image7 from './facebook-8.png';
import image8 from './youtube-7.png';
import image9 from './spotigy-9.png';

const Footer = () => {
  return (
    <footer>
      <div className="footer-title">The Generics</div>
      <div className="footer-icons">
        <ul>
          <li><a href="https://www.youtube.com">
            <Image src={image7} rounded />
          </a></li>
          <li><a href="https://spotify.com">
            <Image src={image8} rounded />
          </a></li>
          <li><a href="https://facebook.com">
            <Image src={image9} rounded />
          </a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
