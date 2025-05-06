import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, ChevronDown, Send, Search } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const ContactSupport = () => {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'ticket'>('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const faqData: FAQItem[] = [
    {
      question: "Como faço para comprar ingressos?",
      answer: "Para comprar ingressos, basta selecionar o evento desejado, escolher a quantidade de ingressos e método de pagamento. O processo é totalmente seguro e você receberá a confirmação por email.",
      category: "Compras"
    },
    {
      question: "Posso transferir meu ingresso para outra pessoa?",
      answer: "Sim, você pode transferir seu ingresso através da plataforma até 24 horas antes do evento. Acesse 'Meus Ingressos' e selecione a opção 'Transferir'.",
      category: "Ingressos"
    },
    {
      question: "Como solicito reembolso?",
      answer: "Para solicitar reembolso, acesse 'Meus Pedidos', selecione o ingresso e clique em 'Solicitar Reembolso'. O prazo é de até 7 dias úteis após a aprovação.",
      category: "Reembolsos"
    },
    {
      question: "Quais são as formas de pagamento aceitas?",
      answer: "Aceitamos cartões de crédito, débito, PIX e boleto bancário. Para eventos internacionais, também aceitamos PayPal.",
      category: "Pagamentos"
    },
    {
      question: "O que fazer se não recebi meu ingresso por email?",
      answer: "Primeiro, verifique sua pasta de spam. Se ainda não encontrar, acesse 'Meus Ingressos' na plataforma ou entre em contato com nosso suporte.",
      category: "Ingressos"
    }
  ];

  const toggleQuestion = (question: string) => {
    setExpandedQuestions(prev =>
      prev.includes(question)
        ? prev.filter(q => q !== question)
        : [...prev, question]
    );
  };

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ticket submitted:', ticketForm);
    alert('Ticket enviado com sucesso! Em breve entraremos em contato.');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white dark:bg-gray-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Contato e Suporte</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Como podemos ajudar você hoje?</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('faq')}
          className={`pb-4 px-4 font-medium ${
            activeTab === 'faq'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          Perguntas Frequentes
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`pb-4 px-4 font-medium ${
            activeTab === 'contact'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          Contato Direto
        </button>
        <button
          onClick={() => setActiveTab('ticket')}
          className={`pb-4 px-4 font-medium ${
            activeTab === 'ticket'
              ? 'text-orange-500 border-b-2 border-orange-500'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          Abrir Ticket
        </button>
      </div>

      {/* FAQ Section */}
      {activeTab === 'faq' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Pesquisar nas FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">Todas as categorias</option>
              <option value="Compras">Compras</option>
              <option value="Ingressos">Ingressos</option>
              <option value="Reembolsos">Reembolsos</option>
              <option value="Pagamentos">Pagamentos</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <button
                  onClick={() => toggleQuestion(faq.question)}
                  className="w-full flex items-center justify-between p-4 text-left text-gray-800 dark:text-gray-100"
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown
                    className={`transform transition-transform ${
                      expandedQuestions.includes(faq.question) ? 'rotate-180' : ''
                    } text-gray-600 dark:text-gray-400`}
                    size={20}
                  />
                </button>
                {expandedQuestions.includes(faq.question) && (
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Section */}
      {activeTab === 'contact' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-full">
                <Phone className="text-orange-500" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">Telefone</h3>
                <p className="text-gray-600 dark:text-gray-400">Seg-Sex, 9h-18h</p>
              </div>
            </div>
            <p className="text-lg font-medium text-gray-800 dark:text-gray-100">0800 123 4567</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-full">
                <Mail className="text-orange-500" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">Email</h3>
                <p className="text-gray-600 dark:text-gray-400">Resposta em até 24h</p>
              </div>
            </div>
            <p className="text-lg font-medium text-gray-800 dark:text-gray-100">suporte@tixup.com</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-full">
                <MessageSquare className="text-orange-500" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">Chat</h3>
                <p className="text-gray-600 dark:text-gray-400">Atendimento imediato</p>
              </div>
            </div>
            <button className="text-orange-500 font-medium hover:text-orange-600 dark:hover:text-orange-400">
              Iniciar conversa
            </button>
          </div>
        </div>
      )}

      {/* Ticket Section */}
      {activeTab === 'ticket' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Abrir novo ticket de suporte</h2>
            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={ticketForm.name}
                  onChange={(e) => setTicketForm({...ticketForm, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={ticketForm.email}
                  onChange={(e) => setTicketForm({...ticketForm, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Categoria
                </label>
                <select
                  value={ticketForm.category}
                  onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="general">Geral</option>
                  <option value="payment">Pagamento</option>
                  <option value="refund">Reembolso</option>
                  <option value="technical">Problema Técnico</option>
                  <option value="other">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Assunto
                </label>
                <input
                  type="text"
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mensagem
                </label>
                <textarea
                  value={ticketForm.message}
                  onChange={(e) => setTicketForm({...ticketForm, message: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={5}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Enviar Ticket
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactSupport;