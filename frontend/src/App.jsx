import { useEffect, useState } from 'react';
import axiosClient from './api/axiosClient';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Gọi API ngay khi component được render lần đầu
  useEffect(() => {
    const testConnection = async () => {
      try {
        // Gọi đến endpoint /api/ping/ mà mình vừa tạo ở Django
        const response = await axiosClient.get('/api/ping/');
        setData(response);
      } catch (err) {
        setError("Không thể kết nối đến Backend. Hãy chắc chắn Django đang chạy!");
      }
    };

    testConnection();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Kết nối Frontend - Backend</h1>
      
      {error ? (
        <p style={{ color: 'red' }}>❌ Lỗi: {error}</p>
      ) : data ? (
        <div style={{ backgroundColor: '#e6ffe6', padding: '10px', borderRadius: '5px' }}>
          <p style={{ color: 'green', fontWeight: 'bold' }}>✅ Kết nối thành công!</p>
          <p>Dữ liệu từ Django: <strong>{data.message}</strong></p>
        </div>
      ) : (
        <p>Đang kết nối đến Backend...</p>
      )}
    </div>
  );
}

export default App;
