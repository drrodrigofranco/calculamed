import React, { Component, ReactNode, ErrorInfo } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // Fix: Explicitly declare state property using class fields syntax
  public state: ErrorBoundaryState = { hasError: false, error: null };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    // Remove direct assignment to this.state here as it's handled by the class field initialization
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Em produção, você enviaria isso para um serviço de log de erros
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    // Fix: Access state via `this.state`
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 p-4 dark:bg-red-900/20">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-red-200 dark:border-red-800 max-w-lg w-full">
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Ops! Algo deu errado.</h1>
            <p className="text-slate-600 dark:text-slate-300 mb-4">Ocorreu um erro inesperado ao carregar o aplicativo.</p>
            {this.state.error && (
              <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded text-xs font-mono text-slate-700 dark:text-slate-300 overflow-auto max-h-40 mb-4">
                  {this.state.error.toString()}
              </div>
            )}
            <button 
                onClick={() => window.location.reload()}
                className="w-full bg-red-600 dark:bg-red-700 text-white font-bold py-3 rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition"
            >
                Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    // Fix: Access props via `this.props`
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
  </React.StrictMode>
);