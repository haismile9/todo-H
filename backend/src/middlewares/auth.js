import jwt from "jsonwebtoken";


export const protect = (req, res, next) => {
    try {
        let token;

        // Lấy token từ header Authorization
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // Kiểm tra nếu không có token
        if (!token) {
            return res.status(401).json({ message: 'Không có token, truy cập bị từ chối' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
         console.error('Lỗi xác thực người dùng:', error);
         res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
}