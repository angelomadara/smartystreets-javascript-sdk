const UnprocessableEntityError = require("../errors").UnprocessableEntityError;

class Lookup {
	constructor(country, freeform) {
		this.result = [];

		this.country = country;
		this.freeform = freeform;
		this.address1 = undefined;
		this.address2 = undefined;
		this.address3 = undefined;
		this.address4 = undefined;
		this.organization = undefined;
		this.locality = undefined;
		this.administrativeArea = undefined;
		this.postalCode = undefined;
		this.geocode = undefined;
		this.language = undefined;
		this.inputId = undefined;

		this.ensureEnoughInfo = this.ensureEnoughInfo.bind(this);
		this.ensureValidData = this.ensureValidData.bind(this);
	}

	ensureEnoughInfo() {
		if (fieldIsMissing(this.country)) throw new UnprocessableEntityError("Country field is required.");

		if (fieldIsSet(this.freeform)) return true;

		if (fieldIsMissing(this.address1)) throw new UnprocessableEntityError("Either freeform or address1 is required.");

		if (fieldIsSet(this.postalCode)) return true;

		if (fieldIsMissing(this.locality) || fieldIsMissing(this.administrativeArea)) throw new UnprocessableEntityError("Insufficient information: One or more required fields were not set on the lookup.");

		return true;
	}

	ensureValidData() {
		if (fieldIsSet(this.geocode) && this.geocode.toLowerCase() !== "true") throw new UnprocessableEntityError("Invalid input: geocode can only be set to 'true' (default is 'false'.");
	}
}

function fieldIsMissing (field) {
	if (!field) return true;

	return field.replace(/\s/g, "").length < 1;
}

function fieldIsSet (field) {
	return !fieldIsMissing(field);
}

module.exports = Lookup;