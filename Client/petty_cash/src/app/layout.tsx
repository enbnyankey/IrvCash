        'use client';
        import { usePathname } from 'next/navigation';
        import Link from 'next/link';
        import { RiDashboardHorizontalLine } from "react-icons/ri";
        import { MdPerson } from "react-icons/md";
        import { IoSettingsOutline } from "react-icons/io5";
        import { IoIosLogOut } from "react-icons/io";
        import './globals.css';
        // import Dashboard from './Dashboard/page.'; // Adjust path if needed
        import { useState } from 'react';

        const menus = [
          { name: "Dashboard", link: "/", icon: <RiDashboardHorizontalLine size={20}/> },
          { name: "Profile", link: "/profile", icon: <MdPerson size={20} /> },
          { name: "Settings", link: "/settings", icon: <IoSettingsOutline size={20}/> },
          { name: "Logout", link: "/login", icon: <IoIosLogOut size={20}/>}
        ];

        export default function RootLayout({ children }: { children: React.ReactNode }) {
          const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
          const pathname = usePathname();
          const isAuthPage = pathname === '/login' || pathname === '/signup';
          const toggleMobileMenu = () => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
          };
          const MenuItem = ({ menu }: { menu: typeof menus[number] }) => (
            <Link
              href={menu.link}
              className={`
                px-4 py-4 border-b last:border-none w-full border-[#1c1c1c]
                flex items-center gap-2 hover:text-green-400 transition-colors
                ${pathname === menu.link ? 'text-green-400' : ''}
              `}
            >
              <span className="text-white p-2 size-8">{menu.icon}</span>
              <span>{menu.name}</span>
            </Link>
          );
          return (
            <html lang="en">
              <body className="flex min-h-screen ">
                {!isAuthPage && (
                  <>
                    {/* Desktop Sidebar */}
                    <aside className="relative w-64 border-r border-[#1c1c1c] hidden md:flex flex-col">
                      <h1 className="text-xl font-semibold text-center py-4 border-b border-[#1c1c1c]">
                        Dashboard
                      </h1>
                      <nav className="flex flex-col flex-1">
                        {menus.map((menu, index) => (
                          <MenuItem key={index} menu={menu} />
                        ))}
                      </nav>
                    </aside>
                    {/* Mobile Menu Button */}
                    <button
                      onClick={toggleMobileMenu}
                      className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-md"
                      aria-label="Toggle mobile menu"
                      aria-expanded={isMobileMenuOpen}
                    >
                      <svg
                        className="w-6 h-6 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        />
                      </svg>
                    </button>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                      <div className="absolute right-6 top-16 md:hidden shadow-md border border-[#5f5f5f] rounded-md p-3 h-auto bg-white">
                        {menus.map((menu, index) => (
                          <MenuItem key={index} menu={menu} />
                        ))}
                      </div>
                    )}
                  </>
                )}
                <main className="flex-1 flex flex-col">
                  {/* {!isAuthPage && <Dashboard />} */}
                  <div className="flex-1 p-4">
                    {children}
                  </div>
                </main>
              </body>
            </html>
          );
        }