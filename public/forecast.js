// The chat's "tomorrow" promise was made on 11 October 2026.
// These scenarios are intentionally made-up fan predictions, not live release data.
export const modes = {
  optimist: { base: '2026-10-13T18:00:00+02:00', daysPerFeature: 0, confidence: 100, verdict: 'Tomorrow. Literally tomorrow.\nI refuse to learn.', aside: 'Features cannot delay destiny. This is not a sound methodology.' },
  believer: { base: '2026-10-13T18:00:00+02:00', daysPerFeature: 2, confidence: 97.3, verdict: 'Release is imminent.\nIn the geological sense.', aside: 'Every “tiny” feature adds two very normal days.' },
  doomer: { base: '2027-10-13T18:00:00+02:00', daysPerFeature: 14, confidence: 3, verdict: 'The real game was the\ngroup chat we made along the way.', aside: 'Two weeks per feature. We’re going to need more string.' }
};
export function predict(mode, features) {
  const selected = modes[mode] || modes.believer;
  const count = Math.max(0, Math.min(12, Number(features) || 0));
  const target = new Date(new Date(selected.base).getTime() + count * selected.daysPerFeature * 86400000);
  const localHour = Number(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', hourCycle: 'h23', timeZone: 'Europe/Zagreb' }).format(target));
  // Keep 18:00 local time when added days cross daylight-saving boundaries.
  target.setTime(target.getTime() + (18 - localHour) * 3600000);
  return target;
}
export function countdown(target, now = Date.now()) {
  const total = Math.max(0, Math.floor((target.getTime() - now) / 1000));
  return { expired: target.getTime() <= now, days: Math.floor(total / 86400), hours: Math.floor(total / 3600) % 24, minutes: Math.floor(total / 60) % 60, seconds: total % 60 };
}
