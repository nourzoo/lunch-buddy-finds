
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, MapPin, Users, RefreshCw } from 'lucide-react';

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
}

const MenuRecommendation = ({ preferences }: MenuRecommendationProps) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [weather] = useState('맑음');

  const mockRestaurants: Restaurant[] = [
    {
      id: '1',
      name: '건강한맛집',
      category: '샐러드/건강식',
      rating: 4.5,
      walkTime: 3,
      waitTime: 5,
      price: '8,000원대',
      tags: ['저칼로리', '신선함', '영양만점'],
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
      isHealthy: true,
      description: '신선한 재료로 만든 건강한 샐러드와 저칼로리 메뉴'
    },
    {
      id: '2',
      name: '트렌디파스타',
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
      name: '한정식온누리',
      category: '한정식',
      rating: 4.7,
      walkTime: 2,
      waitTime: 0,
      price: '15,000원대',
      tags: ['전통맛', '영양균형', '혼밥가능'],
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
      isHealthy: true,
      description: '정통 한정식으로 영양 균형이 잘 잡힌 식사'
    },
    {
      id: '4',
      name: '라멘하우스',
      category: '일식/라멘',
      rating: 4.2,
      walkTime: 4,
      waitTime: 15,
      price: '9,000원대',
      tags: ['진한국물', '대중적', '양많음'],
      image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400',
      isHealthy: false,
      description: '진한 국물이 자랑인 정통 일본식 라멘'
    },
    {
      id: '5',
      name: '도시락카페',
      category: '도시락/간편식',
      rating: 4.0,
      walkTime: 1,
      waitTime: 2,
      price: '6,000원대',
      tags: ['빠른식사', '가성비', '든든함'],
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
      isHealthy: true,
      description: '바쁜 직장인을 위한 간편하고 든든한 도시락'
    }
  ];

  const getFilteredRestaurants = () => {
    let filtered = [...mockRestaurants];
    
    if (preferences.healthyOnly) {
      filtered = filtered.filter(r => r.isHealthy);
    }

    // 날씨별 추천
    if (weather === '비') {
      filtered = filtered.filter(r => r.walkTime <= 3);
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

  useEffect(() => {
    loadRecommendations();
  }, [preferences]);

  const getRecommendationReason = () => {
    const reasons = [];
    if (preferences.healthyOnly) reasons.push('건강식 우선');
    if (weather === '맑음') reasons.push('좋은 날씨');
    if (preferences.soloMode) reasons.push('혼밥 친화적');
    
    return reasons.length > 0 ? reasons.join(' + ') + ' 기준' : '종합 추천';
  };

  return (
    <div className="space-y-6 animate-fade-in">
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
            현재 날씨: {weather} ☀️ | 점심시간까지 30분 남음
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
              {restaurants.map((restaurant, index) => (
                <Card key={restaurant.id} className="hover-lift shadow-card hover:shadow-card-hover transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
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
                    
                    <Button className="w-full" size="sm">
                      선택하기
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuRecommendation;
