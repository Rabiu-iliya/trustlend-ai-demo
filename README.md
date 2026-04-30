# TrustLend AI

Privacy-preserving, reputation-based credit for the next billion users.
Built as a single-page hackathon MVP with React, Vite, and Tailwind.

## Nox Protocol Integration

TrustLend AI uses **Nox Protocol's TEE-based confidential compute** to
securely evaluate borrower data.

All sensitive financial inputs (income, transaction activity, identity
signals) are processed off-chain inside a **Trusted Execution Environment**,
ensuring privacy, security, and compliance. Only the resulting trust score
and a cryptographic attestation leave the enclave — raw data is never
exposed to operators, validators, or the AI model host.

Integration points in this demo:

- `src/lib/noxTEE.ts` — simulated `processInTEE()` entry point
- `DemoSection` — AI scoring flow calls `processInTEE(userData)`
- UI badges — `🔒 Processed in TEE (Nox Protocol)` on score + dashboard
- Confidential Compute section — visual `User → Encrypted Data → TEE → AI → Result` flow
