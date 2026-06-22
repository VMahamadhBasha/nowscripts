import { Link } from "react-router-dom";
import { whiteLogo, twitterIcon, linkedinIcon, facebookIcon } from "../../assets/icons";
import { MessageSquare } from "lucide-react";

export function FooterV2() {
  return (
    <footer className="bg-now-background border-t border-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-block mb-4 text-white hover:text-now-primary transition-colors">
              {whiteLogo}
            </Link>
            <p className="text-sm text-gray-500 mb-6 max-w-xs">
              Developers Connect Together. The ultimate ServiceNow learning ecosystem.
            </p>
            <div className="flex items-center gap-4 text-gray-400">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">{twitterIcon}</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">{linkedinIcon}</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">{facebookIcon}</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><MessageSquare className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Product</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/learn" className="hover:text-now-primary transition-colors">Learn</Link></li>
              <li><Link to="/roadmaps" className="hover:text-now-primary transition-colors">Roadmaps</Link></li>
              <li><Link to="/projects" className="hover:text-now-primary transition-colors">Projects</Link></li>
              <li><Link to="/certifications" className="hover:text-now-primary transition-colors">Certifications</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Resources</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/interview-prep" className="hover:text-now-primary transition-colors">Interview Prep</Link></li>
              <li><Link to="/community" className="hover:text-now-primary transition-colors">Community</Link></li>
              <li><a href="#" className="hover:text-now-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-now-primary transition-colors">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-sm tracking-wider">Company</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-now-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-now-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-now-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-now-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-600 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} NowScripts. All rights reserved.</p>
          <p className="mt-2 md:mt-0">ServiceNow is a registered trademark of ServiceNow, Inc.</p>
        </div>
      </div>
    </footer>
  );
}
