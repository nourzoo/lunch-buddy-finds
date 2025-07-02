
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, MapPin, Phone } from 'lucide-react';

interface RestaurantInfoProps {
  selectedRestaurant?: string;
}

const RestaurantInfo = ({ selectedRestaurant }: RestaurantInfoProps) => {
  const [waitTimes] = useState([
    { name: '샐러드야', current: 5, peak: 15, status: '원활' },
    { name: '놀링파스타', current: 12, peak: 25, status: '보통' },
    { name: '푸근한한식집', current: 0, peak: 5, status: '원활' },
    { name: '라멘이지만예', current: 18, peak: 30, status: '혼잡' },
    { name: '지글지글', current: 2, peak: 8, status: '원활' }
  ]);

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
          <CardTitle>📍 주변 맛집 지도</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="h-8 w-8 mx-auto mb-2" />
              <p>실제 서비스에서는 지도 API를 연동하여</p>
              <p>주변 식당 위치를 표시합니다</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantInfo;
