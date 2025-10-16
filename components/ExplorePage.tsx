import React from 'react';
import { mockTrends, mockTallks } from '../data/mockData';
import { MoreIcon, SettingsIcon } from './IconComponents';

const ExplorePage: React.FC = () => {
    const tallkWithImage = mockTallks.find(t => t.image);
  return (
    <div>
       <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur-md z-10 flex items-center p-2 border-b border-slate-800">
         <input
          type="text"
          placeholder="Search Tallka"
          className="w-full bg-slate-800 text-white rounded-full px-4 py-2 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button className="p-2 ml-2 hover:bg-slate-800 rounded-full"><SettingsIcon className="w-6 h-6"/></button>
      </div>

      <div>
        {tallkWithImage && (
             <div className="h-64 bg-slate-700 relative" style={{ backgroundImage: `url(${tallkWithImage.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent p-4 flex flex-col justify-end">
                    <p className="text-sm text-slate-300">Trending · Tallk</p>
                    <h3 className="font-bold text-xl">{tallkWithImage.author.name}</h3>
                    <p className="text-sm">{tallkWithImage.content.substring(0, 50)}...</p>
                </div>
            </div>
        )}
      </div>

       <div className="bg-slate-900">
          <h2 className="text-xl font-bold p-4">Trends for you</h2>
          {mockTrends.map((trend, index) => (
            <div key={index} className="p-4 hover:bg-slate-800/50 transition-colors duration-200 cursor-pointer">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-slate-500">Trending</p>
                  <p className="font-bold">{trend.name}</p>
                  <p className="text-sm text-slate-500">{trend.tallks}</p>
                </div>
                <MoreIcon className="w-5 h-5 text-slate-500" />
              </div>
            </div>
          ))}
           <div className="p-4 text-sky-500 hover:bg-slate-800/50 cursor-pointer">Show more</div>
        </div>
    </div>
  );
};

export default ExplorePage;
