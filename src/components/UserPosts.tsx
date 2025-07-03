import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Users, Clock, MapPin, MessageCircle, X, Send, UserCheck } from 'lucide-react';

interface Post {
  id: string;
  author: string;
  authorAvatar: string;
  title: string;
  time: string;
  location: string;
  menu: string;
  maxPeople: number;
  currentPeople: number;
  description: string;
  tags: string[];
  createdAt: string;
  participants: string[];
  comments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

const UserPosts = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: '오일남',
      authorAvatar: '👨‍💻',
      title: '강남역 근처 파스타 같이 드실 분!',
      time: '12:30-13:30',
      location: '강남역 2번 출구',
      menu: '이탈리안 파스타',
      maxPeople: 3,
      currentPeople: 2,
      description: '새로 생긴 파스타집 가보고 싶어요. 편하게 오세요!',
      tags: ['#이탈리안', '#신규매장'],
      createdAt: '10분 전',
      participants: ['오일남', '오이녀'],
      comments: [
        { id: '1', author: '오삼남', content: '참여하고 싶습니다!', timestamp: '5분 전' }
      ]
    },
    {
      id: '2',
      author: '오이녀',
      authorAvatar: '👩‍💼',
      title: '건강한 샐러드 함께 먹어요',
      time: '12:00-13:00',
      location: '회사 근처 샐러드집',
      menu: '샐러드, 건강식',
      maxPeople: 2,
      currentPeople: 1,
      description: '다이어트 중이라 같이 건강식 드실 분 구해요~',
      tags: ['#다이어트', '#건강식', '#샐러드'],
      createdAt: '30분 전',
      participants: ['오이녀'],
      comments: []
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState('');
  const [showFriendsOnly, setShowFriendsOnly] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    time: '',
    location: '',
    menu: '',
    maxPeople: 2,
    description: '',
    tags: ''
  });

  // 친구 목록 (실제로는 FriendsList에서 가져와야 함)
  const friendNames = ['오일남', '오이녀', '오삼남'];

  // 친구 글만 필터링
  const filteredPosts = showFriendsOnly 
    ? posts.filter(post => friendNames.includes(post.author))
    : posts;

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.time || !newPost.location || !newPost.menu) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }

    const post: Post = {
      id: Date.now().toString(),
      author: '최승연',
      authorAvatar: '👨‍💻',
      title: newPost.title,
      time: newPost.time,
      location: newPost.location,
      menu: newPost.menu,
      maxPeople: newPost.maxPeople,
      currentPeople: 1,
      description: newPost.description,
      tags: newPost.tags ? newPost.tags.split(',').map(tag => tag.trim().startsWith('#') ? tag.trim() : `#${tag.trim()}`) : [],
      createdAt: '방금 전',
      participants: ['최승연'],
      comments: []
    };

    setPosts([post, ...posts]);
    setNewPost({
      title: '',
      time: '',
      location: '',
      menu: '',
      maxPeople: 2,
      description: '',
      tags: ''
    });
    setShowCreateForm(false);
  };

  const handleJoinPost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId && post.currentPeople < post.maxPeople) {
        return {
          ...post,
          currentPeople: post.currentPeople + 1,
          participants: [...post.participants, '최승연']
        };
      }
      return post;
    }));
  };

  const handleAddComment = (postId: string) => {
    if (!newComment.trim()) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, {
            id: Date.now().toString(),
            author: '최승연',
            content: newComment,
            timestamp: '방금 전'
          }]
        };
      }
      return post;
    }));
    setNewComment('');
  };

  if (selectedPost) {
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              {selectedPost.title}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setSelectedPost(null)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 게시글 상세 정보 */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Avatar>
                <AvatarFallback>{selectedPost.authorAvatar}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{selectedPost.author}</h3>
                <p className="text-sm text-gray-600">{selectedPost.createdAt}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{selectedPost.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{selectedPost.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{selectedPost.currentPeople}/{selectedPost.maxPeople}명</span>
              </div>
            </div>
            <p className="mt-3 text-sm">{selectedPost.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedPost.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
              ))}
            </div>
          </div>

          {/* 참여자 목록 */}
          <div>
            <h4 className="font-medium mb-2">참여자 ({selectedPost.participants.length}명)</h4>
            <div className="flex flex-wrap gap-2">
              {selectedPost.participants.map((participant, index) => (
                <Badge key={index} variant="secondary">{participant}</Badge>
              ))}
            </div>
          </div>

          {/* 댓글 */}
          <div>
            <h4 className="font-medium mb-3">댓글 ({selectedPost.comments.length})</h4>
            <div className="space-y-3">
              {selectedPost.comments.map((comment) => (
                <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-sm">{comment.author}</span>
                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              ))}
            </div>
            
            {/* 댓글 작성 */}
            <div className="flex gap-2 mt-3">
              <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력하세요..."
                className="flex-1"
              />
              <Button 
                size="sm" 
                onClick={() => handleAddComment(selectedPost.id)}
                disabled={!newComment.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 참여 버튼 */}
          {selectedPost.currentPeople < selectedPost.maxPeople && 
           !selectedPost.participants.includes('최승연') && (
            <Button 
              onClick={() => handleJoinPost(selectedPost.id)}
              className="w-full"
            >
              참여하기
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  if (showCreateForm) {
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              새 모집글 작성
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setShowCreateForm(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">제목 *</Label>
            <Input
              id="title"
              value={newPost.title}
              onChange={(e) => setNewPost({...newPost, title: e.target.value})}
              placeholder="함께 식사할 사람을 모집하는 제목을 입력하세요"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="time">시간 *</Label>
              <Input
                id="time"
                value={newPost.time}
                onChange={(e) => setNewPost({...newPost, time: e.target.value})}
                placeholder="12:00-13:00"
              />
            </div>
            <div>
              <Label htmlFor="maxPeople">모집 인원</Label>
              <Select value={newPost.maxPeople.toString()} onValueChange={(value) => setNewPost({...newPost, maxPeople: parseInt(value)})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2명</SelectItem>
                  <SelectItem value="3">3명</SelectItem>
                  <SelectItem value="4">4명</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="location">장소 *</Label>
            <Input
              id="location"
              value={newPost.location}
              onChange={(e) => setNewPost({...newPost, location: e.target.value})}
              placeholder="만날 장소를 입력하세요"
            />
          </div>

          <div>
            <Label htmlFor="menu">메뉴/카테고리 *</Label>
            <Input
              id="menu"
              value={newPost.menu}
              onChange={(e) => setNewPost({...newPost, menu: e.target.value})}
              placeholder="한식, 중식, 파스타, 샐러드 등"
            />
          </div>

          <div>
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              value={newPost.description}
              onChange={(e) => setNewPost({...newPost, description: e.target.value})}
              placeholder="추가 설명이나 요청사항을 입력하세요"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="tags">태그</Label>
            <Input
              id="tags"
              value={newPost.tags}
              onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
              placeholder="태그를 쉼표로 구분해서 입력 (예: 이탈리안, 신규매장)"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleCreatePost} className="flex-1">
              모집글 등록
            </Button>
            <Button variant="outline" onClick={() => setShowCreateForm(false)}>
              취소
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              점심 메이트 모집
            </CardTitle>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              새 모집글
            </Button>
          </div>
          {/* 친구 글만 보기 필터 */}
          <div className="flex items-center space-x-2 pt-2">
            <Switch
              id="friends-only"
              checked={showFriendsOnly}
              onCheckedChange={setShowFriendsOnly}
            />
            <Label htmlFor="friends-only" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              친구 글만 보기
            </Label>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm">
            원하는 시간, 장소, 메뉴로 함께 식사할 사람을 모집해보세요!
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{post.authorAvatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{post.title}</h3>
                      {friendNames.includes(post.author) && (
                        <Badge variant="secondary" className="text-xs">친구</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{post.author} · {post.createdAt}</p>
                  </div>
                </div>
                <Badge 
                  variant={post.currentPeople >= post.maxPeople ? "secondary" : "default"}
                  className="text-xs"
                >
                  {post.currentPeople}/{post.maxPeople}명
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.time}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {post.location}
                </div>
              </div>

              <p className="text-sm mb-3">{post.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedPost(post)}
                  >
                    <MessageCircle className="h-3 w-3 mr-1" />
                    댓글 {post.comments.length}
                  </Button>
                  {post.currentPeople < post.maxPeople && !post.participants.includes('최승연') && (
                    <Button 
                      size="sm"
                      onClick={() => handleJoinPost(post.id)}
                    >
                      참여하기
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
