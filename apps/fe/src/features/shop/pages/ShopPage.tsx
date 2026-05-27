import React, { useState, useMemo } from 'react';
import FilterSidebar from '../../home/components/FilterSidebar';
import ProductCard, { Product } from '../../home/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { X, SlidersHorizontal } from 'lucide-react';

export default function ShopPage() {
  const { addToCart } = useCart();
  
  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);
  
  // Detail Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Mock Products Database
  // Mock Products Database
  const products: Product[] = useMemo(() => [
    {
      id: 'tieu-canh-bat-trang',
      name: 'Mô Hình Làng Gốm Bát Tràng',
      price: 1250000,
      image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80',
      category: 'Hộp Làng Gốm',
      material: 'Mica acrylic, Gỗ MDF, Đất sét',
      origin: 'Phân xưởng Nghề Xưa Nét Mới',
      stockStatus: 'in_stock',
      badgeText: 'Còn Hàng',
      makerName: 'Hợp tác xã Nghề Xưa Nét Mới x Bát Tràng',
      makerProvince: 'Hà Nội',
      makerStory: 'Mô phỏng nghệ nhân làm gốm xoay vuốt đất sét trên bàn xoay thủ công bên lò nung gạch bầu cổ kính.'
    },
    {
      id: 'tieu-canh-van-phuc',
      name: 'Mô Hình Làng Lụa Vạn Phúc',
      price: 1450000,
      originalPrice: 1800000,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      category: 'Hộp Làng Lụa',
      material: 'Mica acrylic, Gỗ MDF, Tơ tằm',
      origin: 'Phân xưởng Nghề Xưa Nét Mới',
      stockStatus: 'low_stock',
      badgeText: 'Sắp Hết',
      makerName: 'Hợp tác xã Nghề Xưa Nét Mới x Vạn Phúc',
      makerProvince: 'Hà Nội',
      makerStory: 'Kết hợp cấu trúc nhiều lớp chiều sâu tái hiện sinh động khung dệt cửi tơ tằm cổ điển với các sấp lụa là óng ả.'
    },
    {
      id: 'tieu-canh-quang-phu-cau',
      name: 'Mô Hình Làng Hương Quảng Phú Cầu',
      price: 1350000,
      image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80',
      category: 'Hộp Làng Hương',
      material: 'Mica acrylic, Gỗ MDF, Nhang màu',
      origin: 'Phân xưởng Nghề Xưa Nét Mới',
      stockStatus: 'in_stock',
      badgeText: 'Nổi Bật',
      makerName: 'Hợp tác xã Nghề Xưa Nét Mới x Làng Hương',
      makerProvince: 'Hà Nội',
      makerStory: 'Tái hiện sân phơi hương Quảng Phú Cầu đỏ rực xếp hình đóa hoa rực rỡ dưới nắng vàng vùng quê bắc bộ.'
    },
    {
      id: 'tieu-canh-non-chuong',
      name: 'Mô Hình Làng Nón Làng Chuông',
      price: 980000,
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80',
      category: 'Hộp Làng Nón',
      material: 'Mica acrylic, Lá cọ, Khung tre',
      origin: 'Phân xưởng Nghề Xưa Nét Mới',
      stockStatus: 'in_stock',
      badgeText: 'Còn Hàng',
      makerName: 'Hợp tác xã Nghề Xưa Nét Mới x Làng Chuông',
      makerProvince: 'Hà Nội',
      makerStory: 'Ráp lớp gỗ mây tre mỏng mô tả cảnh phơi lá cọ non trắng tinh và bàn tay nghệ nhân khâu từng vành nón Chuông.'
    },
    {
      id: 'tieu-canh-phu-vinh',
      name: 'Mô Hình Làng Tre Phú Vinh',
      price: 1100000,
      image: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&w=800&q=80',
      category: 'Hộp Làng Tre Đan',
      material: 'Mica acrylic, Mây tre tự nhiên',
      origin: 'Phân xưởng Nghề Xưa Nét Mới',
      stockStatus: 'out_of_stock',
      badgeText: 'Hết Hàng',
      makerName: 'Hợp tác xã Nghề Xưa Nét Mới x Phú Vinh',
      makerProvince: 'Hà Nội',
      makerStory: 'Tái hiện chân thực công đoạn chuốt tre đan lát rổ rá xuất khẩu tỉ mỉ, mô tả cuộc sống thanh bình làng quê Việt.'
    }
  ], []);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) {
        return false;
      }
      if (selectedMaterials.length > 0 && !selectedMaterials.includes(p.material)) {
        return false;
      }
      if (p.price < priceRange[0] || p.price > priceRange[1]) {
        return false;
      }
      return true;
    });
  }, [products, selectedCategories, selectedMaterials, priceRange]);

  return (
    <div className="container mx-auto px-6 md:px-8 py-10 space-y-10">
      <div className="text-center space-y-2 reveal">
        <span className="text-[11px] font-bold tracking-[0.14em] text-[#7A5A1A] uppercase block">
          DANH MỤC TRƯNG BÀY
        </span>
        <h1 className="text-4xl md:text-[44px] font-normal text-[#2C1A0E]">
          Diorama Làng Nghề Việt Nam
        </h1>
        <div className="flex items-center justify-center gap-3 pt-1 reveal delay-75">
          <div className="h-[1px] w-12 bg-[#C9973A]/55" />
          <div className="w-1.5 h-1.5 rotate-45 border border-[#C9973A] bg-[#FDF6E3]" />
          <div className="h-[1px] w-12 bg-[#C9973A]/55" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Filter Sidebar */}
        <div className="lg:col-span-1 reveal-left">
          <FilterSidebar
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedMaterials={selectedMaterials}
            setSelectedMaterials={setSelectedMaterials}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3 space-y-6 reveal-right">
          {filteredProducts.length === 0 ? (
            <div className="h-[350px] border border-[#D4B896] rounded-[6px] bg-[#FDF6E3] flex flex-col items-center justify-center text-center p-8 space-y-4">
              <span className="text-xl text-[#9C8670] italic">
                Không tìm thấy mô hình phù hợp bộ lọc
              </span>
              <p className="text-xs text-[#9C8670]">
                Vui lòng chỉnh lại bộ lọc để tìm kiếm các mô hình phù hợp.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#2C1A0E]/60"
            onClick={() => setSelectedProduct(null)}
          />

          <div className="relative bg-[#FDF6E3] border-[2px] border-[#C9973A] rounded-[8px] max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10 shadow-overlay flex flex-col md:flex-row p-6 gap-6">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-[#5C3D1E] hover:text-[#7B1C2E] p-1"
            >
              <X size={22} />
            </button>

            <div className="w-full md:w-1/2 space-y-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full aspect-[4/3] object-cover border border-[#D4B896] rounded-[6px]"
              />
              <div className="bg-[#F5EDD6] border border-[#D4B896] p-4 rounded-[6px] text-xs">
                <span className="text-[10px] font-bold tracking-wider text-[#5C3D1E] uppercase block mb-1">
                  ĐẶC TÍNH MÔ HÌNH
                </span>
                <div><strong>Đại lý Chế tác:</strong> {selectedProduct.origin}</div>
                <div><strong>Cấu trúc vật liệu:</strong> {selectedProduct.material}</div>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-[10px] font-bold tracking-[0.14em] text-[#7A5A1A] uppercase block">
                  {selectedProduct.category}
                </span>
                <h3 className="text-2xl font-semibold text-[#2C1A0E]">
                  {selectedProduct.name}
                </h3>
                <div className="text-xl font-bold text-[#7B1C2E]">
                  {selectedProduct.price.toLocaleString('vi-VN')} ₫
                </div>
                <p className="text-sm text-[#2C1A0E]">
                  Mô hình tiểu cảnh lắp ráp nhiều tầng tỉ mỉ, đóng hộp bảo vệ mica trong suốt 360 độ kèm hệ thống đèn LED chiếu sáng lung linh kể chuyện văn hóa làng nghề truyền thống Đại Việt.
                </p>
              </div>

              {selectedProduct.makerName && (
                <div className="bg-[#FDF6E3] border border-[#D4B896] rounded-[8px] p-3 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#5C3D1E] flex items-center justify-center text-[#F5EDD6] font-bold">
                      {selectedProduct.makerName[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#2C1A0E]">
                        {selectedProduct.makerName}
                      </h4>
                      <span className="text-[9px] text-[#9C8670] uppercase">
                        {selectedProduct.makerProvince}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#2C1A0E]/80 italic">
                    "{selectedProduct.makerStory}"
                  </p>
                </div>
              )}

              <button
                disabled={selectedProduct.stockStatus === 'out_of_stock'}
                onClick={() => {
                  addToCart({
                    id: selectedProduct.id,
                    name: selectedProduct.name,
                    price: selectedProduct.price,
                    image: selectedProduct.image,
                    material: selectedProduct.material,
                    origin: selectedProduct.origin
                  });
                  setSelectedProduct(null);
                }}
                className="w-full h-10 bg-[#5C3D1E] text-[#F5EDD6] text-[11px] font-bold tracking-wider uppercase rounded-[4px] hover:bg-[#7A5230] transition-colors"
              >
                {selectedProduct.stockStatus === 'out_of_stock' ? 'HẾT HÀNG' : 'THÊM VÀO GIỎ HÀNG'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
