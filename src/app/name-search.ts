import { filter } from "rxjs";
import { CatalogueItem } from "./catalogue-item";
import { testData } from "./testStuff";


export class NameSearch {
    testData: CatalogueItem[] =  testData;
    nameToSearch?: string;
    

    //For use in the exclusive view reconstruction.
    /**
     * 
     * @param arrayToFilter Array that will be checked against the search term.
     * @returns array with everything not at least partially matching the search term filtered out.
     */
    filterByName(arrayToFilter: CatalogueItem[]): CatalogueItem[] {
        const filteredList: CatalogueItem[] = [];
        arrayToFilter.forEach((item) => {
            if(item.name.toLowerCase().includes(this.nameToSearch!.toLowerCase())) filteredList.push(item);
        })
        return filteredList;
    };

    //For use in the non-exclusive view reconstruction.
    //To be called for each item in a for loop.
    /**
     * 
     * @param itemToFilter Item whose name will be checked.
     * @param arrayToAddTo Array thaT will be modified. Probably newView.
     * 
     */
    filterByNameNotStrict(itemToFilter: CatalogueItem , arrayToAddTo: CatalogueItem[]): void {
        if(itemToFilter.name.toLowerCase().includes(this.nameToSearch!.toLowerCase()) && 
        !arrayToAddTo.includes(itemToFilter)) arrayToAddTo.push(itemToFilter);
        return;
    }

}
