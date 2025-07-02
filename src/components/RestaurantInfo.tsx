import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, MapPin, Phone, Navigation } from 'lucide-react';

interface RestaurantInfoProps {
  selectedRestaurant?: string;
}

const RestaurantInfo = ({ selectedRestaurant }: RestaurantInfoProps) => {
  const [waitTimes] = useState([
    { name: '샐러드야', current: 5, peak: 15, status: '원활', lat: 37.5172, lng: 127.0473 },
    { name: '놀링파스타', current: 12, peak: 25, status: '보통', lat: 37.5180, lng: 127.0480 },
    { name: '푸근한한식집', current: 0, peak: 5, status: '원활', lat: 37.5165, lng: 127.0465 },
    { name: '라멘이지예', current: 18, peak: 30, status: '혼잡', lat: 37.5190, lng: 127.0490 },
    { name: '지글지글', current: 2, peak: 8, status: '원활', lat: 37.5155, lng: 127.0455 },
    { name: '다도한방카페', current: 8, peak: 20, status: '보통', lat: 37.5178, lng: 127.0478 },
    { name: '시가집치킨', current: 20, peak: 40, status: '혼잡', lat: 37.5200, lng: 127.0500 },
    { name: '초밥조바', current: 25, peak: 50, status: '혼잡', lat: 37.5210, lng: 127.0510 },
    { name: '브라운피자', current: 15, peak: 35, status: '보통', lat: 37.5220, lng: 127.0520 },
    { name: '뽕커리', current: 7, peak: 18, status: '원활', lat: 37.5230, lng: 127.0530 },
    { name: '기괴떡볶이', current: 3, peak: 10, status: '원활', lat: 37.5240, lng: 127.0540 },
    { name: '인백', current: 30, peak: 60, status: '혼잡', lat: 37.5250, lng: 127.0550 },
    { name: '김밥지옥', current: 1, peak: 5, status: '원활', lat: 37.5260, lng: 127.0560 },
    { name: '뿡차이', current: 10, peak: 25, status: '보통', lat: 37.5270, lng: 127.0570 },
    { name: '카페인절제', current: 4, peak: 12, status: '원활', lat: 37.5280, lng: 127.0580 },
    { name: '요거트 아이스크림의 교과서', current: 6, peak: 15, status: '보통', lat: 37.5290, lng: 127.0590 }
  ]);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [showMap, setShowMap] = useState(false);

  // 사용자 위치 가져오기
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert('이 브라우저에서는 위치 서비스를 지원하지 않습니다.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setShowMap(true);
      },
      (error) => {
        let message = '위치를 가져올 수 없습니다.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = '위치 권한이 거부되었습니다.';
            break;
          case error.POSITION_UNAVAILABLE:
            message = '위치 정보를 사용할 수 없습니다.';
            break;
          case error.TIMEOUT:
            message = '위치 정보를 가져오는 데 시간이 초과되었습니다.';
            break;
        }
        alert(message);
        setShowMap(true);
      }
    );
  };

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
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            실시간 대기 정보
          </CardTitle>
          <p className="text-sm text-gray-600">
            마지막 업데이트: 방금 전
          </p>
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

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>📍 주변 맛집 지도</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={getUserLocation}
            >
              내 위치 확인
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showMap ? (
            <div className="space-y-4">
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center relative">
                <div className="text-center text-gray-500">
                  <MapPin className="h-8 w-8 mx-auto mb-2" />
                  <p>실제 서비스에서는 지도 API를 연동하여</p>
                  <p>주변 식당 위치를 표시합니다</p>
                  {userLocation && (
                    <div className="mt-4 p-2 bg-blue-50 rounded text-sm">
                      📍 내 위치: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                    </div>
                  )}
                </div>
                {/* 식당 마커들 */}
                {waitTimes.map((restaurant, index) => (
                  <div 
                    key={restaurant.name}
                    className="absolute bg-red-500 text-white text-xs px-2 py-1 rounded"
                    style={{
                      left: `${20 + (index * 15)}%`,
                      top: `${30 + (index * 10)}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {restaurant.name}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <p>• 빨간 점: 주변 식당 위치</p>
                <p>• 파란 점: 내 현재 위치</p>
                <p>• 길찾기 버튼을 클릭하면 Google Maps로 이동합니다</p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p>위치 확인 버튼을 눌러서</p>
                <p>주변 식당 지도를 확인하세요</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantInfo;
