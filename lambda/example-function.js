const handler = async (event, context ) => {
  event.Records.map( record => console.log(record.s3.object.key) );
}
module.exports = { handler }