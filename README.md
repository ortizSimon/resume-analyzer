# Resume Analyzer - AI-Powered Job Matching

An AI-powered web app that analyzes your resume against any job description and gives you actionable feedback to land the interview.

Upload your PDF resume, paste a job description, and get instant results:

- **Match Score** (0-100%) with a visual breakdown
- **Missing Skills** prioritized by importance (critical, important, nice-to-have)
- **Resume Improvements** with specific before/after rewrites
- **ATS Optimization Tips** to get past automated screening
- **Personalized Cover Letter** tailored to the job

## How It Works

1. **Upload** your resume (PDF) and paste the job description
2. **AI analyzes** both documents using GPT-4o
3. **View results** on a clean dashboard with actionable insights
4. **Copy** the generated cover letter with one click

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 14](https://nextjs.org/) | React framework (App Router, TypeScript) |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [OpenAI GPT-4o](https://openai.com/) | AI analysis and content generation |
| [pdf-parse](https://www.npmjs.com/package/pdf-parse) | PDF text extraction |
| [Vercel](https://vercel.com/) | Hosting and deployment |

## Getting Started

### Prerequisites

- Node.js 18+
- An [OpenAI API key](https://platform.openai.com/api-keys)

### Installation

```bash
# Clone the repo
git clone https://github.com/ortizSimom/resume-analyzer.git
cd resume-analyzer

# Install dependencies
npm install

# Create your environment file
cp .env.local.example .env.local
```

Add your OpenAI API key to `.env.local`:

```
OPENAI_API_KEY=sk-your-key-here
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  layout.tsx              # Root layout with header
  page.tsx                # Main page (upload -> results)
  globals.css             # Tailwind config
  api/
    analyze/
      route.ts            # POST endpoint: PDF parsing + AI analysis
components/
  header.tsx              # App header
  upload-form.tsx         # Drag-and-drop PDF upload + job description input
  loading-state.tsx       # Animated progress indicator
  score-card.tsx          # Circular match score (SVG)
  skills-gap.tsx          # Missing skills with priority badges
  suggestions.tsx         # Before/after resume improvements
  ats-tips.tsx            # ATS optimization checklist
  cover-letter.tsx        # Generated cover letter with copy button
lib/
  types.ts                # TypeScript interfaces
  pdf-parser.ts           # PDF text extraction wrapper
  openai.ts               # OpenAI client + prompt engineering
```

## Deploy to Vercel

1. Push your code to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add `OPENAI_API_KEY` in **Settings > Environment Variables**
4. Deploy

Every push to `main` triggers an automatic redeploy.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | Your OpenAI API key for GPT-4o |

## License

MIT
