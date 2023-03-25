const { promisify } = require('util');
const ora = require('ora')

const download = promisify(require('download-git-repo'));

module.exports.clone = async function (repo, desc) {
  const process = ora(`download...${repo}\n`);
  process.start();

  await download(repo, desc);
  process.stop();
}