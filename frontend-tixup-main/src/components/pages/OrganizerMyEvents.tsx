import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

export function OrganizerMyEvents() {
  const [events, setEvents] = useState<Evento[]>([]);

  useEffect(() => {
    const storedEvents = localStorage.getItem("eventos");
    if (storedEvents) {
      const parsedEvents: Evento[] = JSON.parse(storedEvents);
      setEvents(parsedEvents);
    }
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Meus Eventos</h1>

      {events.length === 0 ? (
        <p>Nenhum evento criado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((evento) => (
            <div
              key={evento.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {evento.nome}
              </h2>
              <p className="text-sm text-gray-500">Data: {evento.data}</p>
              <p className="text-sm text-gray-500">Local: {evento.local}</p>
              <p className="text-sm text-gray-500 mb-4">
                Ingressos vendidos: {evento.ingressosVendidos || 0}
              </p>

              <div className="flex gap-3">
                <Link
                  to={`/organizer-dashboard/events/${evento.id}/sales`}
                  className="bg-orange-100 text-orange-600 text-sm px-4 py-2 rounded hover:bg-orange-200 transition"
                >
                  Ver Vendas
                </Link>
                <Link
                  to={`/organizer-dashboard/events/${evento.id}/qr`}
                  className="border border-orange-500 text-orange-500 text-sm px-4 py-2 rounded hover:bg-orange-50 transition"
                >
                  Ver QR Codes
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}