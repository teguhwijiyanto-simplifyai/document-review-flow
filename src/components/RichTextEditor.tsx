
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered,
  Indent,
  Table
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange }) => {
  const editorRef = React.useRef<HTMLDivElement>(null);

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertTable = () => {
    const tableHtml = `
      <table border="1" style="width: 100%; border-collapse: collapse; margin: 10px 0;">
        <thead>
          <tr>
            <th style="padding: 8px; background-color: #f5f5f5;">Header 1</th>
            <th style="padding: 8px; background-color: #f5f5f5;">Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 8px;">Cell 1</td>
            <td style="padding: 8px;">Cell 2</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Cell 3</td>
            <td style="padding: 8px;">Cell 4</td>
          </tr>
        </tbody>
      </table>
    `;
    document.execCommand('insertHTML', false, tableHtml);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="border rounded-lg">
      {/* Toolbar */}
      <div className="border-b p-2 flex flex-wrap gap-1 bg-gray-50 dark:bg-gray-900">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => executeCommand('bold')}
          className="p-2"
        >
          <Bold className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => executeCommand('italic')}
          className="p-2"
        >
          <Italic className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => executeCommand('underline')}
          className="p-2"
        >
          <Underline className="h-4 w-4" />
        </Button>
        
        <div className="w-px bg-gray-300 mx-1" />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => executeCommand('insertUnorderedList')}
          className="p-2"
        >
          <List className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => executeCommand('insertOrderedList')}
          className="p-2"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => executeCommand('indent')}
          className="p-2"
        >
          <Indent className="h-4 w-4" />
        </Button>
        
        <div className="w-px bg-gray-300 mx-1" />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={insertTable}
          className="p-2"
        >
          <Table className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor Content */}
      <div
        ref={editorRef}
        contentEditable
        className="p-4 min-h-[400px] max-h-[500px] overflow-y-auto focus:outline-none"
        dangerouslySetInnerHTML={{ __html: content }}
        onInput={handleContentChange}
        style={{
          lineHeight: '1.6',
        }}
      />
    </div>
  );
};

export default RichTextEditor;
