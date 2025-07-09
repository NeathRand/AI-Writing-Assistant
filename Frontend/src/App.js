import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [tone, setTone] = useState('neutral');
  const [isLoading, setIsLoading] = useState(false);

  const handleRestructure = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    setResult('');
    try {
      const response = await fetch('http://localhost:5001/api/restructure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setResult(data.restructured_text || 'No restructured text returned.');
    } catch (error) {
      console.error('Error restructuring text:', error);
      setResult(`Error: ${error.message}`);
    }
    setIsLoading(false);
  };

  const handleAdjustTone = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    setResult('');
    try {
      const response = await fetch('http://localhost:5001/api/adjust_tone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, tone }),
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setResult(data.adjusted_text || 'No adjusted text returned.');
    } catch (error) {
      console.error('Error adjusting tone:', error);
      setResult(`Error: ${error.message}`);
    }
    setIsLoading(false);
  };

  const handlePlagiarismCheck = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    setResult('');
    try {
      const response = await fetch('http://localhost:5001/api/check_plagiarism', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if (data.sources && data.sources.length > 0) {
        let plagiarismResult = `Potential Plagiarism Sources (Mocked):\n`;
        data.sources.forEach(source => {
          plagiarismResult += `- ${source.url} (Similarity: ${source.similarity})\n`;
        });
        setResult(plagiarismResult);
      } else {
        setResult(data.message || 'No plagiarism information returned.');
      }
    } catch (error) {
      console.error('Error checking plagiarism:', error);
      setResult(`Error: ${error.message}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Writing Assistant</h1>
      </header>
      <main>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          rows="10"
          cols="80"
        />
        <div className="controls">
          <button onClick={handleRestructure} disabled={isLoading || !text.trim()}>
            {isLoading ? 'Processing...' : 'Restructure Sentence'}
          </button>
          <select value={tone} onChange={(e) => setTone(e.target.value)} disabled={isLoading}>
            <option value="neutral">Neutral</option>
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
            <option value="confident">Confident</option>
            <option value="friendly">Friendly</option>
          </select>
          <button onClick={handleAdjustTone} disabled={isLoading || !text.trim()}>
            {isLoading ? 'Processing...' : 'Adjust Tone'}
          </button>
          <button onClick={handlePlagiarismCheck} disabled={isLoading || !text.trim()}>
            {isLoading ? 'Processing...' : 'Check Plagiarism (Mock)'}
          </button>
        </div>
        {result && (
          <div className="result-box">
            <h2>Result:</h2>
            <pre>{result}</pre>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
