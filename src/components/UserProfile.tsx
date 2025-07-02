import { useState, createContext, useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  Calendar
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
    location: '강남구 역삼동'
  });

  const [editData, setEditData] = useState(userData);

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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">마이페이지</h2>
            {onClose && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onClose}
              >
                나가기
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 프로필 정보 */}
            <div className="lg:col-span-2 space-y-6">
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
