import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const Topbar = () => {
  return (
    <div className="bg-neutral-950 text-neutral-200 text-xs md:text-sm tracking-[0.25em] border-b border-neutral-800">
      <div className="container mx-auto flex justify-between items-center py-2 px-4 md:px-8">
        
        {/* Social Icons */}
        <div className="hidden md:flex items-center space-x-5">
          <a href="#" className="hover:text-neutral-400 transition-colors duration-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-neutral-400 transition-colors duration-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-neutral-400 transition-colors duration-300">
            <RiTwitterXLine className="h-4 w-4" />
          </a>
        </div>

        {/* Announcement */}
        <div className="flex-grow text-center font-light">
          <span className="uppercase text-neutral-300">
            ✦ We Ship Worldwide — Fast & Reliable ✦
          </span>
        </div>

        {/* Contact */}
        <div className="hidden md:block font-medium">
          <a
            href="tel:+916305413271"
            className="hover:text-neutral-400 transition-colors duration-300"
          >
            +91 6305413271
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
