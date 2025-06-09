import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Home,
  Calendar,
  Plus,
  BarChart,
  Users,
  Settings,
  Menu,
  X,
  User,
} from "lucide-react";

interface OrganizerLayoutProps {
  darkMode: boolean;
}

export function OrganizerLayout({ darkMode }: OrganizerLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeClass = "text-orange-500 font-bold flex items-center gap-2";
  const inactiveClass = `flex items-center gap-2 ${
    darkMode
      ? "text-gray-300 hover:text-orange-400"
      : "text-gray-700 hover:text-orange-500"
  }`;

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div
      className={`flex min-h-screen flex-col relative ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Topbar para telas pequenas */}
      <div
        className={`md:hidden flex items-center justify-between p-4 border-b ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <h2
          className={`text-xl font-bold ${
            darkMode ? "text-orange-400" : "text-orange-500"
          }`}
        >
          Painel
        </h2>
        <button onClick={toggleMenu}>
          {isMenuOpen ? (
            <X size={24} className={darkMode ? "text-white" : "text-black"} />
          ) : (
            <Menu size={24} className={darkMode ? "text-white" : "text-black"} />
          )}
        </button>
      </div>

      {/* Overlay de fundo */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={closeMenu}
        />
      )}

      <div className="flex flex-1 relative min-h-screen">
        {/* Sidebar - responsiva com slide */}
        <aside
          className={`
    fixed md:static z-40 top-0 left-0 md:h-auto h-full w-64 p-6 border-r shadow-md transform transition-transform duration-300
    ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
    ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
  `}
        >
          {/* Título visível só em md+ ou dentro do painel móvel */}
          <h2
            className={`text-2xl font-bold mb-8 ${
              darkMode ? "text-orange-400" : "text-orange-500"
            }`}
          >
            Painel
          </h2>
          <ul className="space-y-4">
          <li>
              <NavLink
                to="/organizer-dashboard/perfilorganizador"
                end
                className={({ isActive }) =>
                  isActive ? activeClass : inactiveClass
                }
                onClick={closeMenu}
              >
                <User size={18} />
                Perfil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/organizer-dashboard"
                end
                className={({ isActive }) =>
                  isActive ? activeClass : inactiveClass
                }
                onClick={closeMenu}
              >
                <Home size={18} />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/organizer-dashboard/my-events"
                className={({ isActive }) =>
                  isActive ? activeClass : inactiveClass
                }
                onClick={closeMenu}
              >
                <Calendar size={18} />
                Meus Eventos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/organizer-dashboard/create-event"
                className={({ isActive }) =>
                  isActive ? activeClass : inactiveClass
                }
                onClick={closeMenu}
              >
                <Plus size={18} />
                Criar Evento
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/organizer-dashboard/Reportspage"
                className={({ isActive }) =>
                  isActive ? activeClass : inactiveClass
                }
                onClick={closeMenu}
              >
                <BarChart size={18} />
                Relatórios
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/organizer-dashboard/Collaborators"
                className={({ isActive }) =>
                  isActive ? activeClass : inactiveClass
                }
                onClick={closeMenu}
              >
                <Users size={18} />
                Colaboradores
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/organizer-dashboard/config"
                className={({ isActive }) =>
                  isActive ? activeClass : inactiveClass
                }
                onClick={closeMenu}
              >
                <Settings size={18} />
                Configurações
              </NavLink>
            </li>
          </ul>
        </aside>

        {/* Conteúdo principal */}
        <main
          className={`flex-1 p-6 md:p-10 transition-all duration-300 ${
            darkMode ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          <Outlet context={{ darkMode }} />
        </main>
      </div>
    </div>
  );
}
