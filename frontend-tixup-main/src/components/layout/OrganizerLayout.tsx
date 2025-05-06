import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Home, Calendar, Plus, BarChart, Users, Settings } from "lucide-react";

export function OrganizerLayout() {
  const activeClass = "text-orange-500 font-bold flex items-center gap-2";
  const inactiveClass =
    "text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 flex items-center gap-2";

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 flex-col">
      {/* Contêiner flex para o layout principal */}
      <div className="flex flex-1">
        {/* Painel lateral */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-md px-6 py-8 border-r border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-orange-500 mb-8">Painel</h2>
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/organizer-dashboard"
                end
                className={({ isActive }) =>
                  isActive ? activeClass : inactiveClass
                }
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
              >
                <Settings size={18} />
                Configurações
              </NavLink>
            </li>
          </ul>
        </aside>

        {/* Conteúdo principal */}
        <main className="flex-1 p-10 bg-white dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}