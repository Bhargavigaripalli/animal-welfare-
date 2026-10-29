/**
 * PAWSHAVEN - Campaign Filtering, Search & Pet Adoption Tabs
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Campaign Filtering
  const filterPills = document.querySelectorAll('.campaign-filter-btn');
  const campaignCards = document.querySelectorAll('.campaign-card-item');
  const searchInput = document.getElementById('campaign-search');
  const sortSelect = document.getElementById('campaign-sort');

  function applyCampaignFilters() {
    const activeFilterBtn = document.querySelector('.campaign-filter-btn.active');
    const selectedCategory = activeFilterBtn ? activeFilterBtn.getAttribute('data-category') : 'all';
    const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';

    campaignCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const title = card.querySelector('.campaign-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.campaign-desc')?.textContent.toLowerCase() || '';

      const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
      const matchesSearch = !searchQuery || title.includes(searchQuery) || desc.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });

    // Handle empty results notice
    const visibleCount = Array.from(campaignCards).filter(c => c.style.display !== 'none').length;
    const noResults = document.getElementById('no-campaigns-msg');
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  filterPills.forEach(btn => {
    btn.addEventListener('click', () => {
      filterPills.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyCampaignFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyCampaignFilters);
  }

  // 2. Pet Adoption Spotlight Filters
  const petFilterButtons = document.querySelectorAll('.pet-filter-btn');
  const petCards = document.querySelectorAll('.pet-card-item');

  petFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      petFilterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-pet-cat');

      petCards.forEach(card => {
        const petType = card.getAttribute('data-pet-type');
        if (category === 'all' || petType === category) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
