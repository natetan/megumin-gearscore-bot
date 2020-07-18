const db = require('../db/gearscoredb');
const displayUtils = require('../utils/displayUtils');
const embedUtils = require('../utils/embedUtils');

module.exports = {
  name: 'top10',
  desc: 'Get\'s the top 10 gs scores',
  commandType: 'general',
  async execute(message, args, client) {
    try {
      let users = await db.getUsers();
      users.sort((a, b) => {
        const gs1 = displayUtils.getGs(a.ap, a.dp, a.awk);
        const gs2 = displayUtils.getGs(b.ap, b.dp, b.awk);
        return gs2 - gs1;
      });
      users = users.map((obj, index) => {
        return {
          name: obj.username,
          gs: displayUtils.getGs(obj.ap, obj.dp, obj.awk),
          rank: index + 1
        };
      });
      const embed = embedUtils.createGsRanking(users.slice(0, 10));
      return message.channel.send(embed);
    } catch (err) {
      console.log(`ERROR: Command <top10> failed.\n\tMessage: [${message}]\n\tError: [${err}]`);
    }
  }
}