
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
}

const mockOriginalText = `
EMPLOYMENT AGREEMENT

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
This Agreement shall be governed by the laws of the State of [STATE].
`;

const EditDocumentModal: React.FC<EditDocumentModalProps> = ({
  isOpen,
  onClose,
  amendmentCards,
  amendmentTexts,
  onAmendmentChange
}) => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [highlightedSentence, setHighlightedSentence] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [documentText, setDocumentText] = useState(mockOriginalText);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const sentences = documentText.split(/(?<=[.!?])\s+/).filter(s => s.trim());

  const findMatchingSentence = (originalClause: string) => {
    if (!originalClause) return null;
    return sentences.find(sentence => 
      sentence.toLowerCase().includes(originalClause.toLowerCase().slice(0, 20)) ||
      originalClause.toLowerCase().includes(sentence.toLowerCase().slice(0, 15))
    );
  };

  const handleSentenceClick = (sentence: string, index: number) => {
    setHighlightedSentence(sentence);
    
    // Find matching card based on sentence content
    const matchingCard = amendmentCards.find(card => 
      card.originalClause && (
        sentence.toLowerCase().includes(card.originalClause.toLowerCase().slice(0, 20)) ||
        card.originalClause.toLowerCase().includes(sentence.toLowerCase().slice(0, 15))
      )
    );
    
    if (matchingCard) {
      setSelectedCardId(matchingCard.id);
      
      // Scroll to matching card in right panel
      const cardElement = document.getElementById(`card-${matchingCard.id}`);
      if (cardElement && rightPanelRef.current) {
        cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
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
    const amendmentText = amendmentTexts[cardId];
    
    if (card?.originalClause && amendmentText) {
      const matchingSentence = findMatchingSentence(card.originalClause);
      if (matchingSentence) {
        // Replace the original sentence with the amendment text
        const updatedText = documentText.replace(matchingSentence, amendmentText);
        setDocumentText(updatedText);
        
        // Clear selection
        setSelectedCardId(null);
        setHighlightedSentence(null);
      }
    }
  };

  const handleSaveChanges = () => {
    setShowPreviewModal(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Document</DialogTitle>
          </DialogHeader>
          
          <div className="flex gap-6 h-full">
            {/* Left Panel - Original Document */}
            <div className="flex-1">
              <h3 className="font-semibold mb-4">Original Contract</h3>
              <ScrollArea className="h-[500px] border rounded-lg p-4" ref={leftPanelRef}>
                <div className="space-y-2">
                  {sentences.map((sentence, index) => {
                    const isHighlighted = sentence === highlightedSentence;
                    const hasAmendment = amendmentCards.some(card => 
                      card.originalClause && (
                        sentence.toLowerCase().includes(card.originalClause.toLowerCase().slice(0, 20)) ||
                        card.originalClause.toLowerCase().includes(sentence.toLowerCase().slice(0, 15))
                      )
                    );
                    
                    return (
                      <span
                        key={index}
                        className={`cursor-pointer transition-colors ${
                          hasAmendment 
                            ? 'bg-purple-200 dark:bg-purple-900 px-1 rounded'
                            : ''
                        } ${
                          isHighlighted 
                            ? 'bg-yellow-300 dark:bg-yellow-700 font-semibold'
                            : ''
                        }`}
                        onClick={() => handleSentenceClick(sentence, index)}
                      >
                        {sentence}{' '}
                      </span>
                    );
                  })}
                </div>
                
                {highlightedSentence && selectedCardId && (
                  <div className="flex justify-center mt-4">
                    <ArrowRight className="h-8 w-8 text-red-500 animate-pulse" />
                  </div>
                )}
              </ScrollArea>
            </div>

            {/* Right Panel - Amendment Cards */}
            <div className="flex-1">
              <h3 className="font-semibold mb-4">Amendments</h3>
              <ScrollArea className="h-[500px] border rounded-lg p-4" ref={rightPanelRef}>
                <div className="space-y-4">
                  {amendmentCards.map(card => (
                    <div
                      key={card.id}
                      id={`card-${card.id}`}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedCardId === card.id 
                          ? 'border-red-500 bg-red-50 dark:bg-red-950 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleCardClick(card.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge className="text-xs">
                            {card.complianceAssessment}
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
                            className="w-full"
                          >
                            Apply This Fix
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
        documentText={documentText}
      />
    </>
  );
};

export default EditDocumentModal;
