'use server';

import { Octokit } from '@octokit/rest';

interface CreateIssueResult {
  success: boolean;
  message: string;
  issueUrl?: string;
}

export async function createIssue(
  formData: FormData
): Promise<CreateIssueResult> {
  try {
    // Extract form data
    const title = formData.get('title') as string;
    const body = formData.get('body') as string;
    const clientSecret = formData.get('clientSecret') as string;

    // Validate required fields
    if (!title || !body) {
      return {
        success: false,
        message: 'Título e descrição são obrigatórios',
      };
    }

    // Validate client secret
    if (clientSecret !== process.env.CLIENT_SECRET) {
      return {
        success: false,
        message: 'Acesso não autorizado',
      };
    }

    // Validate environment variables
    const githubToken = process.env.GITHUB_TOKEN;
    const githubOwner = process.env.GITHUB_OWNER;
    const githubRepo = process.env.GITHUB_REPO;

    if (!githubToken || !githubOwner || !githubRepo) {
      return {
        success: false,
        message: 'Configuração do servidor incompleta',
      };
    }

    // Initialize Octokit
    const octokit = new Octokit({
      auth: githubToken,
    });

    // Create the issue
    const response = await octokit.issues.create({
      owner: githubOwner,
      repo: githubRepo,
      title,
      body,
      labels: ['gitfrost'],
    });

    return {
      success: true,
      message: 'Issue criada com sucesso!',
      issueUrl: response.data.html_url,
    };
  } catch (error) {
    console.error('Error creating issue:', error);
    return {
      success: false,
      message: 'Erro ao criar issue. Tente novamente.',
    };
  }
}
