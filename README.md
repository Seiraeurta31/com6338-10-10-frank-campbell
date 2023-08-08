# com6338-10-10-frank-campbell
Group Project - Allergen API Website

CONCEPT FOR APPLICATION: We wanted to develop an app that helps users find the local pollen level for various allergens, as well as the local air quality for the same location. We decided to make a home page that allowed a user to enter a location in the US and then make a choice of which type of into to recieve. The return info is presented on each corrosponding page, and allows the user to toggle between different pages to see the alternate info for that location. 

NOTES: We noticed upon searching API data for pollen that it either returns a true or false for data available if the pollen is in season so in order to present something when there was no data, it meant the pollen was not in season.  The only two locations we found to have SOME data was Jacksonville and Gainesville. LOL! So in order to show the data is properly showing, those two locations should be tested this time of year.  We also noticed some of the API's have trial/limited dates to use, (14-days) so we hope it will still be valid when tested. Site is functional on mobile, tablet, and desktop and both group members participated equally towards the project! 

Layout: _______________________________________________

MAIN: (Ashley/Olivia)
	Header design (o)
	- Basic paragraph info on pollen and air quality effects on   allergies (o)
	FORM: to take in user location – (local storage) (a)
	Buttons: (Pollen Level) (Air Quality) (o)
	Footer: website designed by: (o)


POLLEN (Ashley) 
	Display info:
	(Use local storage variable for data collection)
		Tree- (Types)
		Weed- (Types)
		Grass- (Types)
	Buttons: (Main) (Air Quality) 


AIR QUALITY (Oliva)
	Display info:	
	(Use local storage variable for data collection)
		Overall Quality: (Index)
	    Level
		Dominant Pollutant
	Buttons: (Main) (Pollen Level) 


API REFERENCES: _______________________________________________

Air Quality/Pollen API URL: 'https://api.tomorrow.io/v4/timelines?location=40.75872069597532,-73.98529171943665&fields=temperature&timesteps=1h&units=metric&apikey=ycicgyRBw7cbAW3qKUdr9jIMro44h7hA' 

Use Weather App to get Lat Longitude: https://api.breezometer.com/pollen/v2/forecast/daily?lat={lat}&lon={lon}&days=1&key={KEY}&features=types_information,plants_information


Pollen API URL: https://api.breezometer.com/pollen/v2/forecast/daily?lat={latitude}&lon={longitude}&key=YOUR_API_KEY&features={Features_List}&days={Number_of_Days}

apiKey for Air Quality = '480731dcb6fb44b490bb889fccedb762'

breezometer API for Pollen page:d8f9dcc96f87425a8e375f4f7ae2c788

