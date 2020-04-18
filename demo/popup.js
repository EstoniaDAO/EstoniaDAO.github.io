const ipfs = window.IpfsHttpClient('ipfs.infura.io', '5001', { protocol: 'https' });


// DRAG AND DROP
// https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
let dropArea = document.getElementById("drop-area")

// Prevent default drag behaviors
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)   
  document.body.addEventListener(eventName, preventDefaults, false)
})

// Highlight drop area when item is dragged over it
;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
})

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false)

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

function highlight(e) {
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('highlight')
}

// https://stackoverflow.com/questions/40031688/javascript-arraybuffer-to-hex
function buf2hex(buffer) { // buffer is an ArrayBuffer
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

$("#macaroon").on("change", handleDrop);



function handleDrop(e) {
  let file;
  if (e.type === "change") {
    file = e.target.files[0]
  } else if (e.type === "drop") {
    file = e.dataTransfer.files[0]; 
  }
  
  if (file) {
    let fileReader = new FileReader();
    fileReader.onload = function(e) {
      // let macaroon = buf2hex(e.target.result);
      // $("#macaroon-textarea").val(macaroon);
      // chrome.storage.sync.set({ macaroon: macaroon }, function() {
      //   console.log("storage updated macaroon", macaroon);
      // });
    
      const magic = buffer.Buffer(fileReader.result); // honestly as a web developer I do not fully appreciate the difference between buffer and arrayBuffer 
      ipfs.add(magic, (err, result) => {
        console.log(err, result);
        url = "https://gateway.ipfs.io/ipfs/" + result[0].hash;
        let ipfsLink = "<a href='https://gateway.ipfs.io/ipfs/" + result[0].hash + "'>gateway.ipfs.io/ipfs/" + result[0].hash + "</a>";
        document.getElementById("link").innerHTML = ipfsLink;
      });
    };
    fileReader.readAsArrayBuffer(file);
  }
}


$("#connect").on("click", async function() {
  ethEnabled();
  accounts = await web3.eth.getAccounts()
  $("#ethaddress").val(accounts[0])

})

$("#sign").on("click", async function() {
  signature = await web3.eth.personal.sign(accounts[0], accounts[0]); // signing the message "0x85" from the account
  $("#signature").val(signature)

})

$("#download").on("click", async function() {
  var data = {
    "address": accounts[0],
    "signature": signature
  }
  saveData(data, "wallet.json");
})

$("#sendgettodev").on("click", async function() {

  $.get("https://polished-silence-366.fly.dev/verify?url=https://gateway.pinata.cloud/ipfs/QmVFST2tbVR6bokaMYXPxJJQXELwLfqWSrRaBgZqwaQT7Y/wallet.asice", function(data) {
    console.log(data);
  });

})


$("#sendwebhook").on("click", sendMessage)



const ethEnabled = () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    return true;
  }
  return false;
}





var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        var json = JSON.stringify(data),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());


function sendMessage() {
  var request = new XMLHttpRequest();
  request.open("POST", "https://discordapp.com/api/webhooks/698210101873606748/MhrGbkU0uSCJLN6ZYz2wabc5_IZIfJXnpEjs69s0HMbKUFDN8atNe6LbwuE91LgUxRk6");

  request.setRequestHeader('Content-type', 'application/json');

  var params = {
    username: "IPFS upload from the website",
    avatar_url: "",
    content: url
  }

  request.send(JSON.stringify(params));
}




// isEnabled = ethEnabled();
// console.log(isEnabled);



  // try {
  //   accounts = ethereum.enable();
  // } catch (error) {
  //   console.log(error);
  // }

  // provider = new ethers.providers.Web3Provider(web3.currentProvider);

  // network = provider.getNetwork();

  // console.log(network);

  // if (network.chainId !== 42) {
  //   gotofail();
  // }

  // let networkLongPolling = setInterval(async function(){
  //   network = await provider.getNetwork()

  //   if (network.chainId !== 42) {
  //     clearInterval(networkLongPolling);
  //     gotofail();
  //   }
  // }, 1000);