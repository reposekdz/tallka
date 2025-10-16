import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import RightSidebar from './components/RightSidebar';
import Feed from './components/Feed';
import ProfilePage from './components/ProfilePage';
import BookmarksPage from './components/BookmarksPage';
import CommunitiesPage from './components/CommunitiesPage';
import ExplorePage from './components/ExplorePage';
import ListsPage from './components/ListsPage';
import MessagesPage from './components/MessagesPage';
import MomentsPage from './components/MomentsPage';
import NotificationsPage from './components/NotificationsPage';
import PremiumPage from './components/PremiumPage';
import SettingsPage from './components/SettingsPage';
import SpacesPage from './components/SpacesPage';
import TallkDetailPage from './components/TallkDetailPage';
import AnalyticsPage from './components/AnalyticsPage';
import StoryViewer from './components/StoryViewer';
import Modal from './components/Modal';
import TallkComposer from './components/TallkComposer';
import EditProfileModal from './components/EditProfileModal';
import type { User, Tallk, Story, UserList } from './types';
import { mockUser, mockTallks, mockStories, mockLists } from './data/mockData';

type Page = 
  | 'home' | 'explore' | 'notifications' | 'messages' | 'profile' | 'bookmarks' 
  | 'communities' | 'spaces' | 'premium' | 'settings' | 'lists' | 'moments' 
  | 'tallkDetail' | 'analytics';

