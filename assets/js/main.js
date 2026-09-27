/**
 * Main JavaScript for Crown Care Dental Clinic & Implant Center
 * Handles interactive booking modal, WhatsApp pre-filled messaging,
 * mobile drawer menu, sticky navbar, on-page contact form, and smooth navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Set current year in footers
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Set minimum date for appointment pickers to today
  const today = new Date().toISOString().split('T')[0];
  const modalDateInput = document.getElementById('appointmentDate');
  if (modalDateInput) {
    modalDateInput.min = today;
    modalDateInput.value = today;
  }
  const contactDateInput = document.getElementById('cpDate');
  if (contactDateInput) {
    contactDateInput.min = today;
    contactDateInput.value = today;
  }

  // Sticky Navbar Scroll Effect
  const navbar = document.getElementById('mainNav');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.classList.add('shadow-md');
        navbar.classList.replace('bg-white/90', 'bg-white/95');
      } else {
        navbar.classList.remove('shadow-md');
        navbar.classList.replace('bg-white/95', 'bg-white/90');
      }
    });
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Modal Logic
  const appointmentModal = document.getElementById('appointmentModal');
  const appointmentForm = document.getElementById('appointmentForm');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalServiceSelect = document.getElementById('appointmentService');

  window.openAppointmentModal = function(preselectedService = '') {
    if (appointmentModal) {
      if (preselectedService && modalServiceSelect) {
        modalServiceSelect.value = preselectedService;
      }
      appointmentModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        appointmentModal.querySelector('.modal-content')?.classList.remove('scale-95', 'opacity-0');
      }, 10);
    }
  };

  window.closeAppointmentModal = function() {
    if (appointmentModal) {
      const content = appointmentModal.querySelector('.modal-content');
      if (content) {
        content.classList.add('scale-95', 'opacity-0');
      }
      setTimeout(() => {
        appointmentModal.classList.add('hidden');
        document.body.style.overflow = '';
      }, 200);
    }
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeAppointmentModal);
  }

  if (appointmentModal) {
    appointmentModal.addEventListener('click', (e) => {
      if (e.target === appointmentModal) {
        closeAppointmentModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && appointmentModal && !appointmentModal.classList.contains('hidden')) {
      closeAppointmentModal();
    }
  });

  // Handle Modal Appointment Form Submission -> WhatsApp Link
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('patientName')?.value.trim();
      const phone = document.getElementById('patientPhone')?.value.trim();
      const service = document.getElementById('appointmentService')?.value || 'General Consultation';
      const date = document.getElementById('appointmentDate')?.value || '';
      const timeSlot = document.getElementById('appointmentSlot')?.value || 'Morning (10:00 AM - 1:30 PM)';
      const notes = document.getElementById('appointmentNotes')?.value.trim() || 'None';

      if (!name || !phone) {
        alert('Please provide your name and phone number.');
        return;
      }

      dispatchWhatsAppAppointment({ name, phone, service, date, timeSlot, notes });

      closeAppointmentModal();
      appointmentForm.reset();
      showConfirmationToast(`Thank you ${name}! WhatsApp opened to confirm your booking with Dr. Aasawari Rajpure.`);
    });
  }

  // Handle On-Page Contact Form Submission (contact.html)
  const contactPageForm = document.getElementById('contactPageForm');
  if (contactPageForm) {
    contactPageForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('cpName')?.value.trim();
      const phone = document.getElementById('cpPhone')?.value.trim();
      const service = document.getElementById('cpService')?.value || 'General Consultation';
      const date = document.getElementById('cpDate')?.value || '';
      const timeSlot = document.getElementById('cpSlot')?.value || 'Morning (10:00 AM - 1:30 PM)';
      const notes = document.getElementById('cpNotes')?.value.trim() || 'None';

      if (!name || !phone) {
        alert('Please provide your name and phone number.');
        return;
      }

      dispatchWhatsAppAppointment({ name, phone, service, date, timeSlot, notes });

      contactPageForm.reset();
      showConfirmationToast(`Thank you ${name}! WhatsApp opened to confirm your visit with Dr. Aasawari Rajpure.`);
    });
  }

  // WhatsApp Message Dispatcher
  function dispatchWhatsAppAppointment({ name, phone, service, date, timeSlot, notes }) {
    const clinicPhone = '917448225046';
    const messageText = 
`🦷 *Appointment Request - Crown Care Dental Clinic*
━━━━━━━━━━━━━━━━━━━━
👤 *Patient Name:* ${name}
📞 *Contact Number:* ${phone}
🩺 *Service Required:* ${service}
📅 *Preferred Date:* ${date}
⏰ *Time Slot:* ${timeSlot}
📝 *Notes / Concerns:* ${notes}
━━━━━━━━━━━━━━━━━━━━
_Submitted via Crown Care Dental Clinic Website_`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${clinicPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }

  // Toast Notification Helper
  function showConfirmationToast(message) {
    let toast = document.getElementById('confirmationToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'confirmationToast';
      toast.className = 'fixed bottom-20 right-5 z-50 bg-[#3D1A5B] text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-[#D4AF37] max-w-sm transition-all duration-300 opacity-0 transform translate-y-4';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p class="text-sm font-medium leading-snug">${message}</p>
    `;

    setTimeout(() => {
      toast.classList.remove('opacity-0', 'translate-y-4');
    }, 50);

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-4');
    }, 5500);
  }
});
