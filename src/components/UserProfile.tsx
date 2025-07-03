
import { useState, createContext, useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Settings, 
  Edit, 
  Save, 
  X,
  Heart,
  Star,
  MessageCircle,
  Calendar,
  AlertTriangle,
  Users
} from 'lucide-react';

interface UserProfileProps {
  onClose?: () => void;
}

// 프로필 편집 모드 Context
export const ProfileEditContext = createContext<{
  isEditing: boolean;
  setIsEditing: (v: boolean) => void;
}|null>(null);

const UserProfile = ({ onClose }: UserProfileProps) => {
  const context = useContext(ProfileEditContext);
  const [localEditing, setLocalEditing] = useState(false);
  const isEditing = context ? context.isEditing : localEditing;
  const setIsEditing = context ? context.setIsEditing : setLocalEditing;
  const [userData, setUserData] = useState({
    name: '최승연',
    email: 'lunch@company.com',
    phone: '010-1234-5678',
    department: '개발팀',
    position: '프론트엔드 개발자',
    lunchTime: '12:00-13:00',
    interests: ['이탈리안', '샐러드/건강식', '카페'],
    bio: '맛있는 점심을 좋아하는 개발자입니다. 새로운 맛집 탐방을 즐겨요!',
    location: '강남구 역삼동',
    allergies: ['갑각류', '견과류'],
    dislikes: ['매운음식', '생선'],
    dietType: '다이어트 중',
    matchingMode: 'random' as 'solo' | 'select' | 'random'
  });

  const [editData, setEditData] = useState(userData);

  const commonAllergies = ['갑각류', '견과류', '유제품', '계란', '대두', '밀', '생선', '조개류'];
  const commonDislikes = ['매운음식', '생선', '내장류', '향신료', '파', '양파', '마늘'];
  const dietTypes = ['아무거나 잘 먹음', '다이어트 중', '단백질 위주', '채식주의자', '건강식 선호'];

  const stats = [
    { label: '매칭 횟수', value: '24', icon: Heart, color: 'text-red-500' },
    { label: '평균 평점', value: '4.8', icon: Star, color: 'text-yellow-500' },
    { label: '채팅 횟수', value: '156', icon: MessageCircle, color: 'text-blue-500' },
    { label: '활동일수', value: '89', icon: Calendar, color: 'text-green-500' }
  ];

  const recentMatches = [
    { name: '오일남', date: '2024-01-15', restaurant: '샐러드야', rating: 5 },
    { name: '오이녀', date: '2024-01-14', restaurant: '놀링파스타', rating: 4 },
    { name: '오삼남', date: '2024-01-13', restaurant: '푸근한한식집', rating: 5 }
  ];

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const handleAllergyToggle = (allergy: string, checked: boolean) => {
    if (checked) {
      setEditData({...editData, allergies: [...editData.allergies, allergy]});
    } else {
      setEditData({...editData, allergies: editData.allergies.filter(a => a !== allergy)});
    }
  };

  const handleDislikeToggle = (dislike: string, checked: boolean) => {
    if (checked) {
      setEditData({...editData, dislikes: [...editData.dislikes, dislike]});
    } else {
      setEditData({...editData, dislikes: editData.dislikes.filter(d => d !== dislike)});
    }
  };

  const getMatchingModeText = (mode: string) => {
    switch (mode) {
      case 'solo': return '🧘‍♀️ 혼밥';
      case 'select': return '👥 직접 선택';
      case 'random': return '🎲 랜덤 매칭';
      default: return '🎲 랜덤 매칭';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 relative">
            <h2 className="text-2xl font-bold">마이페이지</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="absolute right-0 top-1"
              aria-label="닫기"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 프로필 정보 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 기본 정보 카드 */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      기본 정보
                    </CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                      {isEditing ? '취소' : '편집'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 기본 정보 */}
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="text-2xl">
                        👨‍💻
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="name">이름</Label>
                            <Input 
                              id="name"
                              value={editData.name}
                              onChange={(e) => setEditData({...editData, name: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="bio">소개</Label>
                            <Textarea 
                              id="bio"
                              value={editData.bio}
                              onChange={(e) => setEditData({...editData, bio: e.target.value})}
                              rows={3}
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h3 className="text-xl font-semibold">{userData.name}</h3>
                          <p className="text-gray-600">{userData.bio}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="flex items-center gap-2 text-sm font-medium">
                        <Mail className="h-4 w-4" />
                        이메일
                      </Label>
                      {isEditing ? (
                        <Input 
                          value={editData.email}
                          onChange={(e) => setEditData({...editData, email: e.target.value})}
                        />
                      ) : (
                        <p className="text-gray-600">{userData.email}</p>
                      )}
                    </div>
                    <div>
                      <Label className="flex items-center gap-2 text-sm font-medium">
                        <Phone className="h-4 w-4" />
                        전화번호
                      </Label>
                      {isEditing ? (
                        <Input 
                          value={editData.phone}
                          onChange={(e) => setEditData({...editData, phone: e.target.value})}
                        />
                      ) : (
                        <p className="text-gray-600">{userData.phone}</p>
                      )}
                    </div>
                    <div>
                      <Label className="flex items-center gap-2 text-sm font-medium">
                        <MapPin className="h-4 w-4" />
                        위치
                      </Label>
                      {isEditing ? (
                        <Input 
                          value={editData.location}
                          onChange={(e) => setEditData({...editData, location: e.target.value})}
                        />
                      ) : (
                        <p className="text-gray-600">{userData.location}</p>
                      )}
                    </div>
                    <div>
                      <Label className="flex items-center gap-2 text-sm font-medium">
                        <Clock className="h-4 w-4" />
                        점심시간
                      </Label>
                      {isEditing ? (
                        <Input 
                          value={editData.lunchTime}
                          onChange={(e) => setEditData({...editData, lunchTime: e.target.value})}
                        />
                      ) : (
                        <p className="text-gray-600">{userData.lunchTime}</p>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleSave} className="flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        저장
                      </Button>
                      <Button variant="outline" onClick={handleCancel} className="flex-1">
                        취소
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 매칭 방식 설정 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    매칭 방식 설정
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">현재 매칭 방식</p>
                        <p className="text-sm text-gray-600">홈화면에서 언제든 변경 가능</p>
                      </div>
                      <Badge variant="default" className="text-sm">
                        {getMatchingModeText(userData.matchingMode)}
                      </Badge>
                    </div>
                    
                    {isEditing && (
                      <div>
                        <Label className="text-sm font-medium mb-3 block">매칭 방식 변경</Label>
                        <RadioGroup 
                          value={editData.matchingMode} 
                          onValueChange={(value) => setEditData({...editData, matchingMode: value as any})}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="solo" id="edit-solo" />
                            <Label htmlFor="edit-solo" className="text-sm">혼밥 (조용히 식사)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="select" id="edit-select" />
                            <Label htmlFor="edit-select" className="text-sm">사람 선택 (직접 고르기)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="random" id="edit-random" />
                            <Label htmlFor="edit-random" className="text-sm">랜덤 매칭 (자동 매칭)</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* 식단 특성 및 알러지 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    식단 특성 및 알러지 정보
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 식단 특성 */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">식단 특성</Label>
                    {isEditing ? (
                      <RadioGroup 
                        value={editData.dietType} 
                        onValueChange={(value) => setEditData({...editData, dietType: value})}
                      >
                        <div className="grid grid-cols-2 gap-2">
                          {dietTypes.map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <RadioGroupItem value={type} id={`diet-${type}`} />
                              <Label htmlFor={`diet-${type}`} className="text-sm">{type}</Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    ) : (
                      <Badge variant="secondary" className="text-sm">{userData.dietType}</Badge>
                    )}
                  </div>

                  {/* 알러지 정보 */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">알러지 (못 먹는 식재료)</Label>
                    {isEditing ? (
                      <div className="grid grid-cols-2 gap-2">
                        {commonAllergies.map((allergy) => (
                          <div key={allergy} className="flex items-center space-x-2">
                            <Checkbox
                              id={`allergy-${allergy}`}
                              checked={editData.allergies.includes(allergy)}
                              onCheckedChange={(checked) => handleAllergyToggle(allergy, !!checked)}
                            />
                            <Label htmlFor={`allergy-${allergy}`} className="text-sm">{allergy}</Label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {userData.allergies.length > 0 ? userData.allergies.map((allergy) => (
                          <Badge key={allergy} variant="destructive" className="text-xs">
                            ⚠️ {allergy}
                          </Badge>
                        )) : <span className="text-gray-500 text-sm">없음</span>}
                      </div>
                    )}
                  </div>

                  {/* 기피 식재료 */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">기피 식재료 (싫어하는 음식)</Label>
                    {isEditing ? (
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          {commonDislikes.map((dislike) => (
                            <div key={dislike} className="flex items-center space-x-2">
                              <Checkbox
                                id={`dislike-${dislike}`}
                                checked={editData.dislikes.includes(dislike)}
                                onCheckedChange={(checked) => handleDislikeToggle(dislike, !!checked)}
                              />
                              <Label htmlFor={`dislike-${dislike}`} className="text-sm">{dislike}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {userData.dislikes.length > 0 ? userData.dislikes.map((dislike) => (
                          <Badge key={dislike} variant="outline" className="text-xs">
                            🚫 {dislike}
                          </Badge>
                        )) : <span className="text-gray-500 text-sm">없음</span>}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* 관심사 */}
              <Card>
                <CardHeader>
                  <CardTitle>관심사</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {userData.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 최근 매칭 */}
              <Card>
                <CardHeader>
                  <CardTitle>최근 매칭 기록</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentMatches.map((match, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{match.name}</p>
                          <p className="text-sm text-gray-600">{match.restaurant}</p>
                          <p className="text-xs text-gray-500">{match.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm">{match.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 통계 */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>활동 통계</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <stat.icon className={`h-5 w-5 ${stat.color}`} />
                          <span className="text-sm">{stat.label}</span>
                        </div>
                        <span className="font-semibold">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>설정</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      알림 설정
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <User className="h-4 w-4 mr-2" />
                      개인정보 설정
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MapPin className="h-4 w-4 mr-2" />
                      위치 설정
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
