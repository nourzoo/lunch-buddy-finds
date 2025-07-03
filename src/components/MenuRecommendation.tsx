
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Utensils, Star, MapPin, Clock, Users, Thermometer, Lightbulb, TrendingUp, Heart, Salad } from 'lucide-react';

interface MenuRecommendationProps {
  preferences: any;
  weather: any;
  setTab: (tab: string) => void;
}

interface Restaurant {
  id: string;
  name: string;
  category: string;
  rating: number;
  distance: string;
  waitTime: string;
  priceRange: string;
  specialMenu: string;
  image: string;
  reviewCount: number;
  tags: string[];
  allergyWarning?: string[];
  reason?: string;
}

const MenuRecommendation = ({ preferences, weather, setTab }: MenuRecommendationProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('today');
  
  const categories = [
    { id: 'today', name: '오늘의 추천', icon: Star, description: 'AI가 날씨와 상황을 고려한 맞춤 추천' },
    { id: 'weather', name: '날씨별', icon: Thermometer, description: '현재 날씨에 어울리는 메뉴' },
    { id: 'korean', name: '한식', icon: Utensils, description: '든든한 한식 메뉴' },
    { id: 'international', name: '양식/중식', icon: TrendingUp, description: '이탈리안, 중식 등' },
    { id: 'healthy', name: '건강식', icon: Salad, description: '샐러드, 저칼로리 메뉴' },
    { id: 'quick', name: '간편식', icon: Clock, description: '빠르고 간단한 식사' }
  ];

  const todayRecommendations: Restaurant[] = [
    {
      id: '1',
      name: '샐러드야 강남점',
      category: '샐러드/건강식',
      rating: 4.6,
      distance: '도보 3분',
      waitTime: '5분',
      priceRange: '8,000-12,000원',
      specialMenu: '시저 샐러드, 그릴드 치킨 샐러드',
      image: '🥗',
      reviewCount: 234,
      tags: ['건강식', '다이어트', '신선한'],
      reason: `${weather.temperature}°C의 ${weather.condition} 날씨에 시원하고 건강한 샐러드가 좋겠어요!`
    },
    {
      id: '2',
      name: '놀링파스타',
      category: '이탈리안',
      rating: 4.4,
      distance: '도보 5분',
      waitTime: '10분',
      priceRange: '12,000-18,000원',
      specialMenu: '알리오올리오, 까르보나라',
      image: '🍝',
      reviewCount: 189,
      tags: ['이탈리안', '파스타', '분위기'],
      allergyWarning: ['유제품', '계란'],
      reason: '동료들과 함께 먹기 좋은 분위기 있는 파스타집이에요!'
    },
    {
      id: '3',
      name: '푸근한한식집',
      category: '한정식',
      rating: 4.7,
      distance: '도보 2분',
      waitTime: '즉시',
      priceRange: '9,000-15,000원',
      specialMenu: '김치찌개, 된장찌개 정식',
      image: '🍲',
      reviewCount: 456,
      tags: ['한식', '든든한', '집밥'],
      reason: '바쁜 하루에 따뜻하고 든든한 한식으로 에너지 충전하세요!'
    }
  ];

  const weatherRecommendations: Restaurant[] = weather.condition === '더움' || weather.temperature > 25 ? [
    {
      id: '4',
      name: '시원한냉면집',
      category: '냉면/국수',
      rating: 4.5,
      distance: '도보 4분',
      waitTime: '7분',
      priceRange: '8,000-12,000원',
      specialMenu: '물냉면, 비빔냉면',
      image: '🍜',
      reviewCount: 312,
      tags: ['시원한', '냉면', '여름'],
      reason: '더운 날씨에 시원한 냉면으로 더위를 식혀보세요!'
    },
    {
      id: '5',
      name: '아이스크림카페',
      category: '디저트',
      rating: 4.3,
      distance: '도보 6분',
      waitTime: '3분',
      priceRange: '5,000-8,000원',
      specialMenu: '젤라또, 빙수',
      image: '🍦',
      reviewCount: 98,
      tags: ['시원한', '디저트', '여름'],
      reason: '점심 후 시원한 디저트로 마무리해보세요!'
    }
  ] : [
    {
      id: '6',
      name: '따뜻한국밥집',
      category: '국밥',
      rating: 4.6,
      distance: '도보 3분',
      waitTime: '5분',
      priceRange: '7,000-10,000원',
      specialMenu: '돼지국밥, 순대국밥',
      image: '🍲',
      reviewCount: 278,
      tags: ['따뜻한', '국밥', '든든한'],
      reason: '쌀쌀한 날씨에 따뜻한 국밥으로 몸을 데워보세요!'
    }
  ];

  const koreanRecommendations: Restaurant[] = [
    {
      id: '7',
      name: '한솥도시락',
      category: '도시락',
      rating: 4.2,
      distance: '도보 2분',
      waitTime: '즉시',
      priceRange: '4,500-7,000원',
      specialMenu: '제육볶음, 불고기',
      image: '🍱',
      reviewCount: 534,
      tags: ['한식', '도시락', '간편'],
      reason: '바쁜 직장인을 위한 든든한 한식 도시락!'
    }
  ];

  const getRecommendationsByCategory = (categoryId: string): Restaurant[] => {
    switch (categoryId) {
      case 'today': return todayRecommendations;
      case 'weather': return weatherRecommendations;
      case 'korean': return [...todayRecommendations.filter(r => r.category.includes('한')), ...koreanRecommendations];
      case 'international': return todayRecommendations.filter(r => r.category.includes('이탈') || r.category.includes('중'));
      case 'healthy': return todayRecommendations.filter(r => r.category.includes('샐러드') || r.tags.includes('건강식'));
      case 'quick': return [...todayRecommendations.filter(r => r.waitTime === '즉시' || r.tags.includes('간편')), ...koreanRecommendations];
      default: return todayRecommendations;
    }
  };

  const currentRecommendations = getRecommendationsByCategory(selectedCategory);
  const selectedCategoryInfo = categories.find(c => c.id === selectedCategory);

  return (
    <div className="space-y-6">
      {/* AI 추천 컨텍스트 */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-primary">AI 추천 상황 분석</h3>
              <p className="text-sm text-gray-600">
                현재 시간: {new Date().toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit' })} | 
                날씨: {weather.temperature}°C {weather.condition} | 위치: {preferences.location}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            {weather.description}
          </p>
        </CardContent>
      </Card>

      {/* 카테고리 선택 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-primary" />
            메뉴 카테고리
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => setSelectedCategory(category.id)}
              >
                <category.icon className="h-5 w-5" />
                <span className="font-medium">{category.name}</span>
                <span className="text-xs text-gray-500 text-center leading-tight">
                  {category.description}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 추천 결과 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {selectedCategoryInfo?.icon && <selectedCategoryInfo.icon className="h-5 w-5 text-primary" />}
            {selectedCategoryInfo?.name} 추천
          </CardTitle>
          <p className="text-sm text-gray-600">{selectedCategoryInfo?.description}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentRecommendations.map((restaurant) => (
              <Card key={restaurant.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{restaurant.image}</div>
                      <div>
                        <h3 className="font-semibold">{restaurant.name}</h3>
                        <Badge variant="outline" className="text-xs mt-1">
                          {restaurant.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{restaurant.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500">리뷰 {restaurant.reviewCount}</p>
                    </div>
                  </div>

                  {restaurant.reason && (
                    <div className="p-3 bg-blue-50 rounded-lg mb-3 border-l-4 border-blue-200">
                      <p className="text-sm text-blue-800">
                        <Lightbulb className="h-4 w-4 inline mr-1" />
                        {restaurant.reason}
                      </p>
                    </div>
                  )}

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span>{restaurant.distance}</span>
                      <Clock className="h-3 w-3 text-gray-400 ml-2" />
                      <span>대기 {restaurant.waitTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3 text-gray-400" />
                      <span>{restaurant.priceRange}</span>
                    </div>
                    <p className="text-gray-600">대표메뉴: {restaurant.specialMenu}</p>
                  </div>

                  {restaurant.allergyWarning && (
                    <div className="mt-3 p-2 bg-red-50 rounded border-l-4 border-red-200">
                      <p className="text-sm text-red-700">
                        ⚠️ 알러지 주의: {restaurant.allergyWarning.join(', ')}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 mt-3">
                    {restaurant.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="flex-1">
                      상세보기
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setTab('matching')}
                    >
                      같이 먹기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 맞춤 설정 */}
      <Card>
        <CardHeader>
          <CardTitle>맞춤 설정</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant={preferences.healthyOnly ? "default" : "outline"} className="cursor-pointer">
              건강식만 보기
            </Badge>
            <Badge variant={preferences.soloMode ? "default" : "outline"} className="cursor-pointer">
              혼밥 모드
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              가격대 설정
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              거리 제한
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuRecommendation;
