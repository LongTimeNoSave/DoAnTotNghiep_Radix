import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./App.css";

function App() {
  const [userEmail, setUserEmail] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('user_email');
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_email');
    setUserEmail('');
    navigate('/login');
  };

  return (
    <div className="bg-background text-on-surface font-body antialiased selection:bg-primary-fixed selection:text-primary min-h-screen flex flex-col">
      {/* Original body content */}
      
{/*  ==================== 1. TopNavBar (JSON Shared Component Anchor) ====================  */}
<header className="bg-surface-container-lowest/70 dark:bg-inverse-surface/70 backdrop-blur-[20px] saturate-[180%] border-b border-surface-variant/30 docked full-width top-0 sticky z-50 transition-all">
<div className="flex justify-between items-center w-full px-6 lg:px-12 max-w-7xl mx-auto h-20">
{/*  Brand Logo  */}
<a className="flex items-center gap-2 group flex-shrink-0" href="#">
<svg width="40" height="40" viewBox="0 0 100 100" fill="none" className="w-10 h-10 flex-shrink-0">
    <path d="M 20 28 A 38 38 0 0 0 20 72" stroke="#06B6D4" strokeWidth="5" strokeLinecap="round" />
    <path d="M 80 28 A 38 38 0 0 1 80 72" stroke="#06B6D4" strokeWidth="5" strokeLinecap="round" />
    <path d="M 32 38 A 22 22 0 0 0 32 62" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" />
    <path d="M 68 38 A 22 22 0 0 1 68 62" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" />
    <line x1="28" y1="28" x2="72" y2="72" stroke="#2563EB" strokeWidth="7" strokeLinecap="round" />
    <line x1="72" y1="28" x2="28" y2="72" stroke="#2563EB" strokeWidth="7" strokeLinecap="round" />
    <circle cx="50" cy="50" r="7" fill="#06B6D4" stroke="#0F172A" strokeWidth="2.5" />
</svg>
<span className="text-xl font-headline font-extrabold tracking-tight text-on-surface">RADI<span className="text-tertiary-fixed-dim font-black" style={{'color': '#06B6D4'}}>X</span></span>
</a>
{/*  Desktop Navigation Links  */}
<nav className="hidden md:flex flex-1 justify-center items-center gap-6 lg:gap-8 whitespace-nowrap">
<a className="text-primary dark:text-inverse-primary font-bold border-b-2 border-primary dark:border-inverse-primary pb-1 font-label text-sm hover:text-primary dark:hover:text-inverse-primary transition-colors duration-150" href="#services">
            Dịch vụ
          </a>
<a className="text-on-surface-variant dark:text-outline-variant font-medium font-label text-sm hover:text-primary dark:hover:text-inverse-primary transition-colors duration-150" href="#pricing">
            Bảng giá minh bạch
          </a>
<a className="text-on-surface-variant dark:text-outline-variant font-medium font-label text-sm hover:text-primary dark:hover:text-inverse-primary transition-colors duration-150" href="#become-pro">
            Trở thành Thợ đối tác
          </a>
<a className="text-on-surface-variant dark:text-outline-variant font-medium font-label text-sm hover:text-primary dark:hover:text-inverse-primary transition-colors duration-150 flex items-center gap-1" href="#warranty">
<span className="material-symbols-outlined text-base fill text-tertiary" data-icon="verified_user">verified_user</span>
            Bảo hành 30 ngày
          </a>
</nav>
{/*  Trailing Action Section  */}
<div className="flex items-center justify-end gap-4 flex-shrink-0">

{/*  Icon Actions  */}
<div className="flex items-center gap-1 border-x border-surface-variant px-2">
<button aria-label="Thông báo" className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-xl" data-icon="notifications">notifications</span>
</button>
<button aria-label="Trợ giúp" className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined text-xl" data-icon="help">help</span>
</button>
</div>
{/*  Auth Button  */}
{userEmail ? (
  <div className="relative">
    <button 
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className="flex items-center gap-1.5 text-sm font-label font-semibold text-primary hover:text-primary-fixed-dim px-3 py-2 transition-colors"
    >
      <span className="material-symbols-outlined text-xl" data-icon="account_circle">account_circle</span>
      {userEmail}
      <span className="material-symbols-outlined text-sm" data-icon="expand_more">expand_more</span>
    </button>
    
    {isDropdownOpen && (
      <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest border border-surface-variant rounded-xl shadow-lg py-2 z-50 flex flex-col overflow-hidden">
        <Link to="/profile" className="px-4 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container transition-colors text-left flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">person</span> Thông tin tài khoản
        </Link>
        <Link to="/change-password" className="px-4 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container transition-colors text-left flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">lock</span> Đổi mật khẩu
        </Link>
        <div className="border-t border-surface-variant my-1"></div>
        <button onClick={handleLogout} className="px-4 py-2.5 text-sm font-semibold text-error hover:bg-error/10 transition-colors text-left flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">logout</span> Đăng xuất
        </button>
      </div>
    )}
  </div>
) : (
  <Link to="/login" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-label font-semibold text-on-surface-variant hover:text-primary px-3 py-2 transition-colors">
    <span className="material-symbols-outlined text-xl" data-icon="account_circle">account_circle</span>
    Đăng nhập
  </Link>
)}
{/*  Trailing Primary Action CTA  */}
<a className="inline-flex items-center gap-2 bg-primary-container text-on-primary font-label font-semibold text-sm px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:bg-secondary transition-all active:scale-[0.97] duration-150 ease-out" href="#book-technician">
<span>Đặt thợ ngay</span>
<span className="material-symbols-outlined text-lg" data-icon="arrow_forward">arrow_forward</span>
</a>
</div>
</div>
</header>
{/*  ==================== 2. Hero Section & Booking Console ====================  */}
<section className="relative overflow-hidden bg-gradient-to-b from-surface-container-low via-background to-surface pt-12 pb-16 lg:pt-16 lg:pb-24">
{/*  Ambient Tech Glow  */}
<div className="absolute top-0 right-1/4 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
<div className="absolute bottom-10 left-1/10 w-80 h-80 bg-tertiary-fixed-dim/15 rounded-full blur-2xl pointer-events-none"></div>
<div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
{/*  Headline & Subtitle in 2-column Grid  */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
  {/*  Left: Advertisement Image  */}
  <div className="relative order-2 lg:order-1 flex justify-center">
    {/*  Vui lòng lưu file ảnh banner của bạn với tên "banner.png" trong cùng thư mục  */}
    <img src="/banner.jpg" alt="Quảng cáo FixMate" className="w-full max-w-md h-auto object-cover rounded-3xl drop-shadow-2xl" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x600/png?text=Hinh+Anh+Quang+Cao'; }}/>
  </div>
  
  {/*  Right: Text Content (Brand Slogan)  */}
  <div className="text-left space-y-6 order-1 lg:order-2 flex flex-col justify-center">
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-black text-on-surface tracking-tighter leading-[1.05]" style={{'fontOpticalSizing': 'auto'}}>
      RADI<span className="text-tertiary-fixed-dim" style={{'color': '#06B6D4'}}>X</span> <br/>
      <span className="text-primary-container">GỌI THỢ DỄ DÀNG</span>
    </h1>
    <p className="text-xl sm:text-2xl font-bold text-on-surface-variant leading-relaxed uppercase tracking-wide">
      Nhanh chóng - Uy tín - Chuyên nghiệp
    </p>
    <div className="flex flex-wrap items-center gap-4 pt-4">
      <a href="#book-technician" className="px-8 py-3.5 bg-primary-container text-on-primary rounded-full font-headline font-bold text-base hover:bg-secondary transition-all active:scale-[0.97] duration-150 ease-out shadow-lg shadow-primary/30 flex items-center gap-2">
        <span className="material-symbols-outlined" data-icon="calendar_month">calendar_month</span> Đặt lịch
      </a>
      <a href="tel:19008888" className="px-8 py-3.5 bg-emerald-500 text-white rounded-full font-headline font-bold text-base hover:bg-emerald-600 transition-all active:scale-[0.97] duration-150 ease-out flex items-center gap-2 shadow-lg shadow-emerald-500/30">
        <span className="material-symbols-outlined" data-icon="call">call</span> 1800 8122
      </a>
    </div>
  </div>
</div>
{/*  Hero Search Console Card  */}
<div className="mt-10 max-w-5xl mx-auto bg-surface-container-lowest/70 backdrop-blur-2xl saturate-150 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-primary/10 border border-surface-variant/50">
<form className="space-y-6" id="hero-book-form" onsubmit="event.preventDefault();">
{/*  Mode Tabs (Quick Select)  */}
<div className="flex items-center gap-3 pb-2 border-b border-surface-container">
<button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-label font-bold bg-primary text-on-primary shadow-sm" type="button">
<span className="material-symbols-outlined text-base" data-icon="home_repair_service">home_repair_service</span>
              Đặt thợ sửa chữa gia dụng
            </button>
<button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-label font-medium text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors" type="button">
<span className="material-symbols-outlined text-base" data-icon="shield">shield</span>
              Bảo trì định kỳ trọn gói
            </button>
</div>
{/*  Input Fields Grid  */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
{/*  Category Dropdown (4 Cols)  */}
<div className="md:col-span-4 relative">
<label className="block text-xs font-label font-semibold text-outline uppercase tracking-wider mb-1.5" htmlFor="service-category">
                Vấn đề cần khắc phục
              </label>
<div className="relative">
<span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-primary">
<span className="material-symbols-outlined text-xl" data-icon="construction">construction</span>
</span>
<select className="w-full pl-10 pr-9 py-3 bg-surface-container-low hover:bg-surface-container border border-surface-variant rounded-xl font-label text-sm text-on-surface font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ease-out hover:shadow-md focus:shadow-lg" id="service-category">
<option value="electric">Sửa điện dân dụng (Chập cháy, ổ cắm)</option>
<option value="plumbing">Sửa ống nước &amp; rò rỉ, máy bơm</option>
<option selected="" value="hvac">Sửa điều hòa, tủ lạnh, điện lạnh</option>
<option value="appliances">Sửa máy giặt &amp; thiết bị gia dụng</option>
<option value="locksmith">Khóa cửa, nhôm kính &amp; bản lề</option>
<option value="waterproofing">Chống thấm dột trần ban công</option>
</select>
</div>
</div>
{/*  Location Input (5 Cols)  */}
<div className="md:col-span-5 relative">
<label className="block text-xs font-label font-semibold text-outline uppercase tracking-wider mb-1.5" htmlFor="location-input">
                Khu vực cần thợ tới
              </label>
<div className="relative">
<span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-primary">
<span className="material-symbols-outlined text-xl" data-icon="location_on">location_on</span>
</span>
<input className="w-full pl-10 pr-24 py-3 bg-surface-container-low border border-surface-variant rounded-xl font-label text-sm text-on-surface font-medium placeholder:text-outline focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 ease-out hover:shadow-md focus:shadow-lg" id="location-input" placeholder="Nhập quận, huyện hoặc đường của bạn..." type="text" value="Số 88 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM"/>
<button className="absolute inset-y-1.5 right-1.5 px-2.5 bg-surface-container text-primary hover:bg-primary-fixed rounded-lg text-xs font-label font-semibold flex items-center gap-1 transition-colors" type="button">
<span className="material-symbols-outlined text-sm" data-icon="my_location">my_location</span>
                  GPS
                </button>
</div>
</div>
{/*  Submit Button (3 Cols)  */}
<div className="md:col-span-3 flex flex-col justify-end">
<label className="invisible hidden md:block text-xs font-label font-semibold mb-1.5">Action</label>
<button className="w-full py-3 px-4 bg-primary-container hover:bg-secondary text-on-primary font-headline font-bold text-sm rounded-xl shadow-md shadow-primary/30 flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-[0.97] duration-150 ease-out" type="submit">
<span className="material-symbols-outlined text-xl" data-icon="radar">radar</span>
<span>Tìm thợ quanh đây</span>
</button>
</div>
</div>
{/*  Time Urgency Selector  */}
<div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs font-label">
<div className="flex items-center gap-3">
<span className="text-outline font-medium">Thời gian phục vụ:</span>
<label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-fixed text-primary font-bold">
<input checked="" className="text-primary focus:ring-primary h-3.5 w-3.5" name="service-time" type="radio"/>
<span>Ngay bây giờ (Cấp tốc 15-30p)</span>
</label>
<label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface font-medium">
<input className="text-primary focus:ring-primary h-3.5 w-3.5" name="service-time" type="radio"/>
<span>Đặt theo lịch hẹn</span>
</label>
</div>
<div className="flex items-center gap-2 text-outline-variant text-[13px]">
<span className="material-symbols-outlined text-base fill text-emerald-600" data-icon="check_circle">check_circle</span>
<span>42 thợ trực tuyến tại khu vực của bạn</span>
</div>
</div>
</form>
</div>
{/*  Trust Badges Strip (3 Columns)  */}
<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
<div className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-lowest/60 border border-surface-variant/50 backdrop-blur-[20px] saturate-[180%]">
<div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0">
<span className="material-symbols-outlined text-2xl fill" data-icon="workspace_premium">workspace_premium</span>
</div>
<div>
<h2 className="font-headline font-bold text-sm text-on-surface">100% Thợ có chứng chỉ tay nghề</h2>
<p className="text-xs text-on-surface-variant mt-0.5">Thẩm định thực hành, lý lịch tư pháp đầy đủ.</p>
</div>
</div>
<div className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-lowest/60 border border-surface-variant/50 backdrop-blur-[20px] saturate-[180%]">
<div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0">
<span className="material-symbols-outlined text-2xl fill" data-icon="price_check">price_check</span>
</div>
<div>
<h2 className="font-headline font-bold text-sm text-on-surface">Giá niêm yết công khai</h2>
<p className="text-xs text-on-surface-variant mt-0.5">Báo giá trước khi làm, tuyệt đối không phụ phí.</p>
</div>
</div>
<div className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-lowest/60 border border-surface-variant/50 backdrop-blur-[20px] saturate-[180%]">
<div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0">
<span className="material-symbols-outlined text-2xl fill" data-icon="verified">verified</span>
</div>
<div>
<h2 className="font-headline font-bold text-sm text-on-surface">Bảo hành 30 ngày an tâm</h2>
<p className="text-xs text-on-surface-variant mt-0.5">Sửa lại miễn phí hoặc hoàn tiền 100% nếu sự cố lặp lại.</p>
</div>
</div>
</div>
</div>
</section>
{/*  ==================== 3. Danh mục dịch vụ nổi bật (Popular Services Grid) ====================  */}
<section className="py-20 bg-surface-container-lowest border-t border-surface-variant" id="services">
<div className="max-w-7xl mx-auto px-6 lg:px-12">
{/*  Section Header  */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
<div>
<span className="text-xs font-label font-bold text-primary tracking-widest uppercase">DANH MỤC THIẾT YẾU</span>
<h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-on-surface mt-1 tracking-tight" style={{'fontOpticalSizing': 'auto'}}>
            Dịch vụ sửa chữa phổ biến
          </h2>
<p className="text-on-surface-variant text-sm mt-1.5">
            Bảng giá khởi điểm công khai, thợ nhận việc ngay trong 15 phút.
          </p>
</div>
<a className="inline-flex items-center gap-1.5 text-sm font-label font-bold text-primary hover:text-secondary group" href="#all-services">
<span>Xem tất cả 48 dịch vụ</span>
<span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform" data-icon="chevron_right">chevron_right</span>
</a>
</div>
{/*  6 Service Cards Bento Grid  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{/*  Card 1: Sửa điện  */}
<div className="group bg-surface rounded-2xl p-6 border border-surface-variant/80 hover:border-primary transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-[0.98] flex flex-col justify-between relative overflow-hidden">
<span className="absolute top-4 right-4 bg-error text-on-error text-[10px] font-label font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wide">Hot</span>
<div>
<div className="w-14 h-14 rounded-xl bg-primary-fixed flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-3xl" data-icon="electrical_services">electrical_services</span>
</div>
<h3 className="text-lg font-headline font-bold text-on-surface group-hover:text-primary transition-colors">
              Sửa chữa điện dân dụng
            </h3>
<p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              Xử lý chập cháy Aptomat, thay ổ cắm âm tường, cân pha, đi dây nổi an toàn, lắp đặt hệ thống đèn chiếu sáng gia đình.
            </p>
</div>
<div className="mt-6 pt-4 border-t border-surface-variant flex items-center justify-between">
<div>
<span className="text-[11px] text-outline block">Giá niêm yết từ:</span>
<span className="text-base font-headline font-black text-primary">150.000 đ</span>
</div>
<button className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label text-xs font-bold hover:bg-secondary transition-colors" type="button">
              Đặt dịch vụ này
            </button>
</div>
</div>
{/*  Card 2: Điện lạnh  */}
<div className="group bg-surface rounded-2xl p-6 border border-surface-variant/80 hover:border-primary transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-[0.98] flex flex-col justify-between relative overflow-hidden">
<span className="absolute top-4 right-4 bg-primary text-on-primary text-[10px] font-label font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wide">Đặt nhiều</span>
<div>
<div className="w-14 h-14 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary mb-4 group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-3xl" data-icon="ac_unit">ac_unit</span>
</div>
<h3 className="text-lg font-headline font-bold text-on-surface group-hover:text-primary transition-colors">
              Sửa chữa điện lạnh &amp; Điều hòa
            </h3>
<p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              Vệ sinh bảo dưỡng máy lạnh, nạp gas R32/R410A, xử lý chảy nước máng thoát, sửa tủ lạnh không đông đá, hỏng block.
            </p>
</div>
<div className="mt-6 pt-4 border-t border-surface-variant flex items-center justify-between">
<div>
<span className="text-[11px] text-outline block">Giá niêm yết từ:</span>
<span className="text-base font-headline font-black text-primary">200.000 đ</span>
</div>
<button className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label text-xs font-bold hover:bg-secondary transition-colors" type="button">
              Đặt dịch vụ này
            </button>
</div>
</div>
{/*  Card 3: Ống nước & Vệ sinh  */}
<div className="group bg-surface rounded-2xl p-6 border border-surface-variant/80 hover:border-primary transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-[0.98] flex flex-col justify-between">
<div>
<div className="w-14 h-14 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary mb-4 group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-3xl" data-icon="plumbing">plumbing</span>
</div>
<h3 className="text-lg font-headline font-bold text-on-surface group-hover:text-primary transition-colors">
              Sửa ống nước &amp; Thiết bị vệ sinh
            </h3>
<p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              Thông tắc chậu rửa, đường ống thoát sàn, dò tìm rò rỉ âm tường công nghệ cao, sửa chữa lắp đặt máy bơm tăng áp.
            </p>
</div>
<div className="mt-6 pt-4 border-t border-surface-variant flex items-center justify-between">
<div>
<span className="text-[11px] text-outline block">Giá niêm yết từ:</span>
<span className="text-base font-headline font-black text-primary">180.000 đ</span>
</div>
<button className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label text-xs font-bold hover:bg-secondary transition-colors" type="button">
              Đặt dịch vụ này
            </button>
</div>
</div>
{/*  Card 4: Đồ gia dụng  */}
<div className="group bg-surface rounded-2xl p-6 border border-surface-variant/80 hover:border-primary transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-[0.98] flex flex-col justify-between">
<div>
<div className="w-14 h-14 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface mb-4 group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-3xl" data-icon="local_laundry_service">local_laundry_service</span>
</div>
<h3 className="text-lg font-headline font-bold text-on-surface group-hover:text-primary transition-colors">
              Sửa chữa đồ gia dụng lớn
            </h3>
<p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              Sửa máy giặt rung lắc/không vắt, bình nóng lạnh rò điện, máy lọc nước RO, lò vi sóng, bếp từ đôi lỗi mạch điều khiển.
            </p>
</div>
<div className="mt-6 pt-4 border-t border-surface-variant flex items-center justify-between">
<div>
<span className="text-[11px] text-outline block">Giá niêm yết từ:</span>
<span className="text-base font-headline font-black text-primary">160.000 đ</span>
</div>
<button className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label text-xs font-bold hover:bg-secondary transition-colors" type="button">
              Đặt dịch vụ này
            </button>
</div>
</div>
{/*  Card 5: Khóa & Cửa sắt  */}
<div className="group bg-surface rounded-2xl p-6 border border-surface-variant/80 hover:border-primary transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-[0.98] flex flex-col justify-between">
<div>
<div className="w-14 h-14 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface mb-4 group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-3xl" data-icon="lock_open">lock_open</span>
</div>
<h3 className="text-lg font-headline font-bold text-on-surface group-hover:text-primary transition-colors">
              Sửa khóa, bản lề &amp; Cửa nhôm kính
            </h3>
<p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              Mở khóa khẩn cấp 24/7, thay ổ khóa vân tay smartlock, chỉnh bản lề thủy lực bị xệ cánh, thay ray cửa cuốn tự động.
            </p>
</div>
<div className="mt-6 pt-4 border-t border-surface-variant flex items-center justify-between">
<div>
<span className="text-[11px] text-outline block">Giá niêm yết từ:</span>
<span className="text-base font-headline font-black text-primary">120.000 đ</span>
</div>
<button className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label text-xs font-bold hover:bg-secondary transition-colors" type="button">
              Đặt dịch vụ này
            </button>
</div>
</div>
{/*  Card 6: Chống thấm dột  */}
<div className="group bg-surface rounded-2xl p-6 border border-surface-variant/80 hover:border-primary transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-[0.98] flex flex-col justify-between">
<div>
<div className="w-14 h-14 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary mb-4 group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-3xl" data-icon="roofing">roofing</span>
</div>
<h3 className="text-lg font-headline font-bold text-on-surface group-hover:text-primary transition-colors">
              Thấm dột trần, sàn &amp; Ban công
            </h3>
<p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              Xử lý nứt trần bê tông, chống thấm cổ ống hộp kỹ thuật, màng khò chống dột mái tôn, quét sơn epoxy chống ẩm mốc phòng tắm.
            </p>
</div>
<div className="mt-6 pt-4 border-t border-surface-variant flex items-center justify-between">
<div>
<span className="text-[11px] text-outline block">Chi phí khảo sát:</span>
<span className="text-base font-headline font-black text-emerald-600">Miễn phí 100%</span>
</div>
<button className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label text-xs font-bold hover:bg-secondary transition-colors" type="button">
              Đặt khảo sát
            </button>
</div>
</div>
</div>
</div>
</section>
{/*  ==================== 4. Live Proximity Radar Section (Thuật toán quét thợ) ====================  */}
<section className="py-20 bg-background relative overflow-hidden">
<div className="max-w-7xl mx-auto px-6 lg:px-12">
<div className="mb-12 text-center max-w-3xl mx-auto">
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label text-xs font-bold mb-3">
<span className="material-symbols-outlined text-base fill text-tertiary" data-icon="explore">explore</span>
          GPS DISPATCH ENGINE
        </div>
<h2 className="text-3xl font-headline font-black text-on-surface tracking-tight">
          Thuật toán kết nối thời gian thực - Tìm thợ gần bạn nhất
        </h2>
<p className="text-sm text-on-surface-variant mt-2">
          Hệ thống FixMate tự động định vị và điều phối kỹ thuật viên chuyên môn cao đang rảnh việc gần bạn nhất, rút ngắn thời gian di chuyển còn dưới 15 phút.
        </p>
</div>
{/*  Radar 2 Columns Layout  */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
{/*  Left: Radar Screen Simulation (7 Cols)  */}
<div className="lg:col-span-7 bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-surface-variant shadow-lg relative min-h-[480px] flex items-center justify-center overflow-hidden">
{/*  Background Grid Lines  */}
<div className="absolute inset-0 bg-[radial-gradient(#e0e3e5_1px,transparent_1px)] [background-size:24px_24px] opacity-70"></div>
{/*  Radar Rings & Pulsing Waves  */}
<div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-primary/20 flex items-center justify-center">
<div className="absolute w-64 h-64 rounded-full border border-primary/25"></div>
<div className="absolute w-40 h-40 rounded-full border border-primary/30"></div>
{/*  Animated Concentric Waves  */}
<div className="radar-wave-1 absolute w-48 h-48 rounded-full border-2 border-primary/40 bg-primary/5 pointer-events-none"></div>
<div className="radar-wave-2 absolute w-48 h-48 rounded-full border-2 border-primary/40 bg-primary/5 pointer-events-none"></div>
<div className="radar-wave-3 absolute w-48 h-48 rounded-full border-2 border-primary/40 bg-primary/5 pointer-events-none"></div>
{/*  Rotating Radar Sweep Beam  */}
<div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg_at_50%_50%,rgba(29,78,216,0.15)_0deg,transparent_60deg)] animate-[spin_4s_linear_infinite] pointer-events-none"></div>
{/*  Central User Node  */}
<div className="relative z-20 flex flex-col items-center">
<div className="w-12 h-12 rounded-full bg-primary text-on-primary shadow-lg shadow-primary/40 flex items-center justify-center ring-4 ring-primary-fixed">
<span className="material-symbols-outlined text-2xl" data-icon="person_pin_circle">person_pin_circle</span>
</div>
<div className="mt-2 px-3 py-1 rounded-full bg-on-surface text-surface-container-lowest text-[11px] font-label font-bold shadow-md whitespace-nowrap">
                Vị trí của bạn (Quận 1, TP.HCM)
              </div>
</div>
{/*  Node 1: Thợ Tuấn (Top Right - 800m)  */}
<div className="absolute top-8 right-6 z-30 flex items-center gap-2 animate-bounce [animation-duration:3s]">
<div className="w-9 h-9 rounded-full bg-surface-container-lowest border-2 border-emerald-500 shadow-md flex items-center justify-center text-emerald-600">
<span className="material-symbols-outlined text-lg fill" data-icon="engineering">engineering</span>
</div>
<div className="bg-surface-container-lowest/60 backdrop-blur-[20px] saturate-[180%] px-3 py-1.5 rounded-xl border border-surface-variant/50 shadow-md">
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-emerald-500"></span>
<span className="text-xs font-headline font-bold text-on-surface">Thợ Tuấn (Điện lạnh)</span>
</div>
<div className="text-[10px] font-label text-outline mt-0.5">800m • Có mặt sau 12p</div>
</div>
</div>
{/*  Node 2: Thợ Hùng (Bottom Left - 1.2km)  */}
<div className="absolute bottom-10 left-4 z-30 flex items-center gap-2 animate-bounce [animation-duration:3.6s]">
<div className="w-9 h-9 rounded-full bg-surface-container-lowest border-2 border-emerald-500 shadow-md flex items-center justify-center text-emerald-600">
<span className="material-symbols-outlined text-lg fill" data-icon="plumbing">plumbing</span>
</div>
<div className="bg-surface-container-lowest/60 backdrop-blur-[20px] saturate-[180%] px-3 py-1.5 rounded-xl border border-surface-variant/50 shadow-md">
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-emerald-500"></span>
<span className="text-xs font-headline font-bold text-on-surface">Thợ Hùng (Điện nước)</span>
</div>
<div className="text-[10px] font-label text-outline mt-0.5">1.2km • Có mặt sau 18p</div>
</div>
</div>
{/*  Node 3: Thợ Minh (Top Left - 1.5km)  */}
<div className="absolute top-16 left-6 z-30 flex items-center gap-2 animate-bounce [animation-duration:4s]">
<div className="w-9 h-9 rounded-full bg-surface-container-lowest border-2 border-amber-500 shadow-md flex items-center justify-center text-amber-600">
<span className="material-symbols-outlined text-lg fill" data-icon="handyman">handyman</span>
</div>
<div className="bg-surface-container-lowest/60 backdrop-blur-[20px] saturate-[180%] px-3 py-1.5 rounded-xl border border-surface-variant/50 shadow-md">
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-amber-500"></span>
<span className="text-xs font-headline font-bold text-on-surface">Thợ Minh (Gia dụng)</span>
</div>
<div className="text-[10px] font-label text-outline mt-0.5">1.5km • Có mặt sau 20p</div>
</div>
</div>
</div>
{/*  Bottom status chip  */}
<div className="absolute bottom-4 left-6 right-6 flex justify-between items-center bg-surface-container/60 backdrop-blur-[20px] saturate-[180%] px-4 py-2 rounded-xl text-xs font-label shadow-sm">
<span className="text-outline">Đang kết nối vệ tinh GPS &amp; Trạm điều phối</span>
<span className="text-emerald-700 font-bold flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Độ chính xác: ±5 mét
            </span>
</div>
</div>
{/*  Right: Live System Metrics (5 Cols)  */}
<div className="lg:col-span-5 space-y-6">
<div className="grid grid-cols-2 gap-4">
<div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-variant shadow-sm">
<span className="text-xs font-label text-outline block">Thợ trực sẵn sàng (3km)</span>
<div className="flex items-baseline gap-2 mt-2">
<span className="text-3xl font-headline font-black text-primary">42</span>
<span className="text-xs font-label font-bold text-emerald-600 flex items-center">
<span className="material-symbols-outlined text-sm" data-icon="trending_up">trending_up</span> Online
                </span>
</div>
<p className="text-[11px] text-on-surface-variant mt-1">Phủ kín các phường trung tâm</p>
</div>
<div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-variant shadow-sm">
<span className="text-xs font-label text-outline block">Thời gian phản hồi TB</span>
<div className="flex items-baseline gap-2 mt-2">
<span className="text-3xl font-headline font-black text-on-surface">45</span>
<span className="text-sm font-label font-bold text-outline">Giây</span>
</div>
<p className="text-[11px] text-on-surface-variant mt-1">Ghép cặp tự động tức thì</p>
</div>
<div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-variant shadow-sm">
<span className="text-xs font-label text-outline block">Thời gian có mặt tại cửa</span>
<div className="flex items-baseline gap-2 mt-2">
<span className="text-3xl font-headline font-black text-on-surface">15-25</span>
<span className="text-sm font-label font-bold text-outline">Phút</span>
</div>
<p className="text-[11px] text-on-surface-variant mt-1">Cam kết đúng giờ hẹn</p>
</div>
<div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-variant shadow-sm">
<span className="text-xs font-label text-outline block">Tỷ lệ hài lòng thực tế</span>
<div className="flex items-baseline gap-2 mt-2">
<span className="text-3xl font-headline font-black text-emerald-600">98.7%</span>
</div>
<p className="text-[11px] text-on-surface-variant mt-1">Dựa trên 240.000 lượt đặt</p>
</div>
</div>
{/*  Interactive Test Box  */}
<div className="bg-primary-fixed/40 p-6 rounded-2xl border border-primary/20 space-y-3">
<h4 className="text-sm font-headline font-bold text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary fill" data-icon="location_searching">location_searching</span>
              Kiểm tra độ sẵn sàng thợ tại phố của bạn
            </h4>
<div className="flex gap-2">
<input className="flex-1 px-3.5 py-2.5 bg-surface-container-lowest border border-surface-variant rounded-xl text-xs font-label text-on-surface focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Nhập tên đường, số nhà..." type="text" value="Trần Hưng Đạo, Quận 5"/>
<button className="px-4 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-label font-bold hover:bg-secondary transition-colors whitespace-nowrap" type="button">
                Quét ngay
              </button>
</div>
<p className="text-[11px] text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-sm text-emerald-600" data-icon="check">check</span>
              Khu vực này hiện có 8 thợ rảnh trong bán kính 1.5km
            </p>
</div>
</div>
</div>
</div>
</section>
{/*  ==================== 5. Top Thợ nổi bật & Uy tín (Featured Technicians) ====================  */}
<section className="py-20 bg-surface-container-lowest border-t border-surface-variant">
<div className="max-w-7xl mx-auto px-6 lg:px-12">
{/*  Section Header & Filter Tabs  */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
<div>
<span className="text-xs font-label font-bold text-primary tracking-widest uppercase">ĐỘI NGŨ TIN CẬY</span>
<h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-on-surface mt-1 tracking-tight" style={{'fontOpticalSizing': 'auto'}}>
            Đội ngũ Thợ tiêu biểu được khách hàng đánh giá cao nhất
          </h2>
<p className="text-sm text-on-surface-variant mt-1.5">
            100% thợ có hồ sơ tư pháp rõ ràng, kinh nghiệm trên 5 năm và vượt qua bài thi tay nghề thực tế.
          </p>
</div>
{/*  Filter Tabs  */}
<div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none font-label text-xs">
<button className="px-4 py-2 rounded-full bg-primary text-on-primary font-bold shadow-md hover:shadow-lg whitespace-nowrap transition-all duration-150 ease-out active:scale-[0.95] hover:-translate-y-0.5" type="button">
            Tất cả thợ
          </button>
<button className="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high font-medium whitespace-nowrap transition-all duration-150 ease-out active:scale-[0.95] hover:-translate-y-0.5" type="button">
            Thợ Điện
          </button>
<button className="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high font-medium whitespace-nowrap transition-all duration-150 ease-out active:scale-[0.95] hover:-translate-y-0.5" type="button">
            Thợ Nước
          </button>
<button className="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high font-medium whitespace-nowrap transition-all duration-150 ease-out active:scale-[0.95] hover:-translate-y-0.5" type="button">
            Thợ Điện lạnh
          </button>
<button className="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high font-medium whitespace-nowrap transition-all duration-150 ease-out active:scale-[0.95] hover:-translate-y-0.5" type="button">
            Thợ Khóa
          </button>
</div>
</div>
{/*  4 Technician Cards Grid  */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
{/*  Technician 1  */}
<div className="bg-surface rounded-2xl border border-surface-variant/80 overflow-hidden hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out active:translate-y-0 active:scale-[0.98] flex flex-col justify-between">
<div>
{/*  Image Area  */}
<div className="relative h-56 bg-surface-container">
<img className="w-full h-full object-cover" data-alt="A professional male Vietnamese technician wearing a crisp royal blue FixMate uniform polo shirt and safety badge, smiling warmly at the camera with arms crossed. Bright daylight studio setting with modern neutral background, sharp focus, vibrant and clean corporate aesthetic representing reliability and high technical craftsmanship." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBc3av-BNqlA7o-GfBmNPITlOObRL1kp2IKbc52rybeD7Lxcs3KEFU-bLwRozz03rQ4J0IJ41n3d7cg_p-AAzVWD3JXoptb71G9h92FRk7WNKg_1cbk1n6ZJ6q2Z3g2Fwz2ExoJ23K1UfsY6blehMrc7kb1FvUK_EwgH3JZJzwyh4oBbv-YWvUhDWIHEv-NZs5ybY4ABbsIEtBuDE7XEheiNzcefgCs_-R8jYV-Qkglz79wPcHx308yHG7ugfPVdEz-lL8jvLd7YEew"/>
{/*  Live Availability Badge  */}
<div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-500 text-on-primary text-[10px] font-label font-bold flex items-center gap-1 shadow-sm">
<span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                Đang rảnh - Nhận ngay
              </div>
<div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-surface-container-lowest/60 backdrop-blur-[20px] saturate-[180%] text-on-surface text-xs font-headline font-bold flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-amber-500 fill text-sm" data-icon="star">star</span>
                4.95 (1.240 việc)
              </div>
</div>
{/*  Content Area  */}
<div className="p-5">
<div className="flex items-center gap-1.5 text-xs text-outline font-label mb-1">
<span className="material-symbols-outlined text-sm text-primary" data-icon="location_on">location_on</span>
<span>Phụ trách: Quận 1, Quận 3, Bình Thạnh</span>
</div>
<h3 className="text-base font-headline font-bold text-on-surface">Nguyễn Văn Tuấn</h3>
<p className="text-xs text-primary font-medium mt-0.5">Kỹ sư Điện Lạnh • 9 năm kinh nghiệm</p>
{/*  Badges  */}
<div className="flex flex-wrap gap-1.5 mt-3">
<span className="text-[10px] font-label font-semibold px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">Chứng chỉ Thợ Giỏi</span>
<span className="text-[10px] font-label font-semibold px-2 py-0.5 rounded bg-primary-fixed text-primary">Top 1 Đối tác 2024</span>
</div>
</div>
</div>
<div className="px-5 pb-5">
<button className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label text-xs font-bold transition-all duration-150 ease-out active:scale-[0.97] text-center" type="button">
              Xem hồ sơ &amp; Đặt lịch
            </button>
</div>
</div>
{/*  Technician 2  */}
<div className="bg-surface rounded-2xl border border-surface-variant/80 overflow-hidden hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out active:translate-y-0 active:scale-[0.98] flex flex-col justify-between">
<div>
{/*  Image Area  */}
<div className="relative h-56 bg-surface-container">
<img className="w-full h-full object-cover" data-alt="A skilled middle-aged technician in a FixMate dark cobalt uniform carrying a clean tool case, confident and friendly expression. Well-lit clean indoor workshop environment with organized wrenches and multimeters in soft bokeh, conveying deep experience, trustworthiness, and technical expertise in household plumbing." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2T7nVkIWYdCWEhFYE3uIuTz0LMRLwrt5vwKfqUImpbMjPHwXGBN0xNITgcMpulo9hM_rGmHcCIsxC1wRou_qw_N5RKb9bEXB9GW5t-07-vTUobwsKjklQKmwyoY9CoeDglCdLkcUdE6aHiSr0HW2I8oAYkzh3GmKaQi2J2BQ0TXBB2pokPzy19NI-TSKniY6LXdI0YuZ0m0dUdxOGedc9j60Soh86eDuj1HZr3IC6Z4th3y_h5T70qu8vod36DLhRssWQilUgiDMq"/>
{/*  Live Availability Badge  */}
<div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-500 text-on-primary text-[10px] font-label font-bold flex items-center gap-1 shadow-sm">
<span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                Đang rảnh - Nhận ngay
              </div>
<div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-surface-container-lowest/60 backdrop-blur-[20px] saturate-[180%] text-on-surface text-xs font-headline font-bold flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-amber-500 fill text-sm" data-icon="star">star</span>
                4.98 (2.150 việc)
              </div>
</div>
{/*  Content Area  */}
<div className="p-5">
<div className="flex items-center gap-1.5 text-xs text-outline font-label mb-1">
<span className="material-symbols-outlined text-sm text-primary" data-icon="location_on">location_on</span>
<span>Phụ trách: Quận 7, Nhà Bè, Quận 4</span>
</div>
<h3 className="text-base font-headline font-bold text-on-surface">Trần Quốc Hùng</h3>
<p className="text-xs text-primary font-medium mt-0.5">Chuyên gia Thủy Lực • 12 năm kinh nghiệm</p>
{/*  Badges  */}
<div className="flex flex-wrap gap-1.5 mt-3">
<span className="text-[10px] font-label font-semibold px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">Lý lịch đã xác minh</span>
<span className="text-[10px] font-label font-semibold px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">Thiết bị dò âm tường</span>
</div>
</div>
</div>
<div className="px-5 pb-5">
<button className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label text-xs font-bold transition-all duration-150 ease-out active:scale-[0.97] text-center" type="button">
              Xem hồ sơ &amp; Đặt lịch
            </button>
</div>
</div>
{/*  Technician 3  */}
<div className="bg-surface rounded-2xl border border-surface-variant/80 overflow-hidden hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out active:translate-y-0 active:scale-[0.98] flex flex-col justify-between">
<div>
{/*  Image Area  */}
<div className="relative h-56 bg-surface-container">
<img className="w-full h-full object-cover" data-alt="A young energetic Vietnamese female electronics specialist wearing FixMate branded navy vest holding a digital multimeter. Modern clean laboratory setting with soft diffuse lighting, polite and focused demeanour, exuding sharp technical proficiency, meticulous precision, and trustworthy customer care." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1xy2wnLZ8mdaec8dr1dHv8o04x7i9tAGU1xr4mwd4p1a2i10Wi5LByxe4SSCD69JOFCuQz3VXb3Oyc_kQ3JU6FkivURGxtIgmQ63bJfN4scvvunjs5HxbZYmtojik8XVHMSM22iiMYLR4E6FhHj4mXrlLzULDd0udLazy997LMqmfGBRlKvDZsOUOCxTo0r_axHiEzuP59COf2vzyCYgLO82E_SJ6TOEkXShztbikGHZ27u3LFZT7WzChJQYRtPReamn0Nknw60wJ"/>
{/*  Live Availability Badge  */}
<div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-500 text-on-primary text-[10px] font-label font-bold flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-xs" data-icon="schedule">schedule</span>
                Có mặt sau 20 phút
              </div>
<div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-surface-container-lowest/60 backdrop-blur-[20px] saturate-[180%] text-on-surface text-xs font-headline font-bold flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-amber-500 fill text-sm" data-icon="star">star</span>
                4.92 (980 việc)
              </div>
</div>
{/*  Content Area  */}
<div className="p-5">
<div className="flex items-center gap-1.5 text-xs text-outline font-label mb-1">
<span className="material-symbols-outlined text-sm text-primary" data-icon="location_on">location_on</span>
<span>Phụ trách: Cầu Giấy, Nam Từ Liêm (HN)</span>
</div>
<h3 className="text-base font-headline font-bold text-on-surface">Lê Hoàng Nam</h3>
<p className="text-xs text-primary font-medium mt-0.5">Kỹ sư Điện tử gia dụng • 7 năm kinh nghiệm</p>
{/*  Badges  */}
<div className="flex flex-wrap gap-1.5 mt-3">
<span className="text-[10px] font-label font-semibold px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">Chứng nhận Inverter</span>
<span className="text-[10px] font-label font-semibold px-2 py-0.5 rounded bg-primary-fixed text-primary">Phản hồi 5 sao 99%</span>
</div>
</div>
</div>
<div className="px-5 pb-5">
<button className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label text-xs font-bold transition-all duration-150 ease-out active:scale-[0.97] text-center" type="button">
              Xem hồ sơ &amp; Đặt lịch
            </button>
</div>
</div>
{/*  Technician 4  */}
<div className="bg-surface rounded-2xl border border-surface-variant/80 overflow-hidden hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out active:translate-y-0 active:scale-[0.98] flex flex-col justify-between">
<div>
{/*  Image Area  */}
<div className="relative h-56 bg-surface-container">
<img className="w-full h-full object-cover" data-alt="A dedicated experienced locksmith wearing FixMate work shirt smiling warmly next to an organized security lock testing stand. Bright modern architectural background, professional lighting highlights, calm and dependable expression, illustrating strict safety credentials, verified identity, and reliable locksmith services." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjCCd0P8Vb8RcuOglSnVugUIO4OzbbM-TMNjNGEM0-Zu6_IqMVcRQIZUl7hXmnf9fDIYO4BMpZwF-MlJU8hCHUo0eebfmglDEdzbUhMdYVxuPKLUkPNVt4PfQd_DE2Nc2iIli8-6M2KbttoVDxD50S2E0NSuzxzofRT5KrifojLFVKqsai-OLi8tTZ6XRywhQmtbgItFkmXiSlQBWQrxAa0sFFWhND4SuaJHXDX12hEAvZo51CuHQgHNzucKbG7idS6kpG9zw7pZm_"/>
{/*  Live Availability Badge  */}
<div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-500 text-on-primary text-[10px] font-label font-bold flex items-center gap-1 shadow-sm">
<span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                Đang rảnh - Nhận ngay
              </div>
<div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-surface-container-lowest/60 backdrop-blur-[20px] saturate-[180%] text-on-surface text-xs font-headline font-bold flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-amber-500 fill text-sm" data-icon="star">star</span>
                4.99 (1.820 việc)
              </div>
</div>
{/*  Content Area  */}
<div className="p-5">
<div className="flex items-center gap-1.5 text-xs text-outline font-label mb-1">
<span className="material-symbols-outlined text-sm text-primary" data-icon="location_on">location_on</span>
<span>Phụ trách: Đống Đa, Ba Đình, Hoàn Kiếm</span>
</div>
<h3 className="text-base font-headline font-bold text-on-surface">Võ Minh Trí</h3>
<p className="text-xs text-primary font-medium mt-0.5">Chuyên gia Khóa &amp; Smartlock • 10 năm kinh nghiệm</p>
{/*  Badges  */}
<div className="flex flex-wrap gap-1.5 mt-3">
<span className="text-[10px] font-label font-semibold px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">Bảo mật cao cấp</span>
<span className="text-[10px] font-label font-semibold px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">Cứu hộ 24/7</span>
</div>
</div>
</div>
<div className="px-5 pb-5">
<button className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label text-xs font-bold transition-all duration-150 ease-out active:scale-[0.97] text-center" type="button">
              Xem hồ sơ &amp; Đặt lịch
            </button>
</div>
</div>
</div>
</div>
</section>
{/*  ==================== 6. Quy trình 4 bước đơn giản & Cam kết ====================  */}
<section className="py-20 bg-background border-t border-surface-variant" id="warranty">
<div className="max-w-7xl mx-auto px-6 lg:px-12">
<div className="text-center max-w-2xl mx-auto mb-16">
<span className="text-xs font-label font-bold text-primary tracking-widest uppercase">QUY TRÌNH MINH BẠCH</span>
<h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-on-surface mt-1 tracking-tight" style={{'fontOpticalSizing': 'auto'}}>
          Sửa chữa gia đình nhanh gọn chỉ với 4 bước
        </h2>
<p className="text-sm text-on-surface-variant mt-2">
          Không cần gọi điện lòng vòng, không sợ bị kê khống giá hay phát sinh phụ phí.
        </p>
</div>
{/*  4 Steps Timeline Grid  */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
{/*  Step 1  */}
<div className="relative bg-surface-container-lowest/80 backdrop-blur-xl p-6 rounded-2xl border border-surface-variant/50 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-[0.98] transition-all duration-300 ease-out">
<div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary font-headline font-black flex items-center justify-center text-lg mb-4">
            01
          </div>
<div>
<h3 className="font-headline font-bold text-base text-on-surface">Đặt dịch vụ &amp; Mô tả sự cố</h3>
<p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
              Chọn dịch vụ bạn cần sửa, đính kèm hình ảnh hoặc mô tả sơ bộ lỗi trên ứng dụng hoặc website.
            </p>
</div>
<div className="mt-6 flex items-center gap-1.5 text-[11px] font-label text-primary font-semibold">
<span className="material-symbols-outlined text-sm" data-icon="touch_app">touch_app</span>
            Thao tác dưới 1 phút
          </div>
</div>
{/*  Step 2  */}
<div className="relative bg-surface-container-lowest/80 backdrop-blur-xl p-6 rounded-2xl border border-surface-variant/50 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-[0.98] transition-all duration-300 ease-out">
<div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary font-headline font-black flex items-center justify-center text-lg mb-4">
            02
          </div>
<div>
<h3 className="font-headline font-bold text-base text-on-surface">Hệ thống ghép thợ gần nhất</h3>
<p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
              Thuật toán radar định vị và điều động thợ chuyên môn phù hợp trong bán kính 3km có mặt sau 15-20 phút.
            </p>
</div>
<div className="mt-6 flex items-center gap-1.5 text-[11px] font-label text-emerald-600 font-semibold">
<span className="material-symbols-outlined text-sm" data-icon="near_me">near_me</span>
            Theo dõi lộ trình trực tiếp
          </div>
</div>
{/*  Step 3  */}
<div className="relative bg-surface-container-lowest/80 backdrop-blur-xl p-6 rounded-2xl border border-surface-variant/50 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-[0.98] transition-all duration-300 ease-out">
<div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary font-headline font-black flex items-center justify-center text-lg mb-4">
            03
          </div>
<div>
<h3 className="font-headline font-bold text-base text-on-surface">Kiểm tra &amp; Báo giá niêm yết</h3>
<p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
              Thợ đến tận nhà khảo sát tình trạng thực tế và đối chiếu bảng giá chuẩn của công ty trước khi làm việc.
            </p>
</div>
<div className="mt-6 flex items-center gap-1.5 text-[11px] font-label text-primary font-semibold">
<span className="material-symbols-outlined text-sm" data-icon="assignment_turned_in">assignment_turned_in</span>
            Chỉ làm khi bạn đồng ý giá
          </div>
</div>
{/*  Step 4  */}
<div className="relative bg-surface-container-lowest/80 backdrop-blur-xl p-6 rounded-2xl border border-surface-variant/50 flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-[0.98] transition-all duration-300 ease-out">
<div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary font-headline font-black flex items-center justify-center text-lg mb-4">
            04
          </div>
<div>
<h3 className="font-headline font-bold text-base text-on-surface">Nghiệm thu &amp; Kích hoạt bảo hành</h3>
<p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
              Chạy thử nghiệm thu, thanh toán minh bạch qua ví điện tử/tiền mặt và nhận phiếu bảo hành điện tử 30 ngày.
            </p>
</div>
<div className="mt-6 flex items-center gap-1.5 text-[11px] font-label text-tertiary font-semibold">
<span className="material-symbols-outlined text-sm" data-icon="verified_user">verified_user</span>
            Bảo hiểm hư hại FixMate Care
          </div>
</div>
</div>
{/*  App Download Banner  */}
<div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 sm:p-12 text-on-primary flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl" id="become-pro">
<div className="max-w-xl space-y-3">
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-label font-bold text-white">
<span className="material-symbols-outlined text-sm" data-icon="smartphone">smartphone</span>
            ỨNG DỤNG FIXMATE 2025
          </div>
<h3 className="text-2xl sm:text-3xl font-headline font-black tracking-tight leading-tight">
            Đặt thợ nhanh hơn 1 chạm trên ứng dụng di động
          </h3>
<p className="text-white/80 text-sm leading-relaxed">
            Nhận mã giảm giá 50.000đ cho đơn đặt dịch vụ đầu tiên. Tích điểm đổi quà bảo trì định kỳ và lưu lại hồ sơ thiết bị gia đình tiện lợi.
          </p>
</div>
<div className="flex flex-wrap items-center gap-4 flex-shrink-0">
<button className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-surface-container-lowest text-on-surface font-label hover:bg-surface-container transition-all duration-150 ease-out active:scale-[0.97] hover:shadow-lg hover:-translate-y-0.5" type="button">
<span className="material-symbols-outlined text-3xl" data-icon="phone_iphone">phone_iphone</span>
<div className="text-left">
<span className="text-[10px] text-outline uppercase block">Tải trên</span>
<strong className="text-xs font-bold font-headline block">App Store</strong>
</div>
</button>
<button className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-surface-container-lowest text-on-surface font-label hover:bg-surface-container transition-all duration-150 ease-out active:scale-[0.97] hover:shadow-lg hover:-translate-y-0.5" type="button">
<span className="material-symbols-outlined text-3xl" data-icon="android">android</span>
<div className="text-left">
<span className="text-[10px] text-outline uppercase block">Tải trên</span>
<strong className="text-xs font-bold font-headline block">Google Play</strong>
</div>
</button>
</div>
</div>
</div>
</section>
{/*  ==================== 7. Footer (JSON Shared Component Anchor) ====================  */}
<footer className="bg-surface-container-high dark:bg-inverse-surface w-full block border-t border-surface-variant dark:border-outline flat no shadows transition-colors">
<div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
{/*  Brand Column (5 Cols)  */}
<div className="lg:col-span-5 space-y-4">
<div className="flex items-center gap-2">
<div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined fill text-xl" data-icon="build">build</span>
</div>
<span className="text-2xl font-headline font-black text-primary dark:text-inverse-primary tracking-tight">
              FixMate
            </span>
</div>
<p className="font-body text-on-surface-variant dark:text-outline-variant text-sm max-w-sm leading-relaxed">
            Nền tảng kết nối thợ sửa chữa gia dụng uy tín hàng đầu. 100% thợ qua thẩm định kỹ lưỡng, giá niêm yết công khai, bảo hành chuẩn mực 30 ngày.
          </p>
<div className="pt-2 space-y-2 text-xs font-label text-on-surface-variant">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-base text-primary" data-icon="support_agent">support_agent</span>
<span>Tổng đài hỗ trợ 24/7: <strong className="text-on-surface font-bold">1900-8888</strong></span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-base text-primary" data-icon="mail">mail</span>
<span>Hotline khiếu nại chất lượng: <strong>hotro@fixmate.vn</strong></span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-base text-primary" data-icon="verified">verified</span>
<span>Chứng nhận Dịch vụ Tiêu chuẩn ISO 9001:2015</span>
</div>
</div>
</div>
{/*  Links Column 1 (4 Cols)  */}
<div className="lg:col-span-4 space-y-3">
<h4 className="font-headline font-semibold text-on-surface dark:text-inverse-on-surface text-base">
            Quy định &amp; Chính sách
          </h4>
<ul className="space-y-2 font-label text-sm text-on-surface-variant dark:text-outline-variant">
<li>
<a className="hover:text-primary dark:hover:text-inverse-primary underline transition-colors duration-150" href="#">Về chúng tôi</a>
</li>
<li>
<a className="hover:text-primary dark:hover:text-inverse-primary underline transition-colors duration-150" href="#">Quy chuẩn tay nghề thợ</a>
</li>
<li>
<a className="hover:text-primary dark:hover:text-inverse-primary underline transition-colors duration-150" href="#">Chính sách bảo hành 30 ngày</a>
</li>
<li>
<a className="hover:text-primary dark:hover:text-inverse-primary underline transition-colors duration-150" href="#">Bảng giá niêm yết</a>
</li>
<li>
<a className="hover:text-primary dark:hover:text-inverse-primary underline transition-colors duration-150" href="#">Quy định an toàn lao động</a>
</li>
</ul>
</div>
{/*  Links Column 2 (3 Cols)  */}
<div className="lg:col-span-3 space-y-3">
<h4 className="font-headline font-semibold text-on-surface dark:text-inverse-on-surface text-base">
            Hỗ trợ &amp; Tải ứng dụng
          </h4>
<ul className="space-y-2 font-label text-sm text-on-surface-variant dark:text-outline-variant">
<li>
<a className="hover:text-primary dark:hover:text-inverse-primary underline transition-colors duration-150" href="#">Trung tâm hỗ trợ 24/7</a>
</li>
<li>
<a className="hover:text-primary dark:hover:text-inverse-primary underline transition-colors duration-150" href="#">Tải ứng dụng Khách hàng</a>
</li>
<li>
<a className="hover:text-primary dark:hover:text-inverse-primary underline transition-colors duration-150" href="#">Ứng dụng Thợ Đối tác</a>
</li>
<li>
<a className="hover:text-primary dark:hover:text-inverse-primary underline transition-colors duration-150" href="#">Đăng ký Đối tác cung ứng linh kiện</a>
</li>
</ul>
</div>
</div>
{/*  Copyright Bottom Bar  */}
<div className="pt-8 border-t border-surface-variant dark:border-outline flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-label text-on-surface-variant dark:text-outline-variant">
<p>© 2025 FixMate Platform. Nền tảng kết nối thợ sửa chữa gia dụng uy tín hàng đầu. Bảo lưu mọi quyền.</p>
<div className="flex items-center gap-4">
<a className="hover:text-primary" href="#">Điều khoản sử dụng</a>
<span>•</span>
<a className="hover:text-primary" href="#">Chính sách quyền riêng tư</a>
<span>•</span>
<a className="hover:text-primary" href="#">Bảo vệ quyền lợi khách hàng</a>
</div>
</div>
</div>
</footer>

    </div>
  );
}

export default App;
