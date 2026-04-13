'use client';
import { FC, useEffect, useState } from 'react';

import SidebarMenu from '@/components/SidebarMenu';
import { AnimatePresence } from 'framer-motion';
import LogoIcon from '@/icons/ApproachIcons/LogoIcon';

interface Props {
  overlay?: boolean;
}

const Index: FC<Props> = ({ overlay = false }) => {
  const [isActive, setIsActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeSidebar = () => setIsActive(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsActive(false);
    };
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    document.addEventListener("keydown", handleEscape);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Sticky Navbar */}
      <div
        className={`fixed top-0 left-0 z-[4001] w-full flex items-center justify-between transition-all duration-500 ease-in-out mb-4
          ${scrolled
            ? 'py-2 px-6 backdrop-blur-md bg-black/40 shadow-lg'
            : 'py-0 px-0 bg-transparent'
          }`}
      >
        <button title="AlphaTech" className="group pb-0 p-[1vw]">
          <LogoIcon
            width={scrolled ? '4vw' : '7vw'}
            height={scrolled ? '4vw' : '7vw'}
            className="transition-all duration-500 hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]"
          />
        </button>

        <div className="p-[1.5vw]">
          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className={`flex cursor-pointer items-center justify-center rounded-full bg-stone-400 transition-all duration-500
              ${scrolled ? 'h-[2.4vw] w-[2.4vw]' : 'h-[3.5vw] w-[3.5vw]'}`}
          >
            <div className={`burger ${isActive && 'burgerActive'}`}></div>
          </button>
        </div>
      </div>

      {/* Spacer so content doesn't hide behind sticky nav, ignored if overlay is true */}
      {!overlay && <div className={`transition-all duration-500 ${scrolled ? 'h-[6vw]' : 'h-[9vw]'}`} />}

      <AnimatePresence mode="wait">
        {isActive && <SidebarMenu close={closeSidebar} />}
      </AnimatePresence>
    </div>
  );
};
export default Index;
