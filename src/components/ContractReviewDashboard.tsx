
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ExpandIcon, 
  ShrinkIcon, 
  Filter,
  Edit3
} from 'lucide-react';
import { ContractAnalysis } from '@/types';
import ComplianceCard from './ComplianceCard';
import EditDocumentModal from './EditDocumentModal';

interface ContractReviewDashboardProps {
  analysis: ContractAnalysis;
}

const ContractReviewDashboard: React.FC<ContractReviewDashboardProps> = ({ analysis }) => {
  const [expandedSectionA, setExpandedSectionA] = useState<string[]>([]);
  const [expandedSectionB, setExpandedSectionB] = useState<string[]>([]);
  const [filterA, setFilterA] = useState<string>('All');
  const [filterB, setFilterB] = useState<string>('All');
  const [showEditModal, setShowEditModal] = useState(false);
  const [amendmentTexts, setAmendmentTexts] = useState<Record<string, string>>({});

  const filterOptions = ['All', 'Compliant', 'Partially Compliant', 'Non-Compliant', 'Missing Clause(s)'];

  const toggleCardA = (id: string) => {
    setExpandedSectionA(prev => 
      prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]
    );
  };

  const toggleCardB = (id: string) => {
    setExpandedSectionB(prev => 
      prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]
    );
  };

  const expandAllA = () => {
    setExpandedSectionA(filteredComplianceCards.map(card => card.id));
  };

  const collapseAllA = () => {
    setExpandedSectionA([]);
  };

  const expandAllB = () => {
    setExpandedSectionB(filteredAmendmentCards.map(card => card.id));
  };

  const collapseAllB = () => {
    setExpandedSectionB([]);
  };

  const filteredComplianceCards = analysis.complianceCards.filter(card => 
    filterA === 'All' || card.complianceAssessment === filterA
  );

  const filteredAmendmentCards = analysis.amendmentCards.filter(card => 
    filterB === 'All' || card.complianceAssessment === filterB
  );

  const handleAmendmentChange = (id: string, text: string) => {
    setAmendmentTexts(prev => ({ ...prev, [id]: text }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Compliance Overview Cards */}
      <div className="space-y-6">
        {/* Main Compliance Card */}
        <div className="flex justify-center">
          <Card className="w-48 h-48 flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
            <CardContent className="text-center p-6">
              <div className="text-4xl font-bold text-green-700 dark:text-green-200 mb-2">
                {analysis.overallCompliance}%
              </div>
              <div className="text-sm font-medium text-green-600 dark:text-green-300">
                COMPLIANCE
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Compliance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800">
            <CardContent className="text-center p-4">
              <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-200 mb-1">
                {analysis.partialCompliance}%
              </div>
              <div className="text-xs font-medium text-yellow-600 dark:text-yellow-300">
                PARTIALLY COMPLIANCE
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800">
            <CardContent className="text-center p-4">
              <div className="text-2xl font-bold text-red-700 dark:text-red-200 mb-1">
                {analysis.nonCompliance}%
              </div>
              <div className="text-xs font-medium text-red-600 dark:text-red-300">
                NON COMPLIANCE
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
            <CardContent className="text-center p-4">
              <div className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-1">
                {analysis.missingClauses}%
              </div>
              <div className="text-xs font-medium text-gray-600 dark:text-gray-300">
                MISSING CLAUSE(S)
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Section A - Compliance Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Section A – Compliance Assessment and Legal Justification</CardTitle>
          <div className="flex flex-wrap gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={expandAllA}>
              <ExpandIcon className="h-4 w-4 mr-2" />
              Expand All
            </Button>
            <Button variant="outline" size="sm" onClick={collapseAllA}>
              <ShrinkIcon className="h-4 w-4 mr-2" />
              Collapse All
            </Button>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm">Filter by:</span>
              {filterOptions.map(option => (
                <Button
                  key={option}
                  variant={filterA === option ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterA(option)}
                  className="text-xs"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredComplianceCards.map(card => (
              <ComplianceCard
                key={card.id}
                card={card}
                isExpanded={expandedSectionA.includes(card.id)}
                onToggle={() => toggleCardA(card.id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section B - Recommended Amendments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Section B – Recommended Legal Amendments and Clause Revisions</CardTitle>
          <div className="flex flex-wrap gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={expandAllB}>
              <ExpandIcon className="h-4 w-4 mr-2" />
              Expand All
            </Button>
            <Button variant="outline" size="sm" onClick={collapseAllB}>
              <ShrinkIcon className="h-4 w-4 mr-2" />
              Collapse All
            </Button>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm">Filter by:</span>
              {filterOptions.slice(1).map(option => (
                <Button
                  key={option}
                  variant={filterB === option ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterB(option)}
                  className="text-xs"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAmendmentCards.map(card => (
              <ComplianceCard
                key={card.id}
                card={card}
                isExpanded={expandedSectionB.includes(card.id)}
                onToggle={() => toggleCardB(card.id)}
                showAmendment={true}
                onAmendmentChange={handleAmendmentChange}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Document Button */}
      <div className="flex justify-center">
        <Button 
          size="lg" 
          onClick={() => setShowEditModal(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Edit3 className="mr-2 h-5 w-5" />
          Edit Document
        </Button>
      </div>

      {/* Edit Document Modal */}
      <EditDocumentModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        amendmentCards={analysis.amendmentCards}
        amendmentTexts={amendmentTexts}
        onAmendmentChange={handleAmendmentChange}
      />
    </div>
  );
};

export default ContractReviewDashboard;
