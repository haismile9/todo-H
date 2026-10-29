import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const generateToken = (id) => {
    return jwt.sign(
        { id }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
}

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ 
                message: 'Vui lòng cung cấp đầy đủ thông tin' 
            });
        }
        // Kiểm tra username đã tồn tại chưa
        const existingUsername = await User.findOne({username});
        if (existingUsername) {
            return res.status(400).json({ 
                message: 'Username đã được sử dụng' 
            });
        }

        // Kiểm tra email đã tồn tại chưa
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({ 
                message: 'Email đã được sử dụng' 

            });
        }

        //Tạo user mới (password sẽ được hash do pre-save hook)
        const user = new User({ username, email, password });
        await user.save();
        

        // Tạo token
        const token = generateToken(user._id);

        res.status(201).json({
            message: 'Đăng ký thành công',
            token,
            user: {
                id: user._id,
                username: user.username,    
                email: user.email,
            }
        });
    } catch (error) {
        console.error('Lỗi khi đăng ký người dùng:', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        
    }
};

// Đăng nhập
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        // Kiểm tra dữ liệu đầu vào
        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Vui lòng điền email và password' 
            });
        }

        // Kiểm tra email có tồn tại không
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({ 
                message: 'Email hoặc password không đúng' 
            });

        }

        // Kiểm tra password
        const isPasswordpPass = await user.comparePassword(password);
        if(!isPasswordpPass) {
            return res.status(400).json({ 
                message: 'Email hoặc password không đúng' 
            });
        }

        // Tạo token
        const token = generateToken(user._id);

        res.status(200).json({
            message: 'Đăng nhập thành công',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });

    } catch (error) {
        console.error('Lỗi khi đăng nhập người dùng:', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }


    
};

// Lấy thông tin user hiện tại (yêu cầu đã đăng nhập)
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin user:', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }

};

