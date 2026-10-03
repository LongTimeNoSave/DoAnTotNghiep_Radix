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
    <div className="min-h-screen flex items-center justify-center bg-surface-container-low text-on-surface">
      <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-xl w-full max-w-md border border-surface-variant/50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-primary">RADI<span className="text-tertiary-fixed-dim">X</span></h2>
          <p className="text-outline mt-2 font-label">Đăng nhập vào hệ thống</p>
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
            className="w-full bg-primary hover:bg-primary-fixed-dim text-on-primary font-bold py-3 px-4 rounded-xl shadow-md transition-colors"
          >
            Đăng Nhập
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
