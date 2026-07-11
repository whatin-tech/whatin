const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(__dirname));

// Initialize uploads directories
const uploadsDir = path.join(__dirname, 'uploads');
const tmpDir = path.join(uploadsDir, 'tmp');
if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
}

// Serve uploads folder static assets
app.use('/uploads', express.static(uploadsDir));

// Multer configured to write to the temp directory
const upload = multer({
    dest: tmpDir,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// JSON file to store global database submissions
const DB_FILE = path.join(__dirname, 'submissions.json');

function saveSubmission(data) {
    let submissions = [];
    if (fs.existsSync(DB_FILE)) {
        try {
            submissions = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
        } catch (e) {
            submissions = [];
        }
    }
    submissions.push(data);
    fs.writeFileSync(DB_FILE, JSON.stringify(submissions, null, 4));
}

// Common processor for all certificate submissions
function processSubmission(type, req) {
    const timestamp = Date.now();
    const fullName = (req.body.fullName || req.body.name || 'unknown').trim();
    const timeSlot = (req.body.timeSlot || req.body.slot || 'none').trim();

    // Sanitize parameters for folder creation to prevent directory traversal
    const sanitizedName = fullName.replace(/[^a-zA-Z0-9-_]/g, '_');
    const sanitizedSlot = timeSlot.replace(/[^a-zA-Z0-9-_]/g, '_');
    const folderName = `${sanitizedName}_${sanitizedSlot}_${timestamp}`;
    const userFolder = path.join(uploadsDir, folderName);

    if (!fs.existsSync(userFolder)) {
        fs.mkdirSync(userFolder, { recursive: true });
    }

    const filesInfo = {};
    if (req.files && Array.isArray(req.files)) {
        for (const file of req.files) {
            const ext = path.extname(file.originalname);
            const filename = `${file.fieldname}${ext}`;
            const targetPath = path.join(userFolder, filename);
            fs.renameSync(file.path, targetPath);
            // Save accessible relative path
            filesInfo[file.fieldname] = `/uploads/${folderName}/${filename}`;
        }
    }

    // Build unified JSON response for this user
    const submissionData = {
        id: timestamp,
        submittedAt: new Date().toISOString(),
        type: type,
        fullName: fullName,
        name: fullName,       // Included duplicate keys mapping as requested
        timeSlot: timeSlot,
        slot: timeSlot,       // Included duplicate keys mapping as requested
        ...req.body,
        files: filesInfo,
        folderName: folderName,
        folderPath: `/uploads/${folderName}`
    };

    // Save data.json inside the user folder
    fs.writeFileSync(
        path.join(userFolder, 'data.json'),
        JSON.stringify(submissionData, null, 4)
    );

    // Save to the global entries backup
    saveSubmission(submissionData);

    return submissionData;
}

// 1. Submit Domicile Application
app.post('/api/submit-domicile', upload.any(), (req, res) => {
    try {
        const submission = processSubmission('Domicile', req);
        res.json({ success: true, message: 'Domicile application received successfully!', data: submission });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error processing application.' });
    }
});

// 2. Submit Caste Application
app.post('/api/submit-caste', upload.any(), (req, res) => {
    try {
        const submission = processSubmission('Caste', req);
        res.json({ success: true, message: 'Caste application received successfully!', data: submission });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error processing caste application.' });
    }
});

// 3. Submit Income Application
app.post('/api/submit-income', upload.any(), (req, res) => {
    try {
        const submission = processSubmission('Income', req);
        res.json({ success: true, message: 'Income application received successfully!', data: submission });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error processing income application.' });
    }
});

// 4. Submit Unified Assistance Application
app.post('/api/submit-assistance', upload.any(), (req, res) => {
    try {
        let certType = req.body.certificateType || 'Assistance';
        certType = certType.charAt(0).toUpperCase() + certType.slice(1);
        const submission = processSubmission(`${certType} (Assistance)`, req);
        res.json({ success: true, message: 'Assistance portal application received successfully!', data: submission });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error processing assistance application.' });
    }
});

// Admin Route serving HTML dashboard UI
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Endpoint retrieving all submissions dynamically scanned from relative folders
app.get('/api/admin/submissions', (req, res) => {
    try {
        if (!fs.existsSync(uploadsDir)) {
            return res.json([]);
        }

        const dirs = fs.readdirSync(uploadsDir);
        const submissions = [];

        for (const dirName of dirs) {
            if (dirName === 'tmp' || dirName === 'general') continue;
            const dirPath = path.join(uploadsDir, dirName);
            const stat = fs.statSync(dirPath);
            if (stat.isDirectory()) {
                const jsonPath = path.join(dirPath, 'data.json');
                if (fs.existsSync(jsonPath)) {
                    try {
                        const content = fs.readFileSync(jsonPath, 'utf8');
                        const data = JSON.parse(content);
                        submissions.push(data);
                    } catch (e) {
                        console.error(`Error reading data.json in ${dirName}:`, e);
                    }
                }
            }
        }

        // Sort: Most recent submissions first
        submissions.sort((a, b) => b.id - a.id);
        res.json(submissions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to scan submission registry directories.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Admin dashboard available at http://localhost:${PORT}/admin`);
});
