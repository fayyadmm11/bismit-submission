import { useState, useRef, useLayoutEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface NavItem {
  label: string;
  sectionId?: string;
  to?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Beranda", sectionId: "beranda" },
  { label: "Fitur", sectionId: "fitur" },
  { label: "Timeline", to: "/timeline" },
  { label: "Kontak", sectionId: "kontak" },
];

interface PillStyle {
  left: number;
  width: number;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ── Nav pill (rose) — hilang saat mouse leave ───────────────
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [navPill, setNavPill] = useState<PillStyle & { opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // ── Auth pill (blue) — persisten, mulai di Daftar (index 1) ─
  const authRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [authPill, setAuthPill] = useState<PillStyle>({ left: 0, width: 0 });

  // Set posisi awal pill ke tombol Daftar setelah DOM siap
  // useLayoutEffect: khusus untuk membaca dimensi DOM, tidak menyebabkan cascading render
  useLayoutEffect(() => {
    if (!user) {
      const daftarEl = authRefs.current[1];
      if (daftarEl) {
        setAuthPill({ left: daftarEl.offsetLeft, width: daftarEl.offsetWidth });
      }
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSectionNav = (sectionId: string) => {
    setIsOpen(false);
    if (location.pathname === "/") {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleNavEnter = (index: number) => {
    const el = navRefs.current[index];
    if (!el) return;
    setNavPill({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
  };

  const handleNavLeave = () => {
    setNavPill((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleAuthEnter = (index: number) => {
    const el = authRefs.current[index];
    if (!el) return;
    setAuthPill({ left: el.offsetLeft, width: el.offsetWidth });
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="shrink-0 text-2xl font-bold bg-gradient-to-r from-blue-400 to-rose-500 bg-clip-text text-transparent"
          >
            Bem Connect
          </Link>

          {/* Desktop Menu (center nav + right auth) */}
          <div className="hidden md:flex items-center">
            {/* Nav items — rose pill, di tengah */}
            <div
              className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1"
              onMouseLeave={handleNavLeave}
            >
              <span
                className="absolute top-1/2 -translate-y-1/2 h-9 bg-rose-600 rounded-full pointer-events-none transition-all duration-300 ease-out"
                style={{
                  left: navPill.left,
                  width: navPill.width,
                  opacity: navPill.opacity,
                }}
              />
              {NAV_ITEMS.map((item, index) => (
                <button
                  key={item.label}
                  ref={(el) => {
                    navRefs.current[index] = el;
                  }}
                  onMouseEnter={() => handleNavEnter(index)}
                  onClick={() =>
                    item.to
                      ? navigate(item.to)
                      : handleSectionNav(item.sectionId!)
                  }
                  className="relative z-10 px-4 py-2 text-sm font-medium text-white rounded-full cursor-pointer whitespace-nowrap"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Auth section — tetap di kanan */}
            <div className="ml-auto flex items-center gap-6">
              {user ? (
                <div className="flex items-center gap-5">
                  <span className="text-sm text-slate-300">
                    <span className="font-semibold text-white">
                      Halo, {user.username}!
                    </span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                /* Auth items — blue pill persisten */
                <div className="flex items-center gap-1 relative">
                  <span
                    className="absolute top-1/2 -translate-y-1/2 h-9 bg-blue-600 rounded-full pointer-events-none transition-all duration-300 ease-out shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    style={{
                      left: authPill.left,
                      width: authPill.width,
                    }}
                  />
                  {(["Masuk", "Daftar"] as const).map((label, index) => (
                    <button
                      key={label}
                      ref={(el) => {
                        authRefs.current[index] = el;
                      }}
                      onMouseEnter={() => handleAuthEnter(index)}
                      onClick={() =>
                        navigate(index === 0 ? "/login" : "/register")
                      }
                      className="relative z-10 px-4 py-2 text-sm font-medium text-white rounded-full cursor-pointer"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
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
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 border-b border-slate-700">
          <div className="px-3 pt-3 pb-4 space-y-2 flex flex-col">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() =>
                  item.to
                    ? (setIsOpen(false), navigate(item.to))
                    : handleSectionNav(item.sectionId!)
                }
                className="w-full text-left px-4 py-2 rounded-lg text-base font-medium text-white hover:bg-rose-600 transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}

            <div className="pt-2 border-t border-slate-700 space-y-2">
              {user ? (
                <>
                  <span className="block px-3 py-2 text-sm text-slate-400">
                    Masuk sebagai{" "}
                    <strong className="text-white">{user.username}</strong>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block text-center w-full border border-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors"
                  >
                    Masuk
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors"
                  >
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
