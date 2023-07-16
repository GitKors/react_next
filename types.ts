export interface Book {
  data: any;
  price: number;
  countBasket: number;
  selfLink: string;
  volumeInfo: {
    price: number;
    authors: string[];
    title: string;
    imageLinks?: {
      thumbnail: string;
    };
    averageRating?: number;
    ratingsCount?: number;
    description?: string;
  };
  saleInfo?: {
    listPrice?: {
      amount: number;
    };
  };
}

