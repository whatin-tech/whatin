import { db, collection, getDocs, query, where } from './firebase-config.js';

async function initPlacement() {
    const loadingState = document.getElementById('loadingState');
    const emptyState = document.getElementById('emptyState');
    const placementGrid = document.getElementById('placementGrid');

    try {
        const q = query(collection(db, "resources"), where("category", "==", "placement"));
        const snapshot = await getDocs(q);
        
        loadingState.style.display = 'none';

        if (snapshot.empty) {
            emptyState.style.display = 'block';
            return;
        }

        let docsData = snapshot.docs.map(doc => doc.data());
        // Sort by createdAt descending
        docsData.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

        const cardsHTML = docsData.map(data => {
            return `
                <div class="placement-card pop-scale">
                    <div>
                        <h3>${data.title}</h3>
                        <p>${data.description}</p>
                    </div>
                    <a href="${data.driveLink}" target="_blank" rel="noopener noreferrer" class="btn-premium">
                        View / Download <i class="fas fa-arrow-right" style="margin-left: 8px;"></i>
                    </a>
                </div>
            `;
        }).join('');

        placementGrid.innerHTML = cardsHTML;
        placementGrid.style.display = 'grid';

        // Add mouse tracking for the premium glow effect
        document.querySelectorAll('.placement-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });

    } catch (error) {
        console.error("Error fetching placement content:", error);
        alert("Error loading placement content: " + error.message);
        loadingState.innerHTML = `<i class="fas fa-exclamation-triangle" style="color: #ef4444;"></i> Failed to load content. Please try again later.`;
    }
}

initPlacement();
