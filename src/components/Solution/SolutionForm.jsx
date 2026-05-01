import { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';
import DynamicFieldInput from './DynamicFieldInput';

const SolutionForm = ({ onSubmit, onCancel }) => {
  const [summary, setSummary] = useState('');
  const [fields, setFields] = useState([]);

  const handleAddField = () => {
    setFields([...fields, { name: '', value: '' }]);
  };

  const handleRemoveField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index, key, value) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!summary.trim()) return;
    
    // Filter out empty fields
    const activeFields = fields.filter(f => f.name.trim() && f.value.trim());
    
    onSubmit({ 
      id: Date.now().toString(),
      summary, 
      fields: activeFields,
      createdAt: new Date().toISOString()
    });
    
    setSummary('');
    setFields([]);
  };

  return (
    <Card className="mb-8 border-blue-100 bg-blue-50/10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">New Solution</h3>
        
        <Input
          label="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Briefly explain what you learned or solved"
          required
        />

        <DynamicFieldInput
          fields={fields}
          onAddField={handleAddField}
          onRemoveField={handleRemoveField}
          onFieldChange={handleFieldChange}
        />

        <div className="flex gap-2 justify-end pt-2">
          {onCancel && (
            <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          )}
          <Button type="submit">Add Solution</Button>
        </div>
      </form>
    </Card>
  );
};

export default SolutionForm;
