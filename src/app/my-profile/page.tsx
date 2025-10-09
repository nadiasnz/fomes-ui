'use client'; // only for App Router

import React, { useState } from 'react';
import {
  Box, Avatar, Typography, Button, TextField, Stack, Paper, Alert, IconButton
} from '@mui/material';
import fomesApi from '../api';
import CloseIcon from '@mui/icons-material/Close';
import { useSearchParams } from 'next/navigation';

export default function ProfilePage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordSuccessIsOpen, setPasswordSuccessIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const profilePhotoWasUploaded = searchParams.get('profile_photo_uploaded');
  const [uploadMessageIsClosed, setUploadMessageIsClosed] = useState(false);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Save on react states the selected file to display image preview. 
    // Profile photo is not updated here yet 
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');

    if (newPassword !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }
    else {
      setPasswordError('');
      try {
        await fomesApi.post('/change-password/', {
          current_password: currentPassword,
          new_password: newPassword,
        });

        // If the API call succeeded, update state to display password changed message
        setPasswordSuccessIsOpen(true);
      } catch (err) {
        setPasswordError('Error al cambiar la contraseña. Asegúrese de que ha introducido la contraseña actual correctamente.')
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      await fomesApi.patch("/profile-photo/", formData, {
        headers: {
          // Send binary data instead of JSON
          "Content-Type": "multipart/form-data",
        },
      });
      // Hard refresh to display the new profile photo on the header
      // Set query param to display profile photo uploded message
      window.location.href = '/my-profile?profile_photo_uploaded=true';
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {!uploadMessageIsClosed && profilePhotoWasUploaded && <Alert
              severity="success"
              variant="filled"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setUploadMessageIsClosed(true)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2, borderRadius: 2, fontSize: '1rem' }}
            >
              Su foto de perfil ha sido actualizada correctamente.
            </Alert>}
      <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h5" gutterBottom>Editar perfil</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
          <Avatar
            src={preview || '/default-avatar.png'}
            sx={{ width: 80, height: 80 }}
          />
          <label htmlFor="upload-photo">
            <input
              type="file"
              accept="image/*"
              id="upload-photo"
              hidden
              onChange={handleImageChange}
            />
            <Button variant="outlined" component="span">
              Cambiar foto
            </Button>
          </label>
        </Box>
        {selectedFile && (
          <Button
            onClick={handleUpload}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Subir foto
          </Button>

        )}

        <Box component="form" onSubmit={handlePasswordChange} sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>Cambiar contraseña</Typography>
          <Stack spacing={2}>

            <TextField
              fullWidth
              type="password"
              name="currentPassword"
              label="Contraseña actual"
              required
            />

            <TextField
              fullWidth
              type="password"
              name="newPassword"
              label="Nueva contraseña"
              required
            />

            <TextField
              fullWidth
              type="password"
              name="confirmPassword"
              label="Confirmar contraseña"
              required
            />

            <Button type="submit" variant="contained" color="primary">
              Cambiar contraseña
            </Button>

            {passwordSuccessIsOpen && <Alert
              severity="success"
              variant="filled"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setPasswordSuccessIsOpen(false)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2, borderRadius: 2, fontSize: '1rem' }}
            >
              Su contraseña ha sido actualizada correctamente.
            </Alert>}
            {passwordError && <Typography color='error'>{passwordError}</Typography>}
          </Stack>
        </Box>
      </Paper >
    </Box >
  );
}
