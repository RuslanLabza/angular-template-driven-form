import { Country } from "../enum/country"

export interface Card {
  country: Country | null;
  username: string | null;
  birthday: string | null;
  index: number;
}
