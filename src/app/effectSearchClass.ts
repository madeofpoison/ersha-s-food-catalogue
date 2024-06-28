import { CatalogueItem } from "./catalogue-item";
import { categorySearchClass } from "./categorySearchClass";

export class effectSearchClass extends categorySearchClass {
    override testData: CatalogueItem[] =[]
    allEffects: string[] = this.returnAllEffectTags();
    selectedEffects: string[] = [];

    returnAllEffectTags(): string[] {
        const effectTags: string[] = [];
        this.testData.forEach((ingredient: CatalogueItem) => {
          ingredient.effectTags.forEach((effect) => {
            if(!effectTags.includes(effect)) effectTags.push(effect);
          })
        })
        if(this.selectedEffects){
        const filteredEffectTags = effectTags.filter((effect: string) => !this.selectedEffects.includes(effect));
        return filteredEffectTags;
        }
        return effectTags;
      }
      searchForPossibleEffects(searchTerm: string | null): string[] {
        if(!searchTerm) return this.allEffects;
        const possibleEffects:string[] = this.allEffects.filter((effect) => effect.toLowerCase().includes(searchTerm.toLowerCase()) && !this.selectedEffects.includes(effect));
        return possibleEffects;
      }
      addToSelectedEffects(effectName:string): void {
        this.selectedEffects.push(effectName);
      }
      removeEffect(effectName: string): void {
        const indexToRemove = this.selectedEffects.findIndex((effect) => effectName == effect);
        this.selectedEffects.splice(indexToRemove,1);
        return;
      }
      constructor() {
        super();
      }
}