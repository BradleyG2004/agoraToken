const express = require('express');
const cors = require('cors');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const APP_ID = '28a1911ae25f49c18d7b39bb4a495468';
const APP_CERTIFICATE = '35752dc7763a45aab0fed7209388c1c9';
const PORT = 3001;

const app = express();
app.use(cors());

app.get('/rtc-token', (req, res) => {
  const channelName = req.query.channelName;
  const uid = req.query.uid;
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  if (!channelName) {
    return res.status(400).json({ error: 'channelName is required' });
  }

  const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpiredTs);
  return res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Token server listening on port ${PORT}`);
});
