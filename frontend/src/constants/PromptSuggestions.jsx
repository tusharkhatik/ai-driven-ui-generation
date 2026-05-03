import { useState, useEffect } from 'react';
import { PROMPT_SUGGESTIONS } from '../constants';
import '../styles/prompt-suggestions.css';
import { FaLightbulb } from 'react-icons/fa';

export default function PromptSuggestions({ onSelect, disabled }) {
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Shuffle suggestions
    const shuffled = [...PROMPT_SUGGESTIONS]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    setSuggestions(shuffled);
  }, []);

  const handleSelect = (suggestion) => {
    onSelect(suggestion);
    setIsOpen(false);
  };

  return (
    <div className="prompt-suggestions">
      <button
        className="suggestions-toggle"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        title="AI Prompt Suggestions"
      >
        <FaLightbulb /> Suggestions
      </button>

      {isOpen && (
        <div className="suggestions-dropdown">
          <p className="suggestions-title">💡 Suggested Prompts:</p>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="suggestion-item"
              onClick={() => handleSelect(suggestion)}
              disabled={disabled}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}