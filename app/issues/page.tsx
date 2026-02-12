import { getIssues } from '../actions/get-issues';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/pixelact-ui/card';
import { Button } from '@/components/ui/pixelact-ui/button';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function IssuesPage() {
  const result = await getIssues();

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

      <div className="w-full max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4 hover:opacity-80 transition-opacity">
            <div className="relative w-24 h-24 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)] mx-auto">
              <Image
                src="/logo.svg"
                alt="GitFrost Logo"
                width={96}
                height={96}
                className="animate-pulse"
                priority
              />
            </div>
          </Link>

          <h1 className="text-5xl font-bold text-cyan-400 tracking-wider mb-2
                         drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
              style={{ fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            📋 ISSUES ABERTAS
          </h1>
          <p className="text-slate-400 text-lg tracking-wide mb-6"
             style={{ fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            &gt; Acompanhe todos os problemas reportados_
          </p>

          <Link href="/">
            <Button
              className="bg-gradient-to-r from-cyan-500 to-blue-600
                         hover:from-cyan-400 hover:to-blue-500
                         border-2 border-cyan-400/50
                         shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              style={{ fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '0.1em' }}
            >
              ← REPORTAR NOVO PROBLEMA
            </Button>
          </Link>
        </div>

        {/* Issues List */}
        {!result.success ? (
          <Card className="border-4 border-red-500/30 bg-slate-900/90">
            <CardContent className="pt-6">
              <p className="text-red-400 text-center font-bold"
                 style={{ fontFamily: "'Courier New', monospace", textTransform: 'uppercase' }}>
                ❌ {result.message}
              </p>
            </CardContent>
          </Card>
        ) : result.issues.length === 0 ? (
          <Card className="border-4 border-cyan-500/30 bg-slate-900/90">
            <CardContent className="pt-6">
              <p className="text-cyan-400 text-center text-lg font-bold"
                 style={{ fontFamily: "'Courier New', monospace", textTransform: 'uppercase' }}>
                ✨ NENHUMA ISSUE ABERTA! TUDO FUNCIONANDO! ✨
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <p className="text-slate-500 text-sm text-center"
               style={{ fontFamily: "'Courier New', monospace", textTransform: 'uppercase' }}>
              {result.issues.length} {result.issues.length === 1 ? 'ISSUE' : 'ISSUES'} ENCONTRADA{result.issues.length !== 1 ? 'S' : ''}
            </p>

            {result.issues.map((issue) => (
              <Card
                key={issue.number}
                className="border-4 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]
                           bg-slate-900/90 backdrop-blur hover:border-cyan-400/50
                           hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all"
              >
                <CardHeader className="border-b-2 border-cyan-500/20">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-cyan-400 mb-2"
                                 style={{ fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        #{issue.number} - {issue.title}
                      </CardTitle>
                      <CardDescription className="text-slate-500 flex items-center gap-4 flex-wrap"
                                      style={{ fontFamily: "'Courier New', monospace", fontSize: '0.75rem' }}>
                        <span>👤 {issue.user}</span>
                        <span>📅 {new Date(issue.createdAt).toLocaleDateString('pt-BR')}</span>
                        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/50">
                          🟢 {issue.state.toUpperCase()}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-4">
                  <p className="text-slate-300 mb-4 whitespace-pre-wrap leading-relaxed">
                    {issue.body || 'Sem descrição'}
                  </p>

                  <a
                    href={issue.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button
                      variant="secondary"
                      className="border-2 border-cyan-500/50 hover:border-cyan-400
                                 text-cyan-400 hover:text-cyan-300
                                 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                      style={{ fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '0.05em' }}
                    >
                      🔗 VER NO GITHUB →
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm tracking-wide"
             style={{ fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            POWERED BY{' '}
            <span className="text-cyan-400 font-bold animate-pulse">
              ❄️ GITFROST ❄️
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