type ModalContent = 'compose' | 'reply' | 'quote' | 'editProfile' | null;

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>(mockUser);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [pageData, setPageData] = useState<any>(null);
  const [tallks, setTallks] = useState<Tallk[]>(mockTallks);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [isStoryViewerOpen, setStoryViewerOpen] = useState(false);
  const [storyData, setStoryData] = useState<{ stories: Story[], startIndex: number, users: User[] }>({ stories: [], startIndex: 0, users: [] });
  const [modalContent, setModalContent] = useState<ModalContent>(null);
  const [modalData, setModalData] = useState<any>(null);
  const [userLists, setUserLists] = useState<UserList[]>(mockLists);

  const handleNavigate = (page: Page, data?: any) => {
    setCurrentPage(page);
    setPageData(data);
    window.scrollTo(0, 0);
  };

  const handlePostTallk = (content: string, image?: string) => {
    const newTallk: Tallk = {
      id: `t${Date.now()}`,
      author: currentUser,
      content,
      image,
      timestamp: 'Just now',
      likes: 0,
      retallks: 0,
      replies: [],
    };
    setTallks([newTallk, ...tallks]);
    setModalContent(null);
  };
  
  const handlePostReply = (content: string, parentTallkId: string) => {
    const newReply: Tallk = {
      id: `t${Date.now()}`,
      author: currentUser,
      content,
      timestamp: 'Just now',
      likes: 0,
      retallks: 0,
      replies: [],
    };
    setTallks(prevTallks => prevTallks.map(tallk => 
        tallk.id === parentTallkId 
            ? { ...tallk, replies: [newReply, ...tallk.replies] } 
            : tallk
    ));
    setModalContent(null);
  };

  const handleToggleBookmark = (tallkId: string) => {
    setBookmarks(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(tallkId)) {
        newBookmarks.delete(tallkId);
      } else {
        newBookmarks.add(tallkId);
      }
      return newBookmarks;
    });
  };
  
  const handleLike = (tallkId: string) => {
      console.log(`Liked tallk ${tallkId}`);
  };

  const handleToggleFollow = (userIdToToggle: string) => {
    setCurrentUser(prevUser => {
        const newFollowingIds = new Set(prevUser.followingIds);
        if (newFollowingIds.has(userIdToToggle)) {
            newFollowingIds.delete(userIdToToggle);
        } else {
            newFollowingIds.add(userIdToToggle);
        }
        return { ...prevUser, followingIds: newFollowingIds };
    });
  };

  const openStory = (stories: Story[], startIndex: number, users: User[]) => {
    setStoryData({ stories, startIndex, users });
    setStoryViewerOpen(true);
  };

  const openModal = (type: ModalContent, data?: any) => {
      setModalData(data);
      setModalContent(type);
  };

  const closeModal = () => {
      setModalContent(null);
      setModalData(null);
  };

  const handleSaveProfile = (updatedUser: Partial<User>) => {
      setCurrentUser(prev => ({...prev, ...updatedUser}));
      closeModal();
  };
  
  const bookmarkedTallks = tallks.filter(tallk => bookmarks.has(tallk.id));

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Feed tallks={tallks} currentUser={currentUser} onPostTallk={handlePostTallk} onNavigate={handleNavigate} bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} onReply={(t) => openModal('reply', t)} onQuote={(t) => openModal('quote', t)} onLike={handleLike} onOpenStory={openStory}/>;
      case 'profile':
        return <ProfilePage user={pageData || currentUser} tallks={tallks} currentUser={currentUser} onNavigate={handleNavigate} bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} onReply={(t) => openModal('reply', t)} onQuote={(t) => openModal('quote', t)} onLike={handleLike} onEditProfile={() => openModal('editProfile')} onToggleFollow={handleToggleFollow} />;
      case 'tallkDetail':
        return <TallkDetailPage tallk={pageData} currentUser={currentUser} onNavigate={handleNavigate} bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} onReply={(t) => openModal('reply', t)} onQuote={(t) => openModal('quote', t)} onLike={handleLike} onPostReply={handlePostReply}/>;
       case 'analytics':
        return <AnalyticsPage tallk={pageData} onNavigate={handleNavigate} />;
      case 'bookmarks':
        return <BookmarksPage currentUser={currentUser} bookmarkedTallks={bookmarkedTallks} onNavigate={handleNavigate} bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} onReply={(t) => openModal('reply', t)} onQuote={(t) => openModal('quote', t)} onLike={handleLike}/>;
      case 'explore': return <ExplorePage />;
      case 'notifications': return <NotificationsPage />;
      case 'messages': return <MessagesPage />;
      case 'communities': return <CommunitiesPage />;
      case 'spaces': return <SpacesPage />;
      case 'premium': return <PremiumPage />;
      case 'settings': return <SettingsPage />;
      case 'lists': return <ListsPage onNavigate={handleNavigate} userLists={userLists} tallks={tallks} currentUser={currentUser} bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} onReply={(t) => openModal('reply',t)} onQuote={(t) => openModal('quote',t)} onLike={handleLike} />;
      case 'moments': return <MomentsPage onNavigate={handleNavigate}/>;
      default:
        return <Feed tallks={tallks} currentUser={currentUser} onPostTallk={handlePostTallk} onNavigate={handleNavigate} bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} onReply={(t) => openModal('reply', t)} onQuote={(t) => openModal('quote', t)} onLike={handleLike} onOpenStory={openStory} />;
    }
  };

  const renderModalContent = () => {
    switch (modalContent) {
        case 'compose':
            return <TallkComposer currentUser={currentUser} onPostTallk={handlePostTallk} />;
        case 'reply':
            return <TallkComposer currentUser={currentUser} onPostTallk={(content) => handlePostReply(content, modalData.id)} replyingTo={modalData} />;
        case 'quote':
            return <div><TallkComposer currentUser={currentUser} onPostTallk={handlePostTallk} /><div className="p-4 m-4 border rounded-xl">{modalData.content}</div></div>;
        case 'editProfile':
            return <EditProfileModal user={currentUser} onSave={handleSaveProfile} onClose={closeModal} />;
        default:
            return null;
    }
  };

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
       <style>{`
        .fb-bg-blue { background-color: #1877F2; }
        .fb-text-blue { color: #1877F2; }
        .fb-border-blue { border-color: #1877F2; }
        .fb-hover-bg-blue:hover { background-color: #166FE5; }
       `}</style>
      <div className="container mx-auto flex justify-center">
        <Sidebar 
          currentUser={currentUser} 
          onNavigate={handleNavigate} 
          onCompose={() => openModal('compose')}
          onSwitchAccount={setCurrentUser}
          onLogout={() => alert('Logged out!')}
        />
        <main className="w-full max-w-[600px] border-x border-[var(--border-color)] min-w-0">
          {renderPage()}
        </main>
        <RightSidebar onNavigate={handleNavigate}/>
      </div>
      <StoryViewer isOpen={isStoryViewerOpen} onClose={() => setStoryViewerOpen(false)} storyData={storyData} />
      <Modal isOpen={!!modalContent} onClose={closeModal}>
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default App;