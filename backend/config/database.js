import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const atlasURI = "mongodb://gahanajain:gahanajain@ac-jryltsy-shard-00-00.t41zyzf.mongodb.net:27017,ac-jryltsy-shard-00-01.t41zyzf.mongodb.net:27017,ac-jryltsy-shard-00-02.t41zyzf.mongodb.net:27017/recipeDB?ssl=true&replicaSet=atlas-zun67x-shard-0&authSource=admin&appName=Cluster0";
        
        await mongoose.connect(atlasURI);
        console.log('MongoDB Atlas connected successfully for server...');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

export default connectDB;