import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-rose-500 bg-clip-text text-transparent"
            >
              Bem Connect
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="/"
                className="hover:text-rose-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Beranda
              </a>
              <a
                href="#fitur"
                className="hover:text-rose-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Fitur
              </a>
              <Link
                to="/timeline"
                className="hover:text-rose-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Timeline
              </Link>
              <a
                href="#kontak"
                className="hover:text-rose-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Kontak
              </a>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                Login
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 border-b border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <a href="#beranda" className="hover:bg-slate-700 block px-3 py-2 rounded-md text-base font-medium">
              Beranda
            </a>
            <a href="#fitur" className="hover:bg-slate-700 block px-3 py-2 rounded-md text-base font-medium">
              Fitur
            </a>
            <Link to="/timeline" className="hover:bg-slate-700 block px-3 py-2 rounded-md text-base font-medium">
              Timeline
            </Link>
            <a href="#kontak" className="hover:bg-slate-700 block px-3 py-2 rounded-md text-base font-medium">
              Kontak
            </a>
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-base font-medium transition-colors">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
