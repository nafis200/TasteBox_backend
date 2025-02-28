export interface IMeal {
    id?: string;
    name: string;
    cuisine: string;
    dietary_preferences: string[];
    rating: number;
    availability: boolean;
    portion_size: "small" | "medium" | "high";
    price: number; 
  }
  