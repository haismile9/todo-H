import { useNavigate } from 'react-router';
import { Button } from './ui/button';
import { useMe, useLogout } from '@/hooks/auth/useLogin';

const Header = () => {
    const navigate = useNavigate();
    const { data: user } = useMe();
    const logout = useLogout();

    const handleClick = () => {
        if (user) {
            logout();
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Todo-H</h1>

            <p className="text-sm text-gray-500 dark:text-gray-400">
                Ứng dụng quản lý công việc cá nhân hiệu quả
            </p>

            {user && <p className="text-sm">Xin chào, {user.username}</p>}

            <Button variant="outline" className="w-full sm:w-auto" onClick={handleClick}>
                {user ? 'Đăng xuất' : 'Đăng nhập'}
            </Button>
        </div>
    );
};

export default Header;
