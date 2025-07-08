
export interface User {
  id: string;
  email: string;
  full_name?: string;
  role: 'Admin' | 'Editor' | 'Viewer';
}

export interface ComplianceCard {
  id: string;
  itemNo?: string;
  complianceAssessment: 'Compliant' | 'Partially Compliant' | 'Non-Compliant' | 'Missing Clause(s)';
  category: string;
  contractualReference: string;
  applicableRegulatoryReference: string;
  legalJustification: string;
  recommendedLegalAmendment?: string;
  originalClause?: string;
  revisedClause?: string;
  amendmentText?: string;
  inputVerificationOfAmendments?: string;
}

export interface ContractAnalysis {
  overallCompliance: number;
  partialCompliance: number;
  nonCompliance: number;
  missingClauses: number;
  complianceCards: ComplianceCard[];
  amendmentCards: ComplianceCard[];
  redundancyCards?: ComplianceCard[];
}

export interface ContractUpload {
  file: File;
  language: 'English' | 'Indonesian';
  partyPositioning: 'Company' | 'Employee';
  riskPositioning: 'Low' | 'Medium' | 'High';
}

export interface ApiResponse {
  tableA: ComplianceCard[];
  tableB: ComplianceCard[];
  tableC: ComplianceCard[];
}
