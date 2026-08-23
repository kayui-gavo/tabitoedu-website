(() => {
  'use strict';

  function removeDeprecatedContent() {
    const removeCard = el => {
      const card = el.closest('article,.feature-card,li,div.bg-white,[class*="rounded-2xl"],[class*="rounded-3xl"]');
      (card || el).remove();
    };

    document.querySelectorAll('img[src*="teacher_li.jpg"],img[alt="李老师"]').forEach(removeCard);
    document.querySelectorAll('h2,h3,h4,p,span,strong').forEach(el => {
      if ((el.textContent || '').replace(/\s+/g,'').includes('李老师')) removeCard(el);
    });
  }

  removeDeprecatedContent();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', removeDeprecatedContent, {once:true});
})();