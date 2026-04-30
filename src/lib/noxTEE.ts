/**
 * Nox Protocol — Trusted Execution Environment (TEE) integration (simulated).
 *
 * In production, borrower inputs would be sealed and processed inside a Nox
 * TEE enclave so raw financial data is never exposed — only the resulting
 * trust score and attestation leave the enclave.
 *
 * This module simulates that flow for the hackathon demo.
 */

export type TEEUserData = {
  name?: string;
  income?: string | number;
  activity?: string;
};

export type TEEExplanation = {
  income: number;
  behavior: number;
  community: number;
  riskSignals: number;
};

export type TEEResult = {
  trustScore: number;
  risk: "Low" | "Medium" | "High";
  explanation: TEEExplanation;
  attestation: {
    enclave: string;
    provider: string;
    hash: string;
    verified: boolean;
    timestamp: number;
  };
};

const mockHash = () =>
  "0x" +
  Array.from({ length: 16 })
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

/**
 * Simulate confidential compute inside a Nox Protocol TEE.
 * Resolves with a deterministic trust score + mock attestation.
 */
export async function processInTEE(_userData: TEEUserData): Promise<TEEResult> {
  // Tiny delay so the UI loading state feels realistic even if called directly.
  await new Promise((r) => setTimeout(r, 300));

  return {
    trustScore: 82,
    risk: "Low",
    explanation: {
      income: 30,
      behavior: 25,
      community: 20,
      riskSignals: 25,
    },
    attestation: {
      enclave: "nox-enclave-3a7f",
      provider: "Nox Protocol",
      hash: mockHash(),
      verified: true,
      timestamp: Date.now(),
    },
  };
}
