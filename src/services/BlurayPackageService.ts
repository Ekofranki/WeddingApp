import { isRequirementMet } from "../utilities/ServiceUtils";
import { ServiceBase } from "./ServiceBase";

export class BlurayPackageService extends ServiceBase {
  protected getBasePrice = (): number =>
    isRequirementMet(this.services, "BlurayPackage") ? 300 : 0;
}
