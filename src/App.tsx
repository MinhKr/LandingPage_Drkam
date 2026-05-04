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
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

import logoImg from '../Images/logo_Drkam.jpg';
import comboImg1 from '../Images/Combo/combo1_fix.jpeg';
import comboImg2 from '../Images/Combo/combo2_fix.jpeg';
import comboImg3 from '../Images/Combo/combo3_fix.jpeg';
import comboImg5 from '../Images/Combo/combo5_fix.jpeg';
import giftImg1 from '../Images/Gift/anh1.jpg';
import giftImg2 from '../Images/Gift/anh2.jpg';
import giftBoxImg from '../Images/Gift/ảnh gói quà.jpg';
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

const SHEET_URL = "https://script.google.com/macros/s/AKfycbzI_XoCYuiC9dRKk693GIlsaPJFIVs_kChVGwYNdxdmtyBI3edGe318a60mD1aa8Ps/exec";

const COMBOS = [
  { id: "1chai",  label: "Mua 1 chai súc miệng = 219k miễn ship", hot: false },
  { id: "2chai",  label: "Mua 2 chai súc miệng tặng 2 kem đánh răng Sinh Học = 370k miễn ship", hot: true },
  { id: "3chai",  label: "Mua 3 chai súc miệng tặng 1 kem đánh răng Sinh Học, 1 chai súc miệng Sinh Học, 1 cạo lưỡi, 1 bàn chải đa năng, 1 bộ tăm chỉ nha khoa = 585k miễn ship", hot: false },
  { id: "5chai",  label: "Mua 5 chai súc miệng tặng 1 chai và tặng kèm thêm Bộ Quà Tặng: 1 kem đánh răng Sinh Học, 1 chai súc miệng Sinh Học, 1 cạo lưỡi, 1 bàn chải đa năng = 975k miễn ship", hot: false },
  { id: "10chai", label: "Mua 10 chai súc miệng tặng 4 chai và tặng kèm 1 chai súc miệng Sinh Học = 1.950k miễn ship", hot: false },
];

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

  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formCombo, setFormCombo] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formName.trim())  errors.name    = 'Vui lòng nhập họ và tên';
    if (!formPhone.trim()) errors.phone   = 'Vui lòng nhập số điện thoại';
    if (!formAddress.trim()) errors.address = 'Vui lòng nhập địa chỉ';
    if (!formCombo)        errors.combo   = 'Vui lòng chọn combo';
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setFormErrors({});
    setIsSubmitting(true);
    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toLocaleString('vi-VN'),
          name: formName,
          phone: formPhone,
          address: formAddress,
          combo: COMBOS.find(c => c.id === formCombo)?.label ?? formCombo,
        }),
      });
      setSubmitStatus('success');
      setFormName(''); setFormPhone(''); setFormAddress(''); setFormCombo('');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <a href="#overview" className="text-on-surface-variant hover:text-primary transition-colors">Tổng quan</a>
            <a href="#ingredients" className="text-on-surface-variant hover:text-primary transition-colors">Thành phần</a>
            <a href="#reviews" className="text-on-surface-variant hover:text-primary transition-colors">Đánh giá</a>
            <a href="#products" className="text-on-surface-variant hover:text-primary transition-colors">Sản phẩm</a>
            <a href="#footer" className="text-on-surface-variant hover:text-primary transition-colors">Liên hệ</a>
          </nav>

          <div className="flex items-center gap-4">
            <a href="#contact" className="bg-primary text-white px-6 py-2 rounded-full font-bold hover:opacity-95 transition-all text-sm md:text-base inline-flex items-center">MUA NGAY</a>
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
            <a href="#overview" onClick={() => setIsMenuOpen(false)}>Tổng quan</a>
            <a href="#ingredients" onClick={() => setIsMenuOpen(false)}>Thành phần</a>
            <a href="#reviews" onClick={() => setIsMenuOpen(false)}>Đánh giá</a>
            <a href="#products" onClick={() => setIsMenuOpen(false)}>Sản phẩm</a>
            <a href="#footer" onClick={() => setIsMenuOpen(false)}>Liên hệ</a>
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
        <section id="overview" className="scroll-mt-20 max-w-container-max mx-auto px-6 py-12 md:py-24 grid md:grid-cols-2 gap-12 items-center">
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
              <a href="#contact" className="inline-flex items-center justify-center text-center bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all">
                Đặt hàng - Nhận ưu đãi
              </a>
              <a href="#products" className="inline-flex items-center justify-center text-center border-2 border-primary text-primary px-8 py-4 rounded-xl text-lg font-bold hover:bg-primary/5 transition-all">
                XEM COMBO TIẾT KIỆM
              </a>
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
            <a href="#contact" className="w-full inline-flex items-center justify-center text-center bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all">
              Đặt hàng - Nhận ưu đãi
            </a>
            <a href="#products" className="w-full inline-flex items-center justify-center text-center border-2 border-primary text-primary px-8 py-4 rounded-xl text-lg font-bold hover:bg-primary/5 transition-all">
              XEM COMBO TIẾT KIỆM
            </a>
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
        <section id="ingredients" className="scroll-mt-20 bg-accent/5 py-24 border-y border-accent/10 overflow-hidden">
          <div className="max-w-container-max mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
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
                    Đội ngũ chuyên gia DrKam trực tư vấn 24/7 qua hotline 098.6088.610 và Zalo. Bạn sẽ được tư vấn đúng sản phẩm phù hợp tình trạng răng miệng cụ thể, hoàn toàn miễn phí.
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
        <section id="reviews" className="scroll-mt-20 py-24 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #fff8f7, #f8f4f0)' }}>
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
                    className="flex-shrink-0 w-[280px] sm:w-[400px] md:w-[520px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white"
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
                    className="flex-shrink-0 w-[280px] sm:w-[400px] md:w-[520px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white"
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
        <section id="products" className="scroll-mt-20 py-24 bg-gradient-to-b from-white to-slate-50/60">
          <div className="max-w-container-max mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-8 space-y-3">
