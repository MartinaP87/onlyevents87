## Manual Testing


### Browser Compatibility

Browser | Outcome | Pass/Fail | 
--- | --- | --- |
Google Chrome | No appearance, responsiveness nor functionality issues. | Pass |
Safari | No appearance, responsiveness nor functionality issues. | Pass |
Mozilla Firefox | No responsiveness nor functionality issues. | Pass |
Microsoft Edge | No appearance, responsiveness nor functionality issues. | Pass |


### Device Compatibility

Device | Operative System |Outcome | Pass/Fail
--- | --- | --- | --- |
Dell Optiplex 7060 | Windows 11 | No appearance, responsiveness nor functionality issues. | Pass |
MacBook Pro 15" | macOS Big Sur | No appearance, responsiveness nor functionality issues. | Pass |
Dell Latitude 5300 | Windows 10 | No appearance, responsiveness nor functionality issues. | Pass |
iPad Pro 12.9" | iOS 15 | No appearance, responsiveness nor functionality issues. | Pass |
iPad Pro 10.5" | iOS 15 |No appearance, responsiveness nor functionality issues. | Pass |
iPhone XR | iOS 15 |No appearance, responsiveness nor functionality issues. | Pass |
iPhone 7 | iOS 15 |No appearance, responsiveness nor functionality issues. | Pass |

**Note**

The appearance of the product quantity form on the shopping bag page can be improved on smaller devices.

### Test Results

#### Navigation bar

Element | Expected Outcome | Pass/Fail |
--- | --- | --- |
Navbar | When user is logged-out it displays only the logo, home, sign in and sugn up links. | Pass |
Navbar | When user is logged-in it displays the logo, add event, home, feeds, favorites, interested, going, sign out and profile links. | Pass |
Navbar | When user is the admin it displays the logo, add event, home, categories, feeds, favorites, interested, going, sign out and profile links. | Pass |
Main Logo Link | Clicking the link redirects to the home page. | Pass |
Add event Link | Clicking the link redirects to the add event form. | Pass |
Home Link | Clicking the link redirects to about section in the home page. | Pass |
Categories Link | Clicking the link redirects to the categories page. | Pass |
Feeds Link | Clicking the link redirects to the account home page, presenting only the events posted by the users the current user follows. | Pass |
Favorites Link | Clicking the link redirects to the home page, presenting only the events of which genres are incuded in the user's preferences. | Pass |
Interested link | Clicking the link redirects to the home page, presenting only the events the user showed interest for. | Pass |
Going link | Clicking the link redirects to the home page, presenting only the events the user is going to. | Pass |
Profile Link | Clicking the link redirects to the user profile page. | Pass |
Sign out link | Clicking the link redirects to the home page, logging out the user and displaying a different navbar layout. | Pass |
Sign in Link | Clicking the link redirects to the account sign in page. | Pass |
Sign up Link | Clicking the link redirects to the account sign up page. | Pass |

#### Home Page

Element | Expected Outcome | Pass/Fail |
--- | --- | --- |
Search Bar | Typing in the search bar filters the events in the home page displaying the events of which the keyword is included in the username, title, or date. | Pass |
Add the next event Link | Clicking the link will redirect the user to the create event form. | Pass |
Event Card avatar | Clicking the link redirects to the avatar owner profile. | Pass |
Event Card image | Clicking the link redirects to the event page. | Pass |
Event Card star icon | Clicking the icon increases the number displayed next it. On the event page, the user appers in the Interested section. | Pass |
Event Card checked calendar icon | Clicking the icon increases the number displayed next it. On the event page, the user appers in the Going section. | Pass |
Event Card comment icon | Clicking the link redirects to the event page. | Pass |
Most followed profile avatar | Clicking the avatar redirects to the avatar owner's profile page. | Pass |
Most followed profile Follow button | Clicking the button makes it change the style and the text to Unfollow, it increases the number of followers of the profile clicked on, and the number of following of the user that clicked. | Pass |
Most followed profile Unfollow button | Clicking the button makes it change the style and the text to Follow, it decreases the number of followers of the profile clicked on, and the number of following of the user that clicked. | Pass |

#### Event Page

