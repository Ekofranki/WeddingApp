import { ServiceType } from "../types/ServiceType";

const getRequiredServices = (service: ServiceType): ServiceType[] => {
  switch (service) {
    case "BlurayPackage":
      return ["VideoRecording"];
    case "TwoDayEvent":
      return ["VideoRecording", "Photography"];
    default:
      return [];
  }
};

export const isRequirementMet = (
  selectedServices: ServiceType[],
  service: ServiceType
) => {
  const requiredServices = getRequiredServices(service);

  return (
    !requiredServices.length ||
    requiredServices.some((s) => selectedServices.includes(s))
  );
};
