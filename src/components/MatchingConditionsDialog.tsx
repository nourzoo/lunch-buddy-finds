
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Filter } from 'lucide-react';

interface MatchingConditions {
  ageGroups: string[];
  gender: string;
  location: string[];
  eatingStyle: string[];
}

interface MatchingConditionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (conditions: MatchingConditions) => void;
  currentConditions: MatchingConditions;
}

const MatchingConditionsDialog = ({ 
  isOpen, 
  onClose, 
  onApply, 
  currentConditions 
}: MatchingConditionsDialogProps) => {
  const [conditions, setConditions] = useState<MatchingConditions>(currentConditions);

  const ageOptions = ['20대', '30대', '40대 이상'];
  const genderOptions = ['남성', '여성', '상관없음'];
  const locationOptions = ['강남 근처', '내 위치 반경 3km', '같은 건물', '도보 10분 이내'];
  const eatingStyleOptions = ['말 많은 사람', '조용한 식사 선호', '맛집 탐방 좋아함', '빠른 식사 선호'];

  const handleAgeToggle = (age: string, checked: boolean) => {
    if (checked) {
      setConditions({...conditions, ageGroups: [...conditions.ageGroups, age]});
    } else {
      setConditions({...conditions, ageGroups: conditions.ageGroups.filter(a => a !== age)});
    }
  };

  const handleLocationToggle = (location: string, checked: boolean) => {
    if (checked) {
      setConditions({...conditions, location: [...conditions.location, location]});
    } else {
      setConditions({...conditions, location: conditions.location.filter(l => l !== location)});
    }
  };

  const handleEatingStyleToggle = (style: string, checked: boolean) => {
    if (checked) {
      setConditions({...conditions, eatingStyle: [...conditions.eatingStyle, style]});
    } else {
      setConditions({...conditions, eatingStyle: conditions.eatingStyle.filter(s => s !== style)});
    }
  };

  const handleApply = () => {
    onApply(conditions);
    onClose();
  };

  const handleReset = () => {
    setConditions({
      ageGroups: [],
      gender: '상관없음',
      location: [],
      eatingStyle: []
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <Card className="border-0 shadow-none">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                매칭 조건 설정
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 나이대 선택 */}
            <div>
              <Label className="text-sm font-medium mb-3 block">나이대</Label>
              <div className="grid grid-cols-3 gap-3">
                {ageOptions.map((age) => (
                  <div key={age} className="flex items-center space-x-2">
                    <Checkbox
                      id={`age-${age}`}
                      checked={conditions.ageGroups.includes(age)}
                      onCheckedChange={(checked) => handleAgeToggle(age, !!checked)}
                    />
                    <Label htmlFor={`age-${age}`} className="text-sm">{age}</Label>
                  </div>
                ))}
              </div>
              {conditions.ageGroups.length === 0 && (
                <p className="text-xs text-gray-500 mt-2">미선택 시 모든 나이대 포함</p>
              )}
            </div>

            {/* 성별 선택 */}
            <div>
              <Label className="text-sm font-medium mb-3 block">성별</Label>
              <div className="grid grid-cols-3 gap-3">
                {genderOptions.map((gender) => (
                  <div key={gender} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`gender-${gender}`}
                      name="gender"
                      value={gender}
                      checked={conditions.gender === gender}
                      onChange={(e) => setConditions({...conditions, gender: e.target.value})}
                    />
                    <Label htmlFor={`gender-${gender}`} className="text-sm">{gender}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* 위치 선택 */}
            <div>
              <Label className="text-sm font-medium mb-3 block">위치</Label>
              <div className="grid grid-cols-2 gap-3">
                {locationOptions.map((location) => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox
                      id={`location-${location}`}
                      checked={conditions.location.includes(location)}
                      onCheckedChange={(checked) => handleLocationToggle(location, !!checked)}
                    />
                    <Label htmlFor={`location-${location}`} className="text-sm">{location}</Label>
                  </div>
                ))}
              </div>
              {conditions.location.length === 0 && (
                <p className="text-xs text-gray-500 mt-2">미선택 시 모든 위치 포함</p>
              )}
            </div>

            {/* 식사 스타일 선택 */}
            <div>
              <Label className="text-sm font-medium mb-3 block">식사 스타일</Label>
              <div className="grid grid-cols-2 gap-3">
                {eatingStyleOptions.map((style) => (
                  <div key={style} className="flex items-center space-x-2">
                    <Checkbox
                      id={`style-${style}`}
                      checked={conditions.eatingStyle.includes(style)}
                      onCheckedChange={(checked) => handleEatingStyleToggle(style, !!checked)}
                    />
                    <Label htmlFor={`style-${style}`} className="text-sm">{style}</Label>
                  </div>
                ))}
              </div>
              {conditions.eatingStyle.length === 0 && (
                <p className="text-xs text-gray-500 mt-2">미선택 시 모든 스타일 포함</p>
              )}
            </div>

            {/* 현재 선택된 조건 미리보기 */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">선택된 조건:</h4>
              <div className="space-y-2">
                {conditions.ageGroups.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <span className="text-sm text-gray-600">나이대:</span>
                    {conditions.ageGroups.map(age => (
                      <Badge key={age} variant="secondary" className="text-xs">{age}</Badge>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">성별:</span>
                  <Badge variant="secondary" className="text-xs">{conditions.gender}</Badge>
                </div>
                {conditions.location.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <span className="text-sm text-gray-600">위치:</span>
                    {conditions.location.map(loc => (
                      <Badge key={loc} variant="secondary" className="text-xs">{loc}</Badge>
                    ))}
                  </div>
                )}
                {conditions.eatingStyle.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <span className="text-sm text-gray-600">스타일:</span>
                    {conditions.eatingStyle.map(style => (
                      <Badge key={style} variant="secondary" className="text-xs">{style}</Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="flex gap-3 pt-4">
              <Button onClick={handleApply} className="flex-1">
                조건 적용
              </Button>
              <Button variant="outline" onClick={handleReset}>
                초기화
              </Button>
              <Button variant="ghost" onClick={onClose}>
                취소
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MatchingConditionsDialog;
