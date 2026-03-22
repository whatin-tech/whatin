// --- WIDGET 1: LIVE BADGE ---
function BadgeApp() {
    const [count, setCount] = React.useState(2548);
    const [isHovered, setIsHovered] = React.useState(false);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => prev + Math.floor(Math.random() * 5));
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const style = {
        background: isHovered ? 'rgba(0, 212, 255, 0.2)' : 'rgba(0, 212, 255, 0.1)',
        border: '1px solid rgba(0, 212, 255, 0.4)',
        padding: '10px 25px',
        borderRadius: '50px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        margin: '20px auto 30px',
        color: '#00d4ff',
        letterSpacing: '1px',
        fontWeight: '600',
        fontSize: '0.85rem',
        boxShadow: isHovered ? '0 0 15px rgba(0,212,255,0.4)' : '0 0 0px rgba(0,212,255,0)',
        transition: 'all 0.4s ease',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)'
    };

    const dotStyle = {
        width: '8px',
        height: '8px',
        backgroundColor: '#00d4ff',
        borderRadius: '50%',
        animation: 'blink 1.5s infinite',
        boxShadow: '0 0 8px #00d4ff'
    };

    return (
        <div style={style} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div style={dotStyle}></div>
            {count.toLocaleString()} VERIFIED SCHOLARS ONLINE
        </div>
    );
}

// --- WIDGET 2: FIREBASE LIVE RESOURCES ---
function LiveResources() {
    const [resources, setResources] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        let unsubscribe;
        const fetchFB = () => {
            if (!window.firebaseDB) return;
            const { db, collection, onSnapshot, query, limit } = window.firebaseDB;
            
            // We fetch the latest 20 and sort locally to avoid Firestore missing-index errors
            const q = query(collection(db, "resources"), limit(20));
            
            unsubscribe = onSnapshot(q, (snapshot) => {
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Local sort by createdAt
                data.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
                // Only take top 4
                setResources(data.slice(0, 4));
                setLoading(false);
            });
        };

        if (window.firebaseDB) {
            fetchFB();
        } else {
            window.addEventListener('firebaseReady', fetchFB);
        }

        return () => {
            if (unsubscribe) unsubscribe();
            window.removeEventListener('firebaseReady', fetchFB);
        };
    }, []);

    if (loading) return null;
    if (resources.length === 0) return null;

    return (
        <div style={{ marginBottom: '4rem', padding: '0 20px' }}>
            <div style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '2rem'
            }}>
                <h2 style={{ 
                    fontSize: '1.8rem', 
                    fontWeight: '700', 
                    margin: 0,
                    background: 'linear-gradient(90deg, #38bdf8, #6366f1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'gradientShift 3s ease infinite',
                    backgroundSize: '200% 200%'
                }}>
                    <i className="fas fa-satellite-dish" style={{marginRight: '12px', animation: 'pulse 2s infinite', color: '#38bdf8', WebkitTextFillColor: 'initial'}}></i>
                    Live Uploads feed
                </h2>
                <div style={{
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(56, 189, 248, 0.1)',
                    padding: '6px 16px',
                    borderRadius: '50px',
                    animation: 'float 4s ease-in-out infinite'
                }}>
                    <div style={{width: 6, height: 6, borderRadius: '50%', background: '#38bdf8', animation: 'blink 1s infinite'}}></div>
                    Firebase Sync Active
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.5rem'
            }}>
                {resources.map((res, index) => (
                    <ResourceCard key={res.id} data={res} index={index} />
                ))}
            </div>
        </div>
    );
}

function ResourceCard({ data, index }) {
    const [hover, setHover] = React.useState(false);
    
    // Staggered cinematic enter animation
    const cardStyle = {
        background: hover ? 'var(--glass-bg)' : 'rgba(255,255,255,0.02)',
        border: '1px solid',
        borderColor: hover ? 'var(--accent-primary)' : 'var(--glass-border)',
        padding: '2rem 1.5rem',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: hover ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
        backdropFilter: 'blur(20px)',
        opacity: 0,
        animation: `popIn 0.8s cubic-bezier(0.22,1,0.36,1) ${0.1 * index}s forwards`,
        cursor: 'pointer',
        boxShadow: hover ? '0 15px 35px rgba(56, 189, 248, 0.15)' : 'none'
    };

    const iconBg = {
        width: '50px',
        height: '50px',
        background: hover ? 'var(--accent-gradient)' : 'rgba(56, 189, 248, 0.1)',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: hover ? '#fff' : 'var(--accent-primary)',
        fontSize: '1.5rem',
        transition: 'all 0.4s ease',
        transform: hover ? 'rotateY(180deg)' : 'none'
    };

    return (
        <a 
            href={data.link || '#'} 
            target="_blank" 
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={iconBg}>
                        <i className={data.icon || 'fas fa-file-pdf'} style={{ transform: hover ? 'rotateY(180deg)' : 'none' }}></i>
                    </div>
                    <span style={{
                        fontSize: '0.75rem',
                        background: 'rgba(56,189,248,0.1)',
                        color: 'var(--accent-primary)',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontWeight: '600',
                        letterSpacing: '1px'
                    }}>
                        {data.category ? data.category.toUpperCase() : 'NEW'}
                    </span>
                </div>
                
                <div>
                    <h3 style={{ 
                        fontSize: '1.1rem', 
                        margin: '0 0 0.5rem 0',
                        color: hover ? 'var(--accent-primary)' : 'var(--text-primary)',
                        transition: 'color 0.3s ease'
                    }}>
                        {data.title || 'Untitled Document'}
                    </h3>
                    <p style={{ 
                        fontSize: '0.9rem', 
                        color: 'var(--text-secondary)',
                        margin: 0,
                        lineHeight: '1.4'
                    }}>
                        {data.description || 'Verified academic resource.'}
                    </p>
                </div>
                
                <div style={{
                    marginTop: 'auto',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--accent-primary)',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    opacity: hover ? 1 : 0.7,
                    transform: hover ? 'translateX(5px)' : 'none',
                    transition: 'all 0.3s ease'
                }}>
                    Access Now <i className="fas fa-arrow-right"></i>
                </div>
            </div>
        </a>
    );
}

// --- MOUNTING ---
const badgeRoot = document.getElementById('react-hero-widget');
if (badgeRoot) {
    ReactDOM.createRoot(badgeRoot).render(<BadgeApp />);
}

const fbRoot = document.getElementById('react-latest-resources');
if (fbRoot) {
    ReactDOM.createRoot(fbRoot).render(<LiveResources />);
}
