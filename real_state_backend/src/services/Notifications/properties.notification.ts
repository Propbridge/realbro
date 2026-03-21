import { NotificationType, Prisma } from "@prisma/client";

type AcquisitionApprovalNotificationInput = {
	propertyId: string;
	propertyTitle: string;
};

export function buildAcquisitionApprovalNotification(input: AcquisitionApprovalNotificationInput): {
	type: NotificationType;
	title: string;
	description: string;
	data: Prisma.InputJsonValue;
} {
	return {
		type: NotificationType.GENERIC,
		title: "Realbro is interested in your property",
		description: `Realbro is interested on your '${input.propertyTitle}' Property. Contact: contact@realbro.io | +91-80856-71414.`,
		data: {
			action: "acquisition_request_approved",
			propertyId: input.propertyId,
			propertyTitle: input.propertyTitle,
			email: "contact@realbro.io",
			callUs: "+91-80856-71414",
		},
	};
}
