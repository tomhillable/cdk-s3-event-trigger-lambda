const { Stack, RemovalPolicy } = require('aws-cdk-lib');
const s3 = require('aws-cdk-lib/aws-s3');
const lambda = require('aws-cdk-lib/aws-lambda');
const notifications = require('aws-cdk-lib/aws-s3-notifications');

class CdkS3EventTriggerLambdaStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);
    
    const myBucket = new s3.Bucket(this, 'ExampleBucket', {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });

    const myFunction = new lambda.Function(this, 'ExampleFunction', {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'example-function.handler',
      code: lambda.Code.fromAsset('lambda')
    })

    myBucket.addEventNotification(s3.EventType.OBJECT_CREATED, new notifications.LambdaDestination(myFunction))

  }
}

module.exports = { CdkS3EventTriggerLambdaStack }
