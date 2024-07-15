import { CatalogueItem } from "./catalogue-item";
import { RaritySearch } from "./raritySearch";

export class LocationSearch extends RaritySearch {

    allLocations: string[] = this.returnAllLocations();
    selectedLocations: string[] = [];

    returnAllLocations(): string[] {
        const locationTags: string[] = [];
        this.testData.forEach((ingredient: CatalogueItem) => {
          if(ingredient.location) {
            if(!locationTags.includes(ingredient.location)) locationTags.push(ingredient.location)
          }
        })
        if(this.selectedLocations){
          const filteredlocationTags = locationTags.filter((effect: string) => !this.selectedLocations.includes(effect));
          return filteredlocationTags;
        }
        return locationTags;
    }
          //Used when the button corresponding to a tag is pressed
          addToSelectedLocations(locationName: string): void{
            this.selectedLocations.push(locationName);
     
          }
    
          //Takes input from the user via the catalogue-search component and returns all the possible tag buttons that they might want based on that
          //Does not pick up on typos
          searchForPossibleLocations(searchTerm: string | null): string[] {
            if(!searchTerm) return this.allLocations;
            const possibleEffects:string[] = this.allLocations.filter((effect) => effect.toLowerCase().includes(searchTerm.toLowerCase()) && !this.selectedLocations.includes(effect));
            return possibleEffects;
          }
          //Removes a Location on a button press from the "currrent-parameters" section.
          removeLocation(locationName: string): void {
            const indexToRemove = this.selectedLocations.findIndex((location) => location === locationName);
            this.selectedLocations.splice(indexToRemove,1);
    
            return;
          }
          constructor() {
            super();
          }
}