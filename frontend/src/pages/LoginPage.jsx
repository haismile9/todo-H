import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLogin, useMe } from '@/hooks/auth/useLogin';
import { Card, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const LoginPage = () => {
    const navigate = useNavigate();
    const { data: user, isLoading } = useMe();
    const { mutateAsync: login, isPending } = useLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    // Đã đăng nhập (vừa login xong hoặc F5 còn token) thì về trang chủ
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (!email.trim() || !password) {
            setErrors({ general: 'Vui lòng điền email và mật khẩu' });
            return;
        }

        try {
            await login({ email, password });
        } catch (error) {
            setErrors({
                general: error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.',
            });
            setPassword('');
        }
    };

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Đang tải...</div>;
    }

    return (
        <form className="flex flex-col items-center justify-center min-h-screen bg-gray-100" onSubmit={handleSubmit}>
            <Card className="w-full max-w-md mx-auto mt-10 p-6">
                <CardTitle>Đăng nhập</CardTitle>
                <Input
                    type="email"
                    placeholder="Nhập địa chỉ email..."
                    className="flex-1 bg-transparent border-2 border-dashed placeholder:text-gray-400 focus:border-primary focus:ring-0"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <Input
                    type="password"
                    placeholder="Nhập mật khẩu..."
                    className="flex-1 bg-transparent border-2 border-dashed placeholder:text-gray-400 focus:border-primary focus:ring-0"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                {errors.general && (
                    <p className="text-sm text-red-500">{errors.general}</p>
                )}
                <Button
                    type="submit"
                    variant="gradient"
                    size="xl"
                    className="px-6 mt-4"
                    disabled={isPending}
                >
                    {isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </Button>
            </Card>
        </form>
    );
};

export default LoginPage;
