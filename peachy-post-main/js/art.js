// ============================================================
//  PEACHY POST — HÌNH VẼ
//
//  Mỗi postcard một hình SVG vẽ tay. Tất cả dùng chung một nét:
//  navy #1F2A55, nét tròn, mắt chấm, má hồng.
//
//  Muốn đổi hình: sửa chuỗi SVG của key tương ứng.
//  Key phải khớp `art` trong js/products.js.
// ============================================================

// Nét vẽ dùng chung
var ART_STROKE = '#1F2A55';
var ART_PINK = '#FFD9E4';
var ART_DEEP = '#FFB7C5';
var ART_CREAM = '#FFF6E5';
var ART_LEAF = '#B8E0B0';
var ART_RED = '#FF8A8A';
var ART_BLUE = '#A8CBE8';
var ART_YELLOW = '#FFE9A8';

// Bọc mọi hình trong cùng một khung
function artFrame(inner) {
  return (
    '<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" ' +
    'aria-hidden="true" focusable="false" ' +
    'stroke-linecap="round" stroke-linejoin="round">' +
    inner +
    '</svg>'
  );
}

// Hai mắt chấm
function eyes(cx1, cx2, cy) {
  return (
    '<circle cx="' + cx1 + '" cy="' + cy + '" r="7" fill="' + ART_STROKE + '"/>' +
    '<circle cx="' + cx2 + '" cy="' + cy + '" r="7" fill="' + ART_STROKE + '"/>'
  );
}

// Hai má hồng
function blush(cx1, cx2, cy) {
  return (
    '<ellipse cx="' + cx1 + '" cy="' + cy + '" rx="13" ry="8" fill="' + ART_DEEP + '" opacity=".85"/>' +
    '<ellipse cx="' + cx2 + '" cy="' + cy + '" rx="13" ry="8" fill="' + ART_DEEP + '" opacity=".85"/>'
  );
}

// Bọc ảnh chụp / mockup sản phẩm trong khung SVG chuẩn tỷ lệ
function artImage(src, alt) {
  return (
    '<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ' +
    'role="img" aria-label="' + (alt || '') + '" ' +
    'style="width:100%;height:100%;display:block;border-radius:12px;overflow:hidden;">' +
    '<image href="' + src + '" xlink:href="' + src + '" width="400" height="400" preserveAspectRatio="xMidYMid slice"/>' +
    '</svg>'
  );
}

