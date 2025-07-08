
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Save, X, ArrowRight } from 'lucide-react';
import { ComplianceCard as ComplianceCardType } from '@/types';
import PreviewDocumentModal from './PreviewDocumentModal';

interface EditDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amendmentCards: ComplianceCardType[];
  amendmentTexts: Record<string, string>;
  onAmendmentChange: (id: string, text: string) => void;
  documentText?: string;
}

const mockOriginalText = `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into on [DATE] between [COMPANY NAME], a [STATE] corporation ("Company"), and [EMPLOYEE NAME] ("Employee").

1. POSITION AND DUTIES
Employee agrees to serve as [POSITION TITLE] and to perform such duties as may be assigned by the Company. Employee shall devote full time and attention to the business of the Company.

2. COMPENSATION
Company shall pay Employee a base salary of $[AMOUNT] per year, payable in accordance with Company's standard payroll practices.

3. BENEFITS
Employee shall be eligible to participate in all employee benefit plans maintained by Company for its employees.

4. TERMINATION
This Agreement may be terminated by either party with thirty (30) days written notice.

5. CONFIDENTIALITY
Employee acknowledges that during employment, Employee may have access to confidential information of the Company.

6. NON-COMPETE
Employee agrees that for a period of one (1) year following termination of employment, Employee will not engage in any business that competes with the Company.

7. GOVERNING LAW
This Agreement shall be governed by the laws of the State of [STATE].`;

