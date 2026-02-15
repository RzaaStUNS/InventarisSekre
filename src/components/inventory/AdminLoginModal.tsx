import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (password: string) => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
    setPassword(''); // Reset field
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl border-none shadow-2xl bg-white/95 backdrop-blur-md">
        <DialogHeader>
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <DialogTitle className="text-center text-2xl font-bold text-foreground">
            Admin Control
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Masukkan Password Control Admin.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <Input
            type="password"
            placeholder="Ketik password di sini..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-2xl border-primary/20 focus-visible:ring-primary h-12 text-center text-lg"
            autoFocus
          />
          <Button 
            type="submit" 
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all font-bold text-lg shadow-cute"
          >
            Buka Kunci ✨
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLoginModal;
