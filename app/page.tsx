"use client";

import React from "react";
import Link from "next/link";
import { 
  Menu, 
  MapPin, 
  PhoneCall, 
  CreditCard, 
  BookOpen,
  MessageCircle,
  ChevronRight,
  TrendingDown
} from "lucide-react";

// Mock de produtos para dar "cara de humano" e menos "Lorem Ipsum"
const HIGHLIGHT_PRODUCTS = [
  { id: 1, name: "Arroz Branco Tipo 1 Camil 5kg", oldPrice: "29,90", currentPrice: "24,80", wholesaleAmount: 6, tag: "Básico" },
  { id: 2, name: "Cerveja Heineken Lata 350ml", oldPrice: "5,49", currentPrice: "4,69", wholesaleAmount: 12, tag: "Bebidas" },
  { id: 3, name: "Fralda Pampers Confort Sec Mega G", oldPrice: "89,90", currentPrice: "69,90", wholesaleAmount: 3, tag: "Bebê" },
  { id: 4, name: "Costela Bovina Congelada Friboi Kg", oldPrice: "21,90", currentPrice: "16,99", wholesaleAmount: 10, tag: "Açougue" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 text-slate-800 font-sans pb-24 md:pb-0">
      
      {/* Faixa superior de avisos (Tipico de mercado) */}
      <div className="w-full bg-[#111] text-zinc-300 py-1.5 px-4 flex items-center justify-between text-[11px] sm:text-xs font-medium tracking-wide">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 bg-green-600/20 text-green-400 px-2 rounded-full py-0.5"><MessageCircle className="w-3 h-3"/> Ofertas no Zap</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#cartao" className="hover:text-white flex items-center gap-1 transition-colors"><CreditCard className="w-3 h-3"/> Cartão Sempre 6</Link>
          <Link href="#lojas" className="hover:text-white hidden sm:flex items-center gap-1 transition-colors"><MapPin className="w-3 h-3"/> Nossas Lojas</Link>
        </div>
      </div>

      {/* Header Fofinho, meio "atacadão" de verdade */}
      <header className="w-full bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 -ml-2 text-slate-600">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-1.5">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-650 rounded-xl bg-red-600 text-white font-black text-2xl md:text-3xl flex items-center justify-center -rotate-2 shadow-sm">
                6
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="font-extrabold text-xl md:text-2xl text-slate-900 tracking-tighter">Sempre <span className="text-yellow-500">6</span></span>
                <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest pl-0.5">Atacadista</span>
              </div>
            </div>
          </div>

          {/* Busca simulada, bem cara de site que vende mesmo */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8 relative group">
            <input 
              type="text" 
              placeholder="O que você procura hoje? (ex: Óleo de Soja)" 
              className="w-full h-11 bg-slate-100 border-2 border-slate-200 text-slate-700 rounded-full px-5 text-sm focus:outline-none focus:border-red-500 transition-colors"
            />
            <button className="absolute right-1 top-1 bottom-1 px-4 bg-red-600 text-white rounded-full text-sm font-bold hover:bg-red-700 transition-colors">
              Buscar
            </button>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Link 
              href="/revista"
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-extrabold rounded-lg shadow-sm transition-transform hover:scale-105 active:scale-95"
            >
              <BookOpen className="w-5 h-5" />
              <span className="hidden sm:inline">Folheto Digital</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Banner - Onde chamamos a atenção total para a Revista */}
      <section className="bg-red-600 relative overflow-hidden">
        {/* Textura sutil no fundo */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          
          <div className="w-full md:w-1/2 flex flex-col items-start text-white">
            <span className="px-3 py-1 bg-black/20 text-white/90 rounded-md text-xs font-bold uppercase tracking-widest mb-4">
              Válido até Domingo
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-none tracking-tight">
              A HORA DO <br/>
              <span className="text-yellow-400">PREÇO BAIXO.</span>
            </h1>
            <p className="text-red-100 text-lg md:text-xl font-medium mb-8 max-w-md">
              Chegou o encarte de fim de mês. Economize muito no varejo e compre a preço de custo no atacado.
            </p>
            
            <Link 
              href="/revista"
              className="w-full sm:w-auto px-8 py-5 bg-white text-red-600 hover:bg-slate-50 font-black text-lg rounded-xl shadow-xl shadow-red-900/20 flex items-center justify-center gap-3 transition-transform hover:-translate-y-1"
            >
              <BookOpen className="w-6 h-6" />
              Folhear Agora
            </Link>
          </div>

          <div className="w-full md:w-1/2 relative">
            {/* Um design bagunçadinho, bem natural de varejo */}
            <div className="relative w-full max-w-md mx-auto aspect-3/4 rotate-2 transition-transform hover:rotate-0 duration-500">
               <div className="absolute inset-0 bg-white rounded-lg shadow-2xl p-2 z-10">
                  <div className="w-full h-full bg-slate-200 rounded object-cover overflow-hidden relative">
                    {/* Placeholder simulando a capa do encarte do atacadão */}
                    <div className="absolute inset-0 bg-[url('https://placehold.co/600x800/dc2626/ffffff?text=Capa+Folheto+Sempre+6')] bg-cover bg-center" />
                  </div>
               </div>
               {/* Sombra caindo pra trás do livro */}
               <div className="absolute -inset-4 bg-black/20 blur-2xl -z-10 rounded-full translate-y-8"></div>
               
               {/* Selo torto por cima da imagem */}
               <div className="absolute -top-6 -right-6 bg-yellow-400 text-yellow-950 font-black text-xl p-4 rounded-full shadow-lg rotate-12 flex flex-col items-center justify-center leading-none scale-110">
                 <span>BAIXOU</span>
                 <span className="text-sm">TUDO!</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ofertas em Destaque (As que o supermercado faria no cartaz físico) */}
      <section className="py-16 md:py-24 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-800 flex items-center gap-2">
                <TrendingDown className="w-8 h-8 text-red-600" />
                Destaques da Semana
              </h2>
              <p className="text-slate-500 font-medium mt-1">Ofertas pinçadas diretamente do nosso encarte digital.</p>
            </div>
            
            <Link href="/revista" className="text-red-600 font-bold hover:underline flex items-center gap-1 group">
              Ver todas na Revista <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {HIGHLIGHT_PRODUCTS.map((prod) => (
              <div key={prod.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col relative group hover:shadow-lg transition-shadow">
                <span className="absolute top-3 left-3 bg-red-100 text-red-700 text-[10px] font-black uppercase px-2 py-1 rounded-sm">
                  {prod.tag}
                </span>
                
                <div className="w-full aspect-square bg-slate-50 rounded-xl mb-4 p-4 mt-6">
                  {/* Como é "humano", não tem imagem perfeita, é um box funcional */}
                  <div className="w-full h-full bg-[url('https://placehold.co/400x400/f8fafc/94a3b8?text=Foto+Produto')] bg-contain bg-center bg-no-repeat opacity-80" />
                </div>
                
                <h3 className="text-sm md:text-base font-bold text-slate-800 leading-tight mb-4 min-h-[40px]">
                  {prod.name}
                </h3>
                
                <div className="mt-auto flex flex-col bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <div className="text-xs text-slate-500 line-through mb-1">De: R$ {prod.oldPrice}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-600 uppercase">Varejo:</span>
                    <span className="text-xl md:text-2xl font-black text-red-600 leading-none">R$ {prod.currentPrice}</span>
                  </div>
                  <div className="mt-2 text-[10px] font-bold text-green-700 bg-green-100 px-2 py-1 rounded w-max">
                    Atacado: R$ {(parseFloat(prod.currentPrice.replace(',', '.')) * 0.95).toFixed(2).replace('.', ',')} a partir de {prod.wholesaleAmount} un.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner Cartão Sempre 6 */}
      <section id="cartao" className="py-12 bg-zinc-900 border-t-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-16 rounded-xl bg-linear-to-tr from-yellow-500 to-yellow-300 shadow-md border border-yellow-200 rotate-[-5deg] flex items-center p-3 relative overflow-hidden">
               <div className="absolute right-[-10px] top-0 bottom-0 bg-white/20 w-8 blur-sm rotate-15"></div>
               <span className="text-yellow-950 font-black text-lg">6</span>
            </div>
            <div>
              <h2 className="text-white text-2xl font-black mb-1">Ainda não tem o Cartão Sempre 6?</h2>
              <p className="text-zinc-400 font-medium text-sm">Pague preço de atacado desde a 1ª unidade. Descontos exclusivos na loja toda.</p>
            </div>
          </div>
          <button className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-bold rounded-lg transition-colors w-full md:w-auto">
            Pedir meu Cartão
          </button>
        </div>
      </section>

      {/* Footer Varejeiro realístico */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="md:col-span-1">
            <div className="flex items-center gap-1.5 mb-6">
              <div className="w-8 h-8 rounded bg-red-600 text-white font-black text-xl flex items-center justify-center -rotate-2">6</div>
              <span className="font-extrabold text-xl text-slate-900">Sempre <span className="text-red-600">6</span></span>
            </div>
            <p className="text-slate-500 text-sm font-medium mb-4">
              O Gigante do Preço Baixo. Economia todo dia pra você e para o seu CNPJ.
            </p>
          </div>

          <div>
            <h4 className="font-black text-slate-800 mb-4 pb-2 border-b border-gray-100">Canais de Atendimento</h4>
            <ul className="space-y-3 text-sm text-slate-600 font-medium">
              <li className="flex items-center gap-2"><PhoneCall className="w-4 h-4 text-red-600"/> 0800 123 4567</li>
              <li className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-green-600"/> (11) 99999-9999</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400"/> Lojas e Horários</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-slate-800 mb-4 pb-2 border-b border-gray-100">Links Rápidos</h4>
            <ul className="space-y-3 text-sm text-slate-600 font-medium">
              <li><Link href="/revista" className="hover:text-red-600 transition text-red-600 flex items-center gap-1"><BookOpen className="w-3 h-3"/> Folheto Digital</Link></li>
              <li><Link href="#" className="hover:text-red-600 transition">Trabalhe Conosco</Link></li>
              <li><Link href="#" className="hover:text-red-600 transition">Seja um Fornecedor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-slate-800 mb-4 pb-2 border-b border-gray-100">Certificados</h4>
            <div className="flex gap-2">
              <div className="w-12 h-12 bg-slate-100 rounded border border-slate-200"></div>
              <div className="w-12 h-12 bg-slate-100 rounded border border-slate-200"></div>
              <div className="w-12 h-12 bg-slate-100 rounded border border-slate-200"></div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 border-t border-gray-100 text-xs font-medium text-slate-400 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>Sempre 6 Atacadista LTDA - CNPJ: 00.000.000/0001-00</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-slate-600">Termos Gerais</Link>
            <Link href="#" className="hover:text-slate-600">Privacidade LGPD</Link>
          </div>
        </div>
      </footer>

      {/* Floating Sticky Bottom Mobile - Típico de Supermercado brasileiro para WhatsApp */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-50 flex items-center justify-between">
        <Link 
          href="/revista"
          className="flex-1 mr-2 px-4 py-3 bg-red-600 text-white font-bold rounded-lg text-center text-sm shadow-sm flex items-center justify-center gap-2"
        >
          <BookOpen className="w-4 h-4"/> Ver Folheto
        </Link>
        <button className="flex-1 ml-2 px-4 py-3 bg-green-500 text-white font-bold rounded-lg text-center text-sm shadow-sm flex items-center justify-center gap-2">
          <MessageCircle className="w-4 h-4"/> Zapzap
        </button>
      </div>

    </div>
  );
}
