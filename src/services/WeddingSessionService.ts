import { ServiceBase } from "./ServiceBase";

export class WeddingSessionService extends ServiceBase {
  protected getBasePrice = (): number => 600;

  protected getDiscount = (): number => {
    if (this.services.includes("Photography")) {
      return this.year === 2022 ? this.getBasePrice() : 300;
    }

    if (this.services.includes("VideoRecording")) {
      return 300;
    }

    return 0;
  };
}
