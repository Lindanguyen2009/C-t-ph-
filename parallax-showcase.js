/**
 * MODULE PARALLAX CUỘN DỌC: BÁNH MÌ & BÁNH XÈO
 * - Tự động tải dữ liệu, xử lý cuộn chuột, vuốt cảm ứng và phím mũi tên
 * - Dễ dàng gọi qua: CulinaryParallax.showDish('banh_mi') hoặc CulinaryParallax.showDish('banh_xeo')
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CulinaryParallax = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  // Âm thanh vút mượt mà và chuông nhẹ tạo bằng Web Audio API (không cần tải file audio ngoài)
  class SimpleSound {
    constructor() {
      this.ctx = null;
    }
    init() {
      if (!this.ctx && typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }
    playWhoosh() {
      try {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();
        osc.type = 'triangle';
        const base = 210 + Math.random() * 40;
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
      } catch (e) {}
    }
    playChime() {
      try {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.21);
      } catch (e) {}
    }
  }

  const sfx = new SimpleSound();

  // Dữ liệu nội dung của 2 món ăn
  const DISH_DATA = {
    banh_mi: {
      id: 'banh_mi',
      name: 'BÁNH MÌ SÀI GÒN',
      totalSections: 6,
      parallaxPositions: ['0%', '20%', '40%', '60%', '80%', '100%'],
      sections: [
        {
          heading: 'Nguồn gốc',
          text: 'Bánh mì Việt Nam có nguồn gốc từ bánh baguette của Pháp, du nhập vào Việt Nam từ thế kỉ XIX.',
          side: 'left',
          customClass: 'banh-mi-step-1'
        },
        {
          heading: '',
          text: 'Người Việt dần biến tấu ổ bánh nhỏ gọn hơn, vỏ giòn, ruột xốp và kết hợp với các loại nhân quen thuộc như thịt, chả, pate, rau thơm và đồ chua.',
          side: 'right',
          customClass: 'banh-mi-step-2'
        },
        {
          heading: '',
          text: 'Đến khoảng thập niên 1950–1960, bánh mì kẹp dần phổ biến tại Sài Gòn, trở thành món ăn tiện lợi và gần gũi với đời sống người dân.',
          side: 'left',
          customClass: 'banh-mi-step-3'
        },
        {
          heading: 'Ảnh hưởng',
          text: 'Bánh mì trở thành món ăn đường phố tiêu biểu của Sài Gòn nhờ giá cả phải chăng, tiện lợi và phù hợp với nhịp sống đô thị. Từ món bánh mang ảnh hưởng Pháp, người Việt đã sáng tạo nên hương vị riêng, góp phần quảng bá ẩm thực Việt Nam đến bạn bè quốc tế.',
          side: 'right',
          customClass: 'banh-mi-step-4'
        },
        {
          heading: 'Các hàng bánh mì nổi tiếng',
          text: '<b>• Bánh mì Huỳnh Hoa:</b> 26 Lê Thị Riêng, Bến Thành, Hồ Chí Minh<br><b>• Bánh mì Chim Chạy:</b> 147D Nguyễn Thị Minh Khai, Bến Thành, Hồ Chí Minh<br><b>• Bánh mì Hoàng Lam:</b> Số 168 Nguyễn Thượng Hiền, phường 5, Đức Nhuận<br><b>• Bánh mì Bà Huynh:</b> 197A Nguyễn Trãi, P, Cầu Ông Lãnh, Hồ Chí Minh<br><b>• Bánh mì Bảy Hổ:</b> 25 Huỳnh Khương Ninh, Quận 1, Hồ Chí Minh',
          side: 'left',
          customClass: 'banh-mi-step-5',
          cardClass: 'banh-mi-location-card'
        },
        {
          heading: 'Giá tham khảo',
          text: 'Bánh mì tại các quán phổ biến ở TP.HCM: khoảng <b>15.000–40.000đ/ổ</b>.',
          side: 'right',
          customClass: 'banh-mi-step-6'
        }
      ]
    },

    banh_xeo: {
      id: 'banh_xeo',
      name: 'BÁNH XÈO MIỀN TÂY',
      totalSections: 5,
      parallaxPositions: ['0%', '25%', '50%', '75%', '100%'],
      sections: [
        {
          heading: 'Nguồn gốc',
          text: 'Bánh xèo là món ăn dân dã của Việt Nam, được cho là có nguồn gốc từ miền Trung rồi phổ biến rộng rãi ở miền Nam. Tên gọi “bánh xèo” bắt nguồn từ âm thanh “xèo xèo” khi đổ bột vào chảo nóng. Khi đến Nam Bộ, bánh được biến tấu thành phiên bản lớn hơn, vỏ mỏng giòn, thường có nước cốt dừa và nhân tôm thịt phong phú. Ngày nay, bánh xèo có nhiều phiên bản đặc trưng ở từng vùng&nbsp;miền.',
          side: 'left',
          customClass: 'banh-xeo-step-1'
        },
        {
          heading: 'Ảnh hưởng',
          text: 'Bánh xèo gắn với những bữa ăn gia đình và nét ẩm thực dân dã của người Việt. Tại TP.HCM, món ăn góp phần làm phong phú văn hóa ẩm thực đường phố, kết hợp hương vị vùng miền và thu hút du&nbsp;khách.',
          side: 'right',
          customClass: 'banh-xeo-step-2'
        },
        {
          heading: 'Fun fact',
          text: 'Bánh xèo miền Trung thường nhỏ bằng lòng bàn tay, được đổ trong khuôn nhỏ và ăn kèm rau sống. Trong khi đó, bánh xèo miền Tây có thể to gần bằng cả chiếc đĩa, thường thêm nước cốt dừa vào bột để tạo vị béo đặc&nbsp;trưng.',
          side: 'left',
          customClass: 'banh-xeo-step-3'
        },
        {
          heading: 'Các địa điểm bán bánh xèo nổi tiếng tại Sài Gòn',
          text: '<b>• Bánh Xèo 46A:</b> 46A Đinh Công Tráng, phường Tân Định, Hồ&nbsp;Chí&nbsp;Minh<br><b>• Bánh Xèo Bà Hai:</b> 119 Lê Văn Linh, khu vực Xóm Chiếu, Quận&nbsp;4, Hồ&nbsp;Chí&nbsp;Minh<br><b>• XÈO Restaurant:</b> 44 Đặng Thị Nhu, phường Bến Thành, Hồ&nbsp;Chí&nbsp;Minh<br><b>• Bánh Xèo Rau Rừng Phố Thành:</b> 97 Đường số 41, Quận&nbsp;4, Hồ&nbsp;Chí&nbsp;Minh',
          side: 'right',
          customClass: 'banh-xeo-step-4',
          cardClass: 'banh-mi-location-card'
        },
        {
          heading: 'Giá tham khảo',
          text: 'Bánh xèo tại các quán ở TP.HCM: khoảng <b>50.000–180.000đ/món</b>, tùy quán và loại&nbsp;nhân.',
          side: 'left',
          customClass: 'banh-xeo-step-5'
        }
      ]
    },

    banh_canh_cua: {
      id: 'banh_canh_cua',
      name: 'BÁNH CANH CUA',
      totalSections: 6,
      parallaxPositions: ['0%', '20%', '40%', '60%', '80%', '100%'],
      sections: [
        {
          heading: 'Nguồn gốc',
          text: 'Bánh canh cua là món ăn phổ biến ở miền Nam Việt Nam, đặc biệt tại TP.HCM.',
          side: 'left',
          customClass: 'step-1'
        },
        {
          heading: '',
          text: 'Tên món ăn bắt nguồn từ hai nguyên liệu chính là sợi bánh canh và thịt cua. Món ăn thường có nước dùng sánh, kết hợp với chả cua, tôm và các loại topping khác.',
          side: 'right',
          customClass: 'step-2'
        },
        {
          heading: 'Ảnh hưởng',
          text: 'Bánh canh cua được yêu thích nhờ nước dùng đậm đà, sợi bánh canh dai mềm và vị ngọt tự nhiên của cua. Tại Sài Gòn, món ăn được biến tấu đa dạng, trở thành một lựa chọn quen thuộc trong văn hóa ẩm thực đường phố.',
          side: 'left',
          customClass: 'step-3'
        },
        {
          heading: 'Fun fact',
          text: 'Nước dùng bánh canh cua thường có màu cam đỏ hấp dẫn từ gạch cua và dầu điều. Một số quán còn phục vụ tô đặc biệt với càng cua lớn hoặc nguyên con cua.',
          side: 'right',
          customClass: 'step-4'
        },
        {
          heading: 'Các quán bánh canh cua nổi tiếng tại Sài Gòn',
          text: '<b>• Bánh Canh Cua 14:</b> 221 Trần Bình Trọng, TP.HCM<br><b>• Bánh Canh Cua 87:</b> 87 Trần Khắc Chân, TP.HCM<br><b>• Bánh Canh Cua Bà Ba:</b> 84/6 Nguyễn Biểu, TP.HCM<br><b>• Bánh Canh Cua Hiền:</b> 395 Bùi Đình Túy, TP.HCM<br><b>• Bánh Canh Cua Hoàng Lan:</b> 486 Vĩnh Viễn, TP.HCM',
          side: 'left',
          customClass: 'step-5',
          cardClass: 'banh-mi-location-card'
        },
        {
          heading: 'Giá tham khảo',
          text: 'Giá bánh canh cua tại TP.HCM: khoảng <b>30.000–70.000đ/tô</b>, tùy topping và khẩu phần.',
          side: 'right',
          customClass: 'step-6'
        }
      ]
    },

    banh_trang_tron: {
      id: 'banh_trang_tron',
      name: 'BÁNH TRÁNG TRỘN',
      totalSections: 6,
      parallaxPositions: ['0%', '20%', '40%', '60%', '80%', '100%'],
      sections: [
        {
          heading: 'Nguồn gốc',
          text: 'Bánh tráng trộn có nguồn gốc từ Tây Ninh, nơi nổi tiếng với nghề làm bánh tráng truyền thống. Sau đó, món ăn lan rộng đến TP.HCM và trở thành món ăn vặt quen thuộc của giới trẻ.',
          side: 'left',
          customClass: 'step-1'
        },
        {
          heading: '',
          text: 'Món ăn được làm từ bánh tráng cắt sợi, trộn cùng xoài xanh, rau răm, trứng cút, khô bò, đậu phộng, hành phi và nước sốt đậm đà. Tùy nơi bán, nguyên liệu có thể được thay đổi để tạo nên hương vị riêng.',
          side: 'right',
          customClass: 'step-2'
        },
        {
          heading: 'Ảnh hưởng',
          text: 'Bánh tráng trộn là một trong những món ăn vặt đường phố tiêu biểu của Sài Gòn, đặc biệt được học sinh, sinh viên yêu thích nhờ giá cả bình dân và hương vị hấp dẫn. Sự kết hợp giữa vị chua của xoài, vị cay của sa tế, vị mặn của khô bò và độ dai của bánh tráng tạo nên nét đặc trưng khó nhầm lẫn. Món ăn còn được biến tấu thành nhiều phiên bản như bánh tráng cuốn, bánh tráng chấm và bánh tráng bơ.',
          side: 'left',
          customClass: 'step-3'
        },
        {
          heading: 'Fun fact',
          text: 'Bánh tráng trộn thường được bán trong những bịch nhỏ hoặc ly nhựa tiện lợi. Người bán thường trộn trực tiếp các nguyên liệu trước mặt khách để bánh tráng thấm đều gia vị mà vẫn giữ được độ dai.',
          side: 'right',
          customClass: 'step-4'
        },
        {
          heading: 'Các quán bánh tráng trộn nổi tiếng tại Sài Gòn',
          text: '<b>• Bánh Tráng Trộn Chú Viên:</b> 38 Nguyễn Thượng Hiền, TP.HCM<br><b>• Bánh Tráng Trộn Cô Thảo:</b> 90 Nguyễn Thượng Hiền, Bàn Cờ, Hồ Chí Minh<br><b>• Bánh Tráng Trộn Nhật Quỳnh:</b> 34 Vĩnh Viễn, Vườn Lài, Hồ Chí Minh',
          side: 'left',
          customClass: 'step-5',
          cardClass: 'banh-mi-location-card'
        },
        {
          heading: 'Giá tham khảo',
          text: 'Giá bánh tráng trộn tại TP.HCM: khoảng <b>15.000–35.000đ/phần</b>, tùy lượng topping và kích cỡ.',
          side: 'right',
          customClass: 'step-6'
        }
      ]
    },

    bo_bia: {
      id: 'bo_bia',
      name: 'BÒ BÍA SÀI GÒN',
      totalSections: 6,
      parallaxPositions: ['0%', '20%', '40%', '60%', '80%', '100%'],
      sections: [
        {
          heading: 'Nguồn gốc',
          text: 'Bò bía có nguồn gốc từ món popiah của người Hoa ở vùng Phúc Kiến và Triều Châu, được du nhập vào Việt Nam qua quá trình giao lưu văn hóa.',
          side: 'left',
          customClass: 'step-1'
        },
        {
          heading: '',
          text: 'Khi đến Việt Nam, món ăn dần được biến tấu theo khẩu vị địa phương, với nguyên liệu và cách chế biến đặc trưng.',
          side: 'right',
          customClass: 'step-2'
        },
        {
          heading: '',
          text: 'Tại Sài Gòn, bò bía trở thành món ăn vặt đường phố quen thuộc, đặc biệt phổ biến tại các xe hàng rong và khu vực đông học sinh, sinh viên.',
          side: 'left',
          customClass: 'step-3'
        },
        {
          heading: 'Ảnh hưởng',
          text: 'Bò bía là món ăn vặt tiêu biểu của Sài Gòn, thể hiện sự giao thoa giữa ẩm thực Hoa và Việt. Với giá cả bình dân, cách ăn tiện lợi và hương vị đa dạng, bò bía đã trở thành một phần thân thuộc trong văn hóa hàng rong của thành phố.',
          side: 'right',
          customClass: 'step-4'
        },
        {
          heading: 'Các quán bò bía nổi tiếng tại Thành phố Hồ Chí Minh',
          text: '<b>• Bò bía 2k chú Long:</b> 45/9 Đ. Hàn Hải Nguyên, Minh Phụng, Hồ Chí Minh<br><b>• Bò bía Dì Lê:</b> 123b Đ. Phan Đình Phùng, Phú Nhuận, Hồ Chí Minh<br><b>• Ăn vặt Bò Bía Hai Ngàn:</b> 29 Phan Tây Hồ, Cầu Kiệu, Hồ Chí Minh<br><b>• Bò bía cô Lý:</b> 120E Lê Văn Duyệt, Tân Định, Hồ Chí Minh<br><b>• Gỏi cuốn, bò bía Tư Hung:</b> 32 Chu Mạnh Trinh, Thủ Đức, Hồ Chí Minh',
          side: 'left',
          customClass: 'step-5',
          cardClass: 'banh-mi-location-card'
        },
        {
          heading: 'Giá tham khảo',
          text: 'Bò bía tại các quán ăn vặt ở TP.HCM: khoảng <b>3.000–10.000đ/cuốn</b>.',
          side: 'right',
          customClass: 'step-6'
        }
      ]
    },

    bot_chien: {
      id: 'bot_chien',
      name: 'BỘT CHIÊN SÀI GÒN',
      totalSections: 5,
      parallaxPositions: ['0%', '25%', '50%', '75%', '100%'],
      sections: [
        {
          heading: 'Nguồn gốc',
          text: 'Bột chiên có nguồn gốc từ ẩm thực người Hoa, sau đó phổ biến tại Sài Gòn và được biến tấu theo khẩu vị người Việt.',
          side: 'left',
          customClass: 'step-1'
        },
        {
          heading: '',
          text: 'Tên gọi “bột chiên” bắt nguồn từ cách chế biến: bột gạo được hấp chín, cắt miếng rồi chiên vàng trên chảo.',
          side: 'right',
          customClass: 'step-2'
        },
        {
          heading: 'Ảnh hưởng',
          text: 'Bột chiên là món ăn vặt bình dân quen thuộc tại TP.HCM, thường được bán ở các xe hàng rong và quán nhỏ gần trường học, khu chợ. Món ăn thể hiện sự giao thoa văn hóa Hoa – Việt và góp phần tạo nên nét đặc trưng của ẩm thực đường phố Sài Gòn.',
          side: 'left',
          customClass: 'step-3'
        },
        {
          heading: 'Các địa điểm quán bột chiên nổi tiếng tại Sài Gòn',
          text: '<b>• Bột Chiên Đức Hoa:</b> Lô X, Chung cư Ngô Gia Tự, TP. Hồ Chí Minh<br><b>• Bột Chiên Phùng Hưng:</b> Đối diện số 200B Phùng Hưng, TP. Hồ Chí Minh<br><b>• Bột Chiên Phùng Khắc Khoan:</b> 63 Phùng Khắc Khoan, TP. Hồ Chí Minh<br><b>• Bột Chiên 51:</b> 51 Nguyễn Văn Lạc, phường Thạnh Mỹ Tây, Hồ Chí Minh<br><b>• Bột Chiên Nguyễn Kim:</b> 187 Nguyễn Kim, phường Diên Hồng, Hồ Chí Minh',
          side: 'right',
          customClass: 'step-4',
          cardClass: 'banh-mi-location-card'
        },
        {
          heading: 'Giá tham khảo',
          text: 'Giá bột chiên tại TP.HCM: khoảng <b>15.000–40.000đ/phần</b>, tùy quán và loại topping.',
          side: 'left',
          customClass: 'step-5'
        }
      ]
    },

    bun_dau_mam_tom: {
      id: 'bun_dau_mam_tom',
      name: 'BÚN ĐẬU MẮM TÔM',
      totalSections: 6,
      parallaxPositions: ['0%', '20%', '40%', '60%', '80%', '100%'],
      sections: [
        {
          heading: 'Nguồn gốc',
          text: 'Bún đậu mắm tôm có nguồn gốc từ miền Bắc Việt Nam, đặc biệt gắn liền với ẩm thực Hà Nội, sau đó phổ biến tại nhiều tỉnh thành, trong đó có TP.HCM.',
          side: 'left',
          customClass: 'step-1'
        },
        {
          heading: '',
          text: 'Tên món ăn bắt nguồn từ những nguyên liệu chính gồm bún, đậu hũ chiên và mắm tôm. Khi thưởng thức, món ăn thường được dùng kèm rau sống, chả cốm, thịt luộc và các loại topping khác.',
          side: 'right',
          customClass: 'step-2'
        },
        {
          heading: 'Ảnh hưởng',
          text: 'Bún đậu mắm tôm là món ăn dân dã miền Bắc, kết hợp giữa bún, đậu giòn và mắm tôm đậm đà. Khi du nhập vào miền Nam, món ăn được biến tấu đa dạng, trở thành lựa chọn quen thuộc của người Sài Gòn và làm phong phú ẩm thực đường phố.',
          side: 'left',
          customClass: 'step-3'
        },
        {
          heading: 'Fun fact',
          text: 'Mắm tôm có mùi vị khá nồng, nhưng khi pha cùng đường, tắc và ớt, kết hợp với đậu hũ chiên nóng, lại tạo nên hương vị đặc trưng khiến nhiều người yêu thích món ăn này.',
          side: 'right',
          customClass: 'step-4'
        },
        {
          heading: 'Các quán bún đậu mắm tôm nổi tiếng tại Sài Gòn',
          text: '<b>• Bún Đậu Homemade:</b> 1 Nguyễn Văn Tráng, phường Bến Thành, TP.HCM<br><b>• Bún Đậu Mắm Tôm Tiến Hải:</b> 409 Nguyễn Tri Phương, TP.HCM<br><b>• Bún Đậu A Chảnh:</b> 359 Nguyễn Thượng Hiền, TP.HCM<br><b>• Hoài Niệm Quán – Bún Đậu Mắm Tôm Hà Nội:</b> 316 Phan Xích Long, TP.HCM<br><b>• Bún Đậu Mắm Tôm Chí Phèo:</b> 244 Khánh Hội, TP.HCM',
          side: 'left',
          customClass: 'step-5',
          cardClass: 'banh-mi-location-card'
        },
        {
          heading: 'Giá tham khảo',
          text: 'Giá bún đậu mắm tôm tại các quán ở TP.HCM: khoảng <b>25.000–70.000đ/phần</b>, tùy loại mẹt và nguyên liệu ăn kèm.',
          side: 'right',
          customClass: 'step-6'
        }
      ]
    },

    che_buoi: {
      id: 'che_buoi',
      name: 'CHÈ BƯỞI SÀI GÒN',
      totalSections: 7,
      parallaxPositions: ['0%', '16.6%', '33.3%', '50%', '66.6%', '83.3%', '100%'],
      sections: [
        {
          heading: 'Nguồn gốc',
          text: 'Chè bưởi là món chè truyền thống của Việt Nam, phổ biến ở miền Nam và gắn liền với văn hóa ẩm thực dân gian.',
          side: 'left',
          customClass: 'step-1'
        },
        {
          heading: '',
          text: 'Món chè được sáng tạo từ cùi bưởi – phần thường bị bỏ đi – kết hợp với đậu xanh và nước cốt dừa, tạo nên món tráng miệng thơm ngon, độc đáo.',
          side: 'right',
          customClass: 'step-2'
        },
        {
          heading: '',
          text: 'Theo thời gian, chè bưởi trở thành món ăn vặt quen thuộc tại Sài Gòn, xuất hiện ở nhiều quán chè bình dân và hàng quán lâu đời.',
          side: 'left',
          customClass: 'step-3'
        },
        {
          heading: 'Nguyên liệu và cách chế biến',
          text: '<b>• Cùi bưởi:</b> Được gọt bỏ phần vỏ xanh, sơ chế để giảm vị đắng, sau đó chế biến tạo độ giòn dai đặc trưng.<br><b>• Đậu xanh:</b> Thường được hấp chín, kết hợp với cùi bưởi để tạo độ bùi và tăng hương vị.<br><b>• Nước chè:</b> Nấu cùng đường và bột năng để tạo độ sánh, thường ăn kèm nước cốt dừa béo thơm, giúp cân bằng vị ngọt và tăng độ hấp dẫn.',
          side: 'right',
          customClass: 'step-4'
        },
        {
          heading: 'Ảnh hưởng',
          text: 'Chè bưởi góp phần làm phong phú văn hóa ăn vặt Sài Gòn với sự kết hợp hài hòa giữa vị ngọt thanh, độ giòn dai của cùi bưởi và vị béo của nước cốt dừa. Món chè còn thể hiện sự khéo léo trong việc tận dụng nguyên liệu dân dã để tạo nên món tráng miệng được nhiều người yêu thích.',
          side: 'left',
          customClass: 'step-5'
        },
        {
          heading: 'Các địa điểm quán chè nổi tiếng tại Sài Gòn',
          text: '<b>• Chè Hà Ký:</b> 138 Châu Văn Liêm, khu vực Chợ Lớn, TP. Hồ Chí Minh<br><b>• Chè Thanh Tâm:</b> 98 Bùi Hữu Nghĩa, khu vực Quận 5 cũ, TP. Hồ Chí Minh<br><b>• Chè Tường Phong:</b> 83 An Điềm, khu vực Quận 5 cũ, TP. Hồ Chí Minh<br><b>• Chè mâm Khánh Vy:</b> Lô H, khu Vườn Lài, TP. Hồ Chí Minh',
          side: 'right',
          customClass: 'step-6',
          cardClass: 'banh-mi-location-card'
        },
        {
          heading: 'Giá tham khảo',
          text: 'Giá chè tại TP.HCM: khoảng <b>15.000–55.000đ/phần</b>, tùy nguyên liệu và loại chè.',
          side: 'left',
          customClass: 'step-7'
        }
      ]
    },

    bun_thit_nuong: {
      id: 'bun_thit_nuong',
      name: 'BÚN THỊT NƯỚNG',
      totalSections: 6,
      parallaxPositions: ['0%', '20%', '40%', '60%', '80%', '100%'],
      sections: [
        {
          heading: 'Nguồn gốc',
          text: 'Bún thịt nướng là món ăn quen thuộc của Việt Nam, đặc biệt phổ biến ở miền Nam. Món ăn hình thành từ sự kết hợp giữa bún tươi, thịt nướng và các loại rau sống.',
          side: 'left',
          customClass: 'step-1'
        },
        {
          heading: '',
          text: 'Theo thời gian, bún thịt nướng được biến tấu theo khẩu vị từng vùng, tạo nên những nét riêng về cách ướp thịt, pha nước mắm và lựa chọn đồ ăn kèm.',
          side: 'right',
          customClass: 'step-2'
        },
        {
          heading: '',
          text: 'Tại Sài Gòn, bún thịt nướng dần trở thành món ăn đường phố phổ biến nhờ hương vị đậm đà và cách thưởng thức tiện lợi.',
          side: 'left',
          customClass: 'step-3'
        },
        {
          heading: 'Ảnh hưởng',
          text: 'Bún thịt nướng là món ăn quen thuộc trong văn hóa ẩm thực đường phố Sài Gòn, được yêu thích nhờ sự kết hợp hài hòa giữa vị thơm của thịt nướng, độ mềm của bún và vị tươi mát của rau. Món ăn góp phần thể hiện nét ẩm thực bình dị, đa dạng và gần gũi của thành phố.',
          side: 'right',
          customClass: 'step-4'
        },
        {
          heading: 'Các quán bún thịt nướng nổi tiếng ở Sài Gòn',
          text: '<b>• Quán bún thịt nướng Anh Ba:</b> Chung Cư Miếu Nổi, Hẻm 126 Phan Xích Long, Gia Định, Hồ Chí Minh<br><b>• Quán bún thịt nướng Hải Đăng:</b> 149 Chấn Hưng, Tân Hòa, Hồ Chí Minh<br><b>• Quán bún thịt nướng Út Thu:</b> 629/87 Đường Nguyễn Đình Chiểu, Bàn Cờ, Hồ Chí Minh<br><b>• Quán bún thịt nướng 339:</b> Hẻm 339/7-9 Tô Hiến Thành, Hòa Hưng, Hồ Chí Minh<br><b>• Quán bún thịt nướng Vị Sài Gòn:</b> 66/8 Phạm Ngọc Thạch, Xuân Hòa, Hồ Chí Minh',
          side: 'left',
          customClass: 'step-5',
          cardClass: 'banh-mi-location-card'
        },
        {
          heading: 'Giá tham khảo',
          text: 'Bún thịt nướng tại các quán ở TP.HCM: khoảng <b>30.000–60.000đ/tô</b>.',
          side: 'right',
          customClass: 'step-6'
        }
      ]
    },

    com_tam: {
      id: 'com_tam',
      name: 'CƠM TẤM SÀI GÒN',
      totalSections: 6,
      parallaxPositions: ['0%', '20%', '40%', '60%', '80%', '100%'],
      sections: [
        {
          heading: 'Nguồn gốc',
          text: 'Xưa kia, gạo tấm là những hạt gạo vỡ trong quá trình giã lúa, thường dành cho tầng lớp lao động nghèo vì hình thức không đẹp mắt nhưng giàu dinh dưỡng.',
          side: 'left',
          customClass: 'step-1'
        },
        {
          heading: '',
          text: 'Đầu thế kỉ XX, người lao động từ nông thôn lên Sài Gòn mang theo thói quen ăn cơm tấm của quê hương. Món ăn dần được biến tấu với nhiều món ăn kèm để thêm hấp dẫn.',
          side: 'right',
          customClass: 'step-2'
        },
        {
          heading: '',
          text: 'Dưới ảnh hưởng của ẩm thực Pháp với thịt nướng và cách ăn bằng nĩa, cơm tấm sườn dần trở thành biểu tượng của ẩm thực Sài Gòn.',
          side: 'left',
          customClass: 'step-3'
        },
        {
          heading: 'Ảnh hưởng',
          text: 'Cơm tấm trở thành món ăn tiêu biểu của Sài Gòn và Nam Bộ nhờ sự tiện lợi, no lâu và hương vị đậm đà. Văn hóa ẩm thực đường phố, đặc biệt là những hàng sườn nướng ven đường, đã góp phần gìn giữ và phát triển món ăn đến ngày nay.',
          side: 'right',
          customClass: 'step-4'
        },
        {
          heading: 'Các địa điểm bán cơm tấm nổi tiếng tại Sài Gòn',
          text: '<b>• Cơm Tấm Hồng Calmette:</b> 134 Hoàng Diệu, Phường Khánh Hội, Hồ Chí Minh<br><b>• Cơm Tấm Ba Ghiền:</b> 84 Đặng Văn Ngữ, Phường Phú Nhuận, Hồ Chí Minh<br><b>• Cơm tấm Bãi Rác:</b> 73 Lê Văn Linh, Xóm Chiếu, Hồ Chí Minh<br><b>• Cơm tấm Đỗ Phủ Đại Hàn:</b> 113A Đặng Dung, Tân Định, Hồ Chí Minh<br><b>• Cơm tấm Nguyễn Văn Cừ:</b> 74 Nguyễn Văn Cừ, Cầu Ông Lãnh, Hồ Chí Minh',
          side: 'left',
          customClass: 'step-5',
          cardClass: 'banh-mi-location-card'
        },
        {
          heading: 'Giá tham khảo',
          text: 'Cơm tấm bình dân tại TP.HCM: <b>25.000–60.000đ/suất</b>.',
          side: 'right',
          customClass: 'step-6'
        }
      ]
    },

    hu_tieu: {
      id: 'hu_tieu',
      name: 'HỦ TIẾU SÀI GÒN',
      totalSections: 6,
      parallaxPositions: ['0%', '20%', '40%', '60%', '80%', '100%'],
      sections: [
        {
          heading: 'Nguồn gốc',
          text: 'Hủ tiếu có nguồn gốc từ ẩm thực Trung Hoa, được du nhập vào miền Nam Việt Nam qua quá trình giao lưu và di cư của cộng đồng người Hoa.',
          side: 'left',
          customClass: 'step-1'
        },
        {
          heading: '',
          text: 'Khi đến Việt Nam, món ăn dần được biến tấu để phù hợp với khẩu vị địa phương, kết hợp cùng nguyên liệu và gia vị đặc trưng của Nam Bộ.',
          side: 'right',
          customClass: 'step-2'
        },
        {
          heading: '',
          text: 'Hủ tiếu phát triển mạnh tại Sài Gòn, trở thành món ăn quen thuộc trong đời sống người dân, với nhiều biến thể như hủ tiếu Nam Vang, hủ tiếu Mỹ Tho và hủ tiếu gõ.',
          side: 'left',
          customClass: 'step-3'
        },
        {
          heading: 'Ảnh hưởng',
          text: 'Hủ tiếu là một trong những món ăn tiêu biểu của Sài Gòn, thể hiện sự giao thoa giữa văn hóa ẩm thực Hoa và Việt. Với hương vị đa dạng, giá cả phù hợp và cách phục vụ nhanh chóng, hủ tiếu đã trở thành món ăn quen thuộc từ các quán bình dân đến những hàng ăn lâu đời.',
          side: 'right',
          customClass: 'step-4'
        },
        {
          heading: 'Các quán hủ tiếu nổi tiếng tại Sài Gòn',
          text: '<b>• Hủ tiếu Đạt Thành:</b> 510 Lê Quang Định, Hạnh Thông, Hồ Chí Minh<br><b>• Hủ tiếu Trung Còi:</b> 80 Cao Thắng, Bàn Cờ, Hồ Chí Minh<br><b>• Hủ tiếu Hồng Thịnh:</b> 39B Nguyễn Văn Đậu, Bình Lợi Trung, Hồ Chí Minh<br><b>• Hủ tiếu Nhất Quán:</b> 123 Đ.Nguyễn Văn Nghi, Hạnh Thông, Hồ Chí Minh',
          side: 'left',
          customClass: 'step-5',
          cardClass: 'banh-mi-location-card'
        },
        {
          heading: 'Giá tham khảo',
          text: 'Hủ tiếu tại các quán phổ biến ở TP.HCM: khoảng <b>30.000–60.000đ/tô</b>.',
          side: 'right',
          customClass: 'step-6'
        }
      ]
    },

    pha_lau: {
      id: 'pha_lau',
      name: 'PHÁ LẤU SÀI GÒN',
      totalSections: 6,
      parallaxPositions: ['0%', '20%', '40%', '60%', '80%', '100%'],
      sections: [
        {
          heading: 'Nguồn gốc',
          text: 'Phá lấu được cho là chịu ảnh hưởng từ văn hóa ẩm thực người Hoa, sau đó phổ biến ở miền Nam Việt Nam, đặc biệt là TP.HCM.',
          side: 'left',
          customClass: 'step-1'
        },
        {
          heading: '',
          text: '“Phá lấu” có nguồn gốc từ tiếng Triều Châu, gắn với cách tẩm ướp và hầm thịt, nội tạng cùng gia vị.',
          side: 'right',
          customClass: 'step-2'
        },
        {
          heading: 'Ảnh hưởng',
          text: 'Phá lấu là món ăn đường phố quen thuộc tại TP.HCM, phổ biến ở các hàng quán gần trường học và khu chợ, góp phần tạo nên nét riêng của ẩm thực Sài Gòn.',
          side: 'left',
          customClass: 'step-3'
        },
        {
          heading: 'Fun fact',
          text: 'Phá lấu Sài Gòn thường được ăn với bánh mì hoặc mì gói, chấm cùng nước me chua ngọt, tạo nên sự kết hợp giữa vị béo, mặn và chua.',
          side: 'right',
          customClass: 'step-4'
        },
        {
          heading: 'Các địa điểm bán phá lấu nổi tiếng tại Sài Gòn',
          text: '<b>• Phá Lấu Bò Dì Nủi:</b> Khu vực đường Nguyễn Công Trứ, Quận 1<br><b>• Phá Lấu Bò Cây Trâm:</b> Khu vực đường Cây Trâm, Gò Vấp<br><b>• Phá Lấu Bò Bà Hạt:</b> Khu vực đường Bà Hạt, Quận 10<br><b>• Phá Lấu Bò Nguyễn Trãi:</b> Khu vực đường Nguyễn Trãi, Quận 5',
          side: 'left',
          customClass: 'step-5',
          cardClass: 'banh-mi-location-card'
        },
        {
          heading: 'Giá tham khảo',
          text: 'Giá phá lấu tại các quán ở TP.HCM: khoảng <b>15.000–85.000đ/phần</b>, tùy quán, khẩu phần và món ăn kèm.',
          side: 'right',
          customClass: 'step-6'
        }
      ]
    },
    mi_vit_tiem: {
      id: 'mi_vit_tiem',
      name: 'MÌ VỊT TIỀM',
      totalSections: 6,
      parallaxPositions: ['0%', '20%', '40%', '60%', '80%', '100%'],
      sections: [
        {
          heading: 'Nguồn gốc',
          text: 'Mì vịt tiềm có nguồn gốc từ Trung Hoa, gắn liền với ẩm thực Quảng Đông. Tại TP.HCM, món ăn phổ biến trong cộng đồng người Hoa, đặc biệt ở khu vực Chợ Lớn.',
          side: 'left',
          customClass: 'step-1'
        },
        {
          heading: '',
          text: 'Món ăn gồm mì trứng, thịt vịt được chiên hoặc quay rồi hầm cùng các loại gia vị và thảo mộc như hoa hồi, quế, đinh hương. Nước dùng có màu sẫm, vị đậm đà và mùi thơm đặc trưng.',
          side: 'right',
          customClass: 'step-2'
        },
        {
          heading: 'Ảnh hưởng',
          text: 'Mì vịt tiềm góp phần làm phong phú ẩm thực Sài Gòn, thể hiện sự giao thoa giữa văn hóa ẩm thực Trung Hoa và Việt Nam. Món ăn được nhiều người yêu thích nhờ thịt vịt mềm, nước dùng thơm và sợi mì dai. Qua thời gian, các quán ăn đã điều chỉnh cách nêm nếm để phù hợp với khẩu vị địa phương.',
          side: 'left',
          customClass: 'step-3'
        },
        {
          heading: 'Fun fact',
          text: 'Từ “tiềm” chỉ phương pháp hầm nguyên liệu trong thời gian dài cùng gia vị và thảo mộc, giúp thịt mềm và nước dùng thấm hương thơm đặc trưng.',
          side: 'right',
          customClass: 'step-4'
        },
        {
          heading: 'Các quán mì vịt tiềm nổi tiếng tại Sài Gòn',
          text: '<b>• Mì Vịt Tiềm Hải Ký:</b> 149 đường 9, Phước Long, Hồ Chí Minh<br><b>• Mì Vịt Tiềm Sanh Ký:</b> 102 Đ. Nguyễn Chế Nghĩa, Phú Định, Hồ Chí Minh<br><b>• Mì Vịt Tiềm Thượng Hải:</b> 110 Nơ Trang Long, Bình Thạnh, Hồ Chí Minh',
          side: 'left',
          customClass: 'step-5',
          cardClass: 'banh-mi-location-card'
        },
        {
          heading: 'Giá tham khảo',
          text: 'Giá mì vịt tiềm tại TP.HCM: khoảng <b>50.000–100.000đ/tô</b>, tùy phần vịt và loại mì.',
          side: 'right',
          customClass: 'step-6'
        }
      ]
    },
    sui_cao: {
      id: 'sui_cao',
      name: 'SỦI CẢO CHỢ LỚN',
      totalSections: 6,
      parallaxPositions: ['0%', '20%', '40%', '60%', '80%', '100%'],
      sections: [
        {
          heading: 'Nguồn gốc',
          text: 'Sủi cảo có nguồn gốc từ Trung Quốc, gắn liền với văn hóa ẩm thực của người Hoa. Tại TP.HCM, món ăn phổ biến ở khu vực Chợ Lớn.',
          side: 'left',
          customClass: 'step-1'
        },
        {
          heading: '',
          text: 'Sủi cảo gồm lớp vỏ bột mì mỏng bọc nhân thịt heo, tôm hoặc rau củ. Món ăn thường được luộc, hấp hoặc chiên, phổ biến nhất là sủi cảo ăn cùng nước dùng nóng.',
          side: 'right',
          customClass: 'step-2'
        },
        {
          heading: 'Ảnh hưởng',
          text: 'Sủi cảo góp phần làm phong phú ẩm thực Sài Gòn, thể hiện sự giao thoa văn hóa giữa người Việt và cộng đồng người Hoa. Qua thời gian, món ăn được biến tấu với nhiều loại nhân và cách nêm nếm phù hợp khẩu vị địa phương. Những quán sủi cảo lâu đời tại Chợ Lớn cũng trở thành điểm đến quen thuộc của người dân và du khách.',
          side: 'left',
          customClass: 'step-3'
        },
        {
          heading: 'Fun fact',
          text: 'Trong văn hóa Trung Quốc, sủi cảo thường xuất hiện vào dịp Tết Nguyên đán vì hình dáng giống thỏi bạc cổ, tượng trưng cho may mắn và thịnh vượng.',
          side: 'right',
          customClass: 'step-4'
        },
        {
          heading: 'Các quán sủi cảo nổi tiếng tại Sài Gòn',
          text: '<b>• Sủi Cảo Thiên Thiên:</b> 195 Hà Tôn Quyền, TP.HCM<br><b>• Sủi Cảo Ngọc Ý:</b> 187 Hà Tôn Quyền, TP.HCM<br><b>• Sủi Cảo Đại Nương:</b> 771–773 Nguyễn Trãi, Chợ Lớn, Hồ Chí Minh<br><b>• Sủi Cảo Kung Fu:</b> 118 Hà Tôn Quyền, Phường Minh Phụng, Hồ Chí Minh<br><b>• Sủi Cảo Cô Minh:</b> Lô S Chung Cư Ngô Gia Tự, Hoà Hảo, Vườn Lài, Hồ Chí Minh',
          side: 'left',
          customClass: 'step-5',
          cardClass: 'banh-mi-location-card'
        },
        {
          heading: 'Giá tham khảo',
          text: 'Giá sủi cảo tại TP.HCM: khoảng <b>35.000–70.000đ/phần</b>, tùy loại nhân và khẩu phần.',
          side: 'right',
          customClass: 'step-6'
        }
      ]
    },
    oc: {
      id: 'oc',
      name: 'CÁC MÓN ỐC SÀI GÒN',
      totalSections: 6,
      parallaxPositions: ['0%', '20%', '40%', '60%', '80%', '100%'],
      sections: [
        {
          heading: 'Nguồn gốc',
          text: 'Các món ốc đã trở thành một phần quen thuộc trong văn hóa ẩm thực Việt Nam, đặc biệt phổ biến ở miền Nam và TP.HCM.',
          side: 'left',
          customClass: 'step-1'
        },
        {
          heading: '',
          text: 'Ẩm thực Sài Gòn nổi bật với sự đa dạng của các món ốc, được chế biến theo nhiều cách như hấp sả, nướng mỡ hành, xào bơ tỏi và xào dừa.',
          side: 'right',
          customClass: 'step-2'
        },
        {
          heading: 'Ảnh hưởng',
          text: 'Ốc là món ăn đường phố được nhiều người Sài Gòn yêu thích, thường xuất hiện trong những buổi tụ họp bạn bè và gia đình. Với cách chế biến phong phú cùng hương vị đậm đà, các món ốc góp phần tạo nên nét đặc trưng cho văn hóa ăn uống bình dân của thành phố.',
          side: 'left',
          customClass: 'step-3'
        },
        {
          heading: 'Fun fact',
          text: 'Sài Gòn nổi tiếng với văn hóa ăn ốc buổi tối. Thực khách có thể chọn nhiều loại ốc và yêu cầu chế biến theo khẩu vị, từ vị cay nồng đến vị béo thơm của bơ tỏi và nước cốt dừa.',
          side: 'right',
          customClass: 'step-4'
        },
        {
          heading: 'Các quán ốc nổi tiếng tại Sài Gòn',
          text: '<b>• Ốc Đào:</b> 212B/D48 Nguyễn Trãi, Cầu Ông Lãnh, Hồ Chí Minh<br><b>• Ốc Oanh:</b> 534 Đ. Vĩnh Khánh, Khánh Hội, Hồ Chí Minh<br><b>• Ốc Như:</b> 650/4/29D Điện Biên Phủ, Vườn Lài, Hồ Chí Minh<br><b>• Ốc Khánh:</b> 25/5 Nguyễn Bỉnh Khiêm, Sài Gòn, Hồ Chí Minh<br><b>• Ốc Ghe:</b> 34 Mạc Đĩnh Chi, Tân Định, Hồ Chí Minh',
          side: 'left',
          customClass: 'step-5',
          cardClass: 'banh-mi-location-card'
        },
        {
          heading: 'Giá tham khảo',
          text: 'Giá các món ốc tại TP.HCM: khoảng <b>40.000–150.000đ/phần</b>, tùy loại ốc và cách chế biến.',
          side: 'right',
          customClass: 'step-6'
        }
      ]
    },
    xoi: {
      id: 'xoi',
      name: 'XÔI TRUYỀN THỐNG',
      totalSections: 6,
      parallaxPositions: ['0%', '20%', '40%', '60%', '80%', '100%'],
      sections: [
        {
          heading: 'Nguồn gốc',
          text: 'Xôi là món ăn truyền thống gắn liền với nền văn minh lúa nước của Việt Nam và phổ biến ở nhiều vùng miền.',
          side: 'left',
          customClass: 'step-1'
        },
        {
          heading: '',
          text: '“Xôi” là món ăn được chế biến chủ yếu từ gạo nếp, làm chín bằng phương pháp đồ hoặc hấp bằng hơi nước. Xôi xuất hiện trong đời sống hằng ngày cũng như các dịp lễ, Tết và nghi lễ truyền thống.',
          side: 'right',
          customClass: 'step-2'
        },
        {
          heading: 'Ảnh hưởng',
          text: 'Xôi là món ăn quen thuộc trong đời sống người Việt, đặc biệt phổ biến vào bữa sáng nhờ sự tiện lợi và chắc bụng. Bên cạnh đó, xôi còn xuất hiện trong các dịp cưới hỏi, lễ Tết, cúng giỗ, thể hiện nét đẹp văn hóa ẩm thực truyền thống.',
          side: 'left',
          customClass: 'step-3'
        },
        {
          heading: 'Fun fact',
          text: 'Xôi gấc có màu đỏ tự nhiên, tượng trưng cho may mắn và thường xuất hiện trong đám cưới, lễ Tết của người Việt.',
          side: 'right',
          customClass: 'step-4'
        },
        {
          heading: 'Các quán xôi nổi tiếng tại Sài Gòn',
          text: '<b>• Xôi Gà Number One:</b> 15 Nguyễn Trung Trực, Phường Bến Thành, Hồ Chí Minh<br><b>• Xôi Chè Bùi Thị Xuân:</b> 111 Bùi Thị Xuân, Phường Bến Thành, Hồ Chí Minh<br><b>• Saigon Xôi Bắp Lady:</b> 24 Nguyễn Hữu Cầu, Phường Tân Định, Hồ Chí Minh<br><b>• Xôi Mít Sì Gòn:</b> 187 Cô Giang, Phường Cầu Ông Lãnh, Hồ Chí Minh<br><b>• Xôi Bình Tiên:</b> 88 Minh Phụng, Phường Bình Tây, Hồ Chí Minh',
          side: 'left',
          customClass: 'step-5',
          cardClass: 'banh-mi-location-card'
        },
        {
          heading: 'Giá tham khảo',
          text: 'Giá xôi tại các quán ở TP.HCM: khoảng <b>15.000–65.000đ/phần</b>, tùy loại xôi và nguyên liệu ăn kèm.',
          side: 'right',
          customClass: 'step-6'
        }
      ]
    }
  };

  DISH_DATA.che = DISH_DATA.che_buoi;

  // ==========================================================================
  // BẢNG NGUỒN TƯ LIỆU THAM KHẢO CHO 16 MÓN ĂN (2 LINK UY TÍN MỖI MÓN)
  // ==========================================================================
  const DISH_SOURCES = {
    com_tam: [
      {
        domain: 'Marie Claire Việt Nam',
        title: 'Cơm tấm: Món ăn vỉa hè biểu trưng cho ẩm thực Sài Gòn - Nam Bộ',
        url: 'https://marieclaire.vn/com-tam-mon-an-via-he-bieu-trung-cho-am-thuc-sai-gon-nam-bo'
      },
      {
        domain: 'MIA.vn Cẩm Nang Du Lịch',
        title: 'Cơm tấm Sài Gòn: Hương vị ẩm thực nức tiếng làm say lòng thực khách',
        url: 'https://mia.vn/cam-nang-du-lich/com-tam-sai-gon-12569'
      }
    ],
    banh_xeo: [
      {
        domain: 'Traveloka Ẩm Thực',
        title: 'Bánh xèo: Nét đặc sắc ẩm thực ba miền Việt Nam',
        url: 'https://www.traveloka.com/vi-vn/explore/culinary/banh-xeo-dac-san-o-dau/155928'
      },
      {
        domain: 'VnExpress Du Lịch',
        title: 'Khác biệt thú vị giữa bánh xèo miền Tây và miền Trung',
        url: 'https://vnexpress.net/khac-biet-banh-xeo-mien-tay-va-mien-trung-4290363.html'
      }
    ],
    banh_mi: [
      {
        domain: 'Cục Du Lịch Quốc Gia Việt Nam',
        title: 'Bánh mì Việt Nam: Nét tinh hoa ẩm thực đường phố vang danh thế giới',
        url: 'https://vietnamtourism.gov.vn/post/32035'
      },
      {
        domain: 'MIA.vn Cẩm Nang Du Lịch',
        title: 'Top tiệm bánh mì Sài Gòn nức danh gần xa',
        url: 'https://mia.vn/cam-nang-du-lich/top-tiem-banh-mi-sai-gon-noi-danh-14370'
      }
    ],
    pha_lau: [
      {
        domain: 'Đồ Buôn Việt Nam',
        title: 'Nguồn gốc món phá lấu và nét văn hóa ẩm thực độc đáo',
        url: 'https://dobuon.vn/nguon-goc-mon-pha-lau/'
      },
      {
        domain: 'VietnamMM Ẩm Thực',
        title: 'Phá lấu Sài Gòn: Món ăn vặt đường phố hấp dẫn',
        url: 'https://vietnammm.com/pha-lau-sai-gon/'
      }
    ],
    hu_tieu: [
      {
        domain: 'Mikiri Ẩm Thực Việt',
        title: 'Hủ tiếu: Hành trình đến với ẩm thực Việt Nam',
        url: 'https://mikiri.com.vn/hu-tieu-hanh-trinh-den-voi-am-thuc-viet/'
      },
      {
        domain: 'VinWonders Wonderpedia',
        title: 'Hủ tiếu Sài Gòn: Món ngon đậm đà phong vị phương Nam',
        url: 'https://vinwonders.com/vi/wonderpedia/news/hu-tieu-sai-gon/'
      }
    ],
    xoi: [
      {
        domain: 'VTC News',
        title: 'Xôi trong ẩm thực Việt: Món ăn vội chứng kiến từng cột mốc đời người',
        url: 'https://vtcnews.vn/xoi-trong-am-thuc-viet-mon-an-voi-nhung-lai-chung-kien-tung-cot-moc-doi-nguoi-ar613151.html'
      },
      {
        domain: 'Tràng An Palace',
        title: 'Ý nghĩa của món xôi gấc trong mâm cỗ cưới truyền thống người Việt',
        url: 'https://tranganpalace.vn/tin-tuc/y-nghia-cua-mon-xoi-gac-trong-mam-co-cuoi-truyen-thong-nguoi-viet'
      }
    ],
    bun_thit_nuong: [
      {
        domain: 'Vietnam Tourism',
        title: 'Cẩm nang đầy đủ về tô bún thịt nướng Việt Nam',
        url: 'https://www.vietnamtourism.com/vi/bun-thit-nuong-cam-nang-ay-u-ve-to-bun-thit-nuong-viet-nam'
      },
      {
        domain: 'MIA.vn Cẩm Nang Du Lịch',
        title: 'Quán bún thịt nướng Sài Gòn ngon chuẩn vị',
        url: 'https://mia.vn/cam-nang-du-lich/quan-bun-thit-nuong-sai-gon-16349'
      }
    ],
    bot_chien: [
      {
        domain: 'Đặc Sản Ngon',
        title: 'Món ăn đường phố đậm chất Sài Gòn',
        url: 'https://dacsanngontaybac.com/mon-an-duong-pho-dam-chat-sai-gon/'
      },
      {
        domain: 'Báo Thanh Niên',
        title: 'Thèm lắm bột chiên Sài Gòn giòn rụm thơm nức mũi',
        url: 'https://thanhnien.vn/them-lam-bot-chien-sai-gon-185597887.htm'
      }
    ],
    bo_bia: [
      {
        domain: 'Hướng Nghiệp Á Âu',
        title: 'Bò bía: Món cuốn dân dã thanh mát đậm đà',
        url: 'https://www.huongnghiepaau.com/bo-bia'
      },
      {
        domain: 'VinWonders Wonderpedia',
        title: 'Bò bía Sài Gòn: Món ăn vặt thanh đạm gắn liền ký ức học trò',
        url: 'https://vinwonders.com/vi/wonderpedia/news/bo-bia-sai-gon/'
      }
    ],
    che_buoi: [
      {
        domain: 'VinWonders Wonderpedia',
        title: 'Quán chè ngon ở Sài Gòn: Những địa chỉ thanh mát nức tiếng',
        url: 'https://vinwonders.com/vi/wonderpedia/news/quan-che-ngon-o-sai-gon/'
      },
      {
        domain: 'Báo Tuổi Trẻ Online',
        title: 'Ký ức mùa hè: Chè bưởi thanh mát giòn thơm',
        url: 'https://tuoitre.vn/phunuonline/ky-uc-mua-he-che-buoi-thanh-mat-1101488209.htm'
      }
    ],
    bun_dau_mam_tom: [
      {
        domain: 'Báo Sài Gòn Giải Phóng (SGGP)',
        title: 'Bún đậu mắm tôm: Món ngon Bắc Bộ chinh phục người phương Nam',
        url: 'https://www.sggp.org.vn/bun-dau-mam-tom-post147909.html'
      },
      {
        domain: 'Nguyễn Kim Cẩm Nang',
        title: 'Top quán bún đậu mắm tôm ngon đỉnh chóp tại TP.HCM',
        url: 'https://www.nguyenkim.com/quan-bun-dau-mam-tom-NKPC2831.b'
      }
    ],
    banh_canh_cua: [
      {
        domain: 'Traveloka Ẩm Thực',
        title: 'Bánh canh cua: Món ăn sánh mịn đậm đà vị biển',
        url: 'https://www.traveloka.com/vi-vn/explore/culinary/banh-canh-cua/437394'
      },
      {
        domain: 'VinWonders Wonderpedia',
        title: 'Bánh canh cua Sài Gòn: Món ngon dinh dưỡng nức tiếng',
        url: 'https://vinwonders.com/vi/wonderpedia/news/banh-canh-cua-sai-gon/'
      }
    ],
    oc: [
      {
        domain: 'Báo Mới',
        title: 'Ốc Sài Gòn không chỉ là món ăn mà còn là một văn hóa ẩm thực',
        url: 'http://baomoi.com/oc-sai-gon-khong-chi-la-mon-an-ma-con-la-mot-van-hoa-am-thuc-r23316868.epi'
      },
      {
        domain: 'BShip Ẩm Thực',
        title: 'Quán ốc ngon nức tiếng tại Sài Gòn tụ tập thâu đêm',
        url: 'https://bship.vn/quan-oc-ngon-sai-gon/'
      }
    ],
    banh_trang_tron: [
      {
        domain: 'VTC News',
        title: 'Bánh tráng trộn: Món ăn vặt được giới trẻ yêu thích bậc nhất ở TP.HCM',
        url: 'https://vtcnews.vn/banh-trang-tron-mon-an-vat-duoc-gioi-tre-yeu-thich-bac-nhat-o-tp-hcm-ar852585.html'
      },
      {
        domain: 'VnExpress Đời Sống',
        title: 'Bánh tráng trộn: Món ăn đường phố nổi tiếng Sài Gòn',
        url: 'https://vnexpress.net/banh-trang-tron-mon-an-duong-pho-noi-tieng-sai-gon-3249657.html'
      }
    ],
    sui_cao: [
      {
        domain: 'Thanhmaihsk Văn Hóa',
        title: 'Sủi cảo: Nguồn gốc và ý nghĩa món ăn truyền thống',
        url: 'https://thanhmaihsk.edu.vn/sui-cao-nguon-goc-va-y-nghia-mon-an-truyen-thong-nguoi-trung-quoc/'
      },
      {
        domain: 'VnExpress Ẩm Thực',
        title: '12 món ăn may mắn trên mâm cỗ Tết mang ý nghĩa tốt lành',
        url: 'https://vnexpress.net/12-mon-an-may-man-tren-mam-co-tet-o-trung-quoc-4840293.html'
      }
    ],
    mi_vit_tiem: [
      {
        domain: 'Eva.vn Ẩm Thực',
        title: 'Món mì sặc mùi thảo mộc ở TP.HCM nghe vừa lạ vừa quen',
        url: 'https://eva.vn/di-dau-xem-gi/mon-mi-sac-mui-thao-moc-o-tp-hcm-nghe-vua-la-vua-quen-co-quan-gia-350000-dong-van-dong-khach-c40a653464.html'
      },
      {
        domain: 'MIA.vn Cẩm Nang Du Lịch',
        title: 'Top quán mì vịt tiềm Sài Gòn gia truyền chuẩn vị',
        url: 'https://mia.vn/cam-nang-du-lich/top-quan-mi-vit-tiem-sai-gon-17714'
      }
    ]
  };

  DISH_SOURCES.che = DISH_SOURCES.che_buoi;

  // Tự động gắn phần "Nguồn tham khảo" sang trọng, tinh tế vào bước cuối cùng của từng món
  Object.keys(DISH_DATA).forEach(dishKey => {
    const dish = DISH_DATA[dishKey];
    const sources = DISH_SOURCES[dishKey];
    if (dish && sources && sources.length > 0) {
      const alreadyHas = dish.sections.some(s => s.isSources);
      if (!alreadyHas) {
        dish.sections.push({
          heading: 'Nguồn tham khảo',
          side: 'center',
          customClass: `${dish.id}-step-sources sources-section`,
          cardClass: 'culinary-sources-card',
          isSources: true,
          sources: sources
        });
        dish.totalSections = dish.sections.length;
        dish.parallaxPositions = Array.from({ length: dish.totalSections }, (_, i) =>
          `${Math.round((i / (dish.totalSections - 1)) * 100)}%`
        );
      }
    }
  });

  class CulinaryParallaxEngine {
    constructor() {
      this.currentDishKey = 'banh_mi';
      this.currentSection = 1;
      this.isTransitioning = false;
      this.wheelDebounce = null;
      this.touchStartY = 0;
      this.touchEndY = 0;
      this.stage = null;
      this.container = null;
      this.dotsContainer = null;
      this.titleEl = null;
      this.stepCounter = null;
      this.tabsContainer = null;
      this.btnTabScrollLeft = null;
      this.btnTabScrollRight = null;
      this.btnPrevShowcase = null;
      this.btnNextShowcase = null;
    }

    init(containerElementOrId, options = {}) {
      if (typeof containerElementOrId === 'string') {
        this.stage = document.getElementById(containerElementOrId);
      } else {
        this.stage = containerElementOrId;
      }

      if (!this.stage) {
        console.warn('[CulinaryParallax] Stage container not found.');
        return;
      }

      this.container = this.stage.querySelector('.culinary-showcase-container');
      this.dotsContainer = this.stage.querySelector('.detail-nav-dots');
      this.titleEl = this.stage.querySelector('.culinary-top-dish-name');
      this.stepCounter = this.stage.querySelector('#stepCounterBadge');
      this.tabsContainer = this.stage.querySelector('#dishTabsScrollContainer');
      this.btnTabScrollLeft = this.stage.querySelector('#btnTabScrollLeft');
      this.btnTabScrollRight = this.stage.querySelector('#btnTabScrollRight');
      this.btnPrevShowcase = this.stage.querySelector('#btnPrevShowcase');
      this.btnNextShowcase = this.stage.querySelector('#btnNextShowcase');

      this.bindEvents();

      const dishFromAttr = this.stage ? this.stage.getAttribute('data-active-dish') : null;
      const defaultDish = options.dish || options.initialDish || dishFromAttr || 'banh_mi';
      this.showDish(defaultDish, options.initialStep || options.step || 1);
    }

    showDish(dishKey, stepNum = 1) {
      if (!this.stage) {
        const stageEl = document.getElementById('foodDetailStage') || document.querySelector('.culinary-parallax-stage');
        if (stageEl) {
          this.init(stageEl);
        }
      }
      if (dishKey === 'che') dishKey = 'che_buoi';
      if (!DISH_DATA[dishKey]) dishKey = 'banh_mi';
      this.currentDishKey = dishKey;
      const dish = DISH_DATA[dishKey];

      if (this.stage) {
        this.stage.setAttribute('data-active-dish', dishKey);
      }

      if (this.titleEl) {
        this.titleEl.textContent = dish.name;
      }

      // Cập nhật tab active & tự động cuộn tab active vào giữa tầm nhìn
      if (this.stage) {
        this.stage.querySelectorAll('.culinary-tab-btn').forEach(btn => {
          const isActive = btn.getAttribute('data-dish') === dishKey;
          btn.classList.toggle('active', isActive);
          if (isActive) {
            btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          }
        });
      }

      // Render các phần
      if (this.container) {
        this.container.innerHTML = dish.sections.map((item, idx) => {
          if (item.isSources && item.sources) {
            return `
              <section class="detail-scroll-section ${item.customClass || ''}" data-section="${idx + 1}">
                <div class="banh-mi-content-card ${item.cardClass || 'culinary-sources-card'}">
                  <div class="sources-card-header">
                    <span class="sources-card-badge">📜 TƯ LIỆU THAM KHẢO</span>
                    <h3 class="sources-card-title">Nguồn bài viết & tư liệu</h3>
                  </div>
                  <div class="sources-card-desc">Nội dung văn hóa & lịch sử của món ăn được trích dẫn và đối chiếu từ các nguồn uy tín:</div>
                  <div class="culinary-sources-list">
                    ${item.sources.map((src, sIdx) => `
                      <a href="${src.url}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" class="culinary-source-pill-link" title="${src.title}">
                        <div class="source-pill-meta">
                          <span class="source-num-badge">Nguồn ${sIdx + 1}</span>
                          <span class="source-domain-title">${src.domain}</span>
                          <span class="source-url-text">${src.url}</span>
                        </div>
                        <span class="source-open-arrow">↗</span>
                      </a>
                    `).join('')}
                  </div>
                </div>
              </section>
            `;
          }
          return `
            <section class="detail-scroll-section ${item.customClass || ''}" data-section="${idx + 1}">
              <div class="banh-mi-content-card banh-mi-card-${item.side}${item.cardClass ? ' ' + item.cardClass : ''}">
                ${item.heading ? `<span class="banh-mi-content-heading">${item.heading}</span>` : ''}
                <p>${item.text}</p>
              </div>
            </section>
          `;
        }).join('');
      }

      // Render dots
      if (this.dotsContainer) {
        this.dotsContainer.innerHTML = Array.from({ length: dish.totalSections }, (_, idx) =>
          `<div class="detail-nav-dot${idx === 0 ? ' active' : ''}" data-section="${idx + 1}" title="Phần ${idx + 1}"></div>`
        ).join('');

        this.dotsContainer.querySelectorAll('.detail-nav-dot').forEach((dot, idx) => {
          dot.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showSection(idx + 1);
          });
        });
      }

      this.currentSection = 1;
      this.showSection(stepNum, true);
      sfx.playChime();
    }

    showSection(sectionNum, immediate = false) {
      const dish = DISH_DATA[this.currentDishKey];
      if (!dish) return;

      if (!immediate && (this.isTransitioning || sectionNum < 1 || sectionNum > dish.totalSections)) {
        return;
      }

      this.isTransitioning = true;
      const oldSection = this.currentSection;
      this.currentSection = sectionNum;

      // Cập nhật badge đếm bước phần
      if (this.stepCounter) {
        this.stepCounter.textContent = `Phần ${this.currentSection} / ${dish.totalSections}`;
      }

      const sections = this.container ? this.container.querySelectorAll('.detail-scroll-section') : [];
      sections.forEach((sec, idx) => {
        const secIndex = idx + 1;
        sec.classList.remove('active', 'previous');

        if (secIndex === this.currentSection) {
          sec.classList.add('active');
          const offset = secIndex > oldSection ? 20 : -20;
          sec.style.setProperty('--parallax-offset', `${offset}px`);
        } else if (secIndex === oldSection && secIndex < this.currentSection) {
          sec.classList.add('previous');
          sec.style.setProperty('--parallax-offset', '30px');
        } else {
          sec.style.setProperty('--parallax-offset', '0px');
        }
      });

      // Di chuyển vị trí Parallax nền
      if (this.stage) {
        const pos = dish.parallaxPositions[this.currentSection - 1] || '0%';
        this.stage.style.setProperty('--food-parallax-pos', pos);
      }

      // Cập nhật nav dots
      if (this.dotsContainer) {
        const dots = this.dotsContainer.querySelectorAll('.detail-nav-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx + 1 === this.currentSection);
        });
      }

      if (!immediate) sfx.playWhoosh();

      setTimeout(() => {
        this.isTransitioning = false;
      }, immediate ? 50 : 850);
    }

    nextSection() {
      const dish = DISH_DATA[this.currentDishKey];
      if (dish && this.currentSection < dish.totalSections) {
        this.showSection(this.currentSection + 1);
      }
    }

    prevSection() {
      if (this.currentSection > 1) {
        this.showSection(this.currentSection - 1);
      }
    }

    bindEvents() {
      if (!this.stage) return;

      // Click tab đổi món
      this.stage.querySelectorAll('.culinary-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const dishKey = btn.getAttribute('data-dish');
          if (dishKey && dishKey !== this.currentDishKey) {
            this.showDish(dishKey, 1);
          }
        });
      });

      // Nút điều hướng Trước / Sau
      if (this.btnPrevShowcase) {
        this.btnPrevShowcase.addEventListener('click', (e) => {
          e.stopPropagation();
          this.prevSection();
        });
      }
      if (this.btnNextShowcase) {
        this.btnNextShowcase.addEventListener('click', (e) => {
          e.stopPropagation();
          this.nextSection();
        });
      }

      // Nút trượt trái / phải cho danh sách 12 món ăn
      if (this.btnTabScrollLeft && this.tabsContainer) {
        this.btnTabScrollLeft.addEventListener('click', (e) => {
          e.stopPropagation();
          this.tabsContainer.scrollBy({ left: -260, behavior: 'smooth' });
        });
      }
      if (this.btnTabScrollRight && this.tabsContainer) {
        this.btnTabScrollRight.addEventListener('click', (e) => {
          e.stopPropagation();
          this.tabsContainer.scrollBy({ left: 260, behavior: 'smooth' });
        });
      }

      // Cuộn chuột trên thanh món ăn -> tự động trượt ngang
      if (this.tabsContainer) {
        this.tabsContainer.addEventListener('wheel', (e) => {
          if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            e.stopPropagation();
            this.tabsContainer.scrollLeft += e.deltaY * 1.3;
          }
        }, { passive: false });

        // Kéo chuột để trượt danh sách món ăn (Mouse Drag-to-Scroll)
        let isDown = false;
        let startX = 0;
        let scrollLeftPos = 0;

        this.tabsContainer.addEventListener('mousedown', (e) => {
          isDown = true;
          startX = e.pageX - this.tabsContainer.offsetLeft;
          scrollLeftPos = this.tabsContainer.scrollLeft;
        });

        window.addEventListener('mouseup', () => {
          isDown = false;
        });

        this.tabsContainer.addEventListener('mouseleave', () => {
          isDown = false;
        });

        this.tabsContainer.addEventListener('mousemove', (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - this.tabsContainer.offsetLeft;
          const walk = (x - startX) * 1.6;
          this.tabsContainer.scrollLeft = scrollLeftPos - walk;
        });
      }

      // Cuộn chuột chuyển bước Parallax
      this.stage.addEventListener('wheel', (e) => {
        // Bỏ qua nếu con trỏ đang nằm trên thanh top bar hoặc card đang cuộn
        if (e.target.closest('.culinary-tabs-carousel-wrapper') || e.target.closest('.culinary-top-bar') || e.target.closest('.banh-mi-content-card')) {
          return;
        }
        e.preventDefault();
        if (this.isTransitioning) return;
        if (this.wheelDebounce) clearTimeout(this.wheelDebounce);
        this.wheelDebounce = setTimeout(() => {
          if (e.deltaY > 30) {
            this.nextSection();
          } else if (e.deltaY < -30) {
            this.prevSection();
          }
        }, 40);
      }, { passive: false });

      // Vuốt chạm trên điện thoại
      this.stage.addEventListener('touchstart', (e) => {
        if (e.target.closest('.culinary-tabs-carousel-wrapper')) return;
        if (e.changedTouches && e.changedTouches[0]) {
          this.touchStartY = e.changedTouches[0].screenY;
        }
      }, { passive: true });

      this.stage.addEventListener('touchend', (e) => {
        if (e.target.closest('.culinary-tabs-carousel-wrapper')) return;
        if (this.isTransitioning) return;
        if (e.changedTouches && e.changedTouches[0]) {
          this.touchEndY = e.changedTouches[0].screenY;
          const deltaY = this.touchStartY - this.touchEndY;
          if (Math.abs(deltaY) > 40) {
            if (deltaY > 0) this.nextSection();
            else this.prevSection();
          }
        }
      }, { passive: true });

      // Phím mũi tên & Space
      document.addEventListener('keydown', (e) => {
        if (this.isTransitioning) return;
        switch (e.key) {
          case 'ArrowDown':
          case 'PageDown':
          case ' ':
            e.preventDefault();
            this.nextSection();
            break;
          case 'ArrowUp':
          case 'PageUp':
            e.preventDefault();
            this.prevSection();
            break;
        }
      });
    }
  }

  const instance = new CulinaryParallaxEngine();

  return {
    Engine: CulinaryParallaxEngine,
    create: (containerId, options) => {
      const eng = new CulinaryParallaxEngine();
      eng.init(containerId, options);
      return eng;
    },
    init: (containerId, options) => instance.init(containerId, options),
    initAll: (selector = '.culinary-parallax-stage') => {
      const stages = document.querySelectorAll(selector);
      const list = [];
      stages.forEach(stage => {
        const eng = new CulinaryParallaxEngine();
        eng.init(stage);
        list.push(eng);
      });
      return list;
    },
    showDish: (dishKey, stepNum) => instance.showDish(dishKey, stepNum),
    showSection: (stepNum) => instance.showSection(stepNum),
    next: () => instance.nextSection(),
    prev: () => instance.prevSection(),
    data: DISH_DATA
  };

}));
