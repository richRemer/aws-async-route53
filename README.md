Async wrapper for AWS SDK Route53 API.

Route53 Usage
=============

```js
const AWS = require("aws-sdk");
const {Route53} = require("aws-async-route53");
const route53 = new Route53(AWS);

async function listHostedZones() {
    for await (const zone of route53.listHostedZones()) {
        console.log(zone.Id, zone.Name);
    }
}
```
