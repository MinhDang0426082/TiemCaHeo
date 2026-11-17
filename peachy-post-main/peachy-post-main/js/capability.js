// ============================================================
//  PEACHY POST — ĐO MÁY
//
//  Chọn một trong ba tầng trải nghiệm:
//
//    min  máy không nên chạy gì cả (giảm chuyển động, không có
//         WebGL, máy quá yếu, hoặc bật tiết kiệm dữ liệu)
//    low  máy yếu: chỉ animation CSS
//    high máy mạnh: animation CSS + cảnh 3D tương tác
//
//  Đo bằng số thật: số nhân CPU, RAM ước lượng, khả năng WebGL,
//  và một mẫu FPS ngắn. Không đoán theo User-Agent.
// ============================================================

window.PeachyCap = (function () {
  'use strict';

  var state = {
    tier: 'low',
    reason: '',
    cores: 0,
    memory: 0,
    webgl: false,
    reduced: false,
    fps: 0
  };

  function gl() {
    try {
      var cv = document.createElement('canvas');
      var ctx =
        cv.getContext('webgl2') ||
        cv.getContext('webgl') ||
        cv.getContext('experimental-webgl');
      if (!ctx) return false;
      // một số máy ảo báo có WebGL nhưng không vẽ được gì
      var ok = typeof ctx.getParameter === 'function' && !!ctx.getParameter(ctx.VERSION);
      return ok;
    } catch (e) {
      return false;
    }
  }

  // Mẫu FPS ngắn: đếm khung hình trong ~450ms.
  // Trả về số khung/giây đo được.
  function sampleFps(done) {
    var frames = 0;
    var start = performance.now();
    var last = start;

    function frame(now) {
      frames++;
      last = now;
      if (now - start >= 450) {
        done(Math.round((frames * 1000) / (now - start)));
        return;
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    // máy ngủ đông hoặc tab ẩn thì không bao giờ tới đây
    setTimeout(function () {
      if (performance.now() - last > 400) {
        done(Math.round((frames * 1000) / Math.max(1, last - start)));
      }
    }, 1200);
  }

  function decide() {
    state.reduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    state.cores = navigator.hardwareConcurrency || 2;
    state.memory = navigator.deviceMemory || 0;
    state.webgl = gl();

    // #tier=min|low|high — ép tầng để thử, hữu ích khi debug
    // và khi muốn xem máy yếu thấy gì. Dùng hash vì query trên
    // file:// bị trình duyệt coi là một phần tên file.
    // Không có thì tự đo.
    var forced = '';
    try {
      var m = /tier=(min|low|high)/i.exec(location.hash || '');
      if (m) forced = m[1].toLowerCase();
    } catch (e) {}
    if (forced) {
      state.tier = forced;
      state.reason = 'Ép bằng #tier=' + forced;
      return state;
    }

    var conn = navigator.connection || {};
    var saveData = conn.saveData === true;
    var slowNet = /(^|-)2g$/.test(conn.effectiveType || '');

    if (state.reduced) {
      state.tier = 'min';
      state.reason = 'Người dùng bật giảm chuyển động';
      return state;
    }
    if (!state.webgl) {
      state.tier = 'low';
      state.reason = 'Máy không có WebGL';
      return state;
    }
    if (saveData || slowNet) {
      state.tier = 'low';
      state.reason = 'Tiết kiệm dữ liệu hoặc mạng chậm';
      return state;
    }
    if (state.cores <= 2 || (state.memory && state.memory <= 2)) {
      state.tier = 'low';
      state.reason = 'CPU hoặc RAM thấp';
      return state;
    }
    if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) && state.cores <= 4) {
      state.tier = 'low';
      state.reason = 'Điện thoại cấu hình thấp';
      return state;
    }

    state.tier = 'high';
    state.reason = state.cores + ' nhân · ' + (state.memory || '?') + 'GB · có WebGL';
    return state;
  }

  // Gắn class lên <html> để CSS biết tầng nào
  function apply() {
    var root = document.documentElement;
    root.classList.remove('tier-min', 'tier-low', 'tier-high');
    root.classList.add('tier-' + state.tier);
    root.setAttribute('data-tier', state.tier);
  }

  return {
    state: state,
    detect: function () {
      decide();
      apply();
      return state;
    },
    // Đo FPS thật. Chỉ dùng để hạ tầng, không bao giờ nâng.
    probe: function (done) {
      sampleFps(function (fps) {
        state.fps = fps;
        if (state.tier === 'high' && fps > 0 && fps < 40) {
          state.tier = 'low';
          state.reason += ' · đo được ' + fps + 'fps nên hạ xuống';
          apply();
        }
        done(state);
      });
    },
    apply: apply
  };
})();