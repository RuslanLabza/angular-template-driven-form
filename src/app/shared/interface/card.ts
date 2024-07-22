import { Country } from "../enum/country"

export interface Card {
  country: Country | '';
  username: string;
  birthday: string;
}
