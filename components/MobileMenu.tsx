import { useState, useEffect } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = "";
    } else {
      setIsMenuOpen(true);
      document.body.style.overflow = "hidden";
    }
  }

  useEffect(() => {
    return function reset() {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <button className="md:hidden lg:hidden" aria-label="Toggle menu" type="button" onClick={toggleMenu}>
        {!isMenuOpen && (
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M4 6H28V8H4zM4 24H28V26H4zM4 12H28V14H4zM4 18H28V20H4z"></path>
            <title>Menu</title>
          </svg>
        )}
        {isMenuOpen && (
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"></path>
            <title>Close</title>
          </svg>
        )}
      </button>


      {isMenuOpen && (
        <ul className="menu flex flex-col absolute bg-white w-full overflow-y-auto z-30 h-full min-h-screen max-h-screen">
          <li className="border-b border-gray-300">
            <Link href="/" className="flex w-auto pb-4 pt-4">
              Home
            </Link>
          </li>
          <li className="border-b border-gray-300">
            <Link href="/blog" className="flex w-auto pb-4 pt-4">
              Blog
            </Link>
          </li>
          <li className="border-b border-gray-300">
            <Link href="/portfolio" className="flex w-auto pb-4 pt-4">
              Portfolio
            </Link>
          </li>
          <li className="border-b border-gray-300">
            <Link href="/contact" className="flex w-auto pb-4 pt-4">
              Contact
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}
