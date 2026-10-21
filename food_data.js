/**
 * CỜ TỶ PHÚ ẨM THỰC VIỆT NAM - FOOD DATABASE (2D EDITION)
 * Tuyển chọn đúng 10 món ẩm thực đường phố đặc trưng:
 * 1. Cơm tấm
 * 2. Bánh xèo
 * 3. Bánh mì
 * 4. Phá lấu
 * 5. Hủ tiếu
 * 6. Xôi
 * 7. Bún thịt nướng
 * 8. Bột chiên
 * 9. Bò bía
 * 10. Các món chè
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FOOD_DATABASE = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const FOOD_DATABASE = {
    // ------------------------------------------------------------------------
    // 1. CƠM TẤM SÀI GÒN
    // ------------------------------------------------------------------------
    com_tam: {
      foodId: "com_tam",
      name: "Cơm Tấm",
      fullName: "Cơm Tấm Sài Gòn",
      region: "Sài Gòn • Miền Nam",
      img: "assets/dish_com_tam.jpg",
      badge: "Hạt Ngọc Đất Phương Nam",
      category: "Món Cơm No Buổi Sáng & Đêm",
      quote: "Hạt tấm đầu rồng dẻo thơm quyện cùng sườn nướng than hoa ngào ngạt khói hè phố.",
      desc: "Nguồn gốc: Xưa kia, gạo tấm là những hạt gạo vỡ trong quá trình giã lúa, thường dành cho tầng lớp lao động nghèo vì hình thức không đẹp mắt nhưng giàu dinh dưỡng. Đầu thế kỉ XX, người lao động từ nông thôn lên Sài Gòn mang theo thói quen ăn cơm tấm của quê hương. Món ăn dần được biến tấu với nhiều món ăn kèm để thêm hấp dẫn. Dưới ảnh hưởng của ẩm thực Pháp với thịt nướng và cách ăn bằng nĩa, cơm tấm sườn dần trở thành biểu tượng của ẩm thực Sài Gòn. Ảnh hưởng: Cơm tấm trở thành món ăn tiêu biểu của Sài Gòn và Nam Bộ nhờ sự tiện lợi, no lâu và hương vị đậm đà. Văn hóa ẩm thực đường phố, đặc biệt là những hàng sườn nướng ven đường, đã góp phần gìn giữ và phát triển món ăn đến ngày nay.",
      story: "Cơm tấm ngon nhất là khi hạt gạo được đồ chín bằng hơi nước trong xửng lá dứa hai lần để vừa ráo vừa mềm dẻo. Miếng sườn cốt lết dày dặn ướp đẫm mật ong, sả băm, sữa đặc và nước màu dừa Bến Tre, nướng trên bếp than hoa cháy cạnh óng ả.",
      ingredients: [
        "Gạo tấm đầu rồng dẻo thơm, đồ ráo hạt",
        "Sườn cốt lết tẩm mật ong & sả nướng than hoa",
        "Chả trứng hấp thịt băm, nấm mèo vàng ươm",
        "Bì heo thái chỉ trộn thính gạo rang thơm lừng",
        "Mỡ hành xanh mướt óng ả, tóp mỡ giòn rụm",
        "Đồ chua củ cải cà rốt giòn ngọt giải ngấy",
        "Nước mắm kẹo ớt tỏi băm nhuyễn bí truyền"
      ],
      restaurants: [
        { city: "saigon", name: "Cơm Tấm Hồng Calmette", address: "134 Hoàng Diệu, Phường Khánh Hội, Hồ Chí Minh", hours: "06:00 - 21:00", price: "25.000đ - 60.000đ", badge: "Quán Cơm Tấm Hồng Calmette", link: "https://maps.app.goo.gl/buv4smEda8mshHBM9" },
        { city: "saigon", name: "Cơm Tấm Ba Ghiền", address: "84 Đặng Văn Ngữ, Phường Phú Nhuận", hours: "06:00 - 21:00", price: "25.000đ - 60.000đ", badge: "Cơm Tấm Ba Ghiền", link: "https://maps.app.goo.gl/fmCJUsfc7iMktUy5A" },
        { city: "saigon", name: "Cơm tấm Bãi Rác", address: "73 Lê Văn Linh, Xóm Chiếu, Hồ Chí Minh", hours: "06:00 - 21:00", price: "25.000đ - 60.000đ", badge: "Cơm Tấm Bãi Rác", link: "https://maps.app.goo.gl/ztac3DZCCEcaKk9Q6" },
        { city: "saigon", name: "Cơm tấm Đỗ Phủ Đại Hàn", address: "113A Đặng Dung, Tân Định, Hồ Chí Minh", hours: "06:00 - 21:00", price: "25.000đ - 60.000đ", badge: "Cà phê Đỗ-Phủ, cơm tấm Đại-Hàn", link: "https://maps.app.goo.gl/Ee61h2UbaDLWnqBTA" },
        { city: "saigon", name: "Cơm tấm Nguyễn Văn Cừ", address: "74 Nguyễn Văn Cừ, Cầu Ông Lãnh, Hồ Chí Minh", hours: "06:00 - 21:00", price: "25.000đ - 60.000đ", badge: "Cơm tấm Nguyễn Văn Cừ", link: "https://maps.app.goo.gl/wLAnogx7YVnPJc7N7" }
      ],
      funFact: "Miếng sườn cơm tấm chuẩn vị Sài Gòn luôn được nướng trên vỉ than củi đỏ rực và quét một lớp mỡ hành bóng lộn ngay khi vừa nhấc ra khỏi lửa!"
    },

    // ------------------------------------------------------------------------
    // 2. BÁNH XÈO MIỀN TÂY
    // ------------------------------------------------------------------------
    banh_xeo: {
      foodId: "banh_xeo",
      name: "Bánh Xèo",
      fullName: "Bánh Xèo Miền Tây",
      region: "Miền Tây & Nam Bộ",
      img: "assets/dish_banh_xeo.jpg",
      badge: "Vàng Rụm Miền Sông Nước",
      category: "Món Bánh Dân Gian",
      quote: "Âm thanh xèo xèo trên chảo gang đỏ lửa và mâm rau rừng ngút ngàn tươi mát.",
      desc: "Nguồn gốc: Bánh xèo là món ăn dân dã của Việt Nam, được cho là có nguồn gốc từ miền Trung rồi phổ biến rộng rãi ở miền Nam. Tên gọi 'bánh xèo' bắt nguồn từ âm thanh 'xèo xèo' khi đổ bột vào chảo nóng. Khi đến Nam Bộ, bánh được biến tấu thành phiên bản lớn hơn, vỏ mỏng giòn, thường có nước cốt dừa và nhân tôm thịt phong phú. Ngày nay, bánh xèo có nhiều phiên bản đặc trưng ở từng vùng miền. Ảnh hưởng: Bánh xèo gắn với những bữa ăn gia đình và nét ẩm thực dân dã của người Việt. Tại TP.HCM, món ăn góp phần làm phong phú văn hóa ẩm thực đường phố, kết hợp hương vị vùng miền và thu hút du khách. Fun fact – Điều thú vị: Bánh xèo miền Trung thường nhỏ bằng lòng bàn tay, được đổ trong khuôn nhỏ và ăn kèm rau sống. Trong khi đó, bánh xèo miền Tây có thể to gần bằng cả chiếc đĩa, thường thêm nước cốt dừa vào bột để tạo vị béo đặc trưng.",
      story: "Người miền Tây thích đúc bánh xèo thật to, vành bánh mỏng như lá lúa và giòn tan. Bột bánh được xay từ gạo thơm ngâm qua đêm, pha thêm nước cốt dừa xiêm tạo vị béo ngậy, chút bột nghệ cho màu vàng óng và hành lá xắt nhuyễn.",
      ingredients: [
        "Bột gạo xay tươi ngâm nước cốt dừa xiêm béo ngậy",
        "Bột nghệ nguyên chất tạo sắc vàng óng ả",
        "Tôm sông tươi rói ngọt thịt, vỏ giòn",
        "Thịt ba rọi thái mỏng xào chín tới",
        "Giá đỗ mập mạp, đậu xanh đồ chín bùi bùi",
        "Hơn 20 loại rau rừng: đọt xoài, lá cóc, lá cách, cải bẹ",
        "Nước mắm chua ngọt pha tỏi ớt băm nhuyễn sóng sánh"
      ],
      restaurants: [
        { city: "saigon", name: "Bánh Xèo 46A", address: "46A Đinh Công Tráng, phường Tân Định, Hồ Chí Minh", hours: "10:00 - 21:00", price: "25.000đ - 180.000đ", badge: "Quán Bánh Xèo 46A", link: "https://maps.app.goo.gl/?q=Banh+Xeo+46A+46+Dinh+Cong+Trang+Ho+Chi+Minh" },
        { city: "saigon", name: "Bánh Xèo Ngọc Sơn", address: "103 Ngô Quyền, khu vực Chợ Lớn, Hồ Chí Minh", hours: "10:00 - 21:00", price: "25.000đ - 180.000đ", badge: "Quán Bánh Xèo Ngọc Sơn", link: "https://maps.app.goo.gl/?q=Banh+Xeo+Ngoc+Son+103+Ngo+Quyen+Ho+Chi+Minh" },
        { city: "saigon", name: "Bánh Xèo Bà Hai", address: "119 Lê Văn Linh, khu vực Xóm Chiếu, Quận 4, Hồ Chí Minh", hours: "10:00 - 21:00", price: "25.000đ - 180.000đ", badge: "Quán Bánh Xèo Bà Hai", link: "https://maps.app.goo.gl/?q=Banh+Xeo+Ba+Hai+119+Le+Van+Linh+Ho+Chi+Minh" },
        { city: "saigon", name: "XÈO Restaurant", address: "44 Đặng Thị Nhu, phường Bến Thành, Hồ Chí Minh", hours: "10:00 - 21:00", price: "25.000đ - 180.000đ", badge: "XÈO Restaurant", link: "https://maps.app.goo.gl/?q=XEO+Restaurant+44+Dang+Thi+Nhu+Ho+Chi+Minh" },
        { city: "saigon", name: "Bánh Xèo Rau Rừng Phố Thành", address: "97 Đường số 41, Quận 4, Hồ Chí Minh", hours: "10:00 - 21:00", price: "25.000đ - 180.000đ", badge: "Quán Bánh Xèo Rau Rừng Phố Thành", link: "https://maps.app.goo.gl/?q=Banh+Xeo+Rau+Rung+Pho+Thanh+97+Duong+So+41+Quan+4" }
      ],
      funFact: "Giá bánh xèo tại các quán ở TP.HCM: khoảng 25.000–180.000đ/món, tùy quán và loại nhân."
    },

    // ------------------------------------------------------------------------
    // 3. BÁNH MÌ SÀI GÒN
    // ------------------------------------------------------------------------
    banh_mi: {
      foodId: "banh_mi",
      name: "Bánh Mì",
      fullName: "Bánh Mì Sài Gòn",
      region: "Toàn Quốc • Tinh Hoa Sài Gòn",
      img: "assets/dish_banh_mi.jpg",
      badge: "Vua Ẩm Thực Đường Phố",
      category: "Tinh Hoa Ẩm Thực Đường Phố",
      quote: "Vỏ ngoài giòn tan rụm, ruột mềm thơm xốp ôm trọn pate béo ngậy và thịt chả đậm đà.",
      desc: "Nguồn gốc: Bánh mì Việt Nam có nguồn gốc từ bánh baguette của Pháp, du nhập vào Việt Nam từ thế kỉ XIX. Người Việt dần biến tấu ổ bánh nhỏ gọn hơn, vỏ giòn, ruột xốp và kết hợp với các loại nhân quen thuộc như thịt, chả, pate, rau thơm và đồ chua. Đến khoảng thập niên 1950–1960, bánh mì kẹp dần phổ biến tại Sài Gòn, trở thành món ăn tiện lợi và gần gũi với đời sống người dân. Ảnh hưởng: Bánh mì trở thành món ăn đường phố tiêu biểu của Sài Gòn nhờ giá cả phải chăng, tiện lợi và phù hợp với nhịp sống đô thị. Từ món bánh mang ảnh hưởng Pháp, người Việt đã sáng tạo nên hương vị riêng, góp phần quảng bá ẩm thực Việt Nam đến bạn bè quốc tế.",
      story: "Bánh mì Việt Nam luôn giữ được độ giòn rụm nhờ lò than nhỏ đặt ngay dưới tủ kính xe đẩy. Lớp bơ trứng béo ngậy cùng pate mịn màng chính là linh hồn gắn kết tất cả nguyên liệu bên trong ổ bánh.",
      ingredients: [
        "Bột mì nướng vỏ giòn rụm rộp, ruột mềm bông",
        "Pate gan heo truyền thống béo ngậy thơm nồng",
        "Bơ trứng gà tươi đánh thủ công vàng óng ngậy vị",
        "Chả lụa lá chuối, giò thủ, thịt xá xíu đỏ au",
        "Đồ chua củ cải cà rốt ngâm giấm đường chua dịu",
        "Dưa leo thái mỏng, ớt hiểm, ngò rí tươi non",
        "Nước sốt tương đen đậm đà sóng sánh"
      ],
      restaurants: [
        { city: "saigon", name: "Bánh Mì Huỳnh Hoa", address: "26 Lê Thị Riêng, P. Bến Thành, Quận 1", hours: "06:00 - 22:00", price: "15.000đ - 40.000đ", badge: "Bánh Mì Huynh Hoa - Lê Thị Riêng", link: "https://maps.app.goo.gl/TkpGrAQ6RKTGCCc39" },
        { city: "saigon", name: "Bánh Mì Chim Chạy", address: "147D Nguyễn Thị Minh Khai, Bến Thành, Quận 1", hours: "06:00 - 22:00", price: "15.000đ - 40.000đ", badge: "Bánh Mì Chim Chạy Minh Khai - Phường Phạm Ngũ Lão", link: "https://maps.app.goo.gl/DZcnygdWsfFYSXBMA" },
        { city: "saigon", name: "Bánh mì Hoàng Lam", address: "Số 168 Nguyễn Thượng Hiền, phường 5, Đức Nhuận", hours: "06:00 - 22:00", price: "15.000đ - 40.000đ", badge: "168 Đ. Nguyễn Thượng Hiền", link: "https://maps.app.goo.gl/1jBzNaX3QUb6mRLL6" },
        { city: "saigon", name: "Bánh mì Bà Huynh", address: "197A Nguyễn Trãi, P, Cầu Ông Lãnh, Hồ Chí Minh", hours: "06:00 - 22:00", price: "15.000đ - 40.000đ", badge: "Bánh Mì Bà Huynh (Madam Win)", link: "https://maps.app.goo.gl/RLh1kSzQDSBV2T987" },
        { city: "saigon", name: "Bánh mì Bảy Hổ", address: "25 Huỳnh Khương Ninh, Quận 1, Hồ Chí Minh", hours: "06:00 - 22:00", price: "15.000đ - 40.000đ", badge: "Bánh Mì Bảy Hổ", link: "https://maps.app.goo.gl/gifEsGSJzat6nZny6" }
      ],
      funFact: "Từ 'Banh mi' đã chính thức được đưa vào từ điển Oxford từ năm 2011 để tôn vinh sự độc nhất vô nhị của món ăn đường phố này!"
    },

    // ------------------------------------------------------------------------
    // 4. PHÁ LẤU SÀI GÒN
    // ------------------------------------------------------------------------
    pha_lau: {
      foodId: "pha_lau",
      name: "Phá Lấu",
      fullName: "Phá Lấu Lòng Bò Sài Gòn",
      region: "Sài Gòn • Chợ Lớn",
      img: "assets/dish_pha_lau.jpg",
      badge: "Hồn Cốt Phố Chiều Sài Gòn",
      category: "Món Ăn Vặt Đường Phố Đậm Đà",
      quote: "Nồi lòng bò sôi sùng sục ngập tràn nước cốt dừa và chén nước mắm me tắc chua ngọt.",
      desc: "Nguồn gốc: Phá lấu được cho là chịu ảnh hưởng từ văn hóa ẩm thực người Hoa, sau đó phổ biến ở miền Nam Việt Nam, đặc biệt là TP.HCM. Tên gọi: 'Phá lấu' có nguồn gốc từ tiếng Triều Châu, gắn với cách tẩm ướp và hầm thịt, nội tạng cùng gia vị. Ảnh hưởng: Phá lấu là món ăn đường phố quen thuộc tại TP.HCM, phổ biến ở các hàng quán gần trường học và khu chợ, góp phần tạo nên nét riêng của ẩm thực Sài Gòn. Fun fact – Điều thú vị: Phá lấu Sài Gòn thường được ăn với bánh mì hoặc mì gói, chấm cùng nước me chua ngọt, tạo nên sự kết hợp giữa vị béo, mặn và chua.",
      story: "Phá lấu có nguồn gốc từ người Tiều ở vùng Chợ Lớn. Bí quyết nằm ở khâu làm sạch nội tạng với rượu gừng và hoa hồi, sau đó ninh nhừ trong nước dừa tươi ngọt lịm hàng giờ liền.",
      ingredients: [
        "Nội tạng bò tươi sơ chế rượu gừng kỹ càng (tổ ong, lá mía, phèo)",
        "Nước dừa xiêm ngọt thanh hầm rục lòng bò",
        "Nước cốt dừa đậm đặc nấu béo ngậy thơm lừng",
        "Ngũ vị hương, hoa hồi, quế chi, bột cà ri bí truyền",
        "Nước mắm me kẹo sền sệt chua ngọt cay nồng",
        "Bánh mì nóng hổi giòn rụm kẹp xé ăn kèm"
      ],
      restaurants: [
        { city: "saigon", name: "Phá Lấu Bò Dì Nủi", address: "Khu vực đường Nguyễn Công Trứ, Quận 1", hours: "13:00 - 22:00", price: "15.000đ - 85.000đ", badge: "Quán Phá Lấu Bò Dì Nủi", link: "https://www.google.com/maps/search/?api=1&query=Pha+Lau+Bo+Di+Nui+Ho+Chi+Minh" },
        { city: "saigon", name: "Phá Lấu Bò Cây Trâm", address: "Khu vực đường Cây Trâm, Gò Vấp", hours: "13:00 - 22:00", price: "15.000đ - 85.000đ", badge: "Quán Phá Lấu Bò Cây Trâm", link: "https://www.google.com/maps/search/?api=1&query=Pha+Lau+Bo+Cay+Tram+Go+Vap" },
        { city: "saigon", name: "Phá Lấu Bò Bà Hạt", address: "Khu vực đường Bà Hạt, Quận 10", hours: "13:00 - 22:00", price: "15.000đ - 85.000đ", badge: "Quán Phá Lấu Bò Bà Hạt", link: "https://www.google.com/maps/search/?api=1&query=Pha+Lau+Bo+Ba+Hat+Quan+10" },
        { city: "saigon", name: "Phá Lấu Bò Nguyễn Trãi", address: "Khu vực đường Nguyễn Trãi, Quận 5", hours: "13:00 - 22:00", price: "15.000đ - 85.000đ", badge: "Quán Phá Lấu Bò Nguyễn Trãi", link: "https://www.google.com/maps/search/?api=1&query=Pha+Lau+Bo+Nguyen+Trai+Quan+5" },
        { city: "saigon", name: "Phá Lấu Bò Tâm Ký", address: "Khu vực TP.HCM", hours: "13:00 - 22:00", price: "15.000đ - 85.000đ", badge: "Quán Phá Lấu Bò Tâm Ký", link: "https://www.google.com/maps/search/?api=1&query=Pha+Lau+Bo+Tam+Ky+Ho+Chi+Minh" }
      ],
      funFact: "Khu hẻm 243 Tôn Đản ở Quận 4 được mệnh danh là 'thủ phủ phá lấu' của Sài Gòn, lúc nào cũng nghi ngút khói thơm ngào ngạt đón hàng trăm lượt khách mỗi chiều."
    },

    // ------------------------------------------------------------------------
    // 5. HỦ TIẾU MIỀN TÂY & NAM VANG
    // ------------------------------------------------------------------------
    hu_tieu: {
      foodId: "hu_tieu",
      name: "Hủ Tiếu",
      fullName: "Hủ Tiếu Nam Vang & Sa Đéc",
      region: "Nam Bộ • Tiền Giang & Sài Gòn",
      img: "assets/dish_hu_tieu.jpg",
      badge: "Âm Vang Đêm Phố Cổ",
      category: "Món Nước Đậm Đà Tinh Túy",
      quote: "Sợi hủ tiếu dai dẻo ngâm trong nước lèo tôm khô mực nướng ngọt thanh thấu tận đáy lòng.",
      desc: "Nguồn gốc: Hủ tiếu có nguồn gốc từ ẩm thực Trung Hoa, được du nhập vào miền Nam Việt Nam qua quá trình giao lưu và di cư của cộng đồng người Hoa. Khi đến Việt Nam, món ăn dần được biến tấu để phù hợp với khẩu vị địa phương, kết hợp cùng nguyên liệu và gia vị đặc trưng của Nam Bộ. Hủ tiếu phát triển mạnh tại Sài Gòn, trở thành món ăn quen thuộc trong đời sống người dân, với nhiều biến thể như hủ tiếu Nam Vang, hủ tiếu Mỹ Tho và hủ tiếu gõ. Ảnh hưởng: Hủ tiếu là một trong những món ăn tiêu biểu của Sài Gòn, thể hiện sự giao thoa giữa văn hóa ẩm thực Hoa và Việt. Với hương vị đa dạng, giá cả phù hợp và cách phục vụ nhanh chóng, hủ tiếu đã trở thành món ăn quen thuộc từ các quán bình dân đến những hàng ăn lâu đời.",
      story: "Làng nghề bột trăm tuổi Sa Đéc tạo nên sợi bánh hủ tiếu độc nhất vô nhị: dai mềm tự nhiên từ hạt gạo phù sa sông Tiền, không hề bị bở nát dù chan nước lèo nóng hổi.",
      ingredients: [
        "Sợi hủ tiếu dai làng nghề Sa Đéc / Mỹ Tho trứ danh",
        "Nước dùng hầm xương ống, mực khô nướng, tôm khô",
        "Tôm sú tươi đỏ au ngọt lịm, gan heo luộc béo bùi",
        "Thịt nạc băm xào thơm, trứng cút luộc bóc vỏ",
        "Cần tây, hẹ hoa, giá đỗ non giòn ngọt giải nhiệt",
        "Tóp mỡ vàng ruộm phi thơm hành tỏi óng ả",
        "Nước sốt tương đen bí truyền cho hủ tiếu khô"
      ],
      restaurants: [
        { city: "saigon", name: "Hủ tiếu Đạt Thành", address: "510 Lê Quang Định, Hạnh Thông, Hồ Chí Minh", hours: "06:00 - 23:00", price: "30.000đ - 60.000đ", badge: "Hủ Tiếu Nam Vang Thành Đạt", link: "https://maps.app.goo.gl/aePNWx7EXsoQuKK77" },
        { city: "saigon", name: "Hủ tiếu Trung Còi", address: "80 Cao Thắng, Bàn Cờ, Hồ Chí Minh", hours: "06:00 - 23:00", price: "30.000đ - 60.000đ", badge: "Hủ tiếu Nam Vang Trung Còi", link: "https://maps.app.goo.gl/nSCLqmpxou7LpQS58" },
        { city: "saigon", name: "Hủ tiếu Hồng Thịnh", address: "39B Nguyễn Văn Đậu, Bình Lợi Trung, Hồ Chí Minh", hours: "06:00 - 23:00", price: "30.000đ - 60.000đ", badge: "Hủ Tíu Nam Vang Hồng Thịnh", link: "https://maps.app.goo.gl/EJMib2BtWg4V7Bqb8" },
        { city: "saigon", name: "Hủ tiếu Nhất Quán", address: "123 Đ.Nguyễn Văn Nghi, Hạnh Thông, Hồ Chí Minh", hours: "06:00 - 23:00", price: "30.000đ - 60.000đ", badge: "Quán Hủ Tiếu Nhất Quán", link: "" }
      ],
      funFact: "Ăn hủ tiếu khô chuẩn vị là phải trộn đều với sốt tương đen đặc sánh rồi vừa xì xụp sợi mì vừa húp từng thìa nước lèo béo thơm bốc khói ngút ngàn!"
    },

    // ------------------------------------------------------------------------
    // 6. XÔI VIỆT NAM
    // ------------------------------------------------------------------------
    xoi: {
      foodId: "xoi",
      name: "Xôi",
      fullName: "Xôi Mặn & Xôi Xéo Truyền Thống",
      region: "Bắc Bộ & Toàn Quốc",
      img: "assets/dish_xoi.jpg",
      badge: "Hạt Ngọc Gói Lá Chuối",
      category: "Món Nếp Truyền Thống Đậm Tình",
      quote: "Từng hạt nếp bóng bẩy dẻo quánh gói trong lá chuối xanh thơm ngát tình quê.",
      desc: "Nguồn gốc: Xôi là món ăn truyền thống gắn liền với nền văn minh lúa nước của Việt Nam và phổ biến ở nhiều vùng miền. Tên gọi: 'Xôi' là món ăn được chế biến chủ yếu từ gạo nếp, làm chín bằng phương pháp đồ hoặc hấp bằng hơi nước. Xôi xuất hiện trong đời sống hằng ngày cũng như các dịp lễ, Tết và nghi lễ truyền thống. Ảnh hưởng: Xôi là món ăn quen thuộc trong đời sống người Việt, đặc biệt phổ biến vào bữa sáng nhờ sự tiện lợi và chắc bụng. Bên cạnh đó, xôi còn xuất hiện trong các dịp cưới hỏi, lễ Tết, cúng giỗ, thể hiện nét đẹp văn hóa ẩm thực truyền thống. Fun fact – Điều thú vị: Xôi gấc có màu đỏ tự nhiên, tượng trưng cho may mắn và thường xuất hiện trong đám cưới, lễ Tết của người Việt.",
      story: "Gói xôi nóng hổi bọc trong lớp lá chuối tươi là hình ảnh quen thuộc trên khắp nẻo đường đất nước, nuôi dưỡng tuổi thơ của biết bao thế hệ người Việt.",
      ingredients: [
        "Gạo nếp cái hoa vàng đồ chín dẻo quánh hai lửa",
        "Đậu xanh đãi vỏ tán nhuyễn mịn màng như tơ",
        "Hành ta phi mỡ gà vàng ươm giòn tan thơm lừng",
        "Thịt ba chỉ kho tàu đậm đà gia vị bí truyền",
        "Pate gan heo béo ngậy, lạp xưởng nướng thơm",
        "Ruốc heo tơi xốp mặn ngọt vừa miệng",
        "Lá chuối tươi ôm trọn gói xôi giữ ấm trọn ngày"
      ],
      restaurants: [
        { city: "saigon", name: "Xôi Gà Number One", address: "15 Nguyễn Trung Trực, phường Bến Thành, Hồ Chí Minh", hours: "06:00 - 22:00", price: "15.000đ - 65.000đ", badge: "Quán Xôi Gà Number One", link: "https://www.google.com/maps/search/?api=1&query=Xoi+Ga+Number+One+15+Nguyen+Trung+Truc+Ho+Chi+Minh" },
        { city: "saigon", name: "Xôi Chè Bùi Thị Xuân", address: "111 Bùi Thị Xuân, phường Bến Thành, Hồ Chí Minh", hours: "06:00 - 22:00", price: "15.000đ - 65.000đ", badge: "Quán Xôi Chè Bùi Thị Xuân", link: "https://www.google.com/maps/search/?api=1&query=Xoi+Che+Bui+Thi+Xuan+111+Bui+Thi+Xuan+Ho+Chi+Minh" },
        { city: "saigon", name: "Saigon Xôi Bắp Lady", address: "24 Nguyễn Hữu Cầu, phường Tân Định, Hồ Chí Minh", hours: "06:00 - 22:00", price: "15.000đ - 65.000đ", badge: "Quán", link: "https://www.google.com/maps/search/?api=1&query=Saigon+Xoi+Bap+Lady+24+Nguyen+Huu+Cau+Ho+Chi+Minh" },
        { city: "saigon", name: "Xôi Mít Sì Gòn", address: "187 Cô Giang, phường Cầu Ông Lãnh, Hồ Chí Minh", hours: "06:00 - 22:00", price: "15.000đ - 65.000đ", badge: "Quán Xôi Mít Sì Gòn", link: "https://www.google.com/maps/search/?api=1&query=Xoi+Mit+Si+Gon+187+Co+Giang+Ho+Chi+Minh" },
        { city: "saigon", name: "Xôi Bình Tiên", address: "88 Minh Phụng, phường Bình Tây, Hồ Chí Minh", hours: "06:00 - 22:00", price: "15.000đ - 65.000đ", badge: "Quán Xôi Bình Tiên", link: "https://www.google.com/maps/search/?api=1&query=Xoi+Binh+Tien+88+Minh+Phung+Ho+Chi+Minh" }
      ],
      funFact: "Người Hà Nội ăn xôi xéo nhất định phải có thìa mỡ gà rưới lên từng lát đậu xanh được gọt xéo điệu nghệ từ quả cầu đậu tròn vo!"
    },

    // ------------------------------------------------------------------------
    // 7. BÚN THỊT NƯỚNG
    // ------------------------------------------------------------------------
    bun_thit_nuong: {
      foodId: "bun_thit_nuong",
      name: "Bún Thịt Nướng",
      fullName: "Bún Thịt Nướng Chả Giò",
      region: "Nam Bộ & Miền Trung",
      img: "assets/dish_bun_thit_nuong.jpg",
      badge: "Bản Hòa Tấu Tươi Mát",
      category: "Món Bún Tươi Đầy Đặn",
      quote: "Thịt nướng xèo xèo mật ong trên than hoa ăn cùng bún tươi trắng mướt và chả giò giòn rụm.",
      desc: "Nguồn gốc: Bún thịt nướng là món ăn quen thuộc của Việt Nam, đặc biệt phổ biến ở miền Nam. Món ăn hình thành từ sự kết hợp giữa bún tươi, thịt nướng và các loại rau sống. Theo thời gian, bún thịt nướng được biến tấu theo khẩu vị từng vùng, tạo nên những nét riêng về cách ướp thịt, pha nước mắm và lựa chọn đồ ăn kèm. Tại Sài Gòn, bún thịt nướng dần trở thành món ăn đường phố phổ biến nhờ hương vị đậm đà và cách thưởng thức tiện lợi. Ảnh hưởng: Bún thịt nướng là món ăn quen thuộc trong văn hóa ẩm thực đường phố Sài Gòn, được yêu thích nhờ sự kết hợp hài hòa giữa vị thơm của thịt nướng, độ mềm của bún và vị tươi mát của rau. Món ăn góp phần thể hiện nét ẩm thực bình dị, đa dạng và gần gũi của thành phố.",
      story: "Một tô bún hội tụ đủ ngũ sắc ngũ vị của triết lý ẩm thực Việt: trắng của bún tươi, vàng óng của thịt nướng than, xanh tươi của rau sống dưa leo, đỏ tươi của ớt và vàng ruộm của đậu phộng.",
      ingredients: [
        "Thịt nạc dăm ướp sả, tỏi, mật ong nướng than hoa",
        "Sợi bún tươi mềm mướt không chua, làm trong ngày",
        "Chả giò tôm thịt chiên vàng giòn rụm vỏ rế",
        "Đậu phộng rang vàng giòn giã dập thơm bùi",
        "Mỡ hành xanh mướt rưới xèo xèo nóng hổi",
        "Rau sống tươi non, dưa leo băm, đồ chua giòn ngọt",
        "Nước mắm chua ngọt pha ớt tỏi băm nhuyễn đậm đà"
      ],
      restaurants: [
        { city: "saigon", name: "Quán bún thịt nướng Anh Ba", address: "Chung Cư Miếu Nổi, Hẻm 126 Phan Xích Long, Gia Định, Hồ Chí Minh", hours: "07:00 - 21:00", price: "30.000đ - 60.000đ", badge: "BÚN THỊT NƯỚNG ANH BA", link: "https://maps.app.goo.gl/mGozuoL7WAS53Xiy6" },
        { city: "saigon", name: "Quán bún thịt nướng Hải Đăng", address: "149 Chấn Hưng, Tân Hòa, Hồ Chí Minh", hours: "07:00 - 21:00", price: "30.000đ - 60.000đ", badge: "BÚN THỊT NƯỚNG HẢI ĐĂNG- CHẤN HƯNG", link: "https://maps.app.goo.gl/B8nXL61P38xWBR3x7" },
        { city: "saigon", name: "Quán bún thịt nướng Út Thu", address: "629/87 Đường Nguyễn Đình Chiểu, Bàn Cờ, Hồ Chí Minh, Việt Nam", hours: "07:00 - 21:00", price: "30.000đ - 60.000đ", badge: "Bún Thịt Xào - Bún Thịt Nướng Út Thu", link: "https://maps.app.goo.gl/EqJrYbYNJpm3AtXN9" },
        { city: "saigon", name: "Quán bún thịt nướng 339", address: "Hẻm 339/7-9 Tô Hiến Thành, Hòa Hưng, Hồ Chí Minh", hours: "07:00 - 21:00", price: "30.000đ - 60.000đ", badge: "Bún Thịt Nướng Quán 339", link: "https://maps.app.goo.gl/8vrqyu9pXwWGAZh5A" },
        { city: "saigon", name: "Quán bún thịt nướng Vị Sài Gòn", address: "66/8 Phạm Ngọc Thạch, Xuân Hòa, Hồ Chí Minh", hours: "07:00 - 21:00", price: "30.000đ - 60.000đ", badge: "Vi Saigon Restaurant", link: "https://maps.app.goo.gl/V7RyXgBSgHRAFL2Z8" }
      ],
      funFact: "Chả giò ăn kèm bún thịt nướng ngon nhất là cuốn bằng bánh tráng rế mỏng, khi chiên ngập dầu sẽ phồng xốp giòn rụm không bị dai!"
    },

    // ------------------------------------------------------------------------
    // 8. BỘT CHIÊN SÀI GÒN
    // ------------------------------------------------------------------------
    bot_chien: {
      foodId: "bot_chien",
      name: "Bột Chiên",
      fullName: "Bột Chiên Trứng Chợ Lớn",
      region: "Sài Gòn • Ẩm Thực Chợ Lớn",
      img: "assets/dish_bot_chien.jpg",
      badge: "Vũ Điệu Chảo Gang Đêm",
      category: "Món Ăn Chơi Phố Đêm",
      quote: "Bột gạo dẻo mềm giòn rụm trên chảo gang đập trứng vàng óng và chan đẫm nước tương đen.",
      desc: "Nguồn gốc: Bột chiên có nguồn gốc từ ẩm thực người Hoa, sau đó phổ biến tại Sài Gòn và được biến tấu theo khẩu vị người Việt. Tên gọi: 'Bột chiên' bắt nguồn từ cách chế biến: bột gạo được hấp chín, cắt miếng rồi chiên vàng trên chảo. Ảnh hưởng: Bột chiên là món ăn vặt bình dân quen thuộc tại TP.HCM, thường được bán ở các xe hàng rong và quán nhỏ gần trường học, khu chợ. Món ăn thể hiện sự giao thoa văn hóa Hoa – Việt và góp phần tạo nên nét đặc trưng của ẩm thực đường phố Sài Gòn.",
      story: "Bột chiên là món ăn biểu tượng của đêm Sài Gòn. Người đầu bếp cầm hai chiếc xẻng sắt đảo bột liên thoăn thoắt trên mặt chảo gang phẳng lì rực lửa, tiếng lách cách rộn rã một góc phố.",
      ingredients: [
        "Bột gạo hấp chín cắt khối vuông vức vừa ăn",
        "Bột năng tạo độ dẻo mềm lòng bột",
        "Trứng gà tươi đập đều trên chảo xèo xèo",
        "Hành lá xắt nhuyễn phi thơm nức mũi",
        "Đu đủ non bào sợi mỏng ngâm giòn mát rượi",
        "Hắc xì dầu pha giấm đường ớt tươi cay nồng"
      ],
      restaurants: [
        { city: "saigon", name: "Bột Chiên Đức Hoa", address: "Lô X, Chung cư Ngô Gia Tự, TP. Hồ Chí Minh", hours: "15:00 - 22:00", price: "15.000đ - 40.000đ", badge: "Quán Bột Chiên Đức Hoa", link: "https://www.google.com/maps/search/?api=1&query=Bot+Chien+Duc+Hoa+Chung+Cu+Ngo+Gia+Tu+Ho+Chi+Minh" },
        { city: "saigon", name: "Bột Chiên Phùng Hưng", address: "Đối diện số 200B Phùng Hưng, TP. Hồ Chí Minh", hours: "15:00 - 22:00", price: "15.000đ - 40.000đ", badge: "Quán Bột Chiên Phùng Hưng", link: "https://www.google.com/maps/search/?api=1&query=Bot+Chien+Phung+Hung+200B+Phung+Hung+Ho+Chi+Minh" },
        { city: "saigon", name: "Bột Chiên Phùng Khắc Khoan", address: "63 Phùng Khắc Khoan, TP. Hồ Chí Minh", hours: "15:00 - 22:00", price: "15.000đ - 40.000đ", badge: "Quán Bột Chiên Phùng Khắc Khoan", link: "https://www.google.com/maps/search/?api=1&query=Bot+Chien+63+Phung+Khac+Khoan+Ho+Chi+Minh" },
        { city: "saigon", name: "Bột Chiên 51", address: "51 Nguyễn Văn Lạc, phường Thạnh Mỹ Tây, Hồ Chí Minh", hours: "15:00 - 22:00", price: "15.000đ - 40.000đ", badge: "Quán Bột Chiên 51", link: "https://www.google.com/maps/search/?api=1&query=Bot+Chien+51+51+Nguyen+Van+Lac+Ho+Chi+Minh" },
        { city: "saigon", name: "Bột Chiên Nguyễn Kim", address: "187 Nguyễn Kim, phường Diên Hồng, Hồ Chí Minh", hours: "15:00 - 22:00", price: "15.000đ - 40.000đ", badge: "Quán Bột Chiên Nguyễn Kim", link: "https://www.google.com/maps/search/?api=1&query=Bot+Chien+187+Nguyen+Kim+Ho+Chi+Minh" }
      ],
      funFact: "Nước chấm bột chiên phải là hắc xì dầu pha cùng giấm đỏ và nước luộc củ cải để tạo nên vị chua thanh mặn ngọt dịu nhẹ, ăn hoài không ngấy!"
    },

    // ------------------------------------------------------------------------
    // 9. BÒ BÍA SÀI GÒN
    // ------------------------------------------------------------------------
    bo_bia: {
      foodId: "bo_bia",
      name: "Bò Bía",
      fullName: "Bò Bía Mặn Cuốn Nhỏ Xinh",
      region: "Sài Gòn • Ăn Vặt Cổng Trường",
      img: "assets/dish_bo_bia.jpg",
      badge: "Ký Ức Tuổi Học Trò",
      category: "Món Ăn Vặt Thanh Mát",
      quote: "Cuộn nhỏ xinh trong veo với củ sắn thanh ngọt, lạp xưởng béo ngậy chấm ngập tương đen.",
      desc: "Nguồn gốc: Bò bía có nguồn gốc từ món popiah của người Hoa ở vùng Phúc Kiến và Triều Châu, được du nhập vào Việt Nam qua quá trình giao lưu văn hóa. Khi đến Việt Nam, món ăn dần được biến tấu theo khẩu vị địa phương, với nguyên liệu và cách chế biến đặc trưng. Tại Sài Gòn, bò bía trở thành món ăn vặt đường phố quen thuộc, đặc biệt phổ biến tại các xe hàng rong và khu vực đông học sinh, sinh viên. Ảnh hưởng: Bò bía là món ăn vặt tiêu biểu của Sài Gòn, thể hiện sự giao thoa giữa ẩm thực Hoa và Việt. Với giá cả bình dân, cách ăn tiện lợi và hương vị đa dạng, bò bía đã trở thành một phần thân thuộc trong văn hóa hàng rong của thành phố.",
      story: "Hình ảnh những chiếc tủ kính nhỏ gắn sau đuôi xe đạp bán bò bía trước cổng trường đã trở thành một phần ký ức ngọt ngào không thể phai mờ của người Sài Gòn.",
      ingredients: [
        "Bánh tráng mỏng mềm dai dẻo không gãy",
        "Củ sắn (củ đậu) hấp chín tới ngọt thanh mọng nước",
        "Lạp xưởng tươi chiên thái lát mỏng đỏ au béo ngậy",
        "Tép khô rim đường tỏi giòn rụm mặn ngọt",
        "Rau xà lách, rau thơm non tươi mát",
        "Tương đen rim béo bùi rắc đậu phộng rang giã dập",
        "Hành phi thơm vàng và ớt xay cay tê"
      ],
      restaurants: [
        { city: "saigon", name: "Bò bía 2k chú Long", address: "45/9 Đ. Hàn Hải Nguyên, Minh Phụng, Hồ Chí Minh", hours: "13:00 - 19:00", price: "3.000đ - 10.000đ", badge: "Long popiah 2k", link: "https://maps.app.goo.gl/ZQTBuiSSsZ4wAfMK6" },
        { city: "saigon", name: "Bò bía Dì Lê", address: "123b Đ. Phan Đình Phùng, Phú Nhuận, Hồ Chí Minh", hours: "13:00 - 19:00", price: "3.000đ - 10.000đ", badge: "Bò bía dì Lê", link: "https://maps.app.goo.gl/9vgAZ7Hbrgj7HFqi7" },
        { city: "saigon", name: "Ăn vặt Bò Bía Hai Ngàn", address: "29 Phan Tây Hồ, Cầu Kiệu, Hồ Chí Minh", hours: "13:00 - 19:00", price: "3.000đ - 10.000đ", badge: "Ăn vặt bò bía hai ngàn", link: "https://maps.app.goo.gl/R3h9UDkJ7CNANe5U8" },
        { city: "saigon", name: "Bò bía cô Lý", address: "120E Lê Văn Duyệt, Tân Định, Hồ Chí Minh", hours: "13:00 - 19:00", price: "3.000đ - 10.000đ", badge: "Bò Bía cô Lý", link: "https://maps.app.goo.gl/Rhm32zXK1YN8mdoT6" },
        { city: "saigon", name: "Gỏi cuốn, bò bía Tư Hung", address: "32 Chu Mạnh Trinh, Thủ Đức, Hồ Chí Minh", hours: "13:00 - 19:00", price: "3.000đ - 10.000đ", badge: "Gỏi cuốn, bò bía Tư Hungt", link: "https://maps.app.goo.gl/D2PE62xFXryzvGdT8" }
      ],
      funFact: "Củ sắn cuốn bò bía phải được vắt bớt nước sau khi hấp để giữ được độ giòn ngọt mà không làm ướt rách lớp bánh tráng mỏng manh!"
    },

    // ------------------------------------------------------------------------
    // 10. CÁC MÓN CHÈ NAM BỘ
    // ------------------------------------------------------------------------
    che: {
      foodId: "che",
      name: "Các Món Chè",
      fullName: "Các Món Chè Nam Bộ & Ba Miền",
      region: "Nam Bộ & Toàn Quốc",
      img: "assets/dish_che.jpg",
      badge: "Ngọt Ngào Tinh Hoa Đất Trời",
      category: "Món Tráng Miệng & Giải Nhiệt",
      quote: "Hàng chục nồi chè rực rỡ sắc màu chan ngập nước cốt dừa béo bùi và ngọt dịu thốt nốt.",
      desc: "Nguồn gốc: Chè là món ngọt quen thuộc trong ẩm thực Việt Nam, có nhiều biến thể theo vùng miền. Tại TP.HCM, chè còn chịu ảnh hưởng từ văn hóa ẩm thực người Hoa, tạo nên sự đa dạng về nguyên liệu và hương vị. Tên gọi: 'Chè' dùng chung cho nhiều món ngọt dạng nước hoặc sánh đặc. Ảnh hưởng: Chè là món ăn vặt phổ biến tại TP.HCM, xuất hiện từ chợ truyền thống, xe hàng rong đến các quán chè lâu năm. Đặc biệt, khu vực Chợ Lớn (Quận 5) nổi bật với nhiều món chè mang phong vị người Hoa, góp phần tạo nên nét đa dạng cho ẩm thực Sài Gòn. Fun fact – Điều thú vị: Chè không chỉ để ăn ngọt: Ở Chợ Lớn (TP.HCM), thực khách còn có thể thử chè mè đen và chè hột gà trà – những món chè người Hoa có hương vị khác biệt, thường được dùng nóng.",
      story: "Chè Nam Bộ trù phú như chính dải đất đồng bằng sông Cửu Long: từ hạt bắp non, khoai lang, củ năng đến hạt sen Đồng Tháp, nấu cùng đường thốt nốt thanh dịu và nước cốt dừa ép tươi béo ngậy.",
      ingredients: [
        "Bắp nếp ngọt dẻo, đậu xanh cà đãi vỏ",
        "Hạt sen tươi Đồng Tháp bùi ngậy thanh mát",
        "Khoai môn, khoai lang dẻo bùi thơm ngọt",
        "Nước cốt dừa đậm đặc nấu lá dứa thơm ngát",
        "Sương sa, thạch đen, hạt lựu đỏ rực vui miệng",
        "Nước đường thốt nốt nguyên chất thơm dịu dàng",
        "Đậu phộng rang vàng giã dập rắc lên trên"
      ],
      restaurants: [
        { city: "saigon", name: "Chè Hà Ký", address: "138 Châu Văn Liêm, khu vực Chợ Lớn, TP. Hồ Chí Minh", hours: "10:00 - 22:00", price: "15.000đ - 55.000đ", badge: "Quán Chè Hà Ký", link: "https://www.google.com/maps/search/?api=1&query=Che+Ha+Ky+138+Chau+Van+Liem+Ho+Chi+Minh" },
        { city: "saigon", name: "Chè Thanh Tâm", address: "98 Bùi Hữu Nghĩa, khu vực Quận 5 cũ, TP. Hồ Chí Minh", hours: "10:00 - 22:00", price: "15.000đ - 55.000đ", badge: "Quán Chè Thanh Tâm", link: "https://www.google.com/maps/search/?api=1&query=Che+Thanh+Tam+98+Bui+Huu+Nghia+Ho+Chi+Minh" },
        { city: "saigon", name: "Chè Tường Phong", address: "83 An Điềm, khu vực Quận 5 cũ, TP. Hồ Chí Minh", hours: "10:00 - 22:00", price: "15.000đ - 55.000đ", badge: "Quán Chè Tường Phong", link: "https://www.google.com/maps/search/?api=1&query=Che+Tuong+Phong+83+An+Diem+Ho+Chi+Minh" },
        { city: "saigon", name: "Chè mâm Khánh Vy", address: "Lô H, khu Vườn Lài, TP. Hồ Chí Minh", hours: "10:00 - 22:00", price: "15.000đ - 55.000đ", badge: "Quán Chè Mâm Khánh Vy", link: "https://www.google.com/maps/search/?api=1&query=Che+Mam+Khanh+Vy+Lo+H+Vuon+Lai+Ho+Chi+Minh" }
      ],
      funFact: "Quán chè mâm Khánh Vy ở Quận 10 nổi tiếng với thử thách ăn hết 'mâm 16 món chè' gồm chè bà ba, chè chuối, chè đậu đen, chè trôi nước... với giá siêu bình dân!"
    },

    // ------------------------------------------------------------------------
    // 11. MÌ VỊT TIỀM
    // ------------------------------------------------------------------------
    mi_vit_tiem: {
      foodId: "mi_vit_tiem",
      name: "Mì Vịt Tiềm",
      fullName: "Mì Vịt Tiềm Quảng Đông",
      region: "Sài Gòn • Chợ Lớn",
      img: "assets/dish_com_tam.jpg",
      badge: "Hương Vị Hoa Hồi",
      category: "Món Nước Đậm Đà",
      quote: "Thịt vịt mềm ngấm gia vị thảo mộc, nước dùng thơm mùi hoa hồi quế.",
      desc: "Nguồn gốc: Mì vịt tiềm có nguồn gốc từ Trung Hoa, gắn liền với ẩm thực Quảng Đông. Tại TP.HCM, món ăn phổ biến trong cộng đồng người Hoa, đặc biệt ở khu vực Chợ Lớn. Đặc điểm: Món ăn gồm mì trứng, thịt vịt được chiên hoặc quay rồi hầm cùng các loại gia vị và thảo mộc như hoa hồi, quế, đinh hương. Nước dùng có màu sẫm, vị đậm đà và mùi thơm đặc trưng. Ảnh hưởng: Mì vịt tiềm góp phần làm phong phú ẩm thực Sài Gòn, thể hiện sự giao thoa giữa văn hóa ẩm thực Trung Hoa và Việt Nam. Món ăn được nhiều người yêu thích nhờ thịt vịt mềm, nước dùng thơm và sợi mì dai. Qua thời gian, các quán ăn đã điều chỉnh cách nêm nếm để phù hợp với khẩu vị địa phương. Fun fact: Từ 'tiềm' chỉ phương pháp hầm nguyên liệu trong thời gian dài cùng gia vị và thảo mộc, giúp thịt mềm và nước dùng thấm hương thơm đặc trưng.",
      story: "Mì vịt tiềm được chế biến từ thịt vịt nguyên con, được tẩm ướp với ngũ vị hương rồi áp chảo trên lửa lớn cho vàng giòn. Sau đó thịt được hầm nhừ trong nước dùng cùng hoa hồi, quế, sao, hồi trong nhiều giờ. Mì được trần qua nước dùng nóng để thấm hương vị.",
      ingredients: [
        "Mì trứng tươi dai mềm",
        "Thịt vịt nguyên con chiên áp",
        "Hoa hồi, quế, sao, hồi",
        "Nước dùng hầm xương vịt",
        "Cải thảo, giá đỗ",
        "Hành lá, hành tây"
      ],
      restaurants: [
        { city: "saigon", name: "Mì Vịt Tiềm Hải Ký", address: "TP.HCM", hours: "10:00 - 21:00", price: "50.000đ - 100.000đ", badge: "Quán Hải Ký", link: "https://www.google.com/maps/search/?api=1&query=Mi+Vit+Tiem+Hai+Ky+Ho+Chi+Minh" },
        { city: "saigon", name: "Mì Vịt Tiềm Sanh Ký", address: "TP.HCM", hours: "10:00 - 21:00", price: "50.000đ - 100.000đ", badge: "Quán Sanh Ký", link: "https://www.google.com/maps/search/?api=1&query=Mi+Vit+Tiem+Sanh+Ky+Ho+Chi+Minh" },
        { city: "saigon", name: "Mì Vịt Tiềm Thượng Hải", address: "TP.HCM", hours: "10:00 - 21:00", price: "50.000đ - 100.000đ", badge: "Quán Mì Vịt Tiềm Thượng Hải", link: "https://www.google.com/maps/search/?api=1&query=Mi+Vit+Tiem+Thuong+Hai+Ho+Chi+Minh" },
        { city: "saigon", name: "Mì Vịt Tiềm Nhân Quán", address: "TP.HCM", hours: "10:00 - 21:00", price: "50.000đ - 100.000đ", badge: "Quán Nhân Quán", link: "https://www.google.com/maps/search/?api=1&query=Mi+Vit+Tiem+Nhan+Quan+Ho+Chi+Minh" },
        { city: "saigon", name: "Mì Vịt Tiềm Chú Ba", address: "TP.HCM", hours: "10:00 - 21:00", price: "50.000đ - 100.000đ", badge: "Quán Chú Ba", link: "https://www.google.com/maps/search/?api=1&query=Mi+Vit+Tiem+Chu+Ba+Ho+Chi+Minh" }
      ],
      funFact: "Giá mì vịt tiềm tại các quán ở TP.HCM: khoảng 50.000–100.000đ/tô, tùy phần vịt và loại mì."
    },

    // ------------------------------------------------------------------------
    // 12. BÁNH CANH CUA
    // ------------------------------------------------------------------------
    banh_canh_cua: {
      foodId: "banh_canh_cua",
      name: "Bánh Canh Cua",
      fullName: "Bánh Canh Cua Sài Gòn",
      region: "Sài Gòn • Miền Nam",
      img: "assets/dish_com_tam.jpg",
      badge: "Nước Dùng Sánh Đậm",
      category: "Món Nước Đậm Đà",
      quote: "Sợi bánh canh dai mềm, nước dùng đậm đà từ thịt cua và tôm.",
      desc: "Nguồn gốc: Bánh canh cua là món ăn phổ biến ở miền Nam Việt Nam, đặc biệt tại TP.HCM. Tên gọi: Tên món ăn bắt nguồn từ hai nguyên liệu chính là sợi bánh canh và thịt cua. Món ăn thường có nước dùng sánh, kết hợp với chả cua, tôm và các loại topping khác. Ảnh hưởng: Bánh canh cua được yêu thích nhờ nước dùng đậm đà, sợi bánh canh dai mềm và vị ngọt tự nhiên của cua. Tại Sài Gòn, món ăn được biến tấu đa dạng, trở thành một lựa chọn quen thuộc trong văn hóa ẩm thực đường phố. Fun fact: Nước dùng bánh canh cua thường có màu cam đỏ hấp dẫn từ gạch cua và dầu điều. Một số quán còn phục vụ tô đặc biệt với càng cua lớn hoặc nguyên con cua.",
      story: "Bánh canh được làm từ bột gạo pha nước bột năng, tạo độ dẻo dai. Chả cua được làm từ thịt cua tươi, xay nhuyễn trộn với trứng và gia vị, sau đó hấp chín. Nước dùng ninh từ xương cua, tôm khô, các loại thảo mộc tạo vị ngọt thanh.",
      ingredients: [
        "Bột gạo + bột năng",
        "Thịt cua tươi",
        "Tôm khô",
        "Chả cua",
        "Dầu điều",
        "Rau sống: hành lá, ngò",
        "Giá đỗ"
      ],
      restaurants: [
        { city: "saigon", name: "Bánh Canh Cua 14", address: "221 Trần Bình Trọng, TP.HCM", hours: "08:00 - 21:00", price: "30.000đ - 70.000đ", badge: "Quán Bánh Canh Cua 14", link: "https://www.google.com/maps/search/?api=1&query=Banh+Canh+Cua+14+221+Tran+Binh+Trong+Ho+Chi+Minh" },
        { city: "saigon", name: "Bánh Canh Cua 87", address: "87 Trần Khắc Chân, TP.HCM", hours: "08:00 - 21:00", price: "30.000đ - 70.000đ", badge: "Quán Bánh Canh Cua 87", link: "https://www.google.com/maps/search/?api=1&query=Banh+Canh+Cua+87+Tran+Khac+Chan+Ho+Chi+Minh" },
        { city: "saigon", name: "Bánh Canh Cua Bà Ba", address: "84/6 Nguyễn Biểu, TP.HCM", hours: "08:00 - 21:00", price: "30.000đ - 70.000đ", badge: "Quán Bánh Canh Cua Bà Ba", link: "https://www.google.com/maps/search/?api=1&query=Banh+Canh+Cua+Ba+Ba+Nguyen+Bieu+Ho+Chi+Minh" },
        { city: "saigon", name: "Bánh Canh Cua Hiền", address: "395 Bùi Đình Túy, TP.HCM", hours: "08:00 - 21:00", price: "30.000đ - 70.000đ", badge: "Quán Bánh Canh Cua Hiền", link: "https://www.google.com/maps/search/?api=1&query=Banh+Canh+Cua+Hien+Bui+Dinh+Tuy+Ho+Chi+Minh" },
        { city: "saigon", name: "Bánh Canh Cua Hoàng Lan", address: "486 Vĩnh Viễn, TP.HCM", hours: "08:00 - 21:00", price: "30.000đ - 70.000đ", badge: "Quán Bánh Canh Cua Hoàng Lan", link: "https://www.google.com/maps/search/?api=1&query=Banh+Canh+Cua+Hoang+Lan+Vinh+Vien+Ho+Chi+Minh" }
      ],
      funFact: "Giá bánh canh cua tại TP.HCM: khoảng 30.000–70.000đ/tô, tùy topping và khẩu phần."
    },

    // ------------------------------------------------------------------------
    // 13. SỦI CẢO
    // ------------------------------------------------------------------------
    sui_cao: {
      foodId: "sui_cao",
      name: "Sủi Cảo",
      fullName: "Sủi Cảo Chợ Lớn",
      region: "Sài Gòn • Chợ Lớn",
      img: "assets/dish_com_tam.jpg",
      badge: "Hương Vị Hoa - Việt",
      category: "Món Nước",
      quote: "Vỏ bột mỏng bọc nhân thịt tôm, ăn kèm nước dùng nóng.",
      desc: "Nguồn gốc: Sủi cảo có nguồn gốc từ Trung Quốc, gắn liền với văn hóa ẩm thực của người Hoa. Tại TP.HCM, món ăn phổ biến ở khu vực Chợ Lớn. Đặc điểm: Sủi cảo gồm lớp vỏ bột mì mỏng bọc nhân thịt heo, tôm hoặc rau củ. Món ăn thường được luộc, hấp hoặc chiên, phổ biến nhất là sủi cảo ăn cùng nước dùng nóng. Ảnh hưởng: Sủi cảo góp phần làm phong phú ẩm thực Sài Gòn, thể hiện sự giao thoa văn hóa giữa người Việt và cộng đồng người Hoa. Qua thời gian, món ăn được biến tấu với nhiều loại nhân và cách nêm nếm phù hợp khẩu vị địa phương. Những quán sủi cảo lâu đời tại Chợ Lớn cũng trở thành điểm đến quen thuộc của người dân và du khách. Fun fact: Trong văn hóa Trung Quốc, sủi cảo thường xuất hiện vào dịp Tết Nguyên đán vì hình dáng giống thỏi bạc cổ, tượng trưng cho may mắn và thịnh vượng.",
      story: "Sủi cảo Chợ Lớn có vỏ mỏng trong, nhân tôm heo tươi, ăn kèm nước dùng ninh từ xương heo, tôm khô. Vỏ bột được nhào kỹ, gói nhân gọn gàng. Khi ăn, người dùng thường thêm vài giọt tương đen và ớt cay.",
      ingredients: [
        "Bột mì tinh",
        "Thịt heo xay",
        "Tôm tươi",
        "Rau củ: cà rốt, củ cải",
        "Nước dùng ninh xương",
        "Tương đen",
        "Ớt tươi"
      ],
      restaurants: [
        { city: "saigon", name: "Sủi Cảo Thiên Thiên", address: "195 Hà Tôn Quyền, TP.HCM", hours: "10:00 - 21:00", price: "35.000đ - 70.000đ", badge: "Quán Thiên Thiên", link: "https://www.google.com/maps/search/?api=1&query=Sui+Cao+Thien+Thien+195+Ha+Ton+Quyen+Ho+Chi+Minh" },
        { city: "saigon", name: "Sủi Cảo Ngọc Ý", address: "187 Hà Tôn Quyền, TP.HCM", hours: "10:00 - 21:00", price: "35.000đ - 70.000đ", badge: "Quán Ngọc Ý", link: "https://www.google.com/maps/search/?api=1&query=Sui+Cao+Ngoc+Y+187+Ha+Ton+Quyen+Ho+Chi+Minh" },
        { city: "saigon", name: "Sủi Cảo Đại Nương", address: "TP.HCM", hours: "10:00 - 21:00", price: "35.000đ - 70.000đ", badge: "Quán Đại Nương", link: "https://www.google.com/maps/search/?api=1&query=Sui+Cao+Dai+Nuong+Ho+Chi+Minh" },
        { city: "saigon", name: "Sủi Cảo Kung Fu", address: "TP.HCM", hours: "10:00 - 21:00", price: "35.000đ - 70.000đ", badge: "Quán Kung Fu", link: "https://www.google.com/maps/search/?api=1&query=Sui+Cao+Kung+Fu+Ho+Chi+Minh" },
        { city: "saigon", name: "Sủi Cảo Thiên Hương", address: "TP.HCM", hours: "10:00 - 21:00", price: "35.000đ - 70.000đ", badge: "Quán Thiên Hương", link: "https://www.google.com/maps/search/?api=1&query=Sui+Cao+Thien+Huong+Ho+Chi+Minh" }
      ],
      funFact: "Giá sủi cảo tại TP.HCM: khoảng 35.000–70.000đ/phần, tùy loại nhân và khẩu phần."
    },

    // ------------------------------------------------------------------------
    // 14. BÁNH TRÁNG TRỘN
    // ------------------------------------------------------------------------
    banh_trang_tron: {
      foodId: "banh_trang_tron",
      name: "Bánh Tráng Trộn",
      fullName: "Bánh Tráng Trộn Tây Ninh",
      region: "Sài Gòn • Tây Ninh",
      img: "assets/dish_com_tam.jpg",
      badge: "Món Ăn Vặt Nổi Tiếng",
      category: "Món Ăn Vặt",
      quote: "Bánh tráng cắt sợi trộn xoài, khô bò, nước sốt đậm đà.",
      desc: "Nguồn gốc: Bánh tráng trộn có nguồn gốc từ Tây Ninh, nơi nổi tiếng với nghề làm bánh tráng truyền thống. Sau đó, món ăn lan rộng đến TP.HCM và trở thành món ăn vặt quen thuộc của giới trẻ. Đặc điểm: Món ăn được làm từ bánh tráng cắt sợi, trộn cùng xoài xanh, rau răm, trứng cút, khô bò, đậu phộng, hành phi và nước sốt đậm đà. Tùy nơi bán, nguyên liệu có thể được thay đổi để tạo nên hương vị riêng. Ảnh hưởng: Bánh tráng trộn là một trong những món ăn vặt đường phố tiêu biểu của Sài Gòn, đặc biệt được học sinh, sinh viên yêu thích nhờ giá cả bình dân và hương vị hấp dẫn. Sự kết hợp giữa vị chua của xoài, vị cay của sa tế, vị mặn của khô bò và độ dai của bánh tráng tạo nên nét đặc trưng khó nhầm lẫn. Món ăn còn được biến tấu thành nhiều phiên bản như bánh tráng cuốn, bánh tráng chấm và bánh tráng bơ. Fun fact: Bánh tráng trộn thường được bán trong những bịch nhỏ hoặc ly nhựa tiện lợi. Người bán thường trộn trực tiếp các nguyên liệu trước mặt khách để bánh tráng thấm đều gia vị mà vẫn giữ được độ dai.",
      story: "Bánh tráng Tây Ninh được làm từ bột gạo, tráng mỏng trên nong nóng rồi phơi khô. Khi ăn, bánh được cắt thành sợi nhỏ, trộn với nước sốt đặc biệt gồm nước mắm, đường, tỏi ớt, sa tế. Nguyên liệu ăn kèm gồm xoài xanh bào sợi, rau răm, khô bò rim, trứng cút, đậu phộng, hành phi.",
      ingredients: [
        "Bánh tráng Tây Ninh",
        "Xoài xanh bào sợi",
        "Rau răm",
        "Khô bò rim",
        "Trứng cút",
        "Đậu phộng",
        "Hành phi",
        "Nước sốt đặc biệt"
      ],
      restaurants: [
        { city: "saigon", name: "Bánh Tráng Trộn Chú Viên", address: "38 Nguyễn Thượng Hiền, TP.HCM", hours: "10:00 - 21:00", price: "15.000đ - 35.000đ", badge: "Quán Chú Viên", link: "https://www.google.com/maps/search/?api=1&query=Banh+Trang+Tron+Chu+Vien+Nguyen+Thuong+Hien+Ho+Chi+Minh" },
        { city: "saigon", name: "Bánh Tráng Trộn Cô Long", address: "TP.HCM", hours: "10:00 - 21:00", price: "15.000đ - 35.000đ", badge: "Quán Cô Long", link: "https://www.google.com/maps/search/?api=1&query=Banh+Trang+Tron+Co+Long+Ho+Chi+Minh" },
        { city: "saigon", name: "Bánh Tráng Trộn Nhật Quỳnh", address: "TP.HCM", hours: "10:00 - 21:00", price: "15.000đ - 35.000đ", badge: "Quán Nhật Quỳnh", link: "https://www.google.com/maps/search/?api=1&query=Banh+Trang+Tron+Nhat+Quynh+Ho+Chi+Minh" },
        { city: "saigon", name: "Bánh Tráng Trộn Hòa Hảo", address: "TP.HCM", hours: "10:00 - 21:00", price: "15.000đ - 35.000đ", badge: "Quán bánh tráng Hòa Hảo", link: "https://www.google.com/maps/search/?api=1&query=Banh+Trang+Tron+Hoa+Hao+Ho+Chi+Minh" },
        { city: "saigon", name: "Bánh Tráng Trộn Dì Hồng", address: "TP.HCM", hours: "10:00 - 21:00", price: "15.000đ - 35.000đ", badge: "Quán Dì Hồng", link: "https://www.google.com/maps/search/?api=1&query=Banh+Trang+Tron+Di+Hong+Ho+Chi+Minh" }
      ],
      funFact: "Giá bánh tráng trộn tại TP.HCM: khoảng 15.000–35.000đ/phần, tùy lượng topping và kích cỡ."
    },

    // ------------------------------------------------------------------------
    // 15. BÚN ĐẬU MẮM TÔM
    // ------------------------------------------------------------------------
    bun_dau_mam_tom: {
      foodId: "bun_dau_mam_tom",
      name: "Bún Đậu Mắm Tôm",
      fullName: "Bún Đậu Mắm Tôm Hà Nội",
      region: "Hà Nội • Sài Gòn",
      img: "assets/dish_com_tam.jpg",
      badge: "Món Dân Dã Miền Bắc",
      category: "Món Nước",
      quote: "Bún, đậu giòn, mắm tôm đậm đà - hương vị Bắc Nam.",
      desc: "Nguồn gốc: Bún đậu mắm tôm có nguồn gốc từ miền Bắc Việt Nam, đặc biệt gắn liền với ẩm thực Hà Nội, sau đó phổ biến tại nhiều tỉnh thành, trong đó có TP.HCM. Tên gọi: Tên món ăn bắt nguồn từ những nguyên liệu chính gồm bún, đậu hũ chiên và mắm tôm. Khi thưởng thức, món ăn thường được dùng kèm rau sống, chả cốm, thịt luộc và các loại topping khác. Ảnh hưởng: Bún đậu mắm tôm là món ăn dân dã miền Bắc, kết hợp giữa bún, đậu giòn và mắm tôm đậm đà. Khi du nhập vào miền Nam, món ăn được biến tấu đa dạng, trở thành lựa chọn quen thuộc của người Sài Gòn và làm phong phú ẩm thực đường phố. Fun fact: Mắm tôm có mùi vị khá nồng, nhưng khi pha cùng đường, tắc và ớt, kết hợp với đậu hũ chiên nóng, lại tạo nên hương vị đặc trưng khiến nhiều người yêu thích món ăn này.",
      story: "Bún đậu mắm tôm Hà Nội được ăn với đậu hũ chiên giòn, rau sống mùi thơm, chả cốm, thịt luộc, dưa góp. Mắm tôm được pha với đường, tắc, ớt theo tỷ lệ đặc biệt tạo vị chua ngọt cay hài hòa. Khi du nhập vào miền Nam, người Sài Gòn thường ăn kèm thêm đồ chua và rau sống nhiệt đới.",
      ingredients: [
        "Bún tươi",
        "Đậu hũ chiên",
        "Mắm tôm",
        "Chả cốm",
        "Thịt luộc",
        "Rau sống: dưa góp, mùi thơm",
        "Dưa góp chua",
        "Tắc, ớt"
      ],
      restaurants: [
        { city: "saigon", name: "Bún Đậu Homemade", address: "1 Nguyễn Văn Tráng, phường Bến Thành, TP.HCM", hours: "10:00 - 21:00", price: "25.000đ - 70.000đ", badge: "Quán Bún Đậu Homemade", link: "https://www.google.com/maps/search/?api=1&query=Bun+Dau+Homemade+1+Nguyen+Van+Trang+Ho+Chi+Minh" },
        { city: "saigon", name: "Bún Đậu Mắm Tôm Tiến Hải", address: "409 Nguyễn Tri Phương, TP.HCM", hours: "10:00 - 21:00", price: "25.000đ - 70.000đ", badge: "Quán Bún Đậu Tiến Hải", link: "https://www.google.com/maps/search/?api=1&query=Bun+Dau+Tien+Hai+409+Nguyen+Tri+Phuong+Ho+Chi+Minh" },
        { city: "saigon", name: "Bún Đậu A Chảnh", address: "359 Nguyễn Thượng Hiền, TP.HCM", hours: "10:00 - 21:00", price: "25.000đ - 70.000đ", badge: "Quán Bún Đậu A Chảnh", link: "https://www.google.com/maps/search/?api=1&query=Bun+Dau+A+Chanh+359+Nguyen+Thuong+Hien+Ho+Chi+Minh" },
        { city: "saigon", name: "Hoài Niệm Quán – Bún Đậu Mắm Tôm Hà Nội", address: "316 Phan Xích Long, TP.HCM", hours: "10:00 - 21:00", price: "25.000đ - 70.000đ", badge: "Hoài Niệm Quán", link: "https://www.google.com/maps/search/?api=1&query=Hoai+Niem+Quan+316+Phan+Xich+Long+Ho+Chi+Minh" },
        { city: "saigon", name: "Bún Đậu Mắm Tôm Chí Phèo", address: "244 Khánh Hội, TP.HCM", hours: "10:00 - 21:00", price: "25.000đ - 70.000đ", badge: "Quán Bún Đậu Chí Phèo", link: "https://www.google.com/maps/search/?api=1&query=Bun+Dau+Chi+Pheo+244+Khanh+Hoi+Ho+Chi+Minh" }
      ],
      funFact: "Giá bún đậu mắm tôm tại các quán ở TP.HCM: khoảng 25.000–70.000đ/phần, tùy loại mẹt và nguyên liệu ăn kèm."
    },

    // ------------------------------------------------------------------------
    // 16. ỐC
    // ------------------------------------------------------------------------
    oc: {
      foodId: "oc",
      name: "Ốc",
      fullName: "Các Món Ốc Sài Gòn",
      region: "Sài Gòn • Miền Nam",
      img: "assets/dish_com_tam.jpg",
      badge: "Món Ăn Vặt Đêm",
      category: "Món Ăn Vặt",
      quote: "Văn hóa ăn ốc buổi tối - cay nồng, béo thơm.",
      desc: "Nguồn gốc: Các món ốc đã trở thành một phần quen thuộc trong văn hóa ẩm thực Việt Nam, đặc biệt phổ biến ở miền Nam và TP.HCM. Đặc điểm: Ẩm thực Sài Gòn nổi bật với sự đa dạng của các món ốc, được chế biến theo nhiều cách như hấp sả, nướng mỡ hành, xào bơ tỏi và xào dừa. Ảnh hưởng: Ốc là món ăn đường phố được nhiều người Sài Gòn yêu thích, thường xuất hiện trong những buổi tụ họp bạn bè và gia đình. Với cách chế biến phong phú cùng hương vị đậm đà, các món ốc góp phần tạo nên nét đặc trưng cho văn hóa ăn uống bình dân của thành phố. Fun fact: Sài Gòn nổi tiếng với văn hóa ăn ốc buổi tối. Thực khách có thể chọn nhiều loại ốc và yêu cầu chế biến theo khẩu vị, từ vị cay nồng đến vị béo thơm của bơ tỏi và nước cốt dừa.",
      story: "Ốc Sài Gòn được chế biến từ nhiều loại ốc tươi như ốc nhảy, ốc hương, ốc mít, ốc bươu. Các món ốc phổ biến có: ốc hấp sả, ốc nướng mỡ hành, ốc xào bơ tỏi, ốc xào dừa. Khi ăn, người dùng thường chấm kèm nước mắm ớt giã hoặc nước sốt đặc biệt.",
      ingredients: [
        "Ốc tươi: ốc nhảy, ốc hương, ốc mít",
        "Sả, ớt, gừng",
        "Mỡ hành",
        "Dừa bào",
        "Nước mắm",
        "Tương ớt",
        "Rau thơm"
      ],
      restaurants: [
        { city: "saigon", name: "Ốc Đào", address: "TP.HCM", hours: "16:00 - 02:00", price: "40.000đ - 150.000đ", badge: "Quán Ốc Đào", link: "https://www.google.com/maps/search/?api=1&query=Oc+Dao+Ho+Chi+Minh" },
        { city: "saigon", name: "Ốc Oanh", address: "Vĩnh Khánh, TP.HCM", hours: "16:00 - 02:00", price: "40.000đ - 150.000đ", badge: "Quán Ốc Oanh", link: "https://www.google.com/maps/search/?api=1&query=Oc+Oanh+Vinh+Khanh+Ho+Chi+Minh" },
        { city: "saigon", name: "Ốc Như", address: "TP.HCM", hours: "16:00 - 02:00", price: "40.000đ - 150.000đ", badge: "Quán Ốc Như", link: "https://www.google.com/maps/search/?api=1&query=Oc+Nhu+Ho+Chi+Minh" },
        { city: "saigon", name: "Ốc Khánh", address: "TP.HCM", hours: "16:00 - 02:00", price: "40.000đ - 150.000đ", badge: "Quán Ốc Khánh", link: "https://www.google.com/maps/search/?api=1&query=Oc+Khanh+Ho+Chi+Minh" },
        { city: "saigon", name: "Ốc Ghe", address: "TP.HCM", hours: "16:00 - 02:00", price: "40.000đ - 150.000đ", badge: "Quán Ốc Ghe", link: "https://www.google.com/maps/search/?api=1&query=Oc+Ghe+Ho+Chi+Minh" }
      ],
      funFact: "Giá các món ốc tại TP.HCM: khoảng 40.000–150.000đ/phần, tùy loại ốc và cách chế biến."
    }
  };

  return FOOD_DATABASE;
});
