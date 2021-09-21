window.onload = function() {
    if (!window.tronWeb) {
      const HttpProvider = TronWeb.providers.HttpProvider;
      const fullNode = new HttpProvider('https://api.trongrid.io');
      const solidityNode = new HttpProvider('https://api.trongrid.io');
      const eventServer = 'https://api.trongrid.io/';
      
      const tronWeb = new TronWeb(
          fullNode,
          solidityNode,
          eventServer,
      );
  
      window.tronWeb = tronWeb;
    }
  };


if (typeof window.tronLink !== "undefined") {
  console.log("Tron is installed!");
} else {
  console.log("Install TronLink");
}

const tronButton = document.querySelector(".enabledTronButon");
const showAccount = document.querySelector(".showAccount");
const sendTronButton = document.querySelector(".sendTronButton");
const showBalance = document.querySelector(".showBalance");
const txhash = document.querySelector(".txhash");
var account;

tronButton.addEventListener("click", () => {
  getAccount();
});

async function getAccount() {
  await tronLink.request({ method: "tron_requestAccounts" });
  account = window.tronLink.tronWeb.defaultAddress.base58;
  showAccount.innerHTML = account;
  const balance = (await tronWeb.trx.getBalance(account)) / 10 ** 6;
  showBalance.innerHTML = balance;
}

var toAddress = "TDxYTPMtL2SRiTQcDMHBR9k97ooP4MtzHc";
var fromAddress = account;
var privateKey = "10ce5d3142378f86ea3cd7ec5ad72f7c51f1871ac524eb43c1f4a5d28f53a8e1";
var amount = 10000000; //amount

// sendTronButton.addEventListener("click", () => {
//   getTxn();
// });
sendTronButton.addEventListener("click", () => {
  sendTrx(toAddress, fromAddress, amount, privateKey);
});

async function sendTrx(toAddress, fromAddress, amount, privateKey) {
  //Creates an unsigned TRX transfer transaction
  tradeobj = await tronWeb.transactionBuilder.sendTrx(
    toAddress,
    amount,
    fromAddress
  );

  const signedtxn = await tronWeb.trx.sign(tradeobj, privateKey);
  const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
  console.log("- Output:", receipt, "\n");
}

// reference Link: https://developers.tron.network/docs/tron-web-intro
