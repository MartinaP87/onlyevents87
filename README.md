# Only Events

OnlyEvents is an events website based on a social media model. 
The purpose of the website is to acknowledge users of events, which they can filter according to their tastes.
The website also helps users socialize through a commenting section that enables them to schedule meet-ups before an event.
Users can show interest and attendance to events, comment and like others' comments, and post pictures relative to the events. 
Users can only post pictures on the event page, not on their profile page, as this is not a social media that aims to promote individuals but only events, and they can not like pictures since the purpose of the website is not to encourage or discourage to post photos in base on other users' likes.
Visit the deployed website here.

## User Experience (UX)

### Strategy

**Project Goals:**
- Responsive design to make the website accessible on different screen sizes.

- Structure is easy to understand and navigates effortlessly.

- The website design and colors are appealing to the users.

- Users are offered the opportunity to register an account.

- Easy process to create and retrieve events resulting in a pleasant experience for the users.

**User Goals**

**Epic 1 - Main events page**
- As a logged-in user, I can create events so that other users with my same interests can participate.
- As an event owner, I can edit and delete my event so that I can make corrections or update my event after it was created.
- As a logged-in user, I can view the details of an event so that I can learn more about it.
- As a user, I can view the events ordered from the farthest in the future so that I can view the events in chronological order.
- As a user, I can keep scrolling through the events on the site, that are loaded for me automatically so that I don't have to click on "next page".
- As a user, I can view a navbar from every page so that I can navigate easily between pages.

**Epic 2 - Comments**
- As a logged-in user, I can add comments to an event so that I can share my thoughts about the event.
- As a logged-in user, I can read comments left by users under events so that I can read what other users think about the events.
- As a comment owner, I can edit and delete my comment so that I can make corrections after my comment was created.

**Epic 3 - Profiles**
- As a logged-in user, I can edit my profile so that I can change my profile picture, interests, and bio.
- As a logged-in user, I can update my username and password so that I can change my display name and keep my profile secure.
- As a logged-in user, I can follow and unfollow other users so that I can see and remove events by specific users in my events feed.
- As a user, I can see a list of the most followed profiles so that I can see which profiles are popular.

**Epic 4 - User account**
- As a user, I can create a new account so that I can access all the features for signed-up users.
- As a user, I can sign in to the app so that I can access functionality for logged-in users.
- As a user, I can tell if I am logged in or not by the look of the navigation bar so that I can log in if I need to.

**Epic 5 - Admin fuctionalities**
- As an admin, I can create categories so that other users can add a category to the event they create.
- As an admin, I can edit and delete categories so that I can make corrections or update the category after it was created.
- As an admin, I can view the categories list so that I can see which new categories I can add.
- As an admin, I can create genres so that other users can add genres to the event they create and add them to their preferences.
- As an admin, I can edit and delete genres so that I can make corrections or update the genre after it was created.
- As an admin, I can view the genres list so that I can see which new genres I can add.

**Epic 6 - Photos**
- As a logged-in user, I can post a photo of the event so that users can have an insight into the event.
- As a photo owner, I can edit or delete my photos so that I can make corrections after the photo was posted.
- As a logged-in user, I can view a photo list of the event so that I can have a better understanding of the event.

**Epic 7 - User extra functionalities**
- As a user, I can search for events with keywords so that I can find the events I am most interested in.
- As a logged-in user, I can like comments so that I can show my support and agreement with other users' opinions.
- As a logged-in user, I can be interested in an event so that I can show my interest in the events that I want to go to.
- As a logged-in user, I can be going to an event so that I can show my participation in the events.
- As a logged-in user, I can view the events list filtered by the users I follow so that I can keep up to date with the events they are posting.
- As a logged-in user, I can view the events I am interested in so that I can decide to participate.
- As a logged-in user, I can view the events I am going to so that I can have a reminder.
- As a logged-in user, I can view the events list filtered by my preferences so that I can quickly find the events I am most likely interested in.
- As a logged-in user, I can see a list of profiles that are attending and a list of profiles that are showing interest in the event so that I can see how popular is the event.

