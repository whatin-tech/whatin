const fs = require('fs');

let html = fs.readFileSync('pages/contributors.html', 'utf8');

// The corrupted block starts at line 203 and ends at line 215
const corruption = `                    <li><a href="contributors.html" class="active">Contributors</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li><a href="https://chat.whatsapp.com/BegnxxKgYZa4IWMV35CPxO" target="_blank" style="color: #25D366; font-weight: 600; display: inline-flex; align-items: center; gap: 0.4rem;"><i class="fab fa-whatsapp" style="font-size: 1.2rem;"></i> WhatsApp</a></li>
                    <li><a href="login.html" class="admin-link"><i class="fas fa-lock"></i> Admin</a></li>
                    <li><a href="../index.html#projects" class="cta-btn-header">Resources</a></li>
                </ul>
            </nav>
            
            <div class="mobile-menu-btn" id="mobile-menu-btn">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </header>`;

// We replace the corruption with the proper end of the style block and start of the layout.
// Actually, in the original file, after .insta-btn:hover { ... } it was just:
//                         }
//                     </style>
//                     <div class="profile-image-container" ...

const fix = `                        }
                    </style>`;

html = html.replace(corruption, fix);

// Wait, looking at the view_file, the corruption replaced "                        }\n                    </style>" entirely.
// Let's do a more robust regex to clean up everything between ".insta-btn:hover { ... filter: ... ;" and "<main>"
// No, the <main> block is duplicated!
// Look at line 217: <main>
// Line 218: <section class="hero-section"...
// Wait, is there a <main> at the top of the file too?
// Let's check how many <main> tags are there.

fs.writeFileSync('pages/contributors.html', html);
console.log("Attempted manual fix. Checking for multiple <main> tags.");
