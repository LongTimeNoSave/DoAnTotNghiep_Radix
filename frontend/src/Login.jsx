import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username: username,  // Gửi tên đăng nhập thay vì email
        password: password
      });

      const { access, refresh } = response.data;
      
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user_email', username); // Lưu username vào biến này để App.jsx hiển thị
      
      navigate('/');
      
    } catch (err) {
      setError('Tài khoản hoặc mật khẩu không chính xác!');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex bg-surface-container-low text-on-surface">
      {/* Cột trái: Form đăng nhập */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-surface-container-lowest relative z-10 shadow-2xl">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-4xl font-extrabold font-headline tracking-tight text-primary mb-2">RADI<span className="text-tertiary-fixed-dim">X</span></h2>
            <h3 className="text-2xl font-bold font-headline mb-2">Chào mừng trở lại!</h3>
            <p className="text-outline font-label">Vui lòng đăng nhập vào hệ thống để tiếp tục.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="username">Tên đăng nhập</label>
              <input 
                id="username"
                type="text" 
                required
                className="w-full px-4 py-3 rounded-xl bg-surface-bright border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary-fixed outline-none transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="password">Mật khẩu</label>
              <input 
                id="password"
                type="password" 
                required
                className="w-full px-4 py-3 rounded-xl bg-surface-bright border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary-fixed outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-error text-sm font-medium">{error}</p>}

            <button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary-fixed-dim text-on-primary font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors text-lg mt-4"
            >
              Đăng Nhập
            </button>
          </form>
        </div>
      </div>
      
      {/* Cột phải: Quảng cáo / Banner */}
      <div className="hidden lg:block lg:w-1/2 relative bg-surface-container overflow-hidden">
        {/* Lớp phủ gradient để làm nổi chữ */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent z-10"></div>
        {/* Hình ảnh quảng cáo */}
        <img 
          src="/banner.jpg" 
          alt="Quảng cáo dịch vụ sửa chữa" 
          className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-1000 hover:scale-105"
        />
        {/* Nội dung quảng cáo đè lên ảnh */}
        <div className="absolute bottom-0 left-0 right-0 p-16 z-20 text-on-primary">
          <h2 className="text-4xl font-extrabold font-headline mb-4 leading-tight drop-shadow-md">
            Mạng Lưới Thợ Sửa Chữa<br/>Số 1 Việt Nam
          </h2>
          <p className="text-lg font-medium opacity-90 max-w-lg drop-shadow">
            Đặt thợ nhanh chóng, bảng giá minh bạch, bảo hành dài hạn. Trải nghiệm dịch vụ chuyên nghiệp, an toàn và tiện lợi ngay hôm nay.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
