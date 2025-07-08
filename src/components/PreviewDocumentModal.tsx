
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Languages, Download, FileText } from 'lucide-react';
import { ComplianceCard as ComplianceCardType } from '@/types';
import RichTextEditor from './RichTextEditor';

interface PreviewDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amendmentCards: ComplianceCardType[];
  amendmentTexts: Record<string, string>;
}

const PreviewDocumentModal: React.FC<PreviewDocumentModalProps> = ({
  isOpen,
  onClose,
  amendmentCards,
  amendmentTexts
}) => {
  const [editorContent, setEditorContent] = useState(`
    <h1>REVISED EMPLOYMENT AGREEMENT</h1>
    
    <p>This Employment Agreement ("Agreement") is entered into on [DATE] between [COMPANY NAME], a [STATE] corporation ("Company"), and [EMPLOYEE NAME] ("Employee").</p>
    
    <h2>1. POSITION AND DUTIES</h2>
    <p>Employee agrees to serve as [POSITION TITLE] and to perform such duties as may be assigned by the Company. <strong>Employee shall devote reasonable time and attention to the business of the Company, while maintaining work-life balance.</strong></p>
    
    <h2>2. COMPENSATION</h2>
    <p>Company shall pay Employee a base salary of $[AMOUNT] per year, payable in accordance with Company's standard payroll practices. <em>Annual performance reviews may result in salary adjustments.</em></p>
    
    <h2>3. BENEFITS</h2>
    <p>Employee shall be eligible to participate in all employee benefit plans maintained by Company for its employees, including but not limited to:</p>
    <ul>
      <li>Health insurance</li>
      <li>Retirement plans</li>
      <li>Paid time off</li>
      <li>Professional development opportunities</li>
    </ul>
    
    <h2>4. TERMINATION</h2>
    <p><strong>This Agreement may be terminated by either party with sixty (60) days written notice, providing adequate transition time.</strong></p>
    
    <h2>5. CONFIDENTIALITY</h2>
    <p>Employee acknowledges that during employment, Employee may have access to confidential information of the Company. <strong>This obligation continues for two (2) years post-employment.</strong></p>
    
    <h2>6. NON-COMPETE</h2>
    <p><strong>Employee agrees that for a period of six (6) months following termination of employment, Employee will not engage in direct competition with the Company's core business activities within the same geographic region.</strong></p>
    
    <h2>7. GOVERNING LAW</h2>
    <p>This Agreement shall be governed by the laws of the State of [STATE].</p>
  `);

  const [bilingualContent, setBilingualContent] = useState(`
    <table border="1" style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="width: 50%; padding: 10px; background-color: #f5f5f5;">English</th>
          <th style="width: 50%; padding: 10px; background-color: #f5f5f5;">Indonesian</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 10px; vertical-align: top;">
            <h2>REVISED EMPLOYMENT AGREEMENT</h2>
          </td>
          <td style="padding: 10px; vertical-align: top;">
            <h2>PERJANJIAN KERJA YANG DIREVISI</h2>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; vertical-align: top;">
            This Employment Agreement ("Agreement") is entered into between the Company and Employee.
          </td>
          <td style="padding: 10px; vertical-align: top;">
            Perjanjian Kerja ini ("Perjanjian") dibuat antara Perusahaan dan Karyawan.
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; vertical-align: top;">
            <strong>1. POSITION AND DUTIES</strong><br/>
            Employee agrees to serve in the designated position with reasonable work-life balance.
          </td>
          <td style="padding: 10px; vertical-align: top;">
            <strong>1. POSISI DAN TUGAS</strong><br/>
            Karyawan setuju untuk melayani dalam posisi yang ditentukan dengan keseimbangan kerja-hidup yang wajar.
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; vertical-align: top;">
            <strong>2. TERMINATION</strong><br/>
            This Agreement may be terminated by either party with sixty (60) days written notice.
          </td>
          <td style="padding: 10px; vertical-align: top;">
            <strong>2. PEMUTUSAN</strong><br/>
            Perjanjian ini dapat diakhiri oleh salah satu pihak dengan pemberitahuan tertulis enam puluh (60) hari.
          </td>
        </tr>
      </tbody>
    </table>
  `);

  const [currentView, setCurrentView] = useState<'monolingual' | 'bilingual'>('monolingual');

  const handleTranslateToEnglish = async () => {
    // Mock API call - replace with actual translation service
    console.log('Translating to English...');
    setCurrentView('monolingual');
  };

  const handleTranslateToIndonesian = async () => {
    // Mock API call - replace with actual translation service
    console.log('Translating to Indonesian...');
    const indonesianContent = editorContent
      .replace('REVISED EMPLOYMENT AGREEMENT', 'PERJANJIAN KERJA YANG DIREVISI')
      .replace('POSITION AND DUTIES', 'POSISI DAN TUGAS')
      .replace('COMPENSATION', 'KOMPENSASI')
      .replace('BENEFITS', 'MANFAAT')
      .replace('TERMINATION', 'PEMUTUSAN')
      .replace('CONFIDENTIALITY', 'KERAHASIAAN')
      .replace('NON-COMPETE', 'NON-KOMPETISI')
      .replace('GOVERNING LAW', 'HUKUM YANG BERLAKU');
    
    setEditorContent(indonesianContent);
    setCurrentView('monolingual');
  };

  const handleTranslateToBilingual = async () => {
    // Mock API call - replace with actual translation service
    console.log('Creating bilingual version...');
    setCurrentView('bilingual');
  };

  const handleExportToWord = async () => {
    // Mock export functionality - replace with actual Word export
    console.log('Exporting to Word document...');
    
    // Create a simple download simulation
    const element = document.createElement('a');
    const content = currentView === 'bilingual' ? bilingualContent : editorContent;
    const file = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    element.href = URL.createObjectURL(file);
    element.download = 'revised-contract.docx';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl">Preview New Document</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="flex flex-wrap gap-2 mb-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleTranslateToEnglish}
            >
              <Languages className="mr-2 h-4 w-4" />
              Translate to English
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleTranslateToIndonesian}
            >
              <Languages className="mr-2 h-4 w-4" />
              Translate to Indonesian
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleTranslateToBilingual}
            >
              <Languages className="mr-2 h-4 w-4" />
              Translate to Bilingual
            </Button>
            
            <Button 
              variant="default" 
              size="sm"
              onClick={handleExportToWord}
            >
              <Download className="mr-2 h-4 w-4" />
              Export to Word
            </Button>
          </div>

          {/* Editor */}
          <div className="flex-1 border rounded-lg">
            <RichTextEditor
              content={currentView === 'bilingual' ? bilingualContent : editorContent}
              onChange={currentView === 'bilingual' ? setBilingualContent : setEditorContent}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
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
