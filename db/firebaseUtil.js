const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.firebase_project_id ||
      require('../firebase_auth.json').project_id,
    clientEmail: process.env.firebase_client_email ||
      require('../firebase_auth.json').client_email,
    privateKey: (
      process.env.firebase_private_key ||
      require('../firebase_auth.json').private_key
    ).replace(/\\n/g, '\n')
  }),
  databaseURL: process.env.firebase_db_url || require('../firebase_auth.json').databaseURL
});

const db = admin.database();

const set = async (user, key, value) => {
  try {
    let ref = db.ref(`users/${user.id}`);
    let userExists = await exists(user);
    if (!userExists) {
      ref.set({
        username: user.username,
        ap: 0,
        dp: 0
      });
    }
    ref.update({ [key]: value });
    return value;
  } catch (err) {
    console.log(`Error in set: ${err}`);
    return null;
  }
};

const get = async (user, key) => {
  try {
    let ref = db.ref(`users/${user.id}`);
    let obj = null;
    await ref.once('value', snapshot => {
      obj = snapshot.val();
    }, (err) => {
      console.log(`Error with get: ${user.username} (${user.id}): ${err}`);
    });
    return obj[key];
  } catch (err) {
    console.log(`Firebase error: ${err}`);
    return null;
  }
};

const $delete = async (user, key) => {

}

const exists = async user => {
  try {
    let ref = db.ref(`users/${user.id}`);
    return await ref.once('value').then(snapshot => {
      return snapshot.exists();
    });
  } catch (err) {
    console.log(`Firebase error on exists: ${err}`);
    return false;
  }
}

module.exports = {
  set,
  get,
  $delete,
  exists
}