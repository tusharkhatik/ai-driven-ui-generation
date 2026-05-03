import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export const downloadCode = async (html, css, js, fileName = 'ui-code') => {
  const zip = new JSZip()

  zip.file('index.html', html)
  zip.file('styles.css', css)
  zip.file('script.js', js)

  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, `${fileName}.zip`)
}

export const downloadSingleFile = (content, fileName, mimeType = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType })
  saveAs(blob, fileName)
}