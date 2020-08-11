const paginate = require("aws-async-paginate");

class Route53 {
    constructor(sdk) {
        this.sdk = sdk;
        this.route53 = new sdk.Route53();
    }

    async *listHostedZones() {
        const fn = params => this.route53.listHostedZones(params);
        yield* paginate(fn, "HostedZones");
    }

    async *listResourceRecordSets(HostedZoneId) {
        const fn = params => this.route53.listResourceRecordSets(params);
        yield* paginate(fn, "ResourceRecordSets", {HostedZoneId});
    }
}

module.exports = {Route53};
