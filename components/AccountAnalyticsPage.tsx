import React from 'react';

const StatCard: React.FC<{ label: string; value: string; change?: string; changeType?: 'increase' | 'decrease' }> = ({ label, value, change, changeType }) => (
    <div className="bg-slate-900 p-4 rounded-lg">
        <p className="text-sm text-slate-400">{label}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        {change && (
            <p className={`text-sm mt-1 ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                {change} vs. previous period
            </p>
        )}
    </div>
);

const AccountAnalyticsPage: React.FC = () => {
  return (
    <div>
      <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur-md z-10 p-4 border-b border-slate-800">
        <h1 className="text-xl font-bold">Account Analytics</h1>
        <p className="text-sm text-slate-500">Last 28 days</p>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Your Tallks summary</h2>
        <div className="grid grid-cols-2 gap-4">
            <StatCard label="Impressions" value="1.2M" change="+15.2%" changeType="increase" />
            <StatCard label="Profile Visits" value="25.4K" change="-2.1%" changeType="decrease" />
            <StatCard label="Mentions" value="876" change="+5.8%" changeType="increase" />
            <StatCard label="Followers" value="2,500" change="+128" changeType="increase" />
        </div>
      </div>
       <div className="p-4 border-t border-slate-800">
        <h2 className="text-lg font-bold mb-4">Top Tallks</h2>
        <p className="text-slate-500">Your top tallks this period will be shown here.</p>
       </div>
    </div>
  );
};

export default AccountAnalyticsPage;
