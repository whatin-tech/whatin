const fs = require('fs');

let content = fs.readFileSync('pages/unitwise.html', 'utf8');

// 1. Inject CSS
const cssToInject = `
        /* Premium Topper Styles */
        .year-navigator { margin-top: 3rem; }
        .year-block {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            margin-bottom: 2rem;
            overflow: hidden;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }

        .year-header {
            padding: 1.5rem 2.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            background: rgba(255, 255, 255, 0.03);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .year-header h2 {
            font-size: 1.8rem;
            color: #fff;
            margin: 0;
        }

        .year-header i {
            transition: transform 0.3s ease;
            font-size: 1.5rem;
            color: var(--accent-primary);
        }

        .year-block.collapsed .year-content {
            display: none;
        }

        .year-block.collapsed .year-header {
            border-bottom: none;
        }

        .year-block.collapsed .year-header i {
            transform: rotate(-90deg);
        }

        .year-content {
            padding: 2.5rem;
        }

        .subjects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .subject-card-v2 {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            padding: 2rem;
            border-radius: 20px;
            transition: 0.3s;
        }

        .subject-card-v2:hover {
            border-color: var(--accent-primary);
            background: rgba(255, 255, 255, 0.04);
        }

        .subject-card-v2 h3 {
            margin-bottom: 1.5rem;
            font-size: 1.2rem;
            color: #fff;
            border-left: 3px solid var(--accent-primary);
            padding-left: 1rem;
        }

        .units-strip {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
        }

        .unit-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(0, 0, 0, 0.2);
            padding: 0.8rem 1.2rem;
            border-radius: 12px;
            font-size: 0.9rem;
        }

        .unit-item a {
            color: var(--accent-primary);
            font-weight: 700;
            text-transform: uppercase;
            font-size: 0.75rem;
            letter-spacing: 1px;
            border: 1px solid var(--accent-primary);
            padding: 2px 8px;
            border-radius: 4px;
            text-decoration: none;
        }

        .unit-item a:hover {
            background: var(--accent-primary);
            color: #000;
        }
        
        /* Premium Weightage Section */
        .premium-weightage-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        .weightage-card {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            padding: 2.5rem 2rem;
            text-align: center;
            position: relative;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            overflow: hidden;
            backdrop-filter: blur(10px);
        }
        .weightage-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 4px;
        }
        .weightage-card.high::before { background: #ff4757; }
        .weightage-card.medium::before { background: #ffa502; }
        .weightage-card.low::before { background: #2ed573; }
        
        .weightage-card:hover {
            transform: translateY(-10px);
            background: rgba(255, 255, 255, 0.05);
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .weightage-card.high:hover { border-color: rgba(255, 71, 87, 0.5); box-shadow: 0 15px 35px rgba(255, 71, 87, 0.15); }
        .weightage-card.medium:hover { border-color: rgba(255, 165, 2, 0.5); box-shadow: 0 15px 35px rgba(255, 165, 2, 0.15); }
        .weightage-card.low:hover { border-color: rgba(46, 213, 115, 0.5); box-shadow: 0 15px 35px rgba(46, 213, 115, 0.15); }

        .w-level {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 1rem;
            font-weight: 700;
        }
        .weightage-card.high .w-level { color: #ff4757; }
        .weightage-card.medium .w-level { color: #ffa502; }
        .weightage-card.low .w-level { color: #2ed573; }

        .weightage-card h3 {
            font-size: 1.4rem;
            color: #fff;
            margin-bottom: 1rem;
        }
        .w-marks {
            font-size: 3rem;
            font-weight: 800;
            color: var(--accent-primary);
            margin: 1.5rem 0;
            text-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
        }
        .w-marks span {
            font-size: 1rem;
            font-weight: 400;
            color: var(--text-secondary);
            display: block;
            text-shadow: none;
        }
        .weightage-card p {
            font-size: 0.95rem;
            color: var(--text-secondary);
            background: rgba(0,0,0,0.2);
            padding: 0.8rem;
            border-radius: 8px;
            margin-top: 1rem;
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
    </style>
`;
content = content.replace('</style>', cssToInject);

