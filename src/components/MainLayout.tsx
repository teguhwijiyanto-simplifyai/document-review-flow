
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ContractUpload from './ContractUpload';
import StreamingResponse from './StreamingResponse';
import ContractReviewDashboard from './ContractReviewDashboard';
import { ContractUpload as ContractUploadType, ContractAnalysis, ApiResponse, ComplianceCard } from '@/types';

const MainLayout = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('contract-review');
  const [currentView, setCurrentView] = useState<'upload' | 'streaming' | 'dashboard'>('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisData, setAnalysisData] = useState<ContractAnalysis | null>(null);

  const parseApiResponse = (response: ApiResponse): ContractAnalysis => {
    // Calculate compliance percentages based on the data
    const totalCards = response.tableA.length;
    const compliantCards = response.tableA.filter(card => card.complianceAssessment === 'Compliant').length;
    const partiallyCompliantCards = response.tableA.filter(card => card.complianceAssessment === 'Partially Compliant').length;
    const nonCompliantCards = response.tableA.filter(card => card.complianceAssessment === 'Non-Compliant').length;
    const missingClausesCards = response.tableA.filter(card => card.complianceAssessment === 'Missing Clause(s)').length;

    const overallCompliance = totalCards > 0 ? Math.round((compliantCards / totalCards) * 100) : 0;
    const partialCompliance = totalCards > 0 ? Math.round((partiallyCompliantCards / totalCards) * 100) : 0;
    const nonCompliance = totalCards > 0 ? Math.round((nonCompliantCards / totalCards) * 100) : 0;
    const missingClauses = totalCards > 0 ? Math.round((missingClausesCards / totalCards) * 100) : 0;

    // Add unique IDs to cards if they don't have them
    const processCards = (cards: ComplianceCard[]): ComplianceCard[] => {
      return cards.map((card, index) => ({
        ...card,
        id: card.id || `${index}-${Date.now()}`,
        amendmentText: card.revisedClause || card.amendmentText || ''
      }));
    };

    return {
      overallCompliance,
      partialCompliance,
      nonCompliance,
      missingClauses,
      complianceCards: processCards(response.tableA || []),
      amendmentCards: processCards(response.tableB || [])
    };
  };

  const handleUpload = async (uploadData: ContractUploadType) => {
    setIsProcessing(true);
    setCurrentView('streaming');

    try {
      const formData = new FormData();
      formData.append('file', uploadData.file);
      formData.append('language', uploadData.language);
      formData.append('partyPositioning', uploadData.partyPositioning);
      formData.append('riskPositioning', uploadData.riskPositioning);

      const response = await fetch('https://workflow.simplifygenai.id/api/v1/prediction/fff70a49-0cfb-45f1-8c39-409d4ffa566b', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const apiResponse: ApiResponse = await response.json();
      const analysis = parseApiResponse(apiResponse);
      setAnalysisData(analysis);
      
    } catch (error) {
      console.error('Error calling API:', error);
      // For now, fall back to mock data if API fails
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
          }
        ]
      };
      setAnalysisData(mockAnalysis);
    }
  };

  const handleStreamingComplete = () => {
    setIsProcessing(false);
    setCurrentView('dashboard');
  };

  const handleBackToUpload = () => {
    setCurrentView('upload');
    setAnalysisData(null);
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
        return analysisData ? <ContractReviewDashboard analysis={analysisData} /> : null;
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
