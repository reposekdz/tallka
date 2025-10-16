import React, { useState } from 'react';
import type { User } from '../types';

interface EditProfileModalProps {
  user: User;
  onSave: (updatedUser: Partial<User>) => void;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, onSave, onClose }) => {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || '');
  const [location, setLocation] = useState(user.location || '');
  const [website, setWebsite] = useState(user.website || '');

  const handleSave = () => {
    onSave({ name, bio, location, website });
  };
  
  const InputField: React.FC<{label: string, value: string, onChange: (val: string) => void, maxLength?: number}> = ({label, value, onChange, maxLength}) => (
    <div className="relative border border-[var(--border-color)] rounded-md px-3 py-2 focus-within:border-sky-500">
        <label className="absolute -top-2.5 left-2 bg-[var(--bg-primary)] px-1 text-xs text-[var(--text-secondary)]">{label}</label>
        <input 
            type="text" 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            maxLength={maxLength}
            className="w-full bg-transparent focus:outline-none"
        />
    </div>
  );

  return (
    <div>
        <div className="flex justify-between items-center p-4 border-b border-[var(--border-color)]">
            <div className="flex items-center space-x-4">
                <button onClick={onClose} className="text-2xl">&times;</button>
                <h2 className="text-xl font-bold">Edit profile</h2>
            </div>
            <button onClick={handleSave} className="bg-white text-black font-bold px-4 py-1.5 rounded-full">Save</button>
        </div>

        <div className="h-36 bg-slate-700 relative">
          {user.banner && <img src={user.banner} alt="User banner" className="w-full h-full object-cover" />}
        </div>
        <div className="p-4">
            <div className="-mt-16">
                 <img src={user.avatar} alt="User avatar" className="w-24 h-24 rounded-full border-4 border-[var(--bg-primary)]" />
            </div>

            <div className="mt-4 space-y-6">
                <InputField label="Name" value={name} onChange={setName} maxLength={50} />
                <InputField label="Bio" value={bio} onChange={setBio} maxLength={160} />
                <InputField label="Location" value={location} onChange={setLocation} maxLength={30} />
                <InputField label="Website" value={website} onChange={setWebsite} maxLength={100} />
            </div>
        </div>
    </div>
  );
};

export default EditProfileModal;
