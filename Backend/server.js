const express = require('express')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const QRCode = require('qrcode')
const app = express()
const upload = multer({ dest: 'uploads/' })
const cors = require('cors')


app.use(cors())
app.use(express.json())

cloudinary.config({
  cloud_name: "dozlef8xq",
  api_key: "782177625786551",
  api_secret: "dcabcM7SopWPqo7lwyx6ygq1fWc"
})

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded')
      }
  
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'auto'
      })
  
      const qr = await QRCode.toDataURL(result.secure_url)
      res.json({ url: result.secure_url, qr })
  
    } catch (err) {
      console.error('Upload error:', err)
      res.status(500).send('Upload failed')
    }
  })
  

app.listen(5000)
console.log('Server started on http://localhost:5000')