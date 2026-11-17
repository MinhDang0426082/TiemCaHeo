// ============================================================
//  PEACHY POST — CẢNH 3D
//
//  Sáu tấm bưu thiếp xếp thành một vòng cung, xoay chậm.
//  Kéo ngang để quay, thả ra thì quay tiếp theo quán tính.
//  Bấm vào một tấm để mở chi tiết của tấm đó.
//
//  Toàn bộ hình trên mặt thiếp vẽ bằng Canvas 2D rồi dán lên
//  PlaneGeometry — không cần tải file ảnh nào.
//
//  Chỉ chạy khi capability báo tầng `high` và THREE đã nạp.
//  Không có THREE / không có WebGL thì thoát êm, trang vẫn đủ.
// ============================================================

window.Peachy3D = (function () {
  'use strict';

  var CARD_W = 1.0;
  var CARD_H = 1.4;
  var RADIUS = 2.25;
  // camera đứng ngoài vòng; khoảng cách này cho tấm gần nhất
  // chiếm khoảng 60% chiều cao khung, đủ to mà vẫn thấy cả vòng
  var CAM_Z = RADIUS + 2.45;
  var MAX_TILT = 0.28;

  var state = {
    mounted: false,
    active: -1
  };

  // ----------------------------------------------------------
  //  Vẽ mặt bưu thiếp ra canvas 2D
  //  Dùng đúng bảng màu và nét của trang.
  // ----------------------------------------------------------
  var INK = '#1f2a55';
  var PINK = '#ffd9e4';
  var DEEP = '#ffb7c5';
  var CREAM = '#fff6e5';
  var LEAF = '#b8e0b0';
  var RED = '#ff8a8a';
  var BLUE = '#a8cbe8';
  var YELLOW = '#ffe9a8';

  function rounded(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function eyes(ctx, cx, cy, gap) {
    ctx.fillStyle = INK;
    ctx.beginPath();
    ctx.arc(cx - gap, cy, 9, 0, Math.PI * 2);
    ctx.arc(cx + gap, cy, 9, 0, Math.PI * 2);
    ctx.fill();
  }

  function blush(ctx, cx, cy, gap) {
    ctx.fillStyle = 'rgba(255,183,197,.9)';
    ctx.beginPath();
    ctx.ellipse(cx - gap, cy, 17, 10, 0, 0, Math.PI * 2);
    ctx.ellipse(cx + gap, cy, 17, 10, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawArt(ctx, size, kind) {
    var c = size / 2;
    ctx.clearRect(0, 0, size, size);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = size * 0.022;
    ctx.strokeStyle = INK;

    if (kind === 0) {
      // bánh dâu
      ctx.fillStyle = CREAM;
      ctx.beginPath();
      ctx.moveTo(size * 0.22, size * 0.82);
      ctx.quadraticCurveTo(size * 0.22, size * 0.56, c, size * 0.56);
      ctx.quadraticCurveTo(size * 0.78, size * 0.56, size * 0.78, size * 0.82);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#fffdf5';
      ctx.beginPath();
      ctx.arc(c, size * 0.55, size * 0.075, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = RED;
      ctx.beginPath();
      ctx.moveTo(c, size * 0.42);
      ctx.bezierCurveTo(size * 0.64, size * 0.43, size * 0.64, size * 0.56, c, size * 0.6);
      ctx.bezierCurveTo(size * 0.36, size * 0.56, size * 0.36, size * 0.43, c, size * 0.42);
      ctx.fill();
      ctx.stroke();

      eyes(ctx, c, size * 0.72, size * 0.075);
      blush(ctx, c, size * 0.76, size * 0.13);
    } else if (kind === 1) {
      // mèo đọc sách
      ctx.fillStyle = PINK;
      ctx.beginPath();
      ctx.arc(c, size * 0.42, size * 0.19, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(size * 0.35, size * 0.29);
      ctx.lineTo(size * 0.3, size * 0.17);
      ctx.lineTo(size * 0.44, size * 0.24);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(size * 0.65, size * 0.29);
      ctx.lineTo(size * 0.7, size * 0.17);
      ctx.lineTo(size * 0.56, size * 0.24);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      eyes(ctx, c, size * 0.41, size * 0.07);
      blush(ctx, c, size * 0.47, size * 0.12);

      ctx.fillStyle = '#fffdf5';
      ctx.beginPath();
      ctx.moveTo(size * 0.13, size * 0.72);
      ctx.quadraticCurveTo(c, size * 0.63, size * 0.87, size * 0.72);
      ctx.lineTo(size * 0.87, size * 0.86);
      ctx.quadraticCurveTo(c, size * 0.77, size * 0.13, size * 0.86);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(c, size * 0.67);
      ctx.lineTo(c, size * 0.82);
      ctx.stroke();
    } else if (kind === 2) {
      // mèo xanh
      ctx.fillStyle = BLUE;
      ctx.beginPath();
      ctx.moveTo(size * 0.22, size * 0.84);
      ctx.quadraticCurveTo(size * 0.22, size * 0.5, c, size * 0.5);
      ctx.quadraticCurveTo(size * 0.78, size * 0.5, size * 0.78, size * 0.84);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = BLUE;
      ctx.beginPath();
      ctx.moveTo(size * 0.3, size * 0.55);
      ctx.lineTo(size * 0.26, size * 0.42);
      ctx.lineTo(size * 0.4, size * 0.49);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(size * 0.7, size * 0.55);
      ctx.lineTo(size * 0.74, size * 0.42);
      ctx.lineTo(size * 0.6, size * 0.49);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      eyes(ctx, c, size * 0.67, size * 0.07);
      blush(ctx, c, size * 0.73, size * 0.12);

      // bong bóng + tim
      ctx.fillStyle = '#fffdf5';
      rounded(ctx, size * 0.24, size * 0.12, size * 0.52, size * 0.26, size * 0.08);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = RED;
      ctx.beginPath();
      ctx.moveTo(c, size * 0.3);
      ctx.bezierCurveTo(size * 0.42, size * 0.2, size * 0.52, size * 0.26, c, size * 0.22);
      ctx.bezierCurveTo(size * 0.48, size * 0.26, size * 0.58, size * 0.2, c, size * 0.3);
      ctx.fill();
    } else if (kind === 3) {
      // bình hoa
      ctx.strokeStyle = '#7fa86f';
      ctx.lineWidth = size * 0.018;
      [0.42, 0.5, 0.58].forEach(function (k, i) {
        ctx.beginPath();
        ctx.moveTo(size * (0.4 + i * 0.1), size * 0.6);
        ctx.quadraticCurveTo(size * k, size * 0.42, size * (0.34 + i * 0.16), size * 0.26);
        ctx.stroke();
      });
      ctx.strokeStyle = INK;
      ctx.lineWidth = size * 0.022;

      [[0.32, 0.24, DEEP], [0.5, 0.18, '#fffdf5'], [0.68, 0.24, RED]].forEach(function (f) {
        ctx.fillStyle = f[2];
        for (var a = 0; a < 5; a++) {
          var ang = (a / 5) * Math.PI * 2;
          ctx.beginPath();
          ctx.arc(size * f[0] + Math.cos(ang) * size * 0.055,
            size * f[1] + Math.sin(ang) * size * 0.055, size * 0.045, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      });

      ctx.fillStyle = BLUE;
      ctx.beginPath();
      ctx.moveTo(size * 0.34, size * 0.6);
      ctx.lineTo(size * 0.66, size * 0.6);
      ctx.lineTo(size * 0.62, size * 0.84);
      ctx.quadraticCurveTo(c, size * 0.88, size * 0.38, size * 0.84);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      eyes(ctx, c, size * 0.71, size * 0.06);
      blush(ctx, c, size * 0.76, size * 0.1);
    } else if (kind === 4) {
      // mặt trời ngủ
      ctx.strokeStyle = '#ffc96b';
      ctx.lineWidth = size * 0.038;
      for (var i = 0; i < 12; i++) {
        var a = (i / 12) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(c + Math.cos(a) * size * 0.3, c + Math.sin(a) * size * 0.3);
        ctx.lineTo(c + Math.cos(a) * size * 0.4, c + Math.sin(a) * size * 0.4);
        ctx.stroke();
      }
      ctx.strokeStyle = INK;
      ctx.lineWidth = size * 0.022;

      ctx.fillStyle = YELLOW;
      ctx.beginPath();
      ctx.arc(c, c, size * 0.28, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(c - size * 0.09, c, size * 0.055, Math.PI * 0.15, Math.PI * 0.85);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(c + size * 0.09, c, size * 0.055, Math.PI * 0.15, Math.PI * 0.85);
      ctx.stroke();
      blush(ctx, c, c + size * 0.09, size * 0.14);
    } else {
      // ếch ôm tim
      ctx.fillStyle = LEAF;
      ctx.beginPath();
      ctx.arc(c, c + size * 0.05, size * 0.26, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(c - size * 0.13, c - size * 0.17, size * 0.09, 0, Math.PI * 2);
      ctx.arc(c + size * 0.13, c - size * 0.17, size * 0.09, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = INK;
      ctx.beginPath();
      ctx.arc(c - size * 0.13, c - size * 0.17, size * 0.032, 0, Math.PI * 2);
      ctx.arc(c + size * 0.13, c - size * 0.17, size * 0.032, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(c, c + size * 0.03, size * 0.11, Math.PI * 0.15, Math.PI * 0.85);
      ctx.stroke();
      blush(ctx, c, c + size * 0.1, size * 0.18);

      ctx.fillStyle = RED;
      ctx.beginPath();
      ctx.moveTo(c, c + size * 0.34);
      ctx.bezierCurveTo(c - size * 0.19, c + size * 0.19, c - size * 0.15, c + size * 0.07, c, c + size * 0.14);
      ctx.bezierCurveTo(c + size * 0.15, c + size * 0.07, c + size * 0.19, c + size * 0.19, c, c + size * 0.34);
      ctx.fill();
      ctx.stroke();
    }
  }

  // Vẽ cả tấm thiếp: nền giấy, viền, hình, giá
  function cardTexture(product, index, onImageReady) {
    var W = 512;
    var H = 716;
    var cv = document.createElement('canvas');
    cv.width = W;
    cv.height = H;
    var ctx = cv.getContext('2d');

    ctx.fillStyle = '#fffdfe';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#fff0f5';
    rounded(ctx, 24, 24, W - 48, H - 120, 26);
    ctx.fill();

    var pad = 60;
    var size = W - pad * 2;

    var imageMap = {
      xmasCouple: 'img/thiep-cap-doi-noel.jpg',
      xmasDog: 'img/thiep-cun-hop-qua.jpg',
      xmasCheers: 'img/thiep-anh-em-cot-cheo.jpg'
    };

    if (imageMap[product.art]) {
      var img = new Image();
      img.onload = function () {
        ctx.save();
        rounded(ctx, pad, 52, size, size, 20);
        ctx.clip();
        ctx.drawImage(img, pad, 52, size, size);
        ctx.restore();
        if (typeof onImageReady === 'function') {
          onImageReady();
        }
      };
      img.src = imageMap[product.art];
      var tmp = document.createElement('canvas');
      tmp.width = size;
      tmp.height = size;
      drawArt(tmp.getContext('2d'), size, index % 6);
      ctx.drawImage(tmp, pad, 52);
    } else {
      var tmp = document.createElement('canvas');
      tmp.width = size;
      tmp.height = size;
      drawArt(tmp.getContext('2d'), size, index % 6);
      ctx.drawImage(tmp, pad, 52);
    }

    ctx.fillStyle = INK;
    ctx.font = 'normal 26px "DFVN Hogfish", system-ui, "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'left';
    var displayName = product.nameVi;
    if (displayName.length > 17) displayName = displayName.slice(0, 15) + '...';
    ctx.fillText(displayName, 32, H - 66);

    ctx.fillStyle = '#d92d4c';
    ctx.font = 'normal 26px "DFVN Hogfish", system-ui, "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(product.price, W - 32, H - 66);

    return cv;
  }

  // ----------------------------------------------------------
  //  Dựng cảnh
  // ----------------------------------------------------------
  function mount(host, products, onPick) {
    if (state.mounted) return false;
    if (typeof THREE === 'undefined') return false;
    if (!host) return false;

    var width = host.clientWidth || 1;
    var height = host.clientHeight || 1;

    // sàn chưa có kích thước (layout chưa chạy) thì chờ một khung
    // hình rồi mới dựng, tránh canvas bị méo
    if (width < 40 || height < 40) return 'retry';

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      return false;
    }
    if (!renderer.getContext()) return false;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.32, CAM_Z);
    camera.lookAt(0, 0.22, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 1.65));

    var key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(2.5, 3.5, 4);
    scene.add(key);

    var fill = new THREE.DirectionalLight(0xffd9e4, 0.85);
    fill.position.set(-3, 1.5, -2);
    scene.add(fill);

    var group = new THREE.Group();
    scene.add(group);

    var cards = [];
    var count = products.length;

    products.forEach(function (product, i) {
      var tex;
      var cv = cardTexture(product, i, function () {
        if (tex) tex.needsUpdate = true;
      });
      tex = new THREE.CanvasTexture(cv);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

      var mat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.82,
        metalness: 0.0,
        side: THREE.FrontSide
      });

      var mesh = new THREE.Mesh(new THREE.PlaneGeometry(CARD_W, CARD_H, 1, 1), mat);
      var angle = (i / count) * Math.PI * 2;
      mesh.position.set(Math.sin(angle) * RADIUS, 0.22, Math.cos(angle) * RADIUS);

      // quay mặt RA NGOÀI (nhìn ra xa tâm): tấm gần người xem
      // mới hướng mặt về phía camera, không bị cull
      mesh.lookAt(
        Math.sin(angle) * RADIUS * 2,
        0.45,
        Math.cos(angle) * RADIUS * 2
      );
      mesh.userData.index = i;
      mesh.userData.product = product;

      group.add(mesh);
      cards.push({ mesh: mesh, angle: angle, tex: tex, mat: mat });
    });

    // Đưa cả nhóm xuống thấp và lùi lại: tấm gần nhất không bị cắt
    // chân, tấm hai bên không chạm mép
    group.position.y = -0.22;
    group.position.z = -0.45;

    // ---- tương tác ----
    var rotation = 0;
    var velocity = 0;
    var dragging = false;
    var lastX = 0;
    var moved = 0;
    var hovered = -1;

    var raycaster = new THREE.Raycaster();
    var pointer = new THREE.Vector2();

    function pointerToNdc(event) {
      var r = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - r.left) / r.width) * 2 - 1;
      pointer.y = -((event.clientY - r.top) / r.height) * 2 + 1;
    }

    function pick() {
      raycaster.setFromCamera(pointer, camera);
      var hits = raycaster.intersectObjects(cards.map(function (c) { return c.mesh; }));
      return hits.length ? hits[0].object : null;
    }

    function onDown(event) {
      dragging = true;
      moved = 0;
      lastX = event.clientX;
      velocity = 0;
      renderer.domElement.setPointerCapture && renderer.domElement.setPointerCapture(event.pointerId);
    }

    function onMove(event) {
      pointerToNdc(event);

      if (dragging) {
        var dx = event.clientX - lastX;
        lastX = event.clientX;
        moved += Math.abs(dx);
        rotation += dx * 0.006;
        velocity = dx * 0.006;
        return;
      }

      var hit = pick();
      var idx = hit ? hit.userData.index : -1;
      if (idx !== hovered) {
        hovered = idx;
        renderer.domElement.style.cursor = idx >= 0 ? 'pointer' : 'grab';
      }
    }

    function onUp(event) {
      if (!dragging) return;
      dragging = false;
      renderer.domElement.style.cursor = 'grab';

      // kéo ít = một cú bấm, mở chi tiết
      if (moved < 6) {
        pointerToNdc(event);
        var hit = pick();
        if (hit && onPick) onPick(hit.userData.index, hit.userData.product);
      }
    }

    var dom = renderer.domElement;
    dom.style.cursor = 'grab';
    dom.style.touchAction = 'pan-y';

    // WebGL context mất (driver reset, GPU đổi) thì trả lại sáu thẻ
    // phẳng ngay, không để người xem nhìn một ô trống
    dom.addEventListener('webglcontextlost', function (e) {
      e.preventDefault();
      host.classList.remove('is-live');
    });
    dom.addEventListener('webglcontextrestored', function () {
      painted = false;
    });

    // Nút gợi ý nằm trên canvas. Vẽ bằng thẻ DOM đè lên thì bị tính
    // là một khối chữ lạc khỏi lưới, nên dùng con trỏ thay đổi theo
    // tương tác: grab khi chờ, grabbing khi đang kéo, pointer khi trỏ
    // trúng một tấm. Thêm aria-label trên canvas để đọc được.
    dom.setAttribute('role', 'img');
    dom.setAttribute('aria-label',
      'Sáu mẫu bưu thiếp xếp thành vòng. Kéo ngang để quay, bấm một tấm để xem chi tiết.');

    dom.addEventListener('pointerdown', onDown);
    dom.addEventListener('pointermove', onMove);
    dom.addEventListener('pointerup', onUp);
    dom.addEventListener('pointercancel', onUp);
    dom.addEventListener('pointerleave', function () {
      dragging = false;
      hovered = -1;
      dom.style.cursor = 'grab';
    });

    // ---- vẽ ----
    var raf = 0;
    var last = performance.now();
    var frames = 0;
    var fpsStart = last;
    var slowStreak = 0;
    // kích thước cuối cùng đã áp; sàn nằm trong flex column nên
    // chiều cao thật chỉ có sau khi layout xong, và còn đổi khi
    // thanh địa chỉ điện thoại ẩn/hiện
    var lastW = 0;
    var lastH = 0;
    var painted = false;

    function fit() {
      var w = Math.round(host.clientWidth);
      var h = Math.round(host.clientHeight);
      if (w < 40 || h < 40) return;
      if (w === lastW && h === lastH) return;
      lastW = w;
      lastH = h;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    function loop(now) {
      raf = requestAnimationFrame(loop);
      var dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      fit();

      // quán tính
      if (!dragging) {
        rotation += velocity;
        velocity *= 0.94;
      }
      group.rotation.y = rotation;

      // tấm đang trỏ vào thì nhích lên và nghiêng về phía người xem
      cards.forEach(function (c, i) {
        var target = i === hovered ? 1 : 0;
        c.mesh.position.y += ((target * MAX_TILT) - c.mesh.position.y) * 0.14;
        var s = 1 + target * 0.05;
        c.mesh.scale.x += (s - c.mesh.scale.x) * 0.14;
        c.mesh.scale.y += (s - c.mesh.scale.y) * 0.14;
      });

      renderer.render(scene, camera);

      // khung đầu vẽ xong thì mới ẩn sáu thẻ phẳng bên dưới.
      // Nếu shader/WebGL hỏng, khung này không bao giờ chạy và lớp
      // phẳng vẫn nguyên — đó là ảnh dự phòng.
      if (!painted && renderer.info.render.triangles > 0) {
        painted = true;
        host.classList.add('is-live');
      }

      // theo dõi FPS: tụt liên tục thì báo để hạ tầng
      frames++;
      if (now - fpsStart >= 1000) {
        var fps = Math.round((frames * 1000) / (now - fpsStart));
        frames = 0;
        fpsStart = now;
        if (fps < 32) slowStreak++; else slowStreak = 0;
        if (slowStreak >= 3 && window.PeachyCap) {
          dispose();
          window.PeachyCap.state.tier = 'low';
          window.PeachyCap.state.reason += ' · 3D chạy ' + fps + 'fps nên hạ xuống';
          window.PeachyCap.apply();
          document.dispatchEvent(new CustomEvent('peachy:tier', { detail: 'low' }));
        }
      }
    }
    raf = requestAnimationFrame(loop);

    // ---- đổi kích thước ----
    // loop() tự đo lại mỗi khung nên chỉ cần một lần đổi cỡ cửa sổ
    // để vẽ ngay, không chờ khung kế tiếp
    function onResize() {
      lastW = 0;
      lastH = 0;
      fit();
    }
    window.addEventListener('resize', onResize);

    // canvas nằm trong một flex column: lúc mount nó có thể chưa
    // có chiều cao thật, nên theo dõi thêm bằng ResizeObserver
    var ro = null;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(onResize);
      ro.observe(host);
    }

    function dispose() {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      if (ro) ro.disconnect();
      dom.removeEventListener('pointerdown', onDown);
      dom.removeEventListener('pointermove', onMove);
      dom.removeEventListener('pointerup', onUp);
      dom.removeEventListener('pointercancel', onUp);

      cards.forEach(function (c) {
        c.mesh.geometry.dispose();
        c.mat.dispose();
        c.tex.dispose();
      });
      renderer.dispose();
      if (dom.parentNode) dom.parentNode.removeChild(dom);
      state.mounted = false;
    }

    state.mounted = true;
    state.active = 0;
    state.dispose = dispose;
    return true;
  }

  return { mount: mount, state: state };
})();