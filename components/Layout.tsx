
import React, { useState } from 'react';
import { PageView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  navigateTo: (view: PageView, slug?: string | null) => void;
}

const Logo: React.FC<{ light?: boolean }> = ({ light = false }) => (
  <div className="flex items-center gap-1 cursor-pointer group">
    <div className="flex items-baseline">
      <span className="logo-font text-3xl md:text-4xl text-[#fc670c]">HOT</span>
      <span className={`logo-font text-3xl md:text-4xl ${light ? 'text-white' : 'text-[#111827]'}`}>PLAN</span>
    </div>
    <div className={`hidden sm:block ml-2 pl-2 border-l ${light ? 'border-white/20' : 'border-slate-200'}`}>
      <div className={`text-[8px] ${light ? 'text-white/40' : 'text-slate-400'} font-black leading-none uppercase tracking-[0.3em]`}>Engineering</div>
      <div className={`text-[8px] ${light ? 'text-white/40' : 'text-slate-400'} font-black leading-none uppercase tracking-[0.3em] mt-0.5`}>Projects</div>
    </div>
  </div>
);

const Layout: React.FC<LayoutProps> = ({ children, navigateTo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleNav = (e: React.MouseEvent, view: PageView, slug: string | null = null) => {
    e.preventDefault();
    navigateTo(view, slug);
    closeMenu();
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#fc670c] selection:text-white">
      <header className="sticky top-0 z-50 bg-white/95 border-b border-slate-100 shadow-sm backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div onClick={(e) => handleNav(e, 'home')}>
            <Logo />
          </div>

          <nav className="hidden md:flex gap-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
            <a href="#" onClick={(e) => handleNav(e, 'home')} className="hover:text-[#fc670c] transition-colors">Главная</a>
            <a href="#" onClick={(e) => handleNav(e, 'portfolio')} className="hover:text-[#fc670c] transition-colors">Кейсы</a>
            <a href="#" onClick={(e) => handleNav(e, 'sro')} className="hover:text-[#fc670c] transition-colors">Допуски</a>
            <a href="#" onClick={(e) => handleNav(e, 'about')} className="hover:text-[#fc670c] transition-colors">О бюро</a>
            <a href="#" onClick={(e) => handleNav(e, 'contacts')} className="hover:text-[#fc670c] transition-colors">Контакты</a>
          </nav>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex flex-col items-end">
               <a href="tel:+74950000000" className="text-sm font-black text-[#111827] hover:text-[#fc670c] transition-colors tracking-tight">+7 (495) 000-00-00</a>
               <div className="text-[8px] text-green-600 font-black uppercase tracking-widest flex items-center gap-1">
                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Сейчас работаем
               </div>
            </div>
            <button 
              onClick={(e) => { e.preventDefault(); document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="bg-[#fc670c] hover:bg-[#e65c0c] text-white px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-orange-100"
            >
              Рассчитать КП
            </button>
          </div>

          <button className="md:hidden text-[#111827] text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Открыть меню">
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 p-8 flex flex-col gap-8 animate-fadeIn fixed inset-0 top-[72px] z-50">
            <a href="#" onClick={(e) => handleNav(e, 'home')} className="text-3xl font-black uppercase tracking-tighter text-[#111827]">Главная</a>
            <a href="#" onClick={(e) => handleNav(e, 'portfolio')} className="text-3xl font-black uppercase tracking-tighter text-[#111827]">Наши проекты</a>
            <a href="#" onClick={(e) => handleNav(e, 'sro')} className="text-3xl font-black uppercase tracking-tighter text-[#111827]">СРО и Лицензии</a>
            <a href="#" onClick={(e) => handleNav(e, 'about')} className="text-3xl font-black uppercase tracking-tighter text-[#111827]">О бюро</a>
            <a href="#" onClick={(e) => handleNav(e, 'contacts')} className="text-3xl font-black uppercase tracking-tighter text-[#111827]">Контакты</a>
            <div className="mt-auto pt-8 border-t border-slate-100">
               <a href="tel:+74950000000" className="text-2xl font-black block mb-4 text-[#111827]">+7 (495) 000-00-00</a>
               <button onClick={(e) => { handleNav(e, 'home'); setTimeout(() => document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="w-full bg-[#fc670c] text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl">Получить расчет</button>
            </div>
          </div>
        )}
      </header>

      <div className="flex-grow">
        {children}
      </div>

      <footer className="bg-[#111827] text-white pt-24 pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-1 bg-[#fc670c]"></div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
          <div className="space-y-8">
            <div onClick={(e) => handleNav(e, 'home')}>
              <Logo light />
            </div>
            <p className="text-slate-400 text-[11px] font-medium leading-relaxed uppercase tracking-widest">Проектируем инженерные сети для бизнеса в Москве и по всей России с 2012 года. BIM-моделирование как стандарт качества.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#fc670c] transition-all"><i className="fab fa-vk"></i></a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-[#fc670c] transition-all"><i className="fab fa-telegram-plane"></i></a>
            </div>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-10 text-[#fc670c]">Направления</h4>
            <ul className="space-y-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <li><a href="#" onClick={(e) => handleNav(e, 'service', 'ventilyaciya')} className="hover:text-white transition-colors">Вентиляция (ОВ)</a></li>
              <li><a href="#" onClick={(e) => handleNav(e, 'service', 'otoplenie')} className="hover:text-white transition-colors">Отопление и ИТП</a></li>
              <li><a href="#" onClick={(e) => handleNav(e, 'service', 'vodosnabzhenie')} className="hover:text-white transition-colors">Водоснабжение (ВК)</a></li>
              <li><a href="#" onClick={(e) => handleNav(e, 'service', 'elektrika')} className="hover:text-white transition-colors">Электрика (ЭОМ)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-10 text-[#fc670c]">Отрасли</h4>
            <ul className="space-y-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <li><a href="#" onClick={(e) => handleNav(e, 'object', 'restorany')} className="hover:text-white transition-colors">Рестораны и Кафе</a></li>
              <li><a href="#" onClick={(e) => handleNav(e, 'object', 'ofisy')} className="hover:text-white transition-colors">Офисные центры</a></li>
              <li><a href="#" onClick={(e) => handleNav(e, 'object', 'sklady')} className="hover:text-white transition-colors">Склады и Цеха</a></li>
              <li><a href="#" onClick={(e) => handleNav(e, 'portfolio')} className="hover:text-white transition-colors">Торговые центры</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-10 text-[#fc670c]">Контакты</h4>
            <address className="space-y-6 text-slate-400 text-[10px] font-black uppercase tracking-widest not-italic">
              <div className="flex items-start gap-3"><i className="fas fa-map-marker-alt text-[#fc670c] mt-1"></i><span>Москва, Саввинская наб. 15, офис 402</span></div>
              <div className="flex items-center gap-3"><i className="fas fa-phone text-[#fc670c]"></i><a href="tel:+74950000000" className="hover:text-white transition-colors text-base font-black">+7 (495) 000-00-00</a></div>
              <div className="flex items-center gap-3 text-green-500 font-bold"><i className="fas fa-shield-alt"></i><span>Допуск СРО № П.035.77.1234</span></div>
            </address>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[8px] font-black uppercase tracking-[0.3em] text-slate-600">
          <p>© 2012–2024 Проектное бюро HOTPLAN. ИНН 7700000000. ОГРН 1120000000000</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Конфиденциальность</a>
            <a href="#" className="hover:text-white transition-colors">Карта сайта</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
