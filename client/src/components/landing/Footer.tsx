import { Link } from "react-router-dom";
import { whiteLogo } from "../../assets/icons";

export const Footer = () => {
  return (
    <footer className="bg-[#020617] border-t border-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div className="col-span-1 md:col-span-2">
          <div className="mb-4">{whiteLogo}</div>
          <p className="text-gray-400 max-w-sm mb-6">
            The premium platform for ServiceNow developers. Developers Connect Together.
          </p>
          <div className="flex gap-4">
            <Link to="#" className="text-gray-500 hover:text-white">GitHub</Link>
            <Link to="#" className="text-gray-500 hover:text-white">LinkedIn</Link>
            <Link to="#" className="text-gray-500 hover:text-white">YouTube</Link>
            <Link to="#" className="text-gray-500 hover:text-white">Discord</Link>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Platform</h4>
          <ul className="space-y-2">
            <li><Link to="/learn" className="text-gray-400 hover:text-now-primary text-sm">Learn</Link></li>
            <li><Link to="/roadmaps" className="text-gray-400 hover:text-now-primary text-sm">Roadmaps</Link></li>
            <li><Link to="#" className="text-gray-400 hover:text-now-primary text-sm">Projects</Link></li>
            <li><Link to="#" className="text-gray-400 hover:text-now-primary text-sm">Interview Prep</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Community</h4>
          <ul className="space-y-2">
            <li><Link to="#community" className="text-gray-400 hover:text-now-primary text-sm">Discussions</Link></li>
            <li><Link to="#" className="text-gray-400 hover:text-now-primary text-sm">Blogs</Link></li>
            <li><Link to="/certifications" className="text-gray-400 hover:text-now-primary text-sm">Certifications</Link></li>
            <li><Link to="#" className="text-gray-400 hover:text-now-primary text-sm">Knowledge Base</Link></li>
          </ul>
        </div>

      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-16 pt-8 border-t border-gray-800 text-center md:text-left text-gray-500 text-sm flex flex-col md:flex-row justify-between">
        <p>&copy; {new Date().getFullYear()} NowScripts. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4 md:mt-0">
          <Link to="#" className="hover:text-white">Privacy Policy</Link>
          <Link to="#" className="hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};
