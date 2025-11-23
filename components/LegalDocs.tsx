import React from 'react';

export const PrivacyPolicy: React.FC = () => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
    <h2 className="text-2xl font-bold mb-4">Política de Privacidade</h2>
    <p className="text-sm text-slate-500 mb-4">Última atualização: {new Date().toLocaleDateString()}</p>
    
    <h3 className="font-bold mt-4">1. Coleta de Dados</h3>
    <p>O Ajuda Saúde não coleta dados pessoais identificáveis de seus usuários (como nome, email ou telefone) de forma direta. Todas as informações inseridas nas calculadoras (como peso, idade, resultados de exames) são processadas localmente no navegador do usuário e não são enviadas para servidores externos para armazenamento.</p>

    <h3 className="font-bold mt-4">2. Cookies e Publicidade</h3>
    <p>Utilizamos cookies de terceiros, especificamente através do Google AdSense, para exibir anúncios relevantes. O Google utiliza cookies para veicular anúncios com base nas visitas anteriores do usuário ao nosso site ou a outros sites na Internet.</p>
    <p>Os usuários podem optar por desativar a publicidade personalizada acessando as Configurações de Anúncios do Google.</p>

    <h3 className="font-bold mt-4">3. Finalidade</h3>
    <p>O site tem como única finalidade fornecer ferramentas de cálculo para auxílio profissional. Não vendemos dados a terceiros.</p>
  </div>
);

export const TermsOfUse: React.FC = () => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
    <h2 className="text-2xl font-bold mb-4">Termos de Uso e Isenção de Responsabilidade</h2>
    
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
      <h3 className="font-bold text-red-700">Aviso Importante de Saúde</h3>
      <p className="text-sm text-red-800">
        O Ajuda Saúde é uma ferramenta destinada exclusivamente a <strong>profissionais de saúde</strong>. As informações fornecidas aqui não substituem o julgamento clínico profissional.
      </p>
    </div>

    <h3 className="font-bold mt-4">1. Uso Aceitável</h3>
    <p>Ao utilizar este site, você concorda que as ferramentas aqui presentes são apenas para suporte à decisão clínica. O desenvolvedor não se responsabiliza por erros de cálculo, imprecisões ou decisões médicas tomadas com base nos resultados.</p>

    <h3 className="font-bold mt-4">2. Precisão das Informações</h3>
    <p>Embora nos esforcemos para manter as fórmulas atualizadas com as diretrizes médicas mais recentes, a medicina está em constante evolução. O profissional deve sempre verificar os resultados e confrontá-los com a literatura oficial.</p>

    <h3 className="font-bold mt-4">3. Propriedade Intelectual</h3>
    <p>O design, logotipo e código fonte do Ajuda Saúde são propriedade exclusiva. O uso não autorizado é proibido.</p>
  </div>
);

export const AboutUs: React.FC = () => (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
      <h2 className="text-2xl font-bold mb-4">Sobre o Ajuda Saúde</h2>
      <p>O Ajuda Saúde é uma plataforma desenvolvida para agilizar a rotina de médicos, enfermeiros e estudantes de medicina. Nossa missão é reunir as principais fórmulas e escores clínicos em um único lugar, com interface limpa, rápida e confiável.</p>
      
      <p className="mt-4">Focamos em:</p>
      <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Agilidade:</strong> Calculadoras otimizadas para uso em plantões.</li>
          <li><strong>Precisão:</strong> Fórmulas baseadas em evidências e diretrizes atuais.</li>
          <li><strong>Usabilidade:</strong> Design intuitivo para mobile e desktop.</li>
      </ul>
      
      <p className="mt-6 text-sm text-slate-500">Contato: contato@ajudasaude.com (Exemplo)</p>
    </div>
  );