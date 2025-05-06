import React, { useState, ChangeEvent } from "react";
import {
  FiEye,
  FiTag,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUsers,
  FiDollarSign,
  FiList,
  FiEdit,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export default function CreateEvent() {
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

  const today = new Date().toISOString().split("T")[0];

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
        setImagePreview(reader.result as string); // base64
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
      if (parts[1] !== "00") {
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
    } else {
      // Era pra validar hora e n deixar fazer antes, mas n deu mt certo..
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

    // era pra validar o preço mas ainda tem que mexer p funfar de vdd
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

  const salvarEvento = async () => {
    try {
      const token = localStorage.getItem("tixup_token");
      if (!token) throw new Error("Token não encontrado.");

      const payload = {
        nome: form.nome,
        data: form.data, // data do evento
        local: form.local,
        descricao: form.descricao,
        preco: Number(form.preco.replace(/[^\d]/g, "")) / 100,
        imagem:
          imagePreview || "https://via.placeholder.com/640x360?text=Evento",
        categoria: form.categoria,
        publico: true, // <-- ou false, conforme lógica
        quantidade_ingressos: parseInt(form.capacidade),

        // Adiciona campos temporais esperados
        data_inicio: new Date(`${form.data}T${form.horario}:00`).toISOString(),
        data_fim: new Date(
          new Date(`${form.data}T${form.horario}:00`).getTime() +
            2 * 60 * 60 * 1000 // 2h depois
        ).toISOString(),
      };

      const res = await fetch("http://localhost:5000/api/eventos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData?.message || "Erro ao criar evento");
      }

      alert("✅ Evento criado com sucesso!");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
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
    console.log("Evento criado:", { ...form, imagem: imagePreview });
  };

  const inputWithIconClass = (field: string) =>
    `pl-10 p-3 border-2 rounded focus:outline-none w-full text-sm text-gray-700 placeholder:text-gray-400 ${
      errors[field] ? "border-[#FF7070]" : "border-orange-400"
    }`;

  return (
    <div className="min-h-screen bg-white text-gray-700">
      <main className="max-w-7xl mx-auto px-4 mt-6 flex flex-col lg:flex-row gap-8">
        {/* COLUNA ESQUERDA: Formulário */}
        <section className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Criar Novo Evento</h1>
            <span className="text-sm text-orange-500">Rascunho</span>
          </div>

          {/* ÁREA IMAGEM DO EVENTO */}
          <label className="border-2 border-dashed border-orange-400 p-10 text-center rounded-md text-orange-500 mb-6 cursor-pointer block">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview do evento"
                className="mx-auto mb-2"
                style={{ maxHeight: "300px", objectFit: "contain" }}
              />
            ) : (
              <>
                <svg
                  className="w-10 h-10 mx-auto mb-2"
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
                <p>Clique para adicionar a imagem do evento</p>
                <span className="text-sm text-gray-500 block">
                  Recomendado: 1920x1080px
                </span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {/* FORMULÁRIO */}
          <form onSubmit={handleSubmit}>
            {/* LINHA 1: Nome, Data, Horário */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                />
                {errors.nome && (
                  <p className="text-[#FF7070] text-sm mt-1">{errors.nome}</p>
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
                  min={today}
                />
                {errors.data && (
                  <p className="text-[#FF7070] text-sm mt-1">{errors.data}</p>
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
                />
                {errors.horario && (
                  <p className="text-[#FF7070] text-sm mt-1">
                    {errors.horario}
                  </p>
                )}
              </div>
            </div>

            {/* LINHA 2: Descrição */}
            <div className="mb-4">
              <textarea
                name="descricao"
                placeholder="Descrição do evento..."
                className={`p-3 border-2 rounded focus:outline-none w-full text-sm text-gray-700 placeholder:text-gray-400 min-h-[100px] ${
                  errors.descricao ? "border-[#FF7070]" : "border-orange-400"
                }`}
                value={form.descricao}
                onChange={handleChange}
              />
              {errors.descricao && (
                <p className="text-[#FF7070] text-sm mt-1">
                  {errors.descricao}
                </p>
              )}
            </div>

            {/* LINHA 3: Local, Capacidade, Preço, Categoria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                />
                {errors.local && (
                  <p className="text-[#FF7070] text-sm mt-1">{errors.local}</p>
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
                />
                {errors.capacidade && (
                  <p className="text-[#FF7070] text-sm mt-1">
                    {errors.capacidade}
                  </p>
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
                />
                {errors.preco && (
                  <p className="text-[#FF7070] text-sm mt-1">{errors.preco}</p>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500">
                  <FiList className="w-5 h-5" />
                </span>
                <select
                  name="categoria"
                  className={`pl-10 p-3 border-2 rounded focus:outline-none w-full text-sm text-gray-700 ${
                    errors.categoria ? "border-[#FF7070]" : "border-orange-400"
                  }`}
                  value={form.categoria}
                  onChange={handleChange}
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="show">Show</option>
                  <option value="festival">Festival</option>
                  <option value="workshop">Workshop</option>
                  <option value="standup">Stand Up</option>
                </select>
                {errors.categoria && (
                  <p className="text-[#FF7070] text-sm mt-1">
                    {errors.categoria}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="flex items-center gap-2 px-5 py-2 border-2 border-orange-500 text-orange-500 rounded-md text-sm font-semibold hover:bg-orange-50 transition-colors"
              >
                <FiEye className="w-4 h-4" />
                Visualizar
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 bg-orange-500 text-white rounded-md text-sm font-semibold hover:bg-orange-600 transition-colors"
              >
                <FiTag className="w-4 h-4" />
                Publicar Evento
              </button>
            </div>
          </form>
        </section>

        {/* COLUNA DIREITA: Painel Lateral */}
        <aside className="w-full lg:w-72 flex-shrink-0 self-start space-y-6">
          <div className="border-2 border-orange-400 rounded-md p-4 bg-orange-50">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Ferramentas Rápidas
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1"
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
                <div>
                  <Link
                    to="/organizer-dashboard/remarketing"
                    className="block cursor-pointer"
                  >
                    <p className="text-[#FF7A00] font-medium">Promover</p>
                    <p className="text-gray-500 text-sm">
                      Impulsione seu evento
                    </p>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <div className="border-2 border-orange-400 rounded-md p-4 bg-orange-50">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Dicas para Sucesso
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Use imagens de alta qualidade para atrair mais público</li>
              <li>Descreva seu evento com detalhes relevantes</li>
              <li>Defina preços competitivos para seu mercado</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
