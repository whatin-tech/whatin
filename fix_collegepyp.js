const fs = require('fs');

let content = fs.readFileSync('pages/collegepyp.html', 'utf8');

// 1. Remove Ads
content = content.replace(/<script async="async" data-cfasync="false" src="https:\/\/pl27943413\.profitablecpmratenetwork\.com\/.*?\/invoke\.js"><\/script>/gi, '');
content = content.replace(/<div id="container-[a-z0-9]+"><\/div>/gi, '');
content = content.replace(/<script>\s*atOptions\s*=\s*\{[\s\S]*?\};\s*<\/script>/gi, '');
content = content.replace(/<script src="https:\/\/www\.highperformanceformat\.com\/.*?\/invoke\.js"><\/script>/gi, '');
content = content.replace(/<script src="https:\/\/www\.highperformanceformat\.com\/.*?\/invoke\.js"><\/script>\n/gi, '');

// Clean wrapper divs safely
content = content.replace(/<div style="width:100%; display:flex; justify-content:center; margin: 2rem 0; clear:both; overflow:hidden;">[\s\n]*<\/div>/gi, '');
content = content.replace(/<div class="ad-leaderboard">[\s\n]*<!-- Adsterra Leaderboard Banner -->[\s\n]*<\/div>/gi, '');
content = content.replace(/<div class="ad-floating">[\s\n]*<\/div>/gi, '');

// Remove profitablecpmratenetwork fast download links completely
content = content.replace(/<a href="https:\/\/www\.profitablecpmratenetwork\.com\/.*?" target="_blank" class="btn btn-primary" style=".*?">Fast Download<\/a>/gi, '');


// 2. Apply Premium Aesthetic to Roadmap and Author
const premiumAuthorCSS = `
        /* Premium Glowing Timeline Roadmap */
        .roadmap-timeline {
            position: relative;
            padding: 3rem 0;
            max-width: 800px;
            margin: 0 auto;
        }

        .roadmap-timeline::before {
            content: '';
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 4px;
            height: 100%;
            background: linear-gradient(to bottom, transparent, var(--accent-primary), var(--accent-secondary), transparent);
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(56, 189, 248, 0.5);
        }

        .timeline-step {
            position: relative;
            width: 50%;
            padding: 1.5rem 3rem;
            margin-bottom: 2rem;
            opacity: 0;
            transform: translateY(20px);
            animation: fadeIn 0.8s forwards;
        }

        .timeline-step:nth-child(odd) {
            left: 0;
            text-align: right;
        }

        .timeline-step:nth-child(even) {
            left: 50%;
            text-align: left;
        }

        .timeline-step::after {
            content: '';
            position: absolute;
            top: 2rem;
            width: 20px;
            height: 20px;
            background: var(--dark-bg);
            border: 4px solid var(--accent-primary);
            border-radius: 50%;
            box-shadow: 0 0 10px var(--accent-primary);
            z-index: 1;
        }

        .timeline-step:nth-child(odd)::after {
            right: -10px;
        }

        .timeline-step:nth-child(even)::after {
            left: -10px;
        }

        .timeline-content {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 1.5rem;
            backdrop-filter: blur(10px);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .timeline-content:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(56, 189, 248, 0.15);
            border-color: rgba(56, 189, 248, 0.3);
        }

        .timeline-content h4 {
            color: var(--accent-primary);
            font-size: 1.3rem;
            margin-bottom: 0.5rem;
        }

        /* Responsive Timeline */
        @media (max-width: 768px) {
            .roadmap-timeline::before {
                left: 30px;
            }

            .timeline-step {
                width: 100%;
                left: 0 !important;
                padding-left: 80px;
                text-align: left !important;
            }

            .timeline-step::after {
                left: 20px !important;
                right: auto !important;
            }
        }

        /* 3D Glassmorphism Profile Container */
        .premium-profile-container {
            position: relative;
            max-width: 900px;
            margin: 4rem auto;
            padding: 3rem;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 30px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            gap: 3rem;
            overflow: hidden;
            perspective: 1000px;
        }

        .premium-profile-container::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 70%);
            z-index: 0;
            animation: rotateGlow 10s linear infinite;
        }

        @keyframes rotateGlow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .profile-3d-wrapper {
            position: relative;
            z-index: 1;
            flex-shrink: 0;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            padding: 5px;
            background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
            box-shadow: 0 15px 35px rgba(56, 189, 248, 0.4);
            transform-style: preserve-3d;
            transition: transform 0.5s ease;
        }

        .premium-profile-container:hover .profile-3d-wrapper {
            transform: rotateY(10deg) rotateX(10deg);
        }

        .profile-3d-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
            border: 4px solid var(--dark-bg);
        }

        .profile-content {
            position: relative;
            z-index: 1;
        }

        .profile-badge {
            display: inline-block;
            padding: 0.4rem 1.2rem;
            background: rgba(56, 189, 248, 0.15);
            color: var(--accent-primary);
            border-radius: 50px;
            font-size: 0.85rem;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 1rem;
            border: 1px solid rgba(56, 189, 248, 0.3);
            box-shadow: 0 0 15px rgba(56, 189, 248, 0.2);
        }

        .profile-content h3 {
            font-size: 2.5rem;
            color: #fff;
            margin-bottom: 0.5rem;
            font-weight: 800;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .profile-location {
            color: var(--text-secondary);
            font-size: 1rem;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .profile-stats {
            display: flex;
            gap: 2rem;
            margin-bottom: 1.5rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat-item h5 {
            color: var(--accent-primary);
            font-size: 1.2rem;
            margin: 0 0 0.2rem 0;
        }

        .stat-item p {
            font-size: 0.85rem;
            color: var(--text-secondary);
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .profile-mission {
            font-size: 1.05rem;
            line-height: 1.6;
            color: #e2e8f0;
        }

        @media (max-width: 768px) {
            .premium-profile-container {
                flex-direction: column;
                text-align: center;
                padding: 2rem;
            }
            .profile-location {
                justify-content: center;
            }
            .profile-stats {
                justify-content: center;
                flex-wrap: wrap;
            }
            .profile-3d-wrapper {
                width: 150px;
                height: 150px;
            }
        }
    </style>`;

