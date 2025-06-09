import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { FiTrash2, FiEdit, FiCalendar, FiClock, FiMapPin, FiUsers, FiDollarSign, FiList } from "react-icons/fi";

type Evento = {
  id: string;
  nome: string;
  data: string;
  horario?: string;
  descricao: string;
  local: string;
  capacidade?: string;
  quantidade_ingressos?: string | number;
  preco: string;
  categoria: string;
  imagem?: string;
  ingressosVendidos?: number;
};

export function OrganizerMyEvents() {
  const [events, setEvents] = useState<Evento[]>([]);
  const [editEvent, setEditEvent] = useState<Evento | null>(null);
  const [form, setForm] = useState({
    nome: "",
    data: "",
    horario: "",
    descricao: "",
    local: "",
    capacidade: "",
    preco: "",
    categoria: "",
    imagem: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("tixup_token");
        if (!token) {
          console.error("❌ Nenhum token encontrado. Faça login novamente.");
          alert("❌ Erro: Faça login para visualizar seus eventos.");
          return;
        }

        console.log("📡 Buscando eventos do backend...");
        const res = await fetch("http://localhost:5000/api/eventos/meus-eventos", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const response = await res.json();
          if (response.success && Array.isArray(response.data)) {
            const data: Evento[] = response.data;
            setEvents(data);
            console.log("📋 Eventos carregados do backend:", data);
          } else {
            console.error("🚨 Resposta do backend não contém um array de eventos:", response);
            setEvents([]);
          }
        } else {
          const errorData = await res.json();
          console.error("🚨 Erro ao buscar eventos:", errorData);
          alert(`❌ Erro ao carregar eventos: ${errorData.message || "Erro desconhecido"}`);
          setEvents([]);
        }
      } catch (err) {
        console.error("❌ Erro ao buscar eventos:", err);
        alert("❌ Erro ao carregar eventos.");
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    const eventToDelete = events.find(event => event.id === id);
    if (!eventToDelete) {
      console.error(`❌ Evento com ID ${id} não encontrado.`);
      alert("❌ Erro: Evento não encontrado.");
      return;
    }

    if (!window.confirm(`Tem certeza que deseja excluir o evento "${eventToDelete.nome}"?`)) {
      console.log(`🛑 Exclusão do evento ID ${id} cancelada pelo usuário.`);
      return;
    }

    console.log(`🗑️ Iniciando exclusão do evento com ID: ${id}`);

    try {
      const token = localStorage.getItem("tixup_token");
      console.log("🔑 Token encontrado:", token ? "Sim" : "Não");

      if (!token) {
        throw new Error("Nenhum token de autenticação encontrado. Faça login novamente.");
      }

      if (!token.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)) {
        throw new Error("Token inválido. Faça login novamente.");
      }

      console.log(`📡 Enviando DELETE para http://localhost:5000/api/eventos/${id}`);
      const res = await fetch(`http://localhost:5000/api/eventos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(`📡 Status da resposta: ${res.status}`);

      if (res.status === 204) {
        console.log("✅ Evento excluído do backend com sucesso.");
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
        alert("✅ Evento excluído com sucesso!");
      } else if (res.status === 401) {
        throw new Error("Token inválido ou expirado. Faça login novamente.");
      } else if (res.status === 403) {
        console.error("🚨 Erro 403: Não autorizado a deletar este evento.");
        throw new Error("Você não tem permissão para excluir este evento.");
      } else if (res.status === 404) {
        console.error("🚨 Erro 404: Evento não encontrado no backend.");
        throw new Error("Evento não encontrado no servidor.");
      } else {
        const contentType = res.headers.get("content-type");
        let errData;
        if (contentType && contentType.includes("application/json")) {
          errData = await res.json();
          console.error("🚨 Erro do backend:", errData);
          throw new Error(errData?.message || `Erro ao excluir evento: ${res.status}`);
        } else {
          const text = await res.text();
          console.error("🚨 Resposta não-JSON recebida:", text.slice(0, 200));
          throw new Error("Resposta inesperada do servidor.");
        }
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido ao excluir evento";
      console.error("❌ Erro ao excluir evento:", err);
      alert(`❌ Erro: ${errorMessage}`);
    }
  };

  const openEditModal = (evento: Evento) => {
    setEditEvent(evento);
    setForm({
      nome: evento.nome,
      data: evento.data,
      horario: evento.horario || "",
      descricao: evento.descricao,
      local: evento.local,
      capacidade: evento.capacidade || "",
      preco: evento.preco,
      categoria: evento.categoria,
      imagem: evento.imagem || "",
    });
    setImagePreview(evento.imagem || "");
    setErrors({});
  };

  const closeEditModal = () => {
    setEditEvent(null);
    setForm({
      nome: "",
      data: "",
      horario: "",
      descricao: "",
      local: "",
      capacidade: "",
      preco: "",
      categoria: "",
      imagem: "",
    });
    setImagePreview("");
    setErrors({});
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setForm({ ...form, imagem: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrecoBlur = () => {
    let preco = form.preco.trim();
    if (!preco.startsWith("R$")) {
      preco = "R$" + preco;
    }
    if (!preco.includes(",")) {
      preco = preco + ",00";
    } else {
      const parts = preco.split(",");
      if (parts[1].length !== 2) {
        preco = parts[0] + ",00";
      }
    }
    setForm({ ...form, preco });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.nome.trim()) newErrors.nome = "Nome do evento é obrigatório.";
    if (!form.data.trim()) {
      newErrors.data = "Data é obrigatória.";
    } else {
      const selectedDate = new Date(form.data);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      if (selectedDate < todayDate) {
        newErrors.data = "A data não pode ser no passado.";
      }
    }

    if (!form.horario.trim()) {
      newErrors.horario = "Horário é obrigatório.";
    } else if (form.data) {
      const selectedDate = new Date(form.data);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      if (selectedDate.getTime() === todayDate.getTime()) {
        const [hour, minute] = form.horario.split(":").map(Number);
        const eventTime = new Date(selectedDate);
        eventTime.setHours(hour, minute, 0, 0);
        const now = new Date();
        if (eventTime < now) {
          newErrors.horario = "Horário não pode ser no passado.";
        }
      }
    }

    if (!form.descricao.trim())
      newErrors.descricao = "Descrição é obrigatória.";
    if (!form.local.trim()) newErrors.local = "Local é obrigatório.";
    if (!form.capacidade.trim() || parseInt(form.capacidade) <= 0) {
      newErrors.capacidade = "Capacidade deve ser maior que zero.";
    }
    if (!form.preco.trim()) {
      newErrors.preco = "Preço é obrigatório.";
    } else {
      const priceRegex = /^R\$\d+(,00)$/;
      if (!priceRegex.test(form.preco)) {
        newErrors.preco = "Preço deve estar no formato R$110,00";
      }
    }
    if (!form.categoria.trim()) {
      newErrors.categoria = "Categoria é obrigatória.";
    }

    return newErrors;
  };

  const salvarEdicao = async () => {
    if (!editEvent) return;

    try {
      const token = localStorage.getItem("tixup_token");
      if (!token) {
        throw new Error("Nenhum token de autenticação encontrado. Faça login novamente.");
      }

      const updatedEvent: Evento = {
        ...editEvent,
        nome: form.nome,
        data: form.data,
        horario: form.horario,
        descricao: form.descricao,
        local: form.local,
        capacidade: form.capacidade,
        preco: form.preco,
        categoria: form.categoria,
        imagem: imagePreview || editEvent.imagem,
      };

      const res = await fetch(`http://localhost:5000/api/eventos/${editEvent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedEvent),
      });

      if (res.ok) {
        const response = await res.json();
        if (response.data) {
          const updatedEventFromBackend: Evento = response.data;
          setEvents((prevEvents) =>
            prevEvents.map((event) =>
              event.id === editEvent.id ? updatedEventFromBackend : event
            )
          );
          alert("✅ Evento atualizado com sucesso!");
          closeEditModal();
        } else {
          throw new Error("Resposta do backend não contém dados atualizados.");
        }
      } else {
        const errData = await res.json();
        throw new Error(errData?.message || `Erro ao atualizar evento: ${res.status}`);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido ao atualizar evento";
      console.error("❌ Erro ao atualizar evento:", err);
      alert(`❌ Erro: ${errorMessage}`);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    salvarEdicao();
  };

  const inputWithIconClass = (field: string) =>
    `pl-10 p-3 border-2 rounded-md focus:outline-none w-full text-sm sm:text-base text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
      errors[field] ? "border-[#FF7070]" : "border-orange-400"
    }`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 sm:mb-8">Meus Eventos</h1>

      {events.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">Nenhum evento criado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {events.map((evento) => (
            <div
              key={evento.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 shadow-sm flex flex-col"
            >
              {evento.imagem && (
                <img
                  src={evento.imagem}
                  alt={evento.nome}
                  className="w-full h-32 sm:h-40 object-cover rounded-md mb-4"
                />
              )}
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {evento.nome}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Data: {evento.data}</p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Horário: {evento.horario || '-'}</p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Local: {evento.local}</p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Descrição: {evento.descricao}</p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Capacidade: {evento.quantidade_ingressos ?? evento.capacidade ?? '-'}</p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Preço: {evento.preco}</p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Categoria: {evento.categoria}</p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4">
                Ingressos vendidos: {evento.ingressosVendidos || 0}
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-auto">
                <Link
                  to={`/organizer-dashboard/events/${evento.id}/sales`}
                  className="bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-orange-200 dark:hover:bg-orange-900/70 transition"
                  aria-label={`Ver vendas do evento ${evento.nome}`}
                >
                  Ver Vendas
                </Link>
                <Link
                  to={`/organizer-dashboard/events/${evento.id}/qr`}
                  className="border border-orange-500 text-orange-500 dark:text-orange-400 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-orange-50 dark:hover:bg-orange-900/50 transition"
                  aria-label={`Ver QR codes do evento ${evento.nome}`}
                >
                  Ver QR Codes
                </Link>
                <button
                  onClick={() => openEditModal(evento)}
                  className="flex items-center gap-1 sm:gap-2 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-blue-200 dark:hover:bg-blue-900/70 transition"
                  aria-label={`Editar evento ${evento.nome}`}
                >
                  <FiEdit className="w-3 sm:w-4 h-3 sm:h-4" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(evento.id)}
                  className="flex items-center gap-1 sm:gap-2 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded hover:bg-red-200 dark:hover:bg-red-900/70 transition"
                  aria-label={`Excluir evento ${evento.nome}`}
                >
                  <FiTrash2 className="w-3 sm:w-4 h-3 sm:h-4" />
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Editar Evento</h2>
            <form onSubmit={handleEditSubmit}>
              <label className="border-2 border-dashed border-orange-400 p-4 sm:p-6 text-center rounded-md text-orange-500 mb-4 cursor-pointer block">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview do evento"
                    className="mx-auto mb-2 max-w-full h-auto"
                    style={{ maxHeight: "150px sm:max-h-200px", objectFit: "contain" }}
                  />
                ) : (
                  <>
                    <svg
                      className="w-6 sm:w-8 h-6 sm:h-8 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16v-8m0 0-3 3m3-3 3 3M5 20h14a2 2 0 0 0 2-2v-5a9 9 0 0 0-18 0v5a2 2 0 0 0 2 2z"
                      />
                    </svg>
                    <p className="text-xs sm:text-sm">Clique para adicionar a imagem do evento</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">
                      Recomendado: 1920x1080px
                    </span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  aria-label="Selecionar imagem do evento"
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500">
                    <FiEdit className="w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    name="nome"
                    placeholder="Digite o nome do seu evento"
                    className={inputWithIconClass("nome")}
                    value={form.nome}
                    onChange={handleChange}
                    aria-label="Nome do evento"
                  />
                  {errors.nome && (
                    <p className="text-[#FF7070] text-xs sm:text-sm mt-1">{errors.nome}</p>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500">
                    <FiCalendar className="w-5 h-5" />
                  </span>
                  <input
                    type="date"
                    name="data"
                    className={inputWithIconClass("data")}
                    value={form.data}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    aria-label="Data do evento"
                  />
                  {errors.data && (
                    <p className="text-[#FF7070] text-xs sm:text-sm mt-1">{errors.data}</p>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500">
                    <FiClock className="w-5 h-5" />
                  </span>
                  <input
                    type="time"
                    name="horario"
                    className={inputWithIconClass("horario")}
                    value={form.horario}
                    onChange={handleChange}
                    aria-label="Horário do evento"
                  />
                  {errors.horario && (
                    <p className="text-[#FF7070] text-xs sm:text-sm mt-1">{errors.horario}</p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <textarea
                  name="descricao"
                  placeholder="Descrição do evento..."
                  className={`p-3 border-2 rounded-md focus:outline-none w-full text-sm sm:text-base text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 min-h-[100px] sm:min-h-[120px] ${
                    errors.descricao ? "border-[#FF7070]" : "border-orange-400"
                  }`}
                  value={form.descricao}
                  onChange={handleChange}
                  aria-label="Descrição do evento"
                />
                {errors.descricao && (
                  <p className="text-[#FF7070] text-xs sm:text-sm mt-1">{errors.descricao}</p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500">
                    <FiMapPin className="w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    name="local"
                    placeholder="Local"
                    className={inputWithIconClass("local")}
                    value={form.local}
                    onChange={handleChange}
                    aria-label="Local do evento"
                  />
                  {errors.local && (
                    <p className="text-[#FF7070] text-xs sm:text-sm mt-1">{errors.local}</p>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500">
                    <FiUsers className="w-5 h-5" />
                  </span>
                  <input
                    type="number"
                    name="capacidade"
                    placeholder="Capacidade"
                    className={inputWithIconClass("capacidade")}
                    value={form.capacidade}
                    onChange={handleChange}
                    aria-label="Capacidade do evento"
                  />
                  {errors.capacidade && (
                    <p className="text-[#FF7070] text-xs sm:text-sm mt-1">{errors.capacidade}</p>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500">
                    <FiDollarSign className="w-5 h-5" />
                  </span>
                  <input
                    type="text"
                    name="preco"
                    placeholder="R$110,00"
                    className={inputWithIconClass("preco")}
                    value={form.preco}
                    onChange={handleChange}
                    onBlur={handlePrecoBlur}
                    aria-label="Preço do evento"
                  />
                  {errors.preco && (
                    <p className="text-[#FF7070] text-xs sm:text-sm mt-1">{errors.preco}</p>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500">
                    <FiList className="w-5 h-5" />
                  </span>
                  <select
                    name="categoria"
                    className={inputWithIconClass("categoria") + " appearance-none"}
                    value={form.categoria}
                    onChange={handleChange}
                    aria-label="Categoria do evento"
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="show">Show</option>
                    <option value="festival">Festival</option>
                    <option value="workshop">Workshop</option>
                    <option value="standup">Stand Up</option>
                  </select>
                  {errors.categoria && (
                    <p className="text-[#FF7070] text-xs sm:text-sm mt-1">{errors.categoria}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 sm:px-5 py-2 border-2 border-gray-500 dark:border-gray-400 text-gray-500 dark:text-gray-400 rounded-md text-xs sm:text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Cancelar edição"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1 sm:gap-2 px-4 sm:px-5 py-2 bg-orange-500 text-white rounded-md text-xs sm:text-sm font-semibold hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors"
                  aria-label="Salvar alterações do evento"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
