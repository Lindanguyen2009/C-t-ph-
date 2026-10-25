/**
 * CỜ TỶ PHÚ ẨM THỰC VIỆT NAM (PHIÊN BẢN TRUYỀN THỐNG HOÀNG GIA ĐỎ)
 * - Xúc xắc 3D Three.js gốc: Khối sứ trắng ngà đổ bóng chân thật, góc nhìn trực diện chuẩn chỉ, vật lý nhào lộn 3 trục
 * - Bàn cờ 28 ô vuông vắn (8x8) chuẩn tỷ lệ, bước đi âm thanh lách cách rộn ràng
 * - 10 món ẩm thực đường phố tuyển chọn chuẩn vị Việt Nam:
 *   1. Cơm tấm
 *   2. Bánh xèo
 *   3. Bánh mì
 *   4. Phá lấu
 *   5. Hủ tiếu
 *   6. Xôi
 *   7. Bún thịt nướng
 *   8. Bột chiên
 *   9. Bò bía
 *   10. Các món chè
 * - Bố cục Stage 5 Đỏ Hoàng Gia truyền thống với họa tiết Rồng Bay Phượng Múa & Trống Đồng Đông Sơn:
 *   + Ở giữa: Hình ảnh món ăn nổi bật (Hero Spotlight)
 *   + Lướt sang TRÁI: Giới thiệu món ăn, gốc tích di sản & mâm nguyên liệu
 *   + Lướt sang PHẢI: Danh sách các quán ăn nổi tiếng gia truyền tại TP.HCM & Hà Nội
 * - Chatbox ngắn gọn: Giới thiệu sơ qua tên món và hướng dẫn người dùng lướt trái / phải
 * - Tự động tung xúc xắc tiếp khi bấm "Quay lại Bàn Cờ"
 * - Nhân vật dẫn đường bự hơn, đổi hành động theo từng màn hình
 * - Lời thoại của nhân vật phong phú, thay đổi trước mỗi lượt gieo xúc xắc
 */

