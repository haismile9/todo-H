import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '@/api/auth.api'
import { useNavigate } from 'react-router'

export const authKeys = {
    all: ['auth'],
    me: () => [...authKeys.all, 'me'],
}


export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (credentials) => authApi.login(credentials),
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            queryClient.setQueryData(authKeys.me(), data.user);
        }
    });
}

export const useMe = () => {
    return useQuery({
        queryKey: authKeys.me(),
        queryFn: () => authApi.getMe(),
        enabled: !!localStorage.getItem('token'),
        retry: false, // Disable automatic retries
    });
}

export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return () => {
        localStorage.removeItem('token');        // (1) quên token
        queryClient.clear();                     // (2) xoá toàn bộ cache: me, tasks...
        navigate('/login', { replace: true });   // (3) chuyển về trang login
    };
}
