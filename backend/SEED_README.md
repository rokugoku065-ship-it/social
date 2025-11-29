# Database Seeding

This script populates your database with 100 test users and sample data.

## What Gets Created

- **100 Users** with realistic names, bios, locations, and profile pictures
- **200-800 Posts** with images, hashtags, and likes
- **Friend Connections** (each user has 5-20 friends)
- **Comments** on posts with likes
- **Stories** for active users (within last 24 hours)

## How to Run

1. **Make sure MongoDB is running** on `localhost:27017`

2. **Run the seed script:**
   ```bash
   cd backend
   node seed.js
   ```

3. **Wait for completion** (takes 10-30 seconds)

## Login Credentials

After seeding, you can login with any of the 100 users:

- **Email Format:** `[username]@example.com`
  - Example: `johnsmith1@example.com`, `janedoe2@example.com`, etc.
- **Password:** `Test@123` (same for all users)

## Sample Usernames

The script generates usernames like:
- `johnsmith1`, `janedoe2`, `michaelbrown3`, etc.

## Reset Database

To clear and reseed:
```bash
node seed.js
```

The script automatically clears existing data before seeding.

## Notes

- Profile pictures use [Pravatar](https://pravatar.cc/) service
- Post images use [Picsum](https://picsum.photos/) service
- All timestamps are randomized to simulate realistic activity
- Friend connections are bidirectional
- Stories are only created for 30% of users (to simulate active users)
