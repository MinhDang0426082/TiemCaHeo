// ============================================================
//  PEACHY POST — HÀNH VI
//
//  Đọc PRODUCTS (js/products.js) và ART (js/art.js), rồi:
//    1. Bày sáu tấm thiếp ở hero
//    2. Dựng lưới thẻ sản phẩm
//    3. Mở modal chi tiết
//    4. Tô đậm dần câu ở section "Trong phong bì"
//    5. Mở sheet menu trên điện thoại
//
//  Không cần sửa file này để thêm sản phẩm.
// ============================================================

(function () {
  'use strict';

  // ----------------------------------------------------------
  //  Link mua
  //  Chưa dán link thì trả về chuỗi rỗng — nút Mua sẽ tự tắt,
  //  không dẫn đi đâu cả. Không bao giờ trả về '#'.
  // ----------------------------------------------------------
  function buyUrl(product) {
    if (!product || typeof product.link !== 'string') return '';
    var url = product.link.trim();
    return url === '' || url === '#' ? '' : url;
  }

  function artOf(product) {
    return (ART && ART[product.art]) || '';
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  // ----------------------------------------------------------
  //  Nút Mua
  //  Có link  -> thẻ <a> mở tab mới
  //  Không có -> <button> bị tắt, cùng nhãn "Mua", giải thích
  //              qua title và aria-label (người đọc màn hình
  //              nghe được lý do, không phải đoán)
  // ----------------------------------------------------------
  var NO_LINK = 'Chưa có link mua cho tấm này';

  function buyControl(product, className) {
    var url = buyUrl(product);

    if (url) {
      var a = el('a', className, 'Mua');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.setAttribute('aria-label', 'Mua ' + product.nameVi);
      return a;
    }

    var b = el('button', className, 'Mua');
    b.type = 'button';
    b.disabled = true;
    b.setAttribute('aria-disabled', 'true');
    b.title = NO_LINK;
    b.setAttribute('aria-label', 'Mua ' + product.nameVi + ' — ' + NO_LINK);
    return b;
  }

  // ----------------------------------------------------------
  //  1. Hero — sáu tấm thiếp
  //     Máy mạnh: cảnh 3D quay được (js/three-scene.js)
  //     Máy yếu : sáu tấm phẳng bằng SVG (như cũ)
  // ----------------------------------------------------------
  var stageEl = null;

  function renderHeroFlat() {
    if (!stageEl || stageEl.querySelector('.hero__card')) return;
    var mid = Math.floor(PRODUCTS.length / 2);
    PRODUCTS.forEach(function (product, i) {
      var card = el('div', 'hero__card' + (i === mid ? ' hero__card--lead' : ''));
      card.innerHTML = artOf(product);
      stageEl.appendChild(card);
    });
  }

  function clearHeroFlat() {
    if (!stageEl) return;
    var cards = stageEl.querySelectorAll('.hero__card');
    for (var i = 0; i < cards.length; i++) cards[i].remove();
  }

  function mountHero3D() {
    if (!stageEl || !window.Peachy3D || typeof THREE === 'undefined') return false;
    if (window.PeachyCap && window.PeachyCap.state.tier !== 'high') return false;

    var ok = window.Peachy3D.mount(stageEl, PRODUCTS, function (index, product) {
      openModal(product, stageEl.querySelector('canvas'));
    });

    // sàn chưa có kích thước: thử lại ở khung hình sau, tối đa vài lần
    if (ok === 'retry') {
      var tries = 0;
      (function retry() {
        if (tries++ > 40) return;
        requestAnimationFrame(retry);
        if (stageEl.clientHeight < 40) return;
        mountHero3D();
      })();
      return false;
    }

    if (ok === true) {
      stageEl.classList.add('is-3d');
    }
    return ok === true;
  }

  function renderHero() {
    stageEl = document.querySelector('[data-hero-stage]');
    if (!stageEl) return;

    // luôn có bản phẳng trước: nó là ảnh dự phòng, và là
    // trạng thái hiển thị khi JS/WebGL không chạy được
    renderHeroFlat();

    var tier = window.PeachyCap ? window.PeachyCap.state.tier : 'low';

    if (tier !== 'high') return;

    if (window.__peachyThreeReady) {
      mountHero3D();
    } else {
      document.addEventListener('peachy:three', mountHero3D, { once: true });
    }
  }

  // ----------------------------------------------------------
  //  2. Lưới thẻ sản phẩm
  // ----------------------------------------------------------
  function cardFor(product) {
    var card = el('article', 'card');
    card.dataset.id = product.id;

    var art = el('div', 'card__art');
    art.innerHTML = artOf(product);

    var text = el('div', 'card__text');

    var body = el('div', 'card__body');
    body.appendChild(el('h3', 'card__name', product.nameVi));
    body.appendChild(el('p', 'card__name-en', product.nameEn));
    body.appendChild(el('p', 'card__tagline', product.taglineVi));

    var foot = el('div', 'card__foot');
    foot.appendChild(el('p', 'card__price', product.price));

    var actions = el('div', 'card__actions');
    var open = el('button', 'card__open', 'Xem chi tiết');
    open.type = 'button';
    open.addEventListener('click', function () {
      openModal(product, open);
    });
    actions.appendChild(open);
    actions.appendChild(buyControl(product, 'btn btn--primary card__buy'));
    foot.appendChild(actions);

    text.appendChild(body);
    text.appendChild(foot);

    card.appendChild(art);
    card.appendChild(text);
    return card;
  }

  function renderGrid() {
    var grid = document.querySelector('[data-grid]');
    if (!grid) return;

    PRODUCTS.forEach(function (product) {
      grid.appendChild(cardFor(product));
    });
  }

  // ----------------------------------------------------------
  //  3. Modal chi tiết
  // ----------------------------------------------------------
  var modalRoot = document.getElementById('modal-root');
  var lastTrigger = null;

  var SPECS = [
    'Khổ A6 · 14,8 × 10,5 cm',
    'Giấy mỹ thuật 300gsm',
    'In 4 màu, mặt sau để trống',
    'Kèm túi bảo vệ và sticker nhỏ'
  ];

  function buildModal(product) {
    var modal = el('div', 'modal');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modal-title');

    var close = el('button', 'modal__close', '✕');
    close.type = 'button';
    close.setAttribute('aria-label', 'Đóng');
    close.addEventListener('click', closeModal);

    var art = el('div', 'modal__art');
    art.innerHTML = artOf(product);

    var info = el('div', 'modal__info');
    var title = el('h2', 'modal__name', product.nameVi);
    title.id = 'modal-title';
    info.appendChild(title);
    info.appendChild(el('p', 'modal__name-en', product.nameEn));
    info.appendChild(el('p', 'modal__price', product.price));

    var desc = el('div', 'modal__desc');
    desc.appendChild(el('p', 'modal__desc-vi', product.descVi));
    desc.appendChild(el('p', 'modal__desc-en', product.descEn));
    info.appendChild(desc);

    var specs = el('ul', 'modal__specs');
    var activeSpecs = Array.isArray(product.specs) ? product.specs : SPECS;
    activeSpecs.forEach(function (line) {
      specs.appendChild(el('li', null, line));
    });
    info.appendChild(specs);

    var actions = el('div', 'modal__actions');
    actions.appendChild(buyControl(product, 'btn btn--primary'));
    info.appendChild(actions);

    modal.appendChild(close);
    modal.appendChild(art);
    modal.appendChild(info);
    return modal;
  }

  function openModal(product, trigger) {
    if (!modalRoot) return;
    lastTrigger = trigger || null;

    modalRoot.innerHTML = '';
    modalRoot.appendChild(buildModal(product));
    modalRoot.hidden = false;
    document.body.style.overflow = 'hidden';

    var close = modalRoot.querySelector('.modal__close');
    if (close) close.focus();
  }

  function closeModal() {
    if (!modalRoot || modalRoot.hidden) return;
    modalRoot.hidden = true;
    modalRoot.innerHTML = '';
    document.body.style.overflow = '';
    if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
    lastTrigger = null;
  }

  // bấm nền tối để đóng (chỉ khi bấm đúng nền, không phải trong .modal)
  if (modalRoot) {
    modalRoot.addEventListener('click', function (event) {
      if (event.target === modalRoot) closeModal();
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeModal();
  });

  // ----------------------------------------------------------
  //  4. Hình minh hoạ trong section "Trong phong bì" và "Về shop"
  // ----------------------------------------------------------
  function renderShowcase() {
    document.querySelectorAll('[data-showcase]').forEach(function (node, i) {
      var product = PRODUCTS[i % PRODUCTS.length];
      node.innerHTML = artOf(product);
    });
  }

  // ----------------------------------------------------------
  //  5. Nav đánh dấu mục đang xem
  // ----------------------------------------------------------
  function initCurrent() {
    if (!window.IntersectionObserver) return;

    var links = Array.prototype.slice.call(
      document.querySelectorAll('.nav__links a[href^="#"]')
    );
    if (!links.length) return;

    var byId = {};
    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (section) byId[id] = link;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = byId[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            links.forEach(function (other) {
              other.removeAttribute('aria-current');
            });
            link.setAttribute('aria-current', 'page');
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    Object.keys(byId).forEach(function (id) {
      observer.observe(document.getElementById(id));
    });
  }

  // ----------------------------------------------------------
  //  6. Sheet menu trên điện thoại
  // ----------------------------------------------------------
  function initNav() {
    var toggle = document.querySelector('.nav__toggle');
    var sheet = document.getElementById('nav-sheet');
    if (!toggle || !sheet) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      sheet.hidden = !open;
      document.body.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    sheet.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setOpen(false);
    });
  }

  // ----------------------------------------------------------
  //  6. Thẻ và tile hiện dần khi cuộn tới (chỉ tầng low)
  //     Tầng min bỏ qua, tầng high để 3D lo phần hero.
  // ----------------------------------------------------------
  function initReveal() {
    var tier = window.PeachyCap ? window.PeachyCap.state.tier : 'low';
    if (tier !== 'low' || !window.IntersectionObserver) return;

    var targets = document.querySelectorAll('.card, .tile');
    if (!targets.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
    );

    targets.forEach(function (node) {
      observer.observe(node);
    });
  }

  // ----------------------------------------------------------
  //  7. Bộ tải
  //     Hiện một lần khi trang bắt đầu dựng, rồi tan đi.
  //     Tầng min thì bỏ qua hoàn toàn.
  // ----------------------------------------------------------
  function initLoader() {
    var loader = document.getElementById('loader');
    if (!loader) return;

    var tier = window.PeachyCap ? window.PeachyCap.state.tier : 'low';

    if (tier === 'min') {
      loader.remove();
      return;
    }

    var mark = loader.querySelector('[data-loader-mark]');
    if (mark && typeof MARK_SVG === 'string') mark.innerHTML = MARK_SVG;

    var done = function () {
      loader.classList.add('is-done');
      setTimeout(function () {
        if (loader.parentNode) loader.remove();
      }, 700);
    };

    // nếu tài liệu đã tải xong rồi thì gỡ ngay ở khung hình sau
    if (document.readyState === 'complete') {
      requestAnimationFrame(done);
    } else {
      window.addEventListener('load', function () {
        setTimeout(done, 260);
      }, { once: true });
      // lưới an toàn: không bao giờ giữ người xem quá lâu
      setTimeout(done, 2600);
    }
  }

  // ----------------------------------------------------------
  //  Chạy
  // ----------------------------------------------------------
  function init() {
    // logo vào header và mọi chỗ có data-mark
    document.querySelectorAll('[data-mark]').forEach(function (node) {
      node.innerHTML = typeof MARK_SVG === 'string' ? MARK_SVG : '';
    });

    renderHero();
    renderGrid();
    renderShowcase();
    initCurrent();
    initNav();
    initReveal();
    initLoader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
