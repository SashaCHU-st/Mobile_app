# In progress...

# Usage
### Backend
```
cd server
npm install
npm run start
```
### Frontend
```
cd client
npm install
npm start
```

# Progress of my Mobile app

###  Backend

| Feature           | Description                                      | Status         |
|------------------|--------------------------------------------------|----------------|
|                  |                  ***Auth***                      |                |
| SignUp           | Simple SignUp on server                          | ✅ Done         |
| Login            | Simple Login on server                           | ✅ Done         |
| Logout           | Logout user from server                          | ✅ Done           |
| JWT              | JWT token generation and verification            | ✅ Done  |
| HashedPass       | Passwords hashed with bcrypt or similar          | 🔧 In Progress  |
|------------------|-------------------------------------------------|----------------|
|                  |                  ***Friends***                   |                |
| Add Friend       | Ability to add friends from users list           | ✅ Done        |
| Friends Page     | Created page to display all users and friends    | ✅ Done        |
| Exclude Self     | Fixed users list to exclude current logged-in user | ✅ Done      |


### Frontend

| Feature           | Description                                      | Status         |
|------------------|--------------------------------------------------|----------------|
|                  |                  ***Auth***                      |                |
| SignUp           | Simple SignUp on client                          | ✅ Done         |
| Login            | Simple Login on client                           | ✅ Done         |
| Switching Buttons| Switching between Login ⇄ SignUp                 | ✅ Done         |
| Credential Check | Validate user credentials before login           | ✅ Done  |
| Block Back Nav   | Prevent going back after logout                  | ✅ Done   |
| Logout           | Logout user from client                          | ✅ Done  |
|------------------|-------------------------------------------------|----------------|
|                  |                  ***Friends Backend***           |                |
| Add Friend       | Endpoint to add a friend                          | ✅ Done        |
| Get All Users    | Endpoint to get all users excluding current user | ✅ Done        |
| Return User IDs  | Fixed to include user IDs in response             | ✅ Done        |

### Backend Connected to Frontend

| Feature                                | Status         |
|----------------------------------------|----------------|
| ***Backend connected to Frontend*** (PostgreSQL) | ✅ Done         |


### Future Plans

#### In Progress
| Feature                | Description                                             | Status          |
|------------------------|---------------------------------------------------------|-----------------|
| Confirm Friend Request  | Implement functionality for friends to confirm requests | 🔧 In Progress  |
| Profile Picture Upload  | Enable uploading and storing profile pictures           | ✅ Done  |
| Prevent Duplicate Friends | Restrict adding a friend if already friends            | ✅ Done  |

#### Planned
| Feature                | Description                                            | Status          |
|------------------------|--------------------------------------------------------|-----------------|
| Friend List Management | Allow users to view, accept, reject, and remove friends |  Planned      |
| Real-time Notifications| Notify users of friend requests, confirmations, messages|  Planned      |
| Chat Functionality     | Implement direct messaging between friends              |  Planned      |
| User Profiles         | Enable editing user profiles with bio, interests, etc.   |  Planned      |
| Security Enhancements | Add rate limiting, input sanitization, and improved auth |  Planned      |


