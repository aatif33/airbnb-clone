import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* SUPPORT */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <FooterLink to="/support/help" label="Help Centre" />
            <FooterLink to="/support/safety" label="Safety information" />
            <FooterLink to="/support/cancellation" label="Cancellation options" />
            <FooterLink to="/support/neighbourhood" label="Report a concern" />
          </ul>
        </div>

        {/* HOSTING */}
        <div>
          <h3 className="font-semibold mb-4">Hosting</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <FooterLink to="/host/home" label="Airbnb your home" />
            <FooterLink to="/host/experience" label="Airbnb your experience" />
            <FooterLink to="/host/service" label="Airbnb your service" />
            <FooterLink to="/host/resources" label="Hosting resources" />
            <FooterLink to="/host/community" label="Community forum" />
          </ul>
        </div>
        {/* COMPANY */}
        <div>
          <h3 className="font-semibold mb-4">Airbnb</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <FooterLink to="/company/newsroom" label="Newsroom" />
            <FooterLink to="/company/careers" label="Careers" />
            <FooterLink to="/company/investors" label="Investors" />
            <FooterLink to="/company/airbnb-org" label="Airbnb.org" />
          </ul>
        </div>

        {/* SOCIAL + LANGUAGE */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="font-semibold mb-4">Follow us</h3>
            <div className="flex gap-4 text-gray-600">
              <SocialIcon Icon={FaFacebookF} />
              <SocialIcon Icon={FaTwitter} />
              <SocialIcon Icon={FaInstagram} />
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-black transition">
            <FaGlobe />
            <span>English (IN)</span>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t py-6 px-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <span>© {new Date().getFullYear()} Airbnb clone · Built by you</span>

        <div className="flex gap-4">
          <Link className="hover:underline" to="/policies/aircover">
            AirCover
          </Link>
          <Link className="hover:underline" to="/policies/anti-discrimination">
            Anti-discrimination
          </Link>
        </div>
      </div>
    </footer>
  );
}

/* 🔹 Small reusable components */

function FooterLink({ to, label }) {
  return (
    <li>
      <Link
        to={to}
        className="hover:text-black hover:underline transition"
      >
        {label}
      </Link>
    </li>
  );
}

function SocialIcon({ Icon }) {
  return (
    <div className="p-2 rounded-full border hover:bg-black hover:text-white transition cursor-pointer">
      <Icon size={14} />
    </div>
  );
}