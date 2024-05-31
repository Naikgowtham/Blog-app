import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@blog-app.5aka8bh.mongodb.net/?retryWrites=true&w=majority&appName=Blog-app`;

    try {
        await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error while connecting to the database:', error);
        process.exit(1);
    }
};

export default Connection;
