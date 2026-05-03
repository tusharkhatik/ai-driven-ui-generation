import React, { useState } from 'react'
import { FiSend, FiRefreshCw } from 'react-icons/fi'
import '../../styles/prompt-input.css'

const PromptInput = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (prompt.trim()) {
      onGenerate(prompt)
      setPrompt('')
    }
  }

  const suggestedPrompts = [
    "Create a modern login page with dark theme",
    "Build a responsive dashboard with charts",
    "Design a beautiful portfolio website",
    "Create an e-commerce product page"
  ]

  return (
    <div className="prompt-input-container">
      <h2>Describe Your UI</h2>
      <p className="subtitle">Tell us what you want to create, and we'll generate it for you</p>

      <form onSubmit={handleSubmit} className="prompt-form">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g., Create a modern login page with a dark theme, email and password fields, and a submit button..."
          className="prompt-textarea"
          disabled={isLoading}
          rows={4}
        />
        <button 
          type="submit" 
          className="generate-button"
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? (
            <>
              <FiRefreshCw className="spinning" size={20} />
              Generating...
            </>
          ) : (
            <>
              <FiSend size={20} />
              Generate UI
            </>
          )}
        </button>
      </form>

      <div className="suggested-prompts">
        <p className="label">💡 Suggested Prompts:</p>
        <div className="prompts-grid">
          {suggestedPrompts.map((sug, index) => (
            <button
              key={index}
              className="suggested-button"
              onClick={() => {
                setPrompt(sug)
              }}
              type="button"
            >
              {sug}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PromptInput