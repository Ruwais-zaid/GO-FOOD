// fetchFoodItems.js
const mongoose = require('mongoose');

const fetchFoodItems = async () => {
    try {
        const foodItemsCollection = mongoose.connection.db.collection("food_items");
        const footCategory = mongoose.connection.db.collection("foodCategory");
        const data = await foodItemsCollection.find({}).toArray();
        const data2 = await footCategory.find({}).toArray();
        return {
            data,
            data2
        }
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
        throw error; 
    }
};

module.exports = fetchFoodItems;
