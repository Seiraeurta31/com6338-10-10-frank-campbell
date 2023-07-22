# com6338-10-10-frank-campbell
Group Project - Allergen API Website

Layout: _______________________________________________

MAIN: (Ashley/Olivia)
	Header design (o)
	Basic paragraph info on pollen and air quality effects on allergies (o)
	FORM: to take in user location – (local storage) (a)
	Buttons: (Pollen Level) (Air Quality) (o)
	Footer: website designed by: (o)


POLLEN (Ashley) 
	Display info:
	(Use local storage variable for data collection)
		Level: (Poor – good)
		(Color icons for level -RED, YELLOW, GREEN)
		Tree- (Types)
		Weed- (Types)
		Grass- (Types)
	Buttons: (Main) (Air Quality) 


AIR QUALITY (Oliva)
	Display info:	
	(Use local storage variable for data collection)
		Overall Quality: (Index)
		(Color icons for level -RED, YELLOW, GREEN)
		Ozone Concentration: 
		Carbon Monoxide: 
		Health Concern:
	Buttons: (Main) (Pollen Level) 


API REFERENCES: 
Air Quality/Pollen API URL: 'https://api.tomorrow.io/v4/timelines?location=40.75872069597532,-73.98529171943665&fields=temperature&timesteps=1h&units=metric&apikey=ycicgyRBw7cbAW3qKUdr9jIMro44h7hA' 

Google API for location info to use with other API's: 
current location: https://www.google.com/maps/@?api=1&map_action=map
map by location: https://www.google.com/maps/search/?api=1&query=cleveland+Ohio 

GOOGLE API KEY: AIzaSyDm9WPv8_3Wnruym8e30Z3qhTsNJm0dBDc

Pollen API URL: https://api.breezometer.com/pollen/v2/forecast/daily?lat={latitude}&lon={longitude}&key=YOUR_API_KEY&features={Features_List}&days={Number_of_Days}

To include map image to page: https://developers.google.com/maps/documentation/javascript/adding-a-google-map#maps_add_map-javascript 

https://maps.googleapis.com/maps/api/geocode/json?address=cleveland&key=AIzaSyDm9WPv8_3Wnruym8e30Z3qhTsNJm0dBDc