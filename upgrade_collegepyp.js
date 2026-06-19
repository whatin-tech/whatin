const fs = require('fs');

let content = fs.readFileSync('pages/collegepyp.html', 'utf8');

// Fix Image Path
content = content.replace(/src="\.\.\/assets\/dushyant\.jpg"/g, 'src="../images/dushyant_profile.png"');

// Inject Premium CSS for Blueprint, Vision, and Observation
const premiumSectionsCSS = `
        /* Premium Bottom Sections CSS */
        .premium-blueprint-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
            text-align: left;
        }

        .premium-blueprint-card {
            background: rgba(255, 255, 255, 0.03);
            border-radius: 20px;
            padding: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
            transition: all 0.4s ease;
        }

        .premium-blueprint-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: var(--accent-gradient);
            opacity: 0.7;
            transition: all 0.4s ease;
        }

        .premium-blueprint-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(56, 189, 248, 0.2);
            border-color: rgba(56, 189, 248, 0.3);
        }

        .premium-blueprint-card:hover::before {
            width: 100%;
            opacity: 0.1;
        }

        .premium-blueprint-card h4 {
            color: var(--accent-primary);
            font-size: 1.3rem;
            margin-bottom: 1rem;
            position: relative;
            z-index: 1;
        }

        .premium-blueprint-card p {
            font-size: 0.95rem;
            color: var(--text-secondary);
            line-height: 1.6;
            position: relative;
            z-index: 1;
        }

        .premium-vision-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 3rem;
            margin-top: 3rem;
            text-align: left;
        }

        .premium-vision-card {
            background: linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
            padding: 2.5rem;
            border-radius: 25px;
            border: 1px solid rgba(255,255,255,0.08);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        }

        .premium-vision-card:hover {
            box-shadow: 0 15px 40px rgba(56, 189, 248, 0.15);
            border-color: rgba(56, 189, 248, 0.4);
        }

        .premium-vision-card h4 {
            color: var(--accent-primary);
            font-size: 1.4rem;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .premium-vision-card h4 i {
            font-size: 2rem;
            background: var(--accent-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .premium-message-box {
            margin-top: 4rem;
            padding: 2.5rem;
            background: rgba(56, 189, 248, 0.05);
            border-radius: 20px;
            border: 1px dashed var(--accent-primary);
            position: relative;
            text-align: center;
            box-shadow: inset 0 0 20px rgba(56, 189, 248, 0.1);
        }

        .premium-message-box i {
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 2.5rem;
            color: var(--accent-primary);
            background: var(--dark-bg);
            padding: 0 1rem;
        }

        .premium-observation {
            background: linear-gradient(90deg, rgba(56, 189, 248, 0.1), rgba(0,0,0,0));
            border-left: 5px solid var(--accent-primary);
            padding: 2.5rem;
            border-radius: 0 20px 20px 0;
            margin: 4rem 0;
            position: relative;
        }

        .premium-observation h4 {
            font-size: 1.5rem;
            color: #fff;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .premium-observation h4 i {
            color: var(--accent-primary);
        }

        .premium-observation p {
            font-size: 1.1rem;
            line-height: 1.7;
            color: var(--text-secondary);
        }
    </style>`;
content = content.replace('</style>', premiumSectionsCSS);

// Replace Blueprint Container
const premiumBlueprintHTML = `
                <div class="blueprint-container" style="background: transparent; border: none; padding: 0;">
                    <div class="blueprint-header">
                        <h2 class="section-title" style="text-align: left;">The <span class="gradient-text">GLBian Success Blueprint</span></h2>
                        <p style="color: var(--text-secondary); max-width: 700px; font-size: 1.1rem;">Getting an 8.5+ CGPA at GL Bajaj requires a specific strategy. It's not just about what you study, but how you align it with the internal marking system.</p>

                        <div class="premium-blueprint-cards">
                            <div class="premium-blueprint-card">
                                <h4>Phase 1: ST-1 & ST-2</h4>
                                <p>Focus on Unit 1, 2, and 3. These form the base of your internal scoring. Our papers cover the most tested Numerical types here.</p>
                            </div>
                            <div class="premium-blueprint-card">
                                <h4>Phase 2: PUT Mastery</h4>
                                <p>The PUT papers in our archive are the best way to test your speed. Solve them in a timed environment (exactly 3 hours).</p>
                            </div>
                            <div class="premium-blueprint-card">
                                <h4>Phase 3: Final Leap</h4>
                                <p>Combine GL Bajaj papers with AKTU Topper Notes to bridge the gap between internal excellence and external success.</p>
                            </div>
                        </div>
                    </div>
                </div>`;
content = content.replace(/<div class="blueprint-container">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/i, premiumBlueprintHTML + '\n            </section>');


// Replace Vision Section
const premiumVisionHTML = `
            <section class="about-gl-bajaj">
                <h2 class="section-title">Vision for GL Bajaj <span class="gradient-text">Academic Excellence</span></h2>
                <div class="premium-vision-grid">
                    <div class="premium-vision-card">
                        <h4><i class="fas fa-microscope"></i> Research-Driven Content</h4>
                        <p style="color: var(--text-secondary); line-height: 1.7;">At <strong>WHATIN</strong>, we don't just dump files. We analyze every <strong>ST-1, ST-2, and PUT</strong> paper from previous years at GL Bajaj to ensure that our archive reflects the actual academic pulse of the campus. Every resource is verified for relevance to the current university syllabus.</p>
                    </div>
                    <div class="premium-vision-card">
                        <h4><i class="fas fa-shield-alt"></i> Originality & Trust</h4>
                        <p style="color: var(--text-secondary); line-height: 1.7;">Our vision is to empower every student with free, authentic, and original educational content. By providing a structured roadmap, <strong>Dushyant Saini</strong> and the WHATIN team aim to bridge the gap between hard work and smart success for every GLBian.</p>
                    </div>
                </div>
                
                <div class="premium-message-box">
                    <i class="fas fa-envelope-open-text"></i>
                    <p style="font-size: 1.15rem; color: #fff; margin: 0; line-height: 1.6;"><strong>A Message for You:</strong> Engineering is as much about strategy as it is about knowledge. Use this archive not just to find answers, but to understand the "Mind of the Examiner." Your 10 CGPA journey starts here.</p>
                </div>
            </section>`;
content = content.replace(/<section class="about-gl-bajaj">[\s\S]*?<\/section>/i, premiumVisionHTML);


// Replace Campus Observation
const premiumObservationHTML = `
            <!-- Data Driven Insight Section -->
            <section class="deep-content-section">
                <div class="premium-observation">
                    <h4><i class="fas fa-chart-line"></i> Campus Observation</h4>
                    <p>Analysis of previous ST-1 results at GL Bajaj shows that nearly <strong>40% of students</strong> lose marks due to poor time management. Practicing with our 30-minute timed archives can improve your results significantly.</p>
                </div>
            </section>`;
content = content.replace(/<!-- Data Driven Insight Section -->\s*<section class="deep-content-section">[\s\S]*?<\/section>/i, premiumObservationHTML);

fs.writeFileSync('pages/collegepyp.html', content);
console.log('Premium aesthetic applied to bottom sections of collegepyp.html');
