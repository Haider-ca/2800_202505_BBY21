import { renderCard } from '../utils/renderCard.js';

const mockAnnouncements = [
  {
    _id: '1',
    title: '🚨 Planned Maintenance',
    body: 'The system will be temporarily unavailable on May 20 from 2–4 PM.',
    createdAt: new Date()
  },
  {
    _id: '2',
    title: '🎉 Welcome to PathPal!',
    body: 'Explore community posts and find accessible places near you.',
    createdAt: new Date(Date.now() - 86400000) // 1 day ago
  }
];

export async function loadAnnouncements({
  currentPage,
  limit,
  feedCards,
  loadMore,
  setLoading
}) {
  setLoading(true);

  try {
    // Simulate pagination
    const start = (currentPage - 1) * limit;
    const end = start + limit;
    const pageData = mockAnnouncements.slice(start, end);

    if (pageData.length === 0) {
      loadMore.innerHTML = '<span class="text-muted">No more announcements</span>';
      return null;
    }

    pageData.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card mb-3';
      card.innerHTML = `
        <div class="card-body">
          <h5>${item.title}</h5>
          <p class="text-muted">${new Date(item.createdAt).toLocaleString()}</p>
          <p>${item.body}</p>
        </div>
      `;
      feedCards.appendChild(card);
    });

    return currentPage + 1;
  } catch (err) {
    console.error('Failed to load announcements:', err);
  } finally {
    setLoading(false);
  }
}
