import { isRequirementMet } from "../utilities/ServiceUtils";
import { ServiceBase } from "./ServiceBase";

export class TwoDayEventService extends ServiceBase {
  protected getBasePrice = (): number =>
    isRequirementMet(this.services, "TwoDayEvent") ? 400 : 0;
}
