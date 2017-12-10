README
while(true)sleep(); //Team WTS

Team members:
Cheng Gong - Project Manager
Junshen (Kevin) Chen - Software Development Lead
Daniele (Dan) Huang - Software Architect 
Xiaohan (Hannah) Liao - UI
Tianhui (Aviva) Hu - UI
Yalin (Shirley) Shi - system analyst
Kuo Liang - business analyst
Mengying Li - database
Juan (John) Guang - database / business analyst
Yiming Cai - algorithm
Alejandro Toy - QA

Introduction
College students are becoming increasingly busy with coursework and personal commitments, so much to a point that it is getting harder to meet others and socialize. This difficulty becomes more prevalent when certain courses requires students to meet each other to form study groups, produce group projects, and more. 
FriendZone is an all-in-one social media platform that allows UCSD students to find friends within their classes easily, without distractions that come with traditional social media. With FriendZone's friend-matching algorithm, students can find others who are most compatible with schedules, creating new opportunities of group studying and socializing, and thus breaking the barrier of taking the first step of meeting others in the same class.

System Requirements
This application runs on any browser (Google Chrome recommended), with a proper internet connection. We also recommend an aspect ratio of 16:9 with no custom zoom for best experience in FriendZone.

Installation Instructions
For a production build, please directly visit friendzoned.us

Installation Instructions (Local)
For running FriendZone on a localhost, please follow the following steps.
Make sure npm is installed on your local machine, visit https://nodejs.org/en/ to download the latest version of Node and npm 
After npm is installed, use the terminal to navigate to a directory of your choice, then run the following commands
git clone https://github.com/CniveK/friend-zone.git 
cd friend-zone
npm install
npm start
It may take a while. When done, your browser should open up and load FriendZone. If a browser window does not open, open your browser and manually go to localhost:3000 

Known Bugs / Behaviours

Email verification:
The verification email can take up to 1 hour to send, and may end up in the spam folder. By that time, the link may have already expired. Because it is handled by Google Firebase. We currently do not know how to solve this problem. 

Unverified user:
The system shall allow the new user (without verifying their email) to create a profile and use our feature. However, if the user exits FriendZone / refreshes, the user shall not be able to access any feature until they verify the email. This behavior is by design to allow users to get a first impression of FriendZone features. 

Block friend: 
If A block B,  When B checks his/her friend list, the button of A appears as "unblock this friend". We are currently resolving this bug.

Profile layout:
If a user's last name is very long, it might overlap with the "major" field. We are currently resolving this problem.

Accepting friend request:
Clicking on "accept" on a friend request may result in the first request to disappear (instead of the correct one), this may be resolved by refreshing. We are currently resolving this problem.

