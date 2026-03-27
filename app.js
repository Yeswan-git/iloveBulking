/* ═══════════════════════════════════════════════════════════
   BULK.OS — Complete Calorie Engine v1.0
   Architecture: Vanilla JS, IndexedDB, Web Notifications,
                 Web Audio API, PWA-Ready
═══════════════════════════════════════════════════════════ */

'use strict';

// ┌─────────────────────────────────────────────────────────┐
// │  1. FOOD DATABASE                                        │
// │  All values per 100g. calories in kcal.                 │
// └─────────────────────────────────────────────────────────┘
const FOODS = {
  // ── PROTEINS ──────────────────────────────────────────
  "chicken breast":      { cal: 165, protein: 31.0, carbs: 0.0,  fat: 3.6,  cat: "protein" },
  "ground beef 80/20":   { cal: 254, protein: 26.0, carbs: 0.0,  fat: 17.0, cat: "protein" },
  "salmon":              { cal: 208, protein: 20.0, carbs: 0.0,  fat: 13.0, cat: "protein" },
  "tuna canned":         { cal: 116, protein: 25.5, carbs: 0.0,  fat: 0.8,  cat: "protein" },
  "whole eggs":          { cal: 143, protein: 12.6, carbs: 0.7,  fat: 9.5,  cat: "protein" },
  "egg whites":          { cal: 52,  protein: 11.0, carbs: 0.7,  fat: 0.2,  cat: "protein" },
  "greek yogurt":        { cal: 100, protein: 17.0, carbs: 6.0,  fat: 0.7,  cat: "protein" },
  "cottage cheese":      { cal: 98,  protein: 11.1, carbs: 3.4,  fat: 4.3,  cat: "protein" },
  "whey protein":        { cal: 120, protein: 24.0, carbs: 3.0,  fat: 2.0,  cat: "protein" },
  "beef steak":          { cal: 271, protein: 26.0, carbs: 0.0,  fat: 18.0, cat: "protein" },
  "turkey breast":       { cal: 135, protein: 30.0, carbs: 0.0,  fat: 1.0,  cat: "protein" },
  "tilapia":             { cal: 128, protein: 26.0, carbs: 0.0,  fat: 2.6,  cat: "protein" },
  "shrimp":              { cal: 99,  protein: 24.0, carbs: 0.2,  fat: 0.3,  cat: "protein" },
  "pork tenderloin":     { cal: 143, protein: 26.0, carbs: 0.0,  fat: 3.5,  cat: "protein" },
  "sardines":            { cal: 208, protein: 24.6, carbs: 0.0,  fat: 11.4, cat: "protein" },
  "beef jerky":          { cal: 364, protein: 33.2, carbs: 11.0, fat: 22.0, cat: "protein" },
  "canned chicken":      { cal: 130, protein: 28.0, carbs: 0.0,  fat: 2.0,  cat: "protein" },
  "lamb":                { cal: 294, protein: 25.0, carbs: 0.0,  fat: 21.0, cat: "protein" },
  // ── CARBS ──────────────────────────────────────────────
  "white rice":          { cal: 130, protein: 2.7,  carbs: 28.0, fat: 0.3,  cat: "carbs" },
  "brown rice":          { cal: 123, protein: 2.7,  carbs: 25.6, fat: 1.0,  cat: "carbs" },
  "oats":                { cal: 389, protein: 17.0, carbs: 66.0, fat: 7.0,  cat: "carbs" },
  "pasta":               { cal: 131, protein: 5.0,  carbs: 25.0, fat: 1.1,  cat: "carbs" },
  "white bread":         { cal: 265, protein: 9.0,  carbs: 49.0, fat: 3.2,  cat: "carbs" },
  "whole wheat bread":   { cal: 247, protein: 13.0, carbs: 41.0, fat: 4.2,  cat: "carbs" },
  "sweet potato":        { cal: 86,  protein: 1.6,  carbs: 20.0, fat: 0.1,  cat: "carbs" },
  "potato":              { cal: 77,  protein: 2.0,  carbs: 17.0, fat: 0.1,  cat: "carbs" },
  "banana":              { cal: 89,  protein: 1.1,  carbs: 23.0, fat: 0.3,  cat: "carbs" },
  "apple":               { cal: 52,  protein: 0.3,  carbs: 14.0, fat: 0.2,  cat: "carbs" },
  "dates":               { cal: 282, protein: 2.5,  carbs: 75.0, fat: 0.4,  cat: "carbs" },
  "raisins":             { cal: 299, protein: 3.1,  carbs: 79.0, fat: 0.5,  cat: "carbs" },
  "quinoa":              { cal: 120, protein: 4.4,  carbs: 21.3, fat: 1.9,  cat: "carbs" },
  "granola":             { cal: 471, protein: 10.5, carbs: 64.0, fat: 20.0, cat: "carbs" },
  "bagel":               { cal: 245, protein: 10.0, carbs: 48.0, fat: 1.5,  cat: "carbs" },
  "corn":                { cal: 96,  protein: 3.4,  carbs: 21.0, fat: 1.5,  cat: "carbs" },
  "tortilla":            { cal: 218, protein: 5.7,  carbs: 36.0, fat: 5.5,  cat: "carbs" },
  "cereal":              { cal: 379, protein: 7.5,  carbs: 84.0, fat: 1.5,  cat: "carbs" },
  "rice cakes":          { cal: 387, protein: 7.7,  carbs: 80.0, fat: 2.8,  cat: "carbs" },
  "honey":               { cal: 304, protein: 0.3,  carbs: 82.0, fat: 0.0,  cat: "carbs" },
  // ── FATS / CALORIE DENSE ──────────────────────────────
  "peanut butter":       { cal: 588, protein: 25.0, carbs: 20.0, fat: 50.0, cat: "fats" },
  "almond butter":       { cal: 614, protein: 21.0, carbs: 19.0, fat: 56.0, cat: "fats" },
  "olive oil":           { cal: 884, protein: 0.0,  carbs: 0.0,  fat: 100.0,cat: "fats" },
  "avocado":             { cal: 160, protein: 2.0,  carbs: 9.0,  fat: 15.0, cat: "fats" },
  "whole milk":          { cal: 61,  protein: 3.2,  carbs: 4.8,  fat: 3.3,  cat: "fats" },
  "almonds":             { cal: 579, protein: 21.0, carbs: 22.0, fat: 50.0, cat: "fats" },
  "walnuts":             { cal: 654, protein: 15.0, carbs: 14.0, fat: 65.0, cat: "fats" },
  "cashews":             { cal: 553, protein: 18.0, carbs: 30.0, fat: 44.0, cat: "fats" },
  "peanuts":             { cal: 567, protein: 26.0, carbs: 16.0, fat: 49.0, cat: "fats" },
  "dark chocolate":      { cal: 546, protein: 5.0,  carbs: 60.0, fat: 31.0, cat: "fats" },
  "coconut oil":         { cal: 892, protein: 0.0,  carbs: 0.0,  fat: 99.0, cat: "fats" },
  "butter":              { cal: 717, protein: 0.9,  carbs: 0.1,  fat: 81.0, cat: "fats" },
  "cheddar cheese":      { cal: 403, protein: 25.0, carbs: 1.3,  fat: 33.0, cat: "fats" },
  "cream cheese":        { cal: 342, protein: 6.0,  carbs: 4.1,  fat: 34.0, cat: "fats" },
  "heavy cream":         { cal: 340, protein: 2.0,  carbs: 3.0,  fat: 36.0, cat: "fats" },
  "macadamia nuts":      { cal: 718, protein: 7.9,  carbs: 13.8, fat: 75.8, cat: "fats" },
  "sunflower seeds":     { cal: 584, protein: 20.8, carbs: 20.0, fat: 51.5, cat: "fats" },
  // ── COMBO / MASS FOODS ────────────────────────────────
  "mass gainer shake":   { cal: 650, protein: 50.0, carbs: 95.0, fat: 8.0,  cat: "protein" },
  "protein bar":         { cal: 200, protein: 20.0, carbs: 22.0, fat: 7.0,  cat: "protein" },
  "trail mix":           { cal: 462, protein: 10.0, carbs: 48.0, fat: 28.0, cat: "fats" },
  "pizza slice":         { cal: 266, protein: 11.0, carbs: 33.0, fat: 10.0, cat: "carbs" },
  "hamburger patty":     { cal: 295, protein: 24.0, carbs: 0.0,  fat: 21.0, cat: "protein" },
  "peanut butter sandwich": { cal: 340, protein: 12.0, carbs: 40.0, fat: 16.0, cat: "carbs" },
};

