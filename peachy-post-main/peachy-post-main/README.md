# Tiệm Cá Heo✨ — hướng dẫn sửa web

## 1. Các file và việc của từng file

| File                | Sửa khi nào                                               |
| ------------------- | --------------------------------------------------------- |
| `js/products.js`    | **Thêm/bớt/sửa sản phẩm.** Đây là file bạn mở nhiều nhất. |
| `js/art.js`         | Đổi hình vẽ của bưu thiếp                                 |
| `index.html`        | Đổi tên shop, chữ trên trang, câu hỏi thường gặp          |
| `css/styles.css`    | Đổi màu, cỡ chữ, khoảng cách                              |
| `js/app.js`         | Cách dựng trang (thẻ, modal, tải). Ít khi cần sửa.        |
| `js/capability.js`  | Cách đo máy yếu/mạnh                                      |
| `js/three-scene.js` | Cảnh 3D                                                   |
| `favicon.svg`       | Icon trên tab trình duyệt                                 |
| `img/`              | Chứa ảnh chụp thật / mockup sản phẩm (JPG, PNG, WebP)      |
| `fonts/`            | Chứa font chữ tùy chỉnh (DFVN Hogfish & DFVN LazyFox)      |

Sản phẩm **không** viết trong `index.html`. Trang đọc từ `products.js` rồi
tự dựng thẻ và modal. Nên thêm một sản phẩm chỉ là thêm một object.

---

## 2. Thêm một sản phẩm

Mở `js/products.js`, copy một object có sẵn, dán vào cuối mảng (nhớ dấu phẩy
giữa các object), rồi sửa nội dung:

```js
  {
    id: 'ten-rieng',                     // không dấu, không cách, KHÔNG trùng
    nameVi: 'Tên tiếng Việt',
    nameEn: 'Ten tieng Anh',
    price: '35.000₫',                    // chữ gì cũng được, chỉ để hiển thị
    taglineVi: 'Một câu ngắn dưới tên.',
    descVi: 'Mô tả dài. Hiện trong popup khi bấm Xem chi tiết.',
    descEn: 'Mo ta tieng Anh.',
    link: '',                            // link mua — xem mục 3
    art: 'strawberryCake'                // phải khớp một key trong js/art.js
  }
```

Tên object mới **phải** có dấu phẩy ở cuối nếu nó không phải cái cuối cùng.
Thiếu dấu phẩy là trang trắng, không báo lỗi gì.

**Sau khi thêm, kiểm tra:** mở trang, bấm F12 → Console. Không có chữ đỏ là
được.

### Cảnh báo về số lượng

Lưới sản phẩm canh cho **6 tấm**: 3 cột × 2 hàng, section cao 2 màn hình.
Tao đã thử tận tay, kết quả như sau.

**5–6 tấm:** đẹp, không cần sửa gì.

**7–8 tấm:** phải sửa **3 chỗ** trong `css/styles.css`, thiếu một chỗ là vỡ.

1. Lưới thành 4 cột. Tìm `.grid--cards`, đổi dòng `grid-template-columns`:

```css
    grid-template-columns: repeat(4, minmax(0, 1fr));
```

   `minmax(0, 1fr)` là bắt buộc, không phải `repeat(4, 1fr)`. Viết `1fr` trần
   thì ở màn 1024px cột không co được dưới bề rộng chữ, thẻ tràn ra ngoài màn
   hình và trang bị cuộn ngang.

2. Trong khối `@media (max-width: 640px)`, thu thẻ nhỏ lại:

```css
    .card__art { flex: 0 0 64px; padding: var(--s-1); }
```

3. Vẫn trong khối đó, ẩn câu phụ trên thẻ điện thoại:

```css
    .card__tagline { display: none; }
```

   Câu này trùng nội dung với mô tả trong popup chi tiết, nên không mất thông
   tin. Không ẩn thì 7 tấm cao 2.1 màn hình trên điện thoại, vượt mức 2 màn
   hình mà trang cho phép.

**9 tấm trở lên:** 3 hàng thẻ. Đừng tăng `--h` lên 3 — luật của trang là mỗi
mục chỉ cao 1 hoặc 2 màn hình, để cuộn xuống là thấy trọn một mục. Cao 3 màn
hình thì mục đó bị cắt ngang, nhìn rối.
Cách đúng: **tách thành hai mục** ("Bưu thiếp" và "Bưu thiếp mùa lễ", mỗi mục
6 tấm), hoặc giữ 6 tấm và gộp các tấm còn lại.

Hero lấy 6 tấm để bày thành vòng. Nhiều hơn thì vòng tự chia lại đều, nhưng
mỗi tấm nhỏ đi.

---

## 3. Set nút Mua

Nút Mua lấy link từ dòng `link` của **đúng sản phẩm đó**.

```js
    link: '',                                    // nút xám, bấm không được
    link: 'https://shopee.vn/product/123/456',   // nút đỏ, mở tab mới
```

