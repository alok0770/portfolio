// Portfolio Interactive Engine & Theme Generation

// 1. Theme Switcher (Dark / Light Mode Generation)
function setupThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const html = document.documentElement;

  // Check saved preference or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

  if (savedTheme === 'light') {
    html.classList.remove('dark');
    html.classList.add('light');
    if (themeIcon) themeIcon.setAttribute('data-lucide', 'moon');
  } else {
    html.classList.remove('light');
    html.classList.add('dark');
    if (themeIcon) themeIcon.setAttribute('data-lucide', 'sun');
  }
  
  if (window.lucide) lucide.createIcons();

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isCurrentlyDark = html.classList.contains('dark');

      if (isCurrentlyDark) {
        html.classList.remove('dark');
        html.classList.add('light');
        localStorage.setItem('portfolio-theme', 'light');
        if (themeIcon) themeIcon.setAttribute('data-lucide', 'moon');
        showToast('Switched to Light Mode');
      } else {
        html.classList.remove('light');
        html.classList.add('dark');
        localStorage.setItem('portfolio-theme', 'dark');
        if (themeIcon) themeIcon.setAttribute('data-lucide', 'sun');
        showToast('Switched to Obsidian Blue Dark Mode');
      }

      if (window.lucide) lucide.createIcons();
    });
  }
}

// 2. Toast Notification Utility
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3000);
}

// 3. Email Copying Functionality
function setupEmailCopy() {
  const email = 'alokrana0770@gmail.com';

  const copyHeroBtn = document.getElementById('copy-email-hero');
  const copyContactBtn = document.getElementById('copy-email-btn');

  const copyAction = async () => {
    try {
      await navigator.clipboard.writeText(email);
      showToast('Email address copied to clipboard!');
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast('Email address copied to clipboard!');
    }
  };

  if (copyHeroBtn) copyHeroBtn.addEventListener('click', copyAction);
  if (copyContactBtn) copyContactBtn.addEventListener('click', copyAction);
}

// 4. Mobile Navigation Menu
function setupMobileMenu() {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// 5. Project Category Filtering
function setupProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cardWrappers = document.querySelectorAll('#projects-grid .card-3d-wrap');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-500/20', 'active');
        b.classList.add('text-zinc-400');
      });
      btn.classList.add('bg-blue-600', 'text-white', 'shadow-lg', 'shadow-blue-500/20', 'active');
      btn.classList.remove('text-zinc-400');

      const filter = btn.getAttribute('data-filter');

      cardWrappers.forEach(wrap => {
        const category = wrap.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          wrap.style.display = 'block';
        } else {
          wrap.style.display = 'none';
        }
      });
    });
  });
}

