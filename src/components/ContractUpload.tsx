
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { ContractUpload as ContractUploadType } from '@/types';

interface ContractUploadProps {
  onUpload: (data: ContractUploadType) => void;
  isLoading: boolean;
}

const ContractUpload: React.FC<ContractUploadProps> = ({ onUpload, isLoading }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [language, setLanguage] = useState<'English' | 'Indonesian'>('English');
  const [partyPositioning, setPartyPositioning] = useState<'Company' | 'Employee'>('Company');
  const [riskPositioning, setRiskPositioning] = useState<'Low' | 'Medium' | 'High'>('Medium');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    multiple: false
  });

  const handleSubmit = () => {
    if (uploadedFile) {
      onUpload({
        file: uploadedFile,
        language,
        partyPositioning,
        riskPositioning
      });
    }
  };

  const canSubmit = uploadedFile && !isLoading;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Contract Review</h1>
        <p className="text-muted-foreground">Upload your contract for AI-powered legal analysis</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Contract Document</CardTitle>
          <CardDescription>
            Supported formats: PDF, DOC, DOCX, TXT
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-primary bg-primary/5'
                : uploadedFile
                ? 'border-green-500 bg-green-50 dark:bg-green-950'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center space-y-2">
              {uploadedFile ? (
                <>
                  <FileText className="h-12 w-12 text-green-500" />
                  <p className="font-medium text-green-700 dark:text-green-400">
                    {uploadedFile.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Click or drag to replace
                  </p>
                </>
              ) : (
                <>
                  <Upload className="h-12 w-12 text-gray-400" />
                  <p className="font-medium">
                    {isDragActive ? 'Drop your contract here' : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PDF, DOC, DOCX, or TXT files
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Form Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Language</label>
              <Select value={language} onValueChange={(value: 'English' | 'Indonesian') => setLanguage(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Indonesian">Indonesian</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Party Positioning</label>
              <Select value={partyPositioning} onValueChange={(value: 'Company' | 'Employee') => setPartyPositioning(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Company">Company</SelectItem>
                  <SelectItem value="Employee">Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Risk Positioning</label>
              <Select value={riskPositioning} onValueChange={(value: 'Low' | 'Medium' | 'High') => setRiskPositioning(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleSubmit} 
            disabled={!canSubmit}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Simplify's AI reviewing your document...
              </>
            ) : (
              'Conduct Review'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractUpload;
