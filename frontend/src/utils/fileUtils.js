import JSZip from 'jszip';

export const downloadFile = (content, filename, type = 'text/html') => {
  try {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Download error:', error);
    return false;
  }
};

export const downloadZip = async (html, css, js, fileName = 'generated-ui') => {
  try {
    const zip = new JSZip();
    
    // Add HTML file
    zip.file('index.html', generateHTMLFile(html, css, js));
    
    // Add CSS file
    zip.file('styles.css', css || '/* CSS styles */');
    
    // Add JS file
    zip.file('script.js', js || '// JavaScript code');
    
    // Generate and download zip
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Zip download error:', error);
    return false;
  }
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Copy error:', error);
    return false;
  }
};

export const generateHTMLFile = (html, css, js, title = 'Generated UI') => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    ${css || ''}
  </style>
</head>
<body>
  ${html || ''}
  <script>
    ${js || ''}
  </script>
</body>
</html>`;
};

export const generateIframeHTML = (html, css, js) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      ${css || ''}
    </style>
  </head>
  <body>
    ${html || ''}
    <script>
      ${js || ''}
    </script>
  </body>
</html>`;
};