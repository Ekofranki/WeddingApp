import { Price } from "../types/Price";
import { ServiceType } from "../types/ServiceType";

export abstract class ServiceBase {
  protected year: number;
  protected services: ServiceType[];

  constructor(year: number, services: ServiceType[]) {
    this.year = year;
    this.services = services;
  }

  protected abstract getBasePrice(): number;
  protected getDiscount = (): number => 0;

  calculate = (): Price => ({
    base: this.getBasePrice(),
    discount: this.getDiscount(),
  });
}
