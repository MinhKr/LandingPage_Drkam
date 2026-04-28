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
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

import logoImg from '../Images/logo_Drkam.jpg';
import overviewImg1 from '../Images/Overview/image1.jpeg';
import overviewImg2 from '../Images/Overview/image2.png';
import overviewImg3 from '../Images/Overview/image3.jpeg';
import overviewImg4 from '../Images/Overview/image4.jpeg';
import overviewImg5 from '../Images/Overview/image5.jpeg';
import overviewImg6 from '../Images/Overview/image6.jpeg';
import reviewImg1 from '../Images/reviews/review-1.png';
import reviewImg2 from '../Images/reviews/review-2.png';
import reviewImg3 from '../Images/reviews/review-3.png';
import reviewImg4 from '../Images/reviews/review-4.png';
import reviewImg5 from '../Images/reviews/review-5.png';
import reviewImg6 from '../Images/reviews/review-6.png';
import reviewImg7 from '../Images/reviews/review-7.png';
import reviewImg8 from '../Images/reviews/review-8.png';

const OVERVIEW_IMAGES = [overviewImg1, overviewImg2, overviewImg3, overviewImg4, overviewImg5, overviewImg6];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const total = OVERVIEW_IMAGES.length;

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % total);
    }, 3000);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (idx: number) => {
    setCurrent((idx + total) % total);
    resetTimer();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      goTo(delta > 0 ? current + 1 : current - 1);
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl group select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide strip */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ width: `${total * 100}%`, transform: `translateX(-${current * (100 / total)}%)` }}
      >
        {OVERVIEW_IMAGES.map((src, idx) => (
          <div key={idx} className="h-full flex-shrink-0" style={{ width: `${100 / total}%` }}>
            <img src={src} alt={`DrKam overview ${idx + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Prev button */}
      <button
        onClick={() => goTo(current - 1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full w-9 h-9 flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100 z-10"
        aria-label="Ảnh trước"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Next button */}
      <button
        onClick={() => goTo(current + 1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full w-9 h-9 flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100 z-10"
        aria-label="Ảnh tiếp theo"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
        {OVERVIEW_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`rounded-full transition-all ${idx === current ? 'bg-white w-4 h-2' : 'bg-white/50 w-2 h-2'}`}
            aria-label={`Ảnh ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

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
        <div className="max-w-container-max mx-auto px-6 h-20 flex justify-between items-center">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center cursor-pointer">
            <img src={logoImg} alt="DrKam" className="h-14 w-auto object-contain" />
          </button>

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
          className="fixed inset-0 top-20 z-40 bg-white md:hidden p-6"
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

      <main className="pt-20">
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
              🏆 Top 10 Thương Hiệu Uy Tín Quốc Gia 2024
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Nước Súc Miệng <br />
              <span className="text-primary-container">Y Khoa DrKam</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-lg leading-relaxed">
              Thương hiệu chăm sóc răng miệng chuẩn y khoa của Việt Nam — được sáng lập bởi đội ngũ chuyên gia giàu kinh nghiệm. Hỗ trợ xử lý hôi miệng, viêm nướu, mảng bám, ê buốt và chảy máu chân răng.
            </p>

            <div className="flex items-center gap-4 py-2 border-y border-primary/5">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span className="text-sm font-medium text-on-surface-variant">4.9/5 (2,500+ đánh giá thực tế)</span>
            </div>

            <ul className="space-y-3">
              {[
                "Chlorhexidine nhập khẩu Châu Âu kết hợp chiết xuất lá lấu y học cổ truyền",
                "Hỗ trợ hôi miệng, viêm nướu, chảy máu chân răng và nhiệt miệng",
                "An toàn cho trẻ em từ 6 tuổi trở lên"
              ].map((item, id) => (
                <li key={id} className="flex items-center gap-3 font-medium">
                  <CheckCircle2 className="text-green-600 w-5 h-5" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Buttons — desktop only (shown inside left column) */}
            <div className="hidden md:flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all">
                ĐẶT HÀNG — MIỄN PHÍ VẬN CHUYỂN
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
            <HeroCarousel />
          </motion.div>

          {/* Buttons — mobile only (shown after carousel) */}
          <div className="flex md:hidden flex-col gap-3 pt-2">
            <button className="w-full bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all">
              ĐẶT HÀNG — MIỄN PHÍ VẬN CHUYỂN
            </button>
            <button className="w-full border-2 border-primary text-primary px-8 py-4 rounded-xl text-lg font-bold hover:bg-primary/5 transition-all">
              XEM COMBO TIẾT KIỆM
            </button>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="bg-surface-dim/30 py-12">
          <div className="max-w-container-max mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <ShieldCheck className="text-primary w-8 h-8" />, title: "Chuẩn Y Khoa", sub: "Chứng nhận Bộ Y Tế" },
              { icon: <Award className="text-accent w-8 h-8" />, title: "Top 10 Uy Tín 2024", sub: "Thương hiệu uy tín quốc gia" },
              { icon: <Microscope className="text-primary w-8 h-8" />, title: "Patent Mỹ US7666407B2", sub: "Công nghệ Postbiotic độc quyền" },
              { icon: <Truck className="text-primary w-8 h-8" />, title: "Miễn Phí Vận Chuyển", sub: "Giao hàng toàn quốc & hoàn trả miễn phí" }
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
            <h2 className="text-3xl md:text-5xl font-bold text-primary-container">Chăm Sóc Răng Miệng Đúng Cách — Từ Gốc Rễ</h2>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">DrKam không chỉ diệt khuẩn — mà cân bằng hệ vi sinh miệng để bảo vệ sức khoẻ răng lợi bền vững.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { emoji: "🦠", title: "Cân Bằng Vi Sinh Miệng", desc: "Công nghệ Postbiotic (Lactobacillus paracasei ADP-1) nuôi dưỡng vi khuẩn có lợi, ức chế vi khuẩn gây hại từ bên trong." },
              { emoji: "🦷", title: "Giảm Viêm Nướu & Hôi Miệng", desc: "Chlorhexidine Digluconate chuẩn châu Âu kết hợp chiết xuất Salvadora Persica — giảm viêm, hết hôi miệng nhanh chóng và lâu dài." },
              { emoji: "🤱", title: "An Toàn Cho Cả Gia Đình", desc: "Không cồn, không chất bảo quản, không gây kích ứng. Phù hợp với phụ nữ mang thai, cho con bú và trẻ em từ 6 tuổi." }
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
              <h2 className="text-4xl md:text-5xl font-bold text-accent">Thành Phần Được <br />Khoa Học Kiểm Chứng</h2>
              <div className="grid gap-4">
                {[
                  { num: "01", title: "Postbiotic Lactobacillus paracasei ADP-1", desc: "Vi khuẩn có lợi được bất hoạt — cân bằng hệ vi sinh miệng, giảm viêm. Bảo hộ bởi patent Mỹ US7666407B2." },
                  { num: "02", title: "Chlorhexidine Digluconate", desc: "Hoạt chất kháng khuẩn phổ rộng chuẩn châu Âu — loại bỏ vi khuẩn gây viêm nướu và mảng bám hiệu quả." },
                  { num: "03", title: "Chiết xuất Salvadora Persica", desc: "Thành phần thảo dược được WHO công nhận — làm sạch tự nhiên, kháng viêm, bảo vệ men răng." }
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
              <div className="flex flex-wrap gap-2 pt-6">
                {[
                  { label: "Không cồn",   dot: "bg-accent" },
                  { label: "Không đường", dot: "bg-accent" },
                  { label: "Không cay",   dot: "bg-accent" },
                  { label: "Thiên nhiên", dot: "bg-green-500" },
                ].map((item, id) => (
                  <div
                    key={id}
                    className="inline-flex items-center gap-2 bg-white border border-accent/25 px-4 py-2 rounded-full shadow-sm hover:border-accent hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.dot}`} />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-accent whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <details className="group bg-white p-4 rounded-xl shadow-sm cursor-pointer border border-slate-100">
                  <summary className="flex justify-between items-center font-bold text-on-surface list-none">
                    DrKam khác gì so với nước súc miệng thông thường?
                    <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="pt-4 text-sm text-on-surface-variant italic">
                    Hầu hết nước súc miệng thị trường dùng cồn và hoá chất mạnh — diệt cả vi khuẩn có lợi, gây khô miệng. DrKam dùng Postbiotic (patent Mỹ) để cân bằng vi sinh — không cồn, không chất bảo quản, hiệu quả bền vững hơn.
                  </p>
                </details>
                <details className="group bg-white p-4 rounded-xl shadow-sm cursor-pointer border border-slate-100">
                  <summary className="flex justify-between items-center font-bold text-on-surface list-none">
                    Phụ nữ mang thai và trẻ em có dùng được không?
                    <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="pt-4 text-sm text-on-surface-variant italic">
                    Có. Công thức không cồn, không chất bảo quản của DrKam được thiết kế an toàn cho phụ nữ mang thai, đang cho con bú và trẻ em từ 6 tuổi. Đây là điểm khác biệt mà rất ít thương hiệu nào trên thị trường có được.
                  </p>
                </details>
                <details className="group bg-white p-4 rounded-xl shadow-sm cursor-pointer border border-slate-100">
                  <summary className="flex justify-between items-center font-bold text-on-surface list-none">
                    Tư vấn 24/7 hoạt động như thế nào?
                    <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="pt-4 text-sm text-on-surface-variant italic">
                    Đội ngũ chuyên gia DrKam trực tư vấn 24/7 qua hotline 0917.05.99.33 và Zalo. Bạn sẽ được tư vấn đúng sản phẩm phù hợp tình trạng răng miệng cụ thể, hoàn toàn miễn phí.
                  </p>
                </details>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-primary relative">
                <p className="italic text-lg text-on-surface-variant mb-6 leading-relaxed">
                  "Chúng tôi không chạy theo xu hướng — chúng tôi chạy theo khoa học. Mỗi thành phần trong DrKam đều có nghiên cứu lâm sàng và bằng chứng thực tiễn đứng sau."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-1 bg-primary h-8 rounded-full"></div>
                  <div>
                    <p className="font-bold text-primary">Bộ phận Nghiên cứu & Phát triển DrKam</p>
                    <p className="text-xs uppercase tracking-tighter text-on-surface-variant">Postbiotic · Patent US7666407B2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-24 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #fff8f7, #f8f4f0)' }}>
          {/* Header */}
          <div className="max-w-container-max mx-auto px-6 mb-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Khách Hàng Nói Gì Về <span className="text-primary font-black">DrKam</span>?
              </h2>
              <p className="text-on-surface-variant text-base mb-8">Đánh giá thực tế từ người mua trên Shopee — không chỉnh sửa, không kịch bản.</p>

              {/* Trust bar */}
              <div className="inline-flex flex-wrap justify-center items-center gap-6 bg-white rounded-2xl px-8 py-4 shadow-sm border border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <span className="font-black text-on-surface text-lg">4.9</span>
                  <span className="text-on-surface-variant text-sm">/5</span>
                </div>
                <div className="w-px h-5 bg-slate-200 hidden sm:block" />
                <div className="text-sm font-semibold text-on-surface">
                  <span className="text-primary font-black text-base">2,500+</span> đánh giá thực tế
                </div>
                <div className="w-px h-5 bg-slate-200 hidden sm:block" />
                <div className="flex items-center gap-1.5 text-sm font-semibold text-on-surface-variant">
                  <ShieldCheck className="w-4 h-4 text-[#EE4D2D]" />
                  Verified Shopee
                </div>
              </div>
            </motion.div>
          </div>

          {/* Marquee rows */}
          <div className="space-y-4">
            {/* Row 1 — scroll left */}
            <div className="marquee-track overflow-hidden">
              <div className="marquee-left flex gap-4 w-max">
                {[reviewImg1, reviewImg2, reviewImg3, reviewImg4, reviewImg5, reviewImg6, reviewImg7, reviewImg8,
                  reviewImg1, reviewImg2, reviewImg3, reviewImg4, reviewImg5, reviewImg6, reviewImg7, reviewImg8
                ].map((src, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[520px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white"
                  >
                    <img
                      src={src}
                      alt={`Đánh giá khách hàng DrKam ${(i % 8) + 1}`}
                      className="w-full h-auto object-cover"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 — scroll right */}
            <div className="marquee-track overflow-hidden">
              <div className="marquee-right flex gap-4 w-max">
                {[reviewImg5, reviewImg6, reviewImg7, reviewImg8, reviewImg1, reviewImg2, reviewImg3, reviewImg4,
                  reviewImg5, reviewImg6, reviewImg7, reviewImg8, reviewImg1, reviewImg2, reviewImg3, reviewImg4
                ].map((src, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[520px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white"
                  >
                    <img
                      src={src}
                      alt={`Đánh giá khách hàng DrKam ${(i % 8) + 1}`}
                      className="w-full h-auto object-cover"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12 px-6">
            <p className="text-sm text-on-surface-variant">
              Xem thêm đánh giá tại{' '}
              <a
                href="https://shopee.vn/drkamvnstore"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#EE4D2D] underline underline-offset-2 hover:opacity-75 transition-opacity"
              >
                Shopee
              </a>{' '}
              — tìm kiếm "DrKam nước súc miệng"
            </p>
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

        {/* Consultation Form with Pharmacist Image */}
        <section className="py-24 max-w-container-max mx-auto px-6">
          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden grid lg:grid-cols-2">
            <div className="p-8 md:p-16 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">Tư Vấn 24/7 <br />Hoàn Toàn Miễn Phí</h2>
              <p className="text-on-surface-variant text-lg">Mỗi người có tình trạng răng miệng khác nhau. Để lại thông tin — chuyên gia DrKam sẽ tư vấn đúng sản phẩm, đúng liều lượng, đúng lộ trình cho bạn.</p>
              
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
                  Nhận tư vấn miễn phí ngay
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
            <div className="flex items-center">
              <img src={logoImg} alt="DrKam" className="h-20 w-auto object-contain bg-white rounded-xl p-2" />
            </div>
            <p className="text-surface/60 leading-relaxed text-sm">
              Thương hiệu chăm sóc răng miệng y khoa ứng dụng công nghệ Postbiotic độc quyền — không cồn, không chất bảo quản, an toàn cho cả gia đình. Top 10 Thương Hiệu Uy Tín Quốc Gia 2024.
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
              <li className="flex gap-3"><MapPin className="w-4 h-4 shrink-0 text-primary" /> Phường Yên Hoà, Cầu Giấy, Hà Nội</li>
              <li className="flex gap-3"><Phone className="w-4 h-4 shrink-0 text-primary" /> 0917.05.99.33</li>
              <li className="flex gap-3"><Mail className="w-4 h-4 shrink-0 text-primary" /> Drkamvietnam@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="max-w-container-max mx-auto mt-20 pt-8 border-t border-white/5 text-center text-xs text-surface/30">
          © {new Date().getFullYear()} DrKam Vietnam. All rights reserved. Sản phẩm được khuyên dùng bởi các bác sĩ nha khoa đầu ngành.
        </div>
      </footer>

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
