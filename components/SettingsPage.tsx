import React from 'react';

const SettingsPage: React.FC = () => {

    const SettingItem: React.FC<{title: string, description: string}> = ({title, description}) => (
        <div className="p-4 border-b border-slate-800 hover:bg-slate-900/50 cursor-pointer">
            <h3 className="font-bold">{title}</h3>
            <p className="text-slate-500 text-sm">{description}</p>
        </div>
    );
  return (
    <div>
      <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur-md z-10 p-4 border-b border-slate-800">
        <h1 className="text-xl font-bold">Settings</h1>
      </div>
      <div>
        <SettingItem title="Your account" description="See information about your account, download an archive of your data, or learn about your account deactivation options." />
        <SettingItem title="Security and account access" description="Manage your account’s security and keep track of your account’s usage including apps that you have connected to your account." />
        <SettingItem title="Privacy and safety" description="Manage what information you see and share on Tallka." />
        <SettingItem title="Notifications" description="Select the kinds of notifications you get about your activities, interests, and recommendations." />
        <SettingItem title="Accessibility, display, and languages" description="Manage how Tallka content is displayed to you." />
        <SettingItem title="Additional resources" description="Check out other places for help and information about Tallka." />
      </div>
    </div>
  );
};

export default SettingsPage;