var ART = {
  // ----------------------------------------------------------
  // 0. Bộ sưu tập Giáng Sinh (Tiệm Cá Heooo)
  // ----------------------------------------------------------
  xmasCouple: artImage('img/thiep-cap-doi-noel.jpg', 'Thiệp Giáng Sinh Cặp Đôi - All I Want For Christmas'),
  xmasDog: artImage('img/thiep-cun-hop-qua.jpg', 'Thiệp Cún Giáng Sinh An Lành - Xmas Mong Ít Mệt'),
  xmasCheers: artImage('img/thiep-anh-em-cot-cheo.jpg', 'Thiệp Giáng Sinh Cụng Ly - Anh Em Cột Chèo'),
  // ----------------------------------------------------------
  // 1. Bánh dâu
  // ----------------------------------------------------------
  strawberryCake: artFrame(
    // đĩa
    '<ellipse cx="200" cy="330" rx="130" ry="26" fill="#FFE3EC" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      // thân bánh
      '<path d="M116 326 Q116 226 200 226 Q284 226 284 326 Z" fill="' + ART_CREAM + '" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      // lớp kem trên
      '<path d="M128 258 Q200 232 272 258" fill="none" stroke="' + ART_STROKE + '" stroke-width="5" opacity=".35"/>' +
      // kem
      '<circle cx="200" cy="220" r="26" fill="#FFFDF5" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      // dâu
      '<path d="M200 178 C217 178 229 190 229 203 C229 218 214 234 200 243 C186 234 171 218 171 203 C171 190 183 178 200 178 Z" fill="' + ART_RED + '" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      '<path d="M200 180 L187 164 L200 171 L213 164 Z" fill="' + ART_LEAF + '" stroke="' + ART_STROKE + '" stroke-width="5"/>' +
      '<circle cx="190" cy="200" r="2.6" fill="' + ART_STROKE + '"/>' +
      '<circle cx="210" cy="200" r="2.6" fill="' + ART_STROKE + '"/>' +
      '<circle cx="200" cy="216" r="2.6" fill="' + ART_STROKE + '"/>' +
      // mặt
      eyes(172, 228, 288) +
      blush(148, 252, 304) +
      '<path d="M191 304 Q200 312 209 304" fill="none" stroke="' + ART_STROKE + '" stroke-width="5"/>'
  ),

  // ----------------------------------------------------------
  // 2. Mèo đọc sách
  // ----------------------------------------------------------
  readingCat: artFrame(
    // tai
    '<path d="M142 122 L126 72 L180 102 Z" fill="' + ART_PINK + '" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      '<path d="M258 122 L274 72 L220 102 Z" fill="' + ART_PINK + '" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      // đầu
      '<circle cx="200" cy="168" r="78" fill="' + ART_PINK + '" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      // mặt
      eyes(176, 224, 162) +
      blush(152, 248, 186) +
      '<path d="M194 182 L200 188 L206 182" fill="none" stroke="' + ART_STROKE + '" stroke-width="5"/>' +
      // sách
      '<path d="M52 262 Q130 232 200 258 L200 338 Q130 312 52 338 Z" fill="#FFFDF5" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      '<path d="M348 262 Q270 232 200 258 L200 338 Q270 312 348 338 Z" fill="#FFFDF5" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      '<path d="M200 258 L200 338" stroke="' + ART_STROKE + '" stroke-width="5"/>' +
      // chữ trên trang
      '<path d="M86 288 L160 274" stroke="' + ART_STROKE + '" stroke-width="4" opacity=".3"/>' +
      '<path d="M86 306 L150 293" stroke="' + ART_STROKE + '" stroke-width="4" opacity=".3"/>' +
      '<path d="M240 274 L314 288" stroke="' + ART_STROKE + '" stroke-width="4" opacity=".3"/>' +
      '<path d="M250 293 L314 306" stroke="' + ART_STROKE + '" stroke-width="4" opacity=".3"/>' +
      // bàn chân
      '<circle cx="96" cy="300" r="19" fill="' + ART_PINK + '" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      '<circle cx="304" cy="300" r="19" fill="' + ART_PINK + '" stroke="' + ART_STROKE + '" stroke-width="6"/>'
  ),

  // ----------------------------------------------------------
  // 3. Mèo xanh + bong bóng
  // ----------------------------------------------------------
  blueCat: artFrame(
    // bong bóng
    '<rect x="94" y="46" width="212" height="108" rx="30" fill="#FFFDF5" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      '<path d="M168 150 L152 190 L212 148 Z" fill="#FFFDF5" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      '<path d="M186 156 L166 174" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      // tim trong bong bóng
      '<path d="M200 72 C191 61 173 66 173 81 C173 94 189 104 200 114 C211 104 227 94 227 81 C227 66 209 61 200 72 Z" fill="' + ART_RED + '" stroke="' + ART_STROKE + '" stroke-width="5"/>' +
      // tai
      '<path d="M148 244 L136 196 L186 226 Z" fill="' + ART_BLUE + '" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      '<path d="M252 244 L264 196 L214 226 Z" fill="' + ART_BLUE + '" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      // thân
      '<path d="M118 334 Q118 212 200 212 Q282 212 282 334 Z" fill="' + ART_BLUE + '" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      // mặt
      eyes(176, 224, 276) +
      blush(152, 248, 296) +
      '<path d="M191 296 Q200 305 209 296" fill="none" stroke="' + ART_STROKE + '" stroke-width="5"/>' +
      // chân
      '<ellipse cx="158" cy="336" rx="26" ry="14" fill="#FFFDF5" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      '<ellipse cx="242" cy="336" rx="26" ry="14" fill="#FFFDF5" stroke="' + ART_STROKE + '" stroke-width="6"/>'
  ),

  // ----------------------------------------------------------
  // 4. Bình hoa
  // ----------------------------------------------------------
  flowerJug: artFrame(
    // cành
    '<path d="M178 238 C166 184 156 152 144 124" fill="none" stroke="#7FA86F" stroke-width="7"/>' +
      '<path d="M200 236 C200 178 202 142 206 106" fill="none" stroke="#7FA86F" stroke-width="7"/>' +
      '<path d="M222 238 C238 186 250 154 262 130" fill="none" stroke="#7FA86F" stroke-width="7"/>' +
      // lá
      '<ellipse cx="160" cy="182" rx="18" ry="10" fill="' + ART_LEAF + '" stroke="' + ART_STROKE + '" stroke-width="5" transform="rotate(-30 160 182)"/>' +
      '<ellipse cx="240" cy="188" rx="18" ry="10" fill="' + ART_LEAF + '" stroke="' + ART_STROKE + '" stroke-width="5" transform="rotate(30 240 188)"/>' +
      '<ellipse cx="196" cy="150" rx="16" ry="9" fill="' + ART_LEAF + '" stroke="' + ART_STROKE + '" stroke-width="5" transform="rotate(-70 196 150)"/>' +
      // hoa trái
      '<circle cx="144" cy="112" r="14" fill="' + ART_DEEP + '" stroke="' + ART_STROKE + '" stroke-width="5"/>' +
      '<circle cx="118" cy="126" r="14" fill="' + ART_DEEP + '" stroke="' + ART_STROKE + '" stroke-width="5"/>' +
      '<circle cx="170" cy="126" r="14" fill="' + ART_DEEP + '" stroke="' + ART_STROKE + '" stroke-width="5"/>' +
      '<circle cx="140" cy="144" r="14" fill="' + ART_DEEP + '" stroke="' + ART_STROKE + '" stroke-width="5"/>' +
      '<circle cx="144" cy="128" r="13" fill="' + ART_YELLOW + '" stroke="' + ART_STROKE + '" stroke-width="5"/>' +
      // hoa giữa
      '<circle cx="206" cy="92" r="14" fill="#FFFDF5" stroke="' + ART_STROKE + '" stroke-width="5"/>' +
      '<circle cx="180" cy="106" r="14" fill="#FFFDF5" stroke="' + ART_STROKE + '" stroke-width="5"/>' +
      '<circle cx="232" cy="106" r="14" fill="#FFFDF5" stroke="' + ART_STROKE + '" stroke-width="5"/>' +
      '<circle cx="206" cy="122" r="13" fill="' + ART_YELLOW + '" stroke="' + ART_STROKE + '" stroke-width="5"/>' +
      // hoa phải
      '<circle cx="262" cy="118" r="14" fill="' + ART_RED + '" stroke="' + ART_STROKE + '" stroke-width="5"/>' +
      '<circle cx="236" cy="132" r="14" fill="' + ART_RED + '" stroke="' + ART_STROKE + '" stroke-width="5"/>' +
      '<circle cx="288" cy="132" r="14" fill="' + ART_RED + '" stroke="' + ART_STROKE + '" stroke-width="5"/>' +
      '<circle cx="262" cy="146" r="13" fill="' + ART_YELLOW + '" stroke="' + ART_STROKE + '" stroke-width="5"/>' +
      // bình
      '<path d="M134 236 L266 236 L254 338 Q200 352 146 338 Z" fill="' + ART_BLUE + '" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      '<ellipse cx="200" cy="236" rx="66" ry="15" fill="#C9E0F2" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      // mặt trên bình
      eyes(174, 226, 288) +
      blush(152, 248, 308) +
      '<path d="M192 306 Q200 314 208 306" fill="none" stroke="' + ART_STROKE + '" stroke-width="5"/>'
  ),

  // ----------------------------------------------------------
  // 5. Mặt trời ngủ
  // ----------------------------------------------------------
  sleepySun: artFrame(
    // tia
    '<g stroke="#FFC96B" stroke-width="12" stroke-linecap="round">' +
      '<path d="M200 44 L200 76"/>' +
      '<path d="M200 324 L200 356"/>' +
      '<path d="M44 200 L76 200"/>' +
      '<path d="M324 200 L356 200"/>' +
      '<path d="M90 90 L113 113"/>' +
      '<path d="M287 287 L310 310"/>' +
      '<path d="M310 90 L287 113"/>' +
      '<path d="M113 287 L90 310"/>' +
      '<path d="M152 52 L163 82"/>' +
      '<path d="M248 52 L237 82"/>' +
      '<path d="M152 348 L163 318"/>' +
      '<path d="M248 348 L237 318"/>' +
      '</g>' +
      // thân
      '<circle cx="200" cy="200" r="98" fill="' + ART_YELLOW + '" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      // mắt nhắm
      '<path d="M152 192 Q172 212 192 192" fill="none" stroke="' + ART_STROKE + '" stroke-width="7"/>' +
      '<path d="M208 192 Q228 212 248 192" fill="none" stroke="' + ART_STROKE + '" stroke-width="7"/>' +
      blush(142, 258, 222) +
      '<path d="M190 228 Q200 238 210 228" fill="none" stroke="' + ART_STROKE + '" stroke-width="5"/>' +
      // zzz
      '<path d="M296 108 L322 108 L296 134 L322 134" fill="none" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      '<path d="M330 74 L348 74 L330 92 L348 92" fill="none" stroke="' + ART_STROKE + '" stroke-width="5" opacity=".6"/>'
  ),

  // ----------------------------------------------------------
  // 6. Ếch ôm tim
  // ----------------------------------------------------------
  loveFrog: artFrame(
    // bướu mắt
    '<circle cx="152" cy="140" r="36" fill="' + ART_LEAF + '" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      '<circle cx="248" cy="140" r="36" fill="' + ART_LEAF + '" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      '<circle cx="152" cy="140" r="13" fill="' + ART_STROKE + '"/>' +
      '<circle cx="248" cy="140" r="13" fill="' + ART_STROKE + '"/>' +
      // thân
      '<circle cx="200" cy="228" r="96" fill="' + ART_LEAF + '" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      // miệng
      '<path d="M152 244 Q200 288 248 244" fill="none" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      blush(134, 266, 232) +
      // tim
      '<path d="M200 344 C172 322 150 302 150 278 C150 260 165 250 180 250 C190 250 197 256 200 264 C203 256 210 250 220 250 C235 250 250 260 250 278 C250 302 228 322 200 344 Z" fill="' + ART_RED + '" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      // tay
      '<path d="M140 296 Q166 306 178 312" fill="none" stroke="' + ART_STROKE + '" stroke-width="6"/>' +
      '<path d="M260 296 Q234 306 222 312" fill="none" stroke="' + ART_STROKE + '" stroke-width="6"/>'
  )
};

