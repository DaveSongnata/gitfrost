'use server';

import { Octokit } from '@octokit/rest';

export async function getIssues() {
  try {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;

    if (!owner || !repo) {
      return {
        success: false,
        message: 'Configuração do repositório não encontrada',
        issues: [],
      };
    }

    const { data } = await octokit.issues.listForRepo({
      owner,
      repo,
      state: 'open',
      labels: 'gitfrost',
      sort: 'created',
      direction: 'desc',
      per_page: 50,
    });

    return {
      success: true,
      issues: data.map((issue) => ({
        number: issue.number,
        title: issue.title,
        body: issue.body || '',
        url: issue.html_url,
        createdAt: issue.created_at,
        state: issue.state,
        user: issue.user?.login || 'Desconhecido',
      })),
    };
  } catch (error) {
    console.error('Erro ao buscar issues:', error);
    return {
      success: false,
      message: 'Erro ao buscar issues do GitHub',
      issues: [],
    };
  }
}
