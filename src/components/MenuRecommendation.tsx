import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, MapPin, RefreshCw, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Restaurant {
  id: string;
  name: string;
  category: string;
  rating: number;
  walkTime: number;
  waitTime: number;
  price: string;
  tags: string[];
  image: string;
  isHealthy: boolean;
  description: string;
}

interface MenuRecommendationProps {
  preferences: any;
  weather?: {
    condition: string;
    temperature: number;
    icon: string;
    description?: string;
  };
}

const MenuRecommendation = ({ preferences, weather }: MenuRecommendationProps) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const { toast } = useToast();

  const mockRestaurants: Restaurant[] = [
    {
      id: '1',
      name: '샐러드야',
      category: '샐러드/건강식',
      rating: 4.5,
      walkTime: 3,
      waitTime: 5,
      price: '8,000원대',
      tags: ['저칼로리', '신선함', '영양만점', '시원한음식', '가벼운음식'],
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
      isHealthy: true,
      description: '신선한 재료로 만든 건강한 샐러드와 저칼로리 메뉴'
    },
    {
      id: '2',
      name: '놀링파스타',
      category: '이탈리안',
      rating: 4.3,
      walkTime: 5,
      waitTime: 10,
      price: '12,000원대',
      tags: ['인스타핫플', '맛집', '분위기좋음'],
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400',
      isHealthy: false,
      description: '젊은층에게 인기 있는 트렌디한 파스타 전문점'
    },
    {
      id: '3',
      name: '푸근한한식집',
      category: '한정식',
      rating: 4.7,
      walkTime: 2,
      waitTime: 0,
      price: '15,000원대',
      tags: ['전통맛', '영양균형', '혼밥가능', '따뜻한국물'],
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
      isHealthy: true,
      description: '정통 한정식으로 영양 균형이 잘 잡힌 식사'
    },
    {
      id: '4',
      name: '라멘이지예',
      category: '일식/라멘',
      rating: 4.2,
      walkTime: 4,
      waitTime: 15,
      price: '9,000원대',
      tags: ['진한국물', '대중적', '양많음', '따뜻한국물'],
      image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400',
      isHealthy: false,
      description: '진한 국물이 자랑인 정통 일본식 라멘'
    },
    {
      id: '5',
      name: '지글지글',
      category: '도시락/간편식',
      rating: 4.0,
      walkTime: 1,
      waitTime: 2,
      price: '6,000원대',
      tags: ['빠른식사', '가성비', '든든함'],
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
      isHealthy: true,
      description: '바쁜 직장인을 위한 간편하고 든든한 도시락'
    },
    {
      id: '6',
      name: '다도한방카페',
      category: '카페',
      rating: 4.4,
      walkTime: 6,
      waitTime: 8,
      price: '9,000원대',
      tags: ['한방카페', '빙수맛집', '인스타그램', '시원한음식', '야외석'],
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
      isHealthy: false,
      description: '한옥 냄새 나는 느낌 좋은 카페 빙수가 맛있어요'
    },
    {
      id: '7',
      name: '시가집치킨',
      category: '치킨/양념치킨',
      rating: 4.6,
      walkTime: 8,
      waitTime: 20,
      price: '18,000원대',
      tags: ['치킨맛집', '양념치킨', '맥주', '야외석'],
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400',
      isHealthy: false,
      description: '바삭바삭한 치킨과 시원한 맥주가 있는 곳'
    },
    {
      id: '8',
      name: '초밥조바',
      category: '일식/스시',
      rating: 4.8,
      walkTime: 10,
      waitTime: 30,
      price: '25,000원대',
      tags: ['스시', '오마카세', '고급스러움', '신선함'],
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
      isHealthy: true,
      description: '신선한 회와 정통 스시를 즐길 수 있는 고급 일식집'
    },
    {
      id: '9',
      name: '브라운피자',
      category: '피자',
      rating: 4.1,
      walkTime: 7,
      waitTime: 25,
      price: '16,000원대',
      tags: ['피자', '치즈', '도미노스타일', '배달가능'],
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
      isHealthy: false,
      description: '치즈가 듬뿍 들어간 정통 이탈리안 피자'
    },
    {
      id: '10',
      name: '뽕커리',
      category: '베트남음식',
      rating: 4.3,
      walkTime: 4,
      waitTime: 8,
      price: '11,000원대',
      tags: ['쌀국수', '베트남', '신선함', '가벼운음식'],
      image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400',
      isHealthy: true,
      description: '신선한 채소와 쌀국수가 맛있는 베트남 음식점'
    },
    {
      id: '11',
      name: '기괴떡볶이',
      category: '분식',
      rating: 4.0,
      walkTime: 2,
      waitTime: 3,
      price: '5,000원대',
      tags: ['떡볶이', '분식', '가성비', '빠른식사'],
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
      isHealthy: false,
      description: '매콤달콤한 떡볶이와 다양한 분식 메뉴'
    },
    {
      id: '12',
      name: '인백',
      category: '양식/스테이크',
      rating: 4.9,
      walkTime: 12,
      waitTime: 40,
      price: '35,000원대',
      tags: ['스테이크', '고급', '와인', '데이트'],
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
      isHealthy: false,
      description: '프리미엄 스테이크와 와인을 즐길 수 있는 고급 레스토랑'
    },
    {
      id: '13',
      name: '김밥지옥',
      category: '김밥/도시락',
      rating: 4.2,
      walkTime: 1,
      waitTime: 1,
      price: '4,000원대',
      tags: ['김밥', '도시락', '가성비', '빠른식사'],
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
      isHealthy: true,
      description: '신선한 김밥과 다양한 도시락 메뉴'
    },
    {
      id: '14',
      name: '뿡차이',
      category: '중식',
      rating: 4.4,
      walkTime: 6,
      waitTime: 15,
      price: '14,000원대',
      tags: ['탕수육', '중식', '짜장면', '단체'],
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d4a9?w=400',
      isHealthy: false,
      description: '바삭한 탕수육과 정통 중식 요리'
    },
    {
      id: '15',
      name: '카페인절제',
      category: '샌드위치',
      rating: 4.1,
      walkTime: 3,
      waitTime: 5,
      price: '7,000원대',
      tags: ['샌드위치', '브런치', '가벼운음식', '시원한음식'],
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400',
      isHealthy: true,
      description: '신선한 재료로 만든 다양한 샌드위치'
    },
    {
      id: '16',
      name: '요거트 아이스크림의 교과서',
      category: '디저트',
      rating: 4.5,
      walkTime: 5,
      waitTime: 10,
      price: '6,000원대',
      tags: ['아이스크림', '디저트', '시원한음식', '야외석'],
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400',
      isHealthy: false,
      description: '수제 아이스크림과 다양한 디저트'
    }
  ];

  const getFilteredRestaurants = () => {
    let filtered = [...mockRestaurants];
    
    if (preferences.healthyOnly) {
      filtered = filtered.filter(r => r.isHealthy);
    }

    // 날씨별 추천 로직
    if (weather?.condition === '비') {
      // 비올 때는 가까운 곳 우선
      filtered = filtered.filter(r => r.walkTime <= 3);
      filtered.sort((a, b) => a.walkTime - b.walkTime);
    } else if (weather?.condition === '눈') {
      // 눈올 때는 따뜻한 국물 요리 우선
      filtered = filtered.filter(r => 
        r.category === '한정식' || 
        r.category === '일식/라멘' || 
        r.tags.includes('따뜻한국물')
      );
    } else if (weather?.condition === '더움') {
      // 더울 때는 시원한 음식 우선
      filtered = filtered.filter(r => 
        r.category === '샐러드/건강식' || 
        r.category === '카페' || 
        r.tags.includes('시원한음식')
      );
    } else if (weather?.condition === '안개') {
      // 안개가 끼면 가까운 곳 우선
      filtered = filtered.filter(r => r.walkTime <= 4);
    } else if (weather?.condition === '맑음' && weather?.temperature > 20) {
      // 좋은 날씨일 때는 야외석 있는 곳도 추천
      const outdoorRestaurants = filtered.filter(r => r.tags.includes('야외석'));
      if (outdoorRestaurants.length > 0) {
        filtered = [...filtered, ...outdoorRestaurants];
      }
    } else if (weather?.condition === '흐림') {
      // 흐릴 때는 실내 식당 우선
      filtered = filtered.filter(r => r.walkTime <= 5);
    }

    return filtered.slice(0, 3);
  };

  const loadRecommendations = () => {
    setLoading(true);
    setTimeout(() => {
      setRestaurants(getFilteredRestaurants());
      setLoading(false);
    }, 1000);
  };

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    
    toast({
      title: "식당 선택 완료! 🎉",
      description: `${restaurant.name}을(를) 선택하셨습니다. 맛있는 점심 되세요!`,
      duration: 3000,
    });

    // 3초 후 선택 상태 초기화
    setTimeout(() => {
      setSelectedRestaurant(null);
    }, 3000);
  };

  const handleCancelSelection = () => {
    setSelectedRestaurant(null);
    toast({
      title: "선택 취소",
      description: "식당 선택이 취소되었습니다.",
      duration: 2000,
    });
  };

  useEffect(() => {
    loadRecommendations();
  }, [preferences, weather]);

  const getRecommendationReason = () => {
    const reasons = [];
    if (preferences.healthyOnly) reasons.push('건강식 우선');
    
    // 날씨별 추천 이유
    if (weather?.condition === '맑음') reasons.push('좋은 날씨');
    else if (weather?.condition === '비') reasons.push('비 오는 날');
    else if (weather?.condition === '눈') reasons.push('따뜻한 국물');
    else if (weather?.condition === '더움') reasons.push('시원한 음식');
    else if (weather?.condition === '안개') reasons.push('가까운 곳');
    else if (weather?.condition === '흐림') reasons.push('실내 식당');
    
    if (preferences.soloMode) reasons.push('혼밥 친화적');
    
    return reasons.length > 0 ? reasons.join(' + ') + ' 기준' : '종합 추천';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 선택된 식당 표시 */}
      {selectedRestaurant && (
        <Card className="border-primary bg-primary/5 animate-scale-in">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{selectedRestaurant.name}</h3>
                  <p className="text-sm text-gray-600">{selectedRestaurant.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCancelSelection}
                >
                  <X className="h-4 w-4 mr-1" />
                  취소
                </Button>
                <Button 
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "예약 완료! 📅",
                      description: `${selectedRestaurant.name} 예약이 완료되었습니다.`,
                      duration: 3000,
                    });
                  }}
                >
                  예약하기
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              🎯 오늘의 추천 ({getRecommendationReason()})
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={loadRecommendations}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              새로고침
            </Button>
          </div>
          <div className="text-sm text-gray-600">
            현재 날씨: {weather?.condition} {weather?.icon} {weather?.temperature}°C | 점심시간까지 30분 남음
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {restaurants.map((restaurant, index) => {
                const isSelected = selectedRestaurant?.id === restaurant.id;
                return (
                  <Card 
                    key={restaurant.id} 
                    className={`hover-lift shadow-card hover:shadow-card-hover transition-all duration-300 animate-scale-in ${
                      isSelected ? 'border-primary bg-primary/5' : ''
                    }`} 
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                      {restaurant.isHealthy && (
                        <Badge className="absolute top-2 right-2 bg-green-500">
                          건강식
                        </Badge>
                      )}
                      {isSelected && (
                        <div className="absolute top-2 left-2 bg-primary text-white rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{restaurant.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{restaurant.description}</p>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-gray-500" />
                            <span>도보 {restaurant.walkTime}분</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-gray-500" />
                            <span>대기 {restaurant.waitTime}분</span>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-primary">
                          {restaurant.price}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {restaurant.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button 
                        className="w-full" 
                        size="sm"
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => handleSelectRestaurant(restaurant)}
                        disabled={selectedRestaurant && !isSelected}
                      >
                        {isSelected ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            선택됨
                          </>
                        ) : (
                          '선택하기'
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuRecommendation;
