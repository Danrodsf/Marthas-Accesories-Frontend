import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container container">
        <div className="social">
          <a href="" className="footer-links">
            <i class="fa fa-instagram"></i>
          </a>
          <a href="/" className="footer-links">
            <i class="fa fa-facebook-official"></i>
          </a>
          <a href="/" className="footer-links">
            @
          </a>
        </div>
        <div className="copyright">
          © 2021, Martha's Accesories. Web diseñada por: Daniel Rodriguez
        </div>
      </div>
    </div>
  );
};

export default Footer;
