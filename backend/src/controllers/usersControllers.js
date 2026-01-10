import User from "../models/User.js";


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng:', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        
    }
}

export const createUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const user = new User({username, email, password});
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Lỗi khi tạo người dùng:', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
}
    
export const updateUser = async (req, res) => {
    try {
        const {name, email} = req.body;        
    } catch (error) {
        
    }
}


export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({message: 'Xóa người dùng thành công'});
    } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
}