// ┌─────────────────────────────────────────────────────────┐
// │  2. BULK SNACK SUGGESTIONS                               │
// └─────────────────────────────────────────────────────────┘
const BULK_SNACKS = [
  { name: "PB & Banana Shake",      cal: 450, desc: "2 tbsp peanut butter + 1 banana + 300ml whole milk", time: "5 min" },
  { name: "Rice & Chicken Bowl",    cal: 550, desc: "200g white rice (cooked) + 150g chicken breast", time: "10 min" },
  { name: "Mass Gainer Shake",      cal: 650, desc: "2 scoops mass gainer + 400ml whole milk", time: "2 min" },
  { name: "Oats & Egg Combo",       cal: 500, desc: "100g dry oats (cooked) + 3 whole eggs scrambled", time: "8 min" },
  { name: "Trail Mix Handful",      cal: 350, desc: "75g mixed nuts + raisins + dark chocolate chips", time: "1 min" },
  { name: "Greek Yogurt Parfait",   cal: 400, desc: "200g Greek yogurt + 50g granola + 2 tbsp honey", time: "3 min" },
  { name: "Peanut Butter Toast",    cal: 380, desc: "2 slices whole wheat bread + 3 tbsp peanut butter", time: "3 min" },
  { name: "Cottage Cheese Bowl",    cal: 300, desc: "250g cottage cheese + 1 banana + drizzle honey", time: "2 min" },
  { name: "Tuna Rice Bowl",         cal: 480, desc: "150g cooked rice + 1 can tuna + 1 tsp olive oil", time: "5 min" },
  { name: "Dark Choc Almonds",      cal: 420, desc: "50g dark chocolate + 50g almonds", time: "1 min" },
  { name: "Avocado Toast",          cal: 360, desc: "2 slices bread + 1 avocado + 2 eggs", time: "7 min" },
  { name: "Overnight Oats",         cal: 520, desc: "100g oats + 300ml whole milk + banana + PB", time: "5 min prep" },
  { name: "Steak & Sweet Potato",   cal: 580, desc: "150g beef steak + 200g sweet potato", time: "15 min" },
  { name: "Bagel & Cream Cheese",   cal: 440, desc: "1 large bagel + 60g cream cheese + smoked salmon", time: "3 min" },
];

// ┌─────────────────────────────────────────────────────────┐
// │  3. MEAL SCHEDULE TEMPLATES                              │
// └─────────────────────────────────────────────────────────┘
const MEAL_SCHEDULES = {
  4: [
    { label: "Breakfast",    time: "07:30", duration: 30 },
    { label: "Lunch",        time: "12:30", duration: 45 },
    { label: "Pre-Workout",  time: "16:00", duration: 30 },
    { label: "Dinner",       time: "19:30", duration: 45 },
  ],
  5: [
    { label: "Breakfast",    time: "07:00", duration: 30 },
    { label: "Mid-Morning",  time: "10:30", duration: 20 },
    { label: "Lunch",        time: "13:00", duration: 40 },
    { label: "Pre-Workout",  time: "16:30", duration: 25 },
    { label: "Dinner",       time: "20:00", duration: 45 },
  ],
  6: [
    { label: "Breakfast",    time: "06:30", duration: 25 },
    { label: "Mid-Morning",  time: "09:30", duration: 20 },
    { label: "Lunch",        time: "12:30", duration: 35 },
    { label: "Pre-Workout",  time: "15:30", duration: 25 },
    { label: "Post-Workout", time: "18:00", duration: 25 },
    { label: "Dinner",       time: "20:30", duration: 40 },
  ],
};

// ┌─────────────────────────────────────────────────────────┐
// │  4. IndexedDB MANAGER                                    │
// └─────────────────────────────────────────────────────────┘
class BulkDB {
  constructor() {
    this.dbName    = 'BulkOS';
    this.dbVersion = 1;
    this.db        = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(this.dbName, this.dbVersion);

      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        // Profile store
        if (!db.objectStoreNames.contains('profile')) {
          db.createObjectStore('profile', { keyPath: 'id' });
        }
        // Food log store
        if (!db.objectStoreNames.contains('foodLog')) {
          const logStore = db.createObjectStore('foodLog', { keyPath: 'id', autoIncrement: true });
          logStore.createIndex('date', 'date', { unique: false });
        }
        // Alarms store
        if (!db.objectStoreNames.contains('alarms')) {
          db.createObjectStore('alarms', { keyPath: 'id', autoIncrement: true });
        }
      };

      req.onsuccess = (e) => { this.db = e.target.result; resolve(); };
      req.onerror   = (e) => reject(e.target.error);
    });
  }

  // ── Generic operations ────────────────────────────────
  _tx(store, mode = 'readonly') {
    return this.db.transaction([store], mode).objectStore(store);
  }

  _promisify(req) {
    return new Promise((res, rej) => {
      req.onsuccess = () => res(req.result);
      req.onerror   = () => rej(req.error);
    });
  }

  // ── Profile ───────────────────────────────────────────
  async saveProfile(profile) {
    profile.id = 'user';
    return this._promisify(this._tx('profile', 'readwrite').put(profile));
  }

  async getProfile() {
    return this._promisify(this._tx('profile').get('user'));
  }

  // ── Food Log ──────────────────────────────────────────
  async addFoodLog(entry) {
    entry.date = this._todayKey();
    entry.time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    return this._promisify(this._tx('foodLog', 'readwrite').add(entry));
  }

  async getTodayLog() {
    return new Promise((resolve, reject) => {
      const store = this._tx('foodLog');
      const idx   = store.index('date');
      const req   = idx.getAll(this._todayKey());
      req.onsuccess = () => resolve(req.result);
      req.onerror   = () => reject(req.error);
    });
  }

  async deleteFoodLog(id) {
    return this._promisify(this._tx('foodLog', 'readwrite').delete(id));
  }

  // ── Alarms ────────────────────────────────────────────
  async getAlarms() {
    return this._promisify(this._tx('alarms').getAll());
  }

  async addAlarm(alarm) {
    return this._promisify(this._tx('alarms', 'readwrite').add(alarm));
  }

  async updateAlarm(alarm) {
    return this._promisify(this._tx('alarms', 'readwrite').put(alarm));
  }

  async deleteAlarm(id) {
    return this._promisify(this._tx('alarms', 'readwrite').delete(id));
  }

  // ── Helpers ───────────────────────────────────────────
  _todayKey() {
    return new Date().toISOString().slice(0, 10);
  }
}

