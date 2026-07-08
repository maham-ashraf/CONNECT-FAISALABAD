/* ============================================
   CONNECT FAISALABAD - Admin Dashboard JS
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', function () {

  // ===== SIDEBAR TOGGLE (Mobile) =====
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
    });
  }

  // ===== DROPDOWN TOGGLES =====
  function setupDropdown(triggerId, dropdownId) {
    const trigger = document.getElementById(triggerId);
    const dropdown = document.getElementById(dropdownId);
    if (!trigger || !dropdown) return;

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      document.querySelectorAll('.header-dropdown.open, .profile-dropdown.open').forEach(function (el) {
        if (el.id !== dropdownId) el.classList.remove('open');
      });
      dropdown.classList.toggle('open');
    });

    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target) && !trigger.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }

  setupDropdown('notifBtn', 'notifDropdown');
  setupDropdown('msgBtn', 'msgDropdown');
  setupDropdown('profileBtn', 'profileDropdown');

  // ===== DATE DISPLAY =====
  const dateEl = document.getElementById('currentDate');
  if (dateEl) {
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    dateEl.textContent = now.toLocaleDateString('en-US', options);
  }

  // ===== SEARCH SUGGESTIONS =====
  const searchInputs = document.querySelectorAll('.header-search input');
  searchInputs.forEach(function (input) {
    input.addEventListener('input', function () {
      let container = this.closest('.header-search');
      let existing = container.querySelector('.search-suggestions');
      if (this.value.trim().length > 0) {
        if (!existing) {
          existing = document.createElement('div');
          existing.className = 'search-suggestions';
          existing.style.cssText =
            'position:absolute;top:100%;left:0;right:0;background:var(--admin-card);border:1px solid var(--admin-border);border-radius:var(--admin-radius-sm);box-shadow:var(--admin-shadow-lg);z-index:99999;margin-top:4px;overflow:hidden;';
          container.style.position = 'relative';
          container.appendChild(existing);
        }
        const suggestions = [
          'TechVista Solutions', 'Spice Bazaar Restaurant', 'Al-Faisal Medical City',
          'GC University', 'Software Houses', 'Restaurants', 'Hospitals'
        ].filter(function (s) { return s.toLowerCase().includes(this.value.toLowerCase()); }.bind(this));
        if (suggestions.length) {
          existing.innerHTML = suggestions.map(function (s) {
            return '<div class="suggestion-item" style="padding:8px 12px;font-size:0.8rem;cursor:pointer;border-bottom:1px solid var(--admin-border);display:flex;align-items:center;gap:8px;color:var(--admin-text-secondary);"><i class="fas fa-search" style="font-size:0.7rem;color:var(--admin-text-muted);"></i>' + s + '</div>';
          }).join('');
          existing.querySelectorAll('.suggestion-item').forEach(function (item) {
            item.addEventListener('click', function () {
              input.value = this.textContent.trim();
              existing.style.display = 'none';
            });
            item.addEventListener('mouseenter', function () { this.style.background = 'rgba(217,119,6,0.04)'; });
            item.addEventListener('mouseleave', function () { this.style.background = ''; });
          });
          existing.style.display = 'block';
        } else {
          existing.style.display = 'none';
        }
      } else {
        if (existing) existing.style.display = 'none';
      }
    });
  });

  // ===== TOAST SYSTEM =====
  window.showAdminToast = function (type, title, message) {
    let container = document.querySelector('.admin-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'admin-toast-container';
      container.style.cssText =
        'position:fixed;bottom:24px;right:24px;z-index:99999;display:flex;flex-direction:column;gap:8px;';
      document.body.appendChild(container);
    }
    const icons = {
      success: 'fa-check-circle', error: 'fa-times-circle',
      warning: 'fa-exclamation-circle', info: 'fa-info-circle'
    };
    const colors = {
      success: '#16A34A', error: '#DC2626', warning: '#F59E0B', info: '#0EA5E9'
    };
    const toast = document.createElement('div');
    toast.style.cssText =
      'display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #E7E5E4;border-radius:10px;padding:12px 16px;min-width:300px;max-width:420px;box-shadow:0 12px 40px rgba(0,0,0,0.1);animation:slideInRight 0.3s ease forwards;border-left:3px solid ' + colors[type] + ';';
    toast.innerHTML =
      '<div style="color:' + colors[type] + ';font-size:1.1rem;"><i class="fas ' + (icons[type] || icons.info) + '"></i></div>' +
      '<div style="flex:1;"><strong style="display:block;font-size:0.82rem;font-weight:600;">' + title + '</strong><span style="display:block;font-size:0.75rem;color:#57534E;">' + message + '</span></div>' +
      '<button onclick="this.parentElement.remove()" style="background:none;border:none;color:#78716C;cursor:pointer;font-size:0.85rem;"><i class="fas fa-times"></i></button>';
    container.appendChild(toast);
    setTimeout(function () {
      toast.style.animation = 'slideOutRight 0.3s ease forwards';
      setTimeout(function () { if (toast.parentElement) toast.remove(); }, 300);
    }, 4000);
  };

  // ===== MODAL SYSTEM =====
  window.openAdminModal = function (config) {
    let backdrop = document.querySelector('.modal-admin-backdrop');
    let modal = document.querySelector('.modal-admin');
    if (!backdrop || !modal) {
      backdrop = document.createElement('div');
      backdrop.className = 'modal-admin-backdrop';
      modal = document.createElement('div');
      modal.className = 'modal-admin';
      if (config.sm) modal.classList.add('modal-admin-sm');
      document.body.appendChild(backdrop);
      document.body.appendChild(modal);
    }
    modal.classList.remove('modal-admin-sm');
    if (config.sm) modal.classList.add('modal-admin-sm');
    modal.innerHTML =
      '<div class="modal-admin-header"><h5>' + (config.title || 'Modal') + '</h5><button class="modal-admin-close"><i class="fas fa-times"></i></button></div>' +
      '<div class="modal-admin-body">' + (config.body || '') + '</div>' +
      '<div class="modal-admin-footer">' +
        (config.buttons || '<button class="btn btn-accent rounded-pill px-3 modal-confirm-btn" style="background:linear-gradient(135deg,#D97706,#EA580C);color:#fff;border:none;padding:8px 20px;font-size:0.82rem;font-weight:600;border-radius:8px;cursor:pointer;">OK</button>') +
      '</div>';

    function closeModal() {
      backdrop.classList.remove('open');
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
    modal.querySelector('.modal-admin-close').addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    const confirmBtn = modal.querySelector('.modal-confirm-btn');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', function () {
        if (config.onConfirm) config.onConfirm();
        closeModal();
      });
    }
    backdrop.classList.add('open');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  // ===== SIDEBAR ACTIVE STATE =====
  document.querySelectorAll('.sidebar-item').forEach(function (item) {
    item.addEventListener('click', function () {
      // Allow navigation, active state set by page
    });
  });

  // ===== TABLE CHECKBOX =====
  document.querySelectorAll('.table-dash .cb-parent').forEach(function (cb) {
    cb.addEventListener('change', function () {
      const allChecked = Array.from(document.querySelectorAll('.table-dash .cb-parent')).every(function (c) { return c.checked; });
      const masterCb = document.querySelector('.table-dash .cb-master');
      if (masterCb) masterCb.checked = allChecked;
    });
  });
  const masterCb = document.querySelector('.table-dash .cb-master');
  if (masterCb) {
    masterCb.addEventListener('change', function () {
      document.querySelectorAll('.table-dash .cb-parent').forEach(function (c) { c.checked = masterCb.checked; });
    });
  }

  // ===== ADDITIONAL: Style inject for keyframes =====
  const styleSheet = document.createElement('style');
  styleSheet.textContent =
    '@keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } } ' +
    '@keyframes slideOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }';
  document.head.appendChild(styleSheet);

  console.log('%c Connect Faisalabad Admin 🚀', 'font-size:18px; font-weight:bold; color:#D97706;');
  console.log('%c Enterprise Dashboard Active', 'font-size:12px; color:#57534E;');
});
