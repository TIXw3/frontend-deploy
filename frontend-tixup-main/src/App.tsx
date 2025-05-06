import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import api from "./services/api";
import { useAuth } from "./contexts/AuthContext"; // IMPORTANTE
import { Navbar } from "./components/layout/Navbar";
import { AuthModal } from "./components/modals/AuthModal";
import { UserDashboard } from "./components/dashboard/UserDashboard";
import Home from "./components/pages/Home";
import Events from "./components/pages/Events";
import { OrganizerDashboard } from "./components/dashboard/OrganizerDashboard";
import { OrganizerLayout } from "./components/layout/OrganizerLayout";
import { OrganizerMyEvents } from "./components/pages/OrganizerMyEvents";
import CreateEvent from "./components/pages/CreateEvent";
import { Footer } from "./components/layout/Footer";
import UserSettings from "./components/dashboard/UserSettings";
import DetalhesEvento from "./components/pages/DetalhesEvento";
import Checkout from "./components/pages/Checkout";
import Carrinho from "./components/pages/Carrinho";
import ContactSupport from "./components/pages/ContactSupport";
import TicketValidation from "./components/pages/TicketValidation";
import EventTemplate from "./components/pages/EventTemplate";
import ReportsPage from "./components/pages/Reports/ReportsPage";
import Remarketing from "./components/pages/Remarketing";
import Collaborators from "./components/pages/Collaborators";
import ConfigColab from "./components/dashboard/ConfigColab";
import { EventData } from "./types/EventData";

function App() {
  const [showModal, setShowModal] = useState<string | null>(null);
  const [likedEvents, setLikedEvents] = useState<EventData[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const { user, login, logout } = useAuth();

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const closeModal = () => setShowModal(null);
  const handleOpenLogin = () => setShowModal("login");
  const handleSwitchForm = (form: string) => setShowModal(form);

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { email, senha: password });
      const { token, usuario } = res.data.data;
      localStorage.setItem("tixup_token", token);
      login({
        id: usuario.id,
        name: usuario.nome,
        email: usuario.email,
        phone: "",
        address: "",
        avatarUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        cpf: "",
        birthDate: "",
        tipo: usuario.tipo,
        is_organizador: usuario.is_organizador ?? false,
      });
      closeModal();
    } catch {
      alert("Falha ao fazer login");
    }
  };

  const handleRegister = async (
    name: string,
    email: string,
    password: string,
    cpf: string,
    address: string,
    telefone: string,
    dataNascimento: string
  ) => {
    try {
      const res = await api.post("/auth/cadastro", {
        nome: name,
        email,
        senha: password,
        tipo: "usuario",
      });
      const { token, usuario } = res.data.data;
      localStorage.setItem("tixup_token", token);
      login({
        id: usuario.id,
        name: usuario.nome,
        email: usuario.email,
        phone: telefone,
        address,
        avatarUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        cpf,
        birthDate: dataNascimento,
        tipo: usuario.tipo,
        is_organizador: usuario.is_organizador ?? false,
      });
      closeModal();
    } catch {
      alert("Falha ao cadastrar usuário");
    }
  };

  const handleLikeToggle = (
    eventoId: string,
    isLiked: boolean,
    eventInfo: Omit<EventData, "id">
  ) => {
    setLikedEvents((prev) => {
      if (isLiked)
        return prev.some((e) => e.id === eventoId)
          ? prev
          : [...prev, { id: eventoId, ...eventInfo }];
      return prev.filter((e) => e.id !== eventoId);
    });
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Navbar
        onOpenLogin={handleOpenLogin}
        isLoggedIn={!!user}
        userEmail={user?.email}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />

      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onLikeToggle={handleLikeToggle}
                likedEvents={likedEvents}
                searchTerm={searchTerm}
                selectedCity={selectedCity}
              />
            }
          />
          <Route
            path="/events"
            element={
              <Events
                onLikeToggle={handleLikeToggle}
                likedEvents={likedEvents}
                searchTerm={searchTerm}
                selectedCity={selectedCity}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              user ? (
                <UserDashboard
                  userData={user}
                  onUpdateProfile={(newData) => login({ ...user, ...newData })}
                  onLogout={logout}
                  likedEvents={likedEvents}
                  onLikeToggle={handleLikeToggle}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/organizer-dashboard/*"
            element={
              user?.tipo === "organizador" ? (
                <OrganizerLayout />
              ) : (
                <Navigate to="/" replace />
              )
            }
          >
            <Route index element={<OrganizerDashboard />} />
            <Route path="my-events" element={<OrganizerMyEvents />} />
            <Route path="create-event" element={<CreateEvent />} />
            <Route path="Reportspage" element={<ReportsPage />} />
            <Route path="collaborators" element={<Collaborators />} />
            <Route path="remarketing" element={<Remarketing />} />
            <Route path="config" element={<ConfigColab />} />
          </Route>
          <Route
            path="/user-settings"
            element={
              user ? (
                <UserSettings
                  userData={user}
                  onPromoted={(novoTipo) =>
                    login({
                      ...user!,
                      tipo: novoTipo,
                      is_organizador: true,
                    })
                  }
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/contato" element={<ContactSupport />} />
          <Route path="/meus-ingressos" element={<TicketValidation />} />
          <Route path="/event-template" element={<EventTemplate />} />
          <Route path="/detalhes-evento" element={<DetalhesEvento />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/carrinho" element={<Carrinho />} />
        </Routes>
      </div>

      <AuthModal
        showModal={showModal}
        onClose={closeModal}
        onSwitchForm={handleSwitchForm}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
