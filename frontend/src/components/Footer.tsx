const Footer = () => {
  return (
    <footer
      id="kontak"
      className="bg-slate-950 pt-16 pb-8 border-t border-slate-800 relative"
    >
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-rose-500 opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Brand Col */}
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-rose-500 bg-clip-text text-transparent mb-4">
              Bem Connect
            </h2>
            <p className="text-slate-400 max-w-[500px]">
              Membangun koneksi, membagikan momen, dan <br />
              mempermudah kolaborasi untuk seluruh pengurus BEM.
            </p>
          </div>

          {/* Contact Col */}
          <div className="md:text-right">
            <h3 className="text-lg font-semibold text-white mb-4">
              Hubungi Kami
            </h3>
            <div className="space-y-3 text-slate-300">
              <p className="flex items-center md:justify-end gap-2">
                CP: Nanda
              </p>
              <p className="flex items-center md:justify-end gap-2">
                ID LINE: 16273551
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Built with react router +
            tailwind.
          </p>
          <div className="flex gap-4 text-sm text-slate-500">
            <a href="#" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