// ┌─────────────────────────────────────────────────────────┐
// │  5. TDEE & MACRO CALCULATOR                              │
// └─────────────────────────────────────────────────────────┘
const Calculator = {
  /** Mifflin-St Jeor BMR */
  bmr(weight_kg, height_cm, age, gender) {
    const base = (10 * weight_kg) + (6.25 * height_cm) - (5 * age);
    return gender === 'male' ? base + 5 : base - 161;
  },

  /** TDEE = BMR × activity multiplier */
  tdee(bmr, activity) {
    return Math.round(bmr * parseFloat(activity));
  },

  /** Daily calorie target with surplus */
  dailyTarget(tdee, surplus) {
    return tdee + parseInt(surplus);
  },

  /** Macro targets from calorie goal */
  macros(weightKg, dailyKcal) {
    const protein = Math.round(weightKg * 2.2);  // 2.2g/kg body weight
    const fats    = Math.round((dailyKcal * 0.25) / 9); // 25% of calories from fat
    const proteinKcal = protein * 4;
    const fatKcal     = fats * 9;
    const carbs   = Math.round((dailyKcal - proteinKcal - fatKcal) / 4);
    return { protein, fats, carbs };
  },

  /** Calculate food entry macros for a given weight */
  calcEntry(foodKey, grams) {
    const f = FOODS[foodKey];
    if (!f) return null;
    const ratio = grams / 100;
    return {
      foodKey,
      grams,
      cal:     Math.round(f.cal     * ratio),
      protein: Math.round(f.protein * ratio * 10) / 10,
      carbs:   Math.round(f.carbs   * ratio * 10) / 10,
      fat:     Math.round(f.fat     * ratio * 10) / 10,
    };
  },

  /** Sum up today's log */
  totals(logEntries) {
    return logEntries.reduce((acc, e) => {
      acc.cal     += e.cal     || 0;
      acc.protein += e.protein || 0;
      acc.carbs   += e.carbs   || 0;
      acc.fat     += e.fat     || 0;
      return acc;
    }, { cal: 0, protein: 0, carbs: 0, fat: 0 });
  },

  /** Convert lbs → kg */
  lbsToKg: (lbs) => lbs * 0.453592,

  /** Convert inches → cm */
  inToCm: (inch) => inch * 2.54,

  /** Percentage bar width, clamped to 0–110% for overflow indication */
  pct: (val, target) => Math.min(110, Math.max(0, (val / target) * 100)),
};

// ┌─────────────────────────────────────────────────────────┐
// │  6. FOOD SEARCH ENGINE                                   │
// │  Fuzzy search with scoring                              │
// └─────────────────────────────────────────────────────────┘
const FoodSearch = {
  search(query, limit = 8) {
    if (!query || query.length < 1) return [];
    const q = query.toLowerCase().trim();

    return Object.entries(FOODS)
      .map(([name, data]) => {
        let score = 0;
        if (name === q)                     score = 100;
        else if (name.startsWith(q))        score = 80;
        else if (name.includes(q))          score = 60;
        else {
          // Word-level matching
          const words = q.split(' ');
          const nameWords = name.split(' ');
          const matched = words.filter(w => nameWords.some(nw => nw.startsWith(w)));
          score = matched.length > 0 ? (matched.length / words.length) * 40 : 0;
        }
        return { name, ...data, score };
      })
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  },

  byCategory(cat) {
    return Object.entries(FOODS)
      .filter(([, d]) => cat === 'all' || d.cat === cat)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => a.name.localeCompare(b.name));
  },
};

// ┌─────────────────────────────────────────────────────────┐
// │  7. AUDIO MANAGER — Web Audio API Alarm                  │
// └─────────────────────────────────────────────────────────┘
const AudioManager = {
  _ctx: null,

  _getCtx() {
    if (!this._ctx || this._ctx.state === 'closed') {
      this._ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return this._ctx;
  },

  /** Play a punchy alarm tone sequence */
  playAlarm() {
    const ctx = this._getCtx();
    if (ctx.state === 'suspended') ctx.resume();

    // Rising tones: attention-grabbing pattern
    const notes = [880, 1100, 880, 1320, 1760];
    const timing = [0, 0.18, 0.36, 0.54, 0.72];

    notes.forEach((freq, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + timing[i]);

      gain.gain.setValueAtTime(0, ctx.currentTime + timing[i]);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + timing[i] + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + timing[i] + 0.15);

      osc.start(ctx.currentTime + timing[i]);
      osc.stop(ctx.currentTime + timing[i] + 0.15);
    });
  },

  /** Subtle success beep */
  playSuccess() {
    const ctx = this._getCtx();
    if (ctx.state === 'suspended') ctx.resume();

    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(660, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(990, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  },

  /** Error beep */
  playError() {
    const ctx = this._getCtx();
    if (ctx.state === 'suspended') ctx.resume();

    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, ctx.currentTime);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  },
};

// ┌─────────────────────────────────────────────────────────┐
// │  8. NOTIFICATION MANAGER                                 │
// └─────────────────────────────────────────────────────────┘
const NotificationManager = {
  _granted: false,

  async requestPermission() {
    if (!('Notification' in window)) return false;
    const result = await Notification.requestPermission();
    this._granted = result === 'granted';
    return this._granted;
  },

  isGranted() {
    return 'Notification' in window && Notification.permission === 'granted';
  },

  send(title, body, opts = {}) {
    if (!this.isGranted()) return;
    const n = new Notification(title, {
      body,
      icon: 'data:image/svg+xml,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
          <rect width="64" height="64" fill="#060608" rx="12"/>
          <text x="32" y="42" text-anchor="middle" font-size="28" font-family="sans-serif" fill="#b8ff00">⚡</text>
        </svg>`),
      badge: 'data:image/svg+xml,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="16" fill="#b8ff00"/>
        </svg>`),
      tag: opts.tag || 'bulk-os',
      ...opts,
    });
    n.onclick = () => { window.focus(); n.close(); };
    return n;
  },
};

// ┌─────────────────────────────────────────────────────────┐
// │  9. ALARM SCHEDULER                                      │
// │  Polls every 30s since no server push available         │
// └─────────────────────────────────────────────────────────┘
const AlarmScheduler = {
  _interval: null,
  _firedToday: new Set(),
  _db: null,

  init(db) {
    this._db = db;
    this._firedToday = new Set(
      JSON.parse(localStorage.getItem('bulk_fired_alarms') || '[]')
    );
    // Reset fired set at midnight
    this._scheduleMidnightReset();
    // Start polling
    this._interval = setInterval(() => this.check(), 30_000);
    this.check(); // immediate check
  },

  async check() {
    const alarms = await this._db.getAlarms();
    const now    = new Date();
    const hhmm   = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    const today  = now.toISOString().slice(0, 10);

    alarms.forEach(alarm => {
      if (!alarm.enabled) return;
      const fireKey = `${today}-${alarm.id}`;
      if (this._firedToday.has(fireKey)) return;

      // Fire within a 2-minute window of the alarm time
      if (this._withinWindow(alarm.time, hhmm, 2)) {
        this._fire(alarm);
        this._firedToday.add(fireKey);
        localStorage.setItem('bulk_fired_alarms', JSON.stringify([...this._firedToday]));
      }
    });
  },

  _withinWindow(alarmTime, nowTime, windowMin) {
    const [ah, am] = alarmTime.split(':').map(Number);
    const [nh, nm] = nowTime.split(':').map(Number);
    const alarmTotal = ah * 60 + am;
    const nowTotal   = nh * 60 + nm;
    return Math.abs(alarmTotal - nowTotal) <= windowMin;
  },

  _fire(alarm) {
    AudioManager.playAlarm();
    NotificationManager.send(
      `⚡ TIME TO EAT — ${alarm.label}`,
      `It's ${alarm.time}. Fuel your bulk. Hit your calorie target!`,
      { tag: `alarm-${alarm.id}` }
    );
    Toast.show(`🍽 Meal time: ${alarm.label}`, 'success', 5000);
  },

  _scheduleMidnightReset() {
    const now  = new Date();
    const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const ms   = next - now;
    setTimeout(() => {
      this._firedToday.clear();
      localStorage.removeItem('bulk_fired_alarms');
      this._scheduleMidnightReset();
    }, ms);
  },
};

