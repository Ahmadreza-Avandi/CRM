'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { mockUsers } from '@/lib/mock-data';


export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const currentYear = new Date().getFullYear();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);

        const user = mockUsers.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            // کمی تاخیر برای نمایش انیمیشن
            await new Promise(resolve => setTimeout(resolve, 600));
            router.push('/dashboard');
        } else {
            setIsLoggingIn(false);
            setError('ایمیل یا رمز عبور اشتباه است');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
            <div className="w-full max-w-[400px] px-4">
                <motion.div
                    className="mb-8 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="w-[180px] h-[180px] mx-auto mb-4 relative"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                    >
                        <Image
                            src="https://uploadkon.ir/uploads/5c1f19_25x-removebg-preview.png"
                            alt="رابین تجارت"
                            fill
                            className="object-contain"
                            priority
                        />
                    </motion.div>
                    <motion.h1
                        className="text-3xl font-bold font-vazir bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        رابین تجارت
                    </motion.h1>
                    <motion.p
                        className="text-muted-foreground mt-2 font-vazir"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        سیستم مدیریت ارتباط با مشتریان
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <Card className="border-border/50 backdrop-blur-sm bg-background/95">
                        <CardContent className="pt-6">
                            <motion.form
                                onSubmit={handleLogin}
                                className="space-y-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <motion.div
                                    className="space-y-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <Label htmlFor="email" className="font-vazir">ایمیل</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="ایمیل خود را وارد کنید"
                                        className="font-vazir"
                                        required
                                        dir="rtl"
                                    />
                                </motion.div>
                                <motion.div
                                    className="space-y-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <Label htmlFor="password" className="font-vazir">رمز عبور</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="رمز عبور خود را وارد کنید"
                                        className="font-vazir"
                                        required
                                        dir="rtl"
                                    />
                                </motion.div>
                                {error && (
                                    <motion.p
                                        className="text-red-500 text-sm text-center font-vazir"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring" }}
                                    >
                                        {error}
                                    </motion.p>
                                )}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        type="submit"
                                        className="w-full font-vazir bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90"
                                        disabled={isLoggingIn}
                                    >
                                        {isLoggingIn ? 'در حال ورود...' : 'ورود به سیستم'}
                                    </Button>
                                </motion.div>
                            </motion.form>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.p
                    className="text-center text-sm text-muted-foreground mt-4 font-vazir"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    توسعه داده شده توسط رابین تجارت &copy; {currentYear}
                </motion.p>
            </div>
        </div >
    );
}
