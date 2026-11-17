// ============================================================
//  PEACHY POST — SỬA SẢN PHẨM Ở ĐÂY
//
//  Thêm / bớt 1 postcard = thêm / bớt 1 object trong mảng này.
//
//  link : dán link mua của postcard đó vào đây (Shopee, Instagram,
//         Etsy, Google Form... đều được).
//         Để '' nếu chưa có — nút Mua sẽ tự tắt thay vì dẫn tới
//         link chết.
//
//  art  : phải khớp một key trong js/art.js
//         (strawberryCake, readingCat, blueCat, flowerJug,
//          sleepySun, loveFrog)
//
//  price: giá hiển thị. Đây là giá tạm — sửa theo giá thật của mày.
// ============================================================

const PRODUCTS = [
  {
    id: 'thiep-cap-doi-noel',
    nameVi: 'Thiệp Cặp Đôi Giáng Sinh',
    nameEn: 'All I Want For Christmas',
    price: '35.000₫',
    taglineVi: "All I want for Christmas, it's uuu.",
    descVi:
      'Thiệp Giáng sinh cặp đôi cài sừng tuần lộc ấm áp, họa tiết caro đỏ. Kích thước 10 × 15 cm, in trên giấy mỹ thuật cao cấp, mặt sau in logo Tiệm Cá Heooo kèm chỗ trống viết lời chúc.',
    descEn: 'Cute Christmas couple postcard with reindeer antlers. 10x15cm, blank back for heartfelt messages.',
    specs: [
      'Khổ thiệp · 10 × 15 cm',
      'Giấy mỹ thuật dày dặn 300gsm',
      'In 4 màu sắc nét, mặt sau có logo Tiệm Cá Heooo',
      'Kèm bao đựng và chỗ viết lời chúc riêng'
    ],
    link: '',
    art: 'xmasCouple'
  },
  {
    id: 'thiep-cun-xmas',
    nameVi: 'Thiệp Cún Giáng Sinh An Lành',
    nameEn: 'Peaceful Christmas Puppy',
    price: '35.000₫',
    taglineVi: 'Xmas, mong ít mệt.',
    descVi:
      'Chú cún đội mũ Noel nằm trong hộp quà cùng cây thông và vòng nguyệt quế trên nền xanh tuyết rơi. Lời chúc Giáng sinh an lành, bình yên và bớt âu lo.',
    descEn: 'Cozy brown puppy in a Christmas gift box with tree and wreath. 10x15cm.',
    specs: [
      'Khổ thiệp · 10 × 15 cm',
      'Giấy mỹ thuật dày dặn 300gsm',
      'In 4 màu sắc nét, mặt sau có logo Tiệm Cá Heooo',
      'Kèm bao đựng và chỗ viết lời chúc riêng'
    ],
    link: '',
    art: 'xmasDog'
  },
  {
    id: 'thiep-anh-em-cot-cheo',
    nameVi: 'Thiệp Cụng Ly Giáng Sinh',
    nameEn: 'Merry Christmas Cheers',
    price: '35.000₫',
    taglineVi: 'Anh em cột chèo, Giáng Sinh vui nhiều.',
    descVi:
      'Bộ đôi cún và mèo cùng nâng ly rượu vang đỏ mừng mùa Giáng Sinh sum vầy. Món quà ý nghĩa tặng bạn bè, người thân, anh em cột chèo dịp Noel.',
    descEn: 'Dog and cat toasting red wine glasses for Christmas. 10x15cm.',
    specs: [
      'Khổ thiệp · 10 × 15 cm',
      'Giấy mỹ thuật dày dặn 300gsm',
      'In 4 màu sắc nét, mặt sau có logo Tiệm Cá Heooo',
      'Kèm bao đựng và chỗ viết lời chúc riêng'
    ],
    link: '',
    art: 'xmasCheers'
  },
  {
    id: 'banh-dau',
    nameVi: 'Bánh dâu',
    nameEn: 'Strawberry cake',
    price: '35.000₫',
    taglineVi: 'Một lát bánh cho ngày dài.',
    descVi:
      'Một lát bánh kem có quả dâu đỏ trên cùng. Gửi kèm lời chúc mừng sinh nhật, hoặc để trên bàn cho vui.',
    descEn: 'A slice of cream cake with a strawberry on top. Good for birthdays.',
    link: '',
    art: 'strawberryCake'
  },
  {
    id: 'meo-doc-sach',
    nameVi: 'Mèo đọc sách',
    nameEn: 'Reading cat',
    price: '35.000₫',
    taglineVi: 'Ôm sách, không trả lời ai.',
    descVi:
      'Một bạn mèo ôm cuốn sách mở, mắt dán vào trang giấy. Hợp với người hay trốn vào sách, hoặc để nhắc ai đó đọc tiếp.',
    descEn: 'A round cat hugging an open book. For people who hide in books.',
    link: '',
    art: 'readingCat'
  },
  {
    id: 'meo-xanh',
    nameVi: 'Mèo xanh',
    nameEn: 'Blue cat',
    price: '35.000₫',
    taglineVi: 'Kèm một câu nhắn trong bong bóng.',
    descVi:
      'Bạn mèo xanh có bong bóng nói ở trên đầu, chỗ trống để mày viết câu của mình. Gửi khi muốn nói một câu ngắn.',
    descEn: 'A blue cat with an empty speech bubble for your own line.',
    link: '',
    art: 'blueCat'
  },
  {
    id: 'binh-hoa',
    nameVi: 'Bình hoa',
    nameEn: 'Flower jug',
    price: '40.000₫',
    taglineVi: 'Ba cành hoa, một cái bình.',
    descVi:
      'Ba cành hoa dài cắm trong bình gốm, vẽ bằng nét mảnh. Gửi khi không có hoa thật để tặng.',
    descEn: 'Three long stems in a stoneware jug, drawn in thin lines.',
    link: '',
    art: 'flowerJug'
  },
  {
    id: 'mat-troi-ngu',
    nameVi: 'Mặt trời ngủ',
    nameEn: 'Sleepy sun',
    price: '40.000₫',
    taglineVi: 'Mặt trời nhắm mắt, nghỉ một lát.',
    descVi:
      'Mặt trời nhắm mắt ngủ giữa các tia. Hợp với người đang cần nghỉ, hoặc để dán lên tường chỗ làm việc.',
    descEn: 'A sun asleep between its rays. For someone who needs a rest.',
    link: '',
    art: 'sleepySun'
  },
  {
    id: 'ech-om-tim',
    nameVi: 'Ếch ôm tim',
    nameEn: 'Love frog',
    price: '45.000₫',
    taglineVi: 'Ếch xanh, tim đỏ, hai tay.',
    descVi:
      'Bạn ếch xanh hai tay ôm một trái tim đỏ. Tấm này để tỏ tình, hoặc để nhắc ai đó là mày nhớ họ.',
    descEn: 'A green frog holding a red heart in both hands.',
    link: '',
    art: 'loveFrog'
  }
];
