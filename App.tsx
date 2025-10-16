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
import StoryViewer from './components/StoryViewer';
import EditProfileModal from './components/EditProfileModal';
import TallkComposer from './components/TallkComposer';
import { mockUsers, mockTallks, mockStories } from './data/mockData';
import type { User, Tallk, Moment, Story } from './types';

type Page = 'home' | 'explore' | 'notifications' | 'messages' | 'profile' | 'bookmarks' | 'communities' | 'spaces' | 'premium' | 'settings' | 'lists' | 'moments' | 'analytics' | 'tallkDetail';
type Theme = 'dim' | 'lights-out';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]);
  const [allUsers, setAllUsers] = useState<User[]>(mockUsers);
  const [tallks, setTallks] = useState<Tallk[]>(mockTallks);
  const [viewedProfile, setViewedProfile] = useState<User>(currentUser);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [viewedTallk, setViewedTallk] = useState<Tallk | null>(null);
  
  const [isComposerModalOpen, setComposerModalOpen] = useState(false);
  const [isStoryModalOpen, setStoryModalOpen] = useState(false);
  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [viewedStories, setViewedStories] = useState<{stories: Story[], startIndex: number} | null>(null);
  
  const [replyingTo, setReplyingTo] = useState<Tallk | null>(null);
  const [quoting, setQuoting] = useState<Tallk | null>(null);
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
  
  const handlePost = useCallback((content: string, image?: string, quoteOf?: Tallk) => {
     const newTallk: Tallk = {
      id: `t${Date.now()}`,
      author: currentUser,
      content,
      image,
      quoteOf,
      createdAt: new Date().toISOString(),
      likes: 0,
      retallks: 0,
      replies: [],
    };
    setTallks(prevTallks => [newTallk, ...prevTallks]);
    setComposerModalOpen(false);
    setQuoting(null);
  }, [currentUser]);

  const handleReply = useCallback((content: string, parentTallkId: string) => {
      const newReply: Tallk = {
        id: `t${Date.now()}`,
        author: currentUser,
        content,
        createdAt: new Date().toISOString(),
        likes: 0,
        retallks: 0,
        replies: [],
      };
      const updateReplies = (tallkList: Tallk[]): Tallk[] => {
          return tallkList.map(t => {
              if (t.id === parentTallkId) {
                  return {...t, replies: [newReply, ...t.replies]};
              }
              if (t.replies.length > 0) {
                  return {...t, replies: updateReplies(t.replies)};
              }
              return t;
          });
      };
      setTallks(prevTallks => updateReplies(prevTallks));
      
      if (viewedTallk) {
          if(viewedTallk.id === parentTallkId) {
            setViewedTallk(prev => prev ? {...prev, replies: [newReply, ...prev.replies]} : null);
          } else {
             const updatedReplies = updateReplies(viewedTallk.replies);
             setViewedTallk(prev => prev ? {...prev, replies: updatedReplies} : null);
          }
      }

      setComposerModalOpen(false);
      setReplyingTo(null);
  }, [currentUser, viewedTallk]);

  const handleLike = useCallback((tallkId: string) => {
    setTallks(prev => prev.map(t => t.id === tallkId ? {...t, likes: (currentUser.likedTallkIds?.includes(tallkId) ? t.likes - 1 : t.likes + 1)} : t));
    setCurrentUser(prevUser => {
        const newLikedIds = new Set(prevUser.likedTallkIds || []);
        if(newLikedIds.has(tallkId)) {
            newLikedIds.delete(tallkId);
        } else {
            newLikedIds.add(tallkId);
        }
        return {...prevUser, likedTallkIds: Array.from(newLikedIds)};
    });
  }, [currentUser.likedTallkIds]);

  const handleToggleBookmark = useCallback((tallkId: string) => {
    setBookmarks(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(tallkId)) newBookmarks.delete(tallkId);
      else newBookmarks.add(tallkId);
      return newBookmarks;
    });
  }, []);
  
  const openReplyModal = useCallback((tallk: Tallk) => {
    setReplyingTo(tallk);
    setQuoting(null);
    setComposerModalOpen(true);
  }, []);
  
  const openQuoteModal = useCallback((tallk: Tallk) => {
    setQuoting(tallk);
    setReplyingTo(null);
    setComposerModalOpen(true);
  }, []);
  
  const openComposerModal = useCallback(() => {
    setReplyingTo(null);
    setQuoting(null);
    setComposerModalOpen(true);
  }, []);

  const handleOpenStory = useCallback((stories: Story[], startIndex: number) => {
    setViewedStories({ stories, startIndex });
    setStoryModalOpen(true);
  }, []);

  const handleSwitchAccount = (user: User) => {
    setCurrentUser(user);
    setViewedProfile(user);
    if(currentPage === 'profile') {
        handleNavigate('profile', user);
    }
  };
  
  const handleUpdateProfile = (updatedUser: Partial<User>) => {
    const updated = {...currentUser, ...updatedUser};
    setCurrentUser(updated);
    setAllUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
    setViewedProfile(updated);
    setEditProfileModalOpen(false);
  }

  const bookmarkedTallks = tallks.filter(t => bookmarks.has(t.id));

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Feed tallks={tallks} currentUser={currentUser} onPostTallk={handlePost} onNavigate={handleNavigate} bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} onReply={openReplyModal} onQuote={openQuoteModal} onLike={handleLike} onOpenStory={handleOpenStory}/>;
      case 'explore':
        return <ExplorePage onNavigate={handleNavigate}/>;
      case 'notifications':
        return <NotificationsPage onNavigate={handleNavigate} />;
      case 'messages':
        return <MessagesPage onNavigate={handleNavigate} />;
      case 'bookmarks':
        return <BookmarksPage currentUser={currentUser} bookmarkedTallks={bookmarkedTallks} onNavigate={handleNavigate} bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} onReply={openReplyModal} onQuote={openQuoteModal} onLike={handleLike} />;
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
        return viewedTallk ? <AnalyticsPage tallk={viewedTallk} onNavigate={handleNavigate} /> : <span>Tallk not found</span>;
      case 'tallkDetail':
        return viewedTallk ? <TallkDetailPage tallk={viewedTallk} currentUser={currentUser} onNavigate={handleNavigate} bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} onReply={openReplyModal} onQuote={openQuoteModal} onLike={handleLike} onPostReply={handleReply} /> : <span>Tallk not found</span>;
      case 'profile':
        return <ProfilePage user={viewedProfile} currentUser={currentUser} allTallks={tallks} onNavigate={handleNavigate} bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} onReply={openReplyModal} onQuote={openQuoteModal} onLike={handleLike} onEditProfile={() => setEditProfileModalOpen(true)} />;
      default:
        return <Feed tallks={tallks} currentUser={currentUser} onPostTallk={handlePost} onNavigate={handleNavigate} bookmarks={bookmarks} onToggleBookmark={handleToggleBookmark} onReply={openReplyModal} onQuote={openQuoteModal} onLike={handleLike} onOpenStory={handleOpenStory}/>;
    }
  };

  return (
    <div className="container mx-auto flex min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Sidebar onNavigate={handleNavigate} currentUser={currentUser} onCompose={openComposerModal} onSwitchAccount={handleSwitchAccount} onLogout={() => alert('Logging out!')}/>
      <main className="w-full max-w-[600px] border-x border-[var(--border-color)] min-h-screen">
        {renderContent()}
      </main>
      <RightSidebar onNavigate={handleNavigate}/>
      <Modal isOpen={isComposerModalOpen} onClose={() => setComposerModalOpen(false)}>
        <TallkComposer 
          onPostTallk={replyingTo ? (content) => handleReply(content, replyingTo.id) : (content, img, poll, quote) => handlePost(content, img, quote)}
          replyingTo={replyingTo}
          quoting={quoting}
          currentUser={currentUser}
        />
      </Modal>
      {viewedStories && <StoryViewer isOpen={isStoryModalOpen} onClose={() => setStoryModalOpen(false)} storyData={viewedStories} />}
       <Modal isOpen={isEditProfileModalOpen} onClose={() => setEditProfileModalOpen(false)}>
         <EditProfileModal user={currentUser} onSave={handleUpdateProfile} onClose={() => setEditProfileModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default App;
