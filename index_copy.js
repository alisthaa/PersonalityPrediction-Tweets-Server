const mongoose = require('mongoose');
const csvParser = require('csv-parser');
const fs = require('fs');
const { Db } = require('mongodb');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tweetDataFinal')
  .then(() => console.log('Connected!'));

// Define User schema
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    username: String,
    posts: String
});

const User = mongoose.model('User', userSchema);

// Read CSV file and insert records into MongoDB collection
const processCSV = async () => {
    const csvFilePath = 'merged.csv';
    
    try {
        const stream = fs.createReadStream(csvFilePath)
            .pipe(csvParser());

        stream.on('data', async (data) => {
            const user = new User({
                first_name: data.first_name,
                last_name: data.last_name,
                username: data.username,
                posts: data.posts
            });

            try {
                await user.save();
                console.log(`Inserted record: ${JSON.stringify(data)}`);
            } catch (error) {
                console.error(`Error inserting record: ${JSON.stringify(data)}, Error: ${error.message}`);
            }
        });

        stream.on('end', () => {
            console.log('CSV file processing complete.');
           // db.close();
        });
    } catch (error) {
        console.error('Error processing CSV:', error.message);
    }
};

// Start processing the CSV file
processCSV();