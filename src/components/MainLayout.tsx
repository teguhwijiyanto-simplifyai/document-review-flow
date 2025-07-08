
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ContractUpload from './ContractUpload';
import StreamingResponse from './StreamingResponse';
import ContractReviewDashboard from './ContractReviewDashboard';
import { ContractUpload as ContractUploadType, ContractAnalysis } from '@/types';

const mockAnalysis: ContractAnalysis = {
  overallCompliance: 80,
  partialCompliance: 10,
  nonCompliance: 6,
  missingClauses: 4,
  complianceCards: [
    {
      id: '1',
      complianceAssessment: 'Compliant',
      category: 'Employment Terms',
      contractualReference: 'Section 1: Employee agrees to serve as designated position',
      applicableRegulatoryReference: 'Labor Code Section 200-205',
      legalJustification: 'The employment terms comply with standard labor regulations and provide clear definition of roles and responsibilities.'
    },
    {
      id: '2',
      complianceAssessment: 'Partially Compliant',
      category: 'Termination Clause',
      contractualReference: 'Section 4: Termination with 30 days notice',
      applicableRegulatoryReference: 'Labor Code Section 2922',
      legalJustification: 'While termination notice is provided, the 30-day period may be insufficient for certain positions requiring longer transition periods.'
    },
    {
      id: '3',
      complianceAssessment: 'Non-Compliant',
      category: 'Non-Compete Agreement',
      contractualReference: 'Section 6: One year non-compete restriction',
      applicableRegulatoryReference: 'Business and Professions Code Section 16600',
      legalJustification: 'The one-year non-compete period exceeds reasonable limitations and may be unenforceable in certain jurisdictions.'
    }
  ],
  amendmentCards: [
    {
      id: '4',
      complianceAssessment: 'Partially Compliant',
      category: 'Termination Notice',
      contractualReference: 'Section 4: Termination procedures',
      applicableRegulatoryReference: 'Labor Code Section 2922',
      legalJustification: 'Termination notice period should be extended to provide adequate transition time.',
      recommendedLegalAmendment: 'Extend notice period from 30 to 60 days',
      originalClause: 'This Agreement may be terminated by either party with thirty (30) days written notice.',
      revisedClause: 'This Agreement may be terminated by either party with sixty (60) days written notice, providing adequate transition time.',
      amendmentText: 'This Agreement may be terminated by either party with sixty (60) days written notice, providing adequate transition time.'
    },
    {
      id: '5',
      complianceAssessment: 'Non-Compliant',
      category: 'Non-Compete Restrictions',
      contractualReference: 'Section 6: Non-compete clause',
      applicableRegulatoryReference: 'Business and Professions Code Section 16600',
      legalJustification: 'Non-compete restrictions must be reasonable in scope, duration, and geographic limitation.',
      recommendedLegalAmendment: 'Reduce non-compete period and scope',
      originalClause: 'Employee agrees that for a period of one (1) year following termination of employment, Employee will not engage in any business that competes with the Company.',
      revisedClause: 'Employee agrees that for a period of six (6) months following termination of employment, Employee will not engage in direct competition with the Company\'s core business activities within the same geographic region.',
      amendmentText: 'Employee agrees that for a period of six (6) months following termination of employment, Employee will not engage in direct competition with the Company\'s core business activities within the same geographic region.'
    }
  ]
};

const MainLayout = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('contract-review');
  const [currentView, setCurrentView] = useState<'upload' | 'streaming' | 'dashboard'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = async (uploadData: ContractUploadType) => {
    setIsProcessing(true);
    setCurrentView('streaming');
  };

  const handleStreamingComplete = () => {
    setIsProcessing(false);
    setCurrentView('dashboard');
  };

  const handleBackToUpload = () => {
    setCurrentView('upload');
  };

  const renderContent = () => {
    if (activeMenuItem !== 'contract-review') {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              {activeMenuItem === 'corporate-governance' && 'Corporate Governance & Legal Advisory'}
              {activeMenuItem === 'procurement' && 'Procurement & Vendor Contract Support'}
              {activeMenuItem === 'regulatory' && 'Regulatory Compliance'}
              {activeMenuItem === 'litigation' && 'Litigation & Dispute Support'}
            </h2>
            <p className="text-muted-foreground">This feature is coming soon.</p>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'upload':
        return <ContractUpload onUpload={handleUpload} isLoading={isProcessing} />;
      case 'streaming':
        return <StreamingResponse onComplete={handleStreamingComplete} />;
      case 'dashboard':
        return <ContractReviewDashboard analysis={mockAnalysis} />;
      default:
        return <ContractUpload onUpload={handleUpload} isLoading={isProcessing} />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        activeItem={activeMenuItem} 
        onItemClick={setActiveMenuItem}
      />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default MainLayout;
