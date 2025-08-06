export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Basit placeholder response
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `image-${uniqueSuffix}.jpg`;
    
    console.log('File upload simulation');
    return res.status(200).json({ 
      imageUrl: `/uploads/${filename}`,
      message: 'Upload simulated successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ 
      message: 'Upload hatası',
      error: error.message 
    });
  }
} 