(function () {
  'use strict';

  // ==========================================================================
  // ==========================================================================
  // 1. SOUND MANAGER & TRADITIONAL VIETNAMESE BGM SYNTHESIZER (Web Audio API)
  // ==========================================================================
  // Thang âm ngũ cung truyền thống (D Pentatonic - Điệu Bắc trong sáng, thanh bình)
  const BGM_NOTES = {
    D2: 73.42,
    A2: 110.00,
    D3: 146.83,
    E3: 164.81,
    G3: 196.00,
    A3: 220.00,
    B3: 246.94,
    D4: 293.66,
    E4: 329.63,
    G4: 392.00,
    A4: 440.00,
    B4: 493.88,
    D5: 587.33,
    E5: 659.25,
    G5: 783.99,
    A5: 880.00,
    B5: 987.77,
    D6: 1174.66
  };

  // Bản nhạc ngũ cung nhẹ nhàng 16 ô nhịp (~58 giây mỗi vòng lặp tuần hoàn)
  // Nhạc cụ: zither (Đàn Tranh), flute (Sáo Trúc), bell (Chuông Gió/Khánh Đồng)
  const BGM_SCORE = [
    // Đoạn 1: Mở màn tiếng Đàn Tranh thong dong, thanh cảnh như sớm mai chợ quê (Nhịp 0 - 15)
    ['zither', 0, 2, 'D4', 0.65],
    ['zither', 1.5, 1, 'A4', 0.55],
    ['zither', 2.5, 1, 'B4', 0.6],
    ['zither', 3.5, 2, 'D5', 0.7],
    ['bell', 4, 3, 'A5', 0.35],
    ['zither', 5, 1.5, 'E5', 0.65],
    ['zither', 6.5, 1.5, 'D5', 0.6],
    ['zither', 8, 2, 'B4', 0.55],
    ['zither', 9.5, 1, 'A4', 0.5],
    ['zither', 11, 2, 'G4', 0.55],
    ['zither', 13, 1.5, 'A4', 0.6],
    ['zither', 14.5, 1.5, 'D4', 0.65],

    // Đoạn 2: Tiếng Sáo Trúc ngân nga vút bay, hòa cùng tiếng đàn dìu dặt (Nhịp 16 - 31)
    ['flute', 16, 3, 'A4', 0.75],
    ['zither', 16, 2, 'D4', 0.45],
    ['flute', 19, 2, 'B4', 0.75],
    ['zither', 18, 1.5, 'A4', 0.4],
    ['flute', 21, 3, 'D5', 0.8],
    ['zither', 21, 1.5, 'D4', 0.4],
    ['zither', 22.5, 1.5, 'G4', 0.45],
    ['flute', 24, 2.5, 'E5', 0.85],
    ['flute', 26.5, 1.5, 'D5', 0.8],
    ['zither', 25, 2, 'A4', 0.45],
    ['flute', 28, 3.5, 'B4', 0.75],
    ['bell', 28, 4, 'D5', 0.4],
    ['zither', 28.5, 1.5, 'D4', 0.35],
    ['zither', 30, 2, 'E4', 0.4],

    // Đoạn 3: Ngũ cung chuyển ấm áp, phong vị ẩm thực ba miền thanh nhã (Nhịp 32 - 47)
    ['flute', 32, 2.5, 'E5', 0.8],
    ['zither', 32, 1.5, 'G4', 0.45],
    ['flute', 34.5, 1.5, 'G5', 0.8],
    ['zither', 34, 1.5, 'B4', 0.45],
    ['flute', 36, 3, 'A5', 0.85],
    ['bell', 36, 3.5, 'B5', 0.35],
    ['zither', 36.5, 1, 'E5', 0.45],
    ['zither', 38, 2, 'D5', 0.5],
    ['flute', 39.5, 2, 'G5', 0.75],
    ['flute', 41.5, 2, 'E5', 0.75],
    ['zither', 41, 1.5, 'B4', 0.45],
    ['flute', 43.5, 3.5, 'D5', 0.8],
    ['zither', 43, 2, 'A4', 0.45],
    ['zither', 45.5, 1.5, 'G4', 0.4],

    // Đoạn 4: Gió thoảng, chuông chiều lững lờ, lắng đọng về lại nốt chủ D (Nhịp 48 - 63)
    ['flute', 48, 3, 'B4', 0.7],
    ['zither', 48, 2, 'D4', 0.45],
    ['bell', 48, 4, 'A5', 0.35],
    ['flute', 51, 2, 'A4', 0.65],
    ['zither', 50.5, 1.5, 'E4', 0.4],
    ['flute', 53, 3, 'G4', 0.65],
    ['zither', 52.5, 1.5, 'G4', 0.45],
    ['zither', 54.5, 1.5, 'A4', 0.5],
    ['flute', 56, 4, 'D4', 0.75],
    ['zither', 56.5, 2, 'D4', 0.55],
    ['zither', 59, 2, 'A4', 0.45],
    ['zither', 61, 2.5, 'D5', 0.6],
    ['bell', 60, 4, 'D6', 0.35]
  ];

  class SoundManager {
    constructor() {
      this.ctx = null;

      // Trạng thái nhạc nền (BGM)
      this.bgmPlaying = false;
      let isMutedStored = false;
      try {
        isMutedStored = localStorage.getItem('cotyphu_bgm_muted') === 'true';
      } catch (e) {}
      this.bgmMuted = isMutedStored;
      this.bgmMasterGain = null;
      this.bgmFilter = null;
      this.bgmDelayNode = null;
      this.bgmDelayGain = null;
      this.droneNodes = [];
      this.bgmLoopTimer = null;
      this.loopStartTime = 0;
      this.tempoBpm = 66;
      this.beatDuration = 60 / 66; // ~0.909s
      this.totalLoopDuration = 64 * this.beatDuration; // 58.18s
      this.hasBoundInteraction = false;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
          this.setupBgmBus();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    setupBgmBus() {
      if (!this.ctx || this.bgmMasterGain) return;

      // Master gain cho nhạc nền: âm lượng nhẹ nhàng êm tai (~0.082)
      this.bgmMasterGain = this.ctx.createGain();
      const initialVol = this.bgmMuted ? 0.0001 : 0.082;
      this.bgmMasterGain.gain.setValueAtTime(initialVol, this.ctx.currentTime);

      // Bộ lọc ấm áp (lowpass 2600Hz) loại bỏ tiếng chát chúa, giữ âm mộc tự nhiên
      this.bgmFilter = this.ctx.createBiquadFilter();
      this.bgmFilter.type = 'lowpass';
      this.bgmFilter.frequency.setValueAtTime(2600, this.ctx.currentTime);

      // Hiệu ứng vang mộc tự nhiên (Acoustic Chamber Delay)
      this.bgmDelayNode = this.ctx.createDelay();
      this.bgmDelayNode.delayTime.setValueAtTime(0.32, this.ctx.currentTime);

      this.bgmDelayGain = this.ctx.createGain();
      this.bgmDelayGain.gain.setValueAtTime(0.28, this.ctx.currentTime);

      const delayFilter = this.ctx.createBiquadFilter();
      delayFilter.type = 'lowpass';
      delayFilter.frequency.setValueAtTime(1100, this.ctx.currentTime);

      // Kết nối tuyến âm thanh
      this.bgmMasterGain.connect(this.bgmFilter);
      this.bgmFilter.connect(this.ctx.destination);

      this.bgmMasterGain.connect(this.bgmDelayNode);
      this.bgmDelayNode.connect(delayFilter);
      delayFilter.connect(this.bgmDelayGain);
      delayFilter.connect(this.bgmDelayNode); // Phản hồi vang
      this.bgmDelayGain.connect(this.ctx.destination);
    }

    playCloudParting() {
      this.init();
      if (!this.ctx) return;
      const chords = [392.00, 493.88, 587.33, 659.25, 783.99, 987.77];
      chords.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.1);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

        gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + idx * 0.1 + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.1 + 1.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.1);
        osc.stop(this.ctx.currentTime + idx * 0.1 + 1.3);
      });
    }

    playDialogueChirp() {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const baseFreq = 480 + Math.random() * 140;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, this.ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.065, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.045);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    }

    playWhoosh() {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(540, this.ctx.currentTime + 0.3);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.65);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.22, this.ctx.currentTime + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.7);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.75);
    }

    playChime() {
      this.init();
      if (!this.ctx) return;
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.07);

        gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.07 + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.07);
        osc.stop(this.ctx.currentTime + idx * 0.07 + 0.85);
      });
    }

    playDiceRoll() {
      this.init();
      if (!this.ctx) return;
      // Âm thanh lách cách xúc xắc gõ mặt gỗ
      for (let i = 0; i < 9; i++) {
        const delay = i * 0.09 + Math.random() * 0.03;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(240 + Math.random() * 260, this.ctx.currentTime + delay);

        gain.gain.setValueAtTime(0.18, this.ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + delay + 0.065);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + delay);
        osc.stop(this.ctx.currentTime + delay + 0.075);
      }
    }

    playFootstep() {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      const base = 210 + Math.random() * 45;
      osc.frequency.setValueAtTime(base, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(75, this.ctx.currentTime + 0.045);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.055);
    }

    playHop() {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(560, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.11);
    }

    playCelebrationFanfare() {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.09);

        gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.09);
        gain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + idx * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.09 + 0.85);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.09);
        osc.stop(this.ctx.currentTime + idx * 0.09 + 0.9);
      });
    }

    playToastPop() {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(980, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.19);
    }

    // ========================================================================
    // BGM SYNTHESIS INSTRUMENTS (ĐÀN TRANH, SÁO TRÚC, CHUÔNG GIÓ, NỀN TRẦM)
    // ========================================================================

    // 1. Tiếng Đàn Tranh (Vietnamese Zither Pluck)
    playDanTranhNote(freq, startTime, duration = 1.8, velocity = 0.7) {
      if (!this.ctx || !this.bgmMasterGain) return;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      const noteFilter = this.ctx.createBiquadFilter();

      // Kết hợp sóng tam giác và sóng sin tạo âm dây tơ/kim loại vang thanh thoát
      osc1.type = 'triangle';
      osc2.type = 'sine';

      // Mô phỏng lực gảy ngón vuốt (attack transient)
      osc1.frequency.setValueAtTime(freq * 1.018, startTime);
      osc1.frequency.exponentialRampToValueAtTime(freq, startTime + 0.035);
      osc2.frequency.setValueAtTime(freq * 2, startTime);

      // Thùng đàn gỗ cộng hưởng ấm
      noteFilter.type = 'lowpass';
      noteFilter.frequency.setValueAtTime(Math.min(freq * 4.5, 3200), startTime);
      noteFilter.frequency.exponentialRampToValueAtTime(Math.min(freq * 1.8, 1200), startTime + duration);
      noteFilter.Q.setValueAtTime(1.8, startTime);

      // Biên độ ngân nga tự nhiên
      const peakGain = 0.14 * velocity;
      noteGain.gain.setValueAtTime(0.0001, startTime);
      noteGain.gain.linearRampToValueAtTime(peakGain, startTime + 0.006);
      noteGain.gain.exponentialRampToValueAtTime(peakGain * 0.35, startTime + 0.18);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc1.connect(noteFilter);
      osc2.connect(noteFilter);
      noteFilter.connect(noteGain);
      noteGain.connect(this.bgmMasterGain);

      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + duration + 0.05);
      osc2.stop(startTime + duration + 0.05);
    }

    // 2. Tiếng Sáo Trúc (Bamboo Flute với hơi thở và rung ngón Vibrato)
    playSaoTrucNote(freq, startTime, duration = 2.5, velocity = 0.8) {
      if (!this.ctx || !this.bgmMasterGain) return;

      const osc = this.ctx.createOscillator();
      const overtoneOsc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      const noteFilter = this.ctx.createBiquadFilter();

      // Bộ tạo rung ngón (LFO Vibrato 4.6Hz)
      const vibratoLfo = this.ctx.createOscillator();
      const vibratoGain = this.ctx.createGain();
      vibratoLfo.frequency.setValueAtTime(4.6, startTime);
      vibratoGain.gain.setValueAtTime(0, startTime);
      // Rung nở dần sau khi bắt đầu nốt 0.25s
      vibratoGain.gain.setValueAtTime(0, startTime + 0.25);
      vibratoGain.gain.linearRampToValueAtTime(freq * 0.015, startTime + 0.8);

      vibratoLfo.connect(vibratoGain);
      vibratoGain.connect(osc.frequency);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      // Họa âm ống trúc nhẹ nhàng
      overtoneOsc.type = 'sine';
      overtoneOsc.frequency.setValueAtTime(freq * 3, startTime);
      const overtoneGain = this.ctx.createGain();
      overtoneGain.gain.setValueAtTime(0.055, startTime);

      noteFilter.type = 'lowpass';
      noteFilter.frequency.setValueAtTime(1800, startTime);

      // Vuốt hơi vào và nhả hơi ra mềm mại
      const peakGain = 0.16 * velocity;
      const attack = 0.18;
      const release = 0.35;
      noteGain.gain.setValueAtTime(0.0001, startTime);
      noteGain.gain.linearRampToValueAtTime(peakGain, startTime + attack);
      noteGain.gain.setValueAtTime(peakGain, startTime + Math.max(attack, duration - release));
      noteGain.gain.linearRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(noteFilter);
      overtoneOsc.connect(overtoneGain);
      overtoneGain.connect(noteFilter);
      noteFilter.connect(noteGain);
      noteGain.connect(this.bgmMasterGain);

      vibratoLfo.start(startTime);
      osc.start(startTime);
      overtoneOsc.start(startTime);

      vibratoLfo.stop(startTime + duration + 0.05);
      osc.stop(startTime + duration + 0.05);
      overtoneOsc.stop(startTime + duration + 0.05);
    }

    // 3. Chuông Gió & Khánh Đồng (Wind Chime / Bronze Bell)
    playChuongGioNote(freq, startTime, duration = 3.5, velocity = 0.5) {
      if (!this.ctx || !this.bgmMasterGain) return;

      const partials = [1.0, 1.48, 2.14, 2.76];
      const partialGains = [0.12, 0.06, 0.04, 0.02];

      partials.forEach((mult, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * mult, startTime);

        const pGain = partialGains[idx] * velocity;
        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.linearRampToValueAtTime(pGain, startTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration / (1 + idx * 0.4));

        osc.connect(gain);
        gain.connect(this.bgmMasterGain);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.1);
      });
    }

    // 4. Âm Dương Nền Trầm (Warm Drone Pad)
    startWarmDrone() {
      if (!this.ctx || !this.bgmMasterGain || this.droneNodes.length > 0) return;

      const droneFreqs = [73.42, 110.00, 146.83];
      droneFreqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(160, this.ctx.currentTime);

        const droneVol = 0.022 / (idx + 1);
        gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(droneVol, this.ctx.currentTime + 3.0);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.bgmMasterGain);

        osc.start();
        this.droneNodes.push({ osc, gain });
      });
    }

    stopWarmDrone() {
      this.droneNodes.forEach(({ osc, gain }) => {
        try {
          gain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
          setTimeout(() => {
            try { osc.stop(); osc.disconnect(); } catch (err) {}
          }, 900);
        } catch (e) {}
      });
      this.droneNodes = [];
    }

    // ========================================================================
    // BGM CONTROL & SCHEDULER
    // ========================================================================
    startBGM() {
      this.init();
      if (!this.ctx) return;
      if (this.bgmPlaying) return;
      this.bgmPlaying = true;

      this.startWarmDrone();

      if (this.bgmMuted) {
        this.bgmMasterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      } else {
        this.bgmMasterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
        this.bgmMasterGain.gain.linearRampToValueAtTime(0.082, this.ctx.currentTime + 2.0);
      }

      this.updateBgmUi();

      this.loopStartTime = this.ctx.currentTime + 0.1;
      this.scheduleScoreLoop();

      if (this.bgmLoopTimer) clearInterval(this.bgmLoopTimer);
      this.bgmLoopTimer = setInterval(() => {
        if (!this.bgmPlaying || !this.ctx) return;
        if (this.ctx.currentTime >= this.loopStartTime + this.totalLoopDuration - 4) {
          this.loopStartTime += this.totalLoopDuration;
          this.scheduleScoreLoop();
        }
      }, 2000);
    }

    scheduleScoreLoop() {
      if (!this.ctx) return;
      const baseTime = this.loopStartTime;

      BGM_SCORE.forEach(([inst, beat, durBeats, noteName, vel]) => {
        const noteFreq = BGM_NOTES[noteName];
        if (!noteFreq) return;
        const noteStartTime = baseTime + beat * this.beatDuration;
        const noteDuration = durBeats * this.beatDuration;

        if (noteStartTime >= this.ctx.currentTime - 0.1) {
          if (inst === 'zither') {
            this.playDanTranhNote(noteFreq, noteStartTime, noteDuration, vel);
          } else if (inst === 'flute') {
            this.playSaoTrucNote(noteFreq, noteStartTime, noteDuration, vel);
          } else if (inst === 'bell') {
            this.playChuongGioNote(noteFreq, noteStartTime, noteDuration, vel);
          }
        }
      });
    }

    stopBGM() {
      if (!this.bgmPlaying) return;
      this.bgmPlaying = false;
      if (this.bgmLoopTimer) {
        clearInterval(this.bgmLoopTimer);
        this.bgmLoopTimer = null;
      }
      this.stopWarmDrone();
      if (this.bgmMasterGain && this.ctx) {
        this.bgmMasterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);
      }
      this.updateBgmUi();
    }

    toggleBGM() {
      this.init();
      if (!this.ctx) return;

      if (!this.bgmPlaying) {
        this.bgmMuted = false;
        try { localStorage.setItem('cotyphu_bgm_muted', 'false'); } catch (e) {}
        this.startBGM();
        return;
      }

      this.bgmMuted = !this.bgmMuted;
      try { localStorage.setItem('cotyphu_bgm_muted', this.bgmMuted ? 'true' : 'false'); } catch (e) {}

      if (this.bgmMuted) {
        this.bgmMasterGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.bgmMasterGain.gain.setValueAtTime(this.bgmMasterGain.gain.value, this.ctx.currentTime);
        this.bgmMasterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.7);
      } else {
        this.bgmMasterGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.bgmMasterGain.gain.setValueAtTime(this.bgmMasterGain.gain.value, this.ctx.currentTime);
        this.bgmMasterGain.gain.linearRampToValueAtTime(0.082, this.ctx.currentTime + 1.2);
      }

      this.updateBgmUi();
    }

    updateBgmUi() {
      const btn = document.getElementById('bgmToggleBtn');
      if (!btn) return;

      const iconEl = btn.querySelector('.bgm-icon');
      const textEl = btn.querySelector('.bgm-text');

      if (this.bgmMuted || !this.bgmPlaying) {
        btn.classList.add('is-muted');
        btn.classList.remove('is-playing');
        btn.setAttribute('aria-label', 'Bật nhạc nền');
        btn.setAttribute('title', 'Nhấn để bật nhạc nền dân gian nhẹ nhàng');
        if (iconEl) iconEl.textContent = '🔇';
        if (textEl) textEl.textContent = 'Nhạc: Tắt';
      } else {
        btn.classList.remove('is-muted');
        btn.classList.add('is-playing');
        btn.setAttribute('aria-label', 'Tắt nhạc nền');
        btn.setAttribute('title', 'Nhấn để tắt nhạc nền');
        if (iconEl) iconEl.textContent = '🎵';
        if (textEl) textEl.textContent = 'Nhạc: Bật';
      }
    }

    bindBgmControls() {
      const btn = document.getElementById('bgmToggleBtn');
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.init();
          this.toggleBGM();
        });
      }
      this.updateBgmUi();
    }

    bindFirstInteraction() {
      if (this.hasBoundInteraction) return;
      this.hasBoundInteraction = true;

      const handleGesture = () => {
        this.init();
        if (!this.bgmMuted && !this.bgmPlaying) {
          this.startBGM();
        }
        window.removeEventListener('pointerdown', handleGesture);
        window.removeEventListener('click', handleGesture);
        window.removeEventListener('keydown', handleGesture);
        window.removeEventListener('touchstart', handleGesture);
      };

      window.addEventListener('pointerdown', handleGesture, { passive: true });
      window.addEventListener('click', handleGesture, { passive: true });
      window.addEventListener('keydown', handleGesture, { passive: true });
      window.addEventListener('touchstart', handleGesture, { passive: true });
    }
  }

  const sfx = new SoundManager();

  // ==========================================================================
  // 2. 10 ICONIC VIETNAMESE STREET FOOD DISHES
  // ==========================================================================
  const DISH_KEYS = [
    "com_tam",
    "banh_xeo",
    "banh_mi",
    "pha_lau",
    "hu_tieu",
    "xoi",
    "bun_thit_nuong",
    "bot_chien",
    "bo_bia",
    "che",
    "mi_vit_tiem",
    "banh_canh_cua",
    "sui_cao",
    "banh_trang_tron",
    "bun_dau_mam_tom",
    "oc"
  ];

  function getFoodDatabase() {
    return (typeof window !== 'undefined' && window.FOOD_DATABASE) ? window.FOOD_DATABASE : {};
  }

  function getDishByKey(key) {
    const db = getFoodDatabase();
    return db[key] || db.com_tam || null;
  }

  function getDishForTile(tileIndex) {
    const tileEl = document.getElementById(`tile-${tileIndex}`);
    if (tileEl && tileEl.dataset.dish) {
      const dish = getDishByKey(tileEl.dataset.dish);
      if (dish) return dish;
    }
    // Nếu ô không có món ăn (GIEO QUẺ, CHỢ, GÓC, BẮT ĐẦU), trả null
    return null;
  }

  // ==========================================================================
  // 3. ORIGINAL 3D IVORY PORCELAIN DICE ENGINE (Three.js WebGL)
  // - Trả lại cục xúc sắc cũ 3D nguyên bản
  // - Khối sứ ngà đổ bóng, góc nhìn camera thẳng trực diện
  // - Nhào lộn 3 trục chân thực, tiếp đất phẳng phiu, pips rõ nét
  // ==========================================================================
  class DiceEngine {
    constructor(canvas, onRollComplete) {
      this.canvas = canvas;
      this.onRollComplete = onRollComplete;
      this.renderer = null;
      this.scene = null;
      this.camera = null;

      this.die1 = null;
      this.die2 = null;
      this.pipTextures = [];
      this.isRolling = false;
      this.time = 0;

      if (!this.canvas) return;
      this.init();
    }

    init() {
      const width = this.canvas.clientWidth || 250;
      const height = this.canvas.clientHeight || 250;

      this.scene = new THREE.Scene();
      // Camera nhìn thẳng góc trực diện (Z axis) -> Mặt xúc xắc vuông vức 100%
      this.camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      this.camera.position.set(0, 0, 4.4);
      this.camera.lookAt(0, 0, 0);

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        antialias: true
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      // Ánh sáng tạo khối 3D sứ ngà mềm mại
      const ambLight = new THREE.AmbientLight(0xFFFFFF, 1.25);
      this.scene.add(ambLight);

      const dirLight = new THREE.DirectionalLight(0xFFFFFF, 1.35);
      dirLight.position.set(3, 5, 4);
      this.scene.add(dirLight);

      const rimLight = new THREE.DirectionalLight(0xFFE082, 0.65);
      rimLight.position.set(-3, -2, 2);
      this.scene.add(rimLight);

      // Pre-render 6 mặt xúc xắc với chất lượng cao
      this.pipTextures = [null];
      for (let i = 1; i <= 6; i++) {
        this.pipTextures.push(this.createDicePipTexture(i));
      }

      const geom = new THREE.BoxGeometry(0.92, 0.92, 0.92);

      // Khởi tạo xúc xắc ban đầu
      this.die1 = new THREE.Mesh(geom, this.createMaterialsForFrontFace(3));
      this.die1.position.set(-0.7, 0.1, 0);
      this.scene.add(this.die1);

      this.die2 = new THREE.Mesh(geom, this.createMaterialsForFrontFace(4));
      this.die2.position.set(0.7, -0.1, 0);
      this.scene.add(this.die2);

      // Bấm trực tiếp vào canvas để tung
      this.canvas.addEventListener('click', (e) => {
        e.stopPropagation();
        this.roll();
      });

      this.animate();
    }

    createDicePipTexture(dots) {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 512;
      const ctx = c.getContext('2d');

      // 1. Nền sứ trắng ngà cao cấp
      const bgGrad = ctx.createRadialGradient(256, 256, 60, 256, 256, 330);
      bgGrad.addColorStop(0, '#FFFFFF');
      bgGrad.addColorStop(0.7, '#FFFDF6');
      bgGrad.addColorStop(1, '#EDE5D8');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 512, 512);

      // 2. Viền bo góc giả lập khối 3D mềm mại
      ctx.strokeStyle = '#D9CFBF';
      ctx.lineWidth = 18;
      ctx.strokeRect(10, 10, 492, 492);

      // 3. Đường chỉ hoàng kim tinh tế
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
      ctx.lineWidth = 4;
      ctx.strokeRect(24, 24, 464, 464);

      // 4. Vẽ chấm tròn đen tuyền / đỏ son bóng bẩy
      const drawPip = (x, y, radius = 44, isRed = false) => {
        // Drop shadow của chấm lõm
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y + 4, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
        ctx.fill();
        ctx.restore();

        // Thân chấm gradient
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);

        if (isRed) {
          const redGrad = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, radius * 0.1, x, y, radius);
          redGrad.addColorStop(0, '#FF453A');
          redGrad.addColorStop(0.75, '#C5221F');
          redGrad.addColorStop(1, '#8B0000');
          ctx.fillStyle = redGrad;
        } else {
          const blackGrad = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, radius * 0.1, x, y, radius);
          blackGrad.addColorStop(0, '#2F2F2F');
          blackGrad.addColorStop(0.85, '#111111');
          blackGrad.addColorStop(1, '#050505');
          ctx.fillStyle = blackGrad;
        }
        ctx.fill();

        // Ánh sáng phản chiếu bóng bẩy (Specular highlight)
        ctx.beginPath();
        ctx.arc(x - radius * 0.32, y - radius * 0.32, radius * 0.32, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.fill();
      };

      const mid = 256, left = 136, right = 376, top = 136, bot = 376;

      // Chấm 1 và 4 dùng màu đỏ son may mắn theo truyền thống Á Đông
      if (dots === 1) {
        drawPip(mid, mid, 65, true);
      } else if (dots === 2) {
        drawPip(left, top);
        drawPip(right, bot);
      } else if (dots === 3) {
        drawPip(left, top);
        drawPip(mid, mid);
        drawPip(right, bot);
      } else if (dots === 4) {
        drawPip(left, top, 44, true);
        drawPip(right, top, 44, true);
        drawPip(left, bot, 44, true);
        drawPip(right, bot, 44, true);
      } else if (dots === 5) {
        drawPip(left, top);
        drawPip(right, top);
        drawPip(mid, mid, 44, true);
        drawPip(left, bot);
        drawPip(right, bot);
      } else if (dots === 6) {
        drawPip(left, top);
        drawPip(right, top);
        drawPip(left, mid);
        drawPip(right, mid);
        drawPip(left, bot);
        drawPip(right, bot);
      }

      const tex = new THREE.CanvasTexture(c);
      tex.needsUpdate = true;
      return tex;
    }

    // Material index 4 (+Z) LUÔN LUÔN LÀ MẶT TRỰC DIỆN NHÌN THẲNG VÀO MẮT NGƯỜI DÙNG
    createMaterialsForFrontFace(frontValue) {
      const oppValue = 7 - frontValue;
      const others = [1, 2, 3, 4, 5, 6].filter(n => n !== frontValue && n !== oppValue);

      return [
        new THREE.MeshStandardMaterial({ map: this.pipTextures[others[0]], roughness: 0.22, metalness: 0.05 }), // +X
        new THREE.MeshStandardMaterial({ map: this.pipTextures[others[1]], roughness: 0.22, metalness: 0.05 }), // -X
        new THREE.MeshStandardMaterial({ map: this.pipTextures[others[2]], roughness: 0.22, metalness: 0.05 }), // +Y
        new THREE.MeshStandardMaterial({ map: this.pipTextures[others[3]], roughness: 0.22, metalness: 0.05 }), // -Y
        new THREE.MeshStandardMaterial({ map: this.pipTextures[frontValue], roughness: 0.22, metalness: 0.05 }), // +Z (FRONT: MẶT VUÔNG VẮN TRỰC DIỆN)
        new THREE.MeshStandardMaterial({ map: this.pipTextures[oppValue],   roughness: 0.22, metalness: 0.05 })  // -Z
      ];
    }

    roll() {
      if (this.isRolling) return;
      this.isRolling = true;
      sfx.playDiceRoll();

      // Chọn số ngẫu nhiên từ 1 đến 6
      const val1 = Math.floor(Math.random() * 6) + 1;
      const val2 = Math.floor(Math.random() * 6) + 1;
      const exactSteps = val1 + val2;

      // CẬP NHẬT TRỰC TIẾP MẶT TRƯỚC (+Z) ĐỂ 100% HIỂN THỊ CHÍNH XÁC val1 VÀ val2 VUÔNG VẮN
      this.die1.material = this.createMaterialsForFrontFace(val1);
      this.die2.material = this.createMaterialsForFrontFace(val2);

      const duration = 1400;
      const startTime = performance.now();

      const startRot1 = { x: this.die1.rotation.x, y: this.die1.rotation.y, z: this.die1.rotation.z };
      const startRot2 = { x: this.die2.rotation.x, y: this.die2.rotation.y, z: this.die2.rotation.z };

      // Điểm tiếp đất: rotation = (0, 0, 0) để mặt trước hướng thẳng 100% vào mắt người dùng!
      const targetRot1 = { x: 0, y: 0, z: 0 };
      const targetRot2 = { x: 0, y: 0, z: 0 };

      // Vòng quay sống động trên 3 trục
      const spin1 = { x: Math.PI * 6, y: Math.PI * 6, z: Math.PI * 4 };
      const spin2 = { x: -Math.PI * 6, y: -Math.PI * 6, z: -Math.PI * 4 };

      const animateRoll = (now) => {
        const elapsed = now - startTime;
        const p = Math.min(1, elapsed / duration);
        const ease = 1 - Math.pow(1 - p, 3);

        this.die1.rotation.x = startRot1.x + (targetRot1.x + spin1.x - startRot1.x) * ease;
        this.die1.rotation.y = startRot1.y + (targetRot1.y + spin1.y - startRot1.y) * ease;
        this.die1.rotation.z = startRot1.z + (targetRot1.z + spin1.z - startRot1.z) * ease;

        this.die2.rotation.x = startRot2.x + (targetRot2.x + spin2.x - startRot2.x) * ease;
        this.die2.rotation.y = startRot2.y + (targetRot2.y + spin2.y - startRot2.y) * ease;
        this.die2.rotation.z = startRot2.z + (targetRot2.z + spin2.z - startRot2.z) * ease;

        // Bouncing physics
        const bounce = Math.sin(ease * Math.PI) * 0.95;
        this.die1.position.y = 0.1 + bounce;
        this.die2.position.y = -0.1 + bounce * 0.85;

        if (p < 1) {
          requestAnimationFrame(animateRoll);
        } else {
          // TIẾP ĐẤT HOÀN TOÀN: Mặt trước (+Z) hướng thẳng vuông vức, rõ ràng tuyệt đối!
          this.die1.rotation.set(0, 0, 0);
          this.die2.rotation.set(0, 0, 0);
          this.die1.position.y = 0.1;
          this.die2.position.y = -0.1;

          this.isRolling = false;
          sfx.playChime();

          if (this.onRollComplete) {
            this.onRollComplete(exactSteps);
          }
        }
      };

      requestAnimationFrame(animateRoll);
    }

    animate() {
      requestAnimationFrame(() => this.animate());
      this.time += 0.02;

      // Nhấp nhô bồng bềnh nhẹ nhàng khi nghỉ
      if (!this.isRolling && this.die1 && this.die2) {
        this.die1.position.y = 0.1 + Math.sin(this.time * 2) * 0.03;
        this.die2.position.y = -0.1 + Math.cos(this.time * 2) * 0.03;
      }

      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    }
  }

  // ==========================================================================
  // 4. MAIN WORKFLOW & INTERACTION CONTROLLER
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    // Khởi tạo hệ thống nhạc nền truyền thống Việt Nam nhẹ nhàng
    sfx.bindBgmControls();
    sfx.bindFirstInteraction();

    // Kiểm tra URL parameter để skip intro
    const urlParams = new URLSearchParams(window.location.search);
    const skipIntro = urlParams.get('skipIntro') === 'true';

    // Stage 1 & 2 Elements
    const introBoardStage = document.getElementById('introBoardStage');
    const fairytaleCloudsContainer = document.getElementById('fairytaleCloudsContainer');
    const pureWhiteBoard = document.getElementById('pureWhiteBoard');
    const boardBlankContent = document.getElementById('boardBlankContent');
    const boardStartContent = document.getElementById('boardStartContent');
    const heroCharacterStage = document.getElementById('heroCharacterStage');
    const charBaseImg = document.getElementById('charBaseImg');

    // Stage 3 & 4 Elements
    const monopolyStage = document.getElementById('monopolyStage');
    const realisticBoard = document.getElementById('realisticBoard');
    const boardCameraViewport = document.getElementById('boardCameraViewport');
    const boardPerspectiveWrapper = document.getElementById('boardPerspectiveWrapper');
    const boardTokenPlayer = document.getElementById('boardTokenPlayer');
    const tokenImg = document.getElementById('tokenImg');

    const blackVeil = document.getElementById('blackVeil');
    const guideCharRight = document.getElementById('guideCharRight');
    const guideCharImg = document.getElementById('guideCharImg');
    const guidanceChatbox = document.getElementById('guidanceChatbox');
    const chatMessageContainer = document.getElementById('chatMessageContainer');
    const tapAnywhereAdvance = document.getElementById('tapAnywhereAdvance');

    const diceCenterStage = document.getElementById('diceCenterStage');
    const diceCanvas = document.getElementById('diceCanvas');
    const arrivalCelebrateTitle = document.getElementById('arrivalCelebrateTitle');

    // Stage 5 Elements: 3-Panel Red Imperial Showcase
    const cloudMistTransitionStage = document.getElementById('cloudMistTransitionStage');
    const mistDishHeading = document.getElementById('mistDishHeading');

    const foodDetailStage = document.getElementById('foodDetailStage');
    const detailDishTitle = document.getElementById('detailDishTitle');
    const btnBackToBoard = document.getElementById('btnBackToBoard');

    // 3-Panel Navigation Tabs & Viewport
    const tabStory = document.getElementById('tabStory');
    const tabDish = document.getElementById('tabDish');
    const tabRestaurants = document.getElementById('tabRestaurants');
    const culinaryCarouselTrack = document.getElementById('culinaryCarouselTrack');
    const culinaryCarouselViewport = document.getElementById('culinaryCarouselViewport');

    // Panel Wings & Hints
    const btnWingLeft = document.getElementById('btnWingLeft');
    const btnWingRight = document.getElementById('btnWingRight');
    const hintClickLeft = document.getElementById('hintClickLeft');
    const hintClickRight = document.getElementById('hintClickRight');
    const btnBackToCenterFromLeft = document.getElementById('btnBackToCenterFromLeft');
    const btnBackToCenterFromRight = document.getElementById('btnBackToCenterFromRight');

    // Panel 1 (Left) Hero & Ingredients Elements
    const dishQuoteText = document.getElementById('dishQuoteText');
    const dishStoryText = document.getElementById('dishStoryText');
    const dishIngredientsChips = document.getElementById('dishIngredientsChips');

    // Panel 2 (Center) Dish Spotlight Elements
    const dishPortraitFrame = document.getElementById('dishPortraitFrame');
    const dishHeroImg = document.getElementById('dishHeroImg');
    const dishCenterName = document.getElementById('dishCenterName');
    const dishCategoryBadge = document.getElementById('dishCategoryBadge');
    const dishRegionTag = document.getElementById('dishRegionTag');
    const dishHonorTag = document.getElementById('dishHonorTag');

    // Panel 3 (Right) Famous Restaurants Elements
    const restaurantsListContainer = document.getElementById('restaurantsListContainer');

    // Guide Character & Chatbox in Stage 5
    const detailGuideChar = document.getElementById('detailGuideChar');
    const detailCharImg = document.getElementById('detailCharImg');
    const detailChatbox = document.getElementById('detailChatbox');
    const detailChatSpeaker = document.getElementById('detailChatSpeaker');
    const detailChatText = document.getElementById('detailChatText');

    // Zoom Modal & Toast
    const dishZoomModal = document.getElementById('dishZoomModal');
    const zoomImageFull = document.getElementById('zoomImageFull');
    const zoomCaption = document.getElementById('zoomCaption');
    const btnCloseZoom = document.getElementById('btnCloseZoom');
    const zoomModalBackdrop = document.getElementById('zoomModalBackdrop');
    const copyToastNotification = document.getElementById('copyToastNotification');
    const toastMessage = document.getElementById('toastMessage');

    let currentStep = 1;
    let savedTile = null;
    try {
      savedTile = localStorage.getItem('monopoly_current_tile');
    } catch (e) {}
    let currentTile = (savedTile !== null && !isNaN(parseInt(savedTile))) ? parseInt(savedTile) : 7;
    let typingTimer = null;
    let currentActiveDish = null;
    let toastTimer = null;
    let hasIntroducedBoard = false;
    let diceTurnCount = 0;
    let currentActivePanel = 'center'; // 'center' | 'left' | 'right'
    let hasShownGuideOnBoard = false; // Kiểm tra xem đã hiển thị guide khi nhấn bàn cờ chưa

    // Typewriter effect
    function typewrite(element, text, onComplete) {
      if (!element) return;
      if (typingTimer) clearInterval(typingTimer);
      element.textContent = '';
      let idx = 0;

      typingTimer = setInterval(() => {
        if (idx < text.length) {
          element.textContent += text.charAt(idx);
          sfx.playDialogueChirp();
          idx++;
        } else {
          clearInterval(typingTimer);
          if (onComplete) onComplete();
        }
      }, 18);
    }

    // Hiển thị text trực tiếp không animation (cho những lần sau)
    function displayTextDirect(container, text) {
      if (!container) return;
      // Xóa các message cũ
      container.innerHTML = '';
      // Tách câu theo dấu chấm (.) và dấu chấm hỏi (?) thôi, không tách theo dấu chấm than (!)
      const sentences = text.split(/(?<=[.?])\s+/);
      sentences.forEach(sentence => {
        if (sentence.trim()) {
          const msgDiv = document.createElement('div');
          msgDiv.className = 'chat-message-line';
          msgDiv.textContent = sentence.trim();
          container.appendChild(msgDiv);
        }
      });
    }

    // Shuffle array để ngẫu nhiên
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    // Show Toast Notification
    function showToast(msg) {
      if (!copyToastNotification || !toastMessage) return;
      sfx.playToastPop();
      toastMessage.textContent = msg;
      copyToastNotification.classList.remove('hidden');

      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        copyToastNotification.classList.add('hidden');
      }, 2500);
    }

    // ------------------------------------------------------------------------
    // STEP 1: FAIRYTALE CLOUDS PARTING ENTRANCE
    // ------------------------------------------------------------------------
    function triggerCloudPartingIntro() {
      charBaseImg.src = 'assets/straw_boy_front_v6.png?v=60';
      heroCharacterStage.classList.add('mode-intro-center', 'hidden-initially');

      setTimeout(() => {
        sfx.playCloudParting();

        if (fairytaleCloudsContainer) {
          fairytaleCloudsContainer.classList.add('parting');
        }

        heroCharacterStage.classList.remove('hidden-initially');
        heroCharacterStage.classList.add('clouds-revealed');
      }, 350);

      setTimeout(() => {
        transitionToStep2_PositionAtBoard();
      }, 2000);
    }

    // ------------------------------------------------------------------------
    // STEP 2: POSITION CHARACTER AT BOTTOM-RIGHT OF WHITE BOARD
    // ------------------------------------------------------------------------
    function transitionToStep2_PositionAtBoard() {
      currentStep = 2;
      pureWhiteBoard.classList.remove('hidden');
      pureWhiteBoard.classList.add('appearing');

      heroCharacterStage.classList.remove('mode-intro-center', 'clouds-revealed');

      setTimeout(() => {
        charBaseImg.style.opacity = '0';
        setTimeout(() => {
          charBaseImg.src = 'assets/straw_boy_pointing_v6.png?v=60';
          charBaseImg.style.opacity = '1';
          sfx.playChime();
        }, 160);
      }, 900);
    }

    let canAdvanceToDice = false;

    // ------------------------------------------------------------------------
    // STEP 3: CLICKING THE WHITE BOARD
    // ------------------------------------------------------------------------
    pureWhiteBoard.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentStep === 2) {
        currentStep = 3;
        sfx.playChime();

        boardBlankContent.classList.add('hidden');
        boardStartContent.classList.remove('hidden');

        heroCharacterStage.classList.add('joyous-jump');
        charBaseImg.src = 'assets/straw_boy_celebrate_v6.png?v=60';

        setTimeout(() => {
          heroCharacterStage.classList.remove('joyous-jump');
        }, 850);

      } else if (currentStep === 3) {
        transitionToStep4_ShowBoardFirst();
      }
    });

    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    // STEP 4: SHOW MONOPOLY BOARD FIRST & AUTOMATIC GREETINGS SEQUENCE
    // ------------------------------------------------------------------------
    let introAutoAdvanceTimer = null;
    let introTypewriterTimer = null;
    let isIntroTyping = false;
    let currentDialogueStep = 1;

    const INTRO_DIALOGUES = [
      "Này này! Bạn ơi! Đứng đó làm gì mà ngó? Lại đây, Tò Te Tí dẫn bạn rong ruổi một vòng!",
      "Trong từng ô cờ là một món ăn, một gánh hàng, một câu chuyện và một góc nhỏ của văn hóa Việt đang chờ bạn tìm đến.",
      "Cứ gieo một lượt xúc xắc, rồi mình cùng xem phía trước có gì hay ho nhé."
    ];

    const SUBSEQUENT_DIALOGUES = [
      "Lượt này sẽ đến đâu nhỉ? Gieo thử xem nào!",
      "Ta tò mò quá rồi! Xúc xắc sẽ đưa mình đi đâu?",
      "Cùng tiếp tục hành trình ẩm thực nhé!",
      "Món ăn tiếp theo sẽ là gì nhỉ? Lắc xúc xắc thôi!",
      "Cùng xem thử vận may lần này nào!",
      "Gieo nào, xem món ngon nào đang chờ đón bạn!",
      "Hãy gieo xúc xắc để tiếp tục chuyến du hành ẩm thực nhé!"
    ];

    function typewriteMessage(container, text, speed = 28, onComplete) {
      if (!container) return;
      if (introTypewriterTimer) {
        clearTimeout(introTypewriterTimer);
        introTypewriterTimer = null;
      }
      container.innerHTML = '';
      const textSpan = document.createElement('span');
      textSpan.className = 'chat-message-text';
      container.appendChild(textSpan);

      isIntroTyping = true;
      let charIdx = 0;

      function nextChar() {
        if (charIdx < text.length) {
          textSpan.textContent += text.charAt(charIdx);
          sfx.playDialogueChirp();
          charIdx++;
          introTypewriterTimer = setTimeout(nextChar, speed);
        } else {
          isIntroTyping = false;
          introTypewriterTimer = null;
          if (onComplete) onComplete();
        }
      }

      nextChar();
    }

    function instantDisplayMessage(container, text) {
      if (introTypewriterTimer) {
        clearTimeout(introTypewriterTimer);
        introTypewriterTimer = null;
      }
      isIntroTyping = false;
      if (container) {
        container.innerHTML = `<span class="chat-message-text">${text}</span>`;
      }
    }

    function transitionToStep4_ShowBoardFirst() {
      currentStep = 4;
      canAdvanceToDice = false;
      sfx.playWhoosh();

      introBoardStage.classList.add('hidden');
      monopolyStage.classList.remove('hidden');
      boardTokenPlayer.classList.add('hidden-until-roll');
      updateTokenPosition(currentTile);

      // KHÔNG hiển thị black veil - bàn cờ hiện rõ ràng, nguyên vẹn 100%
      blackVeil.classList.add('hidden');
      blackVeil.classList.remove('visible');

      // Ẩn xúc xắc, nhân vật hướng dẫn và chatbox
      if (diceCenterStage) diceCenterStage.classList.add('hidden');
      guideCharRight.classList.add('hidden');
      guidanceChatbox.classList.add('hidden');

      // Cho người dùng xem full bàn cờ 1 lần (~1.8s) xong rồi TỰ ĐỘNG chuyển sang cuộc hội thoại đầu tiên
      setTimeout(() => {
        startInitialDialogueSequence();
      }, 1800);
    }

    function startInitialDialogueSequence() {
      hasShownGuideOnBoard = true;
      currentDialogueStep = 1;

      // Xuất hiện màn đen phía dưới để làm nổi bật hội thoại
      blackVeil.classList.remove('hidden');
      setTimeout(() => blackVeil.classList.add('visible'), 50);

      // Bé Tò Te Tí xuất hiện chỉ tay dẫn dắt
      guideCharRight.classList.remove('hidden', 'facing-dice', 'shrinking-to-board');
      if (guideCharImg) guideCharImg.src = 'assets/straw_boy_pointing_v6.png?v=60';

      // Xuất hiện chatbox
      guidanceChatbox.classList.remove('hidden');

      playIntroDialogueStep(1);
    }

    function playIntroDialogueStep(step) {
      currentDialogueStep = step;
      if (introAutoAdvanceTimer) {
        clearTimeout(introAutoAdvanceTimer);
        introAutoAdvanceTimer = null;
      }

      if (step === 1) {
        const text1 = INTRO_DIALOGUES[0];
        typewriteMessage(chatMessageContainer, text1, 28, () => {
          // Tự chuyển sau 3.2s nếu người dùng không click
          introAutoAdvanceTimer = setTimeout(() => {
            playIntroDialogueStep(2);
          }, 3200);
        });
      } else if (step === 2) {
        const text2 = INTRO_DIALOGUES[1];
        typewriteMessage(chatMessageContainer, text2, 28, () => {
          // Tự chuyển sau 3.5s nếu người dùng không click
          introAutoAdvanceTimer = setTimeout(() => {
            playIntroDialogueStep(3);
          }, 3500);
        });
      } else if (step === 3) {
        const text3 = INTRO_DIALOGUES[2];
        typewriteMessage(chatMessageContainer, text3, 28, () => {
          // Textbox 3 hiển thị xong: chờ người chơi lắc xúc xắc
        });

        // Xong câu 2 tới câu 3: CỤC XÚC XẮC HIỆN LÊN
        currentStep = 5;
        if (diceCenterStage) diceCenterStage.classList.remove('hidden');

        // Bé Tò Te Tí chuyển sang tư thế cầm xúc xắc
        guideCharRight.classList.add('facing-dice');
        if (guideCharImg) {
          guideCharImg.style.opacity = '0';
          setTimeout(() => {
            guideCharImg.src = 'assets/straw_boy_dice_v6.png?v=60';
            guideCharImg.style.opacity = '1';
          }, 120);
        }
      }
    }

    // Click handler cho phép click để skip gõ chữ hoặc chuyển nhanh sang textbox tiếp theo
    function handleDialogueClick(e) {
      // Nếu click vào xúc xắc thì để xúc xắc tự xử lý tung
      if (e && e.target && e.target.id === 'diceCanvas') return;

      if (currentStep === 4 || (currentStep === 5 && !hasIntroducedBoard)) {
        if (isIntroTyping) {
          // Nếu đang typing, skip animation và hiện hết câu hiện tại ngay
          const currentText = INTRO_DIALOGUES[currentDialogueStep - 1];
          instantDisplayMessage(chatMessageContainer, currentText);
          if (currentDialogueStep === 1) {
            introAutoAdvanceTimer = setTimeout(() => playIntroDialogueStep(2), 2000);
          } else if (currentDialogueStep === 2) {
            introAutoAdvanceTimer = setTimeout(() => playIntroDialogueStep(3), 2000);
          }
        } else {
          // Nếu đã typing xong, click sẽ chuyển sang câu tiếp theo
          if (currentDialogueStep === 1) {
            playIntroDialogueStep(2);
          } else if (currentDialogueStep === 2) {
            playIntroDialogueStep(3);
          }
        }
      }
    }

    if (guidanceChatbox) {
      guidanceChatbox.addEventListener('click', (e) => {
        e.stopPropagation();
        handleDialogueClick(e);
      });
    }

    if (blackVeil) {
      blackVeil.addEventListener('click', (e) => {
        e.stopPropagation();
        handleDialogueClick(e);
      });
    }

    // Event listener cho Chợ Bến Thành - chuyển sang trang so sánh xưa và nay
    const tile17 = document.getElementById('tile-17');
    if (tile17) {
      tile17.addEventListener('click', () => {
        window.location.href = 'ben_thanh_market.html?fromTile=17';
      });
    }

    // Event listener cho Chợ Tân Định - chuyển sang trang so sánh xưa và nay
    const tile24 = document.getElementById('tile-24');
    if (tile24) {
      tile24.addEventListener('click', () => {
        window.location.href = 'tan_dinh_market.html?fromTile=24';
      });
    }

    // Event listener cho Bánh Mì - chuyển sang trang banh_mi.html
    const tile26 = document.getElementById('tile-26');
    if (tile26) {
      tile26.addEventListener('click', () => {
        window.location.href = 'banh_mi.html?fromTile=26';
      });
    }

    // Event listener cho Chợ Bà Chiểu - chuyển sang trang so sánh xưa và nay
    const tile3 = document.getElementById('tile-3');
    if (tile3) {
      tile3.addEventListener('click', () => {
        window.location.href = 'ba_chieu_market.html?fromTile=3';
      });
    }

    // Event listener cho Chợ An Đông - chuyển sang trang so sánh xưa và nay
    const tile11 = document.getElementById('tile-11');
    if (tile11) {
      tile11.addEventListener('click', () => {
        window.location.href = 'an_dong_market.html?fromTile=11';
      });
    }

    // ------------------------------------------------------------------------
    // SUBSEQUENT TURNS PREPARATION (LƯỢT 2 TRỞ ĐI / KHI QUAY LẠI TỪ MÓN ĂN / CHỢ)
    // - Không lặp lại 4 câu intro
    // - Xúc xắc hiện ngay lập tức (không cần click bàn cờ)
    // - Chatbox hiện 1 câu thoại ngẫu nhiên từ pool phù hợp
    // ------------------------------------------------------------------------
    function prepareSubsequentTurnDice() {
      currentStep = 5;
      hasShownGuideOnBoard = true;
      hasIntroducedBoard = true;

      monopolyStage.classList.remove('hidden');
      boardCameraViewport.classList.remove('zoomed-on-character');
      boardPerspectiveWrapper.classList.add('board-tabletop-horizontal');
      boardTokenPlayer.classList.remove('hidden-until-roll');
      updateTokenPosition(currentTile);

      // Hiển thị nút tổng hợp món ăn
      const summaryBtn = document.getElementById('summaryBtn');
      if (summaryBtn) summaryBtn.classList.remove('hidden');

      // Màn đen mờ nhẹ nhàng làm nổi bật xúc xắc & hội thoại
      blackVeil.classList.remove('hidden');
      setTimeout(() => blackVeil.classList.add('visible'), 50);

      // XÚC XẮC HIỆN NGAY LẬP TỨC - KHÔNG CẦN CLICK BÀN CỜ
      if (diceCenterStage) diceCenterStage.classList.remove('hidden');

      // Bé Tò Te Tí ở tư thế cầm xúc xắc
      guideCharRight.classList.remove('hidden', 'shrinking-to-board');
      guideCharRight.classList.add('facing-dice');
      if (guideCharImg) guideCharImg.src = 'assets/straw_boy_dice_v6.png?v=60';

      // Chatbox hiển thị DUY NHẤT 1 câu thoại ngẫu nhiên
      guidanceChatbox.classList.remove('hidden');
      const randomPrompt = SUBSEQUENT_DIALOGUES[Math.floor(Math.random() * SUBSEQUENT_DIALOGUES.length)];
      typewriteMessage(chatMessageContainer, randomPrompt, 24);
    }

    // Hiển thị bàn cờ khi quay lại sau khi khám phá món ăn -> TỰ ĐỘNG TUNG XÚC XẮC TIẾP
    function showBoardOnReturn(autoOpenDice = true) {
      if (foodDetailStage) foodDetailStage.classList.add('hidden');
      sfx.playChime();
      prepareSubsequentTurnDice();
    }

    // ------------------------------------------------------------------------
    // STEP 6: 3D DICE ROLL FINISHES -> CHARACTER MOVEMENT
    // ------------------------------------------------------------------------
    const diceEngine = new DiceEngine(diceCanvas, (exactSteps) => {
      currentStep = 6;

      // Sau khi lắc xong thì textbox sẽ hiện “Xúc xắc đã sẵn trong tay…Ta cùng lên đường thôi!”
      if (guidanceChatbox) guidanceChatbox.classList.remove('hidden');
      instantDisplayMessage(chatMessageContainer, "Xúc xắc đã sẵn trong tay…Ta cùng lên đường thôi!");
      sfx.playChime();

      // Đợi người dùng đọc thông điệp (~1.2s) rồi tiến hành di chuyển
      setTimeout(() => {
        blackVeil.classList.remove('visible');
        setTimeout(() => blackVeil.classList.add('hidden'), 500);

        if (diceCenterStage) diceCenterStage.classList.add('hidden');
        if (guidanceChatbox) guidanceChatbox.classList.add('hidden');
        chatMessageContainer.innerHTML = '';

        if (!hasIntroducedBoard) {
          hasIntroducedBoard = true;
          guideCharRight.classList.add('shrinking-to-board');
          boardPerspectiveWrapper.classList.add('board-tabletop-horizontal');
          sfx.playWhoosh();

          // Hiển thị nút tổng hợp món ăn
          const summaryBtn = document.getElementById('summaryBtn');
          if (summaryBtn) summaryBtn.classList.remove('hidden');

          setTimeout(() => {
            guideCharRight.classList.add('hidden');
            boardTokenPlayer.classList.remove('hidden-until-roll');
            updateTokenPosition(currentTile);

            setTimeout(() => {
              boardCameraViewport.classList.add('zoomed-on-character');
              moveCharacterTokenSteps(exactSteps);
            }, 350);

          }, 1000);
        } else {
          guideCharRight.classList.add('hidden');
          boardPerspectiveWrapper.classList.add('board-tabletop-horizontal');
          boardTokenPlayer.classList.remove('hidden-until-roll');
          updateTokenPosition(currentTile);

          setTimeout(() => {
            boardCameraViewport.classList.add('zoomed-on-character');
            moveCharacterTokenSteps(exactSteps);
          }, 350);
        }

      }, 1200);
    });

    // Căn chỉnh tọa độ token quân cờ
    function updateTokenPosition(tileIndex) {
      const activeTileEl = document.getElementById(`tile-${tileIndex}`);
      if (!activeTileEl || !realisticBoard) return;

      const centerX = activeTileEl.offsetLeft + activeTileEl.offsetWidth / 2;
      const centerY = activeTileEl.offsetTop + activeTileEl.offsetHeight * 0.72;

      boardTokenPlayer.style.left = `${centerX}px`;
      boardTokenPlayer.style.top = `${centerY}px`;

      const boardW = realisticBoard.offsetWidth || 600;
      const boardH = realisticBoard.offsetHeight || 600;
      const camOffsetX = (boardW / 2 - centerX) * 0.35;
      const camOffsetY = (boardH / 2 - centerY) * 0.35;
      boardCameraViewport.style.setProperty('--cam-x', `${camOffsetX}px`);
      boardCameraViewport.style.setProperty('--cam-y', `${camOffsetY}px`);

      document.querySelectorAll('.real-tile').forEach(t => t.classList.remove('active-step-glow'));
      activeTileEl.classList.add('active-step-glow');
    }

    // Bước đi trên bàn cờ
    function moveCharacterTokenSteps(steps) {
      let remaining = steps;
      tokenImg.src = 'assets/straw_boy_front_v6.png?v=60';

      function stepOne() {
        if (remaining > 0) {
          currentTile = (currentTile + 1) % 28;
          try {
            localStorage.setItem('monopoly_current_tile', currentTile);
          } catch (e) {}
          updateTokenPosition(currentTile);

          if (currentTile >= 0 && currentTile <= 7) {
            boardTokenPlayer.classList.add('face-left');
          } else {
            boardTokenPlayer.classList.remove('face-left');
          }

          boardTokenPlayer.classList.remove('hopping');
          void boardTokenPlayer.offsetWidth;
          boardTokenPlayer.classList.add('hopping');

          sfx.playFootstep();
          sfx.playHop();

          remaining--;
          setTimeout(stepOne, 380);
        } else {
          // Đến nơi!
          try {
            localStorage.setItem('monopoly_current_tile', currentTile);
          } catch (e) {}
          boardTokenPlayer.classList.remove('face-left');
          tokenImg.src = 'assets/straw_boy_celebrate_v6.png?v=60';
          sfx.playCelebrationFanfare();

          triggerArrivalAndTransitionToFoodStage(currentTile);
        }
      }

      stepOne();
    }

    // ------------------------------------------------------------------------
    // FOOD SUMMARY FUNCTIONS
    // ------------------------------------------------------------------------
    function showFoodSummary() {
      const modal = document.getElementById('foodSummaryModal');
      const grid = document.getElementById('summaryGrid');
      grid.innerHTML = '';

      // Get all dishes from food_data.js
      const dishKeys = ['com_tam', 'banh_xeo', 'banh_mi', 'pha_lau', 'hu_tieu', 'xoi', 'bun_thit_nuong', 'bot_chien', 'bo_bia', 'che', 'mi_vit_tiem', 'banh_canh_cua', 'sui_cao', 'banh_trang_tron', 'bun_dau_mam_tom', 'oc'];

      dishKeys.forEach(key => {
        const dish = getDishByKey(key);
        if (dish) {
          const item = document.createElement('div');
          item.className = 'summary-item';
          item.innerHTML = `
            <h3>${dish.name}</h3>
            <p>${dish.origin || dish.ingredients || dish.description || ''}</p>
          `;
          item.onclick = () => showDishDetail(dish);
          grid.appendChild(item);
        }
      });

      // Add markets
      const markets = [
        { name: 'Chợ Bến Thành', description: 'Di sản thương mại lịch sử Sài Gòn, biểu tượng văn hóa đô thị TP.HCM', tile: 17, url: 'ben_thanh_market.html' },
        { name: 'Chợ Tân Định', description: 'Di sản kiến trúc nghệ thuật cấp thành phố, nét văn hóa Sài Gòn xưa', tile: 24, url: 'tan_dinh_market.html' },
        { name: 'Chợ Bà Chiểu', description: 'Di sản văn hóa Sài Gòn, nơi lưu giữ ký ức nhiều thế hệ tiểu thương', tile: 3, url: 'ba_chieu_market.html' },
        { name: 'Chợ An Đông', description: 'Trung tâm thương mại nổi tiếng tại Chợ Lớn, đầu mối kinh doanh thời trang', tile: 11, url: 'an_dong_market.html' }
      ];

      markets.forEach(market => {
        const item = document.createElement('div');
        item.className = 'summary-item';
        item.innerHTML = `
          <h3>🏪 ${market.name}</h3>
          <p>${market.description}</p>
        `;
        item.onclick = () => {
          window.location.href = `${market.url}?fromTile=${market.tile}`;
        };
        grid.appendChild(item);
      });

      modal.classList.remove('hidden');
    }

    function showDishDetail(dish) {
      // Close summary modal
      closeFoodSummary();

      // Show dish detail with full information
      currentActiveDish = dish;

      // Hide summary and show food detail stage
      document.getElementById('foodSummaryModal').classList.add('hidden');

      // Populate dish detail
      renderDishDetailStage(dish);
      switchPanel('center', false);

      // Show Stage 5
      foodDetailStage.classList.remove('hidden');
      foodDetailStage.scrollTop = 0;
    }

    function closeFoodSummary() {
      const modal = document.getElementById('foodSummaryModal');
      modal.classList.add('hidden');
    }

    // Make functions globally accessible
    window.showFoodSummary = showFoodSummary;
    window.closeFoodSummary = closeFoodSummary;


    // ------------------------------------------------------------------------
    // STEP 6.5: GIEO QUẺ - Nội dung ngẫu nhiên
    // ------------------------------------------------------------------------
    const gieoQueFacts = [
      "Có cả một 'thành phố' nằm dưới lòng đất! Đó chính là Địa đạo Củ Chi - có chiều dài khoảng 250 km. Mạng lưới đường hầm từng có nơi ở, phòng họp, kho chứa, trạm cứu chữa và hệ thống thông gió. Đây gần như một hệ thống sinh hoạt dưới lòng đất được tổ chức qua nhiều tầng nhằm phục vụ cho cả 2 cuộc kháng chiến.",
      "Sài Gòn có một trong những vườn thú lâu đời nhất thế giới. Đó chính là Thảo Cầm Viên Sài Gòn được xây dựng từ năm 1864. Được xây dựng từ 23/3/1864, công trình này đã tồn tại gần 2 thế kỉ, trước khi nhiều công trình hiện đại của thành phố ra đời. Đây không chỉ là nơi tham quan mà còn là một phần ký ức lịch sử của Sài Gòn.",
      "Sở hữu đường vượt sông duy nhất ở Việt Nam và đầu tiên của Đông Nam Á. Hầm Thủ Thiêm nối khu vực trung tâm với bán đảo Thủ Thiêm. Khi được đưa vào khai thác năm 2011, đây là hầm vượt sông đầu tiên ở Đông Nam Á. Thay vì xây cầu bắc qua sông, công trình đưa phương tiện đi xuyên bên dưới lòng sông — một giải pháp kỹ thuật cực kỳ đáng chú ý.",
      "Trung tâm Sài Gòn ngày nay từng là vùng rừng rậm và đầm lầy. Những khu vực đô thị sầm uất ngày nay từng có cảnh quan tự nhiên với rừng tràm, rừng dừa và nhiều vùng đất ngập nước. Quá trình khai phá, xây dựng đường sá và quy hoạch đã biến đổi diện mạo khu vực qua nhiều thế kỷ.",
      "TP.HCM hiện nay không chỉ có khu vực Sài Gòn quen thuộc. Từ ngày 1/7/2025, TP.HCM mới được hình thành sau khi sáp nhập TP.HCM trước đó với tỉnh Bình Dương và tỉnh Bà Rịa – Vũng Tàu.",
      "Bánh mì Việt Nam có nguồn gốc từ bánh mì kiểu Pháp, nhưng đã trở thành một món hoàn toàn khác. Baguette được du nhập vào Việt Nam từ thời Pháp thuộc. Người Việt biến tấu ổ bánh với phần ruột nhẹ, vỏ giòn, pate, thịt nguội, rau thơm, đồ chua và nước sốt. Đặc biệt, từ 'banh mi' đã được đưa vào Oxford English Dictionary năm 2011."
    ];

    const gieoQueQuestions = [
      {
        question: "Tên gọi 'cơm tấm' bắt nguồn từ điều gì?",
        options: ["A. Cơm được nấu trong tấm lá chuối", "B. Cơm được làm từ hạt gạo vỡ", "C. Cơm ăn kèm với tấm bánh tráng", "D. Cơm được ép thành từng tấm"],
        answer: "B",
        explanation: "'Tấm' là những hạt gạo bị vỡ trong quá trình xay xát."
      },
      {
        question: "Nguyên liệu nào thường có trong một ổ bánh mì Sài Gòn truyền thống?",
        options: ["A. Pate, thịt nguội, rau thơm và đồ chua", "B. Phô mai xanh và mì Ý", "C. Kim chi và rong biển", "D. Bơ đậu phộng và mứt trái cây"],
        answer: "A",
        explanation: "Bánh mì Sài Gòn thường kết hợp pate, thịt, rau thơm, dưa leo và đồ chua."
      },
      {
        question: "Món ăn đường phố nào thường gồm những miếng bột gạo chiên với trứng, ăn kèm đu đủ bào?",
        options: ["A. Bánh khọt", "B. Bột chiên", "C. Bánh cuốn", "D. Bánh bèo"],
        answer: "B",
        explanation: "Bột chiên là món ăn phổ biến, có dấu ấn ẩm thực người Hoa tại Sài Gòn."
      },
      {
        question: "Phá lấu thường được chế biến chủ yếu từ nguyên liệu nào?",
        options: ["A. Các loại đậu", "B. Hải sản sống", "C. Nội tạng động vật", "D. Trái cây nhiệt đới"],
        answer: "C",
        explanation: "Phá lấu thường dùng nội tạng, nấu cùng các loại gia vị thơm."
      },
      {
        question: "Hủ tiếu Nam Vang gắn với thành phố nào ở Campuchia?",
        options: ["A. Siem Reap", "B. Phnom Penh", "C. Battambang", "D. Sihanoukville"],
        answer: "B",
        explanation: "Nam Vang là tên gọi Hán-Việt gắn với Phnom Penh, thủ đô Campuchia."
      },
      {
        question: "Điều gì thể hiện rõ nét sự giao thoa văn hóa trong ẩm thực TP.HCM?",
        options: ["A. Tất cả món ăn đều có cùng nguồn gốc", "B. Chỉ sử dụng nguyên liệu nhập khẩu", "C. Nhiều món kết hợp ảnh hưởng Việt, Hoa và các nền ẩm thực khác", "D. Ẩm thực chỉ có món ăn truyền thống"],
        answer: "C",
        explanation: "Ẩm thực TP.HCM hình thành qua quá trình giao lưu, tiếp nhận và biến tấu giữa nhiều cộng đồng."
      }
    ];

    function showGieoQueContent() {
      // Randomly choose between fact or quiz
      const isQuiz = Math.random() < 0.5;
      const type = isQuiz ? 'quiz' : 'fact';

      // Chuyển sang trang gieo_que.html với tham số type và vị trí tile hiện tại
      window.location.href = `gieo_que.html?type=${type}&fromTile=${currentTile}`;
    }

    function showFunFactCard(fact) {
      const funFactCard = document.getElementById('funFactCard');
      const funFactText = document.getElementById('funFactText');

      funFactText.textContent = fact;
      funFactCard.classList.remove('hidden');
    }

    function closeFunFact() {
      const funFactCard = document.getElementById('funFactCard');
      funFactCard.classList.add('hidden');
      showBoardOnReturn(true);
    }

    // Make function globally accessible
    window.closeFunFact = closeFunFact;

    // ==========================================================================
    // PARALLAX HERO SECTION CONTROLLER
    // ==========================================================================
    (function initParallaxHero() {
      const parallaxHero = document.getElementById('parallaxHero');
      if (!parallaxHero) return;

      const layers = parallaxHero.querySelectorAll('.parallax-layer');
      if (layers.length === 0) return;

      let scrollY = 0;
      let mouseX = 0;
      let mouseY = 0;
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;

      // Lấy tốc độ parallax từ data attributes
      const layerConfigs = Array.from(layers).map(layer => ({
        element: layer,
        speed: parseFloat(layer.dataset.speed) || 0.1,
        mouseRange: parseInt(layer.dataset.mouseRange) || 20
      }));

      // Scroll parallax handler
      function handleScroll() {
        scrollY = window.scrollY;
        updateParallax();
      }

      // Mouse parallax handler (desktop only)
      function handleMouseMove(e) {
        if (windowWidth < 768) return; // Chỉ hoạt động trên desktop

        const rect = parallaxHero.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        mouseX = (e.clientX - centerX) / (windowWidth / 2);
        mouseY = (e.clientY - centerY) / (windowHeight / 2);

        updateParallax();
      }

      // Update parallax positions
      function updateParallax() {
        layerConfigs.forEach(config => {
          const { element, speed, mouseRange } = config;

          // Scroll parallax: layer xa di chuyển chậm, layer gần di chuyển nhanh
          const scrollOffset = scrollY * speed;

          // Mouse parallax: tinh tế, không gây chóng mặt
          const mouseOffsetX = mouseX * mouseRange;
          const mouseOffsetY = mouseY * mouseRange;

          // Combine both effects
          const translateX = mouseOffsetX;
          const translateY = scrollOffset + mouseOffsetY;

          element.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
        });
      }

      // Handle resize
      function handleResize() {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
      }

      // Event listeners
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('resize', handleResize);

      // Initial update
      handleResize();
      updateParallax();

      console.log('Parallax Hero initialized with', layers.length, 'layers');
      console.log('Layer speeds:', layerConfigs.map(c => c.speed));
      console.log('File điều khiển: app.js - initParallaxHero() function');
    })();

    function showQuizModal(quizData) {
      const modal = document.getElementById('quizModal');
      const questionEl = document.getElementById('quizQuestion');
      const optionsEl = document.getElementById('quizOptions');
      const explanationEl = document.getElementById('quizExplanation');
      const nextBtn = document.getElementById('quizNextBtn');

      questionEl.textContent = quizData.question;
      optionsEl.innerHTML = '';
      explanationEl.classList.add('hidden');
      nextBtn.classList.add('hidden');

      quizData.options.forEach((option, index) => {
        const optionBtn = document.createElement('div');
        optionBtn.className = 'quiz-option';
        optionBtn.textContent = option;
        optionBtn.onclick = () => checkAnswer(optionBtn, option[0], quizData.answer, quizData.explanation);
        optionsEl.appendChild(optionBtn);
      });

      modal.classList.remove('hidden');
    }

    function checkAnswer(optionBtn, selected, correct, explanation) {
      const options = document.querySelectorAll('.quiz-option');
      const explanationEl = document.getElementById('quizExplanation');
      const nextBtn = document.getElementById('quizNextBtn');

      // Disable all options
      options.forEach(opt => opt.onclick = null);

      if (selected === correct) {
        optionBtn.classList.add('correct');
      } else {
        optionBtn.classList.add('wrong');
        // Highlight correct answer
        options.forEach(opt => {
          if (opt.textContent[0] === correct) {
            opt.classList.add('correct');
          }
        });
      }

      // Show explanation
      explanationEl.textContent = 'Giải thích: ' + explanation;
      explanationEl.classList.remove('hidden');
      nextBtn.classList.remove('hidden');
    }

    function closeQuiz() {
      document.getElementById('quizModal').classList.add('hidden');
      showBoardOnReturn(true);
    }

    function continueAfterQuiz() {
      closeQuiz();
    }

    // Make functions globally accessible
    window.closeQuiz = closeQuiz;
    window.continueAfterQuiz = continueAfterQuiz;


    // ------------------------------------------------------------------------
    // STEP 7: "CÙNG MÌNH KHÁM PHÁ THÔI" -> 3-PANEL IMPERIAL RED SHOWCASE
    // ------------------------------------------------------------------------
    function triggerArrivalAndTransitionToFoodStage(tileIndex) {
      const dish = getDishForTile(tileIndex);
      currentActiveDish = dish;

      // Nếu là ô GIEO QUẺ, hiển thị nội dung ngẫu nhiên
      const tileEl = document.getElementById(`tile-${tileIndex}`);
      if (tileEl && tileEl.classList.contains('gieo-que-tile')) {
        showGieoQueContent();
        return;
      }

      // Nếu là ô BẮT ĐẦU, chỉ gieo xúc xắc tiếp
      if (tileEl && tileEl.classList.contains('tile-start-square')) {
        showBoardOnReturn(true);
        return;
      }

      // Nếu ô không có món ăn (CHỢ, GÓC), chỉ gieo xúc xắc tiếp
      if (!dish) {
        // Kiểm tra nếu là Chợ Bến Thành
        if (tileIndex === 17) {
          window.location.href = 'ben_thanh_market.html?fromTile=17';
          return;
        }
        // Kiểm tra nếu là Chợ Tân Định
        if (tileIndex === 24) {
          window.location.href = 'tan_dinh_market.html?fromTile=24';
          return;
        }
        // Kiểm tra nếu là Chợ Bà Chiểu
        if (tileIndex === 3) {
          window.location.href = 'ba_chieu_market.html?fromTile=3';
          return;
        }
        // Kiểm tra nếu là Chợ An Đông
        if (tileIndex === 11) {
          window.location.href = 'an_dong_market.html?fromTile=11';
          return;
        }
        showBoardOnReturn(true); // Tự động mở xúc xắc tiếp
        return;
      }


      // 1. Dòng chữ hào hứng: "CÙNG MÌNH KHÁM PHÁ THÔI!"
      arrivalCelebrateTitle.classList.remove('hidden');

      setTimeout(() => {
        // 2. MÀN MÂY KHÓI DẠT RA
        if (mistDishHeading) {
          mistDishHeading.textContent = (dish.fullName || dish.name).toUpperCase();
        }
        cloudMistTransitionStage.classList.remove('hidden', 'parting');

        setTimeout(() => {
          // Ẩn bàn cờ & chữ kỷ niệm
          monopolyStage.classList.add('hidden');
          arrivalCelebrateTitle.classList.add('hidden');

          // Đổ dữ liệu món ăn và đặt mặc định ở giữa
          renderDishDetailStage(dish);
          switchPanel('center', false);

          // Hiển thị Stage 5 Đỏ Hoàng Gia
          foodDetailStage.classList.remove('hidden');
          foodDetailStage.scrollTop = 0;

          // Mây dạt ra 2 bên
          sfx.playCloudParting();
          cloudMistTransitionStage.classList.add('parting');

          setTimeout(() => {
            cloudMistTransitionStage.classList.add('hidden');
          }, 1100);

        }, 1000);

      }, 1500);
    }

    // ------------------------------------------------------------------------
    // 3-PANEL SLIDER NAVIGATION LOGIC (LƯỚT TRÁI / Ở GIỮA / LƯỚT PHẢI)
    // - Bố cục hình ảnh món ăn ở giữa
    // - Lướt qua trái: Phần giới thiệu món ăn & nguyên liệu
    // - Lướt qua phải: Các quán ăn nổi tiếng
    // - Nhân vật đổi hành động sinh động & chatbox hướng dẫn ngắn gọn
    // ------------------------------------------------------------------------
    function switchPanel(panelName, playSfx = true) {
      if (panelName !== 'left' && panelName !== 'center' && panelName !== 'right') return;
      currentActivePanel = panelName;

      if (playSfx) sfx.playWhoosh();

      // Cập nhật track translateX
      if (culinaryCarouselTrack) {
        culinaryCarouselTrack.classList.remove('view-left', 'view-center', 'view-right');
        culinaryCarouselTrack.classList.add(`view-${panelName}`);
      }

      // Cập nhật active tab
      if (tabStory) tabStory.classList.toggle('active-tab', panelName === 'left');
      if (tabDish) tabDish.classList.toggle('active-tab', panelName === 'center');
      if (tabRestaurants) tabRestaurants.classList.toggle('active-tab', panelName === 'right');

      // Đổi hành động của nhân vật và cập nhật chatbox ngắn gọn
      updateGuideDialogueForPanel(panelName);
    }

    function updateGuideDialogueForPanel(panelName) {
      if (!currentActiveDish) return;
      const dishName = currentActiveDish.fullName || currentActiveDish.name;

      if (detailChatSpeaker) {
        detailChatSpeaker.textContent = "BÉ TÒ TE TÍ";
      }

      if (panelName === 'center') {
        // Ở GIỮA: Chỉ giới thiệu tên món sơ qua và hướng dẫn lướt trái/phải
        if (detailCharImg) detailCharImg.src = 'assets/straw_boy_pointing_v6.png?v=60';
        const msg = `Đây là món ${dishName}! Hãy lướt sang TRÁI để xem câu chuyện & mâm nguyên liệu, hoặc lướt sang PHẢI để tìm các quán ăn nổi tiếng nhé!`;
        typewrite(detailChatText, msg);

      } else if (panelName === 'left') {
        // TRÁI: Giới thiệu gốc tích & nguyên liệu
        if (detailCharImg) detailCharImg.src = 'assets/straw_boy_front_v6.png?v=60';
        const msg = `Khám phá nguồn gốc di sản và các nguyên liệu tinh túy làm nên hương vị ${dishName}. Bạn có thể bấm hoặc lướt sang PHẢI để trở về hình món ăn nha!`;
        typewrite(detailChatText, msg);

      } else if (panelName === 'right') {
        // PHẢI: Quán ăn nổi tiếng
        if (detailCharImg) detailCharImg.src = 'assets/straw_boy_celebrate_v6.png?v=60';
        const msg = `Đây là các quán ăn gia truyền nức tiếng nấu món ${dishName} chuẩn vị nhất! Bạn có thể bấm "Sao chép" để lưu lại địa chỉ ghé ăn nhé!`;
        typewrite(detailChatText, msg);
      }
    }

    // Gắn sự kiện chuyển panel cho các nút và tab
    if (tabStory) tabStory.addEventListener('click', () => switchPanel('left'));
    if (tabDish) tabDish.addEventListener('click', () => switchPanel('center'));
    if (tabRestaurants) tabRestaurants.addEventListener('click', () => switchPanel('right'));

    if (btnWingLeft) btnWingLeft.addEventListener('click', () => switchPanel('left'));
    if (btnWingRight) btnWingRight.addEventListener('click', () => switchPanel('right'));

    if (hintClickLeft) hintClickLeft.addEventListener('click', () => switchPanel('left'));
    if (hintClickRight) hintClickRight.addEventListener('click', () => switchPanel('right'));

    if (btnBackToCenterFromLeft) btnBackToCenterFromLeft.addEventListener('click', () => switchPanel('center'));
    if (btnBackToCenterFromRight) btnBackToCenterFromRight.addEventListener('click', () => switchPanel('center'));

    // Hỗ trợ Touch Swipe & Mouse Drag lướt trái / phải siêu mượt
    if (culinaryCarouselViewport) {
      let touchStartX = 0;
      let touchStartY = 0;
      let isDragging = false;

      const onStart = (clientX, clientY) => {
        touchStartX = clientX;
        touchStartY = clientY;
        isDragging = true;
      };

      const onEnd = (clientX, clientY) => {
        if (!isDragging) return;
        isDragging = false;
        const diffX = clientX - touchStartX;
        const diffY = clientY - touchStartY;

        // Chỉ xử lý nếu lướt theo chiều ngang rõ rệt (> 50px)
        if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) {
            // Lướt từ phải sang trái (swipe left) -> tiến sang panel bên phải
            if (currentActivePanel === 'center') switchPanel('right');
            else if (currentActivePanel === 'left') switchPanel('center');
          } else {
            // Lướt từ trái sang phải (swipe right) -> lùi sang panel bên trái
            if (currentActivePanel === 'center') switchPanel('left');
            else if (currentActivePanel === 'right') switchPanel('center');
          }
        }
      };

      culinaryCarouselViewport.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches[0]) {
          onStart(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });

      culinaryCarouselViewport.addEventListener('touchend', (e) => {
        if (e.changedTouches && e.changedTouches[0]) {
          onEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        }
      }, { passive: true });

      culinaryCarouselViewport.addEventListener('mousedown', (e) => {
        // Không chặn click trên button hay card
        if (e.target.closest('button') || e.target.closest('.restaurant-item-card')) return;
        onStart(e.clientX, e.clientY);
      });

      window.addEventListener('mouseup', (e) => {
        if (isDragging) onEnd(e.clientX, e.clientY);
      });
    }

    // ------------------------------------------------------------------------
    // RENDER 3-PANEL CULINARY SHOWCASE DATA
    // ------------------------------------------------------------------------
    function renderDishDetailStage(dish) {
      if (!dish) return;
      currentActiveDish = dish;
      const dishKey = dish.foodId || dish.id || dish.key || 'banh_mi';

      if (typeof CulinaryParallax !== 'undefined') {
        CulinaryParallax.showDish(dishKey, 1);
      }
    }

    // Render danh sách quán ăn theo thành phố
    function renderRestaurantCards(restaurants, filterCity) {
      if (!restaurantsListContainer) return;
      restaurantsListContainer.innerHTML = '';

      if (!restaurants || restaurants.length === 0) {
        restaurantsListContainer.innerHTML = `
          <div style="padding: 24px; text-align: center; color: #FFE082; font-style: italic;">
            Đang cập nhật thêm địa chỉ các quán gia truyền chuẩn vị...
          </div>
        `;
        return;
      }

      const filtered = restaurants.filter(r => {
        if (!filterCity || filterCity === 'all') return true;
        return r.city === filterCity;
      });

      if (filtered.length === 0) {
        restaurantsListContainer.innerHTML = `
          <div style="padding: 24px; text-align: center; color: #FFE082; font-style: italic;">
            Chưa có quán tại thành phố này. Hãy chọn TP. Hồ Chí Minh hoặc Tất Cả nhé!
          </div>
        `;
        return;
      }

      filtered.forEach(r => {
        const card = document.createElement('div');
        card.className = 'restaurant-item-card';

        const isMichelin = r.badge && (r.badge.includes('Michelin') || r.badge.includes('Đỉnh Cao'));
        const badgeClass = isMichelin ? 'item-badge-pill badge-michelin' : 'item-badge-pill';

        card.innerHTML = `
          <div class="item-card-top">
            <span class="item-card-name">${r.name}</span>
            <span class="${badgeClass}">${r.badge || 'Quán Ngon'}</span>
          </div>
          <div class="item-card-address">${r.address}</div>
          <div class="item-card-details">
            <span class="item-card-hours">⏰ ${r.hours}</span>
            <span class="item-card-price">💰 ${r.price}</span>
          </div>
          <div class="item-card-actions">
            <button class="btn-copy-address" data-address="${r.name} - ${r.address}" title="Sao chép địa chỉ quán">
              <span>📋 Sao chép</span>
            </button>
          </div>
        `;
        restaurantsListContainer.appendChild(card);
      });

      // Bind copy buttons
      restaurantsListContainer.querySelectorAll('.btn-copy-address').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const addr = btn.getAttribute('data-address');
          if (navigator.clipboard && addr) {
            navigator.clipboard.writeText(addr).then(() => {
              showToast(`Đã sao chép: ${addr}`);
            }).catch(() => {
              showToast(`Đã sao chép: ${addr}`);
            });
          } else {
            showToast(`Đã sao chép địa chỉ quán ăn!`);
          }
        });
      });
    }

    // City Filter Buttons
    document.querySelectorAll('.city-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.city-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        sfx.playHop();

        const city = btn.getAttribute('data-city') || 'all';
        if (currentActiveDish && currentActiveDish.restaurants) {
          renderRestaurantCards(currentActiveDish.restaurants, city);
        }
      });
    });

    // ------------------------------------------------------------------------
    // NAVIGATION ACTIONS
    // - Bỏ nút lắc xúc xắc tiếp, khi bấm "Quay lại Bàn Cờ" là tự động cho lắc tiếp
    // ------------------------------------------------------------------------
    if (btnBackToBoard) {
      btnBackToBoard.addEventListener('click', () => {
        sfx.playWhoosh();
        showBoardOnReturn(true); // true = Tự động mở xúc xắc lượt tiếp theo!
      });
    }

    // Image Zoom Modal
    if (dishPortraitFrame) {
      dishPortraitFrame.addEventListener('click', () => {
        if (!currentActiveDish) return;
        sfx.playChime();
        if (zoomImageFull) zoomImageFull.src = currentActiveDish.img;
        if (zoomCaption) zoomCaption.textContent = currentActiveDish.fullName || currentActiveDish.name;
        if (dishZoomModal) dishZoomModal.classList.remove('hidden');
      });
    }

    function closeZoom() {
      if (dishZoomModal) dishZoomModal.classList.add('hidden');
    }
    if (btnCloseZoom) btnCloseZoom.addEventListener('click', closeZoom);
    if (zoomModalBackdrop) zoomModalBackdrop.addEventListener('click', closeZoom);

    // Bắt đầu game với màn rẽ mây cổ tích hoặc skip intro
    if (skipIntro) {
      currentStep = 5;
      hasIntroducedBoard = true;
      hasShownGuideOnBoard = true;
      introBoardStage.classList.add('hidden');
      monopolyStage.classList.remove('hidden');
      boardTokenPlayer.classList.remove('hidden-until-roll');

      const fromTile = urlParams.get('fromTile');
      if (fromTile !== null && !isNaN(parseInt(fromTile))) {
        currentTile = parseInt(fromTile);
      } else {
        let saved = null;
        try { saved = localStorage.getItem('monopoly_current_tile'); } catch (e) {}
        if (saved !== null && !isNaN(parseInt(saved))) {
          currentTile = parseInt(saved);
        } else {
          currentTile = 7;
        }
      }
      try {
        localStorage.setItem('monopoly_current_tile', currentTile);
      } catch (e) {}
      updateTokenPosition(currentTile);
      prepareSubsequentTurnDice();
    } else {
      triggerCloudPartingIntro();
    }

    // ==========================================================================
    // DETAIL VERTICAL SCROLL CONTROLLER
    // Xử lý scroll dọc cho phần detail món ăn
    // ==========================================================================
    const detailVerticalContainer = document.getElementById('detailVerticalContainer');
    const detailSections = document.querySelectorAll('.detail-scroll-section');
    const detailNavDots = document.querySelectorAll('.detail-nav-dot');
    const btnBackToHero = document.getElementById('btnBackToHero');
    const btnBackToHeroFromRestaurants = document.getElementById('btnBackToHeroFromRestaurants');

    let currentDetailSection = 1;
    let totalDetailSections = detailSections.length;
    let isDetailScrollTransitioning = false;
    let detailTouchStartY = 0;
    let detailTouchEndY = 0;
    let detailWheelDebounce = null;

    // Show detail nav dots when detail stage is visible
    function showDetailNavDots() {
      if (document.querySelector('.detail-nav-dots')) {
        document.querySelector('.detail-nav-dots').classList.add('visible');
      }
    }

    function hideDetailNavDots() {
      if (document.querySelector('.detail-nav-dots')) {
        document.querySelector('.detail-nav-dots').classList.remove('visible');
      }
    }

    // Show specific detail section
    function showDetailSection(sectionNum) {
      if (isDetailScrollTransitioning || sectionNum < 1 || sectionNum > totalDetailSections) return;
      
      isDetailScrollTransitioning = true;
      const oldSection = currentDetailSection;
      currentDetailSection = sectionNum;

      // Update sections with parallax effect
      detailSections.forEach((section, index) => {
        const sectionIndex = index + 1;
        section.classList.remove('active', 'previous');
        
        if (sectionIndex === currentDetailSection) {
          section.classList.add('active');
          // Add parallax offset based on scroll direction
          const parallaxOffset = sectionIndex > oldSection ? 20 : -20;
          section.style.setProperty('--parallax-offset', `${parallaxOffset}px`);
        } else if (sectionIndex === oldSection && sectionIndex < currentDetailSection) {
          section.classList.add('previous');
          section.style.setProperty('--parallax-offset', '30px');
        } else {
          section.style.setProperty('--parallax-offset', '0px');
        }
      });

      // Update nav dots
      detailNavDots.forEach((dot, index) => {
        dot.classList.toggle('active', index + 1 === currentDetailSection);
      });

      // Update chatbox text based on section
      if (detailChatText) {
        const messages = [
          'Chào bạn! Hãy lướt XUỐNG để xem câu chuyện & nguyên liệu, hoặc lướt xuống nữa để tìm các quán ăn nổi tiếng nhé!',
          'Đây là câu chuyện thú vị về món ăn này! Lướt xuống nữa để xem các quán ăn nổi tiếng, hoặc lướt lên để xem hình món ăn.',
          'Đây là các quán ăn nổi tiếng! Lướt lên để xem câu chuyện & nguyên liệu, hoặc lướt lên nữa để xem hình món ăn.'
        ];
        detailChatText.textContent = messages[currentDetailSection - 1] || messages[0];
      }

      // Play transition sound
      sfx.playWhoosh();

      // Allow transition after animation completes
      setTimeout(() => {
        isDetailScrollTransitioning = false;
      }, 900);
    }

    // Wheel scroll handler for detail
    if (detailVerticalContainer) {
      detailVerticalContainer.addEventListener('wheel', (e) => {
        if (isDetailScrollTransitioning) return;

        // Debounce wheel events
        if (detailWheelDebounce) {
          clearTimeout(detailWheelDebounce);
        }

        detailWheelDebounce = setTimeout(() => {
          const delta = e.deltaY;
          
          if (delta > 50) {
            // Scroll down
            showDetailSection(currentDetailSection + 1);
          } else if (delta < -50) {
            // Scroll up
            showDetailSection(currentDetailSection - 1);
          }
        }, 50);
      }, { passive: true });

      // Touch scroll handler for mobile
      detailVerticalContainer.addEventListener('touchstart', (e) => {
        detailTouchStartY = e.changedTouches[0].screenY;
      }, { passive: true });

      detailVerticalContainer.addEventListener('touchend', (e) => {
        if (isDetailScrollTransitioning) return;
        
        detailTouchEndY = e.changedTouches[0].screenY;
        const deltaY = detailTouchStartY - detailTouchEndY;

        if (Math.abs(deltaY) > 50) {
          if (deltaY > 0) {
            // Swipe up (scroll down)
            showDetailSection(currentDetailSection + 1);
          } else {
            // Swipe down (scroll up)
            showDetailSection(currentDetailSection - 1);
          }
        }
      }, { passive: true });
    }

    // Keyboard navigation for detail
    document.addEventListener('keydown', (e) => {
      if (isDetailScrollTransitioning) return;
      if (!detailVerticalContainer || detailVerticalContainer.classList.contains('hidden')) return;

      switch(e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          showDetailSection(currentDetailSection + 1);
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          showDetailSection(currentDetailSection - 1);
          break;
      }
    });

    // Navigation dots click handler
    detailNavDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showDetailSection(index + 1);
      });
    });

    // Back to hero buttons
    if (btnBackToHero) {
      btnBackToHero.addEventListener('click', () => {
        showDetailSection(1);
      });
    }

    if (btnBackToHeroFromRestaurants) {
      btnBackToHeroFromRestaurants.addEventListener('click', () => {
        showDetailSection(1);
      });
    }

    // Override carousel buttons to use vertical scroll
    if (btnWingLeft) {
      btnWingLeft.style.display = 'none';
    }
    if (btnWingRight) {
      btnWingRight.style.display = 'none';
    }

    // Override panel action buttons
    if (btnBackToCenterFromLeft) {
      btnBackToCenterFromLeft.style.display = 'none';
    }
    if (btnBackToCenterFromRight) {
      btnBackToCenterFromRight.style.display = 'none';
    }

    // Show nav dots when detail stage becomes visible
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target.id === 'foodDetailStage') {
          if (!mutation.target.classList.contains('hidden')) {
            showDetailNavDots();
            currentDetailSection = 1;
            showDetailSection(1);
          } else {
            hideDetailNavDots();
          }
        }
      });
    });

    if (foodDetailStage) {
      observer.observe(foodDetailStage, { attributes: true, attributeFilter: ['class'] });
    }

  });

})();