// ┌─────────────────────────────────────────────────────────┐
// │  10. GOOGLE CALENDAR URL GENERATOR                       │
// └─────────────────────────────────────────────────────────┘
const CalendarGen = {
  /**
   * Generates a Google Calendar "add event" URL.
   * @param {string} title - Event title
   * @param {Date}   start - Start datetime
   * @param {Date}   end   - End datetime
   * @param {string} desc  - Event description
   * @returns {string} URL
   */
  generateURL(title, start, end, desc = '') {
    const fmt = (d) => d.toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z';
    const base = 'https://calendar.google.com/calendar/render';
    const params = new URLSearchParams({
      action:  'TEMPLATE',
      text:    title,
      dates:   `${fmt(start)}/${fmt(end)}`,
      details: desc,
      sf:      'true',
      output:  'xml',
    });
    return `${base}?${params.toString()}`;
  },

  /**
   * Generate URLs for all meals in today's schedule.
   * @param {Object} profile - User profile with meals, dailyTarget, surplusKcal
   * @returns {Array} Array of {label, time, url, kcalPerMeal}
   */
  generateMealEvents(profile) {
    const meals    = parseInt(profile.meals) || 5;
    const schedule = MEAL_SCHEDULES[meals] || MEAL_SCHEDULES[5];
    const kcalPer  = Math.round((profile.dailyTarget || 3000) / meals);
    const today    = new Date();
    today.setHours(0, 0, 0, 0);

    return schedule.map(meal => {
      const [h, m]  = meal.time.split(':').map(Number);
      const start   = new Date(today);
      start.setHours(h, m, 0, 0);
      const end     = new Date(start);
      end.setMinutes(end.getMinutes() + meal.duration);

      const desc = [
        `🎯 Target: ~${kcalPer} kcal`,
        `📊 Daily Goal: ${profile.dailyTarget} kcal (TDEE ${profile.tdee} + ${profile.surplus} surplus)`,
        `💪 Protein Target: ${profile.macros?.protein}g | Carbs: ${profile.macros?.carbs}g | Fats: ${profile.macros?.fats}g`,
        '',
        `Scheduled by BULK.OS — Your Calorie Engine`,
      ].join('\n');

      return {
        label:     meal.label,
        time:      meal.time,
        duration:  meal.duration,
        kcalPer,
        url: this.generateURL(`🍽 ${meal.label} — BULK.OS`, start, end, desc),
      };
    });
  },
};

// ┌─────────────────────────────────────────────────────────┐
// │  11. SUGGESTION ENGINE                                   │
// └─────────────────────────────────────────────────────────┘
const SuggestionEngine = {
  /**
   * Analyzes time of day vs calories consumed.
   * Returns a suggestion object or null.
   */
  analyze(profile, totals) {
    const now       = new Date();
    const hour      = now.getHours();
    const target    = profile.dailyTarget || 3000;
    const consumed  = totals.cal || 0;
    const remaining = target - consumed;

    // Calculate what % of the day has elapsed (useful hours: 6am–10pm = 16 hours)
    const dayStart  = 6;
    const dayEnd    = 22;
    const dayPct    = Math.max(0, Math.min(1, (hour - dayStart) / (dayEnd - dayStart)));
    const expected  = Math.round(target * dayPct);
    const deficit   = expected - consumed;

    // Find best snack to close the gap
    const snack = this._bestSnack(remaining > 0 ? remaining : 0);

    let status = 'on-track';
    let message = '';

    if (hour < 8) {
      return {
        status: 'morning',
        message: `Good morning! Your target today is ${target.toLocaleString()} kcal. Start strong — log your breakfast!`,
        snack: BULK_SNACKS[0], // PB Shake
        urgency: 'low',
      };
    }

    if (remaining <= 0) {
      return {
        status: 'complete',
        message: `🎯 Daily target hit! You've consumed ${consumed.toLocaleString()} kcal. Nice work.`,
        snack: null,
        urgency: 'none',
      };
    }

    if (deficit > 500 && hour >= 14) {
      status = 'behind';
      message = `You're ${deficit.toLocaleString()} kcal behind pace. ${remaining.toLocaleString()} kcal remaining. Time to eat!`;
    } else if (deficit > 200) {
      status = 'slightly-behind';
      message = `Slightly behind pace by ~${deficit} kcal. Keep eating consistently.`;
    } else {
      status = 'on-track';
      message = `On pace! ${remaining.toLocaleString()} kcal left. Keep it going.`;
    }

    if (hour >= 20 && remaining > 600) {
      status = 'critical';
      message = `⚠️ CRITICAL: ${remaining.toLocaleString()} kcal remaining with less than ${22 - hour}h left. Prioritize calorie-dense foods NOW!`;
    }

    return { status, message, snack, urgency: status === 'critical' ? 'high' : status === 'behind' ? 'medium' : 'low' };
  },

  _bestSnack(remaining) {
    if (remaining <= 0) return null;
    // Find a snack closest to the remaining calories without going way over
    return BULK_SNACKS
      .filter(s => s.cal <= remaining + 100)
      .sort((a, b) => Math.abs(remaining - b.cal) - Math.abs(remaining - a.cal))[0]
      || BULK_SNACKS[2]; // default: mass gainer
  },
};

// ┌─────────────────────────────────────────────────────────┐
// │  12. TOAST NOTIFICATION (in-app)                         │
// └─────────────────────────────────────────────────────────┘
const Toast = {
  _el: null,
  _timer: null,

  init() { this._el = document.getElementById('toast'); },

  show(msg, type = '', duration = 3000) {
    if (!this._el) return;
    clearTimeout(this._timer);
    this._el.textContent = msg;
    this._el.className = `toast ${type}`;
    this._timer = setTimeout(() => {
      this._el.classList.add('hidden');
    }, duration);
  },
};

