import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    
        console.log('Kết nối đến MongoDB thành công!');
    } catch (error) {
        console.error('Kết nối đến MongoDB thất bại:', error);
        process.exit(1); // Thoát ứng dụng nếu không kết nối được
    }
};
