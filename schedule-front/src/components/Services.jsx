import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// 1. DADOS MOCADOS (Fingindo ser o seu banco de dados)
const mockServices = [
  {
    id: 1,
    name: "Corte Degradê (Fade)",
    price: "R$ 45,00",
    duration: "45 min",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=500&q=80",
  },
  {
    id: 2,
    name: "Barba Terapia",
    price: "R$ 35,00",
    duration: "30 min",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&q=80",
  },
  {
    id: 3,
    name: "Corte + Barba (Combo)",
    price: "R$ 70,00",
    duration: "1h 15 min",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&q=80",
  },

    {
    id: 423,
    name: "Nevou",
    price: "R$ 80,00",
    duration: "1h 15 min",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&q=80",
  }

  ,

    {
    id: 44,
    name: "Nevou",
    price: "R$ 80,00",
    duration: "1h 15 min",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&q=80",
  }

   ,

    {
    id: 5,
    name: "Nevou",
    price: "R$ 80,00",
    duration: "1h 15 min",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&q=80",
  }
   ,

    {
    id: 20,
    name: "Nevou",
    price: "R$ 80,00",
    duration: "1h 15 min",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&q=80",
  } ,

    {
    id: 8,
    name: "Nevou",
    price: "R$ 80,00",
    duration: "1h 15 min",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&q=80",
  } ,

    {
    id: 6,
    name: "Nevou",
    price: "R$ 80,00",
    duration: "1h 15 min",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&q=80",
  } ,

    {
    id: 7,
    name: "Nevou",
    price: "R$ 80,00",
    duration: "1h 15 min",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&q=80",
  } ,

    {
    id: 9,
    name: "Nevou",
    price: "R$ 80,00",
    duration: "1h 15 min",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&q=80",
  }
];

function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      
      {/* Cabeçalho simples */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Nossos Serviços</h1>
        <p className="text-gray-500 mt-2">Escolha o que você precisa hoje.</p>
      </div>

      {/* 2. O GRID (Layout dos blocos) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* 3. O LOOP (Percorrendo os dados) */}
        {mockServices.map((service) => (
          
          <Card key={service.id} className="overflow-hidden flex flex-col">
            {/* Foto do Serviço */}
            <div className="w-full h-48 overflow-hidden">
              <img 
                src={service.image} 
                alt={service.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Conteúdo (Nome, Preço e Duração) */}
            <CardContent className="p-4 grow">
              <h2 className="text-xl font-semibold mb-1">{service.name}</h2>
              <p className="text-gray-500 text-sm mb-3">Duração estimada: {service.duration}</p>
              <p className="text-2xl font-bold text-gray-900">{service.price}</p>
            </CardContent>

            {/* Rodapé (Botão) */}
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" onClick={() => console.log("Clicou no ID:", service.id)}>
                Agendar Horário
              </Button>
            </CardFooter>
          </Card>

        ))}
      </div>
    </div>
  );
}

export default ServicesPage;