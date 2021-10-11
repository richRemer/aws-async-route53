const paginate = require("aws-async-paginate");

class Route53 {
  constructor(sdk) {
    this.sdk = sdk;
    this.route53 = new sdk.Route53();
  }

  async changeResourceRecordSets({
    HostedZoneId,
    ChangeBatch: {Changes=[]},
    ...params
  }) {
    params = {HostedZoneId, ChangeBatch: {Changes}, ...params};
    return this.route53.changeResourceRecordSets(params).promise();
  }

  async *listHostedZones() {
    const fn = params => this.route53.listHostedZones(params);
    yield* paginate(fn, "HostedZones");
  }

  async *listHostedZonesByName({
    ...params
  }={}) {
    const fn = opts => this.route53.listHostedZonesByName({...params, ...opts});
    yield* paginate(fn, "HostedZones");
  }

  async *listResourceRecordSets(HostedZoneId) {
    const fn = params => this.route53.listResourceRecordSets(params);
    yield* paginate(fn, "ResourceRecordSets", {HostedZoneId});
  }
}

module.exports = {Route53};
