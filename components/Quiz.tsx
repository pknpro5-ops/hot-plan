
import React, { useState } from 'react';

const Quiz: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    area: '',
    systems: [] as string[],
    name: '',
    phone: ''
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setIsSubmitted(true);
    } else {
      alert('Пожалуйста, заполните контактные данные');
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-12 md:p-16 rounded-[48px] shadow-3xl text-center animate-fadeIn relative overflow-hidden">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 text-4xl">
          <i className="fas fa-check"></i>
        </div>
        <h3 className="text-3xl font-black text-[#111827] mb-6 uppercase tracking-tighter">Расчет готов!</h3>
        <p className="text-[#374151] mb-10 leading-relaxed font-medium">
          Мы подготовили смету. Наш инженер свяжется с вами в течение 30 минут для уточнения деталей.
        </p>
        <button 
          onClick={() => { setIsSubmitted(false); setStep(1); }}
          className="bg-[#fc670c] text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#e65c0c]"
        >
          Закрыть
        </button>
      </div>
    );
  }

  const steps = [
    {
      title: 'Тип объекта',
      content: (
        <div className="grid grid-cols-2 gap-4">
          {['Ресторан', 'Офис', 'Склад', 'Магазин'].map(t => (
            <button
              key={t}
              onClick={() => { setFormData({...formData, type: t}); handleNext(); }}
              className={`p-6 border-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.type === t ? 'border-[#fc670c] bg-orange-50 text-[#fc670c]' : 'border-slate-100 bg-slate-50 hover:border-orange-200 hover:bg-white'}`}
            >
              {t}
            </button>
          ))}
        </div>
      )
    },
    {
      title: 'Площадь объекта',
      content: (
        <div className="space-y-6">
          <input
            type="number"
            placeholder="м²"
            className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-[#fc670c] text-2xl font-black text-[#111827]"
            value={formData.area}
            onChange={(e) => setFormData({...formData, area: e.target.value})}
          />
          <button onClick={handleNext} disabled={!formData.area} className="w-full bg-[#fc670c] text-white py-6 rounded-2xl font-black uppercase tracking-widest disabled:opacity-30">Далее</button>
        </div>
      )
    },
    {
      title: 'Контактные данные',
      content: (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            required
            placeholder="Ваше имя" 
            className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-[#fc670c] font-black text-[#111827]"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input 
            type="tel" 
            required
            placeholder="+7 (___) ___-__-__" 
            className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-[#fc670c] font-black text-[#111827]"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          <button type="submit" className="w-full bg-[#fc670c] text-white py-6 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-orange-500/20">Получить смету</button>
        </form>
      )
    }
  ];

  return (
    <div className="bg-white p-10 md:p-16 rounded-[48px] shadow-3xl max-w-xl mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
        <div className="h-full bg-[#fc670c] transition-all" style={{ width: `${(step / 3) * 100}%` }}></div>
      </div>
      <div className="mb-8">
        <span className="text-[#fc670c] font-black text-[10px] uppercase tracking-widest block mb-2">Шаг {step} из 3</span>
        <h3 className="text-2xl font-black text-[#111827] uppercase tracking-tighter leading-none">{steps[step - 1].title}</h3>
      </div>
      <div className="min-h-[280px]">
        {steps[step - 1].content}
      </div>
      {step > 1 && (
        <button onClick={handleBack} className="mt-8 text-slate-400 hover:text-[#111827] font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-colors">
          <i className="fas fa-arrow-left"></i> Назад
        </button>
      )}
    </div>
  );
};

export default Quiz;
