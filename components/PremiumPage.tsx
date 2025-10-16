import React from 'react';
import { PremiumIcon } from './IconComponents';

const PremiumPage: React.FC = () => {

  const Feature: React.FC<{ title: string, description: string }> = ({ title, description }) => (
    <li className="flex items-start space-x-3">
        <svg className="w-6 h-6 text-sky-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        <div>
            <h3 className="font-bold">{title}</h3>
            <p className="text-slate-400">{description}</p>
        </div>
    </li>
  );

  return (
    <div>
      <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur-md z-10 p-4 border-b border-slate-800">
        <h1 className="text-xl font-bold">Premium</h1>
      </div>
      <div className="p-8 flex flex-col items-center text-center">
        <div className="p-4 bg-sky-500/20 rounded-full mb-4">
          <PremiumIcon className="w-12 h-12 text-sky-400"/>
        </div>
        <h2 className="text-3xl font-extrabold">Unlock Premium Features</h2>
        <p className="text-slate-400 mt-2 max-w-md">Subscribe to get access to exclusive features and help support Tallka.</p>
        
        <div className="text-left w-full max-w-md my-8">
            <ul className="space-y-4">
                <Feature title="Edit Tallk" description="Correct typos or add context to your tallks within a 30-minute window."/>
                <Feature title="Longer Tallks" description="Write up to 4,000 characters and express yourself without limits."/>
                <Feature title="Undo Tallk" description="A short window to recall a Tallk before anyone sees it."/>
                <Feature title="Verified Badge" description="Get the blue checkmark to let people know you're authentic."/>
                <Feature title="See Fewer Ads" description="Enjoy a cleaner timeline with 50% fewer ads."/>
            </ul>
        </div>

        <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-full text-lg">
          Subscribe - $8/month
        </button>
      </div>
    </div>
  );
};

export default PremiumPage;