<h2 className="text-3xl md:text-5xl font-bold">Mua Càng Nhiều — Tiết Kiệm Càng Lớn</h2>
            </div>

            {/* Value progression bar */}
            <div className="flex justify-center mb-10">
              <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 bg-white border border-slate-200 rounded-2xl px-6 py-3 shadow-sm text-xs font-bold">
                <span className="text-slate-400">1 chai</span>
                <span className="text-slate-300">→</span>
                <span className="text-primary">2 chai</span>
                <span className="text-slate-300">→</span>
                <span className="text-accent">3 chai</span>
                <span className="text-slate-300">→</span>
                <span className="text-green-600 font-black">5 chai</span>
              </div>
            </div>

            {/* Top 2 combos: Combo 1 (nhỏ) + Combo 2 HOT (lớn) */}
            <div className="grid md:grid-cols-5 gap-6 mb-6">
              {/* Combo 1 — Trải nghiệm */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-2 bg-white rounded-2xl p-7 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Combo 1 chai</p>
                    <h3 className="text-xl font-bold">Trải Nghiệm</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-primary">180k</p>
                    <p className="text-[11px] text-slate-400 font-medium">= 180k/chai</p>
                  </div>
                </div>

                <div className="w-full aspect-[1200/896] rounded-xl mb-5 overflow-hidden">
                  <img src={comboImg1} alt="Combo 1 chai nước súc miệng DrKam 500ml" className="w-full h-full object-cover" />
                </div>

                <div className="flex-grow" />

                <a
                  href="https://shopee.vn/N%C6%B0%E1%BB%9Bc-S%C3%BAc-Mi%E1%BB%87ng-Chu%E1%BA%A9n-Y-Khoa-DrKam-250ml-Kh%E1%BB%AD-H%C3%B4i-Mi%E1%BB%87ng-Gi%E1%BA%A3m-Vi%C3%AAm-N%C6%B0%E1%BB%9Bu-Kh%C3%B4ng-C%E1%BB%93n-Kh%C3%B4ng-Cay-i.1357220472.24436434479?extraParams=%7B%22display_model_id%22%3A280607716722%2C%22model_selection_logic%22%3A3%7D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border-2 border-primary text-primary py-3 rounded-xl font-bold hover:bg-primary/5 transition-all text-sm uppercase tracking-wide text-center block"
                >
                  Chọn combo này
                </a>
              </motion.div>

              {/* Combo 2 — HOT NHẤT */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="md:col-span-3 bg-white rounded-3xl shadow-2xl border-2 border-accent flex flex-col relative overflow-hidden hover:-translate-y-1 transition-all"
              >
                <div className="gold-prestige text-center py-2.5 text-xs font-black tracking-widest uppercase px-4">
                  🔥 BÁN CHẠY NHẤT — ĐƯỢC CHỌN NHIỀU NHẤT
                </div>

                <div className="p-7 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-accent mb-1">Combo 2 chai</p>
                      <h3 className="text-2xl font-bold">Combo Đôi</h3>
                      <p className="text-sm text-slate-500 mt-1">Dùng lâu dài + tặng quà</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-red-600">328.300đ</p>
                      <p className="text-[11px] text-accent font-bold bg-accent/10 px-2 py-0.5 rounded-full mt-1">164k/chai · tiết kiệm 32k</p>
                    </div>
                  </div>

                  <div className="w-full aspect-[1376/768] rounded-xl mb-5 overflow-hidden">
                    <img src={comboImg2} alt="Combo 2 chai nước súc miệng DrKam + 2 kem đánh răng Sinh Học" className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-grow" />

                  <a
                    href="https://shopee.vn/Combo-2-N%C6%B0%E1%BB%9Bc-S%C3%BAc-Mi%E1%BB%87ng-Chu%E1%BA%A9n-Y-Khoa-DrKam-250ml-Kh%E1%BB%AD-H%C3%B4i-Mi%E1%BB%87ng-Vi%C3%AAm-N%C6%B0%E1%BB%9Bu-Kh%C3%B4ng-Cay-Kh%C3%B4ng-C%E1%BB%93n-i.1295994548.28356553669?extraParams=%7B%22display_model_id%22%3A306611390461%2C%22model_selection_logic%22%3A3%7D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-primary text-white py-4 rounded-xl font-black shadow-lg hover:bg-primary-container transition-all uppercase tracking-widest text-center block"
                  >
                    Đặt ngay — Miễn ship
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Bottom 2 combos */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Combo 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Combo 3 chai</p>
                    <h3 className="text-xl font-bold">Combo Gia Đình</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-primary">532.800đ</p>
                    <p className="text-[10px] text-slate-400">+ bộ quà 5 sản phẩm</p>
                  </div>
                </div>

                <div className="w-full aspect-[1200/896] rounded-xl mb-4 overflow-hidden">
                  <img src={comboImg3} alt="Combo 3 chai DrKam + bộ quà tặng 5 sản phẩm" className="w-full h-full object-cover" />
                </div>

                <div className="flex-grow" />

                <a
                  href="https://shopee.vn/Combo-3-N%C6%B0%E1%BB%9Bc-S%C3%BAc-Mi%E1%BB%87ng-Chu%E1%BA%A9n-Y-Khoa-DrKam-Kh%E1%BB%AD-H%C3%B4i-Mi%E1%BB%87ng-Gi%E1%BA%A3m-Vi%C3%AAm-N%C6%B0%E1%BB%9Bu-Kh%C3%B4ng-C%E1%BB%93n-Kh%C3%B4ng-Cay-i.1357220472.29462352796?extraParams=%7B%22display_model_id%22%3A286507909827%2C%22model_selection_logic%22%3A3%7D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border-2 border-primary text-primary py-3 rounded-xl font-bold hover:bg-primary/5 transition-all text-sm uppercase tracking-wide text-center block"
                >
                  Chọn combo này
                </a>
              </motion.div>

              {/* Combo 5 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-7 shadow-sm border border-green-100 flex flex-col hover:shadow-md transition-all relative"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="min-w-0 flex-1 pr-3">
                    <div className="inline-flex items-center bg-green-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wide mb-1.5">
                      Tiết kiệm nhất
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Combo 5 chai</p>
                    <h3 className="text-xl font-bold">Combo Tích Trữ</h3>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-2xl font-black text-primary">888.000đ</p>
                    <p className="text-[10px] text-green-600 font-bold">~148k/chai</p>
                  </div>
                </div>

                <div className="w-full aspect-[1200/896] rounded-xl mb-4 overflow-hidden">
                  <img src={comboImg5} alt="Combo 5 chai DrKam + 1 chai tặng + bộ quà tặng" className="w-full h-full object-cover" />
                </div>

                <div className="flex-grow" />

                <a
                  href="https://shopee.vn/Combo-5-N%C6%B0%E1%BB%9Bc-S%C3%BAc-Mi%E1%BB%87ng-Chu%E1%BA%A9n-Y-Khoa-DrKam-250ml-Kh%E1%BB%AD-H%C3%B4i-Mi%E1%BB%87ng-Gi%E1%BA%A3m-Vi%C3%AAm-N%C6%B0%E1%BB%9Bu-Gi%E1%BA%A3m-%C3%8A-Bu%E1%BB%91t-R%C4%83ng-i.1357220472.29462347991?extraParams=%7B%22display_model_id%22%3A270449751871%2C%22model_selection_logic%22%3A3%7D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all text-sm uppercase tracking-wide shadow-md text-center block"
                >
                  Chọn combo tiết kiệm nhất
                </a>
              </motion.div>
            </div>

            {/* Bottom note */}
            <p className="text-center text-xs text-slate-400 mt-8">
              Tất cả combo miễn phí vận chuyển toàn quốc · Quà tặng áp dụng theo chương trình hiện hành · Liên hệ hotline <span className="font-bold text-primary">098.6088.610</span> để được tư vấn combo phù hợp
            </p>
          </div>
        </section>

        {/* Order Form */}
        <section id="contact" className="scroll-mt-20 py-16 md:py-24" style={{ background: 'linear-gradient(to bottom, #fff8f7 0%, #ffffff 60%)' }}>
          <div className="max-w-container-max mx-auto px-5 lg:px-6">
            <h2 className="text-3xl md:text-4xl font-black text-primary text-center uppercase tracking-wide mb-10 md:mb-14">
              Nhận Ưu Đãi
            </h2>

            <div className="grid lg:grid-cols-[1fr_minmax(0,_520px)] gap-8 lg:gap-12 items-start">

              {/* LEFT — Gift gallery */}
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className="order-1 lg:order-1 space-y-5"
              >
                <div className="relative bg-white rounded-2xl border-2 border-primary/15 shadow-md overflow-hidden">
                  <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
                    {/* Platform comparison list */}
                    <ul className="space-y-2.5 sm:space-y-3 shrink-0">
                      {[
                        { name: 'TIKTOK',   allowed: false },
                        { name: 'SHOPEE',   allowed: false },
                        { name: 'FACEBOOK', allowed: true },
                      ].map(({ name, allowed }) => (
                        <li key={name} className="flex items-center gap-3">
                          {allowed ? (
                            <span className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                              <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} />
                            </span>
                          ) : (
                            <span className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                              <X className="w-4 h-4" strokeWidth={3} />
                            </span>
                          )}
                          <span className={`font-black tracking-wide text-base sm:text-lg ${allowed ? 'text-[#1877F2]' : 'text-on-surface-variant'}`}>
                            {name}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* HOT badge + Gift visual */}
                    <div className="relative flex items-center justify-center shrink-0 w-28 h-28 sm:w-32 sm:h-32">
                      <span
                        className="flame-badge absolute -top-1 -left-2 z-10 text-white text-[10px] sm:text-xs font-black uppercase px-2.5 py-1 rounded-md"
                        style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}
                      >
                        HOT!
                      </span>
                      <img
                        src={giftBoxImg}
                        alt="Bộ quà tặng độc quyền DrKam"
                        className="gentle-pulse w-full h-full object-contain mix-blend-multiply select-none pointer-events-none"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Bottom red strip */}
                  <div className="bg-primary text-white text-center py-2.5 sm:py-3 px-4">
                    <p className="text-sm sm:text-base font-black uppercase tracking-wide">
                      Bộ quà tặng chỉ có tại Facebook
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { src: giftImg1, alt: 'Bộ quà tặng DrKam — cạo lưỡi, xịt miệng, tăm chỉ nha khoa' },
                    { src: giftImg2, alt: 'Bộ quà tặng DrKam — súc miệng sinh học, kem đánh răng, bàn chải siêu mềm' },
                  ].map((img, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
                      className="relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
                    >
                      <span className="absolute top-3 left-3 z-10 bg-primary text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full shadow-md">
                        Tặng kèm
                      </span>
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-auto object-cover aspect-square group-hover:scale-[1.02] transition-transform duration-300"
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>

                <p className="text-xs text-on-surface-variant text-center italic">
                  ✦ Quà tặng áp dụng cho đơn đặt hàng qua Facebook chính hãng DrKam — số lượng có hạn
                </p>
              </motion.aside>

              {/* RIGHT — Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="order-2 lg:order-2 bg-white rounded-3xl shadow-xl border-t-4 border-primary p-6 sm:p-8 md:p-10"
              >

            {submitStatus === 'success' ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-700">Đặt hàng thành công!</h3>
                <p className="text-slate-500 text-sm">Chúng tôi sẽ liên hệ xác nhận đơn hàng trong thời gian sớm nhất.</p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-4 text-primary underline text-sm font-medium"
                >
                  Đặt thêm
                </button>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} noValidate>
                {/* Họ và Tên */}
                <div className="mb-2">
                  <input
                    type="text"
                    value={formName}
                    onChange={e => { setFormName(e.target.value); setFormErrors(p => ({ ...p, name: '' })); }}
                    placeholder="Họ và Tên"
                    className={`w-full px-4 py-3.5 border ${formErrors.name ? 'border-red-400' : 'border-slate-300'} text-base outline-none focus:border-primary transition-colors`}
                  />
                  {formErrors.name && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.name}</p>}
                </div>

                {/* Số điện thoại */}
                <div className="mb-2">
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={e => { setFormPhone(e.target.value); setFormErrors(p => ({ ...p, phone: '' })); }}
                    placeholder="Số điện thoại"
                    className={`w-full px-4 py-3.5 border ${formErrors.phone ? 'border-red-400' : 'border-slate-300'} text-base outline-none focus:border-primary transition-colors`}
                  />
                  {formErrors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.phone}</p>}
                </div>

                {/* Địa chỉ */}
                <div className="mb-5">
                  <input
                    type="text"
                    value={formAddress}
                    onChange={e => { setFormAddress(e.target.value); setFormErrors(p => ({ ...p, address: '' })); }}
                    placeholder="Địa chỉ"
                    className={`w-full px-4 py-3.5 border ${formErrors.address ? 'border-red-400' : 'border-slate-300'} text-base outline-none focus:border-primary transition-colors`}
                  />
                  {formErrors.address && <p className="text-red-500 text-xs mt-1 ml-1">{formErrors.address}</p>}
                </div>

                {/* Combo radio group */}
                <div className={`border ${formErrors.combo ? 'border-red-400' : 'border-slate-300'} mb-2 divide-y divide-slate-200`}>
                  {COMBOS.map(combo => (
                    <label
                      key={combo.id}
                      className={`flex items-start gap-3 px-4 py-3.5 cursor-pointer transition-colors ${formCombo === combo.id ? 'bg-red-50' : 'hover:bg-slate-50'}`}
                    >
                      <input
                        type="radio"
                        name="combo"
                        value={combo.id}
                        checked={formCombo === combo.id}
                        onChange={() => { setFormCombo(combo.id); setFormErrors(p => ({ ...p, combo: '' })); }}
                        className="mt-0.5 shrink-0 w-4 h-4 accent-primary"
                      />
                      <span className="text-sm leading-snug text-slate-700">
                        {combo.label}
                        {combo.hot && (
                          <span className="hot-badge ml-1.5 inline-block text-white text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wide align-middle">
                            HOT!
                          </span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
                {formErrors.combo && <p className="text-red-500 text-xs mb-4 ml-1">{formErrors.combo}</p>}

                {submitStatus === 'error' && (
                  <p className="text-red-500 text-sm text-center mb-4">
                    Có lỗi xảy ra. Vui lòng thử lại hoặc gọi hotline{' '}
                    <a href="tel:0986088610" className="font-bold">098.6088.610</a>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="soft-pulse mx-auto block bg-primary text-white py-3 px-10 rounded-full font-black text-base uppercase tracking-wider hover:bg-primary-container transition-colors mt-5 disabled:opacity-70 disabled:cursor-not-allowed disabled:animate-none"
                >
                  {isSubmitting ? 'Đang gửi...' : 'Đặt Mua'}
                </button>
              </form>
            )}
              </motion.div>

            </div>
          </div>
        </section>

        {/* Trust / Cam kết */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-container-max mx-auto px-5 lg:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center mb-10"
            >
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-[11px] font-black uppercase tracking-[0.18em] px-3 py-1.5 rounded-full mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                Cam Kết DrKam
              </span>
              <h3 className="text-2xl md:text-4xl font-black text-on-surface leading-snug mb-3">
                Nhận tư vấn 1:1 cùng <span className="text-primary">dược sĩ chuyên môn</span>
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-[15px] md:text-base">
                Quy trình minh bạch — bạn được kiểm tra sản phẩm trước khi thanh toán, đổi trả linh hoạt và giao hàng tận nơi trên toàn quốc.
              </p>
            </motion.div>

            <ul className="grid md:grid-cols-3 gap-4 md:gap-5 mb-8">
              {[
                { icon: ShieldCheck, label: 'Kiểm tra sản phẩm', value: 'Thanh toán' },
                { icon: Award,       label: 'Lỗi từ nhà sản xuất', value: 'Đổi trả lên tới 30 ngày' },
                { icon: Truck,       label: 'Nhận hàng toàn quốc', value: 'Giao trong 2 – 4 ngày' },
              ].map(({ icon: Icon, label, value }, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5 md:p-6 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7" strokeWidth={2.25} />
                  </div>
                  <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                    {label}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary" strokeWidth={2.5} />
                    <p className="font-black text-on-surface text-base md:text-lg">
                      {value}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.3 }}
              href="tel:0986088610"
              className="max-w-2xl mx-auto flex items-center gap-4 bg-on-surface text-white rounded-2xl p-5 sm:p-6 hover:bg-primary transition-colors group"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/60 font-semibold mb-0.5">Hotline 24/7</p>
                <p className="text-xl sm:text-2xl font-black tracking-tight">098.6088.610</p>
              </div>
              <ArrowRight className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
            </motion.a>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer id="footer" className="scroll-mt-20 bg-on-surface text-surface py-20 px-6 border-t border-white/5">
        <div className="max-w-container-max mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6 lg:col-span-2 max-w-md">
            <div className="flex items-center">
              <img src={logoImg} alt="DrKam" className="h-20 w-auto object-contain bg-white rounded-xl p-2" />
            </div>
            <p className="text-surface/60 leading-relaxed text-sm">
              Thương hiệu chăm sóc răng miệng y khoa ứng dụng công nghệ Postbiotic độc quyền — không cồn, không chất bảo quản, an toàn cho cả gia đình. Top 10 Thương Hiệu Uy Tín Quốc Gia 2024.
            </p>
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
              <li className="flex gap-3"><Phone className="w-4 h-4 shrink-0 text-primary" /> 098.6088.610</li>
              <li className="flex gap-3"><Mail className="w-4 h-4 shrink-0 text-primary" /> Drkamvietnam@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="max-w-container-max mx-auto mt-20 pt-8 border-t border-white/5 text-center text-xs text-surface/30">
          © {new Date().getFullYear()} DrKam Vietnam. All rights reserved. Sản phẩm được khuyên dùng bởi các bác sĩ nha khoa đầu ngành.
        </div>
      </footer>
    </div>
  );
}