// 6. Project Quick View Modal Details (Alok Rana's Actual Projects & Practice)
// 6. Project Quick View Modal Details (Senior Engineer Architecture Breakdown)
const projectData = {
  corechat: {
    title: 'ChatSphere (CoreChat v2.0) — Zero-Dependency Concurrent Java Messaging Engine',
    category: 'Concurrent Systems & Zero-Framework Web Server',
    badge: '🏆 Flagship Project',
    description: 'A production-grade, full-stack real-time 1-on-1 messaging platform built from scratch in 100% pure Core Java & Java 8 with zero external web dependencies (no Spring Boot, no external HTTP daemon). Direct socket multiplexing handled via native HttpServer, coupled with Google Gemini LLM copilot streaming and atomic transaction logs.',
    highlights: [
      'Zero-Dependency Micro-Server: Engineered directly on com.sun.net.httpserver.HttpServer for sub-millisecond route dispatch and static asset serving.',
      'Native Google Gemini AI Integration: Direct RESTful pipeline to Google Gemini API enabling context-aware automated @SphereAI responses.',
      'Thread-Safe Concurrency: FixedThreadPool executor model managing simultaneous client polling threads without race conditions or memory leaks.',
      'Atomic Persistence Engine: Crash-safe data serialization for messages and users using synchronized atomic batch writes.',
      'Low-Latency UI & Web Audio: Responsive glassmorphic client interface with Web Audio API chime notifications and dynamic 12-hour timestamps.',
      'Super Admin Audit Console: Real-time administrative dashboard for active user tracking, system telemetry, and moderation (@alokrana).'
    ],
    tech: ['Core Java (Java SE)', 'Java 8', 'Native HttpServer (Zero Frameworks)', 'Google Gemini AI API', 'REST API', 'Concurrency & Threading', 'Web Audio API', 'Docker'],
    github: 'https://github.com/alok0770/ChatSphere',
    live: 'https://chatsphere-d261.onrender.com',
    liveLabel: 'Launch Live Demo'
  },
  librarymanagement: {
    title: 'Library Resource & Transaction Engine — Modular Java OOP Architecture',
    category: 'Enterprise Core Java & State Management',
    badge: 'Systems Architecture',
    description: 'An institutional resource and circulation engine designed in Java. Built upon strict OOP encapsulation, defensive memory management, and robust Scanner fault-tolerance against runtime exceptions.',
    highlights: [
      'Encapsulated Domain Model: Strict separation of concerns (Book, Member, Transaction) adhering to Single Responsibility and DRY principles.',
      'Defensive Input Sanitization: Comprehensive try-catch exception handling around Scanner streams preventing InputMismatchException panics.',
      'Duplicate Integrity Validation: O(N) constraint checking preventing duplicate student roll numbers and asset IDs.',
      'Scalability Roadmap: Relational database abstraction layer and file-based state serialization in active development.'
    ],
    tech: ['Java SE', 'OOP Architecture', 'Collections (ArrayList)', 'Defensive Exception Handling', 'Modular Systems Design'],
    github: 'https://github.com/alok0770/library-management-system-java',
    live: '#',
    liveLabel: 'In Active Development'
  },
  cafediscovery: {
    title: 'Uttarkashi CafeHub — Distributed Regional Commerce & Ordering Architecture',
    category: 'Distributed Services & Relational Data Architecture',
    badge: 'System Architecture & DB Modeling',
    description: 'A regional commerce engine and database schema blueprint unifying local merchants across Uttarkashi. Designed for high-concurrency order dispatching, low-latency catalog indexing, and zero-commission direct merchant fulfillment.',
    highlights: [
      'Relational Schema Normalization: Optimized 3NF database schema modeling menus, modifiers, order lifecycle, and merchant schedules.',
      'Direct-to-Merchant Dispatch: Decoupled order event pipeline enabling merchants to fulfill orders without aggregator margin cuts.',
      'High-Throughput Backend Blueprint: Architectural blueprint for Spring Boot micro-services, connection pooling (HikariCP), and transactional consistency.',
      'Hyperlocal Impact: Purpose-engineered to empower regional culinary businesses in Uttarakhand through bespoke digital infrastructure.'
    ],
    tech: ['System Architecture', 'Relational DB Modeling (3NF)', 'Spring Boot Blueprint', 'RESTful API Contracts', 'Responsive Web UI'],
    github: 'https://github.com/alok0770',
    live: '#',
    liveLabel: 'Concept & Architecture'
  },
  dsalab: {
    title: 'Algorithmic Problem Solving & Asymptotic Optimization in Java',
    category: 'Computational Complexity & Data Structures',
    badge: 'LeetCode & Competitive Logic',
    description: 'Continuous algorithmic engineering and computational complexity optimization in Java. Implementing sub-linear search, dynamic programming, sliding window patterns, and graph traversals on LeetCode with rigorous Big-O space and time verification.',
    highlights: [
      'Asymptotic Complexity Optimization: Every solution verified for minimal Big-O time and space bounds to beat 90%+ runtime percentiles.',
      'Core Data Structures: Advanced manipulation of dynamic arrays, hash tables, heaps, linked lists, trees, and cyclic buffers.',
      'Java 8 Functional Pipelines: Leveraging Streams, Lambdas, and custom fast Comparators for high-throughput in-memory sorting.',
      'Defensive Edge Case Analysis: Exhaustive stress testing against integer overflows, off-by-one bounds, and null invariants.'
    ],
    tech: ['Java SE', 'Data Structures', 'Algorithmic Optimization', 'Asymptotic Big-O Analysis', 'LeetCode', 'GitHub'],
    github: 'https://github.com/alok0770',
    leetcode: 'https://leetcode.com/u/Alok_0770/',
    live: 'https://leetcode.com/u/Alok_0770/',
    liveLabel: 'LeetCode Profile'
  }
};

