
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import UserProfile from '@/components/UserProfile';
import MenuRecommendation from '@/components/MenuRecommendation';
import MatchingSystem from '@/components/MatchingSystem';
import RestaurantInfo from '@/components/RestaurantInfo';
import ReviewSystem from '@/components/ReviewSystem';
import { User, Utensils, Users, Clock, MessageSquare, CloudSun } from 'lucide-react';

const Index = () => {
  const [userPreferences, setUserPreferences] = useState({
    healthyOnly: false,
    soloMode: false,
    location: '강남구 역삼동',
    lunchTime: '12:00-13:00'
  });

  const [matchingMode, setMatchingMode] = useState<'solo' | 'select' | 'random'>('random');
  const [weather, setWeather] = useState({
    condition: '로딩중...',
    temperature: 0,
    icon: '⏳',
    description: '날씨 정보를 가져오는 중입니다.'
  });
  const [weatherLoading, setWeatherLoading] = useState(true);

  // 날씨 상태를 한글로 변환하는 함수
  const getWeatherCondition = (weatherCode: number, temperature: number) => {
    if (weatherCode >= 0 && weatherCode <= 3) {
      if (temperature > 25) return { condition: '더움', icon: '🔥' };
      return { condition: '맑음', icon: '☀️' };
    } else if (weatherCode >= 45 && weatherCode <= 48) {
      return { condition: '안개', icon: '🌫️' };
    } else if (weatherCode >= 51 && weatherCode <= 55) {
      return { condition: '비', icon: '🌧️' };
    } else if (weatherCode >= 56 && weatherCode <= 67) {
      return { condition: '비', icon: '🌧️' };
    } else if (weatherCode >= 71 && weatherCode <= 77) {
      return { condition: '눈', icon: '❄️' };
    } else if (weatherCode >= 80 && weatherCode <= 82) {
      return { condition: '비', icon: '🌧️' };
    } else if (weatherCode >= 85 && weatherCode <= 86) {
      return { condition: '눈', icon: '❄️' };
    } else if (weatherCode >= 95 && weatherCode <= 99) {
      return { condition: '비', icon: '🌧️' };
    } else {
      return { condition: '흐림', icon: '☁️' };
    }
  };

  // 날씨 설명 생성 함수
  const getWeatherDescription = (condition: string, temperature: number) => {
    switch (condition) {
      case '맑음':
        return temperature > 20 ? '좋은 날씨예요! 야외 식당도 추천드릴게요.' : '맑지만 쌀쌀해요. 실내 식당이 좋겠어요.';
      case '흐림':
        return '실내 식당이 좋을 것 같아요.';
      case '비':
        return '우산 챙기고 가까운 곳으로 가세요!';
      case '눈':
        return '따뜻한 국물 요리가 좋겠어요.';
      case '안개':
        return '안전하게 가까운 곳으로 가세요.';
      case '더움':
        return '시원한 음식이나 에어컨 있는 곳을 추천해요.';
      default:
        return '오늘도 맛있는 점심 되세요!';
    }
  };

  // Open-Meteo API에서 날씨 데이터 가져오기
  const fetchWeather = async () => {
    try {
      setWeatherLoading(true);
      // 서울 좌표 (강남구 기준)
      const latitude = 37.5172;
      const longitude = 127.0473;
      
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&timezone=Asia%2FTokyo`
      );
      
      if (!response.ok) {
        throw new Error('날씨 데이터를 가져올 수 없습니다.');
      }
      
      const data = await response.json();
      const current = data.current;
      const temperature = Math.round(current.temperature_2m);
      const weatherCode = current.weather_code;
      const humidity = current.relative_humidity_2m;
      const windSpeed = current.wind_speed_10m;
      
      const { condition, icon } = getWeatherCondition(weatherCode, temperature);
      const description = getWeatherDescription(condition, temperature);
      
      setWeather({
        condition,
        temperature,
        icon,
        description
      });
    } catch (error) {
      console.error('날씨 데이터 가져오기 실패:', error);
      setWeather({
        condition: '오류',
        temperature: 0,
        icon: '❌',
        description: '날씨 정보를 가져올 수 없습니다.'
      });
    } finally {
      setWeatherLoading(false);
    }
  };

  // 컴포넌트 마운트 시 날씨 데이터 가져오기
  useEffect(() => {
    fetchWeather();
    
    // 30분마다 날씨 데이터 업데이트
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleMatchingModeChange = (mode: 'solo' | 'select' | 'random') => {
    setMatchingMode(mode);
    // 혼밥 모드 선택 시 preferences도 업데이트
    if (mode === 'solo') {
      const newPrefs = { ...userPreferences, soloMode: true };
      setUserPreferences(newPrefs);
    } else {
      const newPrefs = { ...userPreferences, soloMode: false };
      setUserPreferences(newPrefs);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🍽️ 점심메이트
          </h1>
          <p className="text-lg text-gray-600">
            바쁜 직장인을 위한 점심 추천 & 매칭 서비스
          </p>
        </div>

        {/* 날씨 및 매칭 방법 선택 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <CloudSun className="h-5 w-5 text-primary" />
                  오늘의 날씨
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={fetchWeather}
                  disabled={weatherLoading}
                  className="text-xs"
                >
                  {weatherLoading ? '로딩중...' : '새로고침'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{weather.temperature}°C</p>
                  <p className="text-gray-600">{weather.condition}</p>
                </div>
                <div className="text-4xl">{weather.icon}</div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {weather.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                매칭 방법 선택
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={matchingMode} onValueChange={handleMatchingModeChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="solo" id="solo" />
                  <Label htmlFor="solo" className="text-sm">혼밥 (조용히 식사)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="select" id="select" />
                  <Label htmlFor="select" className="text-sm">사람 선택 (직접 고르기)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="random" id="random" />
                  <Label htmlFor="random" className="text-sm">랜덤 매칭 (자동 매칭)</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recommendation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="recommendation" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              <span className="hidden sm:inline">추천</span>
            </TabsTrigger>
            <TabsTrigger value="matching" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">매칭</span>
            </TabsTrigger>
            <TabsTrigger value="realtime" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">실시간</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">리뷰</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">프로필</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommendation" className="space-y-6">
            <MenuRecommendation preferences={userPreferences} weather={weather} />
          </TabsContent>

          <TabsContent value="matching" className="space-y-6">
            <MatchingSystem preferences={userPreferences} matchingMode={matchingMode} />
          </TabsContent>

          <TabsContent value="realtime" className="space-y-6">
            <RestaurantInfo />
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <ReviewSystem />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <UserProfile onPreferencesChange={setUserPreferences} />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">🍽️ 점심메이트 - 직장인을 위한 점심 솔루션</p>
            <p className="text-sm">바쁜 일상 속에서도 맛있고 건강한 점심을 즐기세요</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
