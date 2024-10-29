// tsx src/cli/putSecrets.js <stage> <dbUrl>

const secrets = require("../lib/secrets");
require("dotenv").config();

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.log("Usage: tsx src/cli/migrator.js <stage> <dbUrl>");
  process.exit(1);
}

if (require.main === module) {
  console.log("Updating database url!!!");
  const [stage, dbUrl] = args;

  secrets
    .putDatabaseUrl(stage, dbUrl)
    .then((value) => {
      console.log("Secret set : ", value);
      process.exit(0);
    })
    .catch((err) => {
      console.log("Secret not set : ", err);
      process.exit(1);
    });
}
