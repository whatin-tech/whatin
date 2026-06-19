const fs = require('fs');

const cssToInject = `
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

        /* Premium VS Section */
        .premium-vs-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 3rem;
            position: relative;
            max-width: 1000px;
            margin: 0 auto;
        }
        @media (max-width: 768px) {
            .premium-vs-container { flex-direction: column; gap: 4rem; }
        }
        .vs-card {
            flex: 1;
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 24px;
            padding: 3rem 2rem;
            width: 100%;
            position: relative;
            transition: 0.4s;
        }
        .vs-card.left-side {
            background: linear-gradient(145deg, rgba(255,255,255,0.02), rgba(52, 152, 219, 0.05));
            border-left: 4px solid #3498db;
        }
        .vs-card.right-side {
            background: linear-gradient(145deg, rgba(255,255,255,0.02), rgba(155, 89, 182, 0.05));
            border-right: 4px solid #9b59b6;
        }
        .vs-card:hover {
            transform: scale(1.02);
        }
        .vs-card.left-side:hover { box-shadow: -15px 15px 40px rgba(52, 152, 219, 0.1); border-color: rgba(52, 152, 219, 0.3); }
        .vs-card.right-side:hover { box-shadow: 15px 15px 40px rgba(155, 89, 182, 0.1); border-color: rgba(155, 89, 182, 0.3); }

        .vs-header {
            text-align: center;
            margin-bottom: 2.5rem;
        }
        .vs-header i {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        .vs-card.left-side .vs-header i { color: #3498db; }
        .vs-card.right-side .vs-header i { color: #9b59b6; }
        
        .vs-header h3 {
            font-size: 1.6rem;
            color: #fff;
        }
        
        .premium-comp-list {
            list-style: none;
            padding: 0;
        }
        .premium-comp-list li {
            padding: 1.2rem;
            background: rgba(0,0,0,0.2);
            margin-bottom: 1rem;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 1rem;
            color: var(--text-secondary);
            font-size: 1.05rem;
            transition: 0.3s;
        }
        .premium-comp-list li:hover {
            background: rgba(255,255,255,0.05);
            color: #fff;
        }
        .vs-card.left-side .premium-comp-list li i { color: #3498db; }
        .vs-card.right-side .premium-comp-list li i { color: #9b59b6; }

        .vs-badge {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #ff4757, #ff6b81);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            font-weight: 900;
            color: #fff;
            border: 8px solid #0f172a;
            box-shadow: 0 0 30px rgba(255, 71, 87, 0.4);
            z-index: 10;
        }
        @media (max-width: 768px) {
            .vs-badge { top: 48%; }
        }
    </style>`;

const htmlToInject = `
            <!-- Marks Weightage Premium Cards -->
            <section class="weightage-section">
                <h2 class="section-title">Marks <span class="gradient-text">Weightage</span></h2>
                <p class="hero-subtitle" style="text-align: center; margin-bottom: 3rem;">Clear breakdown of where to focus your energy for maximum score.</p>
                <div class="premium-weightage-grid">
                    <div class="weightage-card medium">
                        <div class="w-level">Medium Priority</div>
                        <h3>Quantum Physics</h3>
                        <div class="w-marks">15-20 <span>Marks</span></div>
                        <p>Focus Area: Wave Mechanics</p>
                    </div>
                    <div class="weightage-card high">
                        <div class="w-level">High Priority <i class="fas fa-fire"></i></div>
                        <h3>Electromagnetic Field</h3>
                        <div class="w-marks">12-15 <span>Marks</span></div>
                        <p>Focus Area: Maxwell's Equations</p>
                    </div>
                    <div class="weightage-card low">
                        <div class="w-level">Low Priority</div>
                        <h3>Semiconductors</h3>
                        <div class="w-marks">18-22 <span>Marks</span></div>
                        <p>Focus Area: PN Junction</p>
                    </div>
                </div>
            </section>

            <!-- Strategic Comparison Premium Section -->
            <section class="comparison-section" style="margin-top: 5rem; margin-bottom: 3rem;">
                <h2 class="section-title">Strategic <span class="gradient-text">Comparison</span></h2>
                <p class="hero-subtitle" style="text-align: center; margin-bottom: 3rem;">Understand the shift in mindset required from school to engineering.</p>
                
                <div class="premium-vs-container">
                    <div class="vs-card left-side">
                        <div class="vs-header">
                            <i class="fas fa-school"></i>
                            <h3>12th Grade Maths</h3>
                        </div>
                        <ul class="premium-comp-list">
                            <li><i class="fas fa-check"></i> Focus on standard NCERT Patterns</li>
                            <li><i class="fas fa-check"></i> Broad syllabus coverage</li>
                            <li><i class="fas fa-check"></i> Step-marking is usually lenient</li>
                        </ul>
                    </div>
                    
                    <div class="vs-badge">VS</div>

                    <div class="vs-card right-side">
                        <div class="vs-header">
                            <i class="fas fa-university"></i>
                            <h3>Engineering Maths</h3>
                        </div>
                        <ul class="premium-comp-list">
                            <li><i class="fas fa-bolt"></i> Application-based complex logic</li>
                            <li><i class="fas fa-bolt"></i> Highly specific to University (AKTU)</li>
                            <li><i class="fas fa-bolt"></i> Requires deep conceptual clarity</li>
                        </ul>
                    </div>
                </div>
            </section>
`;

let content = fs.readFileSync('pages/topper.html', 'utf8');

// Inject CSS
content = content.replace('</style>', cssToInject);

// Replace the old HTML block with the new one
// Finding the block from <!-- Marks Weightage Table --> to the end of <!-- Comparison Section -->
const htmlRegex = /<!-- Marks Weightage Table -->[\s\S]*?<!-- About the Author Section -->/i;
content = content.replace(htmlRegex, htmlToInject + '\n            <!-- About the Author Section -->');

fs.writeFileSync('pages/topper.html', content);
console.log('Successfully injected premium designs.');
