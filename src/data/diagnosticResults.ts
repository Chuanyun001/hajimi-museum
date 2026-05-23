export interface DiagnosticResult {
  similarity: number;
  rebellionIndex: string;
  hissProbability: number;
  attackTendency: string;
  tamingDifficulty: string;
  codeAnalysis: string;
  tamingAdvice: string;
}

export const defaultDiagnosticResult: DiagnosticResult = {
  similarity: 87,
  rebellionIndex: '★★★★☆',
  hissProbability: 78,
  attackTendency: '高',
  tamingDifficulty: '★★★★★',
  codeAnalysis: '检测到强闯民宅代码和猫粮抢夺代码已激活，三哈一强普代码处于待命状态。',
  tamingAdvice: '不要试图驯服它，建议直接投降并奉上最好的猫粮。',
};
