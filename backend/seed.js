import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { User } from './src/models/user.model.js';
import { Post } from './src/models/post.model.js';
import { Comment } from './src/models/comment.model.js';
import { Story } from './src/models/story.model.js';
import { FriendRequest } from './src/models/friendRequests.model.js';

dotenv.config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = "socialapp";

// Disable strictQuery warning
mongoose.set('strictQuery', false);

// Sample data for generating realistic users
const firstNames = [
  'John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'James', 'Olivia', 'Robert', 'Sophia',
  'William', 'Isabella', 'Richard', 'Mia', 'Joseph', 'Charlotte', 'Thomas', 'Amelia', 'Charles', 'Harper',
  'Daniel', 'Evelyn', 'Matthew', 'Abigail', 'Anthony', 'Emily', 'Mark', 'Elizabeth', 'Donald', 'Sofia',
  'Steven', 'Avery', 'Paul', 'Ella', 'Andrew', 'Scarlett', 'Joshua', 'Grace', 'Kenneth', 'Chloe',
  'Kevin', 'Victoria', 'Brian', 'Riley', 'George', 'Aria', 'Edward', 'Lily', 'Ronald', 'Aubrey'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
];

const bios = [
  'Software Developer | Tech Enthusiast',
  'Travel Blogger | Adventure Seeker',
  'Fitness Coach | Health & Wellness',
  'Digital Artist | Creative Mind',
  'Entrepreneur | Startup Founder',
  'Photographer | Capturing Moments',
  'Writer | Storyteller',
  'Music Lover | Guitar Player',
  'Foodie | Recipe Creator',
  'Gamer | Streamer',
  'Designer | UI/UX Expert',
  'Teacher | Lifelong Learner',
  'Marketing Professional',
  'Data Scientist | AI Enthusiast',
  'Content Creator | Influencer',
  'Chef | Culinary Artist',
  'Athlete | Sports Enthusiast',
  'Book Lover | Avid Reader',
  'Nature Lover | Environmentalist',
  'Movie Buff | Film Critic'
];

const locations = [
  'New York, USA', 'London, UK', 'Tokyo, Japan', 'Paris, France', 'Sydney, Australia',
  'Toronto, Canada', 'Berlin, Germany', 'Mumbai, India', 'Dubai, UAE', 'Singapore',
  'Los Angeles, USA', 'Barcelona, Spain', 'Amsterdam, Netherlands', 'Seoul, South Korea',
  'San Francisco, USA', 'Rome, Italy', 'Bangkok, Thailand', 'Istanbul, Turkey',
  'Mexico City, Mexico', 'São Paulo, Brazil'
];

const postContents = [
  'Just finished an amazing project! 🚀',
  'Beautiful sunset today 🌅',
  'Coffee and coding ☕💻',
  'Weekend vibes! 🎉',
  'Exploring new places 🗺️',
  'Great day with friends! 👫',
  'Learning something new every day 📚',
  'Feeling grateful today 🙏',
  'New beginnings! ✨',
  'Making progress on my goals 💪',
  'Loving this weather! ☀️',
  'Just launched my new website! 🎊',
  'Throwback to good times 📸',
  'Motivation Monday! 💯',
  'Trying out a new recipe today 🍳',
  'Best workout session! 🏋️',
  'Reading an amazing book 📖',
  'Music makes everything better 🎵',
  'Grateful for this journey 🌟',
  'Celebrating small wins! 🎈'
];

const commentTexts = [
  'Amazing!', 'Love this!', 'Great work!', 'Awesome post!', 'So cool!',
  'Inspiring!', 'Well done!', 'Keep it up!', 'Fantastic!', 'Beautiful!',
  'Nice one!', 'Impressive!', 'Love it!', 'Great job!', 'Wonderful!',
  'This is great!', 'So good!', 'Perfect!', 'Excellent!', 'Outstanding!'
];

const storyContents = [
  'Good morning! ☀️', 'Coffee time ☕', 'Workout done! 💪', 'New day, new goals! 🎯',
  'Feeling productive today! 📝', 'Quick break 🌸', 'Sunset vibes 🌅', 'Late night coding 💻',
  'Weekend mode activated! 🎉', 'Just chilling 😎'
];

// Helper function to generate random element from array
const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Helper function to generate random number in range
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log(`Attempting to connect to: ${mongoURI}/${DB_NAME}`);
    await mongoose.connect(`${mongoURI}/${DB_NAME}`, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ Connected to MongoDB successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('\n⚠️  Make sure MongoDB is running on localhost:27017');
    console.error('   You can start MongoDB with: mongod');
    process.exit(1);
  }
};

// Clear existing data
const clearData = async () => {
  try {
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    await Story.deleteMany({});
    await FriendRequest.deleteMany({});
    console.log('✅ Cleared existing data');
  } catch (error) {
    console.error('❌ Error clearing data:', error);
  }
};

