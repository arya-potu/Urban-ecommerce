import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const Topbar = () => {
  return (
    <div className="bg-gradient-to-r from-rabbit-red via-red-700 to-rabbit-red text-white text-lg tracking-wide">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        
        {/* Social Icons */}
        <div className="hidden md:flex items-center space-x-5">
          <a href="#" className="hover:scale-110 transition-transform duration-300 hover:text-gray-200">
            <TbBrandMeta className="h-6 w-6" />
          </a>
          <a href="#" className="hover:scale-110 transition-transform duration-300 hover:text-gray-200">
            <IoLogoInstagram className="h-6 w-6" />
          </a>
          <a href="#" className="hover:scale-110 transition-transform duration-300 hover:text-gray-200">
            <RiTwitterXLine className="h-5 w-5" />
          </a>
        </div>

        {/* Announcement */}
        <div className="text-sm md:text-base text-center flex-grow font-light">
          <span className="uppercase tracking-widest">
            ✦ We ship worldwide — Fast & Reliable ✦
          </span>
        </div>

        {/* Contact */}
        <div className="text-sm hidden md:block font-medium">
          <a
            href="tel:+916305413271"
            className="hover:text-gray-200 transition-colors duration-300"
          >
            +91 6305413271
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
