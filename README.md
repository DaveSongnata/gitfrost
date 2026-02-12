# GitFrost ❄️

A minimalist, high-performance bridge to send issues to your private GitHub repository with a beautiful Nordic-themed UI.

## Features

- 🎨 **Nordic/Frozen Theme** - Beautiful slate-900 background with cyan/blue accents
- 🔒 **Secure** - Client secret validation and optional URL-based access control
- ⚡ **Fast** - Built with Next.js 15 and React Server Actions
- 🎯 **Simple** - Clean, single-purpose interface for issue reporting
- 🔄 **Real-time Feedback** - Loading states and success/error messages

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**

   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` with your values:

   ```env
   # Get your token from: https://github.com/settings/tokens
   # Required scopes: repo (full control of private repositories)
   GITHUB_TOKEN=ghp_your_personal_access_token

   # Your GitHub username or organization
   GITHUB_OWNER=your-username

   # The repository name where issues will be created
   GITHUB_REPO=your-repo-name

   # Secret key that users must provide when submitting
   CLIENT_SECRET=your-secure-secret-key

   # Optional: Protect the page with URL access token
   # Users will need to visit: http://localhost:3000?access=your-token
   ACCESS_TOKEN=optional-url-access-token
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - If `ACCESS_TOKEN` is set: `http://localhost:3000?access=your-token`
   - If not set: `http://localhost:3000`

## Usage

1. Fill in the form fields:
   - **Resumo do problema**: Brief title of the issue
   - **Explique o que aconteceu**: Detailed description
   - **Código de acesso**: The `CLIENT_SECRET` from your `.env.local`

2. Click "Enviar problema"

3. The issue will be created in your GitHub repository with the label `gitfrost`

## Security Features

- **Client Secret**: Prevents unauthorized issue creation
- **URL Access Token** (optional): Restricts page access to authorized users
- **Environment Variables**: Sensitive data stored securely in `.env.local`

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **@octokit/rest** - GitHub API integration
- **React Server Actions** - Secure server-side operations

## Deployment

Deploy to Vercel:

```bash
vercel
```

Make sure to add all environment variables in your Vercel project settings.

## License

MIT

---

**Powered by GitFrost** ❄️
