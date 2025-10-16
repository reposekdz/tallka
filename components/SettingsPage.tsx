import React, { useState, useEffect } from 'react';
import { FontSizeIcon } from './IconComponents';

type Theme = 'dim' | 'lights-out';

interface SettingsPageProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ currentTheme, onThemeChange }) => {
  const [fontSize, setFontSize] = useState(15);
  const [isAutoplay, setAutoplay] = useState(true);
  
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  const SettingItem: React.FC<{title: string, description: string, children?: React.ReactNode}> = ({title, description, children}) => (
    <div className="p-4 border-b border-[var(--border-color)] hover:bg-[var(--bg-secondary)]/50 cursor-pointer">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold">{title}</h3>
            <p className="text-sm text-[var(--text-secondary)]">{description}</p>
          </div>
          {children && <div className="ml-4">{children}</div>}
        </div>
    </div>
  );
  
  const ThemeOption: React.FC<{label: string, value: Theme}> = ({ label, value }) => (
     <label className="flex items-center space-x-2">
        <input 
            type="radio" 
            name="theme" 
            value={value} 
            checked={currentTheme === value} 
            onChange={() => onThemeChange(value)}
            className="form-radio h-4 w-4 text-sky-600 bg-gray-700 border-gray-600"
        />
        <span>{label}</span>
     </label>
  );
  
  const Toggle: React.FC<{checked: boolean, onChange: (checked: boolean) => void}> = ({ checked, onChange }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
    </label>
  );

  return (
    <div>
      <div className="sticky top-0 bg-[var(--bg-primary)] bg-opacity-80 backdrop-blur-md z-10 p-4 border-b border-[var(--border-color)]">
        <h1 className="text-xl font-bold">Settings</h1>
      </div>
      <div>
        <SettingItem 
            title="Your account"
            description="See information about your account or learn about deactivation options."
        />
         <SettingItem 
            title="Download an archive of your data"
            description="Get a zip file with your account information, Tallks, and media."
        />
        <SettingItem 
            title="Security and account access"
            description="Manage your account’s security and keep track of your account’s usage."
        />
         <SettingItem 
            title="Two-factor authentication"
            description="Help protect your account from unauthorized access."
        >
          <Toggle checked={false} onChange={() => {}} />
        </SettingItem>
        <SettingItem 
            title="Premium"
            description="Manage your Premium subscription and see available features."
        />
        <SettingItem 
            title="Monetization"
            description="Manage how you can make money on Tallka, including Tips and Subscriptions."
        />
         <SettingItem 
            title="Privacy and safety"
            description="Manage what information you see and share on Tallka."
        />
        <SettingItem 
            title="Restricted mode"
            description="This helps hide potentially sensitive content."
        >
            <Toggle checked={false} onChange={() => {}} />
        </SettingItem>
         <SettingItem 
            title="Notifications"
            description="Select the kinds of notifications you get about your activities, interests, and recommendations."
        />
         <SettingItem 
            title="Accessibility, display, and languages"
            description="Manage how Tallka content is displayed to you."
        />
         <div className="p-4 border-b border-[var(--border-color)]">
            <h3 className="font-bold">Display</h3>
            <p className="text-sm text-[var(--text-secondary)]">Customize your view. These settings affect all accounts on this browser.</p>
            <div className="mt-4 p-4 bg-[var(--bg-secondary)] rounded-lg">
                <div className="flex items-center justify-between">
                    <FontSizeIcon className="text-[var(--text-secondary)]" />
                    <input 
                        type="range" 
                        min="12" 
                        max="18" 
                        step="1"
                        value={fontSize}
                        onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                        className="w-full mx-4 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <FontSizeIcon className="w-8 h-8 text-[var(--text-secondary)]" />
                </div>
                <div className="flex justify-between items-center mt-6">
                    <div>
                        <h4 className="font-bold">Background</h4>
                    </div>
                    <div className="flex justify-around bg-[var(--bg-primary)] p-1 rounded-lg w-1/2">
                        <ThemeOption label="Dim" value="dim" />
                        <ThemeOption label="Lights Out" value="lights-out" />
                    </div>
                </div>
                 <div className="flex justify-between items-center mt-6">
                    <div>
                        <h4 className="font-bold">Media Autoplay</h4>
                        <p className="text-sm text-[var(--text-secondary)]">Play videos automatically in your feed.</p>
                    </div>
                     <Toggle checked={isAutoplay} onChange={setAutoplay} />
                </div>
            </div>
         </div>
        <SettingItem 
            title="Developer & API Access"
            description="Manage your API keys and developer settings."
        />
         <SettingItem 
            title="Additional resources"
            description="Check out other places for information and get help using Tallka."
        />
      </div>
    </div>
  );
};

export default SettingsPage;