// 2. Add JavaScript function for toggleYear
content = content.replace('</body>', `
<script>
    function toggleYear(headerElement) {
        const block = headerElement.parentElement;
        block.classList.toggle('collapsed');
    }
</script>
</body>`);

// 3. Re-write the HTML structure for Years
const htmlYears = `
                <div class="year-navigator">
                    <!-- 1st Year Section -->
                    <div class="year-block collapsed">
                        <div class="year-header" onclick="toggleYear(this)">
                            <h2>1st Year Archive</h2>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="year-content">
                            <div class="subjects-grid">
                                <div class="subject-card-v2">
                                    <h3>Mechanical Engineering</h3>
                                    <div class="units-strip">
                                        <div class="unit-item"><span>Unit 1</span><a href="UNIT-1.png" target="_blank">Access PDF</a></div>
                                        <div class="unit-item"><span>Unit 2</span><a href="UNIT-2.png" target="_blank">Access PDF</a></div>
                                        <div class="unit-item"><span>Unit 3</span><a href="UNIT-3.png" target="_blank">Access PDF</a></div>
                                        <div class="unit-item"><span>Unit 4</span><a href="UNIT-4.png" target="_blank">Access PDF</a></div>
                                        <div class="unit-item"><span>Unit 5</span><a href="UNIT-5.png" target="_blank">Access PDF</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 2nd Year Section -->
                    <div class="year-block collapsed">
                        <div class="year-header" onclick="toggleYear(this)">
                            <h2>2nd Year Archive</h2>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="year-content">
                            <div class="subjects-grid">
                                <div class="subject-card-v2">
                                    <h3>Cyber Security</h3>
                                    <div class="units-strip">
                                        <div class="unit-item"><span>Unit 1</span><a href="https://drive.google.com/file/d/1xbHteIJPgJJgBSpbNguTech58WulI_Xl/view?usp=drive_link" target="_blank">Access PDF</a></div>
                                        <div class="unit-item"><span>Unit 2</span><a href="https://drive.google.com/file/d/197UCbUzttkBOXU8Lh5B1Yo9lYFU_l5qR/view?usp=drive_link" target="_blank">Access PDF</a></div>
                                        <div class="unit-item"><span>Unit 3</span><a href="https://drive.google.com/file/d/1xnXggL0TyctGkYEUxpZN3m9Uwkejm3If/view?usp=drive_link" target="_blank">Access PDF</a></div>
                                        <div class="unit-item"><span>Unit 4</span><a href="https://drive.google.com/file/d/1n7_tMnrRX6Yet672CGLd7Zek7Sox_3We/view?usp=drive_link" target="_blank">Access PDF</a></div>
                                        <div class="unit-item"><span>Unit 5</span><a href="https://drive.google.com/file/d/1NPdwyYa5Jf4JstGlbOtvuPcWwFmzwWtG/view?usp=drive_link" target="_blank">Access PDF</a></div>
                                    </div>
                                </div>
                                <div class="subject-card-v2">
                                    <h3>Database Management</h3>
                                    <div class="units-strip">
                                        <div class="unit-item"><span>Unit 1</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                        <div class="unit-item"><span>Unit 2</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                        <div class="unit-item"><span>Unit 3</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                        <div class="unit-item"><span>Unit 4</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                        <div class="unit-item"><span>Unit 5</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                    </div>
                                </div>
                                <div class="subject-card-v2">
                                    <h3>Operating Systems</h3>
                                    <div class="units-strip">
                                        <div class="unit-item"><span>Unit 1</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                        <div class="unit-item"><span>Unit 2</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                        <div class="unit-item"><span>Unit 3</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                        <div class="unit-item"><span>Unit 4</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                        <div class="unit-item"><span>Unit 5</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                    </div>
                                </div>
                                <div class="subject-card-v2">
                                    <h3>Computer Organization</h3>
                                    <div class="units-strip">
                                        <div class="unit-item"><span>Unit 1</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                        <div class="unit-item"><span>Unit 2</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                        <div class="unit-item"><span>Unit 3</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                        <div class="unit-item"><span>Unit 4</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                        <div class="unit-item"><span>Unit 5</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                    </div>
                                </div>
                                <div class="subject-card-v2">
                                    <h3>Mathematics-4</h3>
                                    <div class="units-strip">
                                        <div class="unit-item"><span>Unit 1</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                        <div class="unit-item"><span>Unit 2</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                        <div class="unit-item"><span>Unit 3</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                        <div class="unit-item"><span>Unit 4</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                        <div class="unit-item"><span>Unit 5</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                    </div>
                                </div>
                                <div class="subject-card-v2">
                                    <h3>TUFLE</h3>
                                    <div class="units-strip">
                                        <div class="unit-item"><span>Unit 1</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                        <div class="unit-item"><span>Unit 2</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                        <div class="unit-item"><span>Unit 3</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                        <div class="unit-item"><span>Unit 4</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                        <div class="unit-item"><span>Unit 5</span><a href="#" target="_blank" style="opacity: 0.5; pointer-events: none;">Coming Soon</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 3rd Year Section -->
                    <div class="year-block collapsed">
                        <div class="year-header" onclick="toggleYear(this)">
                            <h2>3rd Year Archive</h2>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="year-content">
                            <div style="padding: 4rem; text-align: center; background: rgba(255,195,0,0.05); border-radius: 30px; border: 1px dashed var(--accent-primary);">
                                <i class="fas fa-rocket" style="font-size: 3rem; color: var(--accent-primary); margin-bottom: 1rem;"></i>
                                <p style="color: var(--text-secondary);">Advanced modules for 3rd Year are launching soon. Stay tuned!</p>
                            </div>
                        </div>
                    </div>
                </div>
`;
content = content.replace(/<div class="year-nav">[\s\S]*?<!-- Marks Weightage Example -->/i, htmlYears + '\n                <!-- Marks Weightage Example -->');

