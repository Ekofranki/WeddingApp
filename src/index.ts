import { BlurayPackageService } from "./services/BlurayPackageService";
import { PhotographyService } from "./services/PhotographyService";
import { ServiceBase } from "./services/ServiceBase";
import { TwoDayEventService } from "./services/TwoDayEventService";
import { VideoRecordingService } from "./services/VideoRecordingService";
import { WeddingSessionService } from "./services/WeddingSessionService";
import { ServiceType } from "./types/ServiceType";
import { ServiceYear } from "./types/ServiceYear";
import { isRequirementMet } from "./utilities/ServiceUtils";

export const updateSelectedServices = (
  previouslySelectedServices: ServiceType[],
  action: { type: "Select" | "Deselect"; service: ServiceType }
) => {
  const { type, service } = action;
  switch (type) {
    case "Select": {
      if (previouslySelectedServices.includes(service)) {
        return previouslySelectedServices;
      }

      return isRequirementMet(previouslySelectedServices, service)
        ? [...previouslySelectedServices, service]
        : previouslySelectedServices;
    }
    case "Deselect": {
      if (!previouslySelectedServices.includes(service)) {
        return previouslySelectedServices;
      }

      let selectedServices = previouslySelectedServices.filter(
        (pss) => pss !== service
      );

      previouslySelectedServices.forEach((pss) => {
        if (!isRequirementMet(selectedServices, pss)) {
          selectedServices = selectedServices.filter((s) => s !== pss);
        }
      });

      return selectedServices;
    }
    default:
      return previouslySelectedServices;
  }
};

export const calculatePrice = (
  selectedServices: ServiceType[],
  selectedYear: ServiceYear
) => {
  let price = 0;
  let discount = 0;

  selectedServices.forEach((s) => {
    let service: ServiceBase;

    switch (s) {
      case "Photography":
        service = new PhotographyService(selectedYear, selectedServices);
        break;
      case "VideoRecording":
        service = new VideoRecordingService(selectedYear, selectedServices);
        break;
      case "WeddingSession":
        service = new WeddingSessionService(selectedYear, selectedServices);
        break;
      case "BlurayPackage":
        service = new BlurayPackageService(selectedYear, selectedServices);
        break;
      case "TwoDayEvent":
        service = new TwoDayEventService(selectedYear, selectedServices);
        break;
    }

    const servicePrice = service.calculate();

    price += servicePrice.base;
    discount += servicePrice.discount;
  });

  return { basePrice: price, finalPrice: price - discount };
};
