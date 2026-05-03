import React, { useState, useRef } from 'react'
import toast from 'react-hot-toast'
import Navbar from '../components/Common/Navbar'
import Sidebar from '../components/Dashboard/Sidebar'
import PromptInput from '../components/Generator/PromptInput'
import LivePreview from '../components/Generator/LivePreview'
import CodeOutput from '../components/Generator/CodeOutput'
import HistoryPanel from '../components/Dashboard/HistoryPanel'
import LoadingSpinner from '../components/Common/LoadingSpinner'
import { generateUI, getHistory } from '../services/uiService'
import { downloadCode } from '../services/downloadService'
import '../styles/dashboard.css'

const Dashboard = () => {
  const [generatedCode, setGeneratedCode] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [history, setHistory] = useState([])
  const previewRef = useRef(null)

  const handleGenerateUI = async (prompt) => {
    setLoading(true)
    try {
      const response = await generateUI(prompt)
      setGeneratedCode(response.data)
      toast.success('UI generated successfully!')
      fetchHistory()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate UI')
    } finally {
      setLoading(false)
    }
  }

  const fetchHistory = async () => {
    try {
      const response = await getHistory()
      setHistory(response.data)
    } catch (error) {
      console.error('Failed to fetch history:', error)
    }
  }

  const handleSelectFromHistory = (item) => {
    setGeneratedCode({
      html: item.html_code,
      css: item.css_code,
      js: item.js_code
    })
  }

  const handleDownload = async () => {
    if (!generatedCode) {
      toast.error('No code to download')
      return
    }
    try {
      await downloadCode(
        generatedCode.html,
        generatedCode.css,
        generatedCode.js
      )
      toast.success('Code downloaded successfully!')
    } catch (error) {
      toast.error('Failed to download code')
    }
  }

  return (
    <div className="dashboard">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="dashboard-container">
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          history={history}
          onSelectHistoryItem={handleSelectFromHistory}
        />
        <main className="dashboard-main">
          <div className="generator-section">
            <PromptInput 
              onGenerate={handleGenerateUI}
              isLoading={loading}
            />
            {loading && (
              <div className="loading-overlay">
                <LoadingSpinner />
                <p>Generating your UI...</p>
              </div>
            )}
          </div>

          <div className="content-section">
            <LivePreview 
              ref={previewRef}
              html={generatedCode?.html}
              css={generatedCode?.css}
              js={generatedCode?.js}
            />
            <CodeOutput 
              code={generatedCode}
              onDownload={handleDownload}
            />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard