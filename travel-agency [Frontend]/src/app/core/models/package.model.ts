export interface PackageImage {
  id: number;
  imageUrl: string;
}

export interface Package {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  maxPeople: number;
  isFeatured: boolean;
  destinationId: number;
  destinationName: string;
  packageImages: PackageImage[];
}