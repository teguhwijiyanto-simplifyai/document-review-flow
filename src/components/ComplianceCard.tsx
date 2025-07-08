
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ComplianceCard as ComplianceCardType } from '@/types';
import { cn } from '@/lib/utils';

interface ComplianceCardProps {
  card: ComplianceCardType;
  isExpanded: boolean;
  onToggle: () => void;
  showAmendment?: boolean;
  onAmendmentChange?: (id: string, text: string) => void;
}

const getComplianceBadgeColor = (assessment: string) => {
  switch (assessment) {
    case 'Compliant':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'Partially Compliant':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'Non-Compliant':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'Missing Clause(s)':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ComplianceCard: React.FC<ComplianceCardProps> = ({
  card,
  isExpanded,
  onToggle,
  showAmendment = false,
  onAmendmentChange
}) => {
  const [amendmentText, setAmendmentText] = useState(card.amendmentText || card.revisedClause || '');

  const handleAmendmentChange = (text: string) => {
    setAmendmentText(text);
    if (onAmendmentChange) {
      onAmendmentChange(card.id, text);
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader 
        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Badge className={cn("text-xs", getComplianceBadgeColor(card.complianceAssessment))}>
              {card.complianceAssessment}
            </Badge>
            <span className="font-medium">{card.category}</span>
          </div>
          <Button variant="ghost" size="sm">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">Contractual Reference</h4>
              <p className="text-sm text-muted-foreground bg-gray-50 dark:bg-gray-900 p-3 rounded">
                {card.contractualReference}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm mb-2">Applicable Regulatory Reference</h4>
              <p className="text-sm text-muted-foreground bg-gray-50 dark:bg-gray-900 p-3 rounded">
                {card.applicableRegulatoryReference}
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm mb-2">Legal Justification</h4>
            <p className="text-sm text-muted-foreground bg-gray-50 dark:bg-gray-900 p-3 rounded">
              {card.legalJustification}
            </p>
          </div>

          {showAmendment && (
            <>
              {card.recommendedLegalAmendment && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Recommended Legal Amendment</h4>
                  <p className="text-sm text-muted-foreground bg-gray-50 dark:bg-gray-900 p-3 rounded">
                    {card.recommendedLegalAmendment}
                  </p>
                </div>
              )}

              {card.originalClause && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Original Clause</h4>
                    <p className="text-sm text-muted-foreground bg-red-50 dark:bg-red-950 p-3 rounded border border-red-200 dark:border-red-800">
                      {card.originalClause}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Revised Clause</h4>
                    <p className="text-sm text-muted-foreground bg-green-50 dark:bg-green-950 p-3 rounded border border-green-200 dark:border-green-800">
                      {card.revisedClause}
                    </p>
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-semibold text-sm mb-2">Textarea Amendment</h4>
                <Textarea
                  value={amendmentText}
                  onChange={(e) => handleAmendmentChange(e.target.value)}
                  placeholder="Enter your amendment here..."
                  rows={4}
                  className="resize-none"
                />
              </div>
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default ComplianceCard;
