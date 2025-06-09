import { MapPin,  Ticket, Info, AlertCircle } from 'lucide-react';

const EventTemplate = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg max-w-2xl text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Seção Principal do Evento</h2>
            <p className="text-gray-600">
              Esta é a primeira impressão do seu evento. Use uma imagem de alta qualidade que represente bem o seu evento.
              Dimensões recomendadas: 1920x1080px.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-white space-y-4">
              <div className="border-2 border-dashed border-white/30 p-4 rounded-lg backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-2">Título e Informações Principais</h3>
                <p className="text-sm opacity-80">
                  Coloque aqui o nome do seu evento e as informações mais importantes como data, hora e local.
                  Mantenha claro e direto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="text-gray-400 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Descrição do Evento</h3>
                    <p className="text-gray-600">
                      Esta seção é crucial para fornecer todos os detalhes do seu evento. Inclua:
                    </p>
                    <ul className="mt-2 space-y-2 text-gray-600 list-disc list-inside">
                      <li>Uma descrição clara e envolvente</li>
                      <li>Programação detalhada</li>
                      <li>O que os participantes podem esperar</li>
                      <li>Regras ou requisitos importantes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <MapPin className="text-gray-400 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Localização</h3>
                    <p className="text-gray-600">
                      Forneça informações detalhadas sobre o local:
                    </p>
                    <ul className="mt-2 space-y-2 text-gray-600 list-disc list-inside">
                      <li>Endereço completo</li>
                      <li>Pontos de referência</li>
                      <li>Instruções de como chegar</li>
                      <li>Informações sobre estacionamento</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Ticket className="text-gray-400 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Seção de Ingressos</h3>
                    <p className="text-gray-600">Configure seus ingressos com:</p>
                    <ul className="mt-2 space-y-2 text-gray-600 list-disc list-inside">
                      <li>Diferentes categorias</li>
                      <li>Preços claros</li>
                      <li>Descrição dos benefícios</li>
                      <li>Limites de quantidade</li>
                      <li>Datas de venda</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t pt-6">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-orange-500 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="font-medium text-gray-800">Dicas Importantes</p>
                      <ul className="mt-2 space-y-2 text-sm text-gray-600">
                        <li>• Mantenha as informações atualizadas</li>
                        <li>• Use imagens de alta qualidade</li>
                        <li>• Seja claro nas descrições</li>
                        <li>• Destaque informações importantes</li>
                        <li>• Revise todos os detalhes antes de publicar</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTemplate;