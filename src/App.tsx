/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Star, 
  Award, 
  Microscope, 
  Truck, 
  ChevronDown, 
  Search, 
  User, 
  ShoppingCart,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 12 });

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-container-max mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-primary w-8 h-8" />
            <span className="text-2xl font-black text-primary tracking-tighter uppercase">DrKam</span>
          </div>

          <nav className="hidden md:flex gap-8">
            <a href="#products" className="text-primary font-bold border-b-2 border-primary transition-all">Sản phẩm</a>
            <a href="#clinical" className="text-on-surface-variant hover:text-primary transition-colors">Bằng chứng lâm sàng</a>
            <a href="#about" className="text-on-surface-variant hover:text-primary transition-colors">Về chúng tôi</a>
            <a href="#blog" className="text-on-surface-variant hover:text-primary transition-colors">Blog</a>
            <a href="#contact" className="text-on-surface-variant hover:text-primary transition-colors">Liên hệ</a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4 text-on-surface-variant">
              <button aria-label="Tìm kiếm"><Search className="w-5 h-5 hover:text-primary transition-colors" /></button>
              <button aria-label="Tài khoản"><User className="w-5 h-5 hover:text-primary transition-colors" /></button>
              <button aria-label="Giỏ hàng"><ShoppingCart className="w-5 h-5 hover:text-primary transition-colors" /></button>
            </div>
            <button className="bg-primary text-white px-6 py-2 rounded-full font-bold hover:opacity-95 transition-all text-sm md:text-base">MUA NGAY</button>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 top-16 z-40 bg-white md:hidden p-6"
        >
          <nav className="flex flex-col gap-6 text-lg font-medium">
            <a href="#products" onClick={() => setIsMenuOpen(false)}>Sản phẩm</a>
            <a href="#clinical" onClick={() => setIsMenuOpen(false)}>Bằng chứng lâm sàng</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>Về chúng tôi</a>
            <a href="#blog" onClick={() => setIsMenuOpen(false)}>Blog</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>Liên hệ</a>
          </nav>
        </motion.div>
      )}

      <main className="pt-16">
        {/* Flash Sale Bar */}
        <div className="countdown-red w-full py-3">
          <div className="max-w-container-max mx-auto px-6 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <p className="font-bold uppercase tracking-widest text-sm text-center">⚡ GIẢM 50% - CHỈ CÒN TRONG:</p>
            <div className="flex gap-2 text-xl font-bold items-center">
              <span className="bg-white/20 px-2 py-1 rounded w-10 text-center">{String(timeLeft.hours).padStart(2, '0')}</span> : 
              <span className="bg-white/20 px-2 py-1 rounded w-10 text-center">{String(timeLeft.minutes).padStart(2, '0')}</span> : 
              <span className="bg-white/20 px-2 py-1 rounded w-10 text-center">{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="max-w-container-max mx-auto px-6 py-12 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase">
              🏆 Nha sĩ khuyên dùng
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Nước Súc Miệng <br />
              <span className="text-primary-container">Y Khoa DrKam</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-lg leading-relaxed">
              Tiêu diệt 99.9% vi khuẩn chỉ sau 30 giây. Công thức chuẩn y khoa dành riêng cho người gặp vấn đề về nướu và hôi miệng dai dẳng.
            </p>
            
            <div className="flex items-center gap-4 py-2 border-y border-primary/5">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span className="text-sm font-medium text-on-surface-variant">4.9/5 (2,500+ đánh giá thực tế)</span>
            </div>

            <ul className="space-y-3">
              {[
                "Không chứa cồn, không gây cay rát",
                "Hết hôi miệng sau lần đầu sử dụng",
                "Bảo vệ men răng suốt 24h"
              ].map((item, id) => (
                <li key={id} className="flex items-center gap-3 font-medium">
                  <CheckCircle2 className="text-green-600 w-5 h-5" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all">
                ĐẶT HÀNG NGAY
              </button>
              <button className="border-2 border-primary text-primary px-8 py-4 rounded-xl text-lg font-bold hover:bg-primary/5 transition-all">
                XEM COMBO TIẾT KIỆM
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="absolute -z-10 w-full h-full bg-primary/5 rounded-full blur-3xl"></div>
            <div className="w-full max-w-md aspect-[3/4] bg-primary-container rounded-2xl flex items-center justify-center text-white text-opacity-10 shadow-2xl overflow-hidden relative group">
              <img 
                className="w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-700" 
                alt="Chai nước súc miệng DrKam cao cấp" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxZlXO-CMiP3-VuEmUC7eqdLV941HADkmzRMEgUJW1VAYbQyuckaeRlVFIho-OyKwFoawyHl-rZIgMKRME5_A290ffMiE70iJadai9SZpGyJByiH-PwPYntSOGgRR12gasgxhH5_5rasf1VyywR9q82dO2uRgWNnmW4sYvXaotbSz4T7B3EIhOz3lYQhnoQhMNo5CjYPfGEM1QY-UcrLkjhSoIBF_2I4FCERuvpjRfCcIYOMv5eGQEKD9PzUgljQ09bnchhDfD5Z8"
              />
              <span className="absolute text-6xl md:text-8xl font-black opacity-20 tracking-tighter select-none">DRKAM</span>
            </div>
          </motion.div>
        </section>

        {/* Trust Indicators */}
        <section className="bg-surface-dim/30 py-12">
          <div className="max-w-container-max mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <ShieldCheck className="text-primary w-8 h-8" />, title: "Chuẩn Y Khoa", sub: "Chứng nhận Bộ Y Tế" },
              { icon: <Award className="text-accent w-8 h-8" />, title: "Gold Award 2023", sub: "TP nha khoa xuất sắc" },
              { icon: <Microscope className="text-primary w-8 h-8" />, title: "99.9% Sạch Khuẩn", sub: "Viện Pasteur kiểm định" },
              { icon: <Truck className="text-primary w-8 h-8" />, title: "Free Ship", sub: "Đơn từ 500.000đ" }
            ].map((item, id) => (
              <div key={id} className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                {item.icon}
                <div>
                  <p className="font-bold">{item.title}</p>
                  <p className="text-xs text-on-surface-variant font-medium">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Benefits */}
        <section className="py-24 max-w-container-max mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-primary-container">Tạm Biệt Mọi Vấn Đề Răng Miệng</h2>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">Giải pháp toàn diện được nghiên cứu bởi các chuyên gia R&D hàng đầu tại DrKam.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { emoji: "💨", title: "Hơi Thở Thơm Mát", desc: "Khử sạch mùi hôi miệng do vi khuẩn và thức ăn thừa, giữ hơi thở thơm mát tới 12 giờ." },
              { emoji: "🦷", title: "Bảo Vệ Nướu Khỏe", desc: "Giảm sưng viêm nướu, ngăn ngừa tình trạng chảy máu chân răng và sâu răng hiệu quả." },
              { emoji: "✨", title: "Trắng Răng Tự Nhiên", desc: "Công thức nhẹ nhàng đánh bay mảng bám mà không làm mòn hay ê buốt men răng." }
            ].map((benefit, id) => (
              <motion.div 
                key={id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: id * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:ambient-shadow transition-all group"
              >
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
                  {benefit.emoji}
                </div>
                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Ingredients & FAQ Section */}
        <section className="bg-accent/5 py-24 border-y border-accent/10 overflow-hidden">
          <div className="max-w-container-max mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-accent">Thành Phần Vàng <br />Chuẩn Y Khoa</h2>
              <div className="grid gap-4">
                {[
                  { num: "01", title: "Tinh dầu Bạc Hà", desc: "Kháng khuẩn và mang lại cảm giác sảng khoái tức thì." },
                  { num: "02", title: "Chiết xuất Trà Xanh", desc: "Chất chống oxy hóa tự nhiên giúp bảo vệ tế bào nướu." },
                  { num: "03", title: "Xylitol Tự Nhiên", desc: "Ngăn chặn vi khuẩn gây sâu răng bám trên bề mặt." }
                ].map((ing, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-xl shadow-sm flex gap-4 border border-accent/5">
                    <div className="w-12 h-12 bg-accent text-white rounded-lg flex items-center justify-center shrink-0 font-black text-xl">
                      {ing.num}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{ing.title}</h4>
                      <p className="text-sm text-on-surface-variant leading-relaxed">{ing.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                {["KHÔNG CỒN", "KHÔNG ĐƯỜNG", "KHÔNG CAY", "THIÊN NHIÊN"].map((label, id) => (
                  <div key={id} className="w-20 h-20 rounded-full border-2 border-accent/30 flex items-center justify-center text-[10px] font-bold text-center p-2 leading-tight uppercase text-accent">
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <details className="group bg-white p-4 rounded-xl shadow-sm cursor-pointer border border-slate-100">
                  <summary className="flex justify-between items-center font-bold text-on-surface list-none">
                    Tại sao nên chọn DrKam thay vì các loại thông thường?
                    <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="pt-4 text-sm text-on-surface-variant italic">
                    DrKam được kiểm định lâm sàng với nồng độ hoạt chất tối ưu, loại bỏ hoàn toàn cồn gây khô miệng.
                  </p>
                </details>
                <details className="group bg-white p-4 rounded-xl shadow-sm cursor-pointer border border-slate-100">
                  <summary className="flex justify-between items-center font-bold text-on-surface list-none">
                    Sản phẩm có an toàn cho trẻ em không?
                    <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="pt-4 text-sm text-on-surface-variant italic">
                    An toàn cho trẻ em từ 6 tuổi trở lên dưới sự giám sát của người lớn.
                  </p>
                </details>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-primary relative">
                <p className="italic text-lg text-on-surface-variant mb-6 leading-relaxed">
                  "Chúng tôi cam kết sử dụng nguồn nguyên liệu sạch, được kiểm định khắt khe nhất để bảo vệ nụ cười Việt."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-1 bg-primary h-8 rounded-full"></div>
                  <div>
                    <p className="font-bold text-primary">Đội ngũ R&D DrKam</p>
                    <p className="text-xs uppercase tracking-tighter text-on-surface-variant">Medical Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Combos */}
        <section id="products" className="py-24 max-w-container-max mx-auto px-6">
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold">Lựa Chọn Combo Tiết Kiệm</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <button className="bg-primary text-white px-6 py-2 rounded-full font-bold text-sm">Dành cho bạn</button>
              <button className="bg-slate-100 text-slate-600 px-6 py-2 rounded-full font-bold text-sm hover:bg-slate-200">Cho gia đình</button>
              <button className="bg-slate-100 text-slate-600 px-6 py-2 rounded-full font-bold text-sm hover:bg-slate-200">Mua làm quà</button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch pt-8">
            {/* Combo 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col hover:ambient-shadow transition-all">
              <div className="w-full aspect-[4/5] bg-slate-50 rounded-xl mb-6 overflow-hidden flex items-center justify-center border border-slate-100">
                <img className="w-3/4 object-contain" alt="01 Chai DrKam 500ml" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgH3udMJY_jU50BPu2SQuSQ7qimjiPQwgufGtBuWmWp6cnwiN-Ru2Y0cd9uU0v5AR6VJ0zOLKh2DZ09E4MvAfgnC_M4AYcPEUC620yiXNyts_X8MGevhI-sHptBK-_O7VBQUsWqVeu_KjiJ1Ca4_QMGm1dLtpFieMO2qTAxsqFZnaMNIp34LdK-IdbqQuzFowc_r7VFv67pkDqsQgdXsilSSOI9svFCOK91vQyOSuGvD265TZ5mBRAtOhj_4N_K0WxVAQPj24JZvU" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Combo Trải Nghiệm</h3>
              <p className="text-slate-500 mb-4">01 Chai 500ml</p>
              <p className="text-3xl font-black text-primary mb-6">199.000đ</p>
              <ul className="text-sm space-y-3 mb-8 flex-grow">
                <li className="flex items-center gap-2">📍 Miễn phí ship từ 2 chai</li>
                <li className="flex items-center gap-2 font-bold text-green-600">✨ Tặng 1 bàn chải mềm</li>
              </ul>
              <button className="w-full border-2 border-primary text-primary py-3 rounded-xl font-bold hover:bg-primary/5 transition-all uppercase text-sm">CHỌN COMBO</button>
            </div>

            {/* Combo 2 - HERO */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-accent flex flex-col relative scale-105 z-10 overflow-hidden transform hover:-translate-y-2 transition-all">
              <div className="absolute top-0 left-0 w-full gold-prestige text-center py-2 text-xs font-black tracking-widest uppercase">BÁN CHẠY NHẤT</div>
              <div className="w-full aspect-[4/5] bg-slate-50 rounded-xl mt-4 mb-6 overflow-hidden flex items-center justify-center border border-slate-100">
                <img className="w-full object-cover scale-110" alt="Combo 3 chai DrKam" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJT2Apvfw95IsTsrZ9WXRlbfNuMKAaBjgFi9_hvwpHSKjFrNPr4T73D-xNj42jA0_ewXwSG-u5mIFyAwjGH3UjxLaM3IB63Hl1_SKm17ld-QAEspf-jpS0j03_GrzbKrJWDpxV3RhIQPL2JAXqtcHG4jnHxDq2uK7qVhbjnxaZf5nlfpVVStvtgEL2GAgJ_xOEhCuaiVDRfFpAGkFkw0R_hKbVSRbbvaf5L8uS7ogFnGBVkEe0QS_xWvTEdejtj8E09dkpLSpKwTU" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Combo Toàn Diện</h3>
              <p className="text-slate-500 mb-4">03 Chai + Quà Tặng VIP</p>
              <div className="flex flex-col mb-6">
                <span className="text-slate-400 line-through text-sm font-medium">597.000đ</span>
                <p className="text-4xl font-black text-red-600">499.000đ</p>
              </div>
              <ul className="text-sm space-y-3 mb-8 flex-grow font-medium">
                <li className="flex items-center gap-2">✅ Miễn phí giao hàng toàn quốc</li>
                <li className="flex items-center gap-2 text-primary font-bold">🎁 Tặng máy tăm nước mini</li>
                <li className="flex items-center gap-2">⭐ Ưu tiên CSKH chuyên sâu</li>
              </ul>
              <button className="w-full bg-primary text-white py-4 rounded-xl font-black shadow-lg hover:bg-primary-container transition-all uppercase tracking-widest animate-pulse">ĐẶT NGAY GIẢM 15%</button>
            </div>

            {/* Combo 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col hover:ambient-shadow transition-all">
              <div className="w-full aspect-[4/5] bg-slate-50 rounded-xl mb-6 overflow-hidden flex items-center justify-center border border-slate-100">
                <img className="w-3/4 object-contain" alt="02 Chai DrKam" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1UfUCG8m9M0EcEOWAntHPEcljmPWdwx4uLFAzutE_gUdfR0vdvlE_uTb-LNEl2mNIxevp9I_Dp9I7AZOiGVpy037fS0iu5POCmHr1NbkJJVklnBbTXiqiGf4sT3CyyP8uhxhhPlF39MGporJ-3OI9rOYP9KeXKZR4ctb30SkEody92INVG_dwHk2RAqZ1054vWnMjWdVblCNWHNFSSRLwkwnFqUUlPijjyXK66Ulp6W3Raqjr9aNC_XW5t7cxRcQorQbwPCfvj5w" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Combo Gia Đình</h3>
              <p className="text-slate-500 mb-4">02 Chai 500ml</p>
              <p className="text-3xl font-black text-primary mb-6">350.000đ</p>
              <ul className="text-sm space-y-3 mb-8 flex-grow">
                <li className="flex items-center gap-2">📍 Miễn phí giao hàng</li>
                <li className="flex items-center gap-2 text-secondary font-bold">✨ Tặng 2 bàn chải cao cấp</li>
              </ul>
              <button className="w-full border-2 border-primary text-primary py-3 rounded-xl font-bold hover:bg-primary/5 transition-all uppercase text-sm">CHỌN COMBO</button>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="bg-surface py-24">
          <div className="max-w-container-max mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
              Khách Hàng Nói Gì Về <span className="text-primary font-black">DrKam</span>?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Minh Anh", review: "Mình bị hôi miệng lâu năm, dùng đủ loại không hết. Từ khi đổi sang DrKam cảm thấy tự tin hẳn, hơi thở thơm mát cả ngày." },
                { name: "Hoàng Nam", review: "Sản phẩm không hề cay như các loại khác, vị rất thanh. Răng cũng bớt mảng bám hẳn sau khi dùng hết combo đầu tiên." },
                { name: "Chị Lan", review: "Đã mua combo 3 chai cho cả nhà dùng. Ai cũng khen. Sẽ tiếp tục ủng hộ DrKam lâu dài vì sự uy tín và chất lượng." }
              ].map((user, id) => (
                <div key={id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
                  <div className="flex text-accent gap-1 mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-on-surface-variant italic mb-8 leading-relaxed flex-grow">"{user.review}"</p>
                  <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-black text-primary">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold">{user.name}</p>
                      <p className="text-xs font-semibold text-accent tracking-widest uppercase">Verified Buyer</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Consultation Form with Pharmacist Image */}
        <section className="py-24 max-w-container-max mx-auto px-6">
          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden grid lg:grid-cols-2">
            <div className="p-8 md:p-16 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">Nhận Tư Vấn Miễn Phí <br />Từ Dược Sĩ Chuyên Môn</h2>
              <p className="text-on-surface-variant text-lg">Để lại thông tin, đội ngũ chuyên gia của chúng tôi sẽ liên hệ tư vấn lộ trình chăm sóc răng miệng phù hợp nhất với bạn.</p>
              
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant uppercase ml-2">Họ và tên</label>
                  <input type="text" placeholder="Họ và tên của bạn" className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:ring-2 focus:ring-primary outline-none transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant uppercase ml-2">Số điện thoại</label>
                  <input type="tel" placeholder="Số điện thoại của bạn" className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:ring-2 focus:ring-primary outline-none transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant uppercase ml-2">Vấn đề của bạn</label>
                  <textarea placeholder="Mô tả tình trạng hiện tại của bạn..." className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:ring-2 focus:ring-primary outline-none h-32 resize-none transition-all" />
                </div>
                <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:ambient-shadow transition-all uppercase tracking-widest mt-4">
                  Gửi yêu cầu tư vấn ngay
                </button>
              </form>
            </div>

            <div className="relative group overflow-hidden bg-slate-100 flex items-center justify-center min-h-[500px]">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                alt="Dược sĩ chuyên môn DrKam" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuByTpkBxz8sYgK81lM5Nf6GQRrTJ08xQhBcyPgXPWTxjvMr4JDTBHjBFrWBgEMREL5naqkucV8iEeAdNM_GXUwTNuSTQjHdZKrLCixEkFOpwxujh5a9QFFB_XcuezKIJWqA0j2W86gV0AXlhJcSGM3slJo0euJa4O2m28KKi3GMSfId9t7XhXEkm4Q2kUFQ77_ELK6mkmmzofajT_4RL-dA9ddiN5e45s4qvmtNEYnIRlY1EpD-GV2EBtGPw2sUk2wLryzsw-UZ2mU" 
              />
              <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl border border-white">
                <div className="flex gap-4 items-center">
                  <div className="w-1 bg-primary h-12 rounded-full"></div>
                  <div>
                    <p className="font-bold text-xl text-primary">DS. Nguyễn Minh Hòa</p>
                    <p className="text-sm font-medium text-on-surface-variant">Trưởng phòng R&D | 10 năm kinh nghiệm dược lâm sàng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Media Mentions */}
        <section className="py-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
          <div className="max-w-container-max mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-12">
            {["VnExpress", "VTV News", "ZingNews", "HealthPlus", "Dantri"].map((brand, id) => (
              <span key={id} className="text-2xl font-black italic tracking-tighter text-slate-400">{brand}</span>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-on-surface text-surface py-20 px-6 border-t border-white/5">
        <div className="max-w-container-max mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6 lg:col-span-2 max-w-md">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-primary w-10 h-10" />
              <span className="text-3xl font-black text-primary tracking-tighter uppercase">DrKam Vietnam</span>
            </div>
            <p className="text-surface/60 leading-relaxed text-sm">
              Giải pháp chăm sóc răng miệng y khoa cao cấp, mang đến nụ cười tự tin và sức khỏe bền vững cho cộng đồng Việt Nam qua tiêu chuẩn khoa học khắt khe nhất.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary transition-all cursor-pointer">
                <Search className="w-4 h-4" />
              </div>
              {/* Other social icons could go here */}
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-accent uppercase tracking-widest text-xs">Liên kết chính</h5>
            <ul className="space-y-4 text-sm text-surface/60">
              <li><a href="#" className="hover:text-primary transition-colors">Về chúng tôi</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Sản phẩm</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Hệ thống phân phối</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog y khoa</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6 text-accent uppercase tracking-widest text-xs">Thông tin liên hệ</h5>
            <ul className="space-y-4 text-sm text-surface/60">
              <li className="flex gap-3"><MapPin className="w-4 h-4 shrink-0 text-primary" /> 123 ABC, Quận 1, TP. Hồ Chí Minh</li>
              <li className="flex gap-3"><Phone className="w-4 h-4 shrink-0 text-primary" /> 0917.05.99.33</li>
              <li className="flex gap-3"><Mail className="w-4 h-4 shrink-0 text-primary" /> contact@drkam.vn</li>
            </ul>
          </div>
        </div>
        <div className="max-w-container-max mx-auto mt-20 pt-8 border-t border-white/5 text-center text-xs text-surface/30">
          © {new Date().getFullYear()} DrKam Vietnam. All rights reserved. Sản phẩm được khuyên dùng bởi các bác sĩ nha khoa đầu ngành.
        </div>
      </footer>

      {/* Floating Order Widget */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-4 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-4 rounded-2xl shadow-2xl border-2 border-accent w-64 pointer-events-auto group hover:-translate-y-2 transition-transform duration-300"
        >
          <div className="flex gap-3 items-center mb-3">
            <div className="w-12 h-12 bg-slate-50 rounded-lg overflow-hidden border border-slate-100 flex-shrink-0">
              <img className="w-full h-full object-cover" alt="Best seller combo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJT2Apvfw95IsTsrZ9WXRlbfNuMKAaBjgFi9_hvwpHSKjFrNPr4T73D-xNj42jA0_ewXwSG-u5mIFyAwjGH3UjxLaM3IB63Hl1_SKm17ld-QAEspf-jpS0j03_GrzbKrJWDpxV3RhIQPL2JAXqtcHG4jnHxDq2uK7qVhbjnxaZf5nlfpVVStvtgEL2GAgJ_xOEhCuaiVDRfFpAGkFkw0R_hKbVSRbbvaf5L8uS7ogFnGBVkEe0QS_xWvTEdejtj8E09dkpLSpKwTU" />
            </div>
            <div>
              <p className="font-bold text-xs truncate">Combo Toàn Diện (3 chai)</p>
              <p className="text-red-600 font-black">499.000đ</p>
            </div>
          </div>
          <button className="w-full bg-red-600 text-white py-2 rounded-lg font-bold text-sm shadow-md animate-pulse group-hover:animate-none">ĐẶT HÀNG NGAY</button>
          <div className="text-[10px] text-center mt-2 text-slate-400 font-medium italic">⚡ 12 người khác đang xem combo này</div>
        </motion.div>
      </div>

      {/* Mobile Sticky Navigation */}
      <nav className="fixed bottom-0 w-full z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-safe">
        <div className="flex justify-around items-center h-16 px-4">
          <button className="flex flex-col items-center justify-center text-on-surface-variant font-bold text-[10px] uppercase tracking-tighter">
            <Phone className="w-5 h-5 mb-1" /> Gọi điện
          </button>
          <button className="flex flex-col items-center justify-center text-on-surface-variant font-bold text-[10px] uppercase tracking-tighter">
            <Mail className="w-5 h-5 mb-1" /> Zalo
          </button>
          <button className="flex flex-col items-center justify-center text-primary font-black text-xs uppercase tracking-tighter transform scale-110">
            <ShoppingCart className="w-6 h-6 mb-1 fill-current" /> Đặt hàng
          </button>
        </div>
      </nav>
    </div>
  );
}
