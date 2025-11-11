# First TS Project | Poke API look up and display

fetchers seems redundant now that I am fetching the data directly in AbilityCard and PokemonCard. Originally I used fetchers.js to do this but switched to doing it in the cards themselves so that I can useparams and location with state to handle if someone directly navigates to a link instead of navigating there via the search buttonn.


This is my first TypeScript project, i had to do a lot of research to learn about interfaces and types, ultimately running into a lot of complaining from TS telling me to type my stuff. 
Throughout this project I had to learn how to create an interface(ultimately i decided on using Type instead, because it's better for complex types such as objects which my PokemonDetails contains.)

The helper functions were fun to write. I found myself removing hypens a lot, and uppercasing the first character often because the API returns stuff with spaces such as "clear body" as "clear-body" and names in all lowercase.
API also returns height in decimeters and weight in hectograms for some reason. So there are helper functions to conver those as well.

Notes for immediate future features:
- Pagination to list only 25 pokemon per page, such as on the route /types/:type which currently lists ALL pokemon of that type, or on abilities/:ability

- Suggested pokemon in search bar when searching probably via find method to find a string that matches any pokemon name from endpoint `https://pokeapi.co/api/v2/pokemon`


This project was built using React router v6, i know v7 exists but I just learned about v6 and wanted to flex my skills in it to apply what I've learned.

Overall there is some spaghetti code and clean-up to do with future updates.
