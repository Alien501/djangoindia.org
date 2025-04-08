'use client';

import React, { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage, Button, Dialog, DialogContent, DialogTrigger } from '@/components';
import { RiPencilLine } from 'react-icons/ri';
import UploadUserAvatar from './UploadUserAvatar';

export const UserAvatar = ({ avatarUrl }: { avatarUrl?: string | null }) => {
  const defaultAvatarUrl = 'https://github.com/shadcn.png';
  const [isUploadAvatarModalActive, setIsUploadAvatarModalActive] = useState(false);

  return (
    <div className='absolute left-[10%] top-3/4 md:left-[10%] md:top-2/3 w-max h-max group'>
      <Avatar className='
          w-36 h-36
          sm:w-40 sm:h-40 
          md:w-48 md:h-48 
          border-4 border-[#F2ECE4]
          transition-all duration-300'>
        <AvatarImage src={avatarUrl || defaultAvatarUrl} />
        <AvatarFallback>
          <img src={defaultAvatarUrl} alt="Default Avatar" className="w-full h-full object-cover" />
        </AvatarFallback>
      </Avatar>
      <Dialog>
        <DialogTrigger>
          <span className='absolute z-10 right-4 top-4 opacity-0 transition-all duration-300 group-hover:opacity-100'>
            <Button className='rounded-full w-8 h-8 p-0'>
              <RiPencilLine />
            </Button>
          </span>
        </DialogTrigger>
        <DialogContent>
          <UploadUserAvatar />
        </DialogContent>
      </Dialog>
    </div>
  );
};
