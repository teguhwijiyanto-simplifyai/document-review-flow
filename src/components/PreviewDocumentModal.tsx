
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, FileDown, Languages } from 'lucide-react';
import { ComplianceCard } from '@/types';
import RichTextEditor from './RichTextEditor';

interface PreviewDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amendmentCards: ComplianceCard[];
  amendmentTexts: Record<string, string>;
  documentText?: string;
}

const PreviewDocumentModal: React.FC<PreviewDocumentModalProps> = ({
  isOpen,
  onClose,
  amendmentCards,
  amendmentTexts,
  documentText
}) => {
  const [editorContent, setEditorContent] = useState(documentText || '');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslateToEnglish = async () => {
    setIsTranslating(true);
    try {
      // Mock translation - in real implementation, call translation API
      await new Promise(resolve => setTimeout(resolve, 1000));
      // setEditorContent(translatedContent);
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleTranslateToIndonesian = async () => {
    setIsTranslating(true);
    try {
      // Mock translation - in real implementation, call translation API
      await new Promise(resolve => setTimeout(resolve, 1000));
      // setEditorContent(translatedContent);
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleTranslateToBilingual = async () => {
    setIsTranslating(true);
    try {
      // Mock translation - in real implementation, call translation API
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Create bilingual table format
      const bilingualContent = `
        <table>
          <tr>
            <th>English</th>
            <th>Indonesian</th>
          </tr>
          <tr>
            <td>${editorContent}</td>
            <td>Indonesian translation would go here</td>
          </tr>
        </table>
      `;
      setEditorContent(bilingualContent);
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleExportToWord = () => {
    // Mock export functionality
    console.log('Exporting to Word:', editorContent);
    alert('Export to Word functionality would be implemented here');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl">Preview New Document</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-2 mb-4 flex-wrap">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleTranslateToEnglish}
              disabled={isTranslating}
            >
              <Languages className="mr-2 h-4 w-4" />
              Translate to English
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleTranslateToIndonesian}
              disabled={isTranslating}
            >
              <Languages className="mr-2 h-4 w-4" />
              Translate to Indonesian
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleTranslateToBilingual}
              disabled={isTranslating}
            >
              <Languages className="mr-2 h-4 w-4" />
              Translate to Bilingual
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportToWord}
            >
              <FileDown className="mr-2 h-4 w-4" />
              Export to Word
            </Button>
          </div>
          
          <div className="h-[500px] border rounded-lg">
            <RichTextEditor
              content={editorContent}
              onChange={setEditorContent}
              placeholder="Document preview will appear here..."
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDocumentModal;
