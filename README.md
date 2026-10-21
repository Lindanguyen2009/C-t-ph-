# TÒ TE TÍ PHIÊU LƯU KÍ
### Cờ Tỷ Phú Ẩm Thực Việt Nam • Sáng tạo bởi Hi5

Trải nghiệm game du lịch ẩm thực Việt Nam tương tác phong cách cổ tích truyền thống kết hợp đồ họa xanh pastel mơ mộng, xúc xắc 3D Three.js đổ bóng chân thật và nhân vật đồng hành **Bé Tò Te Tí**.

---

## ✨ 10 Món Ăn Đường Phố Đặc Trưng
1. **Cơm Tấm**: Hạt ngọc đất phương Nam, sườn cốt lết nướng than hoa mật ong và mỡ hành óng ả.
2. **Bánh Xèo**: Vàng rụm giòn tan đúc trên chảo gang xèo xèo, quyện nước cốt dừa và mâm rau rừng hơn 20 loại.
3. **Bánh Mì**: Tinh hoa bánh mì kẹp giòn rụm, pate gan béo ngậy, bơ vàng trứng gà và đồ chua thanh vị.
4. **Phá Lấu**: Lòng bò ninh nước dừa xiêm ngọt thanh béo bùi, chấm nước mắm me tắc chua ngọt sánh quyện.
5. **Hủ Tiếu**: Sợi hủ tiếu bột gạo Sa Đéc dai mướt, nước lèo tôm khô mực nướng ngọt thanh đậm đà.
6. **Xôi**: Nếp cái hoa vàng dẻo quánh đồ hai lửa gói trong lá chuối xanh, hành phi mỡ gà giòn thơm.
7. **Bún Thịt Nướng**: Bản hòa tấu tươi mát giữa thịt nướng sả mật ong, chả giò giòn rụm và rau sống tươi non.
8. **Bột Chiên**: Vũ điệu chảo gang đêm Chợ Lớn, bột giòn ngoài mềm trong quyện trứng gà và hắc xì dầu.
9. **Bò Bía**: Cuốn nhỏ xinh tuổi học trò với củ sắn thanh ngọt, lạp xưởng đỏ au chấm tương đen béo ngậy.
10. **Các Món Chè**: Thiên đường ngọt ngào Nam Bộ, nước đường thốt nốt thơm dịu và nước cốt dừa béo bùi.

---

## 🌟 Tính Năng Nổi Bật
- **Bảng Mở Đầu Truyền Thống:** Bảng lụa trắng khắc chữ thư pháp uốn lượn **TÒ TE TÍ PHIÊU LƯU KÍ** (phông Charm) và chữ **Hi5** trang nhã ở góc phải.
- **Xúc Xắc 3D Three.js Nguyên Bản:** Khối sứ trắng ngà đổ bóng chân thật, góc nhìn trực diện 100%, vật lý nhào lộn 3 trục sống động và tiếp đất phẳng phiu.
- **Tự Động Gieo Xúc Xắc Tiếp:** Khi bấm "Quay lại Bàn Cờ", hệ thống tự động đưa bạn về và mở ngay lượt gieo xúc xắc tiếp theo.
- **Bàn Cờ Monopoly 28 Ô Đối Xứng:** 28 ô vuông vắn (8x8) với 1 ô Xuất Phát và 27 ô phân bổ hài hòa 10 món ẩm thực đặc sắc kèm ảnh chụp thực tế sắc nét.
- **Sân Khấu Món Ăn Theme Xanh Pastel Mơ Mộng:**
  - Bầu trời xanh pastel bồng bềnh hòa hợp cùng sắc mây cổ tích.
  - Họa tiết **Rồng bay Thăng Long**, **Phượng múa cát tường** và vòng hào quang **Trống đồng Đông Sơn**.
  - **Bố Cục 3 Màn Hình Lướt Siêu Mượt:**
    - **Ở giữa:** Khung hình món ăn lớn, sắc nét, chỉ có tên món to rõ, trang nhã.
    - **Lướt sang TRÁI:** Gốc tích di sản & mâm nguyên liệu tinh túy.
    - **Lướt sang PHẢI:** Danh sách các quán ăn gia truyền nức tiếng tại **TP. Hồ Chí Minh** và **Hà Nội** kèm nút **Sao chép địa chỉ**.
- **Nhân Vật Hướng Dẫn Bé Tò Te Tí:**
  - Kích thước rõ ràng, không che khuất nội dung.
  - Tự động đổi tư thế linh hoạt (chỉ tay, chào đón, ăn mừng).
  - Lời thoại thay đổi phong phú, ngẫu hứng trước mỗi lượt gieo xúc xắc.

---

## 🚀 Cách Khởi Chạy Dự Án
```bash
node server.js
```
Mở trình duyệt tại: `http://localhost:3000` hoặc `http://127.0.0.1:3000`

---

## 📁 Cấu Trúc Các Tệp Chính
```
C-t-ph--main/
├── index.html        # Cấu trúc HTML chính, bảng mở đầu, bàn cờ và sân khấu ẩm thực
├── style.css         # Toàn bộ CSS, theme xanh pastel, phông thư pháp Charm, bố cục 3 panel
├── app.js            # Logic game, Three.js 3D Dice Engine, âm thanh Web Audio và điều khiển
├── food_data.js      # Dữ liệu 10 món ăn đường phố chuẩn vị và danh sách quán ăn thực tế
├── server.js         # Máy chủ web tĩnh Node.js phục vụ dự án
├── README.md         # Tài liệu giới thiệu và hướng dẫn sử dụng
└── assets/           # Toàn bộ hình ảnh thực tế chất lượng cao của 10 món ăn và nhân vật
```
