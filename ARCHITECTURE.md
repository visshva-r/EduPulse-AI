# Architecture (prototype vs production)

This MVP implements the **Detect → Explain → Act → Track** loop from the Round 2 EduPulse AI design.

| Round 2 module | Prototype | Production |
|----------------|-----------|------------|
| Data connector | `lib/data.ts` synthetic cohort | PRASUNEX REST / CSV ingest |
| Feature + risk engine | `lib/risk.ts` weighted rules | XGBoost + SHAP, weekly jobs |
| Intervention copilot | `lib/interventions.ts` | LLM + JSON schema + guardrails |
| Role portals | Next.js App Router routes | Embedded in PRASUNEX UI |
| Outcome tracker | Admin coverage KPI | Postgres `outcomes` table |

State for teacher approvals is stored in `localStorage` for demo resilience across page navigations.