| `link`          | Nút hiển thị                                        |
| --------------- | --------------------------------------------------- |
| `''`            | Xám, không bấm được, có dòng giải thích khi trỏ vào |
| `'https://...'` | Đỏ, mở ra tab mới                                   |

**Link phải có `https://`.** Viết `shopee.vn/...` thiếu scheme thì trình duyệt
hiểu là đường dẫn nội bộ và sẽ hỏng.

Một tấm chưa có link thì cứ để trống — nút tự tắt, không dẫn tới link chết.

Link được dùng ở **cả hai chỗ**: nút trên thẻ và nút trong popup. Sửa một lần
là cả hai ăn theo.

---

## 4. Đổi hình vẽ của bưu thiếp

Hình nằm trong `js/art.js`. Mỗi hình là một key trong object `ART`:

```js
var ART = {
  strawberryCake: artFrame( ... ),
  readingCat: artFrame( ... ),
  // ...
};
```

`art: 'strawberryCake'` trong `products.js` phải khớp đúng tên key này.
Sai tên thì thẻ đó trống hình, không báo lỗi.

### Ba cách đổi hình

**Cách dễ — đổi hình có sẵn:** sửa các dòng trong `artFrame(...)`. Đó là SVG
thuần, đổi số trong `cx`, `cy`, `fill` là hình đổi theo.

**Cách dùng ảnh chụp thật / mockup (JPG, PNG, WebP):** Bỏ ảnh vào thư mục `img/`,
rồi trong `js/art.js` gọi hàm `artImage()`:

```js
  xmasCouple: artImage('img/thiep-cap-doi-noel.jpg', 'Thiệp Giáng Sinh Cặp Đôi'),
```
Hàm `artImage()` tự động bọc ảnh chuẩn tỷ lệ 1:1, tự bo góc, hiển thị mượt trên
cả thẻ lưới lẫn modal popup.

**Cách tự vẽ SVG rồi dán vào:** mở một file `.svg` bạn thích, copy toàn
bộ nội dung, bọc lại như sau rồi thay vào chỗ `artFrame(...)`:

```js
  myArt: '<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
       + '  ... dán nội dung SVG vào đây ...'
       + '</svg>',
```

Giữ `viewBox="0 0 400 400"` và bỏ `width`/`height` thì hình tự co giãn vừa mọi khung.

### Bảng màu đang dùng

Khai báo ở đầu `js/art.js`, đổi một chỗ là đổi toàn bộ:

```js
var ART_STROKE = "#1F2A55"; // nét vẽ
var ART_PINK = "#FFD9E4";
var ART_DEEP = "#FFB7C5";
var ART_CREAM = "#FFF6E5";
var ART_LEAF = "#B8E0B0";
var ART_RED = "#FF8A8A";
var ART_BLUE = "#A8CBE8";
var ART_YELLOW = "#FFE9A8";
```

---

## 5. Đổi tên shop

Tên "Peachy Post" là tên tạm. Chữ nằm rải trong `index.html` — mở file, dùng
Ctrl+H thay hết. Các dòng cần sửa:

| Dòng     | Chỗ hiện trên trang                        |
| -------- | ------------------------------------------ |
| 8        | Tiêu đề tab trình duyệt                    |
| 15       | Tiêu đề khi share link lên Facebook/Zalo   |
| 46       | Logo ở header                              |
| 100      | Nhãn đọc cho người dùng trình đọc màn hình |
| 180, 219 | Nhãn của hai khung hình minh hoạ           |
| 217, 218 | Mục "Về..."                                |
| 236      | Câu lớn ở footer                           |
| 251      | Cột trong footer                           |
| 262      | Dòng bản quyền                             |
| 274      | Chữ trên màn hình chờ                      |

Đổi logo thì sửa `favicon.svg` và biến `MARK_SVG` trong `js/art.js`.

---

## 6. Đổi màu

Màu khai báo một chỗ duy nhất, ở đầu `css/styles.css`:

```css
:root {
  --bg: #fff0f5; /* nền trang */
  --surface: #ffd9e4; /* nền section hồng đậm hơn */
  --ink: #1f2a55; /* chữ chính, nét vẽ */
  --muted: #3d4568; /* chữ phụ */
  --accent: #d92d4c; /* nút chính, giá, vòng focus */
  --card: #fffdfe; /* nền thẻ */
  --inverse: #1f2a55; /* nền footer */
}
```

**Lưu ý về `--accent`:** màu này phải đủ đậm. Hồng tươi như `#ff6b81` chỉ đạt
2.7:1 trên nền, không đủ cho chữ trắng trên nút (cần 4.5:1). Nếu muốn nút hồng
tươi thì phải đổi chữ trên nút sang màu navy, sửa `--on-accent`.

Đổi hết palette thì đổi cả 8 dòng cho đồng bộ, đừng đổi lẻ.

