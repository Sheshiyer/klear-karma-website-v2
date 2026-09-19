const API_URL = 'https://api.klearkarma.space/api/marketing/waitlist';

for (const form of document.querySelectorAll('[data-admission-form]')) {
  const roleInterest = form.getAttribute('data-admission-form');
  const feedback = form.querySelector('[data-admission-feedback]');
  const submit = form.querySelector('button[type="submit"]');

  if (!['seeker', 'practitioner'].includes(roleInterest) || !feedback || !submit) continue;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const fields = new FormData(form);
    const market = fields.get('market');
    if (market !== 'IN' && market !== 'TH') return;

    submit.disabled = true;
    feedback.setAttribute('role', 'status');
    feedback.textContent = 'Sending your request…';

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: String(fields.get('email') || '').trim(),
          name: String(fields.get('name') || '').trim(),
          roleInterest,
          market,
          consentContact: fields.get('consentContact') === 'on',
          consentMarketing: fields.get('consentMarketing') === 'on',
        }),
      });
      if (!response.ok) throw new Error('request_failed');
      const payload = await response.json();
      if (!payload || payload.success !== true) throw new Error('request_failed');

      form.reset();
      feedback.textContent = roleInterest === 'seeker'
        ? 'Your seeker invitation request was received. If approved, we will contact you with a code to use during app sign up.'
        : 'Your practitioner invitation request was received. If approved, we will contact you with a link to begin your application.';
    } catch {
      feedback.setAttribute('role', 'alert');
      feedback.textContent = 'We could not send your request. Please check your connection and try again.';
    } finally {
      submit.disabled = false;
    }
  });
}
