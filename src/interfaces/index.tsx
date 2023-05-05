export type ProductData = {
  id: string,
  photo: string[],
  title: string,
  price: number,
  categproes: string[]
}

export type ProductCategories = {
  checked: boolean;
  id: string;
  category: string;
}
