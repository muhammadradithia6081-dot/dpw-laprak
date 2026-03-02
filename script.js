// Countdown Timer
const weddingDate = new Date("March 30, 2026 16:00:00").getTime();

const countdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
    document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
    }
}, 1000);

// Map Functionality
const mapContainer = document.getElementById('mapContainer');
const mapLoading = document.getElementById('mapLoading');
const mapError = document.getElementById('mapError');
const mapWrapper = document.getElementById('mapWrapper');
const mapImage = document.getElementById('mapImage');
const retryBtn = document.getElementById('retryMap');

// Map configuration
const mapConfig = {
    imageUrl: 'WhatsApp Image 2026-03-02 at 14.21.54.jpeg',
    zoom: 1,
    minZoom: 0.5,
    maxZoom: 3
};

// Load map with error handling
function loadMap() {
    mapLoading.style.display = 'flex';
    mapError.style.display = 'none';
    mapWrapper.style.display = 'none';
    
    // Simulate loading (in real implementation, use actual image loading)
    setTimeout(() => {
        const img = new Image();
        img.onload = function() {
            mapImage.src = mapConfig.imageUrl;
            mapLoading.style.display = 'none';
            mapWrapper.style.display = 'block';
            mapError.style.display = 'none';
        };
        img.onerror = function() {
            mapLoading.style.display = 'none';
            mapError.style.display = 'flex';
            mapWrapper.style.display = 'none';
        };
        img.src = mapConfig.imageUrl;
    }, 1500); // Simulate loading delay
}

// Retry loading map
if (retryBtn) {
    retryBtn.addEventListener('click', loadMap);
}

// Initial load
loadMap();

// Map zoom functionality
let currentZoom = mapConfig.zoom;
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');
const resetZoomBtn = document.getElementById('resetZoom');

if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
        if (currentZoom < mapConfig.maxZoom) {
            currentZoom += 0.2;
            mapImage.style.transform = `scale(${currentZoom})`;
        }
    });
}

if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
        if (currentZoom > mapConfig.minZoom) {
            currentZoom -= 0.2;
            mapImage.style.transform = `scale(${currentZoom})`;
        }
    });
}

if (resetZoomBtn) {
    resetZoomBtn.addEventListener('click', () => {
        currentZoom = mapConfig.zoom;
        mapImage.style.transform = `scale(${currentZoom})`;
        mapImage.style.left = '0';
        mapImage.style.top = '0';
    });
}

// Pan functionality
let isDragging = false;
let startX, startY;
let translateX = 0, translateY = 0;

if (mapImage) {
    mapImage.addEventListener('mousedown', (e) => {
        if (currentZoom > 1) {
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            mapImage.style.cursor = 'grabbing';
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging && currentZoom > 1) {
            e.preventDefault();
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            
            // Constrain panning
            const maxTranslate = 100 * (currentZoom - 1);
            translateX = Math.min(Math.max(translateX, -maxTranslate), maxTranslate);
            translateY = Math.min(Math.max(translateY, -maxTranslate), maxTranslate);
            
            mapImage.style.transform = `scale(${currentZoom}) translate(${translateX}px, ${translateY}px)`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        mapImage.style.cursor = 'grab';
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission
const rsvpForm = document.getElementById('rsvpForm');
if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            attendance: document.getElementById('attendance').value,
            guests: document.getElementById('guests').value
        };
        
        // Show success message with animation
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '✓ Terkirim!';
        submitBtn.style.background = '#28a745';
        
        setTimeout(() => {
            alert(`Terima kasih ${formData.name}! Konfirmasi kehadiran Anda telah diterima.`);
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 1000);
    });
}

// Form input animation
document.querySelectorAll('.form-group input, .form-group select').forEach(field => {
    field.addEventListener('focus', () => {
        field.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', () => {
        if (!field.value) {
            field.parentElement.classList.remove('focused');
        }
    });
});

// Google Maps integration
const openMapsBtn = document.getElementById('openGoogleMaps');
if (openMapsBtn) {
    openMapsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const destination = encodeURIComponent('Hotel Swiss Pekanbaru');
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
        window.open(mapsUrl, '_blank');
    });
}

// Share location functionality
const shareBtn = document.getElementById('shareLocation');
const shareModal = document.getElementById('shareModal');
const closeModalBtn = document.getElementById('closeModal');
const copyLinkBtn = document.getElementById('copyLink');
const shareLinkInput = document.getElementById('shareLink');

if (shareBtn) {
    shareBtn.addEventListener('click', () => {
        shareModal.classList.add('show');
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        shareModal.classList.remove('show');
    });
}

if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', () => {
        shareLinkInput.select();
        document.execCommand('copy');
        copyLinkBtn.innerHTML = '✓ Tersalin';
        setTimeout(() => {
            copyLinkBtn.innerHTML = 'Salin';
        }, 2000);
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === shareModal) {
        shareModal.classList.remove('show');
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .invitation-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});