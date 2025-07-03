import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, 
  Edit, 
  Save, 
  X, 
  Award, 
  Users, 
  Utensils,
  Clock,
  MapPin,
  Heart,
  AlertTriangle,
  MessageSquare
} from 'lucide-react';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingIntro, setEditingIntro] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '최승연',
    avatar: '👨‍💻',
    department: '개발팀',
    joinDate: '2024.01.15',
    totalMeals: 42,
    favoriteRestaurants: ['샐러드야', '놀링파스타', '푸근한한식집'],
    dietType: '건강식 선호',
    allergies: ['견과류', '갑각류'],
    dislikes: ['매운음식'],
    matchingStatus: '매칭 대기중',
    introduction: '맛있는 점심 함께 해요! 건강한 음식 좋아해요 😊'
  });
  const [tempUserInfo, setTempUserInfo] = useState(userInfo);
  const [tempIntro, setTempIntro] = useState(userInfo.introduction);

  const handleEdit = () => {
    setTempUserInfo(userInfo);
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserInfo(tempUserInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempUserInfo(userInfo);
    setIsEditing(false);
  };

  const handleIntroEdit = () => {
    setTempIntro(userInfo.introduction);
    setEditingIntro(true);
  };

  const handleIntroSave = () => {
    setUserInfo(prev => ({ ...prev, introduction: tempIntro }));
    setEditingIntro(false);
  };

  const handleIntroCancel = () => {
    setTempIntro(userInfo.introduction);
    setEditingIntro(false);
  };

  const addAllergy = () => {
    const newAllergy = prompt('새로운 알레르기를 입력하세요:');
    if (newAllergy && newAllergy.trim()) {
      setTempUserInfo(prev => ({
        ...prev,
        allergies: [...prev.allergies, newAllergy.trim()]
      }));
    }
  };

  const removeAllergy = (index: number) => {
    setTempUserInfo(prev => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index)
    }));
  };

  const addDislike = () => {
    const newDislike = prompt('새로운 기피음식을 입력하세요:');
    if (newDislike && newDislike.trim()) {
      setTempUserInfo(prev => ({
        ...prev,
        dislikes: [...prev.dislikes, newDislike.trim()]
      }));
    }
  };

  const removeDislike = (index: number) => {
    setTempUserInfo(prev => ({
      ...prev,
      dislikes: prev.dislikes.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              내 프로필
            </CardTitle>
            {!isEditing && (
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                편집
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 기본 정보 */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">{userInfo.avatar}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{userInfo.name}</h2>
                <Badge variant="outline">{userInfo.department}</Badge>
              </div>
              <p className="text-gray-600">가입일: {userInfo.joinDate}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Utensils className="h-4 w-4 text-primary" />
                  <span>총 {userInfo.totalMeals}회 식사</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-primary" />
                  <span>매칭률 95%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 한 줄 소개 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                한 줄 소개
              </Label>
              {!editingIntro && (
                <Button variant="ghost" size="sm" onClick={handleIntroEdit}>
                  <Edit className="h-3 w-3" />
                </Button>
              )}
            </div>
            {editingIntro ? (
              <div className="space-y-2">
                <Input
                  value={tempIntro}
                  onChange={(e) => setTempIntro(e.target.value)}
                  placeholder="자신을 한 줄로 소개해주세요"
                  maxLength={50}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleIntroSave}>
                    <Save className="h-3 w-3 mr-1" />
                    저장
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleIntroCancel}>
                    취소
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 p-2 bg-gray-50 rounded-lg">
                {userInfo.introduction}
              </p>
            )}
          </div>

          {/* 매칭 상태 */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              매칭 상태
            </Label>
            {isEditing ? (
              <Select 
                value={tempUserInfo.matchingStatus} 
                onValueChange={(value) => setTempUserInfo(prev => ({...prev, matchingStatus: value}))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="매칭 대기중">매칭 대기중</SelectItem>
                  <SelectItem value="매칭 완료">매칭 완료</SelectItem>
                  <SelectItem value="식사중">식사중</SelectItem>
                  <SelectItem value="오프라인">오프라인</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Badge 
                variant={
                  userInfo.matchingStatus === '매칭 대기중' ? 'default' :
                  userInfo.matchingStatus === '매칭 완료' ? 'secondary' :
                  userInfo.matchingStatus === '식사중' ? 'destructive' : 'outline'
                }
              >
                {userInfo.matchingStatus}
              </Badge>
            )}
          </div>

          {/* 식단 유형 */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              식단 유형
            </Label>
            {isEditing ? (
              <Select 
                value={tempUserInfo.dietType} 
                onValueChange={(value) => setTempUserInfo(prev => ({...prev, dietType: value}))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="건강식 선호">건강식 선호</SelectItem>
                  <SelectItem value="채식주의자">채식주의자</SelectItem>
                  <SelectItem value="단백질 위주">단백질 위주</SelectItem>
                  <SelectItem value="아무거나 잘 먹음">아무거나 잘 먹음</SelectItem>
                  <SelectItem value="매운음식 선호">매운음식 선호</SelectItem>
                  <SelectItem value="담백한 음식 선호">담백한 음식 선호</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Badge variant="secondary">{userInfo.dietType}</Badge>
            )}
          </div>

          {/* 알레르기 */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              알레르기
            </Label>
            <div className="flex flex-wrap gap-2">
              {(isEditing ? tempUserInfo.allergies : userInfo.allergies).map((allergy, index) => (
                <Badge key={index} variant="destructive" className="flex items-center gap-1">
                  {allergy}
                  {isEditing && (
                    <button onClick={() => removeAllergy(index)}>
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </Badge>
              ))}
              {isEditing && (
                <Button variant="outline" size="sm" onClick={addAllergy}>
                  + 추가
                </Button>
              )}
            </div>
          </div>

          {/* 기피음식 */}
          <div className="space-y-2">
            <Label>기피음식</Label>
            <div className="flex flex-wrap gap-2">
              {(isEditing ? tempUserInfo.dislikes : userInfo.dislikes).map((dislike, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  {dislike}
                  {isEditing && (
                    <button onClick={() => removeDislike(index)}>
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </Badge>
              ))}
              {isEditing && (
                <Button variant="outline" size="sm" onClick={addDislike}>
                  + 추가
                </Button>
              )}
            </div>
          </div>

          {/* 선호 식당 */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              선호 식당
            </Label>
            <div className="flex flex-wrap gap-2">
              {userInfo.favoriteRestaurants.map((restaurant, index) => (
                <Badge key={index} variant="secondary">
                  {restaurant}
                </Badge>
              ))}
            </div>
          </div>

          {/* 편집 버튼 */}
          {isEditing && (
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                저장
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                취소
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