const EditDocumentModal: React.FC<EditDocumentModalProps> = ({
  isOpen,
  onClose,
  amendmentCards,
  amendmentTexts,
  onAmendmentChange,
  documentText
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [highlightedSentence, setHighlightedSentence] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [currentDocumentText, setCurrentDocumentText] = useState(documentText || mockOriginalText);
  const [appliedAmendments, setAppliedAmendments] = useState<Record<string, boolean>>({});
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  // Parse document text while preserving line breaks and structure
  const formatDocumentText = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      // Check if this line contains text that matches any original clause
      const matchingCard = amendmentCards.find(card => 
        card.originalClause && (
          line.toLowerCase().includes(card.originalClause.toLowerCase().slice(0, 30)) ||
          card.originalClause.toLowerCase().includes(line.toLowerCase().slice(0, 30))
        )
      );
      
      const isHighlighted = highlightedSentence && line.includes(highlightedSentence);
      const isAmended = matchingCard && appliedAmendments[matchingCard.id];
      
      return (
        <div
          key={index}
          className={`cursor-pointer transition-colors leading-relaxed ${
            matchingCard 
              ? isAmended
                ? 'bg-green-200 dark:bg-green-900 px-1 rounded hover:bg-green-300 dark:hover:bg-green-800'
                : 'bg-purple-200 dark:bg-purple-900 px-1 rounded hover:bg-purple-300 dark:hover:bg-purple-800'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          } ${
            isHighlighted 
              ? 'bg-yellow-300 dark:bg-yellow-700 font-semibold'
              : ''
          }`}
          onClick={() => handleLineClick(line, matchingCard)}
        >
          {line}
        </div>
      );
    });
  };

  const handleLineClick = (line: string, matchingCard?: ComplianceCardType) => {
    setHighlightedSentence(line);
    
    if (matchingCard) {
      setSelectedCardId(matchingCard.id);
      
      // Scroll to matching card in right panel
      const cardElement = document.getElementById(`card-${matchingCard.id}`);
      if (cardElement && rightPanelRef.current) {
        cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const findMatchingSentence = (originalClause: string) => {
    if (!originalClause) return null;
    const lines = currentDocumentText.split('\n');
    return lines.find(line => 
      line.toLowerCase().includes(originalClause.toLowerCase().slice(0, 30)) ||
      originalClause.toLowerCase().includes(line.toLowerCase().slice(0, 30))
    );
  };

  const handleCardClick = (cardId: string) => {
    setSelectedCardId(cardId);
    const card = amendmentCards.find(c => c.id === cardId);
    
    if (card?.originalClause) {
      const matchingSentence = findMatchingSentence(card.originalClause);
      if (matchingSentence) {
        setHighlightedSentence(matchingSentence);
      }
    }
  };

  const handleApplyFix = (cardId: string) => {
    const card = amendmentCards.find(c => c.id === cardId);
    const amendmentText = amendmentTexts[cardId] || card?.revisedClause;
    
    if (card?.originalClause && amendmentText) {
      // Find the line that contains the original clause
      const lines = currentDocumentText.split('\n');
      let updatedLines = [...lines];
      
      // Find and replace the matching line
      const matchingLineIndex = lines.findIndex(line => 
        line.toLowerCase().includes(card.originalClause!.toLowerCase().slice(0, 30)) ||
        card.originalClause!.toLowerCase().includes(line.toLowerCase().slice(0, 30))
      );
      
      if (matchingLineIndex !== -1) {
        updatedLines[matchingLineIndex] = amendmentText;
        const updatedText = updatedLines.join('\n');
        setCurrentDocumentText(updatedText);
        
        // Mark this amendment as applied
        setAppliedAmendments(prev => ({
          ...prev,
          [cardId]: true
        }));
        
        // Update highlighted sentence to the new text
        setHighlightedSentence(amendmentText);
        
        console.log(`Applied amendment for card ${cardId}: ${amendmentText}`);
      }
    }
  };

  const handleSaveChanges = () => {
    setShowPreviewModal(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Document</DialogTitle>
          </DialogHeader>
          
          <div className="flex gap-6 h-full min-h-0">
            {/* Left Panel - Original Document */}
            <div className="flex-1 flex flex-col min-h-0">
              <h3 className="font-semibold mb-4">Original Contract</h3>
              <ScrollArea className="flex-1 border rounded-lg" ref={leftPanelRef}>
                <div className="p-4 space-y-1 font-mono text-sm whitespace-pre-wrap">
                  {formatDocumentText(currentDocumentText)}
                </div>
                
                {highlightedSentence && selectedCardId && (
                  <div className="flex justify-center p-4">
                    <ArrowRight className="h-8 w-8 text-red-500 animate-pulse" />
                  </div>
                )}
              </ScrollArea>
            </div>

            {/* Right Panel - Amendment Cards */}
            <div className="flex-1 flex flex-col min-h-0">
              <h3 className="font-semibold mb-4">Amendments</h3>
              <ScrollArea className="flex-1 border rounded-lg" ref={rightPanelRef}>
                <div className="p-4 space-y-4">
                  {amendmentCards.map(card => (
                    <div
                      key={card.id}
                      id={`card-${card.id}`}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedCardId === card.id 
                          ? 'border-red-500 bg-red-50 dark:bg-red-950 shadow-lg'
                          : appliedAmendments[card.id]
                          ? 'border-green-500 bg-green-50 dark:bg-green-950'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleCardClick(card.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${
                            appliedAmendments[card.id] 
                              ? 'bg-green-500 text-white' 
                              : ''
                          }`}>
                            {appliedAmendments[card.id] ? 'Applied' : card.complianceAssessment}
                          </Badge>
                          {card.itemNo && (
                            <span className="text-xs text-muted-foreground">
                              Item {card.itemNo}
                            </span>
                          )}
                        </div>
                        {selectedCardId === card.id && (
                          <ArrowRight className="h-5 w-5 text-red-500 rotate-180" />
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-sm mb-1">Contractual Reference</h4>
                          <p className="text-xs text-muted-foreground bg-gray-50 dark:bg-gray-900 p-2 rounded">
                            {card.contractualReference}
                          </p>
                        </div>
                        
                        {card.originalClause && (
                          <div>
                            <h4 className="font-medium text-sm mb-1">Original Clause</h4>
                            <p className="text-xs text-muted-foreground bg-gray-50 dark:bg-gray-900 p-2 rounded">
                              {card.originalClause}
                            </p>
                          </div>
                        )}
                        
                        <div>
                          <h4 className="font-medium text-sm mb-1">Amendment</h4>
                          <Textarea
                            value={amendmentTexts[card.id] || card.revisedClause || ''}
                            onChange={(e) => onAmendmentChange(card.id, e.target.value)}
                            placeholder="Enter amendment text..."
                            rows={3}
                            className="text-xs resize-none mb-2"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleApplyFix(card.id)}
                            disabled={!amendmentTexts[card.id] && !card.revisedClause}
                            className={`w-full ${
                              appliedAmendments[card.id] 
                                ? 'bg-green-600 hover:bg-green-700' 
                                : ''
                            }`}
                          >
                            {appliedAmendments[card.id] ? 'Re-apply This Fix' : 'Apply This Fix'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>
            <Button onClick={handleSaveChanges}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <PreviewDocumentModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        amendmentCards={amendmentCards}
        amendmentTexts={amendmentTexts}
        documentText={currentDocumentText}
      />
    </>
  );
};

export default EditDocumentModal;
