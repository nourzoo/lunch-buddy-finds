import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, MapPin, Phone, Navigation } from 'lucide-react';

interface RestaurantInfoProps {
  selectedRestaurant?: string;
  onClose?: () => void;
}

const RestaurantInfo = ({ selectedRestaurant, onClose }: RestaurantInfoProps) => {
  const waitTimes = useMemo(() => [
    { name: '샐러드야', current: 5, peak: 15, status: '원활', lat: 37.5172, lng: 127.0473, rating: 4.5, category: '샐러드/건강식', price: '8,000원대', waitTime: 5 },
    { name: '놀링파스타', current: 12, peak: 25, status: '보통', lat: 37.5180, lng: 127.0480, rating: 4.3, category: '이탈리안', price: '12,000원대', waitTime: 12 },
    { name: '푸근한한식집', current: 0, peak: 5, status: '원활', lat: 37.5165, lng: 127.0465, rating: 4.7, category: '한정식', price: '15,000원대', waitTime: 0 },
    { name: '라멘이지예', current: 18, peak: 30, status: '혼잡', lat: 37.5190, lng: 127.0490, rating: 4.2, category: '일식/라멘', price: '9,000원대', waitTime: 18 },
    { name: '지글지글', current: 2, peak: 8, status: '원활', lat: 37.5155, lng: 127.0455, rating: 4.0, category: '도시락/간편식', price: '6,000원대', waitTime: 2 },
    { name: '다도한방카페', current: 8, peak: 20, status: '보통', lat: 37.5178, lng: 127.0478, rating: 4.4, category: '카페', price: '9,000원대', waitTime: 8 },
    { name: '시가집치킨', current: 20, peak: 40, status: '혼잡', lat: 37.5200, lng: 127.0500, rating: 4.6, category: '치킨/양념치킨', price: '18,000원대', waitTime: 20 },
    { name: '초밥조바', current: 25, peak: 50, status: '혼잡', lat: 37.5210, lng: 127.0510, rating: 4.8, category: '일식/스시', price: '25,000원대', waitTime: 25 },
    { name: '브라운피자', current: 15, peak: 35, status: '보통', lat: 37.5220, lng: 127.0520, rating: 4.1, category: '피자', price: '16,000원대', waitTime: 15 },
    { name: '뽕커리', current: 7, peak: 18, status: '원활', lat: 37.5230, lng: 127.0530, rating: 4.3, category: '베트남음식', price: '11,000원대', waitTime: 7 },
    { name: '기괴떡볶이', current: 3, peak: 10, status: '원활', lat: 37.5240, lng: 127.0540, rating: 4.0, category: '분식', price: '5,000원대', waitTime: 3 },
    { name: '인백', current: 30, peak: 60, status: '혼잡', lat: 37.5250, lng: 127.0550, rating: 4.9, category: '양식/스테이크', price: '35,000원대', waitTime: 30 },
    { name: '김밥지옥', current: 1, peak: 5, status: '원활', lat: 37.5260, lng: 127.0560, rating: 4.2, category: '김밥/도시락', price: '4,000원대', waitTime: 1 },
    { name: '뿡차이', current: 10, peak: 25, status: '보통', lat: 37.5270, lng: 127.0570, rating: 4.4, category: '중식', price: '14,000원대', waitTime: 10 },
    { name: '카페인절제', current: 4, peak: 12, status: '원활', lat: 37.5280, lng: 127.0580, rating: 4.1, category: '샌드위치', price: '7,000원대', waitTime: 4 },
    { name: '요거트 아이스크림의 교과서', current: 6, peak: 15, status: '보통', lat: 37.5290, lng: 127.0590, rating: 4.5, category: '디저트', price: '6,000원대', waitTime: 6 }
  ], []);

  // 네비게이션 열기
  const openNavigation = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '원활': return 'bg-green-100 text-green-800';
      case '보통': return 'bg-yellow-100 text-yellow-800';
      case '혼잡': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '원활': return '🟢';
      case '보통': return '🟡';
      case '혼잡': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      {onClose && (
        <button
          className="absolute right-4 top-4 z-10 text-gray-400 hover:text-primary text-2xl"
          onClick={onClose}
          aria-label="닫기"
        >
          ×
        </button>
      )}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                실시간 대기 정보
              </CardTitle>
              <p className="text-sm text-gray-600">
                마지막 업데이트: 방금 전
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {waitTimes.map((restaurant, index) => (
              <div 
                key={restaurant.name}
                className={`p-4 rounded-lg border transition-all hover-lift animate-slide-in ${
                  selectedRestaurant === restaurant.name 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-200 hover:border-primary/30'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{restaurant.name}</h4>
                      <Badge className={getStatusColor(restaurant.status)}>
                        {getStatusIcon(restaurant.status)} {restaurant.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>현재 대기: <strong>{restaurant.current}분</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>피크 시간: <strong>{restaurant.peak}분</strong></span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>도보 3분</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Phone className="h-3 w-3" />
                      <span>주문 가능</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 text-xs"
                      onClick={() => openNavigation(restaurant.lat, restaurant.lng)}
                    >
                      <Navigation className="h-3 w-3 mr-1" />
                      길찾기
                    </Button>
                  </div>
                </div>

                {restaurant.current > 10 && (
                  <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                    💡 <strong>팁:</strong> 12:30-13:00이 가장 붐벼요. 지금 주문하면 더 빨라요!
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantInfo;