// Create users
const createUsers = async () => {
  const users = [];
  const hashedPassword = await bcrypt.hash('Test@123', 10);

  for (let i = 1; i <= 100; i++) {
    const firstName = randomElement(firstNames);
    const lastName = randomElement(lastNames);
    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${i}`;
    
    const user = {
      fullName: `${firstName} ${lastName}`,
      username: username,
      email: `${username}@example.com`,
      password: hashedPassword,
      bio: randomElement(bios),
      location: randomElement(locations),
      profilePicture: `https://i.pravatar.cc/150?img=${i}`,
      coverImage: `https://picsum.photos/seed/${i}/800/300`,
      followers: [],
      following: [],
      createdAt: new Date(Date.now() - randomNumber(1, 365) * 24 * 60 * 60 * 1000)
    };

    users.push(user);
  }

  const createdUsers = await User.insertMany(users);
  console.log(`✅ Created ${createdUsers.length} users`);
  return createdUsers;
};

// Create friend connections
const createFriendships = async (users) => {
  const friendRequests = [];
  
  for (let i = 0; i < users.length; i++) {
    const numFriends = randomNumber(5, 20);
    const friendIndices = new Set();
    
    while (friendIndices.size < numFriends) {
      const friendIndex = randomNumber(0, users.length - 1);
      if (friendIndex !== i) {
        friendIndices.add(friendIndex);
      }
    }

    for (const friendIndex of friendIndices) {
      // Add to followers/following
      if (!users[i].following.includes(users[friendIndex]._id)) {
        users[i].following.push(users[friendIndex]._id);
        users[friendIndex].followers.push(users[i]._id);
      }

      // Create accepted friend request
      friendRequests.push({
        sender: users[i]._id,
        receiver: users[friendIndex]._id,
        status: 'accepted',
        createdAt: new Date(Date.now() - randomNumber(1, 180) * 24 * 60 * 60 * 1000)
      });
    }
  }

  // Update users with followers/following
  for (const user of users) {
    await User.findByIdAndUpdate(user._id, {
      followers: user.followers,
      following: user.following
    });
  }

  await FriendRequest.insertMany(friendRequests);
  console.log(`✅ Created ${friendRequests.length} friendships`);
};

// Create posts
const createPosts = async (users) => {
  const posts = [];
  
  for (const user of users) {
    const numPosts = randomNumber(2, 8);
    
    for (let i = 0; i < numPosts; i++) {
      const post = {
        user: user._id,
        content: randomElement(postContents),
        image: Math.random() > 0.5 ? `https://picsum.photos/seed/${user._id}${i}/600/400` : null,
        likes: [],
        hashtags: Math.random() > 0.7 ? ['tech', 'coding', 'life'].slice(0, randomNumber(1, 3)) : [],
        createdAt: new Date(Date.now() - randomNumber(1, 90) * 24 * 60 * 60 * 1000)
      };

      // Add random likes
      const numLikes = randomNumber(0, 30);
      const likeIndices = new Set();
      while (likeIndices.size < numLikes && likeIndices.size < users.length) {
        likeIndices.add(randomNumber(0, users.length - 1));
      }
      post.likes = Array.from(likeIndices).map(idx => users[idx]._id);

      posts.push(post);
    }
  }

  const createdPosts = await Post.insertMany(posts);
  console.log(`✅ Created ${createdPosts.length} posts`);
  return createdPosts;
};

// Create comments
const createComments = async (users, posts) => {
  const comments = [];
  
  for (const post of posts) {
    const numComments = randomNumber(0, 10);
    
    for (let i = 0; i < numComments; i++) {
      const comment = {
        post: post._id,
        user: randomElement(users)._id,
        text: randomElement(commentTexts),
        likes: [],
        createdAt: new Date(post.createdAt.getTime() + randomNumber(1, 48) * 60 * 60 * 1000)
      };

      // Add random likes to comments
      const numLikes = randomNumber(0, 10);
      const likeIndices = new Set();
      while (likeIndices.size < numLikes && likeIndices.size < users.length) {
        likeIndices.add(randomNumber(0, users.length - 1));
      }
      comment.likes = Array.from(likeIndices).map(idx => users[idx]._id);

      comments.push(comment);
    }
  }

  const createdComments = await Comment.insertMany(comments);
  console.log(`✅ Created ${createdComments.length} comments`);
  return createdComments;
};

// Create stories
const createStories = async (users) => {
  const stories = [];
  const now = new Date();
  
  // Only create stories for random 30% of users (recent stories)
  const numUsersWithStories = Math.floor(users.length * 0.3);
  const usersWithStories = users.slice(0, numUsersWithStories);
  
  for (const user of usersWithStories) {
    const story = {
      user: user._id,
      content: randomElement(storyContents),
      image: `https://picsum.photos/seed/story${user._id}/400/600`,
      createdAt: new Date(now.getTime() - randomNumber(1, 20) * 60 * 60 * 1000) // Within last 20 hours
    };

    stories.push(story);
  }

  const createdStories = await Story.insertMany(stories);
  console.log(`✅ Created ${createdStories.length} stories`);
  return createdStories;
};

// Main seed function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...\n');
    
    await connectDB();
    await clearData();
    
    const users = await createUsers();
    await createFriendships(users);
    const posts = await createPosts(users);
    await createComments(users, posts);
    await createStories(users);
    
    console.log('\n✅ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Users: 100`);
    console.log(`   - Posts: ${posts.length}`);
    console.log(`   - Friendships: Multiple connections per user`);
    console.log(`   - Comments: Added to posts`);
    console.log(`   - Stories: Recent stories for active users`);
    console.log('\n💡 You can now login with any user:');
    console.log('   Email: [username]@example.com (e.g., johnsmith1@example.com)');
    console.log('   Password: Test@123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed script
seedDatabase();