// 4. Re-write Weightage and Author sections to Premium Design
const htmlWeightage = `
                <!-- Marks Weightage Premium Cards -->
                <section class="weightage-section" style="margin-top: 6rem;">
                    <h2 class="section-title">Unit-Wise <span class="gradient-text">Weightage</span></h2>
                    <p class="hero-subtitle" style="text-align: center; margin-bottom: 3rem;">Standard AKTU B.Tech Marks Distribution (approximate)</p>
                    <div class="premium-weightage-grid">
                        <div class="weightage-card medium">
                            <div class="w-level">Foundational</div>
                            <h3>Unit 1</h3>
                            <div class="w-marks">14 <span>Marks</span></div>
                            <p>2-Mark Qs: 2 | 10-Mark Qs: 1</p>
                        </div>
                        <div class="weightage-card high">
                            <div class="w-level">Core Concept <i class="fas fa-fire"></i></div>
                            <h3>Unit 2 & 3</h3>
                            <div class="w-marks">20-24 <span>Marks</span></div>
                            <p>2-Mark Qs: 2 | 10-Mark Qs: 2</p>
                        </div>
                        <div class="weightage-card low">
                            <div class="w-level">Advanced Application</div>
                            <h3>Unit 4 & 5</h3>
                            <div class="w-marks">10-14 <span>Marks</span></div>
                            <p>2-Mark Qs: 1 | 10-Mark Qs: 1</p>
                        </div>
                    </div>
                </section>
`;
content = content.replace(/<!-- Marks Weightage Example -->[\s\S]*?<!-- Data Driven Insight Section -->/i, htmlWeightage + '\n                <!-- Data Driven Insight Section -->');

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
content = content.replace(/<!-- About the Author Section -->[\s\S]*?<div class="trust-badge-container"/i, htmlAuthor + '\n                <div class="trust-badge-container"');

fs.writeFileSync('pages/unitwise.html', content);
console.log('Successfully refactored unitwise.html to match topper.html premium design.');
