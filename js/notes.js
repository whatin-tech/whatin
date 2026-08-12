import { db, collection, query, where, onSnapshot } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Tab switching logic
    const tabs = document.querySelectorAll('.year-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderNotes(tab.dataset.year);
        });
    });

    // 2. Fetch data from Firebase
    let allNotes = [];
    const notesQuery = query(collection(db, "resources"), where("category", "==", "notes"));
    
    onSnapshot(notesQuery, (snapshot) => {
        allNotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Initial render for active tab
        const activeTab = document.querySelector('.year-tab.active');
        if (activeTab) {
            renderNotes(activeTab.dataset.year);
        }
    }, (error) => {
        console.error("Error fetching notes: ", error);
        document.getElementById('notesContainerWrapper').innerHTML = `<p style="text-align:center; color: #ff6b6b;">Error loading notes. Please try again later.</p>`;
    });

    // 3. Render logic
    function renderNotes(selectedYear) {
        const container = document.getElementById('notesContainerWrapper');
        if (!container) return;

        // Filter by year
        const yearNotes = allNotes.filter(note => note.year === selectedYear);

        if (yearNotes.length === 0) {
            container.innerHTML = `
                <div class="year-section active">
                    <div style="text-align: center; padding: 4rem; opacity: 0.5;">
                        <i class="fas fa-folder-open" style="font-size: 3rem; margin-bottom: 1rem; color: var(--text-secondary);"></i>
                        <h3>No notes available for this year yet.</h3>
                        <p>Check back later for updates.</p>
                    </div>
                </div>`;
            return;
        }

        // Sort by newest first to get the latest description
        yearNotes.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

        // Group by subjectName
        const subjectsMap = {};
        yearNotes.forEach(note => {
            const subject = note.subjectName || "Unknown Subject";
            if (!subjectsMap[subject]) {
                subjectsMap[subject] = {
                    description: "",
                    pdfs: []
                };
            }
            
            // Since notes are sorted newest first, this picks the latest non-empty description
            if (note.description && !subjectsMap[subject].description) {
                subjectsMap[subject].description = note.description;
            }
            subjectsMap[subject].pdfs.push({
                title: note.pdfTitle,
                link: note.driveLink,
                createdAt: note.createdAt?.seconds || 0
            });
        });

        // Build HTML
        let html = `<div class="year-section active"><div class="subjects-grid">`;
        
        for (const [subjectName, data] of Object.entries(subjectsMap)) {
            // Sort PDFs by creation time
            data.pdfs.sort((a, b) => a.createdAt - b.createdAt);

            let pdfLinksHtml = data.pdfs.map(pdf => `
                <a href="${pdf.link}" target="_blank" class="pdf-link-btn">
                    <div style="display:flex; align-items:center;">
                        <i class="fas fa-file-pdf"></i>
                        <span style="margin-left: 0.5rem;">${pdf.title}</span>
                    </div>
                    <i class="fas fa-external-link-alt" style="font-size:0.8rem; color:var(--text-secondary); margin:0;"></i>
                </a>
            `).join('');

            html += `
                <div class="subject-card">
                    <div class="subject-header">
                        <div class="sub-icon"><i class="fas fa-book"></i></div>
                        <h4>${subjectName}</h4>
                    </div>
                    <p class="subject-desc">${data.description}</p>
                    <div class="pdf-links-container">
                        ${pdfLinksHtml}
                    </div>
                </div>
            `;
        }

        html += `</div></div>`;
        container.innerHTML = html;
    }
});
