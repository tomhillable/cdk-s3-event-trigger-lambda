const cdk = require('aws-cdk-lib');
const { Template } = require('aws-cdk-lib/assertions');
const CdkS3EventTriggerLambda = require('../lib/cdk-s3-event-trigger-lambda-stack');
const {handler} = require('../lambda/example-function');
const sampleEvent = require('./sample-event.json');

test('S3 Bucket Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new CdkS3EventTriggerLambda.CdkS3EventTriggerLambdaStack(app, 'MyTestStack');
  // THEN
  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::S3::Bucket', {});
});

test('Lambda handles sample event', async () => {
  const consoleSpy = jest.spyOn(console, 'log');
  await handler(sampleEvent, {});
  expect(consoleSpy).toHaveBeenCalledWith('HappyFace.jpg');
})