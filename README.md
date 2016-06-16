#Game-On

Game-On is a team management application designed to aid in getting recreational sports teams together and manage the matchmaking process. This is a mobile application built in react native with a rails backend api.  

Users of the application can login and find a team to join or create a team.  The team creator can set up matches and once enough people on the team rsvp the match can be viewed by other team managers for their team members to rsvp. Once a challenging team has enough players... GAME ON.

MVP functionality:

1. Player can find and join a team.
2. Team manager can setup a match which will notify teammates to RSVP.  Notification will be via email.
3. Matches that have the right amount of players with approved RSVP's are discoverable by other managers.
4. If an manager selects one of the descoverable games, their team is sent RSVP invites via email.
5. If enough players on away team approve game is established and players on both teams are notified via email.
6. Team chat interface.

Stretch Goals:

1. Geo Location
2. Team stats
3. Mulitple Sports
4. Web Interface to improve data entry for team managment

#App Interface

A Player or Manager will sign up or log in from the main screen.

![login](/imgs/login.png)

Once in they will be taken to a list of their teams.  A navigation bar on the bottom has links to the players teams, upcomming games, current RSVP's, and team chat.  Two options are also available to create a team which they will be manager of or join an existing team in the system.

![new_team](/imgs/new_team_page.png) 
![join_team](/imgs/join_team.png)

Selecting the team they will be taken to their team page which displays some team information including team roster and location.  If the Player is the team manager two options are available 

![team_page](/imgs/team_page_as_manager.png) 
![create_game](/imgs/create_game_screen.png)
![challenge_team](/imgs/challenge_team.png) 

Under the games tab user can see any upcomming games for there team and some game information such as the teams that will be playing, the time and location.

![upcoming_game](/imgs/upcoming_game.png)

There is also an RSVP page for any outstanding games that require a player to RSVP for.  This would have the team name and a button for accepting or declining.  If enough players accept to create a game all pending rsvp's for that game are removed and the game is established.

![rsvp](/imgs/rsvp_page.png)

Once a game is established, emails are sent. Similar to the following.

![email_rsvp](/imgs/rsvp_email.png)
![email_confirmation](/imgs/game_confirmation_email.png)

The fourth tab is for the in app chat feature where a player can leave comments for their teamate.

![team_chat](/imgs/team_chat.png)

This is done real time using Firebase and each team has it's own chat room.

#Project Details

Game On is an open source project with MIT license.  It utilizes a Rails backend with a SQL database to serve the React native front end.  A Firebase database handles the in app chat.  

#Contributers

slalexander, shaun-sweet, billdevcode, ttalhouk

#Wireframe

![wireframe](/imgs/game_on.gif)

#Link to Demo Video

[Game-On](https://youtu.be/tJZr927sfnk?t=19m38s "Game On Demo")
