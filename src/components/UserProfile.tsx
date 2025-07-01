
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { MapPin, Clock, Heart, Users } from 'lucide-react';

interface UserProfileProps {
  onPreferencesChange: (preferences: any) => void;
}

const UserProfile = ({ onPreferencesChange }: UserProfileProps) => {
  const [preferences, setPreferences] = useState({
    healthyOnly: false,
    soloMode: false,
    location: '강남구 역삼동',
    lunchTime: '12:00-13:00'
  });

  const userInfo = {
    name: '최승연',
    age: 27,
    role: '주니어 개발자',
    traits: ['트렌디한 메뉴', '사람과 함께', '새로운 경험'],
    color: 'bg-pink-100 text-pink-800'
  };

  const handlePreferenceChange = (key: string, value: any) => {
    const newPrefs = { ...preferences, [key]: value };
    setPreferences(newPrefs);
    onPreferencesChange(newPrefs);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            내 프로필
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg border bg-gradient-to-r from-pink-50 to-orange-50">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">{userInfo.name}</h3>
                <p className="text-sm text-gray-600">{userInfo.age}세, {userInfo.role}</p>
              </div>
              <div className="text-4xl">👩‍💻</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {userInfo.traits.map((trait, index) => (
                <Badge key={index} variant="secondary" className={userInfo.color}>
                  {trait}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            내 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">회사 위치</Label>
              <p className="text-sm text-gray-600 mt-1">{preferences.location}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">점심시간</Label>
              <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {preferences.lunchTime}
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary" />
                <Label htmlFor="healthy-mode" className="text-sm font-medium">건강식 우선</Label>
              </div>
              <Switch
                id="healthy-mode"
                checked={preferences.healthyOnly}
                onCheckedChange={(checked) => handlePreferenceChange('healthyOnly', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <Label htmlFor="solo-mode" className="text-sm font-medium">혼밥 모드</Label>
              </div>
              <Switch
                id="solo-mode"
                checked={preferences.soloMode}
                onCheckedChange={(checked) => handlePreferenceChange('soloMode', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
