import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Line, Bar } from "react-chartjs-2";
import { useAuth } from "../../shared/contexts/AuthContext";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

interface Evento {
  id: string;
  nome: string;
  categoria: string;
  vendidos: number;
  preco: number;
}

const COLORS = ["#FF8042", "#FFBB28", "#00C49F", "#0088FE"];

export function OrganizerDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.is_organizador) return;

    const fetchMeusEventos = async () => {
      try {
        const token = localStorage.getItem("tixup_token");
        if (!token) throw new Error("Token não encontrado");

        const res = await fetch(
          "http://localhost:5000/api/eventos/meus-eventos",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Erro ao buscar eventos");

        const data = await res.json();
        setEventos(data.data || []);
      } catch (err) {
        console.error("❌ Erro ao buscar eventos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeusEventos();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Carregando informações do usuário...
      </div>
    );
  }

  if (!user.is_organizador) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center text-gray-500 px-4">
        <h2 className="text-2xl font-semibold text-orange-500 mb-2">
          Acesso restrito
        </h2>
        <p>Somente organizadores podem acessar esse painel.</p>
      </div>
    );
  }

  const totalEventos = eventos.length;
  const totalVendas = eventos.reduce((acc, ev) => acc + ev.vendidos, 0);
  const receitaTotal = eventos.reduce(
    (acc, ev) => acc + ev.vendidos * ev.preco,
    0
  );

  const ticketSalesData = {
    labels: eventos.map((e) =>
      e.nome.length > 12 ? e.nome.slice(0, 12) + "..." : e.nome
    ),
    datasets: [
      {
        label: "Ingressos Vendidos",
        data: eventos.map((e) => e.vendidos),
        borderColor: "#F97316",
        backgroundColor: "rgba(249, 115, 22, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const categoryMap = eventos.reduce((acc: Record<string, number>, ev) => {
    acc[ev.categoria] = (acc[ev.categoria] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        label: "Categorias",
        data: Object.values(categoryMap),
        backgroundColor: COLORS,
        borderWidth: 1,
      },
    ],
  };

  const teamActivityData = {
    labels: ["Thiago", "Giovanne", "Lucas", "Maurilio"],
    datasets: [
      {
        label: "Ações",
        data: [12, 7, 10, 5],
        backgroundColor: "#F97316",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Dashboard do Organizador
        </h1>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/organizer-dashboard/create-event")}
            className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition"
          >
            <Plus size={20} />
            <span>Criar Novo Evento</span>
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Carregando eventos...
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard label="Eventos Criados" value={totalEventos} />
              <StatCard label="Ingressos Vendidos" value={totalVendas} />
              <StatCard
                label="Receita Total"
                value={`R$ ${receitaTotal.toFixed(2).replace(".", ",")}`}
              />
              <StatCard label="Check-ins Realizados" value="–" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <ChartCard title="Vendas por Evento">
                <Line data={ticketSalesData} />
              </ChartCard>

              <ChartCard title="Categorias de Eventos">
                <Pie data={pieChartData} />
              </ChartCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-12">
              <ChartCard title="Atividade da Equipe">
                <Bar data={teamActivityData} />
              </ChartCard>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-sm text-gray-500 dark:text-gray-400">{label}</h2>
      <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
        {value}
      </p>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-4">
        {title}
      </h3>
      <div className="w-full h-[300px]">{children}</div>
    </div>
  );
}
