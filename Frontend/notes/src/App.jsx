import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [file, setFile] = useState(null)
  const [qr, setQr] = useState(null)
  const [loading, setLoading] = useState('')

  useEffect(() => {
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    document.body.style.overflowX = 'hidden'
    document.body.style.backgroundColor = '#121212'
    document.body.style.color = 'white'
    document.body.style.fontFamily = 'Segoe UI, sans-serif'
  }, [])

  const upload = async () => {
    setLoading('Generating QR...')
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await axios.post('http://localhost:5000/upload', formData)
      setQr(res.data.qr)
    } catch (err) {
      alert('Upload failed.')
    }
    setLoading('')
  }

  const downloadQR = () => {
    setLoading('Downloading QR...')
    const link = document.createElement('a')
    link.href = qr
    link.download = 'qr-code.png'
    link.click()
    setTimeout(() => setLoading(''), 1000)
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setQr(null)  // Reset QR when a new file is selected
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
    }}>
      {/* Fixed Header */}
      <div style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        backgroundColor: '#212121',
        color: 'white',
        padding: '15px 0',
        textAlign: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
        zIndex: '10',
      }}>
        Copy2QR
      </div>

      <div style={{ marginTop: '100px', width: '100%', maxWidth: '600px', textAlign: 'center' }}>
        {/* File Input */}
        <input
          type="file"
          onChange={handleFileChange}
          style={{
            padding: '10px',
            marginBottom: '20px',
            backgroundColor: '#333',
            color: 'white',
            border: '1px solid #444',
            borderRadius: '8px',
            width: '100%',
            fontSize: '16px',
          }}
        />

        {/* Generate QR Button */}
        <button
          onClick={upload}
          disabled={loading === 'Generating QR...'}
          style={{
            padding: '12px 24px',
            backgroundColor: '#00bcd4',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading === 'Generating QR...' ? 'not-allowed' : 'pointer',
            fontSize: '18px',
            marginBottom: '20px',
            width: '100%',
            transition: '0.3s ease',
          }}
        >
          {loading === 'Generating QR...' ? (
            <div className="loader" style={{
              borderTop: '4px solid transparent',
              borderRadius: '50%',
              border: '4px solid #00bcd4',
              width: '24px',
              height: '24px',
              animation: 'spin 1s linear infinite',
              margin: 'auto',
            }}></div>
          ) : (
            'Generate QR'
          )}
        </button>

        {loading && <p style={{ color: '#00bcd4', marginBottom: '20px' }}>{loading}</p>}

        {/* Display QR Code */}
        {qr && (
          <div style={{ textAlign: 'center' }}>
            <img src={qr} alt="QR Code" style={{ maxWidth: '300px', marginBottom: '20px' }} />
            <br />
            {/* Download QR Button */}
            <button
              onClick={downloadQR}
              disabled={loading === 'Downloading QR...'}
              style={{
                padding: '12px 24px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: loading === 'Downloading QR...' ? 'not-allowed' : 'pointer',
                fontSize: '18px',
                width: '100%',
                transition: '0.3s ease',
              }}
            >
              {loading === 'Downloading QR...' ? (
                <div className="loader" style={{
                  borderTop: '4px solid transparent',
                  borderRadius: '50%',
                  border: '4px solid #4caf50',
                  width: '24px',
                  height: '24px',
                  animation: 'spin 1s linear infinite',
                  margin: 'auto',
                }}></div>
              ) : (
                'Download QR'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
