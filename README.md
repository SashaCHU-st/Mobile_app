# In progress...
Creating a React Native app for food recipes where users can find meals with nutrition values and recipes.
Users can add friends, and friends can see each other's recipes.
Planning to implement chat functionality soon.
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

# Some pictures
<img width="391" height="429" alt="image" src="https://github.com/user-attachments/assets/5a31e475-5961-49b9-80dd-5d0c2d422a97" />
<img width="394" height="427" alt="image (1)" src="https://github.com/user-attachments/assets/b466c5e3-8364-4236-8afb-313dafbe56cc" />
<img width="386" height="425" alt="image (2)" src="https://github.com/user-attachments/assets/0d7cf9b0-9347-4477-b787-e3e2b59160fb" />
<img width="388" height="425" alt="image (3)" src="https://github.com/user-attachments/assets/8ec91783-1ca0-461d-bd36-0abc04d76e04" />



# Progress of my Mobile app

###  Auth – Backend

| Feature           | Description                                      | Status         |
|------------------|--------------------------------------------------|----------------|
| **SignUp**        | Simple user registration                        | ✅ Done         |
| **Login**         | User login with credentials                     | ✅ Done         |
| **Logout**        | Clears session/token                            | ✅ Done         |
| **JWT**           | Secure authentication via JWT                   | ✅ Done         |
| **Hashed Passwords** | Passwords hashed securely (e.g., bcrypt)     |  ✅ Done   |

---

###  Friends – Backend

| Feature                   | Description                                              | Status         |
|--------------------------|----------------------------------------------------------|----------------|
| **Add Friend**           | Add user to friend list                                  | ✅ Done         |
| **Remove Friend**        | Remove friend from friend list                           | ✅ Done         |
| **Remove from Users**    | Exclude existing friends from users list                 | ✅ Done    |
| **Get All Users**        | Retrieve users excluding self and friends                | ✅ Done         |
| **Exclude Self**         | Prevent self from appearing in user list                 | ✅ Done         |
| **Friend Request Logic** | Prevent duplicates and manage request flow               | ✅ Done         |

---

###  Profile – Backend

| Feature                   | Description                                               | Status         |
|--------------------------|-----------------------------------------------------------|----------------|
| **Edit Profile**         | Update user profile fields                                | ✅ Done    |
| **Profile Picture Upload** | Upload and store profile picture                         | ✅ Done         |
| **View Profile Picture** | Retrieve and display profile image of other users                    | ✅ Done    |

---

##  Frontend Functionality

###  Auth – Frontend

| Feature           | Description                                      | Status         |
|------------------|--------------------------------------------------|----------------|
| **SignUp Page**    | Registration form                              | ✅ Done         |
| **Login Page**     | Login form                                      | ✅ Done         |
| **Switch Auth**    | Toggle between login and signup                 | ✅ Done         |
| **Credential Validation** | Input validation before request         | ✅ Done         |
| **Block Back Nav** | Prevent back nav after logout                  | ✅ Done         |
| **Logout Button**  | Logs out user from UI                          | ✅ Done         |

---

###  Friends – Frontend

| Feature                      | Description                                          | Status         |
|-----------------------------|------------------------------------------------------|----------------|
| **Friends Page UI**         | Shows users and current friends                      | ✅ Done         |
| **Add Friend Button**       | Add friend from users list                           | ✅ Done         |
| **Remove Friend Button**    | Remove friend from list                              | ✅ Done         |
| **Dynamic List Updates**    | Auto-refresh user/friend list after changes          |  ✅ Done   |
| **Exclude Friends from Users** | Hide existing friends from addable user list     |  ✅ Done   |
| **Confirm Friend Request**  | Accept/reject requests instead of instant friendship     |✅ Done |
| **Dynamic List Updates**    | Update user/friend lists after actions                   |✅ Done|
| **Profile Picture Display** | Show profile pictures across user lists                  |✅ Done| 
| **Remove from Users if Friend** | Filter out existing friends from addable users      |✅ Done|
| **Edit Profile UI**         | Update personal details from the frontend                |✅ Done|
| **Friend List Management**| Accept/reject/remove friends from list                    |✅ Done| 

---

###  Profile – Frontend

| Feature                   | Description                                          | Status         |
|--------------------------|------------------------------------------------------|----------------|
| **Edit Profile Page**    | UI for updating user details                        | ✅ Done   |
| **Profile Picture Upload** | Upload image from frontend                        | ✅ Done         |
| **View Profile Image**   | Display user picture in UI   of other users                      |  ✅ Done   |
| **Enhanced Profiles**      | Add bio, interests, and activity tracking                | planned|

---

##  Backend ↔ Frontend Integration

| Integration                        | Status         |
|-----------------------------------|----------------|
| **PostgreSQL via API**            | ✅ Done         |
| **Auth Integration**              | ✅ Done         |
| **Friends Integration**           | ✅ Done         |

---

##  Upcoming Features

###  In Progress

| Feature                      | Description                                              |
|-----------------------------|----------------------------------------------------------|


---

###  Planned

| Feature                    | Description                                               |
|---------------------------|-----------------------------------------------------------|
| **Real-time Notifications** | Alert user on friend activity or messages               |
| **Chat System**            | Messaging between confirmed friends                      |
| **Clean code**            | make it readable maybe with some comments                     |
| **Deploy**            | deploy in Vercel                     |
| **Take pictures**            | uploadd pictures of app to ReadMe              |

