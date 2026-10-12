import { modes, predict, countdown } from './forecast.js';
const $ = id => document.getElementById(id);
let mode = 'believer';
let target;
const dateFormat = new Intl.DateTimeFormat('en-GB', { day:'numeric', month:'long', year:'numeric', timeZone:'Europe/Zagreb' });
const timeFormat = new Intl.DateTimeFormat('en-GB', { hour:'2-digit', minute:'2-digit', timeZone:'Europe/Zagreb' });
function tick() {
  const parts = countdown(target);
  for (const unit of ['days','hours','minutes','seconds']) $(unit).textContent = String(parts[unit]).padStart(2, '0');
  $('date-note').textContent = parts.expired ? 'Prediction overdue. The copium has expired. This is not a launch check.' : `at ${timeFormat.format(target)} Zagreb time. I can feel it.`;
}
function update() {
  target = predict(mode, $('features').value);
  const selected = modes[mode];
  $('forecast-date').textContent = dateFormat.format(target);
  $('confidence').textContent = `${selected.confidence}%*`;
  $('confidence-bar').style.width = `${selected.confidence}%`;
  $('feature-value').textContent = $('features').value;
  $('lab-aside').textContent = selected.aside;
  $('model-verdict').textContent = selected.verdict;
  $('model-verdict').style.whiteSpace = 'pre-line';
  document.querySelectorAll('[data-mode]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === mode)));
  const paths = { optimist: 'M45 185 C70 180 65 45 120 35 S330 28 475 26', believer: 'M45 185 C110 180 135 170 195 130 S280 80 320 90 S400 40 475 35', doomer: 'M45 185 C110 180 150 195 220 184 S320 190 370 178 S425 180 475 170' };
  const curve = paths[mode];
  $('chart-line').setAttribute('d',curve);
  $('chart-area').setAttribute('d', `${curve} L475 190 L45 190 Z`);
  $('chart-dot').setAttribute('cx',475);
  $('chart-dot').setAttribute('cy', {optimist:26,believer:35,doomer:170}[mode]);
  tick();
}
document.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => {mode = button.dataset.mode; update();}));
$('features').addEventListener('input',update);
update();
setInterval(tick,1000);
const theories = [
  ['He lowered the maximum to 30%. October has 31 days. One day is missing.','THAT’S THE RELEASE DAY.','Absolutely not how calendars work.'],
  ['Cockle has 6 letters. Cockguesser has 11. That’s 17 combined.','OCTOBER 17. CASE CLOSED.','Naming indecision is not an encrypted announcement.'],
  ['The preview has a walrus. Walruses have tusks. Tusks come in pairs.','TWO DAYS UNTIL LAUNCH.','The walrus has declined to comment.'],
  ['He said “standby” on Friday. You only say standby when something is about to happen.','I HAVE BEEN STANDING BY EVER SINCE.','Standing is not a release strategy.'],
  ['He researched bugs on release day. Bugs are also software problems.','HE IS LITERALLY FIXING BUGS.','He was researching insects. I know. Let me have this.'],
  ['There is already a “Copy result” button in the preview. Results require a game.','THE GAME ALREADY EXISTS. THE URL IS JUST SHY.','Screenshots have never paid my emotional damages.']
];
let theory = 0;
$('theory-button').addEventListener('click', () => {
  theory++;
  const entry = theories[theory % theories.length];
  const container = $('theory-output');
  container.replaceChildren();
  const number = document.createElement('span'); number.className='theory-number'; number.textContent=`THEORY #${String(theory+1).padStart(3,'0')}`;
  const p = document.createElement('p'); p.append(`${entry[0]} `);
  const strong = document.createElement('strong');strong.textContent=entry[1];p.append(strong);
  const note = document.createElement('span');note.className='theory-disclaimer';note.textContent=`Fan theory. ${entry[2]}`;
  container.append(number,p,note);
});
$('share').addEventListener('click',async () => {
  const text = `COCKWATCH / CASE #001\nPredicted drop: ${dateFormat.format(target)}\nConfidence: ${modes[mode].confidence}% (emotionally sourced)\nHe said tomorrow. I have connected the dots.\n${location.href.split('#')[0]}\nFan forecast. Not an actual release date.`;
  try {await navigator.clipboard.writeText(text);$('share-status').textContent='Findings copied. The group chat deserves to know.';}
  catch { $('share-status').textContent='Clipboard unavailable. Select and copy the findings below.'; const area=document.createElement('textarea');area.value=text;area.setAttribute('aria-label','Findings to copy');area.style.cssText='display:block;width:min(90%,500px);height:140px;margin:20px auto;background:#f8eee5;color:#291a22;padding:12px';$('share-status').after(area);area.focus();area.select(); }
});
