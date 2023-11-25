import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa6";

const Footer = () => {
  const year = new Date().getFullYear()
  
  return (
    <>
      <footer className="bg-black text-center text-light pt-4 pb-3">
        <h3>Gain Solution Ltd.</h3>
        <p className="w-50 mx-auto">
          Gain Solutions is a web development company. We develop web
          applications for the customers all over the world.
        </p>
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="mx-3">
          <FaTwitter />
        </a>
        <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
          <FaLinkedinIn />
        </a>
        <a href="https://www.instagram.com/"  target="_blank" rel="noreferrer" className="mx-3">
          <FaInstagram />
        </a>

        <p className="mt-5 mb-0">@Copyright and All Rights Reserved, {year}</p>
      </footer>
    </>
  );
};

export default Footer;
