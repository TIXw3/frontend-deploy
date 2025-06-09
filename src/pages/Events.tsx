import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Calendar, Heart, Ticket, ChevronDown, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: string;
  category: string;
  image: string;
  city: string;
}

interface FilterOptions {
  date: "all" | "future" | "past";
  price: "all" | "free" | "upTo50" | "upTo100" | "above100";
  location: string | null;
}

interface EventsProps {
  onLikeToggle: (
    eventoId: string,
    isLiked: boolean,
    eventInfo: { name: string; image: string; date: string; price: string }
  ) => void;
  likedEvents: { id: string; name: string; image: string; date: string; price: string }[];
  searchTerm: string;
  selectedCity: string | null;
}

const Events: React.FC<EventsProps> = ({ onLikeToggle, likedEvents, searchTerm, selectedCity }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    date: "all",
    price: "all",
    location: null,
  });
  const navigate = useNavigate();

  const handleCompraClick = () => {
    navigate("/detalhes-evento");
  };

  const categories = [
    "Todos",
    "Shows",
    "Festivais",
    "Eventos Esportivos",
    "Festas",
    "Baladas",
    "Teatro & Comédia",
  ];

  const events: Event[] = [
    {
      id: "1",
      title: "Festival de Música Eletrônica",
      date: "15 de Março, 2025",
      time: "22:00",
      location: "Arena Shows",
      price: "R$ 120,00",
      category: "Festivais",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TSVDMyVCQXNpY2F8ZW58MHx8MHx8fDA%3D",
      city: "São Paulo, SP",
    },
    {
      id: "2",
      title: "Peça: O Fantasma da Ópera",
      date: "16 de Março, 2025",
      time: "20:00",
      location: "Teatro Municipal",
      price: "R$ 80,00",
      category: "Teatro & Comédia",
      image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VGVhdHJvfGVufDB8fDB8fHww",
      city: "Rio de Janeiro, RJ",
    },
    {
      id: "3",
      title: "Campeonato de Basquete",
      date: "17 de Março, 2025",
      time: "15:00",
      location: "Ginásio Central",
      price: "R$ 40,00",
      category: "Eventos Esportivos",
      image: "https://plus.unsplash.com/premium_photo-1664537975122-9c598d85816e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RXNwb3J0ZXN8ZW58MHx8MHx8fDA%3D",
      city: "Belo Horizonte, MG",
    },
    {
      id: "5",
      title: "Exposição de Arte Moderna",
      date: "19 de Março, 2024",
      time: "10:00",
      location: "Museu de Arte Contemporânea",
      price: "R$ 30,00",
      category: "Arte",
      image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=800&q=80",
      city: "Porto Alegre, RS",
    },
    {
      id: "6",
      title: "Conferência de Negócios 2023",
      date: "20 de Março, 2024",
      time: "09:00",
      location: "Centro de Convenções",
      price: "R$ 200,00",
      category: "Shows",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      city: "Salvador, BA",
    },
    {
      id: "7",
      title: "Show de Stand-Up Comedy",
      date: "21 de Março, 2025",
      time: "19:00",
      location: "Shows da Cidade",
      price: "R$ 60,00",
      category: "Shows",
      image: "https://images.unsplash.com/photo-1562329265-95a6d7a83440?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VGVhdHJvfGVufDB8fDB8fHww",
      city: "Fortaleza, CE",
    },
    {
      id: "8",
      title: "Corrida de Rua - Maratona 2023",
      date: "22 de Março, 2025",
      time: "07:00",
      location: "Parque da Cidade",
      price: "R$ 70,00",
      category: "Eventos Esportivos",
      image: "https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RXNwb3J0ZXN8ZW58MHx8MHx8fDA%3D",
      city: "Recife, PE",
    },
    {
      id: "11",
      title: "Festival de Cinema Independente",
      date: "25 de Março, 2025",
      time: "18:00",
      location: "Cine Teatro",
      price: "R$ 50,00",
      category: "Festivais",
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2luZW1hfGVufDB8fDB8fHww",
      city: "Belém, PA",
    },
    {
      id: "12",
      title: "Show de Música Clássica",
      date: "26 de Março, 2025",
      time: "20:00",
      location: "Teatro Municipal",
      price: "R$ 100,00",
      category: "Shows",
      image: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fE0lQzMlQkFzaWNhfGVufDB8fDB8fHww",
      city: "Goiânia, GO",
    },
    {
      id: "13",
      title: "Exposição de Fotografia",
      date: "27 de Março, 2024",
      time: "10:00",
      location: "Galeria de Arte",
      price: "R$ 20,00",
      category: "Arte",
      image: "https://images.pexels.com/photos/3601421/pexels-photo-3601421.jpeg?auto=compress&cs=tinysrgb&w=800",
      city: "Campinas, SP",
    },
    {
      id: "14",
      title: "Campeonato de E-Sports",
      date: "28 de Março, 2024",
      time: "16:00",
      location: "Arena Digital",
      price: "R$ 150,00",
      category: "Eventos Esportivos",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      city: "São Luís, MA",
    },
    {
      id: "16",
      title: "Festival de Música Brasileira",
      date: "30 de Março, 2025",
      time: "19:00",
      location: "Praça da Música",
      price: "R$ 120,00",
      category: "Festivais",
      image: "https://images.unsplash.com/photo-1543906965-f9520aa2ed8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q3VsdHVyYXxlbnwwfHwwfHx8MA%3D%3D",
      city: "Maceió, AL",
    },
    {
      id: "17",
      title: "Shows de Fantoches",
      date: "31 de Março, 2025",
      time: "15:00",
      location: "Teatro Infantil",
      price: "R$ 40,00",
      category: "Shows",
      image: "https://images.unsplash.com/photo-1579539760267-b2e78d9d735e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFRlYXRyb3xlbnwwfHwwfHx8MA%3D%3D",
      city: "Teresina, PI",
    },
    {
      id: "18",
      title: "Corrida de Aventura",
      date: "01 de Abril, 2024",
      time: "08:00",
      location: "Parque Aventura",
      price: "R$ 80,00",
      category: "Eventos Esportivos",
      image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      city: "João Pessoa, PB",
    },
    {
      id: "19",
      title: "Festival de Dança",
      date: "02 de Abril, 2025",
      time: "20:00",
      location: "Teatro da Dança",
      price: "R$ 70,00",
      category: "Festivais",
      image: "https://images.unsplash.com/photo-1533551268962-824e232f7ee1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q3VsdHVyYXxlbnwwfHwwfHx8MA%3D%3D",
      city: "Aracaju, SE",
    },
    {
      id: "20",
      title: "Feira de Livros e Quadrinhos",
      date: "03 de Abril, 2025",
      time: "10:00",
      location: "Centro Cultural",
      price: "Gratuito",
      category: "Cultura",
      image: "https://images.unsplash.com/photo-1557149769-d376acfba1f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEN1bHR1cmF8ZW58MHx8MHx8fDA%3D",
      city: "Cuiabá, MT",
    },
    {
      id: "21",
      title: "Noite de Jazz ao Vivo",
      date: "04 de Abril, 2025",
      time: "21:00",
      location: "Clube do Jazz",
      price: "R$ 80,00",
      category: "Música",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fE0lQzMlQkFzaWNhfGVufDB8fDB8fHww",
      city: "São Paulo, SP",
    },
    {
      id: "23",
      title: "Maratona de Filmes Clássicos",
      date: "06 de Abril, 2025",
      time: "14:00",
      location: "Cineclube Central",
      price: "R$ 30,00",
      category: "Cinema",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q2luZW1hfGVufDB8fDB8fHww",
      city: "Belo Horizonte, MG",
    },
    {
      id: "24",
      title: "Oficina de Pintura ao Ar Livre",
      date: "07 de Abril, 2024",
      time: "09:00",
      location: "Parque das Artes",
      price: "R$ 50,00",
      category: "Arte",
      image: "https://images.unsplash.com/photo-1513366208864-87536b8bd7b4?auto=format&fit=crop&w=800&q=80",
      city: "Curitiba, PR",
    },
    {
      id: "25",
      title: "Campeonato de Xadrez",
      date: "08 de Abril, 2024",
      time: "10:00",
      location: "Clube de Xadrez",
      price: "R$ 20,00",
      category: "Eventos Esportivos",
      image: "https://plus.unsplash.com/premium_photo-1676634832558-6654a134e920?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8WGFkcmV6fGVufDB8fDB8fHww",
      city: "Porto Alegre, RS",
    },
    {
      id: "26",
      title: "Show de Rock Clássico",
      date: "09 de Abril, 2025",
      time: "20:00",
      location: "Estádio Central",
      price: "R$ 150,00",
      category: "Shows",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fE0lQzMlQkFzaWNhfGVufDB8fDB8fHww",
      city: "Salvador, BA",
    },
    {
      id: "27",
      title: "Feira de Produtos Orgânicos",
      date: "10 de Abril, 2025",
      time: "08:00",
      location: "Praça Verde",
      price: "Entrada Gratuita",
      category: "Cultura",
      image: "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fEN1bHR1cmF8ZW58MHx8MHx8fDA%3D",
      city: "Fortaleza, CE",
    },
    {
      id: "28",
      title: "Aula de Yoga ao Ar Livre",
      date: "11 de Abril, 2025",
      time: "07:00",
      location: "Parque da Saúde",
      price: "R$ 30,00",
      category: "Cultura",
      image: "https://images.unsplash.com/photo-1488861859915-4b5a5e57649f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEN1bHR1cmF8ZW58MHx8MHx8fDA%3D",
      city: "Recife, PE",
    },
    {
      id: "29",
      title: "Festival de Dança Contemporânea",
      date: "12 de Abril, 2025",
      time: "19:00",
      location: "Teatro da Cidade",
      price: "R$ 70,00",
      category: "Festivais",
      image: "https://images.unsplash.com/photo-1508642207-7048c482ba7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Q3VsdHVyYXxlbnwwfHwwfHx8MA%3D%3D",
      city: "Brasília, DF",
    },
    {
      id: "31",
      title: "Encontro de Fotografia de Rua",
      date: "14 de Abril, 2024",
      time: "10:00",
      location: "Praça do Mercado",
      price: "R$ 50,00",
      category: "Arte",
      image: "https://cdn.pixabay.com/photo/2016/11/29/09/16/architecture-1868667_1280.jpg",
      city: "Goiânia, GO",
    },
    {
      id: "32",
      title: "Festival de Música Sertaneja",
      date: "15 de Abril, 2025",
      time: "20:00",
      location: "Arena Sertaneja",
      price: "R$ 100,00",
      category: "Festivais",
      image: "https://media.istockphoto.com/id/2104421890/pt/foto/close-up-of-a-musician-playing-the-electric-guitar-during-a-concert.webp?a=1&b=1&s=612x612&w=0&k=20&c=ec6KAOuFczNjVq_34KDLzs7Hl7xeuVFsqao4X3oCvmg=",
      city: "Campinas, SP",
    },
    {
      id: "34",
      title: "Festival de Música Indie",
      date: "17 de Abril, 2025",
      time: "18:00",
      location: "Parque das Estrelas",
      price: "R$ 80,00",
      category: "Festivais",
      image: "https://media.istockphoto.com/id/975681064/pt/foto/you-must-practice-your-passion-to-perfect-it.webp?a=1&b=1&s=612x612&w=0&k=20&c=FUaM_VJfYHX0YJGTto1V4tLMoJ4Q8MgSS6Slq5oj85Y=",
      city: "Florianópolis, SC",
    },
    {
      id: "35",
      title: "Feira de Tecnologia",
      date: "18 de Abril, 2024",
      time: "09:00",
      location: "Centro de Convenções",
      price: "R$ 150,00",
      category: "Shows",
      image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
      city: "Vitória, ES",
    },
    {
      id: "36",
      title: "Workshop de Fotografia",
      date: "19 de Abril, 2024",
      time: "14:00",
      location: "Estúdio Criativo",
      price: "R$ 60,00",
      category: "Arte",
      image: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?auto=format&fit=crop&w=800&q=80",
      city: "Campo Grande, MS",
    },
    {
      id: "37",
      title: "Festival de Comédia Stand-Up",
      date: "20 de Abril, 2025",
      time: "20:00",
      location: "Teatro Central",
      price: "R$ 50,00",
      category: "Festivais",
      image: "https://images.unsplash.com/photo-1613210434051-4b00d62d03fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFRlYXRyb3xlbnwwfHwwfHx8MA%3D%3D",
      city: "Boa Vista, RR",
    },
    {
      id: "38",
      title: "Corrida Noturna",
      date: "21 de Abril, 2025",
      time: "19:00",
      location: "Avenida Principal",
      price: "R$ 40,00",
      category: "Eventos Esportivos",
      image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RXNwb3J0ZXN8ZW58MHx8MHx8fDA%3D",
      city: "Macapá, AP",
    },
    {
      id: "41",
      title: "Show de Blues ao Vivo",
      date: "24 de Abril, 2025",
      time: "21:00",
      location: "Clube do Blues",
      price: "R$ 70,00",
      category: "Shows",
      image: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=800",
      city: "Porto Velho, RO",
    },
    {
      id: "42",
      title: "Festival de Cinema Documental",
      date: "25 de Abril, 2025",
      time: "18:00",
      location: "Cine Arte",
      price: "R$ 50,00",
      category: "Festivais",
      image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fENpbmVtYXxlbnwwfHwwfHx8MA%3D%3D",
      city: "São Paulo, SP",
    },
    {
      id: "46",
      title: "Campeonato de Futebol Amador",
      date: "29 de Abril, 2025",
      time: "16:00",
      location: "Estádio Municipal",
      price: "R$ 20,00",
      category: "Eventos Esportivos",
      image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEVzcG9ydGVzfGVufDB8fDB8fHww",
      city: "Porto Alegre, RS",
    },
    {
      id: "48",
      title: "Exposição de Arte Contemporânea",
      date: "01 de Maio, 2024",
      time: "10:00",
      location: "Galeria Moderna",
      price: "R$ 40,00",
      category: "Arte",
      image: "https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&w=800",
      city: "Fortaleza, CE",
    },
    {
      id: "49",
      title: "Shows de Jazz e Blues",
      date: "02 de Maio, 2025",
      time: "18:00",
      location: "Clube do Jazz",
      price: "R$ 100,00",
      category: "Shows",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80",
      city: "Recife, PE",
    },
    {
      id: "51",
      title: "Festa de Carnaval Fora de Época",
      date: "04 de Maio, 2024",
      time: "20:00",
      location: "Sambódromo",
      price: "R$ 90,00",
      category: "Festas",
      image: "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=800",
      city: "Salvador, BA",
    },
    {
      id: "52",
      title: "Luau na Praia",
      date: "05 de Maio, 2024",
      time: "18:00",
      location: "Praia Central",
      price: "R$ 50,00",
      category: "Festas",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      city: "Florianópolis, SC",
    },
    {
      id: "53",
      title: "Baile de Máscaras",
      date: "06 de Maio, 2024",
      time: "21:00",
      location: "Salão Nobre",
      price: "R$ 120,00",
      category: "Festas",
      image: "https://images.unsplash.com/photo-1533022586528-2e09bde0959b?q=80&w=1461&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      city: "Rio de Janeiro, RJ",
    },
    {
      id: "54",
      title: "Concerto de Música Pop",
      date: "07 de Maio, 2024",
      time: "20:00",
      location: "Arena Pop",
      price: "R$ 150,00",
      category: "Shows",
      image: "https://images.pexels.com/photos/154147/pexels-photo-154147.jpeg?auto=compress&cs=tinysrgb&w=800",
      city: "São Paulo, SP",
    },
    {
      id: "55",
      title: "Festival de Bandas Locais",
      date: "08 de Maio, 2024",
      time: "17:00",
      location: "Praça da Música",
      price: "R$ 30,00",
      category: "Shows",
      image: "https://plus.unsplash.com/premium_photo-1687609111302-4ecbb417dd96?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEFub3MlMjA4MHxlbnwwfHwwfHx8MA%3D%3D",
      city: "Porto Alegre, RS",
    },
    {
      id: "56",
      title: "Show de Tributo aos Anos 80",
      date: "09 de Maio, 2024",
      time: "19:00",
      location: "Teatro da Cidade",
      price: "R$ 80,00",
      category: "Shows",
      image: "https://plus.unsplash.com/premium_photo-1687609111302-4ecbb417dd96?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEFub3MlMjA4MHxlbnwwfHwwfHx8MA%3D%3D",
      city: "Curitiba, PR",
    },
    {
      id: "60",
      title: "Torneio de Jogos de Tabuleiro",
      date: "13 de Maio, 2024",
      time: "14:00",
      location: "Clube de Jogos",
      price: "R$ 30,00",
      category: "Games",
      image: "https://images.pexels.com/photos/4009750/pexels-photo-4009750.jpeg?auto=compress&cs=tinysrgb&w=800",
      city: "Brasília, DF",
    },
    {
      id: "61",
      title: "Maratona de Jogos Retrô",
      date: "14 de Maio, 2024",
      time: "16:00",
      location: "Arcade Central",
      price: "R$ 50,00",
      category: "Games",
      image: "https://plus.unsplash.com/premium_photo-1682124029070-5e8631b88690?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QXJjYWRlfGVufDB8fDB8fHww",
      city: "Fortaleza, CE",
    },
    {
      id: "62",
      title: "Competição de Realidade Virtual",
      date: "15 de Maio, 2024",
      time: "18:00",
      location: "Tech Arena",
      price: "R$ 80,00",
      category: "Games",
      image: "https://plus.unsplash.com/premium_photo-1681010317761-d0c42fdea9c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8VmlydHVhbHxlbnwwfHwwfHx8MA%3D%3D",
      city: "Manaus, AM",
    },
    {
      id: "63",
      title: "Mostra de Filmes de Animação",
      date: "16 de Maio, 2025",
      time: "17:00",
      location: "Cineclube Infantil",
      price: "R$ 40,00",
      category: "Teatro & Comédia",
      image: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fENpbmVtYXxlbnwwfHwwfHx8MA%3D%3D",
      city: "Goiânia, GO",
    },
    {
      id: "64",
      title: "Sessão de Curtas-Metragens",
      date: "17 de Maio, 2024",
      time: "19:00",
      location: "Cine Arte",
      price: "R$ 30,00",
      category: "Teatro & Comédia",
      image: "https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=800",
      city: "Natal, RN",
    },
    {
      id: "65",
      title: "Peça: Romeu e Julieta",
      date: "18 de Maio, 2025",
      time: "19:00",
      location: "Teatro Clássico",
      price: "R$ 70,00",
      category: "Teatro & Comédia",
      image: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8VGVhdHJvfGVufDB8fDB8fHww",
      city: "Salvador, BA",
    },
    {
      id: "66",
      title: "Monólogo: A Voz do Silêncio",
      date: "19 de Maio, 2025",
      time: "20:00",
      location: "Teatro Intimista",
      price: "R$ 50,00",
      category: "Teatro & Comédia",
      image: "https://plus.unsplash.com/premium_photo-1664302637848-6ae0d5821944?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VGVhdHJvfGVufDB8fDB8fHww",
      city: "Porto Alegre, RS",
    },
    {
      id: "67",
      title: "Torneio de Tênis",
      date: "20 de Maio, 2025",
      time: "10:00",
      location: "Clube de Tênis",
      price: "R$ 60,00",
      category: "Eventos Esportivos",
      image: "https://plus.unsplash.com/premium_photo-1676634832558-6654a134e920?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEVzcG9ydGVzfGVufDB8fDB8fHww",
      city: "Curitiba, PR",
    },
    {
      id: "68",
      title: "Campeonato de Ciclismo",
      date: "21 de Maio, 2025",
      time: "08:00",
      location: "Parque do Ciclismo",
      price: "R$ 50,00",
      category: "Eventos Esportivos",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RXNwb3J0ZXN8ZW58MHx8MHx8fDA%3D",
      city: "Florianópolis, SC",
    },
    {
      id: "69",
      title: "Mostra de Filmes Sci-Fi",
      date: "22 de Maio, 2025",
      time: "18:00",
      location: "Cine Futura",
      price: "R$ 45,00",
      category: "Teatro & Comédia",
      image: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fENpbmVtYXxlbnwwfHwwfHx8MA%3D%3D",
      city: "Manaus, AM",
    },
    {
      id: "70",
      title: "Sessão de Filmes Clássicos",
      date: "23 de Maio, 2025",
      time: "20:00",
      location: "Cine Nostalgia",
      price: "R$ 35,00",
      category: "Teatro & Comédia",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2luZW1hfGVufDB8fDB8fHww",
      city: "Recife, PE",
    },
  ];

  const [likes, setLikes] = useState<{ [key: string]: boolean }>(
    likedEvents.reduce((acc, event) => ({ ...acc, [event.id]: true }), {})
  );

  const toggleLike = (event: Event) => {
    setLikes((prevLikes) => {
      const newLikes = {
        ...prevLikes,
        [event.id]: !prevLikes[event.id],
      };
      onLikeToggle(event.id, newLikes[event.id], {
        name: event.title,
        image: event.image,
        date: `${event.date} • ${event.time}`,
        price: event.price,
      });
      return newLikes;
    });
  };

  const parseEventDate = (dateString: string): Date | null => {
    try {
      const parts = dateString.split(" ");
      if (parts.length < 4) throw new Error("Formato de data inválido");

      const day = parseInt(parts[0], 10);
      const month = parts[2].replace(",", "");
      const year = parseInt(parts[3].replace(",", ""), 10);

      const monthIndex = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
      ].indexOf(month);

      if (monthIndex === -1 || isNaN(day) || isNaN(year)) {
        throw new Error("Data inválida");
      }

      return new Date(year, monthIndex, day);
    } catch (error) {
      console.error(`Erro ao parsear a data: ${dateString}`, error);
      return null;
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "all" || event.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity ? event.city === selectedCity : true;

    const eventDate = parseEventDate(event.date);
    const currentDate = new Date(2025, 4, 4); // Current date: May 04, 2025
    const matchesDate =
      filters.date === "all" ||
      (eventDate &&
        ((filters.date === "future" && eventDate >= currentDate) ||
        (filters.date === "past" && eventDate < currentDate)));

    let priceValue: number;
    if (event.price === "Gratuito" || event.price === "Entrada Gratuita") {
      priceValue = 0;
    } else {
      try {
        priceValue = parseFloat(event.price.replace("R$ ", "").replace(",", "."));
      } catch (error) {
        console.error(`Erro ao parsear o preço: ${event.price}`, error);
        priceValue = 0;
      }
    }
    const matchesPrice =
      filters.price === "all" ||
      (filters.price === "free" && priceValue === 0) ||
      (filters.price === "upTo50" && priceValue <= 50) ||
      (filters.price === "upTo100" && priceValue <= 100) ||
      (filters.price === "above100" && priceValue > 100);

    const matchesLocation = filters.location ? event.location === filters.location : true;

    return matchesCategory && matchesSearch && matchesCity && matchesDate && matchesPrice && matchesLocation;
  });

  const uniqueLocations = Array.from(new Set(events.map((event) => event.location)));

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (selectedCategory === "all") {
      newParams.delete("category");
    } else {
      newParams.set("category", selectedCategory);
    }
    setSearchParams(newParams);
  }, [selectedCategory, searchParams, setSearchParams]);

  const resetFilters = () => {
    setFilters({
      date: "all",
      price: "all",
      location: null,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              <Calendar size={20} className="text-gray-600 dark:text-gray-300" />
              <span>Data</span>
            </button>
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Filter size={20} className="text-gray-600 dark:text-gray-300" />
                <span>Filtros</span>
                <ChevronDown size={20} className={`transition-transform text-gray-600 dark:text-gray-300 ${isFilterOpen ? "rotate-180" : ""}`} />
              </button>
              {isFilterOpen && (
                <div className="absolute top-12 left-0 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-4 w-64">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-1">Data</label>
                    <select
                      value={filters.date}
                      onChange={(e) => setFilters({ ...filters, date: e.target.value as FilterOptions["date"] })}
                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400"
                    >
                      <option value="all">Todas as Datas</option>
                      <option value="future">Eventos Futuros</option>
                      <option value="past">Eventos Passados</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-1">Preço</label>
                    <select
                      value={filters.price}
                      onChange={(e) => setFilters({ ...filters, price: e.target.value as FilterOptions["price"] })}
                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400"
                    >
                      <option value="all">Todos os Preços</option>
                      <option value="free">Gratuito</option>
                      <option value="upTo50">Até R$50</option>
                      <option value="upTo100">Até R$100</option>
                      <option value="above100">Acima de R$100</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-1">Localização</label>
                    <select
                      value={filters.location || ""}
                      onChange={(e) => setFilters({ ...filters, location: e.target.value || null })}
                      className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400"
                    >
                      <option value="">Todas as Localizações</option>
                      {uniqueLocations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={resetFilters}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <X size={16} className="text-gray-600 dark:text-gray-300" />
                    Limpar Filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(category === "Todos" ? "all" : category.toLowerCase())
            }
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              (category === "Todos" && selectedCategory === "all") ||
              category.toLowerCase() === selectedCategory
                ? "bg-orange-500 dark:bg-orange-600 text-white dark:text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-800 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <button
                  onClick={() => toggleLike(event)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm"
                >
                  {likes[event.id] ? (
                    <Heart className="text-red-500 fill-current" size={24} />
                  ) : (
                    <Heart className="text-gray-600 dark:text-gray-300" size={24} />
                  )}
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  {event.title}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Calendar size={18} className="mr-2 text-gray-600 dark:text-gray-300" />
                    <span>
                      {event.date} • {event.time}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Ticket size={18} className="mr-2 text-gray-600 dark:text-gray-300" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <span>{event.city}</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-orange-500 dark:text-orange-400 font-semibold">
                      {event.price}
                    </span>
                    <button
                      onClick={handleCompraClick}
                      className="bg-orange-500 dark:bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition"
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400 col-span-full text-center">
            Nenhum evento encontrado.
          </p>
        )}
      </div>
    </div>
  );
};

export default Events;