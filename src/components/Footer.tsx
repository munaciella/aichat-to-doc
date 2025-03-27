import { FaGithub, FaLinkedin } from "react-icons/fa";
import logo from "../../public/paperly.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 py-10 transition-colors">
      <div className="container mx-auto px-4">
        {/* Footer Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xs:grid-cols-2 xs:gap-14">
          {/* About Section */}
          <div>
            <Link href="/" className="flex items-center gap-3 -mt-2">
              <Image src={logo} alt="Logo" className="w-12 h-12" />
              <span className="text-indigo-600 dark:text-indigo-400 text-lg font-semibold -mt-2">
                Paperly
              </span>
            </Link>
            <p className="text-md text-gray-600 dark:text-gray-400 mt-2">
              Turn your documents into smart, conversational experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 dark:text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard/upgrade" className="hover:underline underline-offset-4 hover:text-indigo-500 transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:underline underline-offset-4 hover:text-indigo-500 transition">
                  My Documents
                </Link>
              </li>
              <li>
                <Link href="/dashboard/upload" className="hover:underline underline-offset-4 hover:text-indigo-500 transition">
                  Upload
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="text-gray-900 dark:text-white text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="hover:underline underline-offset-4 hover:text-indigo-500 transition">
                  Terms Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline underline-offset-4 hover:text-indigo-500 transition">
                  Privacy Policy
                </Link>
              </li>
              {/* <li>
                <Link href="/cookies" className="hover:underline underline-offset-4 hover:text-indigo-500 transition">
                  Cookie Policy
                </Link>
              </li> */}
              <li>
                <Link href="mailto:francesco.vurchio82@gmail.com" className="hover:underline underline-offset-4 hover:text-indigo-500 transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-gray-900 dark:text-white text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/munaciella"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
              >
                <FaGithub size={26} className="hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://linkedin.com/in/francesco-vurchio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500 transition"
              >
                <FaLinkedin size={26} className="hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 dark:border-gray-700 mt-10"></div>

        {/* Footer Bottom */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <p>© Paperly {new Date().getFullYear()}.</p>
          <div className="flex items-center space-x-1 mt-3 sm:mt-0">
            <span>
              Made with <span className="text-red-500 dark:text-red-400 text-md">&#9825;</span> by
            </span>
            <Link
              href="https://francescovurchio-dev.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              francesco.dev
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