### Strategy table
<table>
<thead>
<tr>
<th>Opportunity / Problem</th>
<th>Importance</th>
<th>Story points<th>
</tr>
</thead>
<tbody>
<tr>
<td>Responsive design</td>
<td>5</td>
<td>5</td>
</tr>
<tr>
<td>Create, edit and delete events</td>
<td>5</td>
<td>5</td>
</tr>
<tr>
<td>View event list</td>
<td>5</td>
<td>2</td>
</tr>
<tr>
<td>View event list filtered by preference/going/interested/following</td>
<td>5</td>
<td>2</td>
</tr>
<tr>
<td>View event page</td>
<td>5</td>
<td>2</td>
</tr>
<tr>
<td>Create, edit and delete event genres</td>
<td>4</td>
<td>5</td>
</tr>
<tr>
<td>Show interest/uninterest for an event</td>
<td>3</td>
<td>2</td>
</tr>
<tr>
<td>Show going/not going to an event</td>
<td>3</td>
<td>2</td>
</tr>
<tr>
<td>Create, edit and delete event photos</td>
<td>5</td>
<td>5</td>
</tr>
<tr>
<td>View event photo list</td>
<td>5</td>
<td>5</td>
</tr>
<tr>
<td>View profiles that are going/interested in the event page</td>
<td>2</td>
<td>4</td>
</tr>
<tr>
<td>Account registration</td>
<td>5</td>
<td>5</td>
</tr>
<tr>
<td>Display user profile</td>
<td>5</td>
<td>5</td>
</tr>
<tr>
<td>Edit user profile</td>
<td>5</td>
<td>5</td>
</tr>
<tr>
<td>Follow/unfollow profiles</td>
<td>3</td>
<td>2</td>
</tr>
<tr>
<td>Create, edit and delete categories</td>
<td>4</td>
<td>5</td>
</tr>
<tr>
<td>View category list</td>
<td>4</td>
<td>2</td>
</tr>
<tr>
<td>View category page</td>
<td>4</td>
<td>2</td>
</tr>
<tr>
<td>Create, edit and delete genres</td>
<td>4</td>
<td>5</td>
</tr>
<tr>
<td>View genre list</td>
<td>4</td>
<td>2</td>
</tr>
<tr>
<td>Create and delete user preferences</td>
<td>3</td>
<td>2</td>
</tr>
<tr>
<td>Search event by title, name, or date</td>
<td>5</td>
<td>1</td>
</tr>
<tr>
<td>Create, edit and delete comments</td>
<td>5</td>
<td>5</td>
</tr>
<tr>
<td>View comment list</td>
<td>5</td>
<td>2</td>
</tr>
<tr>
<td>Like/Unlike comments</td>
<td>3</td>
<td>2</td>
</tr>
<tr>
<td>Total</td>
<td>106</td>
<td>84</td>
</tr>
</tbody>
</table>

### Scope
The development process of the project has been divided into phases. The first phases aim to build the essential features for a minimal working website, and the last phases include the features that are desirable but not mandatory.

**First Phase**
- Create, edit and delete events
- View event list
- View event page
- Search event by title, name, or date
- Create, edit and delete comments
- View comment list

**Second Phase**
- Account registration
- Display user profile
- Edit user profile
- Follow/unfollow profiles
- Create, edit and delete categories
- View category list
- View category page
- Create, edit and delete genres
- View genre list
- Create, edit and delete event genres

**Third Phase**
- Create, edit and delete event photos
- View event photo list
- Create and delete user preferences
- Like/Unlike comments
- Show interest/uninterest for an event
- Show going/not going to an event
- View event list filtered by preference/going/interested/following
- Responsive design
- View profiles that are going/interested in the event page

### User Stories
GitHub projects was used as my project management tool to track user stories. Using a Kanban board helped to focus on specific tasks and track the project progress.

**Sprint 1**
![User Stories Progress 1](readme-images/first_sprint.png)

**Sprint 2**
![User Stories Progress 2](readme-images/second_sprint.png)

**Sprint 3**
![User Stories Progress 3](readme-images/third_sprint.png)

**Sprint 4**
![User Stories Progress 4](readme-images/fourth_sprint.png)

**Sprint 5**
![User Stories Progress 5](readme-images/fifth_sprint.png)

**Sprint end**
![User Stories Progress 6](readme-images/end_sprint.png)

### Structure
The website has been organized in a hierarchical tree structure for the user to navigate the site intuitively.

![Only Events website map](readme-images/tree.png)

### Design planning:
The design of the website has been implemented using Balsamiq wireframes. The wireframes allowed me to sketch prototypes of the web pages so that I had a clear visual idea of how the website should have looked like.

**Home Page**
![Only Events home](readme-images/home_wireframe.png)

**Profile Page**
![Only Events profile](readme-images/my_profile_wireframe.png)

**Event Page**
![Only Events event](readme-images/my_event_wireframe.png)

**Categories Page**
![Only Events category](readme-images/categories_wireframe.png)

**Category Page**
![Only Events category](readme-images/category_wireframe.png)

**Add event form**
![Only Events add event](readme-images/add_event_wireframe.png)

**Add photo form**
![Only Events add event](readme-images/photo_form_wireframe.png)