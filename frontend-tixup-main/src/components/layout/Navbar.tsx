import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, User, Ticket, MapPin, Moon, Sun } from "lucide-react";

interface NavbarProps {
  onOpenLogin: () => void;
  isLoggedIn?: boolean;
  userEmail?: string;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCity: string | null;
  setSelectedCity: (city: string | null) => void;
}

export function Navbar({
  onOpenLogin,
  isLoggedIn = false,
  userEmail,
  darkMode,
  onToggleDarkMode,
  searchTerm,
  setSearchTerm,
  selectedCity,
  setSelectedCity,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  const cities = [
    "São Paulo, SP",
    "Rio de Janeiro, RJ",
    "Belo Horizonte, MG",
    "Curitiba, PR",
    "Porto Alegre, RS",
    "Salvador, BA",
    "Fortaleza, CE",
    "Recife, PE",
    "Brasília, DF",
    "Manaus, AM",
    "Belém, PA",
    "Goiânia, GO",
    "Campinas, SP",
    "São Luís, MA",
    "Natal, RN",
    "Maceió, AL",
    "Teresina, PI",
    "João Pessoa, PB",
    "Aracaju, SE",
    "Cuiabá, MT",
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log(
        "Pesquisando por:",
        searchTerm,
        "em:",
        selectedCity || "Nenhuma cidade selecionada"
      );
    }
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsLocationDropdownOpen(false);
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          console.log("Localização obtida:", { latitude: coords.latitude, longitude: coords.longitude });
          setSelectedCity("Localização atual");
          setIsLocationDropdownOpen(false);
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
          alert("Não foi possível obter sua localização. Verifique as permissões e tente novamente.");
        }
      );
    } else {
      alert("Geolocalização não é suportada pelo seu navegador.");
    }
  };

  return (
    <nav className={`shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Ticket className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold">
                <span className={`${darkMode ? "text-gray-100" : "text-gray-900"}`}>Tix</span>
                <span className="text-orange-500">Up</span>
              </span>
            </Link>
          </div>

          {/* Barra de pesquisa (desktop) */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Pesquise por eventos ou formação"
                className={`w-full pl-10 pr-12 py-2 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-orange-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-orange-500"
                } focus:outline-none focus:ring-2 focus:border-transparent`}
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 ${darkMode ? "text-gray-300" : "text-gray-400"}`} />
              </div>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <MapPin className="h-5 w-5" />
                </button>
              </div>
              {isLocationDropdownOpen && (
                <div className="absolute top-12 right-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="p-2">
                    <button
                      onClick={handleUseMyLocation}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-2"
                    >
                      <MapPin className="h-5 w-5 text-orange-500" />
                      Usar minha localização
                    </button>
                    <hr className="my-2" />
                    {cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => handleCitySelect(city)}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Links e botões (desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"} relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full`}
            >
              Home
            </Link>
            <Link
              to="/events"
              className={`${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"} relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full`}
            >
              Eventos
            </Link>
            <a
              href="#"
              className={`${darkMode ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"} relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full`}
            >
              Crie seu evento
            </a>
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-800" />
              )}
            </button>
            <Link
              to="/contato"
              className={`px-4 py-2 rounded-lg text-center text-base font-medium ${
                darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Contato
            </Link>
            {!isLoggedIn ? (
              <button
                onClick={onOpenLogin}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
              >
                Login
              </button>
            ) : (
              <Link
                to="/dashboard"
                className={`${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-800 text-white hover:bg-gray-700"} px-4 py-2 rounded-lg flex items-center space-x-2`}
              >
                <User className="h-5 w-5" />
                <span>{userEmail?.split("@")[0]}</span>
              </Link>
            )}
          </div>

          {/* Botão de menu (mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={darkMode ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-600"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-stretch space-y-2 pt-2 pb-3">
            <Link to="/" className={`${darkMode ? "text-gray-300" : "text-gray-700"} block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50`}>Home</Link>
            <Link to="/events" className={`${darkMode ? "text-gray-300" : "text-gray-700"} block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50`}>Eventos</Link>
            <a href="#" className={`${darkMode ? "text-gray-300" : "text-gray-700"} block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50`}>Crie seu evento</a>
            <button
              onClick={onToggleDarkMode}
              className={`w-full text-left px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center`}>
              {darkMode ? <Sun className="inline-block mr-2 text-yellow-500" /> : <Moon className="inline-block mr-2 text-gray-800" />}{darkMode ? "Modo Claro" : "Modo Escuro"}
            </button>
            <Link to="/contato" className={`${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-800"} block w-full px-3 py-2 rounded-md text-base font-medium hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white`}>Contato</Link>
            {!isLoggedIn ? (
              <button onClick={onOpenLogin} className="block w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">Login</button>
            ) : (
              <Link to="/dashboard" className={`${darkMode ? "bg-gray-700 text-white" : "bg-gray-800 text-white"} block w-full px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-700`}>
                <User className="h-5 w-5" />
                <span>{userEmail?.split("@")[0]}</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
