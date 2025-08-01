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

### 🔐 Auth – Backend

| Feature           | Description                                      | Status         |
|------------------|--------------------------------------------------|----------------|
| **SignUp**        | Simple user registration                        | ✅ Done         |
| **Login**         | User login with credentials                     | ✅ Done         |
| **Logout**        | Clears session/token                            | ✅ Done         |
| **JWT**           | Secure authentication via JWT                   | ✅ Done         |
| **Hashed Passwords** | Passwords hashed securely (e.g., bcrypt)     |  In Progress  |

---

### 👥 Friends – Backend

| Feature                   | Description                                              | Status         |
|--------------------------|----------------------------------------------------------|----------------|
| **Add Friend**           | Add user to friend list                                  | ✅ Done         |
| **Remove Friend**        | Remove friend from friend list                           | ✅ Done         |
| **Remove from Users**    | Exclude existing friends from users list                 | In Progress  |
| **Get All Users**        | Retrieve users excluding self and friends                | ✅ Done         |
| **Exclude Self**         | Prevent self from appearing in user list                 | ✅ Done         |
| **Friend Request Logic** | Prevent duplicates and manage request flow               | ✅ Done         |

---

### 👤 Profile – Backend

| Feature                   | Description                                               | Status         |
|--------------------------|-----------------------------------------------------------|----------------|
| **Edit Profile**         | Update user profile fields                                | ✅ Done    |
| **Profile Picture Upload** | Upload and store profile picture                         | ✅ Done         |
| **View Profile Picture** | Retrieve and display profile image of other users                    | In Progress    |

---

## 🎨 Frontend Functionality

### 🔐 Auth – Frontend

| Feature           | Description                                      | Status         |
|------------------|--------------------------------------------------|----------------|
| **SignUp Page**    | Registration form                              | ✅ Done         |
| **Login Page**     | Login form                                      | ✅ Done         |
| **Switch Auth**    | Toggle between login and signup                 | ✅ Done         |
| **Credential Validation** | Input validation before request         | ✅ Done         |
| **Block Back Nav** | Prevent back nav after logout                  | ✅ Done         |
| **Logout Button**  | Logs out user from UI                          | ✅ Done         |

---

### 👥 Friends – Frontend

| Feature                      | Description                                          | Status         |
|-----------------------------|------------------------------------------------------|----------------|
| **Friends Page UI**         | Shows users and current friends                      | ✅ Done         |
| **Add Friend Button**       | Add friend from users list                           | ✅ Done         |
| **Remove Friend Button**    | Remove friend from list                              | ✅ Done         |
| **Dynamic List Updates**    | Auto-refresh user/friend list after changes          |  In Progress  |
| **Exclude Friends from Users** | Hide existing friends from addable user list     |  In Progress  |

---

### 👤 Profile – Frontend

| Feature                   | Description                                          | Status         |
|--------------------------|------------------------------------------------------|----------------|
| **Edit Profile Page**    | UI for updating user details                        | ✅ Done   |
| **Profile Picture Upload** | Upload image from frontend                        | ✅ Done         |
| **View Profile Image**   | Display user picture in UI   of other users                      |  In Progress  |

---

## 🔄 Backend ↔ Frontend Integration

| Integration                        | Status         |
|-----------------------------------|----------------|
| **PostgreSQL via API**            | ✅ Done         |
| **Auth Integration**              | ✅ Done         |
| **Friends Integration**           | ✅ Done         |

---

## 🛠️ Upcoming Features

### 🚧 In Progress

| Feature                      | Description                                              |
|-----------------------------|----------------------------------------------------------|
| **Confirm Friend Request**  | Accept/reject requests instead of instant friendship     |
| **Dynamic List Updates**    | Update user/friend lists after actions                   |
| **Profile Picture Display** | Show profile pictures across user lists                  |
| **Remove from Users if Friend** | Filter out existing friends from addable users      |
| **Edit Profile UI**         | Update personal details from the frontend                |

---

### 🧠 Planned

| Feature                    | Description                                               |
|---------------------------|-----------------------------------------------------------|
| **Friend List Management**| Accept/reject/remove friends from list                    |
| **Real-time Notifications** | Alert user on friend activity or messages               |
| **Chat System**            | Messaging between confirmed friends                      |
| **Enhanced Profiles**      | Add bio, interests, and activity tracking                |
