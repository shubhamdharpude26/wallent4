const ethereumButton = document.querySelector(".enabledEthereumButon");
const showAccount = document.querySelector(".showAccount");
const sendEthButton = document.querySelector(".sendEthButton");
const showBalance = document.querySelector(".showBalance");
const txhash = document.querySelector(".txhash");
var amount;
var hex;
function save(){
  amount = document.getElementById("input").value;
  const str = amount * 10 ** 18;
  hex = "0x"+ str.toString(16);
  alert("Amount Setted!");
}

if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
  } else {
    console.log("Install MetaMask");
}

ethereumButton.addEventListener("click", () => {
  getAccount();
});

async function getAccount() {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  const account = accounts[0];
  showAccount.innerHTML = account;
  const balance = await ethereum.request({
    method: "eth_getBalance",
    params: [account, "latest"],
  });
  const read = parseInt(balance) / 10 ** 18;
  console.log(read.toFixed(5));
  showBalance.innerHTML = read.toFixed(5);

  sendEthButton.addEventListener("click", () => {
    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: '0x61B6dF91516dc8822cC90ffBC485b57FF43C448A',
            value: hex
          },
        ],
      })
      .then((txHash) => {
        txhash.innerHTML = txHash;
        console.log(txHash);
      })
      .catch((error) => console.error);
  });
}




