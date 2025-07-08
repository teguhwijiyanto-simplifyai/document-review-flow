
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface StreamingResponseProps {
  onComplete: () => void;
}

const StreamingResponse: React.FC<StreamingResponseProps> = ({ onComplete }) => {
  const [streamedText, setStreamedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const mockStreamingText = `
Analyzing contract structure and clauses...

✓ Document format validated
✓ Language processing complete
✓ Legal framework assessment in progress
✓ Compliance checking against regulatory standards
✓ Risk assessment analysis
✓ Clause-by-clause review
✓ Generating recommendations

Analysis complete! Generating detailed report...
    `.trim();

    const words = mockStreamingText.split(' ');
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        setStreamedText(prev => prev + (currentIndex > 0 ? ' ' : '') + words[currentIndex]);
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 1500);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            {!isComplete && <Loader2 className="h-5 w-5 animate-spin" />}
            <span>AI Document Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg min-h-[200px]">
            <pre className="whitespace-pre-wrap text-sm font-mono">
              {streamedText}
              {!isComplete && <span className="animate-pulse">|</span>}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StreamingResponse;
