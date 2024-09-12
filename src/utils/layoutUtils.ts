import { PixabayPhoto, GridColumnCount } from "../types";

export const splitItemsIntoColumns = (
    items: PixabayPhoto[],
    numColumns: number
  ): PixabayPhoto[][] => {
    const columns: PixabayPhoto[][] = Array.from(
      { length: numColumns },
      () => []
    );
  
    items.forEach((item: PixabayPhoto, index) => {
      const columnIndex = index % numColumns;
      columns[columnIndex].push(item as PixabayPhoto);
    });
  
    return columns;
  };
  
  export const getNumberOfColumns = (): GridColumnCount => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) {
      return 3;
    } else if (screenWidth >= 768) {
      return 2;
    } else {
      return 1;
    }
  };
