import mongoose from 'mongoose';

export interface UserIdProps {
  userId: string;
}

export interface UserProps {
  username?: string;
  email?: string;
  password?: string;
}

export interface LoginProps {
  username?: string;
  password?: string;
}

declare module 'express-session' {
  interface SessionData {
    userId: mongoose.Types.ObjectId;
  }
}
