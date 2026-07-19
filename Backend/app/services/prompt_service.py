from database.mongodb import db

def format_places(places: dict):
    if not places:
        return "No places found."

    newline = "\n"  
    lis=f"""
    Top {places}:
    {newline.join(f"-{i["name"]}({i["address"]})" for i in places)}
    """
    return lis




def build_prompt(trip, weather, place):
    prompt=f"""
        You are a trip planner 
        Trip Details
        Destination: {trip['destination']}
        Source: {trip['source']}
        Budget: ₹{trip['budget']}
        Travelers: {trip['travellers']}
        Travel Style: {trip['travel_style']}
        Interests: {", ".join(trip['interests'])}

        Weather
        Temperature: {weather['temperature']}°C
        Condition: {weather['condition']}
        Humidity: {weather['humidity']}%
        Wind Speed:{weather['wind_speed']}

        Places
        Attractions:{format_places(place['attractions'])}

        Nature:{format_places(place['nature'])}

        Food:{format_places(place['restaurants'])}

        Hotels:{format_places(place['hotels'])}

        INSTRUCTIONS:
        Return ONLY valid JSON.
        Do not return Markdown.
        Do not use ```json.
        Do not add explanations.

        The JSON must contain the following keys:

        - trip_summary
            - destination
            - duration
            - budget
            - travelers

        - days (array)
            Each day should contain:
            - day
            - title
            - activities (array)
            - meals (array)
            - estimated_cost

        - travel_tips (array)

        - total_estimated_cost

        NOTE: If the budget is too short and not possible then don't give Itinerary. 
        Just give a warning and suggest the budget. 
        Make sure to also include approx. price of flights/bus/train and hotels.
        Group nearby attractions on the same day.
        Minimize travel time.
        Avoid visiting the same area multiple times.        

        """

    return prompt