Element | Expected Outcome | Pass/Fail |
--- | --- | --- |
See gallery button | Clicking on the button, it toggles the gallery, showing/hiding the event's photos. | Pass |
Add a photo button | Clicking on the button, it redirects the user to the photo create form. | Pass |
Event dropdown menu icon | It's displayed only if the user is the event owner. | Pass |
Event dropdown menu icons | Clicking the icon displays an edit and delete icon. | Pass |
Event dropdown menu delete icon | Clicking the icon deletes the event. | Pass |
Event dropdown menu edit icon | Clicking the icon redirects the user to the event edit form. | Pass |
Add genre button | It displays only if the user is the event owner. | Pass |
Add genre button | Clicking the button toggles the form to add genres to the event. | Pass |
Genre form | The form displays all genres realtive to the events category. | Pass |
Genre form | Selecting a genre and clicking on create, adds a new genre to the event. | Pass |
Genre form | Selecting a genre and clicking on create, adds a new genre to the event. | Pass |
Genre form | Selecting a genre already added and clicking on create, displays an error message. | Pass |
Genre form | Selecting a "select the event genre" option and clicking on create, displays an error message. | Pass |
Comment create form | Typing a comment and clicking on post, adds the comment. | Pass |
Comments | All the event comments are displayed in chronological order, with the most recent on top. | Pass |
Comments | Users can like comments unless they are the comment owner. | Pass |
Comment dropdown menu | If the user is the comment owner, the dropdown menu is displayed. | Pass |
Comment dropdown menu | If the user is clicks on the menu it displays the edit and delete icons. | Pass |
Comment dropdown menu | If the user is clicks on the delete icon, it deletes the comment. | Pass |
Comment dropdown menu | If the user is clicks on the edit icon, it opens the edit form with the previous comment in it. | Pass |
Comment edit form | If the user edits the comment and clicks on "save" it updates the comment. | Pass |
Comment edit form | If the user edits the comment and clicks on "cancel" it discharges the change. | Pass |
Going section | It displays the profiles of the users going to the event, and their count. | Pass |
Going section | If the user clicks on the going icon (checked calendar) at the bottom of the event (or event card), the number of going increases. | Pass |
Going section | If the user clicks on the going icon at the bottom of the event (or event card), the user avatar and name appear in the going section. | Pass |
Going section | If the user clicks again on the going icon at the bottom of the event (or event card), the number of going decreases. | Pass |
Going section | If the user clicks again on the going icon at the bottom of the event (or event card), the user avatar and name disappear from the going section. | Pass |
Interested section | It displays the profiles of the users interested in the event, and their count. | Pass |
Interested section | If the user clicks on the interested icon (star) at the bottom of the event (or event card), the number of interested increases. | Pass |
Interested section | If the user clicks on the interested icon at the bottom of the event (or event card), the user avatar and name appear in the interested section. | Pass |
Interested section | If the user clicks again on the interested icon at the bottom of the event (or event card), the number of interested decreases. | Pass |
Interested section | If the user clicks again on the interested icon at the bottom of the event (or event card), the user avatar and name disappear from the going section. | Pass |

#### Event create form

Upload image | If the user clicks on the section, it allows the user to upload an image. | Pass |
Upload image | If the user doesn't upload an image the form can't be submitted. | Pass |
Upload image | If the user doesn't upload an image, it displays an error message. | Pass |
Event title field | If the user clicks on the section, it allows the user to type a title for the event. | Pass |
Event title field | If the user doesn't input a title the form can't be submitted. | Pass |
Event title field | If the user doesn't input a title it displays an error message. | Pass |
Event datetime field | If the user clicks on the section, it allows the user to add the datetime of the event. | Pass |
Event datetime field | If the user doesn't input a datetime the form can't be submitted. | Pass |
Event datetime field | If the user doesn't input a datetime it displays an error message. | Pass |
Event category field | If the user clicks on the section, it allows the user to add the category to the event. | Pass |
Event category field | If the user doesn't select a category the form can't be submitted. | Pass |
Event category field | If the user doesn't select a category it displays an error message. | Pass |
Event category field | If the user selects the "select the event category" option, it displays an error message. | Pass |
Event location field | If the user clicks on the section, it allows the user to type the location of the event. | Pass |
Event location field | If the user doesn't input the location the form can't be submitted. | Pass |
Event title field | If the user doesn't input the location it displays an error message. | Pass |
Event address field | If the user clicks on the section, it allows the user to type the address of the event. | Pass |
Event address field | If the user doesn't input the address the form can't be submitted. | Pass |
Event title field | If the user doesn't input the address it displays an error message. | Pass |
Event content field | If the user clicks on the section, it allows the user to type a description of the event. | Pass |
Event content field | If the user doesn't input the content the form can still be submitted. | Pass |
Event cancel button | If the user clicks on the cancel button, it redirects the user to the previous page. | Pass |
Event create button | If the user clicks on the create button, it posts the event unless error messages are displayed. | Pass |

#### Event edit form

