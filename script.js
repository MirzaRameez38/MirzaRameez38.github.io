
// DOM Elements
const header = document.querySelector('header');
const skillBars = document.querySelectorAll('.skill-progress');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const themeSwitchMobile = document.getElementById('theme-switch-mobile');
const canvas = document.getElementById('neural-network-canvas');


        document.addEventListener('DOMContentLoaded', function() {
            // Tab functionality
            const tabButtons = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons and contents
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));
                    
                    // Add active class to clicked button
                    button.classList.add('active');
                    
                    // Show corresponding content
                    const tabId = button.getAttribute('data-tab');
                    document.getElementById(tabId).classList.add('active');
                });
            });
            
            // Mobile navigation toggle
  /*          const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
            const nav = document.querySelector('nav');
            
            mobileNavToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                mobileNavToggle.querySelector('i').classList.toggle('fa-bars');
                mobileNavToggle.querySelector('i').classList.toggle('fa-times');
            });*/
        });

     
      


 
// Mobile Menu Toggle


mobileMenuBtn.addEventListener('click', function() {
    console.log('Mobile menu button clicked');
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Animate mobile menu button
    const spans = this.querySelectorAll('span');
    if (this.classList.contains('active')) {
        spans[0].style.transform = 'translateY(9px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-9px) rotate(-45deg)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        
        // Reset mobile menu button
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';

        
    });
});

// Sticky Header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href'); // e.g., "#about"
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault(); // Stop default behavior only if section exists
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Adjust for fixed header if needed
                    behavior: 'smooth' // Smooth scrolling
                });
            } else {
                console.error('Section not found for ID:', targetId);
            }
        });
    });
});

// Neural Network Canvas Animation
function initNeuralNetworkAnimation() {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const isDarkTheme = () => document.documentElement.getAttribute('data-theme') === 'dark';
    
    // Neural network parameters
    const layers = [4, 8, 8, 4]; // Number of neurons per layer
    const neurons = [];
    const connections = [];
    
    // Create neurons
    let xOffset = canvas.width / (layers.length + 1);
    let neuronId = 0;
    
    for (let l = 0; l < layers.length; l++) {
        const layerNeurons = [];
        const yOffset = canvas.height / (layers[l] + 1);
        
        for (let n = 0; n < layers[l]; n++) {
            layerNeurons.push({
                id: neuronId++,
                x: xOffset * (l + 1),
                y: yOffset * (n + 1),
                radius: 4,
                activeState: Math.random(),
                pulseSpeed: 0.01 + Math.random() * 0.02,
            });
        }
        
        neurons.push(layerNeurons);
    }
    
    // Create connections between neurons
    for (let l = 0; l < layers.length - 1; l++) {
        for (let n1 = 0; n1 < neurons[l].length; n1++) {
            for (let n2 = 0; n2 < neurons[l + 1].length; n2++) {
                connections.push({
                    from: neurons[l][n1],
                    to: neurons[l + 1][n2],
                    weight: Math.random(),
                    signalPosition: 0,
                    signalSpeed: 0.005 + Math.random() * 0.015,
                    active: Math.random() > 0.7, // Some connections are initially active
                    activationTimer: Math.random() * 100,
                });
            }
        }
    }
    
    // Animation variables
    let animationId;
    let lastTime = 0;
    
    // Animation function
    function animate(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw connections
        for (const connection of connections) {
            // Update activation state
            connection.activationTimer -= 0.01;
            if (connection.activationTimer <= 0) {
                connection.active = Math.random() > 0.5;
                connection.activationTimer = 50 + Math.random() * 100;
            }
            
            // Only draw and update active connections
            if (connection.active) {
                // Update signal position
                connection.signalPosition += connection.signalSpeed;
                if (connection.signalPosition > 1) {
                    connection.signalPosition = 0;
                }
                
                // Draw connection line
                ctx.beginPath();
                ctx.moveTo(connection.from.x, connection.from.y);
                ctx.lineTo(connection.to.x, connection.to.y);
                
                const lineColor = isDarkTheme() ? 'rgba(108, 99, 255, 0.2)' : 'rgba(0, 112, 243, 0.2)';
                ctx.strokeStyle = lineColor;
                ctx.lineWidth = connection.weight * 2;
                ctx.stroke();
                
                // Draw signal pulse moving along the connection
                const signalX = connection.from.x + (connection.to.x - connection.from.x) * connection.signalPosition;
                const signalY = connection.from.y + (connection.to.y - connection.from.y) * connection.signalPosition;
                
                ctx.beginPath();
                ctx.arc(signalX, signalY, 2, 0, Math.PI * 2);
                const signalColor = isDarkTheme() ? 'rgba(138, 127, 255, 0.9)' : 'rgba(0, 112, 243, 0.9)';
                ctx.fillStyle = signalColor;
                ctx.fill();
            }
        }
        
        // Update and draw neurons
        for (const layer of neurons) {
            for (const neuron of layer) {
                // Update neuron active state (pulsing effect)
                neuron.activeState += neuron.pulseSpeed;
                if (neuron.activeState > 1 || neuron.activeState < 0) {
                    neuron.pulseSpeed *= -1;
                }
                
                // Draw neuron
                ctx.beginPath();
                ctx.arc(neuron.x, neuron.y, neuron.radius + neuron.activeState * 2, 0, Math.PI * 2);
                
                // Gradient for neuron
                const gradient = ctx.createRadialGradient(
                    neuron.x, neuron.y, 0,
                    neuron.x, neuron.y, neuron.radius + neuron.activeState * 2
                );
                
                const primaryColor = isDarkTheme() ? 'rgba(0, 161, 255, 0.8)' : 'rgba(0, 112, 243, 0.8)';
                const secondaryColor = isDarkTheme() ? 'rgba(64, 240, 208, 0.1)' : 'rgba(50, 224, 196, 0.1)';
                
                gradient.addColorStop(0, primaryColor);
                gradient.addColorStop(1, secondaryColor);
                
                ctx.fillStyle = gradient;
                ctx.fill();
            }
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Start animation
    animate(0);
    
    // Cleanup function
    return function cleanup() {
        cancelAnimationFrame(animationId);
    };
}

// Intersection Observer for Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id === 'skills') {
                // Animate skill bars when they come into view
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
            
            // Add animation classes based on section
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

// Observe all sections
sections.forEach(section => {
    observer.observe(section);
});


// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Neural Network Animation
    const cleanupNeural = initNeuralNetworkAnimation();
    
    // Animate skill bars with zero width initially to animate later
    skillBars.forEach(bar => {
        const originalWidth = bar.style.width;
        bar.style.width = '0';
        
        // We'll let the intersection observer handle the animation
    });
    
    // Add some hover interactions
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-icon').style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-icon').style.transform = '';
        });
    });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', cleanupNeural);

    
   
  

});