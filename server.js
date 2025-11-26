const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// 文件上传配置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

// 保存申请信息到本地文件夹
app.post('/api/save-application', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, phone, position, 'cover-letter': coverLetter } = req.body;
    const resumeFile = req.file;
    
    // 生成唯一申请ID
    const applicationId = uuidv4();
    const applicationDir = path.join(__dirname, 'applications', applicationId);
    
    // 创建申请文件夹
    if (!fs.existsSync(applicationDir)) {
      fs.mkdirSync(applicationDir, { recursive: true });
    }
    
    // 保存申请表单数据
    const applicationData = {
      id: applicationId,
      name,
      email,
      phone,
      position,
      coverLetter: coverLetter || 'No cover letter provided',
      applicationDate: new Date().toISOString(),
      resumeFileName: resumeFile ? resumeFile.originalname : null
    };
    
    const dataFilePath = path.join(applicationDir, 'application.json');
    fs.writeFileSync(dataFilePath, JSON.stringify(applicationData, null, 2), 'utf8');
    
    // 如果有简历文件，保存到申请文件夹
    if (resumeFile) {
      const resumeDestPath = path.join(applicationDir, resumeFile.originalname);
      fs.renameSync(resumeFile.path, resumeDestPath);
    }
    
    console.log(`Application saved successfully: ${applicationId}`);
    console.log(`Application details saved to: ${applicationDir}`);
    
    res.status(200).json({ 
      success: true, 
      message: 'Application saved successfully',
      applicationId: applicationId,
      applicationDir: applicationDir
    });
  } catch (error) {
    console.error('Error saving application:', error);
    
    // 清理上传的文件
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error('Error cleaning up uploaded file:', cleanupError);
      }
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to save application', 
      error: error.message 
    });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Frontend available at http://localhost:${port}`);
  console.log(`API endpoint: http://localhost:${port}/api/send-email`);
});
