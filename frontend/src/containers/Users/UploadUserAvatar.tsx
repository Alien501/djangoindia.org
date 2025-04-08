'use client';

import React, { useEffect, useState } from 'react';

import { enqueueSnackbar } from 'notistack';

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '@/components';
import { fetchData } from '@/utils';
import { getAccessToken } from '@/utils/getAccesstoken';

const UploadUserAvatar = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await getAccessToken();
      setAccessToken(token ?? null);
    };
    fetchAccessToken();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setAvatar(base64String);
        setPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleUpload = async () => {
    if (!avatar) {
      enqueueSnackbar('Please select an image first', { variant: 'error' });
      return;
    }
  
    try {
      const base64Response = await fetch(avatar);
      const blob = await base64Response.blob();
      const file = new File([blob], 'avatar.jpg', { type: blob.type });
  
      const formData = new FormData();
      formData.append('avatar', file);
  
      const response = await fetchData(
        '/users/me',
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        },
        true,
        'multipart/form-data; boundary=------WebKitFormBoundaryvBEJNepCm37foMn6'
      );
  
      if (response.error) {
        throw new Error(response.error.message || 'Upload failed');
      }
  
      enqueueSnackbar('Avatar updated successfully', { variant: 'success' });
      setAvatar(null);
      setPreview(null);
    } catch (err: any) {
      console.error('Avatar upload error:', err);
      enqueueSnackbar(err.message || 'Upload failed', { variant: 'error' });
    }
  };

  return (
    <Card className='mx-auto w-full space-y-6 border-none bg-transparent shadow-none'>
      <CardHeader className='px-0'>
        <CardTitle>Update Avatar</CardTitle>
      </CardHeader>
      <CardContent className='px-0'>
        <div className='flex flex-col items-center justify-center'>
          {preview && <div className='mb-6 mt-2'>
            <img
              src={preview || '/default-avatar.png'}
              alt='Avatar preview'
              className='size-32 rounded-full border-2 border-gray-300 object-cover'
            />
          </div>}

          <div className='grid w-full items-center gap-4'>
            <div className='flex items-center justify-center'>
              <Label
                htmlFor='avatar'
                className='rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:cursor-pointer hover:bg-gray-300'
              >
                Choose an Image
              </Label>
              <Input
                type='file'
                accept='image/*'
                id='avatar'
                name='avatar'
                className='hidden'
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='px-0 pt-4 flex items-center'>
        <Button
          type='button'
          onClick={handleUpload}
          disabled={!avatar || loading}
        >
          {loading ? 'Uploading...' : 'Update Avatar'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UploadUserAvatar;
