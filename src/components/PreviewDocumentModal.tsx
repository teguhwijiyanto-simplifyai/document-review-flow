
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, FileDown, Languages } from 'lucide-react';
import { ComplianceCard } from '@/types';
import RichTextEditor from './RichTextEditor';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType } from 'docx';

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

  const parseHtmlContent = (htmlContent: string) => {
    // Remove HTML tags and convert to plain text with basic formatting
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    const paragraphs: Paragraph[] = [];
    
    // Handle tables
    const tables = tempDiv.querySelectorAll('table');
    tables.forEach(table => {
      const rows: TableRow[] = [];
      const tableRows = table.querySelectorAll('tr');
      
      tableRows.forEach(row => {
        const cells: TableCell[] = [];
        const tableCells = row.querySelectorAll('td, th');
        
        tableCells.forEach(cell => {
          cells.push(new TableCell({
            children: [new Paragraph({
              children: [new TextRun(cell.textContent || '')]
            })]
          }));
        });
        
        rows.push(new TableRow({ children: cells }));
      });
      
      if (rows.length > 0) {
        // Add table as paragraph (simplified approach)
        paragraphs.push(new Paragraph({
          children: [new TextRun('TABLE CONTENT:')]
        }));
        
        rows.forEach(row => {
          const cellTexts = row.children.map((cell: any) => 
            cell.children[0]?.children[0]?.text || ''
          ).join(' | ');
          paragraphs.push(new Paragraph({
            children: [new TextRun(cellTexts)]
          }));
        });
      }
    });
    
    // Handle regular text content
    const textNodes = tempDiv.querySelectorAll('p, div, span');
    if (textNodes.length === 0) {
      // If no HTML structure, split by line breaks
      const lines = tempDiv.textContent?.split('\n') || [''];
      lines.forEach(line => {
        if (line.trim()) {
          paragraphs.push(new Paragraph({
            children: [new TextRun(line.trim())]
          }));
        }
      });
    } else {
      textNodes.forEach(node => {
        const text = node.textContent?.trim();
        if (text) {
          const textRuns: TextRun[] = [];
          
          // Check for formatting
          const strongElements = node.querySelectorAll('strong, b');
          const emElements = node.querySelectorAll('em, i');
          const underlineElements = node.querySelectorAll('u');
          
          if (strongElements.length > 0 || emElements.length > 0 || underlineElements.length > 0) {
            textRuns.push(new TextRun({
              text: text,
              bold: strongElements.length > 0,
              italics: emElements.length > 0,
              underline: underlineElements.length > 0 ? {} : undefined
            }));
          } else {
            textRuns.push(new TextRun(text));
          }
          
          paragraphs.push(new Paragraph({
            children: textRuns
          }));
        }
      });
    }
    
    return paragraphs;
  };

  const handleExportToWord = async () => {
    try {
      console.log('Starting Word export with content:', editorContent);
      
      // Parse the HTML content and convert to paragraphs
      const paragraphs = parseHtmlContent(editorContent);
      
      // Create the document
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun({
                text: "CONTRACT DOCUMENT",
                bold: true,
                size: 28
              })],
              alignment: AlignmentType.CENTER
            }),
            new Paragraph({
              children: [new TextRun("")]
            }),
            ...paragraphs
          ]
        }]
      });

      // Generate and download the document
      const buffer = await Packer.toBuffer(doc);
      const blob = new Blob([buffer], { 
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `contract-document-${new Date().toISOString().split('T')[0]}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log('Word document exported successfully');
    } catch (error) {
      console.error('Export to Word failed:', error);
      alert('Failed to export document. Please try again.');
    }
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
