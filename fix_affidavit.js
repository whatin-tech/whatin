const fs = require('fs');

const affidavitHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Get College Affidavit | WHATIN Ecosystem</title>

    <!-- SEO Meta Tags -->
    <meta name="description" content="Get your Anti-Ragging, Gap Certificate, and other college affidavits easily through WHATIN. Fast, clear, and designed for students.">
    <meta name="author" content="Dushyant Saini">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../animations/animations.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <style>
        .affidavit-hero {
            padding: 8rem 0 4rem;
            text-align: center;
        }

        .document-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin: 3rem 0;
        }
        
        .mission-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin: 3rem 0;
            text-align: left;
        }

        .doc-card {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            padding: 2rem;
            text-align: left;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .doc-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: var(--accent-gradient);
        }

        .doc-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(56, 189, 248, 0.15);
            border-color: rgba(56, 189, 248, 0.4);
        }

        .doc-card h4 {
            color: var(--accent-primary);
            font-size: 1.3rem;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.8rem;
        }

        .doc-card p {
            color: var(--text-secondary);
            font-size: 0.95rem;
            line-height: 1.6;
        }

        .process-container {
            max-width: 800px;
            margin: 4rem auto;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 30px;
            padding: 3rem;
            backdrop-filter: blur(10px);
        }

        .step-item {
            display: flex;
            align-items: flex-start;
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .step-item:last-child {
            margin-bottom: 0;
        }

        .step-number {
            width: 40px;
            height: 40px;
            background: var(--accent-gradient);
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.2rem;
            flex-shrink: 0;
            box-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
        }

        .step-content h4 {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
            color: #fff;
        }

        .step-content p {
            color: var(--text-secondary);
            margin: 0;
        }

        .cta-container {
            text-align: center;
            margin-top: 4rem;
            padding: 3rem;
            background: linear-gradient(145deg, rgba(56, 189, 248, 0.1), rgba(0, 0, 0, 0.2));
            border-radius: 30px;
            border: 1px dashed var(--accent-primary);
        }
    </style>
</head>

<body>
    <canvas id="bgCanvas"></canvas>

    <header id="main-header">
        <div class="container header-content">
            <div class="logo" onclick="window.location.href='../index.html'">WHATIN 💡</div>
            <nav id="nav-menu">
                <ul>
                    <li><a href="../index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="guidance.html">Guidance</a></li>
                    <li><a href="jobs.html">Jobs</a></li>
                </ul>
            </nav>
            <button class="mobile-menu-btn" id="mobile-menu-btn">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    </header>

    <main>
        <div class="container">
            <nav aria-label="Breadcrumb" style="padding-top: 2rem;">
                <ul class="breadcrumb">
                    <li><a href="../index.html">Home</a></li>
                    <li style="color: var(--accent-primary);">Get Affidavit</li>
                </ul>
            </nav>

            <section class="affidavit-hero">
                <div class="section-badge pop-in">Essential Service</div>
                <h1 class="hero-title pop-in">Student <span class="gradient-text">Affidavit Portal</span></h1>
                <p class="hero-subtitle pop-in" style="max-width: 700px; margin: 0 auto;">College document verifications made easy. Apply for Anti-Ragging, Gap Certificates, and other official affidavits smoothly.</p>

                <h3 style="margin-top: 4rem; font-size: 1.8rem; color: #fff;">Available Affidavits <i class="fas fa-layer-group" style="color: var(--accent-primary);"></i></h3>
                
                <div class="mission-grid" style="margin-top: 2rem;">
                    <a href="anti-ragging.html" class="project-card pop-scale">
                        <div class="card-icon"><i class="fas fa-shield-alt"></i></div>
                        <div class="card-content">
                            <h3>Anti Ragging</h3>
                            <p>Mandatory affidavit for all students declaring strict adherence to anti-ragging policies of the institution and UGC.</p>
                        </div>
                    </a>
                    <a href="gap-affidavit.html" class="project-card pop-scale" style="animation-delay: 0.1s;">
                        <div class="card-icon"><i class="fas fa-history"></i></div>
                        <div class="card-content">
                            <h3>Gap Affidavit</h3>
                            <p>Required if you have a study gap between your previous qualification and current admission. Validates your activities.</p>
                        </div>
                    </a>
                    <a href="scholarship-affidavit.html" class="project-card pop-scale" style="animation-delay: 0.2s;">
                        <div class="card-icon"><i class="fas fa-graduation-cap"></i></div>
                        <div class="card-content">
                            <h3>Scholarship Affidavit</h3>
                            <p>Income declaration or no-objection affidavit required for applying to various state and central government scholarship schemes.</p>
                        </div>
                    </a>
                    <a href="name-correction.html" class="project-card pop-scale" style="animation-delay: 0.3s;">
                        <div class="card-icon"><i class="fas fa-user-edit"></i></div>
                        <div class="card-content">
                            <h3>Name Correction</h3>
                            <p>Father/Mother name problem affidavit to legally declare the correct names in case of discrepancies in official documents.</p>
                        </div>
                    </a>
                </div>

                <h3 style="margin-top: 4rem; font-size: 1.8rem; color: #fff;">Required Documents <i class="fas fa-file-alt" style="color: var(--accent-primary);"></i></h3>
                <div class="document-grid">
                    <div class="doc-card pop-scale">
                        <h4><i class="fas fa-id-card"></i> Aadhar Card</h4>
                        <p>A clear photocopy of your Aadhar card (both sides) is required for identity verification on the stamp paper.</p>
                    </div>
                    <div class="doc-card pop-scale" style="animation-delay: 0.1s;">
                        <h4><i class="fas fa-university"></i> College Proof</h4>
                        <p>College ID Card, Admission Letter, or Fee Receipt to prove your enrollment status at the institution.</p>
                    </div>
                    <div class="doc-card pop-scale" style="animation-delay: 0.2s;">
                        <h4><i class="fas fa-user-circle"></i> Passport Photos</h4>
                        <p>2 Recent passport-size photographs. These will be affixed to the physical affidavit document.</p>
                    </div>
                    <div class="doc-card pop-scale" style="animation-delay: 0.3s;">
                        <h4><i class="fas fa-graduation-cap"></i> Previous Marksheet</h4>
                        <p>10th/12th Marksheet or previous semester result (mainly required if you are applying for a Gap Certificate).</p>
                    </div>
                </div>

                <div class="process-container pop-in">
                    <h3 style="font-size: 1.6rem; color: #fff; margin-bottom: 2rem; text-align: left;">How It Works</h3>
                    <div class="step-item">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4>Submit Details</h4>
                            <p>Click the button below and carefully fill out the Google Form with your exact personal and academic details.</p>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4>Verification</h4>
                            <p>Keep your required documents handy. Ensure all spellings match your official Aadhar and Marksheets.</p>
                        </div>
                    </div>
                    <div class="step-item">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h4>Processing & Notary</h4>
                            <p>The details will be printed on official Stamp Paper and authorized by a legal Notary.</p>
                        </div>
                    </div>
                </div>

                <div class="cta-container pop-scale">
                    <h2 style="font-size: 2rem; margin-bottom: 1rem;">Ready to Apply?</h2>
                    <p style="color: var(--text-secondary); margin-bottom: 2rem;">Ensure you have all the required documents ready before starting the form.</p>
                    <a href="#" target="_blank" class="btn btn-primary" style="font-size: 1.2rem; padding: 1rem 3rem;">
                        <i class="fab fa-google" style="margin-right: 0.5rem;"></i> Fill Google Form
                    </a>
                </div>
            </section>
        </div>
    </main>

    <footer>
        <div class="container footer-content">
            <div class="logo">WHATIN 💡</div>
            <div class="footer-links">
                <a href="about.html">About Us</a>
                <a href="contact.html">Contact</a>
                <a href="privacy-policy.html">Privacy Policy</a>
                <a href="terms-conditions.html">Terms & Conditions</a>
            </div>
            <div class="social-links">
                <a href="#"><i class="fab fa-github"></i></a>
                <a href="https://linkedin.com/in/dushyant-saini-6384a532b" target="_blank"><i class="fab fa-linkedin"></i></a>
                <a href="https://www.instagram.com/thedushyant_saini?igsh=Z2sybHAzcTI2eTA2" target="_blank"><i class="fab fa-instagram"></i></a>
            </div>
            <p class="copyright">&copy; 2026 WHATIN Ecosystem. Architected by Dushyant Saini.</p>
        </div>
    </footer>

    <script src="../js/script.js"></script>
    <script type="module" src="../js/nav-auth.js"></script>

<!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6a36079e0f767c1d42224af1/default';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script-->
</body>
</html>`;

fs.writeFileSync('pages/affidavit.html', affidavitHTML);
console.log('Fixed affidavit.html layout to use project-cards like home page.');