// ============================================================
//  LOGO
//  Tiệm Cá Heo✨. Dùng ở header và loader.
// ============================================================
var MARK_SVG =
  '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" style="border-radius:50%;overflow:hidden;display:block;">' +
  '<image href="img/logo-tiem-ca-heo.png" xlink:href="img/logo-tiem-ca-heo.png" width="100" height="100" preserveAspectRatio="xMidYMid slice"/>' +
  '</svg>';

// ============================================================
//  DOODLE
//  Sticker nhỏ rắc quanh trang. app.js tự rải.
// ============================================================
var DOODLES = {
  star:
    '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M20 4 C22 14 26 18 36 20 C26 22 22 26 20 36 C18 26 14 22 4 20 C14 18 18 14 20 4 Z" fill="#FFE9A8" stroke="' + ART_STROKE + '" stroke-width="2.6"/></svg>',
  sparkle:
    '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M20 6 C21 15 25 19 34 20 C25 21 21 25 20 34 C19 25 15 21 6 20 C15 19 19 15 20 6 Z" fill="' + ART_DEEP + '" stroke="' + ART_STROKE + '" stroke-width="2.6" opacity=".9"/></svg>',
  heart:
    '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M20 34 C8 25 4 18 4 13 C4 7 9 4 14 4 C17 4 19 6 20 9 C21 6 23 4 26 4 C31 4 36 7 36 13 C36 18 32 25 20 34 Z" fill="' + ART_RED + '" stroke="' + ART_STROKE + '" stroke-width="2.6"/></svg>',
  berry:
    '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M20 38 C12 33 6 27 6 20 C6 14 12 11 20 11 C28 11 34 14 34 20 C34 27 28 33 20 38 Z" fill="' + ART_RED + '" stroke="' + ART_STROKE + '" stroke-width="2.6"/>' +
    '<path d="M20 12 L14 4 L20 7 L26 4 Z" fill="' + ART_LEAF + '" stroke="' + ART_STROKE + '" stroke-width="2.2"/></svg>',
  flower:
    '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" stroke-linecap="round" stroke-linejoin="round">' +
    '<circle cx="20" cy="9" r="6" fill="#FFFDF5" stroke="' + ART_STROKE + '" stroke-width="2.4"/>' +
    '<circle cx="10" cy="18" r="6" fill="#FFFDF5" stroke="' + ART_STROKE + '" stroke-width="2.4"/>' +
    '<circle cx="30" cy="18" r="6" fill="#FFFDF5" stroke="' + ART_STROKE + '" stroke-width="2.4"/>' +
    '<circle cx="14" cy="29" r="6" fill="#FFFDF5" stroke="' + ART_STROKE + '" stroke-width="2.4"/>' +
    '<circle cx="26" cy="29" r="6" fill="#FFFDF5" stroke="' + ART_STROKE + '" stroke-width="2.4"/>' +
    '<circle cx="20" cy="20" r="7" fill="' + ART_YELLOW + '" stroke="' + ART_STROKE + '" stroke-width="2.4"/></svg>'
};