// ┌─────────────────────────────────────────────────────────┐
// │  13. UI RENDERER                                         │
// └─────────────────────────────────────────────────────────┘
const UI = {
  /** Update the calorie ring */
  updateRing(consumed, target) {
    const fill    = document.getElementById('calorie-ring-fill');
    const circumference = 2 * Math.PI * 85; // r=85
    const pct     = Math.min(1, consumed / target);
    const offset  = circumference * (1 - pct);
    if (fill) {
      fill.style.strokeDasharray  = circumference;
      fill.style.strokeDashoffset = offset;

      // Color shift: green → orange → red as they exceed target
      if (pct >= 1.05)   fill.style.stroke = '#ff3b3b';
      else if (pct >= 1) fill.style.stroke = '#ffa500';
      else               fill.style.stroke = '#b8ff00';
    }

    const consumed_el = document.getElementById('ring-consumed');
    const target_el   = document.getElementById('ring-target');
    if (consumed_el) consumed_el.textContent = consumed.toLocaleString();
    if (target_el)   target_el.textContent   = `/ ${target.toLocaleString()}`;
  },

  /** Update hero stats */
  updateHeroStats(totals, profile) {
    const remaining = Math.max(0, profile.dailyTarget - totals.cal);
    const surplus   = totals.cal - profile.tdee;
    const meals     = App.state.todayLog.length;

    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    set('hero-remaining', remaining.toLocaleString());
    set('hero-surplus',   (surplus >= 0 ? '+' : '') + surplus.toLocaleString());
    set('hero-tdee',      (profile.tdee || 0).toLocaleString());
    set('hero-meals',     meals);
  },

  /** Update macro bars */
  updateMacroBars(totals, macros) {
    const bars = [
      { id: 'protein', val: totals.protein, target: macros.protein, unit: 'g' },
      { id: 'carbs',   val: totals.carbs,   target: macros.carbs,   unit: 'g' },
      { id: 'fats',    val: totals.fat,     target: macros.fats,    unit: 'g' },
    ];

    bars.forEach(({ id, val, target, unit }) => {
      const pct = Calculator.pct(val, target);
      const bar = document.getElementById(`${id}-bar`);
      const txt = document.getElementById(`${id}-val`);
      if (bar) bar.style.width = `${pct}%`;
      if (txt) txt.textContent = `${Math.round(val)} / ${target}${unit}`;
    });
  },

  /** Render today's food log list */
  renderFoodLog(entries) {
    const list = document.getElementById('food-log-list');
    const totalEl = document.getElementById('log-total-kcal');
    if (!list) return;

    if (entries.length === 0) {
      list.innerHTML = `
        <div class="empty-log">
          <div class="empty-icon">🍽</div>
          <p>No meals logged yet.<br/>Hit the button above to start tracking.</p>
        </div>`;
      if (totalEl) totalEl.textContent = '0 kcal logged';
      return;
    }

    const total = entries.reduce((s, e) => s + e.cal, 0);
    if (totalEl) totalEl.textContent = `${total.toLocaleString()} kcal logged`;

    list.innerHTML = entries.map(e => `
      <div class="log-item" data-id="${e.id}">
        <span class="log-item-time">${e.time || '--:--'}</span>
        <div class="log-item-info">
          <div class="log-item-name">${cap(e.foodKey)} × ${e.grams}g</div>
          <div class="log-item-macros">P:${e.protein}g · C:${e.carbs}g · F:${e.fat}g</div>
        </div>
        <span class="log-item-kcal">${e.cal}</span>
        <button class="log-item-del" data-id="${e.id}" title="Remove">✕</button>
      </div>
    `).join('');

    // Delete handlers
    list.querySelectorAll('.log-item-del').forEach(btn => {
      btn.addEventListener('click', async (ev) => {
        ev.stopPropagation();
        const id = parseInt(btn.dataset.id);
        await App.db.deleteFoodLog(id);
        AudioManager.playError();
        Toast.show('Entry removed', 'error');
        await App.refreshDashboard();
      });
    });
  },

  /** Render suggestion banner on dashboard */
  renderSuggestion(suggestion) {
    const banner = document.getElementById('suggestion-banner');
    const msg    = document.getElementById('suggest-message');
    const card   = document.getElementById('suggest-card');
    if (!banner) return;

    if (!suggestion || suggestion.status === 'complete') {
      if (suggestion?.status === 'complete') {
        banner.classList.remove('hidden');
        if (msg) msg.textContent = suggestion.message;
        if (card) card.innerHTML = `<span style="color:var(--c-success);font-family:var(--f-display);font-weight:900">✓ DAILY TARGET ACHIEVED</span>`;
      } else {
        banner.classList.add('hidden');
      }
      return;
    }

    banner.classList.remove('hidden');
    if (msg) msg.textContent = suggestion.message;

    if (suggestion.snack && card) {
      card.innerHTML = `
        <div class="snack-card-name">${suggestion.snack.name}</div>
        <div>
          <div class="snack-card-cal">${suggestion.snack.cal} kcal</div>
          <div class="snack-card-desc">${suggestion.snack.desc}</div>
        </div>
      `;
    }
  },

  /** Search result items */
  renderSearchResults(results, targetInputId, targetPanelPrefix) {
    const isTab     = targetPanelPrefix === 'tab';
    const resultEl  = document.getElementById(`search-results${isTab ? '-tab' : ''}`);
    if (!resultEl) return;

    if (results.length === 0) {
      resultEl.innerHTML = `<div class="search-result-item" style="color:var(--text-secondary)">No results found</div>`;
      resultEl.classList.remove('hidden');
      return;
    }

    resultEl.innerHTML = results.map(r => `
      <div class="search-result-item" data-food="${r.name}">
        <div>
          <div class="result-name">${r.name}</div>
          <div class="result-macros">P:${r.protein}g · C:${r.carbs}g · F:${r.fat}g per 100g</div>
        </div>
        <div class="result-cal">${r.cal} kcal</div>
      </div>
    `).join('');
    resultEl.classList.remove('hidden');

    resultEl.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        FoodLogger.selectFood(item.dataset.food, isTab);
        resultEl.classList.add('hidden');
      });
    });
  },

  /** Food grid by category */
  renderFoodGrid(cat) {
    const grid = document.getElementById('food-grid');
    if (!grid) return;
    const foods = FoodSearch.byCategory(cat);
    grid.innerHTML = foods.map(f => `
      <div class="food-grid-item" data-food="${f.name}">
        <span class="fg-name">${f.name}</span>
        <span class="fg-cal">${f.cal} kcal / 100g</span>
        <span class="fg-macros">P:${f.protein}g · C:${f.carbs}g · F:${f.fat}g</span>
      </div>
    `).join('');
    grid.querySelectorAll('.food-grid-item').forEach(item => {
      item.addEventListener('click', () => {
        FoodLogger.selectFood(item.dataset.food, true);
        // Scroll to top of log tab
        document.getElementById('selected-food-panel-tab')?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  },

  /** Suggestions Tab content */
  renderSuggestionsTab(profile, totals) {
    const intel = document.getElementById('intel-status');
    if (intel) {
      const suggestion = SuggestionEngine.analyze(profile, totals);
      const remaining  = Math.max(0, profile.dailyTarget - totals.cal);
      intel.innerHTML = `
        <div>Status: <span class="status-val">${suggestion?.status?.toUpperCase() || 'LOADING'}</span></div>
        <div>Consumed: <span class="status-val">${totals.cal.toLocaleString()} kcal</span> / Target: <span class="status-val">${profile.dailyTarget?.toLocaleString() || 0} kcal</span></div>
        <div>Remaining: <span class="${remaining > 500 ? 'status-bad' : 'status-good'}">${remaining.toLocaleString()} kcal</span></div>
        <div style="margin-top:0.5rem;font-size:0.85em;color:var(--text-primary)">${suggestion?.message || ''}</div>
      `;
    }

    const grid = document.getElementById('snack-grid');
    if (grid) {
      const remaining = Math.max(0, profile.dailyTarget - totals.cal);
      grid.innerHTML = BULK_SNACKS.map(s => `
        <div class="snack-item">
          <div class="snack-item-info">
            <div class="snack-item-name">${s.name}</div>
            <div class="snack-item-desc">${s.desc}</div>
            <div class="snack-item-time">⏱ ${s.time}</div>
          </div>
          <div class="snack-item-cal">
            <div>${s.cal}</div>
            <div class="snack-item-badge">kcal</div>
          </div>
        </div>
      `).join('');
    }

    // Daily breakdown (meals by hour)
    const breakdown = document.getElementById('daily-breakdown');
    if (breakdown) {
      const log = App.state.todayLog;
      if (log.length === 0) {
        breakdown.innerHTML = `<p style="color:var(--text-secondary);font-size:0.875rem">No meals logged today.</p>`;
        return;
      }
      const maxCal = Math.max(...log.map(e => e.cal));
      breakdown.innerHTML = log.map(e => `
        <div class="breakdown-row">
          <span class="breakdown-time">${e.time || '--:--'}</span>
          <div class="breakdown-bar-wrap">
            <div class="breakdown-bar" style="width:${Math.round((e.cal / maxCal) * 100)}%"></div>
          </div>
          <span class="breakdown-kcal">${e.cal} kcal</span>
        </div>
      `).join('');
    }
  },

  /** Calendar Tab */
  renderCalendarTab(profile) {
    const meals = parseInt(profile.meals) || 5;
    const events = CalendarGen.generateMealEvents(profile);

    const mealsEl = document.getElementById('cal-meals-count');
    const kcalEl  = document.getElementById('cal-kcal-per-meal');
    if (mealsEl) mealsEl.textContent = meals;
    if (kcalEl)  kcalEl.textContent  = Math.round((profile.dailyTarget || 3000) / meals).toLocaleString();

    const list = document.getElementById('cal-events-list');
    if (list) {
      list.innerHTML = events.map(e => `
        <a href="${e.url}" target="_blank" rel="noopener" class="cal-event-card">
          <span class="cal-event-time">${e.time}</span>
          <div class="cal-event-info">
            <div class="cal-event-name">${e.label}</div>
            <div class="cal-event-cal">~${e.kcalPer.toLocaleString()} kcal · ${e.duration} min</div>
          </div>
          <span class="cal-event-arrow">→</span>
        </a>
      `).join('');
    }

    // "Open All" button
    const openAll = document.getElementById('open-all-cal');
    if (openAll) {
      openAll.onclick = () => {
        events.forEach((e, i) => setTimeout(() => window.open(e.url, '_blank'), i * 400));
        Toast.show('Opening calendar events...', 'success');
      };
    }
  },

  /** Alarm list rendering */
  async renderAlarmList(db) {
    const alarms = await db.getAlarms();
    const list   = document.getElementById('alarm-list');
    const summaryEl = document.getElementById('alarm-summary');
    const badgeEl   = document.getElementById('alarm-badge');

    const enabledCount = alarms.filter(a => a.enabled).length;
    if (badgeEl) {
      if (enabledCount > 0) {
        badgeEl.textContent = enabledCount;
        badgeEl.classList.remove('hidden');
      } else {
        badgeEl.classList.add('hidden');
      }
    }

    if (summaryEl) {
      summaryEl.innerHTML = alarms.length === 0
        ? `<p style="color:var(--text-secondary);font-size:0.875rem">No alarms set. Click MANAGE to add meal alarms.</p>`
        : alarms.filter(a => a.enabled).map(a => `
          <div class="alarm-summary-item">
            <div class="alarm-dot"></div>
            <span>${a.time} — ${a.label}</span>
          </div>
        `).join('');
    }

    if (!list) return;
    if (alarms.length === 0) {
      list.innerHTML = `<p style="color:var(--text-secondary);font-size:0.85rem">No alarms yet. Add one below.</p>`;
      return;
    }

    list.innerHTML = alarms.map(a => `
      <div class="alarm-item" data-id="${a.id}">
        <span class="alarm-item-time">${a.time}</span>
        <span class="alarm-item-label">${a.label}</span>
        <div class="alarm-item-toggle ${a.enabled ? 'on' : ''}" data-id="${a.id}" title="Toggle"></div>
        <button class="alarm-item-del" data-id="${a.id}" title="Delete">✕</button>
      </div>
    `).join('');

    list.querySelectorAll('.alarm-item-toggle').forEach(tog => {
      tog.addEventListener('click', async () => {
        const id    = parseInt(tog.dataset.id);
        const alarm = alarms.find(a => a.id === id);
        if (!alarm) return;
        alarm.enabled = !alarm.enabled;
        await db.updateAlarm(alarm);
        await UI.renderAlarmList(db);
      });
    });

    list.querySelectorAll('.alarm-item-del').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = parseInt(btn.dataset.id);
        await db.deleteAlarm(id);
        await UI.renderAlarmList(db);
        Toast.show('Alarm deleted', 'error');
      });
    });
  },
};

