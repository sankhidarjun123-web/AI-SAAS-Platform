import "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string | null;
      isSubscribed?: boolean;
      clerkId?: string | null;
    }
  }
}

export {};