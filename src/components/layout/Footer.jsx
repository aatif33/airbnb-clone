export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-20">
  <div className="max-w-7xl mx-auto px-6 py-10 text-sm text-gray-600">

        
        {/* SUPPORT */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>Help Centre</li>
            <li>Get help with a safety issue</li>
            <li>AirCover</li>
            <li>Anti-discrimination</li>
            <li>Disability support</li>
            <li>Cancellation options</li>
            <li>Report neighbourhood concern</li>
          </ul>
        </div>

        {/* HOSTING */}
        <div>
          <h3 className="font-semibold mb-4">Hosting</h3>
          <ul className="space-y-2">
            <li>Airbnb your home</li>
            <li>Airbnb your experience</li>
            <li>Airbnb your service</li>
            <li>AirCover for Hosts</li>
            <li>Hosting resources</li>
            <li>Community forum</li>
            <li>Hosting responsibly</li>
            <li>Join a free Hosting class</li>
            <li>Find a co-host</li>
            <li>Refer a host</li>
          </ul>
        </div>

        {/* AIRBNB */}
        <div>
          <h3 className="font-semibold mb-4">Airbnb</h3>
          <ul className="space-y-2">
            <li>2025 Summer Release</li>
            <li>Newsroom</li>
            <li>Careers</li>
            <li>Investors</li>
            <li>Airbnb.org emergency stays</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t text-center text-xs text-gray-500 py-4">
        © 2025 Airbnb Clone · Built with React & Tailwind
      </div>
    </footer>
  );
}