// ┌─────────────────────────────────────────────────────────┐
// │  14. FOOD LOGGER                                         │
// └─────────────────────────────────────────────────────────┘
const FoodLogger = {
  _selected: null,       // currently selected food key
  _isTab: false,         // true = using tab form, false = modal form

  selectFood(foodKey, isTab = false) {
    this._selected = foodKey;
    this._isTab    = isTab;

    const food    = FOODS[foodKey];
    if (!food) return;

    const prefix  = isTab ? '-tab' : '';
    const nameEl  = document.getElementById(`sel-food-name${prefix}`);
    const macroEl = document.getElementById(`sel-macros-preview${prefix}`);
    const panel   = document.getElementById(`selected-food-panel${prefix}`);

    if (nameEl)  nameEl.textContent = cap(foodKey);
    if (macroEl) macroEl.innerHTML  = `
      <span class="sel-macro-chip chip-cal">${food.cal} kcal</span>
      <span class="sel-macro-chip chip-protein">P: ${food.protein}g</span>
      <span class="sel-macro-chip chip-carbs">C: ${food.carbs}g</span>
      <span class="sel-macro-chip chip-fats">F: ${food.fat}g</span>
      <span style="font-size:0.65rem;color:var(--text-muted)">per 100g</span>
    `;
    if (panel) panel.classList.remove('hidden');

    // Reset weight input
    const weightEl = document.getElementById(`weight-input${prefix}`);
    if (weightEl) { weightEl.value = 100; this.updatePreview(); }
  },

  updatePreview() {
    if (!this._selected) return;
    const prefix  = this._isTab ? '-tab' : '';
    const grams   = parseFloat(document.getElementById(`weight-input${prefix}`)?.value) || 100;
    const calc    = Calculator.calcEntry(this._selected, grams);
    const preview = document.getElementById(`calc-preview${prefix}`);
    if (!preview || !calc) return;

    preview.innerHTML = `
      <div class="calc-macro"><span class="calc-macro-val cv-cal">${calc.cal}</span><span class="calc-macro-label">KCAL</span></div>
      <div class="calc-macro"><span class="calc-macro-val cv-p">${calc.protein}g</span><span class="calc-macro-label">PROTEIN</span></div>
      <div class="calc-macro"><span class="calc-macro-val cv-c">${calc.carbs}g</span><span class="calc-macro-label">CARBS</span></div>
      <div class="calc-macro"><span class="calc-macro-val cv-f">${calc.fat}g</span><span class="calc-macro-label">FATS</span></div>
    `;
  },

  async confirm(isTab = false) {
    if (!this._selected) return;
    const prefix = isTab ? '-tab' : '';
    const grams  = parseFloat(document.getElementById(`weight-input${prefix}`)?.value) || 100;
    if (grams <= 0) { Toast.show('Enter a valid weight', 'error'); return; }

    const entry = Calculator.calcEntry(this._selected, grams);
    if (!entry)  { Toast.show('Food not found', 'error'); return; }

    await App.db.addFoodLog(entry);
    AudioManager.playSuccess();
    Toast.show(`✓ Logged: ${cap(this._selected)} ${grams}g — ${entry.cal} kcal`,'success');

    // Reset
    this._selected = null;
    const panel = document.getElementById(`selected-food-panel${prefix}`);
    if (panel) panel.classList.add('hidden');
    const searchEl = document.getElementById(`food-search${isTab ? '-tab' : ''}`);
    if (searchEl)  searchEl.value = '';
    const resultsEl = document.getElementById(`search-results${isTab ? '-tab' : ''}`);
    if (resultsEl) resultsEl.classList.add('hidden');

    Modal.close('log-modal');
    await App.refreshDashboard();

    // Switch to dashboard
    if (!isTab) TabManager.switchTo('dashboard');
  },
};

