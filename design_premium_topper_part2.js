const fs = require('fs');

const cssToInject = `
        /* Premium Roadmap Timeline */
        .premium-timeline {
            position: relative;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem 0;
        }
        .premium-timeline::before {
            content: '';
            position: absolute;
            top: 0; left: 50%; width: 2px; height: 100%;
            background: linear-gradient(to bottom, transparent, var(--accent-primary), transparent);
            transform: translateX(-50%);
        }
        @media (max-width: 768px) {
            .premium-timeline::before { left: 30px; }
        }
        .timeline-item {
            position: relative;
            margin-bottom: 3rem;
            width: 50%;
            padding: 0 3rem;
            perspective: 1000px;
        }
        .timeline-item:nth-child(odd) { left: 0; text-align: right; }
        .timeline-item:nth-child(even) { left: 50%; text-align: left; }

        @media (max-width: 768px) {
            .timeline-item { width: 100%; padding-left: 70px; padding-right: 0; left: 0 !important; text-align: left !important; }
        }
        .timeline-dot {
            position: absolute;
            top: 0;
            width: 20px; height: 20px;
            background: var(--bg-dark);
            border: 4px solid var(--accent-primary);
            border-radius: 50%;
            box-shadow: 0 0 15px var(--accent-primary);
            z-index: 2;
        }
        .timeline-item:nth-child(odd) .timeline-dot { right: -10px; }
        .timeline-item:nth-child(even) .timeline-dot { left: -10px; }
        @media (max-width: 768px) {
            .timeline-item:nth-child(odd) .timeline-dot { right: auto; left: 20px; }
            .timeline-item:nth-child(even) .timeline-dot { left: 20px; }
        }

        .timeline-content {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            padding: 2rem;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            transition: 0.4s;
            transform: translateZ(0);
        }
        .timeline-content:hover {
            background: rgba(255, 255, 255, 0.05);
            border-color: var(--accent-primary);
            transform: translateY(-5px) translateZ(20px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.4);
        }
        .timeline-step-num {
            font-size: 0.9rem;
            color: var(--accent-primary);
            font-weight: 800;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
            display: block;
        }
        .timeline-content h4 {
            font-size: 1.4rem;
            color: #fff;
            margin-bottom: 1rem;
        }
        .timeline-content p {
            color: var(--text-secondary);
            font-size: 0.95rem;
            line-height: 1.6;
        }

        /* Premium Author Box */
        .premium-author-box {
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(0, 240, 255, 0.05));
            border: 1px solid rgba(0, 240, 255, 0.1);
            border-radius: 30px;
            padding: 4rem;
            max-width: 900px;
            margin: 0 auto;
            gap: 4rem;
            position: relative;
            overflow: hidden;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }
        .premium-author-box::before {
            content: '';
            position: absolute;
            top: -50%; left: -50%;
            width: 200%; height: 200%;
            background: radial-gradient(circle, rgba(0, 240, 255, 0.1) 0%, transparent 60%);
            opacity: 0.5;
            pointer-events: none;
        }
        @media (max-width: 768px) {
            .premium-author-box { flex-direction: column; text-align: center; padding: 2rem; gap: 2rem; }
        }

        .author-3d-image {
            position: relative;
            width: 180px;
            height: 180px;
            perspective: 1000px;
            flex-shrink: 0;
            z-index: 2;
        }
        .author-3d-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 20px;
            transform: rotateX(15deg) rotateY(-15deg);
            transition: 0.5s;
            border: 2px solid rgba(255,255,255,0.1);
            box-shadow: -10px 15px 30px rgba(0, 240, 255, 0.2);
        }
        .author-3d-image:hover img {
            transform: rotateX(0) rotateY(0) scale(1.05);
            box-shadow: 0 0 40px rgba(0, 240, 255, 0.4);
            border-color: rgba(0, 240, 255, 0.5);
        }

        .author-info {
            z-index: 2;
        }
        .author-info h4 {
            color: var(--accent-primary);
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 0.5rem;
        }
        .author-info h3 {
            font-size: 2.5rem;
            color: #fff;
            margin-bottom: 1.5rem;
            text-shadow: 0 0 20px rgba(255,255,255,0.2);
        }
        .author-info p {
            color: var(--text-secondary);
            font-size: 1.1rem;
            line-height: 1.7;
            margin-bottom: 1.5rem;
        }
        .mission-badge {
            background: rgba(0, 240, 255, 0.1);
            border-left: 4px solid var(--accent-primary);
            padding: 1.2rem;
            border-radius: 0 12px 12px 0;
            color: #fff;
            font-size: 1.05rem;
            text-align: left;
        }
        @media (max-width: 768px) {
            .mission-badge { border-left: none; border-top: 4px solid var(--accent-primary); border-radius: 0 0 12px 12px; }
        }
`;

const htmlRoadmap = `
            <!-- Study Roadmap Premium Section -->
            <section class="roadmap-section">
                <h2 class="section-title">Preparation <span class="gradient-text">Roadmap</span></h2>
                <div class="premium-timeline">
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <span class="timeline-step-num">Step 01</span>
                            <h4>Core Calculus</h4>
                            <p>Focus on Differential and Integral calculus basics. These form the foundation of 60% of technical subjects.</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <span class="timeline-step-num">Step 02</span>
                            <h4>Matrix & Algebra</h4>
                            <p>Master rank of matrix and eigen values. Perfect for securing easy marks in the first section.</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <span class="timeline-step-num">Step 03</span>
                            <h4>PYQ Sprint</h4>
                            <p>Solve the last 3 years of Previous Year Papers available in our <a href="padhai.html" style="color: var(--accent-primary); text-decoration: none; border-bottom: 1px dashed;">PYP Hub</a>.</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <span class="timeline-step-num">Step 04</span>
                            <h4>Mock Challenge</h4>
                            <p>Attempt a full-length 3-hour mock test using the GL Bajaj PUT archives.</p>
                        </div>
                    </div>
                </div>
            </section>
`;

const htmlAuthor = `
            <!-- About the Author Premium Section -->
            <section class="author-outer" style="margin-top: 5rem;">
                <div class="premium-author-box">
                    <div class="author-3d-image">
                        <img src="../images/dushyant_profile.png" alt="Dushyant Saini">
                    </div>
                    <div class="author-info">
                        <h4>✍️ About the Author</h4>
                        <h3>Dushyant Saini</h3>
                        <p>
                            I am a <strong>B.Tech Computer Science Engineering</strong> student and an active member of the AKTU student community. My mission is to build a comprehensive "Student Help Ecosystem" that provides high-quality, verified resources to help my peers excel in their academic journey.
                        </p>
                        <div class="mission-badge">
                            <strong><i class="fas fa-rocket"></i> My Mission:</strong> Helping 10,000+ students navigate engineering with clarity and confidence.
                        </div>
                    </div>
                </div>
            </section>
`;

let content = fs.readFileSync('pages/topper.html', 'utf8');

// Inject CSS
content = content.replace('</style>', cssToInject + '\n    </style>');

// Replace Roadmap
const roadmapRegex = /<!-- Study Roadmap Section -->[\s\S]*?<\/section>/i;
content = content.replace(roadmapRegex, htmlRoadmap.trim());

// Replace Author
const authorRegex = /<!-- About the Author Section -->[\s\S]*?<\/section>/i;
content = content.replace(authorRegex, htmlAuthor.trim());

fs.writeFileSync('pages/topper.html', content);
console.log('Successfully injected premium roadmap and author designs.');