---

## 7. Đổi chữ trên trang

Mở `index.html`. Các đoạn hay sửa nhất:

- **Câu lớn ở hero** — tìm `<h1 class="hero__h1">`. Dòng chữ nằm trong
  `<span class="line"><span>...</span></span>`. Mỗi cặp là một dòng hiển thị,
  thêm cặp là thêm dòng.
- **Dòng phụ dưới hero** — `<p class="hero__lead">`.
- **Câu hỏi thường gặp** — tìm `<ul class="faq">`. Mỗi `<li>` là một câu; câu
  hỏi ở `faq__q`, trả lời ở `faq__a`.
- **Mục "Trong mỗi phong bì"** — tìm `<ul class="tiles">`.
- **Footer** — tìm `<footer class="closing">`.

**Quy tắc nên giữ:** nút bấm là động từ + thứ nhận được ("Mua bưu thiếp",
"Xem chi tiết"). Đừng viết "Tìm hiểu thêm", "Khám phá".

### Thông số trong popup

Bốn dòng thông số (khổ A6, giấy, in 4 màu, túi bảo vệ) dùng chung cho MỌI sản
phẩm, khai báo ở `js/app.js`:

```js
var SPECS = [
  "Khổ A6 · 14,8 × 10,5 cm",
  "Giấy mỹ thuật 300gsm",
  "In 4 màu, mặt sau để trống",
  "Kèm túi bảo vệ và sticker nhỏ",
];
```

Sửa ở đây là đổi cho tất cả. Muốn mỗi tấm một thông số riêng thì phải sửa thêm
code — nhắn tao.

---

## 8. Máy yếu / máy mạnh

Trang tự đo máy rồi chọn một trong ba tầng:

| Tầng   | Khi nào                                                            | Người xem thấy                  |
| ------ | ------------------------------------------------------------------ | ------------------------------- |
| `high` | Máy đủ khỏe                                                        | Cảnh 3D quay được + animation   |
| `low`  | ≤2 nhân CPU, ≤2GB RAM, không WebGL, bật tiết kiệm dữ liệu, mạng 2G | Chỉ 6 tấm phẳng + animation nhẹ |
| `min`  | Người xem bật "giảm chuyển động"                                   | Trang tĩnh                      |

Trang còn **tự đo FPS**: nếu 3D tụt dưới 32fps liên tục 3 giây thì tự gỡ 3D,
quay về tầng `low`. Không bao giờ tự nâng lên.

### Xem thử từng tầng

Thêm vào cuối địa chỉ trang trên thanh địa chỉ:

```
index.html#tier=low      → xem như máy yếu
index.html#tier=min      → xem như tắt chuyển động
index.html#tier=high     → ép chạy 3D
```

Cách này chỉ để thử. Người xem bình thường không cần thêm gì.

### Ba điểm cần biết về 3D

1. **Cần mạng.** Three.js tải từ CDN. Mất mạng thì trang tự về tầng `low`,
   vẫn đủ nội dung, không hỏng.
2. **Sáu tấm phẳng luôn nằm dưới canvas** làm ảnh dự phòng. WebGL lỗi thì
   người xem vẫn thấy sản phẩm, không thấy ô trống.
3. **Tắt hẳn 3D:** sửa `js/capability.js`, đổi `state.tier = 'high'` thành
   `state.tier = 'low'` trong nhánh cuối cùng của hàm `decide()`.

---

## 9. Kiểm tra sau khi sửa

1. Mở `index.html` bằng Chrome.
2. Bấm `F12` → tab **Console**. Chữ đỏ là lỗi, phải sửa.
3. Kéo cửa sổ nhỏ lại còn khoảng 400px — trang phải không bị cuộn ngang.
4. Bấm **Xem chi tiết** một tấm — popup phải mở, bấm `Esc` phải đóng.
5. Bấm **Mua** — phải mở link đúng của tấm đó ở tab mới.

### Lỗi hay gặp

| Hiện tượng                  | Nguyên nhân                                                |
| --------------------------- | ---------------------------------------------------------- |
| Trang trắng trơn            | Thiếu dấu phẩy giữa hai object trong `products.js`         |
| Một thẻ trống hình          | `art` viết sai tên key trong `art.js`                      |
| Nút Mua xám                 | Dòng `link` còn để trống                                   |
| Bấm Mua không mở gì         | Link thiếu `https://`                                      |
| Sửa file mà trang không đổi | Chưa lưu file, hoặc trình duyệt còn cache — nhấn `Ctrl+F5` |

---

## 10. Hai file quan trọng đừng xóa

- `js/capability.js` — không có nó thì trang không biết máy yếu/mạnh, 3D sẽ
  chạy trên cả máy yếu và giật.
- `js/art.js` — không có nó thì không thẻ nào có hình.

Thư mục `.taste-skill/` và `shots/` chỉ là file tạm lúc dựng trang, xóa được.
