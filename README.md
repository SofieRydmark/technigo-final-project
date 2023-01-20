## View it live
Backend: https://party-planner-technigo-e5ufmqhf2q-lz.a.run.app/

Expo Go (only on android due to limitations for iOS): https://expo.dev/@sofierydmark/Planda?serviceType=classic&distribution=expo-go

# Final Project - PLANDA

We have created a party planner app (kids & grownups) with React Native that will be available in Google Play Store after final testing. Users will log in to their own account and then be able to browse inspiration and idées for themes, activities, food, drinks, and decorations. You will be able to choose if you want to plan a kid's party or a grownup party. 

User can save projects/parties to their profile with a project board and make a guest list, estimated budget and check off tasks that she/he have done. User can add estimated costs for each part and the total estimated budget for their parties. 

The category database is built by us.

Problems: 
- Figurring out how submodel in MongoDB works in backend a
- How to connect everything in frontend to be able to make changes in array in frontend
- We had issue to make reset password work, and connect it to send a message to user with confirmation
- Android version crashed few days before hand-in, did not work on emulator, not on android device
- Google Cloud deploying issues when using dotenv files for email passwords and user, sending with nodemailer in backend. Google couldn't read the dotenv.

Our approach:
- Our main approach for issuse were to re-read documentation, check stackoverflow, YouTube tutorials, ChatGPT and try different solutions in our     code.
- We worked also as a team, and discussed issues together. 
- Soultion for Google Cloud dotenv file was a lot of searching through bug logs but found solution on Stack Overflow to add environmental variables when doing a new revision. Now Google cloud could read our email authentications
- Android problem troubleshooting: We decided to come back to moment when everything was working, and check one by one, what is the feature that crashed the app. First of all we created a new app to check if it is not a problem with expo, new app worked without issue. Next we went to uppdates in app.json because we changed expo icon to our own, that was not an issue either. The third check was lottie animation in background in the app, which end up being an issue for android. After changing it back to picture, everything started working again. 

<h2> What we have learned and practise: </h2>

1. Project menagment 
      - bigger project planning
      - project code structure
      - how to work in Agile
      - how to work in different branches and connecting everything together 
      - how to work with tickets

2. TECH

        + Frontend 
             -  React Native 
             -  Styling in React Native 
             -  Redux 
             -  Lottie animations 
             -  How to connect backend to frontend 

         + Backend 
            - Node.js
            - MongoDB
            - MongoDB Schema & Models (including submodels) 
            - Authentication  
      
3. Others

     - using mobile develomplent tools (emulators) 
     - Google Clouds 
     - Mongo Atlas & Compass 
     - Postman

Team: Sofie Rydmark, Amanda Elvkull, Kaja Wilbik