function openModal(projectId) {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const project = projectData[projectId];

  if (!modal || !modalContent || !project) return;

  const isLiveDemoAvailable = project.live && project.live !== '#';

  modalContent.innerHTML = `
    <div class="flex items-center gap-2 mb-1">
      <span class="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-blue-500/20 text-blue-400 border border-blue-500/30">
        ${project.badge}
      </span>
      <span class="text-xs text-zinc-400 font-mono">${project.category}</span>
    </div>

    <h3 class="text-2xl font-bold text-white dark:text-white light:text-zinc-900 tracking-tight">${project.title}</h3>

    <p class="text-zinc-300 dark:text-zinc-300 light:text-zinc-600 text-sm leading-relaxed">${project.description}</p>

    <div class="space-y-2 pt-2">
      <h4 class="text-xs font-mono uppercase tracking-wider text-blue-400">Key Architectural Highlights:</h4>
      <ul class="space-y-1.5 text-xs text-zinc-300 dark:text-zinc-300 light:text-zinc-700">
        ${project.highlights.map(h => `<li class="flex items-start gap-2"><span class="text-blue-400 mt-0.5">•</span><span>${h}</span></li>`).join('')}
      </ul>
    </div>

    <div class="space-y-2 pt-2">
      <h4 class="text-xs font-mono uppercase tracking-wider text-blue-400">Technologies & Concepts:</h4>
      <div class="flex flex-wrap gap-1.5 text-xs font-mono">
        ${project.tech.map(t => `<span class="px-2.5 py-1 rounded bg-zinc-900/90 dark:bg-slate-900 light:bg-slate-100 border border-zinc-800 dark:border-slate-800 light:border-slate-300 text-zinc-300 dark:text-zinc-300 light:text-zinc-800">${t}</span>`).join('')}
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-3 pt-4 border-t border-zinc-800 dark:border-slate-800 light:border-slate-200">
      ${project.leetcode ? `
        <a href="${project.leetcode}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-amber-500/10 group">
          <svg class="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.483.438a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.874 5.874 0 0 0 .349 1.017 5.938 5.938 0 0 0 4.818 3.862 5.86 5.86 0 0 0 3.616-.706l4.23-2.572a1.358 1.358 0 0 0 .547-.648 1.353 1.353 0 0 0-.74-1.748 1.374 1.374 0 0 0-1.747.74l-4.23 2.572a3.17 3.17 0 0 1-2.204.385 3.205 3.205 0 0 1-2.602-2.081 3.208 3.208 0 0 1-.024-2.169 3.168 3.168 0 0 1 1.048-1.524l3.855-4.126 5.405-5.787a1.377 1.377 0 0 0-.022-1.921 1.37 1.37 0 0 0-.961-.438z" fill="#FFA116"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.924 10.378l-5.69 3.456a1.368 1.368 0 0 0-.547.648 1.356 1.356 0 0 0 .74 1.748 1.377 1.377 0 0 0 1.748-.74l5.689-3.456a1.375 1.375 0 0 0-.74-2.456 1.36 1.36 0 0 0-1.2.8z" fill="#E7A41E"/>
          </svg>
          <span>LeetCode Profile</span>
          <i data-lucide="external-link" class="w-3 h-3"></i>
        </a>
      ` : ''}
      ${(isLiveDemoAvailable && !project.leetcode) ? `
        <a href="${project.live}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/25">
          <i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i>
          <span>${project.liveLabel}</span>
          <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
        </a>
      ` : (!project.leetcode ? `
        <span class="px-3.5 py-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-medium flex items-center gap-1.5">
          <i data-lucide="info" class="w-3.5 h-3.5"></i>
          <span>${project.liveLabel || 'Java Application'}</span>
        </span>
      ` : '')}
      <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-slate-900 light:bg-slate-100 hover:bg-zinc-800 text-white dark:text-white light:text-zinc-900 border border-zinc-700/80 dark:border-slate-700 light:border-slate-300 text-xs font-medium flex items-center gap-2 transition-all group">
        <svg class="w-4 h-4 shrink-0 fill-current text-white dark:text-white light:text-zinc-900 transition-transform group-hover:scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
        <span>GitHub Repository</span>
      </a>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.classList.add('modal-open');
  if (window.lucide) lucide.createIcons();
}

function closeModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.classList.remove('modal-open');
}

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
  const modal = document.getElementById('project-modal');
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal on Escape key press (Keyboard accessibility)
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// 7. Live IST Time Clock in Footer (Optimized for battery & tab visibility)
function updateLiveTime() {
  if (document.hidden) return;
  const timeEl = document.getElementById('live-ist-time');
  if (!timeEl) return;

  const now = new Date();
  const options = {
    timeZone: 'Asia/Kolkata',
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
  };
  timeEl.textContent = new Intl.DateTimeFormat('en-US', options).format(now);
}

// 8. Contact Form Handling (Web3Forms API + Direct Mailto Fallback)
function setupContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const regarding = document.getElementById('project-type')?.value;
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.');
      return;
    }

    if (submitBtn && submitText) {
      submitBtn.disabled = true;
      submitText.textContent = 'Sending message...';
    }

    const key = document.getElementById('web3forms-key')?.value.trim();

    if (key) {
      try {
        const formData = new FormData(form);
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        if (data.success) {
          showToast('Message sent directly to Alok!');
          form.reset();
        } else {
          fallbackMailto(name, email, regarding, message);
        }
      } catch (err) {
        fallbackMailto(name, email, regarding, message);
      }
    } else {
      // Direct mailto fallback ensures no message is ever lost
      fallbackMailto(name, email, regarding, message);
    }

    if (submitBtn && submitText) {
      submitBtn.disabled = false;
      submitText.textContent = 'Send Message';
    }
  });
}

function fallbackMailto(name, email, regarding, message) {
  const subject = encodeURIComponent(`[Portfolio Inquiry] ${regarding} from ${name}`);
  const body = encodeURIComponent(`Hi Alok,\n\nName: ${name}\nEmail: ${email}\nRegarding: ${regarding}\n\nMessage:\n${message}\n\nSent from your portfolio website.`);
  showToast('Opening your email app to send message...');
  window.location.href = `mailto:alokrana0770@gmail.com?subject=${subject}&body=${body}`;
}

// 9. Interactive 3D Tilt Cards with Dynamic Specular Glare & Tactile Feedback
function setup3DTiltCards() {
  const cards = document.querySelectorAll('.card-3d');
  if (!cards.length) return;

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Luminous click ripple generator
  const createCardRipple = (card, clientX, clientY) => {
    const rect = card.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.className = 'card-ripple';
    const size = Math.max(rect.width, rect.height) * 1.4;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    card.appendChild(ripple);
    setTimeout(() => {
      ripple.remove();
    }, 550);
  };

  cards.forEach(card => {
    let bounds = null;

    // Tactile Click Response & Card-Level Modal Trigger
    card.addEventListener('click', (e) => {
      // Create ripple effect at click coordinates
      createCardRipple(card, e.clientX, e.clientY);

      // If project card with data-modal and click wasn't on a button or link, open modal
      const modalId = card.getAttribute('data-modal');
      if (modalId && !e.target.closest('a, button')) {
        openModal(modalId);
      }
    });

    if (isTouchDevice) {
      // Touch devices: Provide sleek tactile active response without interfering with native page scrolling
      card.addEventListener('touchstart', (e) => {
        card.classList.add('card-pressed');
        if (e.touches && e.touches[0]) {
          const touch = e.touches[0];
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mouse-x', `${touch.clientX - rect.left}px`);
          card.style.setProperty('--mouse-y', `${touch.clientY - rect.top}px`);
        }
      }, { passive: true });

      const removePressed = () => {
        setTimeout(() => {
          card.classList.remove('card-pressed');
        }, 160);
      };

      card.addEventListener('touchend', removePressed, { passive: true });
      card.addEventListener('touchcancel', removePressed, { passive: true });
      return;
    }

    // Desktop Mouse 3D Tilt & Specular Light Physics
    const onMouseEnter = () => {
      bounds = card.getBoundingClientRect();
    };

    const onMouseMove = (e) => {
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const normX = (mouseX / bounds.width - 0.5) * 2; // -1 to 1
      const normY = (mouseY / bounds.height - 0.5) * 2; // -1 to 1

      // Refined ergonomic tilt physics: max 6.5deg
      const rotateX = -normY * 6.5;
      const rotateY = normX * 6.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.018, 1.018, 1.018)`;
      card.style.setProperty('--mouse-x', `${mouseX}px`);
      card.style.setProperty('--mouse-y', `${mouseY}px`);
    };

    const onMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      bounds = null;
    };

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
  });
}

// Initialize everything on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  setupEmailCopy();
  setupMobileMenu();
  setupProjectFilters();
  setupContactForm();
  setup3DTiltCards();

  // Clock
  updateLiveTime();
  setInterval(updateLiveTime, 1000);
});
