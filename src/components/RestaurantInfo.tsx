
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, MapPin, Phone, Navigation, Star, MessageSquare } from 'lucide-react';

interface RestaurantInfoProps {
  selectedRestaurant?: string;
  onClose?: () => void;
}

const RestaurantInfo = ({ selectedRestaurant, onClose }: RestaurantInfoProps) => {
  const [selectedRestaurantForReview, setSelectedRestaurantForReview] = useState<string>('');

  const waitTimes = useMemo(() => [
    { 
      name: '샐러드야', 
      current: 5, 
      peak: 15, 
      status: '원활', 
      lat: 37.5172, 
      lng: 127.0473, 
      rating: 4.5, 
      category: '샐러드/건강식', 
      price: '8,000원대', 
      waitTime: 5,
      reviewCount: 24,
      allergyWarnings: ['견과류', '유제품'],
      mainMenu: '시즌 샐러드'
    },
    { 
      name: '놀링파스타', 
      current: 12, 
      peak: 25, 
      status: '보통', 
      lat: 37.5180, 
      lng: 127.0480, 
      rating: 4.3, 
      category: '이탈리안', 
      price: '12,000원대', 
      waitTime: 12,
      reviewCount: 18,
      allergyWarnings: ['밀', '유제품'],
      mainMenu: '토마토 파스타'
    },
    { 
      name: '푸근한한식집', 
      current: 0, 
      peak: 5, 
      status: '원활', 
      lat: 37.5165, 
      lng: 127.0465, 
      rating: 4.7, 
      category: '한정식', 
      price: '15,000원대', 
      waitTime: 0,
      reviewCount: 32,
      allergyWarnings: ['대두'],
      mainMenu: '한정식 정식'
    },
    { 
      name: '라멘이지예', 
      current: 18, 
      peak: 30, 
      status: '혼잡', 
      lat: 37.5190, 
      lng: 127.0490, 
      rating: 4.2, 
      category: '일식/라멘', 
      price: '9,000원대', 
      waitTime: 18,
      reviewCount: 27,
      allergyWarnings: ['계란', '대두'],
      mainMenu: '돈코츠 라멘'
    },
    { 
      name: '지글지글', 
      current: 2, 
      peak: 8, 
      status: '원활', 
      lat: 37.5155, 
      lng: 127.0455, 
      rating: 4.0, 
      category: '도시락/간편식', 
      price: '6,000원대', 
      waitTime: 2,
      reviewCount: 15,
      allergyWarnings: [],
      mainMenu: '불고기 도시락'
    },
    { 
      name: '다도한방카페', 
      current: 8, 
      peak: 20, 
      status: '보통', 
      lat: 37.5178, 
      lng: 127.0478, 
      rating: 4.4, 
      category: '카페', 
      price: '9,000원대', 
      waitTime: 8,
      reviewCount: 21,
      allergyWarnings: ['견과류'],
      mainMenu: '한방차 세트'
    }
  ], []);

  // 사용자 알러지 정보 (실제로는 context나 props에서 받아올 예정)
  const userAllergies = ['갑각류', '견과류'];
  const userDislikes = ['매운음식', '생선'];

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

  const hasAllergyWarning = (restaurant: any) => {
    return restaurant.allergyWarnings.some((warning: string) => 
      userAllergies.includes(warning) || userDislikes.includes(warning)
    );
  };

  const getWarningIngredients = (restaurant: any) => {
    return restaurant.allergyWarnings.filter((warning: string) => 
      userAllergies.includes(warning) || userDislikes.includes(warning)
    );
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
                      {/* 리뷰 수 표시 */}
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MessageSquare className="h-3 w-3" />
                        <span>{restaurant.reviewCount}</span>
                      </div>
                      {/* 평점 표시 */}
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span>{restaurant.rating}</span>
                      </div>
                    </div>
                    
                    {/* 알러지 경고 배지 */}
                    {hasAllergyWarning(restaurant) && (
                      <div className="mb-2">
                        <Badge variant="destructive" className="text-xs">
                          ⚠️ 주의! 기피 식재료 포함: {getWarningIngredients(restaurant).join(', ')}
                        </Badge>
                      </div>
                    )}
                    
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
                    
                    <div className="mt-2 text-sm text-gray-600">
                      <p>대표 메뉴: {restaurant.mainMenu}</p>
                      <p>가격대: {restaurant.price}</p>
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
                    <div className="flex gap-1 mt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => openNavigation(restaurant.lat, restaurant.lng)}
                      >
                        <Navigation className="h-3 w-3 mr-1" />
                        길찾기
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => setSelectedRestaurantForReview(restaurant.name)}
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        리뷰
                      </Button>
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
    </div>
  );
};

export default RestaurantInfo;
