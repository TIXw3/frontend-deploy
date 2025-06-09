import React, { useState, ChangeEvent } from "react";
import { FiEye, FiTag, FiCalendar, FiClock, FiMapPin, FiUsers, FiDollarSign, FiList, FiEdit } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

interface CreateEventProps {
  darkMode: boolean;
}

type Evento = {
  id: number;
  nome: string;
  data: string;
  horario: string;
  descricao: string;
  local: string;
  capacidade: string;
  preco: string;
  categoria: string;
  imagem?: string;
  ingressosVendidos?: number;
};

const CreateEvent: React.FC<CreateEventProps> = ({ darkMode }) => {
  const [form, setForm] = useState({
    nome: "",
    data: "",
    horario: "",
    descricao: "",
    local: "",
    capacidade: "",
    preco: "",
    categoria: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [imagePreview, setImagePreview] = useState<string>("");
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 5);
  const maxDateString = maxDate.toISOString().split("T")[0];

  // Lista estática de cidades brasileiras para autocomplete
  const cities = [
    "Maringá, PR",
    "Morumbi, SP",
    "São Paulo, SP",
    "Rio de Janeiro, RJ",
    "Curitiba, PR",
    "Belo Horizonte, MG",
    "Porto Alegre, RS",
    "Salvador, BA",
    "Brasília, DF",
    "Fortaleza, CE",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "local" && value.trim()) {
      const filtered = cities.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setLocationSuggestions(filtered);
      setShowSuggestions(true);
    } else if (name === "local") {
      setLocationSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleLocationSelect = (city: string) => {
    setForm({ ...form, local: city });
    setLocationSuggestions([]);
    setShowSuggestions(false);
    setErrors((prev) => ({ ...prev, local: "" }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrecoBlur = () => {
    let preco = form.preco.trim().replace(/[^\d]/g, "");
    if (preco) {
      preco = `R$${preco},00`;
    } else {
      preco = "";
    }
    setForm({ ...form, preco });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    // Validação do Nome
    if (!form.nome.trim()) {
      newErrors.nome = "Nome do evento é obrigatório.";
    } else if (form.nome.length < 3) {
      newErrors.nome = "Nome deve ter pelo menos 3 caracteres.";
    }

    // Validação da Data
    if (!form.data.trim()) {
      newErrors.data = "Data é obrigatória.";
    } else {
      const selectedDate = new Date(form.data);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      const maxAllowedDate = new Date(maxDateString);
      if (selectedDate < todayDate) {
        newErrors.data = "A data não pode ser no passado.";
      } else if (selectedDate > maxAllowedDate) {
        newErrors.data = "A data não pode ser após 5 anos.";
      }
    }

    // Validação do Horário
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

    // Validação da Descrição
    if (!form.descricao.trim()) {
      newErrors.descricao = "Descrição é obrigatória.";
    } else if (form.descricao.length > 500) {
      newErrors.descricao = "Descrição deve ter no máximo 500 caracteres.";
    }

    // Validação do Local
    if (!form.local.trim()) {
      newErrors.local = "Local é obrigatório.";
    }

    // Validação da Capacidade
    if (!form.capacidade.trim()) {
      newErrors.capacidade = "Capacidade é obrigatória.";
    } else {
      const capacidadeNum = parseInt(form.capacidade);
      if (isNaN(capacidadeNum) || capacidadeNum <= 0) {
        newErrors.capacidade = "Capacidade deve ser maior que zero.";
      } else if (capacidadeNum > 100000) {
        newErrors.capacidade = "Capacidade não pode exceder 100.000.";
      }
    }

    // Validação do Preço
    if (!form.preco.trim()) {
      newErrors.preco = "Preço é obrigatório.";
    } else {
      const priceRegex = /^R\$\d+(,00)$/;
      if (!priceRegex.test(form.preco)) {
        newErrors.preco = "Preço deve estar no formato R$110,00";
      }
    }

    // Validação da Categoria
    if (!form.categoria.trim()) {
      newErrors.categoria = "Categoria é obrigatória.";
    }

    return newErrors;
  };

  const salvarEvento = async () => {
    try {
      const token = localStorage.getItem("tixup_token");
      if (!token) {
        throw new Error("Nenhum token de autenticação encontrado. Faça login novamente.");
      }

      const formData = new FormData();
      formData.append("nome", form.nome);
      formData.append("data", form.data);
      formData.append("local", form.local);
      formData.append("descricao", form.descricao);
      
      // Converte o preço para número antes de enviar
      const precoNumerico = Number(form.preco.replace(/[^\d]/g, "")) / 100;
      formData.append("preco", precoNumerico.toString());
      
      formData.append("categoria", form.categoria);
      formData.append("publico", "true");
      formData.append("quantidade_ingressos", form.capacidade);
      
      // Adiciona a imagem se existir
      if (selectedImage) {
        formData.append("imagem", selectedImage);
      }

      console.log("Dados do formulário:", {
        nome: form.nome,
        data: form.data,
        local: form.local,
        descricao: form.descricao,
        preco: precoNumerico,
        categoria: form.categoria,
        publico: "true",
        quantidade_ingressos: form.capacidade
      });

      const res = await fetch("http://localhost:5000/api/eventos/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error("Erro do backend:", errData);
        throw new Error(errData?.message || "Erro ao criar evento");
      }

      const createdEvent = await res.json();
      const evento: Evento = {
        id: createdEvent.id,
        nome: form.nome,
        data: form.data,
        horario: form.horario,
        descricao: form.descricao,
        local: form.local,
        capacidade: form.capacidade,
        preco: form.preco,
        categoria: form.categoria,
        imagem: selectedImage ? URL.createObjectURL(selectedImage) : "https://via.placeholder.com/640x360?text=Evento",
        ingressosVendidos: 0,
      };

      // Salvar no localStorage
      const storedEvents = localStorage.getItem("eventos");
      const events: Evento[] = storedEvents ? JSON.parse(storedEvents) : [];
      events.push(evento);
      localStorage.setItem("eventos", JSON.stringify(events));

      alert("✅ Evento criado com sucesso!");
      setForm({
        nome: "",
        data: "",
        horario: "",
        descricao: "",
        local: "",
        capacidade: "",
        preco: "",
        categoria: "",
      });
      setSelectedImage(null);
      setLocationSuggestions([]);
      setShowSuggestions(false);
      navigate("/organizer-dashboard/my-events");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido ao criar evento";
      console.error("Erro ao salvar evento:", err);
      alert(`❌ Erro: ${errorMessage}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    salvarEvento();
  };

  const inputWithIconClass = (field: string) =>
    `pl-10 p-3 border-2 rounded-md focus:outline-none w-full text-xs sm:text-sm text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
      errors[field] ? "border-[#FF7070]" : "border-orange-400"
    }`;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-700'}`}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col lg:flex-row gap-4 sm:gap-6">
        <section className="flex-1">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Criar Novo Evento</h1>
            <span className="text-xs sm:text-sm text-orange-500">Rascunho</span>
          </div>
          <label className="border-2 border-dashed border-orange-400 p-4 sm:p-6 text-center rounded-md text-orange-500 mb-4 sm:mb-6 cursor-pointer block">
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
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 sm:mb-6">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500">
                  <FiEdit className="w-4 sm:w-5 h-4 sm:h-5" />
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
                  <p className="text-[#FF7070] text-xs mt-1">{errors.nome}</p>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500">
                  <FiCalendar className="w-4 sm:w-5 h-4 sm:h-5" />
                </span>
                <input
                  type="date"
                  name="data"
                  className={inputWithIconClass("data")}
                  value={form.data}
                  onChange={handleChange}
                  min={today}
                  max={maxDateString}
                  aria-label="Data do evento"
                />
                {errors.data && (
                  <p className="text-[#FF7070] text-xs mt-1">{errors.data}</p>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500">
                  <FiClock className="w-4 sm:w-5 h-4 sm:h-5" />
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
                  <p className="text-[#FF7070] text-xs mt-1">{errors.horario}</p>
                )}
              </div>
            </div>
            <div className="mb-4 sm:mb-6">
              <div className="relative">
                <textarea
                  name="descricao"
                  placeholder="Descrição do evento..."
                  className={`p-3 border-2 rounded-md focus:outline-none w-full text-xs sm:text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 min-h-[80px] sm:min-h-[100px] ${
                    errors.descricao ? "border-[#FF7070]" : "border-orange-400"
                  }`}
                  value={form.descricao}
                  onChange={handleChange}
                  maxLength={500}
                  aria-label="Descrição do evento"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {form.descricao.length}/500 caracteres
                </p>
              </div>
              {errors.descricao && (
                <p className="text-[#FF7070] text-xs mt-1">{errors.descricao}</p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 sm:mb-6">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500">
                  <FiMapPin className="w-4 sm:w-5 h-4 sm:h-5" />
                </span>
                <input
                  type="text"
                  name="local"
                  placeholder="Digite a cidade (ex: Maringá, PR)"
                  className={inputWithIconClass("local")}
                  value={form.local}
                  onChange={handleChange}
                  onFocus={() => setShowSuggestions(true)}
                  aria-label="Local do evento"
                />
                {showSuggestions && locationSuggestions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-orange-400 rounded-md mt-1 max-h-32 sm:max-h-40 overflow-y-auto">
                    {locationSuggestions.map((city, index) => (
                      <li
                        key={index}
                        className="px-3 py-2 text-xs sm:text-sm hover:bg-orange-50 dark:hover:bg-orange-900/50 cursor-pointer"
                        onClick={() => handleLocationSelect(city)}
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                )}
                {errors.local && (
                  <p className="text-[#FF7070] text-xs mt-1">{errors.local}</p>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500">
                  <FiUsers className="w-4 sm:w-5 h-4 sm:h-5" />
                </span>
                <input
                  type="number"
                  name="capacidade"
                  placeholder="Capacidade"
                  className={inputWithIconClass("capacidade")}
                  value={form.capacidade}
                  onChange={handleChange}
                  min="1"
                  max="100000"
                  aria-label="Capacidade do evento"
                />
                {errors.capacidade && (
                  <p className="text-[#FF7070] text-xs mt-1">{errors.capacidade}</p>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500">
                  <FiDollarSign className="w-4 sm:w-5 h-4 sm:h-5" />
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
                  <p className="text-[#FF7070] text-xs mt-1">{errors.preco}</p>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500">
                  <FiList className="w-4 sm:w-5 h-4 sm:h-5" />
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
                  <p className="text-[#FF7070] text-xs mt-1">{errors.categoria}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                type="button"
                className="flex items-center gap-2 px-3 sm:px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-md text-xs sm:text-sm font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/50 transition-colors"
                aria-label="Visualizar evento"
              >
                <FiEye className="w-4 h-4" />
                Visualizar
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-orange-500 text-white rounded-md text-xs sm:text-sm font-semibold hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors"
                aria-label="Publicar evento"
              >
                <FiTag className="w-4 h-4" />
                Publicar Evento
              </button>
            </div>
          </form>
        </section>
        <aside className="w-full lg:w-64 flex-shrink-0 self-start space-y-4">
          <div className="border-2 border-orange-400 rounded-md p-4 bg-orange-50 dark:bg-orange-900/50">
            <h2 className="text-sm sm:text-base font-semibold mb-3">Ferramentas Rápidas</h2>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500 flex-shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.813 15.73a19.44 19.44 0 00-.486 3.506c0 .421.34.764.76.764h.675c.36 0 .675-.264.746-.62.088-.44.238-1.118.46-1.978l.017-.065c.214-.829.408-1.517.58-2.053m1.67-5.062l2.946 2.946c.374-.538.613-1.17.703-1.848.14-1.036-.146-2.012-.766-2.633-.642-.642-1.62-.936-2.665-.79-.673.095-1.298.335-1.84.73zm0 0L9.12 5.88a2 2 0 112.83-2.83l3.662 3.661a19.885 19.885 0 00-3.13.41 19.708 19.708 0 00-1.002.24zm3.883 8.743a8 8 0 11-7.071-7.071"
                  />
                </svg>
                <Link to="/organizer-dashboard/remarketing" className="block cursor-pointer">
                  <p className="text-[#FF7A00] dark:text-orange-400 font-medium text-xs sm:text-sm">Promover</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Impulsione seu evento</p>
                </Link>
              </li>
              <li className="flex items-start space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500 flex-shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.94-4.94a2.121 2.121 0 10-3-3L12 7m3 3l-8.94 8.94a2 2 0 11-2.83-2.83L12 10m3 3l-2 2m6 1a2 2 0 110 4H5a2 2 0 110-4"
                  />
                </svg>
                <Link to="/organizer-dashboard/eventtemplate" className="block cursor-pointer">
                  <p className="text-orange-500 dark:text-orange-400 font-medium text-xs sm:text-sm">Personalizar</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Layout & branding</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="border-2 border-orange-400 rounded-md p-4 bg-orange-50 dark:bg-orange-900/50">
            <h2 className="text-sm sm:text-base font-semibold mb-3">Dicas para Sucesso</h2>
            <ul className="list-disc list-inside text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <li>Use imagens de alta qualidade para atrair mais público</li>
              <li>Descreva seu evento com detalhes relevantes</li>
              <li>Defina preços competitivos para seu mercado</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default CreateEvent;