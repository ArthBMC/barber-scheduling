import { useState } from "react";

const galleryImages = [
  {
    id: 1,
    title: "Degradê Navalhado High Fade",
    category: "Corte Masculino",
    url: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=700&q=80",
  },
  {
    id: 2,
    title: "Barba Terapia com Toalha Quente",
    category: "Barba & Modelagem",
    url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=700&q=80",
  },
  {
    id: 3,
    title: "Corte Mullet Moderno com Texture",
    category: "Estilo & Tendência",
    url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=700&q=80",
  },
  {
    id: 4,
    title: "Acabamento & Freestyle Hair Art",
    category: "Desenho & Risco",
    url: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=700&q=80",
  },
  {
    id: 5,
    title: "Combo Imperador (Corte + Barba)",
    category: "Tratamento Completo",
    url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=700&q=80",
  },
  {
    id: 6,
    title: "Fade Mid Clássico & Penteado",
    category: "Corte Clássico",
    url: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=700&q=80",
  },
];

export default function GalleryCarousel() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Duplicar imagens para criar o loop contínuo infinito
  const doubleGallery = [...galleryImages, ...galleryImages];

  return (
    <section id="galeria" className="py-24 bg-zinc-950/90 border-t border-zinc-800/80 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          Portfólio de Trabalhos
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Nossa <span className="text-gradient-gold">Galeria de Resultados</span>
        </h2>
        <p className="mt-3 text-zinc-400 text-base max-w-xl mx-auto">
          Confira alguns dos nossos cortes, barbas e transformações realizadas recentemente. Passe o mouse para pausar a rolagem.
        </p>
      </div>

      {/* Marquee carrossel */}
      <div className="relative w-full overflow-hidden py-4">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee gap-6">
          {doubleGallery.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => setSelectedImage(item)}
              className="relative w-72 sm:w-80 h-96 rounded-2xl overflow-hidden group cursor-pointer border border-zinc-800/80 bg-zinc-900/60 shadow-xl shrink-0 transition-transform duration-300 hover:scale-[1.02] hover:border-amber-500/50"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 contrast-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-0 left-0 right-0 p-5 text-left transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[11px] font-bold uppercase tracking-wider mb-2">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-white leading-snug group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Clique para ampliar
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 text-zinc-300 hover:text-white flex items-center justify-center border border-zinc-700 hover:border-amber-400 transition-colors cursor-pointer"
            >
              ✕
            </button>
            <div className="h-96 sm:h-[480px] w-full">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 bg-zinc-900 text-left border-t border-zinc-800">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                {selectedImage.category}
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                {selectedImage.title}
              </h3>
              <p className="text-sm text-zinc-400 mt-2">
                Trabalho realizado com navalha, acabamento em toalha quente e pós-barba hidratante.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
