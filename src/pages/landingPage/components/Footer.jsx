import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 p-4 text-center text-sm text-gray-700 dark:text-gray-300">
      © {new Date().getFullYear()} Learnverse. Tüm hakları saklıdır.
    </footer>
  );
};

export default Footer;
