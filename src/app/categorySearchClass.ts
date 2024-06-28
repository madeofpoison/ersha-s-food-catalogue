import { CatalogueItem } from "./catalogue-item";

export class categorySearchClass {
    testData: CatalogueItem[] = []

    allCategories: string[] = this.returnAllCategoryTags();
    selectedCategories: string[] = [];
  // Returns all category tags for filter selection
    returnAllCategoryTags(): string[] {
        const categoryTags: string[] = [];
        this.testData.forEach((ingredient: CatalogueItem) => {
          if(!categoryTags.includes(ingredient.categoryTag)) categoryTags.push(ingredient.categoryTag)
        })
        if(this.selectedCategories){
        const filteredCategoryTags = categoryTags.filter((effect: string) => !this.selectedCategories.includes(effect));
        return filteredCategoryTags;
        }
        return categoryTags;
      }

      //Used when the button corresponding to a tag is pressed
      addToSelectedCategories(categoryName: string): void{
        this.selectedCategories.push(categoryName);
 
      }

      //Takes input from the user via the catalogue-search component and returns all the possible tag buttons that they might want based on that
      //Does not pick up on typos
      searchForPossibleCategories(searchTerm: string | null): string[] {
        if(!searchTerm) return this.allCategories;
        const possibleEffects:string[] = this.allCategories.filter((effect) => effect.toLowerCase().includes(searchTerm.toLowerCase()) && !this.selectedCategories.includes(effect));
        return possibleEffects;
      }
      //Removes a category on a button press from the "currrent-parameters" section.
      removeCategory(categoryName: string): void {
        const indexToRemove = this.selectedCategories.findIndex((category) => category === categoryName);
        this.selectedCategories.splice(indexToRemove,1);

        return;
      }
      constructor () {
        
      }
}