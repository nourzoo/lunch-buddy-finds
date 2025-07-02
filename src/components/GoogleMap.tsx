import { useEffect, useRef, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Phone, Clock, Star } from 'lucide-react';

interface Restaurant {
  name: string;
  lat: number;
  lng: number;
  rating: number;
  waitTime: number;
  status: string;
  category: string;
  price: string;
}

interface GoogleMapProps {
  userLocation: { lat: number; lng: number } | null;
  restaurants: Restaurant[];
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const GoogleMap = ({ userLocation, restaurants }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  const initMap = useCallback(() => {
    if (!mapRef.current || !window.google) return;

    try {
      const defaultLocation = { lat: 37.5172, lng: 127.0473 }; // 강남역
      const center = userLocation || defaultLocation;

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 15,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      setMap(mapInstance);

      // 사용자 위치 마커
      if (userLocation) {
        new window.google.maps.Marker({
          position: userLocation,
          map: mapInstance,
          title: '내 위치',
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8" fill="#4285F4" stroke="white" stroke-width="2"/>
                <circle cx="12" cy="12" r="3" fill="white"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(24, 24)
          }
        });
      }

      // 식당 마커들
      const newMarkers = restaurants.map((restaurant) => {
        const marker = new window.google.maps.Marker({
          position: { lat: restaurant.lat, lng: restaurant.lng },
          map: mapInstance,
          title: restaurant.name,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="12" fill="#FF6B35" stroke="white" stroke-width="2"/>
                <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">🍽️</text>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(32, 32)
          }
        });

        // 정보창 생성
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; max-width: 200px;">
              <h3 style="margin: 0 0 4px 0; font-weight: bold;">${restaurant.name}</h3>
              <p style="margin: 0 0 4px 0; color: #666;">${restaurant.category}</p>
              <div style="display: flex; align-items: center; gap: 8px; margin: 4px 0;">
                <span style="color: #FF6B35;">★ ${restaurant.rating}</span>
                <span style="color: #666;">대기 ${restaurant.waitTime}분</span>
              </div>
              <p style="margin: 4px 0; font-weight: bold; color: #FF6B35;">${restaurant.price}</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          setSelectedRestaurant(restaurant);
          infoWindow.open(mapInstance, marker);
        });

        return marker;
      });

      setMarkers(newMarkers);
      setIsMapLoaded(true);
      setMapError(null);
    } catch (error) {
      console.error('지도 초기화 오류:', error);
      setMapError('지도를 불러오는 중 오류가 발생했습니다.');
    }
  }, [userLocation, restaurants]);

  // Google Maps API 로드
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        initMap();
        return;
      }

      // 이미 스크립트가 로드 중인지 확인
      if (document.querySelector('script[src*="maps.googleapis.com"]')) {
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=DEMO_KEY&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      script.onerror = () => {
        setMapError('Google Maps API를 불러올 수 없습니다.');
      };
      
      window.initMap = initMap;
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, [initMap]);

  // 지도 업데이트
  useEffect(() => {
    if (isMapLoaded && map) {
      initMap();
    }
  }, [userLocation, restaurants, isMapLoaded, map, initMap]);

  const openNavigation = (restaurant: Restaurant) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${restaurant.lat},${restaurant.lng}`;
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
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            주변 맛집 지도
          </CardTitle>
          <p className="text-sm text-gray-600">
            {userLocation ? '실시간 위치 기반 주변 식당' : '기본 위치 기준 주변 식당'}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 지도 */}
            <div 
              ref={mapRef} 
              className="w-full h-80 rounded-lg border"
              style={{ minHeight: '320px' }}
            >
              {!isMapLoaded && !mapError && (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p>지도를 불러오는 중...</p>
                    <p className="text-xs">잠시만 기다려주세요</p>
                  </div>
                </div>
              )}
              
              {mapError && (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p>{mapError}</p>
                    <p className="text-xs">데모 모드에서는 지도가 표시되지 않습니다</p>
                  </div>
                </div>
              )}
            </div>

            {/* 식당 목록 */}
            <div className="space-y-2">
              <h4 className="font-medium">주변 식당 목록</h4>
              {restaurants.map((restaurant) => (
                <div 
                  key={restaurant.name}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors hover-lift ${
                    selectedRestaurant?.name === restaurant.name 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:border-primary/30'
                  }`}
                  onClick={() => setSelectedRestaurant(restaurant)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-medium">{restaurant.name}</h5>
                        <Badge className={getStatusColor(restaurant.status)}>
                          {getStatusIcon(restaurant.status)} {restaurant.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{restaurant.category}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{restaurant.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gray-500" />
                          <span>대기 {restaurant.waitTime}분</span>
                        </div>
                        <span className="font-medium text-primary">{restaurant.price}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openNavigation(restaurant);
                        }}
                      >
                        <Navigation className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleMap; 