content = content.replace('</style>', premiumAuthorCSS);

const premiumRoadmap = `
            <section class="roadmap-section">
                <h2 class="section-title">ST-1 Mastery <span class="gradient-text">Roadmap</span></h2>
                <div class="roadmap-timeline">
                    <div class="timeline-step">
                        <div class="timeline-content">
                            <h4>Concept Deep-Dive</h4>
                            <p>Finish Unit-1 and Unit-2 within the first 10 days of the semester.</p>
                        </div>
                    </div>
                    <div class="timeline-step">
                        <div class="timeline-content">
                            <h4>Paper Analysis</h4>
                            <p>Identify the 5 most recurring questions from our GL Bajaj archive.</p>
                        </div>
                    </div>
                    <div class="timeline-step">
                        <div class="timeline-content">
                            <h4>Diagram Sprint</h4>
                            <p>Practice all 2-mark and 5-mark diagrams from the previous year papers.</p>
                        </div>
                    </div>
                    <div class="timeline-step">
                        <div class="timeline-content">
                            <h4>The 100% Mock</h4>
                            <p>Solve a full ST-1 set in exactly 90 minutes to ensure peak performance.</p>
                        </div>
                    </div>
                </div>
            </section>`;

content = content.replace(/<section class="roadmap-section">[\s\S]*?<\/section>/i, premiumRoadmap);

const premiumAuthor = `
            <!-- The Architect Behind WHATIN -->
            <div class="premium-profile-container">
                <div class="profile-3d-wrapper">
                    <img src="../assets/dushyant.jpg" alt="Dushyant Saini" onerror="this.src='https://ui-avatars.com/api/?name=Dushyant+Saini&background=0ea5e9&color=fff&size=200'">
                </div>
                <div class="profile-content">
                    <div class="profile-badge"><i class="fas fa-crown"></i> The Architect</div>
                    <h3>Dushyant Saini</h3>
                    <div class="profile-location"><i class="fas fa-map-marker-alt" style="color: var(--accent-primary);"></i> 3rd-Year CS Student @ GL Bajaj, Mathura</div>
                    
                    <div class="profile-stats">
                        <div class="stat-item">
                            <h5>Top 100</h5>
                            <p>Global Rank (65) in Code Vipassana</p>
                        </div>
                        <div class="stat-item">
                            <h5>100%</h5>
                            <p>Ownership & Development</p>
                        </div>
                    </div>

                    <p class="profile-mission">
                        <i class="fas fa-quote-left" style="color: rgba(56, 189, 248, 0.5); margin-right: 0.5rem;"></i>
                        Scratch se UI/UX design aur Full-Stack code likh kar students ke liye AKTU notes aur PYQs ka fast, distraction-free platform banaya. My mission is to build a comprehensive "Student Help Ecosystem" that provides high-quality, verified resources.
                    </p>
                </div>
            </div>`;

content = content.replace(/<section class="author-outer">[\s\S]*?<\/section>/i, premiumAuthor);


fs.writeFileSync('pages/collegepyp.html', content);
console.log('Ads removed and premium aesthetic applied to collegepyp.html');
