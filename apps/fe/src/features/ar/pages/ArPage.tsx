import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camera, X, Smartphone, HelpCircle } from 'lucide-react';

export default function ArPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [arStep, setArStep] = useState(1); // 1: Guide, 2: Camera request, 3: Active Simulation

  useEffect(() => {
    // Detect mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const requestPermission = async () => {
    setArStep(2);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setHasCameraPermission(true);
      setArStep(3);
      // Stop track immediately in mock page
      stream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      setHasCameraPermission(false);
      setArStep(3);
    }
  };

  const handleClose = () => {
    navigate(`/products/${id || 'tieu-canh-bat-trang'}`);
  };

  if (!isMobile) {
    return (
      <div className="min-h-screen bg-[#3A1A0A] text-[#F5EDD6] flex flex-col items-center justify-center p-6 text-center space-y-6">
        <Smartphone className="w-16 h-16 text-[#C9973A] animate-bounce" />
        <h1 className="text-3xl font-light">AR TRẢI NGHIỆM DI ĐỘNG</h1>
        <p className="text-sm max-w-md text-[#C9B99A]">
          Để đặt thử mô hình diorama này vào ngay căn phòng của bạn, xin hãy dùng điện thoại di động quét mã QR bên dưới hoặc truy cập link bằng trình duyệt di động.
        </p>
        <div className="p-4 bg-white rounded-lg border-2 border-[#C9973A] shadow-gold-glow">
          {/* Mock QR Code */}
          <div className="w-48 h-48 bg-gray-200 flex items-center justify-center text-gray-800 text-xs font-semibold uppercase">
            QR CODE: {window.location.origin}/ar/{id}
          </div>
        </div>
        <button
          onClick={handleClose}
          className="px-6 py-2.5 bg-[#5C3D1E] hover:bg-[#7A5230] text-[#F5EDD6] text-[11px] font-bold tracking-wider uppercase rounded-sm cursor-pointer"
        >
          Quay Lại Chi Tiết Sản Phẩm
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#2C1A0E] text-[#F5EDD6] overflow-hidden flex flex-col justify-between">
      {/* Top Header overlay */}
      <div className="relative z-10 flex items-center justify-between p-4 bg-gradient-to-b from-[#2C1A0E] to-transparent">
        <span className="text-[11px] font-bold tracking-widest text-[#C9973A] uppercase">
          MÔ PHỎNG AR DI ĐỘNG
        </span>
        <button
          onClick={handleClose}
          className="w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-[#F5EDD6]"
        >
          <X size={18} />
        </button>
      </div>

      {/* Main AR Display area */}
      <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#2C1A0E]">
        {arStep === 1 && (
          <div className="relative z-10 p-8 text-center space-y-6 max-w-sm bg-[#3A1A0A]/90 border border-[#C9973A] rounded-[8px] mx-4 shadow-large">
            <Smartphone className="w-12 h-12 text-[#C9973A] mx-auto" />
            <h2 className="text-2xl font-light">Mô Phỏng Không Gian</h2>
            <p className="text-xs text-[#C9B99A] leading-relaxed">
              Bạn sắp phóng chiếu mô hình 3D vào không gian thực tế qua camera điện thoại di động.
            </p>
            <button
              onClick={requestPermission}
              className="w-full py-3 bg-[#5C3D1E] hover:bg-[#7A5230] text-[#F5EDD6] text-xs font-semibold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2"
            >
              <Camera size={16} />
              BẮT ĐẦU CAMERA
            </button>
          </div>
        )}

        {arStep === 2 && (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#C9973A] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs tracking-widest uppercase">Đang đồng bộ hóa camera AR...</p>
          </div>
        )}

        {arStep === 3 && (
          <div className="absolute inset-0 w-full h-full">
            {hasCameraPermission ? (
              <div className="absolute inset-0 bg-[#EDE3CE]/20 flex flex-col justify-center items-center">
                {/* Simulated Camera Scan Backdrop */}
                <div className="absolute inset-0 border-[3px] border-dashed border-[#C9973A]/40 m-6 flex flex-col items-center justify-center">
                  <span className="bg-black/60 px-4 py-2 border border-[#C9973A] text-xs italic mb-20 text-center animate-pulse">
                    Di chuyển camera quét mặt bàn hoặc mặt sàn phẳng
                  </span>
                  
                  {/* Simulated 3D product load overlay */}
                  <div className="relative w-64 h-64 border border-[#C9973A] rounded-[6px] bg-[#FDF6E3]/90 shadow-gold-glow flex flex-col items-center justify-center p-4">
                    <div className="absolute top-2 left-2 text-[10px] text-[#7A5A1A] font-bold">MÔ HÌNH 3D</div>
                    <img
                      src="https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=400&q=80"
                      alt="3D simulation"
                      className="w-40 h-40 object-contain animate-pulse"
                    />
                    <span className="text-base font-bold text-gray-800">Mô hình Làng gốm Bát Tràng</span>
                    <span className="text-[9px] text-gray-500">Chế độ xem thực tế tăng cường</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative z-10 p-8 text-center space-y-6 max-w-sm bg-[#7B1C2E]/95 border border-[#F5EDD6] rounded-[8px] mx-4 shadow-large">
                <HelpCircle className="w-12 h-12 text-[#FDF6E3] mx-auto" />
                <h2 className="text-2xl font-light">Từ chối mở camera AR</h2>
                <p className="text-xs text-[#FDF6E3]/90 leading-relaxed">
                  Thiết bị không cho phép mở camera. Vui lòng kiểm tra quyền truy cập camera trong trình duyệt của bạn và thử lại.
                </p>
                <button
                  onClick={requestPermission}
                  className="w-full py-2.5 bg-[#F5EDD6] text-[#7B1C2E] text-xs font-bold tracking-wider uppercase rounded-sm"
                >
                  YÊU CẦU LẠI
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom control bar overlay */}
      <div className="relative z-10 p-6 bg-gradient-to-t from-[#2C1A0E] to-transparent text-center">
        {arStep === 3 && hasCameraPermission && (
          <div className="flex justify-center gap-4">
            <button
              onClick={() => alert('Đang chụp màn hình lưu vào thư viện ảnh...')}
              className="px-6 py-2.5 bg-[#C9973A] text-[#3A1A0A] text-xs font-bold tracking-wider uppercase rounded-sm shadow-subtle hover:bg-[#F5EDD6]"
            >
              Chụp ảnh phòng
            </button>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 bg-[#5C3D1E] text-[#F5EDD6] text-xs font-bold tracking-wider uppercase rounded-sm hover:bg-[#7A5230]"
            >
              Xem Chi Tiết
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
