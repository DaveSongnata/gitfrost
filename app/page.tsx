'use client';

import { useState } from 'react';
import { createIssue } from './actions/create-issue';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
    issueUrl?: string;
  } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const result = await createIssue(formData);

    setIsLoading(false);

    if (result.success) {
      setMessage({
        type: 'success',
        text: result.message,
        issueUrl: result.issueUrl,
      });
      // Reset form
      event.currentTarget.reset();
    } else {
      setMessage({
        type: 'error',
        text: result.message,
      });
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-3">
            GitFrost
          </h1>
          <p className="text-slate-400 text-lg">
            Reporte problemas de forma simples e rápida
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-cyan-400 mb-2"
              >
                Resumo do problema
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Digite um resumo claro do problema"
              />
            </div>

            {/* Body Field */}
            <div>
              <label
                htmlFor="body"
                className="block text-sm font-medium text-cyan-400 mb-2"
              >
                Explique o que aconteceu
              </label>
              <textarea
                id="body"
                name="body"
                required
                disabled={isLoading}
                rows={8}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Descreva o problema em detalhes..."
              />
            </div>

            {/* Client Secret Field */}
            <div>
              <label
                htmlFor="clientSecret"
                className="block text-sm font-medium text-cyan-400 mb-2"
              >
                Código de acesso
              </label>
              <input
                type="password"
                id="clientSecret"
                name="clientSecret"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Digite o código de acesso"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Enviando...
                </span>
              ) : (
                'Enviar problema'
              )}
            </button>
          </form>

          {/* Message Display */}
          {message && (
            <div
              className={`mt-6 p-4 rounded-lg border ${
                message.type === 'success'
                  ? 'bg-emerald-900/30 border-emerald-500 text-emerald-400'
                  : 'bg-red-900/30 border-red-500 text-red-400'
              }`}
            >
              <p className="font-medium">{message.text}</p>
              {message.issueUrl && (
                <a
                  href={message.issueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline mt-2 inline-block"
                >
                  Ver issue no GitHub →
                </a>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">
            Powered by{' '}
            <span className="text-cyan-400 font-semibold">GitFrost</span>
          </p>
        </div>
      </div>
    </main>
  );
}
