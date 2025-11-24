import React, { useEffect, useState } from 'react';
import { fetchMedicalNews } from '../services/geminiService';
import { NewsItem } from '../types';
import { ActivityIcon } from './icons';

const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    const loadNews = async () => {
      try {
        const data = await fetchMedicalNews();
        if (mounted) {
          setNews(data);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(true);
          setLoading(false);
        }
      }
    };

    loadNews();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 dark:text-slate-300">
        <div className="w-10 h-10 border-4 border-medical-200 border-t-medical-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 dark:text-slate-300">A inteligência artificial está curando as notícias...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 dark:text-red-400">
        Não foi possível carregar as notícias no momento.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center gap-3">
            <div className="bg-medical-100 p-2 rounded-lg">
                <ActivityIcon className="text-medical-600 w-6 h-6" />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Atualizações Médicas</h2>
                <p className="text-slate-500 dark:text-slate-300 text-sm">Resumos gerados por IA baseados em tópicos recentes</p>
            </div>
        </div>

      <div className="grid gap-6 md:grid-cols-2">
        {news.map((item, index) => (
          <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition duration-200 flex flex-col h-full">
            <div className="flex items-center justify-between mb-3">
              <span className="bg-medical-50 text-medical-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-medical-100">
                {item.category}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 leading-tight">
              {item.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 flex-grow">
              {item.summary}
            </p>
            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Impacto Clínico:</p>
              <p className="text-xs text-slate-700 dark:text-slate-200 italic">
                "{item.impact}"
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
        Isenção de responsabilidade: Conteúdo gerado por IA para fins informativos. Sempre verifique as diretrizes oficiais.
      </div>
    </div>
  );
};

export default NewsFeed;