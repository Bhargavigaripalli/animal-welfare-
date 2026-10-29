/**
 * PAWSHAVEN - Interactive Donation Modal & Impact Calculator Logic
 */
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const modal = document.getElementById('donation-modal');
  const modalClose = document.getElementById('donation-modal-close');
  const donateTriggers = document.querySelectorAll('.trigger-donation-modal');
  const donationForm = document.getElementById('donation-form');
  const successView = document.getElementById('donation-success-view');
  const formView = document.getElementById('donation-form-view');

  // Frequency buttons
  const freqButtons = document.querySelectorAll('.freq-btn');
  let selectedFrequency = 'one-time';

  // Preset donation buttons
  const presetButtons = document.querySelectorAll('.donation-choice-btn');
  const customInput = document.getElementById('custom-donation-amount');
  let selectedAmount = 50;

  // Impact Calculator elements
  const impactSlider = document.getElementById('impact-slider');
  const impactVal = document.getElementById('impact-val');
  const impactOutcomeTitle = document.getElementById('impact-outcome-title');
  const impactOutcomeDesc = document.getElementById('impact-outcome-desc');
  const impactPresetPills = document.querySelectorAll('.impact-preset-pill');
  const impactDonateBtn = document.getElementById('impact-donate-btn');

  // Campaign Title in Modal
  const modalCauseName = document.getElementById('modal-cause-name');

  // 1. Open Donation Modal
  function openDonationModal(options = {}) {
    if (!modal) return;

    // Reset views
    if (formView) formView.style.display = 'block';
    if (successView) successView.style.display = 'none';

    // Set Cause Name
    if (modalCauseName) {
      modalCauseName.textContent = options.cause || 'Emergency Animal Rescue & Care Fund';
    }

    // Set Initial Amount if specified
    if (options.amount) {
      setDonationAmount(options.amount);
    } else {
      setDonationAmount(50);
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // 2. Close Donation Modal
  function closeDonationModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeDonationModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeDonationModal();
      }
    });
  }

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeDonationModal();
    }
  });

  // Close modal on browser back / pageshow navigation
  window.addEventListener('pageshow', closeDonationModal);
  window.addEventListener('popstate', closeDonationModal);

  // Attach triggers
  donateTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.classList.contains('action-to-404') || btn.getAttribute('href') === '404.html' || btn.closest('.action-to-404')) {
        return;
      }
      e.preventDefault();
      const amount = btn.getAttribute('data-donate-amount');
      const cause = btn.getAttribute('data-campaign-title');
      openDonationModal({ amount: amount ? parseInt(amount, 10) : 50, cause });
    });
  });

  // 3. Frequency Toggle
  freqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      freqButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedFrequency = btn.getAttribute('data-freq') || 'one-time';

      const matchBadge = document.getElementById('matching-gift-badge');
      if (matchBadge) {
        if (selectedFrequency === 'monthly') {
          matchBadge.style.display = 'inline-flex';
        } else {
          matchBadge.style.display = 'none';
        }
      }
    });
  });

  // 4. Amount Selection
  function setDonationAmount(amt) {
    selectedAmount = amt;
    presetButtons.forEach(btn => {
      const val = parseInt(btn.getAttribute('data-amount'), 10);
      if (val === amt) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (customInput) {
      customInput.value = amt;
    }
  }

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const amt = parseInt(btn.getAttribute('data-amount'), 10);
      setDonationAmount(amt);
    });
  });

  if (customInput) {
    customInput.addEventListener('input', () => {
      const val = parseInt(customInput.value, 10);
      if (!isNaN(val) && val > 0) {
        selectedAmount = val;
        presetButtons.forEach(btn => {
          if (parseInt(btn.getAttribute('data-amount'), 10) === val) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
      }
    });
  }

  // 5. Impact Calculator
  const impactTiers = [
    {
      amount: 15,
      title: '🥣 14 Meals & Preventive Deworming',
      desc: 'Feeds 2 malnourished stray puppies for an entire week and provides vital parasite deworming tablets.'
    },
    {
      amount: 35,
      title: '🩺 Essential Vaccinations & Checkup',
      desc: 'Funds full core vaccinations (Rabies, Parvo, Distemper) and microchipping for an abandoned rescue animal.'
    },
    {
      amount: 75,
      title: '🩹 Emergency Trauma & Pain Relief',
      desc: 'Covers emergency ambulance rescue response, sterile wound dressing, IV antibiotics, and 24-hr veterinary observation.'
    },
    {
      amount: 150,
      title: '✂️ Spay/Neuter & Recovery Kit',
      desc: 'Prevents homelessness for generations with full spay/neuter surgery, postoperative pain meds, and a cozy heated recovery bed.'
    },
    {
      amount: 300,
      title: '🦴 Orthopedic Surgery & X-Rays',
      desc: 'Sponsors full orthopedic surgery for a road accident victim, including digital x-rays, bone pinning, and physical therapy.'
    },
    {
      amount: 500,
      title: '🏡 Sanctuary Kennel Sponsorship (1 Month)',
      desc: 'Full sponsorship of an intensive sanctuary suite with daily high-protein meals, vet rounds, heating, and enrichment toys for 30 days.'
    }
  ];

  function updateImpact(amount) {
    if (impactVal) impactVal.textContent = amount;

    // Find closest tier
    let tier = impactTiers[0];
    for (let i = 0; i < impactTiers.length; i++) {
      if (amount >= impactTiers[i].amount) {
        tier = impactTiers[i];
      }
    }

    if (impactOutcomeTitle) impactOutcomeTitle.textContent = tier.title;
    if (impactOutcomeDesc) impactOutcomeDesc.textContent = tier.desc;

    // Update preset pills
    impactPresetPills.forEach(pill => {
      const val = parseInt(pill.getAttribute('data-val'), 10);
      if (val === amount) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  if (impactSlider) {
    impactSlider.addEventListener('input', (e) => {
      updateImpact(parseInt(e.target.value, 10));
    });
  }

  impactPresetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const val = parseInt(pill.getAttribute('data-val'), 10);
      if (impactSlider) impactSlider.value = val;
      updateImpact(val);
    });
  });

  if (impactDonateBtn) {
    impactDonateBtn.addEventListener('click', () => {
      const currentVal = impactSlider ? parseInt(impactSlider.value, 10) : 75;
      openDonationModal({
        amount: currentVal,
        cause: `Life-Saving Impact Fund ($${currentVal} Contribution)`
      });
    });
  }

  // 6. Handle Donation Submission
  if (donationForm) {
    donationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const donorName = document.getElementById('donor-name')?.value || 'Compassionate Guardian';
      const donorEmail = document.getElementById('donor-email')?.value || 'guardian@pawshaven.org';
      const isDedication = document.getElementById('dedicate-gift')?.checked;
      const tributeName = document.getElementById('tribute-name')?.value;

      // Launch Confetti Celebration
      triggerCelebration();

      // Show receipt view
      if (formView) formView.style.display = 'none';
      if (successView) {
        successView.style.display = 'block';

        const receiptAmount = document.getElementById('receipt-amount');
        const receiptName = document.getElementById('receipt-name');
        const receiptTxId = document.getElementById('receipt-txid');
        const receiptFrequency = document.getElementById('receipt-frequency');
        const receiptTribute = document.getElementById('receipt-tribute-msg');

        if (receiptAmount) receiptAmount.textContent = `$${selectedAmount}`;
        if (receiptName) receiptName.textContent = donorName;
        if (receiptTxId) receiptTxId.textContent = 'PH-' + Math.floor(100000 + Math.random() * 900000);
        if (receiptFrequency) receiptFrequency.textContent = selectedFrequency === 'monthly' ? 'Monthly Recurring Giving' : 'One-Time Donation';

        if (receiptTribute && isDedication && tributeName) {
          receiptTribute.style.display = 'block';
          receiptTribute.textContent = `Honoring: "${tributeName}" ❤️`;
        } else if (receiptTribute) {
          receiptTribute.style.display = 'none';
        }
      }

      showToast(`Thank you, ${donorName}! Your gift of $${selectedAmount} will save lives today.`, 'success');
    });
  }

  // 7. Confetti Effect
  function triggerCelebration() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6433', '#10B981', '#F59E0B', '#3B82F6', '#EC4899']
      });

      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 250);
    }
  }

  // Dedication checkbox toggle
  const dedicateCheckbox = document.getElementById('dedicate-gift');
  const tributeFieldWrap = document.getElementById('tribute-fields-wrapper');
  if (dedicateCheckbox && tributeFieldWrap) {
    dedicateCheckbox.addEventListener('change', () => {
      tributeFieldWrap.style.display = dedicateCheckbox.checked ? 'block' : 'none';
    });
  }

  // Expose open helper
  window.openDonationModal = openDonationModal;
});
