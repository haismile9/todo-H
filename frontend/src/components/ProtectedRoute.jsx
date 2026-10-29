import { Navigate, Outlet } from 'react-router';
import { useMe } from '@/hooks/auth/useLogin';

const ProtectedRoute = () => {
    const { data: user, isLoading, isError } = useMe();

    // (a) Có token, đang gọi /me → chờ, chưa vội kết luận
    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Đang tải...</div>;
    }

    // (b) /me lỗi (token hết hạn hoặc sai) → bỏ token hỏng, về login
    if (isError) {
        localStorage.removeItem('token');
        return <Navigate to="/login" replace />;
    }

    // (c) Không có token, nên query không chạy và user = undefined → về login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // (d) Đã đăng nhập → render trang con (HomePage)
    return <Outlet />;
};

export default ProtectedRoute;