// ┌─────────────────────────────────────────────────────────┐
// │  15. MODAL MANAGER                                       │
// └─────────────────────────────────────────────────────────┘
const Modal = {
  open(id) {
    document.getElementById(id)?.classList.remove('hidden');
    document.getElementById('overlay')?.classList.remove('hidden');
  },
  close(id) {
    document.getElementById(id)?.classList.add('hidden');
    // Close overlay if no other modals are open
    const anyOpen = document.querySelectorAll('.modal:not(.hidden)').length > 0;
    if (!anyOpen) document.getElementById('overlay')?.classList.add('hidden');
  },
  closeAll() {
    document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    document.getElementById('overlay')?.classList.add('hidden');
  },
};

// ┌─────────────────────────────────────────────────────────┐
// │  16. TAB MANAGER                                         │
// └─────────────────────────────────────────────────────────┘
const TabManager = {
  switchTo(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    document.querySelectorAll('.tab-content').forEach(sec => {
      const isActive = sec.id === `tab-${tab}`;
      sec.classList.toggle('active', isActive);
      sec.classList.toggle('hidden', !isActive);
    });

    // Re-render tab-specific content
    if (tab === 'suggestions') UI.renderSuggestionsTab(App.state.profile, App.state.totals);
    if (tab === 'calendar')    {
      UI.renderCalendarTab(App.state.profile);
      UI.renderAlarmList(App.db);
    }
  },
};

// ┌─────────────────────────────────────────────────────────┐
// │  17. SETUP FLOW                                          │
// └─────────────────────────────────────────────────────────┘
const Setup = {
  _step: 1,
  _maxStep: 3,

  init() {
    this._step = 1;
    this.renderStep();

    document.getElementById('setup-next')?.addEventListener('click', () => this.next());
    document.getElementById('setup-prev')?.addEventListener('click', () => this.prev());

    // Toggle buttons
    document.querySelectorAll('.toggle-btn[data-target]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        document.querySelectorAll(`[data-target="${target}"]`).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(target).value = btn.dataset.val;
      });
    });

    // Protocol cards
    document.querySelectorAll('.protocol-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.protocol-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        document.getElementById('s-surplus').value = card.dataset.surplus;
      });
    });
  },

  next() {
    if (!this.validate()) return;
    if (this._step < this._maxStep) {
      this._step++;
      this.renderStep();
    } else {
      this.complete();
    }
  },

  prev() {
    if (this._step > 1) { this._step--; this.renderStep(); }
  },

  validate() {
    if (this._step === 1) {
      const name = document.getElementById('s-name')?.value.trim();
      const age  = parseInt(document.getElementById('s-age')?.value);
      if (!name) { Toast.show('Enter your name', 'error'); return false; }
      if (!age || age < 15 || age > 80) { Toast.show('Enter a valid age (15–80)', 'error'); return false; }
    }
    if (this._step === 2) {
      const w = parseFloat(document.getElementById('s-weight')?.value);
      const h = parseFloat(document.getElementById('s-height')?.value);
      if (!w || w < 30) { Toast.show('Enter a valid weight', 'error'); return false; }
      if (!h || h < 100 && document.getElementById('s-height-unit')?.value === 'cm') {
        Toast.show('Enter a valid height', 'error'); return false;
      }
    }
    return true;
  },

  renderStep() {
    document.querySelectorAll('.step').forEach(s => {
      s.classList.toggle('active', parseInt(s.dataset.step) === this._step);
      s.classList.toggle('hidden', parseInt(s.dataset.step) !== this._step);
    });

    document.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i < this._step);
    });

    const prev = document.getElementById('setup-prev');
    const next = document.getElementById('setup-next');
    if (prev) prev.classList.toggle('hidden', this._step === 1);
    if (next) next.textContent = this._step === this._maxStep ? '🚀 LAUNCH BULK.OS' : 'NEXT →';
  },

  async complete() {
    // Gather inputs
    let weight_kg = parseFloat(document.getElementById('s-weight')?.value);
    let height_cm = parseFloat(document.getElementById('s-height')?.value);
    const weightUnit = document.getElementById('s-weight-unit')?.value;
    const heightUnit = document.getElementById('s-height-unit')?.value;

    if (weightUnit === 'lbs') weight_kg = Calculator.lbsToKg(weight_kg);
    if (heightUnit === 'in')  height_cm = Calculator.inToCm(height_cm);

    const profile = {
      name:     document.getElementById('s-name')?.value.trim(),
      age:      parseInt(document.getElementById('s-age')?.value),
      gender:   document.getElementById('s-gender')?.value,
      weightKg: Math.round(weight_kg * 10) / 10,
      heightCm: Math.round(height_cm),
      activity: parseFloat(document.getElementById('s-activity')?.value),
      surplus:  parseInt(document.getElementById('s-surplus')?.value),
      meals:    parseInt(document.getElementById('s-meals')?.value),
    };

    // Calculate TDEE
    const bmr    = Calculator.bmr(profile.weightKg, profile.heightCm, profile.age, profile.gender);
    const tdee   = Calculator.tdee(bmr, profile.activity);
    const target = Calculator.dailyTarget(tdee, profile.surplus);
    const macros = Calculator.macros(profile.weightKg, target);

    profile.bmr         = Math.round(bmr);
    profile.tdee        = tdee;
    profile.dailyTarget = target;
    profile.macros      = macros;

    await App.db.saveProfile(profile);

    // Default alarms based on meal schedule
    const schedule = MEAL_SCHEDULES[profile.meals] || MEAL_SCHEDULES[5];
    for (const meal of schedule) {
      await App.db.addAlarm({ time: meal.time, label: meal.label, enabled: true });
    }

    Modal.close('setup-modal');
    App.state.profile = profile;
    App.launch();
  },
};

