const AWS = require("@aws-sdk/client-ssm");

const AWS_REGION = process.env.AWS_REGION || "ap-south-1";
const STAGE = process.env.STAGE || "prod";
console.log(STAGE);

// Configure AWS SDK for SSM
const ssm = new AWS.SSM({ region: AWS_REGION });

const getDatabaseUrl = async () => {
  const DATABASE_URL_SSM_PARAM = `/serverless-framework/${STAGE}/database-url`;
  const paramStoreData = await ssm.getParameter({
    Name: DATABASE_URL_SSM_PARAM,
    WithDecryption: true,
  });

  return paramStoreData.Parameter.Value || process.env.DATABASE_URL;
};

const putDatabaseUrl = async (stage, dbUrl) => {
  const paramStage = stage || "dev";

  if (paramStage === "prod") {
    return;
  }

  if (!dbUrl) {
    return;
  }

  const DATABASE_URL_SSM_PARAM = `/serverless-framework/${paramStage}/database-url`;

  const paramStoreData = await ssm.putParameter({
    Name: DATABASE_URL_SSM_PARAM,
    Value: dbUrl,
    Type: "SecureString",
    Overwrite: true,
  });

  return paramStoreData;
};

module.exports.getDatabaseUrl = getDatabaseUrl;
module.exports.putDatabaseUrl = putDatabaseUrl;
