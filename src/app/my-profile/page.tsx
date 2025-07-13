'use client'; // only for App Router

import React, { useState } from 'react';
import {
  Box, Avatar, Typography, Button, TextField, Stack, Paper,
} from '@mui/material';


export default function ProfilePage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [passwordError, setPasswordError] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');

    if (newPassword !== confirmPassword) {
      ('New passwords do not match!');
      setPasswordError('Las contraseñas no coinciden');

      return;
    }


    else {
      setPasswordError('')
    }


    // Handle password update (send to backend)
    console.log({ currentPassword, newPassword });
  };


  const handleUpload = () => {
    if (!selectedFile) return;
    // Handle upload to server
    console.log('Uploading:', selectedFile);
  };

  return (
    <Box sx={{ p: 4 }}>
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
            {passwordError && <Typography color='error'>{passwordError}</Typography>}
          </Stack>
        </Box>
      </Paper >
    </Box >
  );
}
