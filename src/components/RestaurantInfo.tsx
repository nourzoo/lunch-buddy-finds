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
    { name: '라멘이지만예', current: 18, peak: 30, status: '혼잡', lat: 37.5190, lng: 127.0490 },
    { name: '지글지글', current: 2, peak: 8, status: '원활', lat: 37.5155, lng: 127.0455 }
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
        console.error('위치 가져오기 실패:', error);
        alert('위치를 가져올 수 없습니다. 기본 지도를 표시합니다.');
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
