import { CatalogueItem } from "./catalogue-item";

export class categorySearchClass {
    testData: CatalogueItem[] = []

    allCategories: string[] = this.returnAllCategoryTags();
    selectedCategories: string[] = [];

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
      addToSelectedCategories(categoryName: string): void{
        this.selectedCategories.push(categoryName);
 
      }
      searchForPossibleCategories(searchTerm: string | null): string[] {
        if(!searchTerm) return this.allCategories;
        const possibleEffects:string[] = this.allCategories.filter((effect) => effect.toLowerCase().includes(searchTerm.toLowerCase()) && !this.selectedCategories.includes(effect));
        return possibleEffects;
      }
    
      removeCategory(categoryName: string): void {
        const indexToRemove = this.selectedCategories.findIndex((category) => category === categoryName);
        this.selectedCategories.splice(indexToRemove,1);

        return;
      }
      constructor () {
        
      }
}