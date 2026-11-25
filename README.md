# EduPulse AI — Round 3 Prototype

AI early-warning and intervention copilot for School ERPs (PRASUNEX Innovathon 2026).

## Repository

https://github.com/visshva-r/EduPulse-AI

## Live demo

https://edupulse-eight-wine.vercel.app

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo path (for video)

1. **Home** — KPIs and four portals  
2. **Admin** — cohort risk heatmap + intervention coverage  
3. **Teacher** — pick a flagged student → read explainable reasons → **Approve & notify parent**  
4. **Parent** — select same child → English + Hindi alert  
5. **Student** — catch-up tasks with progress  

## Implemented features

- Explainable weekly risk scoring from attendance, marks, homework trends  
- Teacher action cards (copilot-style templates) with approve / dismiss  
- Human-in-the-loop: parent sees alert only after teacher approval  
- Admin Recharts heatmap by grade-section  
- Multilingual parent messages (EN + HI)  
- Student catch-up checklist  
- Admin insight assistant (preset natural-language queries)  
- Demo reset control for clean recordings  

## Limitations (prototype)

- Rule-based risk engine (production path: XGBoost + SHAP per Round 2 design)  
- Synthetic in-memory cohort (no live PRASUNEX ERP connection yet)  
- Intervention text uses structured templates (LLM API planned)  
- Auth is demo-only (role portals via navigation)  

## Tech stack

Next.js 16, TypeScript, Tailwind CSS, Recharts, localStorage for intervention state.

## Repository

Push this folder to GitHub and paste the public URL in your Round 3 submission PDF.

## Future work

PostgreSQL multi-tenant backend, FastAPI scoring jobs, Gemini copilot with guardrails, WhatsApp Business API, PRASUNEX OAuth embedding.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for alignment with Round 2 design.