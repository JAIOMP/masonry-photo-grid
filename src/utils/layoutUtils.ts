import { PixabayPhoto } from "../types";

export const splitItemsIntoColumns = (
    items: PixabayPhoto[],
    numColumns: number
  ) => {
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
  
  export const getNumberOfColumns = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) {
      return 3;
    } else if (screenWidth >= 768) {
      return 2;
    } else {
      return 1;
    }
  };