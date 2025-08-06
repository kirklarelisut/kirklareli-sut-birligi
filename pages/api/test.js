module.exports = (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    const testData = {
      status: 'success',
      message: 'API çalışıyor! CommonJS format',
      timestamp: new Date().toISOString(),
      method: req.method
    };
    
    res.status(200).json(testData);
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
}; 