// ┌─────────────────────────────────────────────────────────┐
// │  18. MAIN APP CONTROLLER                                 │
// └─────────────────────────────────────────────────────────┘
const App = {
  db:    new BulkDB(),
  state: {
    profile:  null,
    todayLog: [],
    totals:   { cal: 0, protein: 0, carbs: 0, fat: 0 },
  },

  async init() {
    await this.db.init();
    Toast.init();

    const profile = await this.db.getProfile();

    if (!profile) {
      // First launch: show setup
      Modal.open('setup-modal');
      Setup.init();
    } else {
      this.state.profile = profile;
      this.launch();
    }

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  },

  launch() {
    // Show app
    document.getElementById('app')?.classList.remove('hidden');

    // Update header
    this.updateHeaderDate();
    const nameEl = document.getElementById('athlete-name');
    if (nameEl) nameEl.textContent = this.state.profile?.name?.toUpperCase() || 'ATHLETE';

    // Init sub-systems
    AlarmScheduler.init(this.db);
    this.bindEvents();
    this.refreshDashboard();

    // Refresh every minute (for suggestion engine updates)
    setInterval(() => this.refreshSuggestion(), 60_000);
  },

  async refreshDashboard() {
    const log    = await this.db.getTodayLog();
    const totals = Calculator.totals(log);
    const prof   = this.state.profile;

    this.state.todayLog = log;
    this.state.totals   = totals;

    // Update UI
    UI.updateRing(totals.cal, prof.dailyTarget);
    UI.updateHeroStats(totals, prof);
    UI.updateMacroBars(totals, prof.macros);
    UI.renderFoodLog(log);
    this.refreshSuggestion();

    // Update greeting
    this.updateGreeting();
  },

  refreshSuggestion() {
    if (!this.state.profile) return;
    const suggestion = SuggestionEngine.analyze(this.state.profile, this.state.totals);
    UI.renderSuggestion(suggestion);
  },

  updateHeaderDate() {
    const el = document.getElementById('header-date');
    if (!el) return;
    el.textContent = new Date().toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric'
    }).toUpperCase();
  },

  updateGreeting() {
    const h = new Date().getHours();
    const greetEl = document.getElementById('greeting-text');
    if (!greetEl) return;
    if (h < 12)      greetEl.textContent = 'GOOD MORNING,';
    else if (h < 17) greetEl.textContent = 'GOOD AFTERNOON,';
    else             greetEl.textContent = 'GOOD EVENING,';
  },

  bindEvents() {
    // ── Tab navigation ──────────────────────────────────
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => TabManager.switchTo(btn.dataset.tab));
    });

    // ── Quick log button (dashboard) ────────────────────
    document.getElementById('quick-log-btn')?.addEventListener('click', () => {
      Modal.open('log-modal');
      setTimeout(() => document.getElementById('food-search')?.focus(), 100);
    });

    // ── Overlay / close modal ───────────────────────────
    document.getElementById('overlay')?.addEventListener('click', Modal.closeAll);
    document.querySelectorAll('.close-modal').forEach(btn => {
      btn.addEventListener('click', () => Modal.close(btn.dataset.modal));
    });

    // ── Settings button ─────────────────────────────────
    document.getElementById('settings-btn')?.addEventListener('click', () => {
      // Re-show setup but skip to a simple re-calc (for now, open setup again)
      Toast.show('Re-open setup by clearing app data', '');
    });

    // ── Notification button ─────────────────────────────
    document.getElementById('notif-btn')?.addEventListener('click', () => {
      Modal.open('alarm-modal');
      UI.renderAlarmList(this.db);
    });

    // ── Request notifications ───────────────────────────
    document.getElementById('request-notif-btn')?.addEventListener('click', async () => {
      const granted = await NotificationManager.requestPermission();
      Toast.show(granted ? '🔔 Notifications enabled!' : 'Permission denied', granted ? 'success' : 'error');
    });

    // ── Search (modal) ──────────────────────────────────
    this._bindSearch('food-search', '', false);
    this._bindSearch('food-search-tab', '-tab', true);

    // ── Weight adj buttons (modal) ──────────────────────
    this._bindWeightControls('', false);
    this._bindWeightControls('-tab', true);

    // ── Gram quick buttons (modal) ──────────────────────
    document.querySelectorAll('.gram-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('weight-input').value = btn.dataset.g;
        FoodLogger._isTab = false;
        FoodLogger.updatePreview();
        document.querySelectorAll('.gram-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
    document.querySelectorAll('.gram-btn-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('weight-input-tab').value = btn.dataset.g;
        FoodLogger._isTab = true;
        FoodLogger.updatePreview();
        document.querySelectorAll('.gram-btn-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // ── Confirm log buttons ─────────────────────────────
    document.getElementById('confirm-log')?.addEventListener('click', () => FoodLogger.confirm(false));
    document.getElementById('confirm-log-tab')?.addEventListener('click', () => FoodLogger.confirm(true));

    // ── Category filter ─────────────────────────────────
    document.querySelectorAll('.cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        UI.renderFoodGrid(btn.dataset.cat);
      });
    });
    UI.renderFoodGrid('all'); // initial render

    // ── Alarm modal ─────────────────────────────────────
    document.getElementById('manage-alarms-btn')?.addEventListener('click', () => {
      Modal.open('alarm-modal');
      UI.renderAlarmList(this.db);
    });

    document.getElementById('add-alarm-btn')?.addEventListener('click', async () => {
      const time  = document.getElementById('new-alarm-time')?.value;
      const label = document.getElementById('new-alarm-label')?.value.trim() || 'Meal';
      if (!time) { Toast.show('Pick a time', 'error'); return; }
      await this.db.addAlarm({ time, label, enabled: true });
      await UI.renderAlarmList(this.db);
      document.getElementById('new-alarm-label').value = '';
      Toast.show(`Alarm set: ${time}`, 'success');
    });

    document.getElementById('test-alarm-btn')?.addEventListener('click', () => {
      AudioManager.playAlarm();
      NotificationManager.send('⚡ TEST ALARM — BULK.OS', 'Your alarm system is working. Time to eat!');
      Toast.show('Test alarm fired!', 'success');
    });

    // ── Manage alarms btn on calendar tab ───────────────
    document.getElementById('request-notif-btn')?.addEventListener('click', async () => {
      const granted = await NotificationManager.requestPermission();
      Toast.show(granted ? '🔔 Notifications enabled!' : 'Permission denied', granted ? 'success' : 'error');
    });
  },

  _bindSearch(inputId, suffix, isTab) {
    const el = document.getElementById(inputId);
    if (!el) return;
    let debounce;
    el.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        const results = FoodSearch.search(el.value);
        if (el.value.length > 0) {
          UI.renderSearchResults(results, inputId, isTab ? 'tab' : '');
        } else {
          document.getElementById(`search-results${suffix}`)?.classList.add('hidden');
        }
      }, 200);
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.getElementById(`search-results${suffix}`)?.classList.add('hidden');
      }
    });
  },

  _bindWeightControls(suffix, isTab) {
    document.querySelectorAll(`.weight-adj${suffix}`).forEach(btn => {
      btn.addEventListener('click', () => {
        const input = document.getElementById(`weight-input${suffix}`);
        if (!input) return;
        const delta = parseInt(btn.dataset.delta);
        input.value = Math.max(1, (parseFloat(input.value) || 100) + delta);
        FoodLogger._isTab = isTab;
        FoodLogger.updatePreview();
      });
    });
    document.getElementById(`weight-input${suffix}`)?.addEventListener('input', () => {
      FoodLogger._isTab = isTab;
      FoodLogger.updatePreview();
    });
  },
};

// ┌─────────────────────────────────────────────────────────┐
// │  UTILITIES                                               │
// └─────────────────────────────────────────────────────────┘
function cap(str) {
  return str?.replace(/\b\w/g, c => c.toUpperCase()) || '';
}

// ┌─────────────────────────────────────────────────────────┐
// │  BOOT                                                    │
// └─────────────────────────────────────────────────────────┘
document.addEventListener('DOMContentLoaded', () => App.init());
