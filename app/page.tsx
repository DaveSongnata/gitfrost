'use client';

import { useState } from 'react';
import { createIssue } from './actions/create-issue';
import { Button } from '@/components/ui/pixelact-ui/button';
import { Input } from '@/components/ui/pixelact-ui/input';
import { Textarea } from '@/components/ui/pixelact-ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/pixelact-ui/card';

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
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Pixel art background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 8px,
            rgba(6, 182, 212, 0.1) 8px,
            rgba(6, 182, 212, 0.1) 16px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 8px,
            rgba(6, 182, 212, 0.1) 8px,
            rgba(6, 182, 212, 0.1) 16px
          )`
        }} />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header with pixel art style */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <h1 className="text-6xl font-bold text-cyan-400 tracking-wider mb-2
                           drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]
                           animate-pulse"
                style={{ fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              ❄️ GITFROST ❄️
            </h1>
          </div>
          <p className="text-slate-400 text-lg tracking-wide"
             style={{ fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            &gt; Reporte problemas de forma simples e rápida_
          </p>
        </div>

        {/* Form Card with pixel art styling */}
        <Card className="border-4 border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)] bg-slate-900/90 backdrop-blur">
          <CardHeader className="border-b-4 border-cyan-500/20">
            <CardTitle className="text-2xl text-cyan-400"
                       style={{ fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              📝 CRIAR NOVA ISSUE
            </CardTitle>
            <CardDescription className="text-slate-400"
                            style={{ fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Preencha os campos abaixo para reportar um problema
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-bold text-cyan-400 tracking-wide"
                style={{ fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '0.1em' }}
              >
                &gt; RESUMO DO PROBLEMA
              </label>
              <Input
                type="text"
                id="title"
                name="title"
                required
                disabled={isLoading}
                className="border-2 border-cyan-500/50 focus:border-cyan-400 bg-slate-950 text-slate-100
                           placeholder:text-slate-600"
                placeholder="Digite um resumo claro..."
              />
            </div>

            {/* Body Field */}
            <div className="space-y-2">
              <label
                htmlFor="body"
                className="block text-sm font-bold text-cyan-400 tracking-wide"
                style={{ fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '0.1em' }}
              >
                &gt; EXPLIQUE O QUE ACONTECEU
              </label>
              <Textarea
                id="body"
                name="body"
                required
                disabled={isLoading}
                rows={8}
                className="border-2 border-cyan-500/50 focus:border-cyan-400 bg-slate-950 text-slate-100
                           placeholder:text-slate-600 resize-none"
                placeholder="Descreva o problema em detalhes..."
              />
            </div>

            {/* Client Secret Field */}
            <div className="space-y-2">
              <label
                htmlFor="clientSecret"
                className="block text-sm font-bold text-cyan-400 tracking-wide"
                style={{ fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '0.1em' }}
              >
                &gt; CÓDIGO DE ACESSO 🔐
              </label>
              <Input
                type="password"
                id="clientSecret"
                name="clientSecret"
                required
                disabled={isLoading}
                className="border-2 border-cyan-500/50 focus:border-cyan-400 bg-slate-950 text-slate-100
                           placeholder:text-slate-600"
                placeholder="Digite o código de acesso..."
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full text-lg font-bold tracking-wider
                         bg-gradient-to-r from-cyan-500 to-blue-600
                         hover:from-cyan-400 hover:to-blue-500
                         border-4 border-cyan-400/50
                         shadow-[0_0_20px_rgba(6,182,212,0.3)]
                         hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]
                         transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed
                         py-6"
              style={{ fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '0.1em' }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="animate-spin text-2xl">⚙️</span>
                  ENVIANDO...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  ⚡ ENVIAR PROBLEMA ⚡
                </span>
              )}
            </Button>
          </form>

          {/* Message Display with pixel art style */}
          {message && (
            <div
              className={`mt-6 p-4 border-4 ${
                message.type === 'success'
                  ? 'bg-emerald-950/50 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                  : 'bg-red-950/50 border-red-500 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
              }`}
            >
              <p className="font-bold"
                 style={{ fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {message.type === 'success' ? '✅ ' : '❌ '}
                {message.text}
              </p>
              {message.issueUrl && (
                <a
                  href={message.issueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline mt-2 inline-block font-bold"
                  style={{ fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '0.05em' }}
                >
                  🔗 Ver issue no GitHub →
                </a>
              )}
            </div>
          )}
          </CardContent>
        </Card>

        {/* Footer with pixel art style */}
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm tracking-wide"
             style={{ fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            POWERED BY{' '}
            <span className="text-cyan-400 font-bold animate-pulse">
              ❄️ GITFROST ❄️
            </span>
          </p>
          <p className="text-slate-600 text-xs mt-2"
             style={{ fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            v1.0.0 | Built with PixelAct UI
          </p>
        </div>
      </div>
    </main>
  );
}
