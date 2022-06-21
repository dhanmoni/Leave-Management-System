# Student Leave Management System using Blockchain

A full-fledged leave management system built on the Ethereum blockchain, supporting 6 types of user role (System admin, local guardian, project guide, HoD, warden, DSW).

When student applies for leave, the application gets stored on the Ethereum Blockchain, admins can approve/reject, if approved then the application gets forwarded to the next admin. It provides one-click authentication system using Metamask. Functionalities that are related to the leave application (apply by student, approve/reject by admin, approving admin profile by system admin) deal with blockchain, other functionalities such as creating user profile, adding project guide, updating profile don't require interaction with blockchain, they're handled by Nodejs and MongoDB.


## Features

Before leaving the campus, a student has to have a leave form duly signed from his/her respective local guardian, project guide(if any), HoD and hostel warden. If the leave is more than 3 days then he/she has to get the leave form signed from the DSW (Dean of Students welfare).
This is a manual process and takes up an entire half of the student. So the main process of this project is to build a web application that use the power of blockchain to make this process much less tedious and more convenient for the student and the faculty involved in the process.

Features/Workflow of the system: 

1. User registers in the app and provides basic info and ID proof

    - If the user is a student, then add/select local guardian, department and hostel.

    - If the user role is Project guide/ HoD/ Warden/ Local guardian then provide information related to that role.

2. Once registered, the system admin will approve/reject the Project guide/ HoD/ Warden/ Local guardian user profile; in case of student user, system admin or HoD or Warden can approve/reject user profile.

3. Student can now apply for leave

4. Student can either apply for academic leave(application gets forwared to only HoD) or a normal leave.

5. In case of normal leave, the following procedure occurs:

    - Approval by local guardian: If rejected, leave cancelled. If approved, application gets forwarded to Project guide.

    - Approval by Project guide: If rejected, leave cancelled. If approved, application gets forwarded to HoD.

    - In case the student has no project guide, then the application directly gets forwared to HoD.

    - Approval by HoD: If rejected, leave cancelled. If approved, application gets forwarded to DSW if the leave if longer than 3 days, else application gets forwarded to warden.

    - Approval by Warden: If rejected, leave cancelled. If approved, the leave gets approved and a final approval result will be shown in the student dashboard.

    - Student can also withdraw the application at any stage.

    - System admin can reject the application at the final stage if required.

**The leave application contains the following information:**

    - Reason/Subject

    - A detailed explaination

    - From Date

    - To Date

    - Whether academic leave or normal leave

    - Prefix date and reason(if any)

    - Suffix date and reason(if any)

**The application is a combination of MERN stack and Ethereum Blockchain(Ropsten testnet). The interaction with blockchain happens when:**

    - the system admin approves admins(Local guide, Project guide, HoD and Warden)

    - a student applies for a leave

    - admin approves/rejects a leave application

    - a student withdraw his/her leave application

**Tasks that can be performed by system admin:**

    - Add hostels and departments

    - Approve/reject admins' and students' profile

    - Cancel already approved leave applications

    - Delete users

**Tasks that can be performed by normal admins:**

    - Approve/reject leave applications of students under the admin, ie, HoD can approve/reject application of students of his/her department, similarly local guardian and project guide can approve/reject application of students under their guidance, warden can approve/reject application of students of his/her hostel

    - Approve/reject student profile of his/her department/hostel (only by HoD and warden)

    - View student profile

**Tasks that can be performed by students:**

    - Apply for leave, withdraw leave.

    - Add/change project guide(needs verification of HoD or system admin).

 

**Challenges I faced during the development of this project:**

It was my first major blockchain project, before that I created a simple Dapp that allowed users to transfer crypto from one wallet to another.

The first challenge was to come up with an efficient way to integrate all the tech stack. The project description/abstract was all I was given, and I had to use blockchain regardless. In the beginning, I was confused as to how I could utilize blockchain. I cannot just store everything on a smart contract; for example, the user would have profile information, which would not need to be stored because each change would cost gas. After researching a lot, I finally realized I needed to write a smart contract for the leave application and build a core MERN app to handle logic not directly related to the leave application, for example, creating and updating user profiles. 

I ran into my next challenge when I discovered there was no way to store an array of objects inside a "struct" where I could store who has approved/rejected a particular application in solidity, so I devised a hack. I created an array that would store the address of the approvers, I also initialized a counter variable called approvalLevel; if the action performed was "approve", the level would be increased and the approvers would be added to the array, if the action performed was "reject", the address would be added to the array but the level would be zero. In order to implement this hacky method, I also had to write tons of hacky code on the frontend. 

## Screenshots

![App Screenshot](https://res.cloudinary.com/dmn19/image/upload/v1654191393/all-lms-min.png)

![App Screenshot](https://res.cloudinary.com/dmn19/image/upload/v1654191392/landing-lms-min.png)

![App Screenshot](https://res.cloudinary.com/dmn19/image/upload/v1654191392/auth-lms-min.png)

![Screenshot](https://res.cloudinary.com/dmn19/image/upload/v1654191393/student-dashboard-lms-min.png)

![Screenshot](https://res.cloudinary.com/dmn19/image/upload/v1654191392/apply-lms-min.png)

![Screenshot](https://res.cloudinary.com/dmn19/image/upload/v1654191392/sadm-app-lms-min.png)
