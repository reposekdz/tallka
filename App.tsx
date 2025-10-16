import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import RightSidebar from './components/RightSidebar';
import Feed from './components/Feed';
import ExplorePage from './components/ExplorePage';
import NotificationsPage from './components/NotificationsPage';
import ProfilePage from './components/ProfilePage';
import MessagesPage from './components/MessagesPage';
import CommunitiesPage from './components/CommunitiesPage';
import SpacesPage from './components/SpacesPage';
import BookmarksPage from './components/BookmarksPage';
import PremiumPage from './components/PremiumPage';
import SettingsPage from './components/SettingsPage';
import ListsPage from './components/ListsPage';
import MomentsPage from './components/MomentsPage';
import AnalyticsPage from './components/AnalyticsPage';
import TallkDetailPage from './components/TallkDetailPage';
import Modal from './components/Modal';
import TallkComposer from './components/TallkComposer';
import { mockUser, mockTallks } from './data/mockData';
import type { User, Tallk, Moment } from './types';

type Page = 'home' | 'explore' | 'notifications' | 'messages' | 'profile' | 'bookmarks' | 'communities' | 'spaces' | 'premium' | 'settings' | 'lists' | 'moments' | 'analytics' | 'tallkDetail';
type Theme = 'dim' | 'lights-out';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [tallks, setTallks] = useState<Tallk[]>(mockTallks);
  const [viewedProfile, setViewedProfile] = useState<User>(mockUser);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [viewedTallk, setViewedTallk] = useState<Tallk | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Tallk | null>(null);
  const [theme, setTheme] = useState<Theme>('dim');

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  const handleNavigate = useCallback((page: Page, data?: User | Tallk | Moment) => {
    setCurrentPage(page);
    if (page === 'profile' && data && 'username' in data) {
      setViewedProfile(data as User);
    }
    if ((page === 'analytics' || page === 'tallkDetail') && data && 'content' in data) {
      setViewedTallk(data as Tallk);
    }
    window.scrollTo(0, 0);
  }, []);

  const handlePostTallk = useCallback((content: string, image?: string) => {
    const newTallk: Tallk = {
      id: `t${Date.now()}`,
      author: mockUser,
      content,
      image,
      createdAt: new Date().toISOString(),
      likes: 0,
      retallks: 0,
      replies: [],
    };
    setTallks(prevTallks => [newTallk, ...prevTallks]);
    setIsModalOpen(false);
  }, []);
  
  const handleReply = useCallback((content: string, parentTallkId: string) => {
      const newReply: Tallk = {
        id: `t${Date.now()}`,
        author: mockUser,
        content,
        createdAt: new Date().toISOString(),
        likes: 0,
        retallks: 0,
        replies: [],
      };
      setTallks(prevTallks => prevTallks.map(t => 
        t.id === parentTallkId ? {...t, replies: [newReply, ...t.replies]} : t
      ));
      if (viewedTallk && viewedTallk.id === parentTallkId) {
        setViewedTallk(prev => prev ? {...prev, replies: [newReply, ...prev.replies]} : null);
      }
      setIsModalOpen(false);
      setReplyingTo(null);
  }, [viewedTallk]);


  const handleToggleBookmark = useCallback((tallkId: string) => {
    setBookmarks(prevBookmarks => {
      const newBookmarks = new Set(prevBookmarks);
      if (newBookmarks.has(tallkId)) {
        newBookmarks.delete(tallkId);
      } else {
        newBookmarks.add(tallkId);
      }
      return newBookmarks;
    });
  }, []);
  
  const openReplyModal = useCallback((tallk: Tallk) => {
    setReplyingTo(tallk);
    setIsModalOpen(true);
  }, []);
  
  const openComposerModal = useCallback(() => {
    setReplyingTo(null);
    setIsModalOpen(true);
  }, []);

  const bookmarkedTallks = tallks.filter(t => bookmarks.has(t.id));

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Feed tallks={tallks} onPostTallk={handlePostTallk} onNavigate={handleNavigate} bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} onReply={openReplyModal} />;
      case 'explore':
        return <ExplorePage onNavigate={handleNavigate}/>;
      case 'notifications':
        return <NotificationsPage onNavigate={handleNavigate} />;
      case 'messages':
        return <MessagesPage onNavigate={handleNavigate} />;
      case 'bookmarks':
        return <BookmarksPage bookmarkedTallks={bookmarkedTallks} onNavigate={handleNavigate} bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} onReply={openReplyModal} />;
      case 'communities':
        return <CommunitiesPage />;
      case 'spaces':
        return <SpacesPage onNavigate={handleNavigate} />;
      case 'premium':
        return <PremiumPage />;
      case 'settings':
        return <SettingsPage currentTheme={theme} onThemeChange={setTheme} />;
      case 'lists':
        return <ListsPage onNavigate={handleNavigate}/>;
      case 'moments':
        return <MomentsPage onNavigate={handleNavigate}/>;
      case 'analytics':
        return viewedTallk ? <AnalyticsPage tallk={viewedTallk} onNavigate={handleNavigate} /> : <Feed tallks={tallks} onPostTallk={handlePostTallk} onNavigate={handleNavigate} bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} onReply={openReplyModal}/>;
      case 'tallkDetail':
        return viewedTallk ? <TallkDetailPage tallk={viewedTallk} onNavigate={handleNavigate} bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} onReply={openReplyModal} onPostReply={handleReply} /> : <Feed tallks={tallks} onPostTallk={handlePostTallk} onNavigate={handleNavigate} bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} onReply={openReplyModal}/>;
      case 'profile':
        return <ProfilePage user={viewedProfile} userTallks={tallks.filter(t => t.author.username === viewedProfile.username)} onNavigate={handleNavigate} bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} onReply={openReplyModal}/>;
      default:
        return <Feed tallks={tallks} onPostTallk={handlePostTallk} onNavigate={handleNavigate} bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} onReply={openReplyModal}/>;
    }
  };

  return (
    <div className="container mx-auto flex min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Sidebar onNavigate={handleNavigate} currentUser={mockUser} onCompose={openComposerModal}/>
      <main className="w-full max-w-[600px] border-x border-[var(--border-color)] min-h-screen">
        {renderContent()}
      </main>
      <RightSidebar onNavigate={handleNavigate}/>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TallkComposer 
          onPostTallk={replyingTo ? (content) => handleReply(content, replyingTo.id) : handlePostTallk}
          replyingTo={replyingTo}
        />
      </Modal>
    </div>
  );
};

export default App;