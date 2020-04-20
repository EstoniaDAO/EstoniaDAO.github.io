var app = angular.module("app", ["ngRoute"]);

const ipfs = window.IpfsHttpClient('ipfs.infura.io', '5001', { protocol: 'https' });

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'pages/home.html'
    })
    .when('/demo', {
      templateUrl: 'pages/demo.html',
      controller: "DemoCtrl"
    })
    .otherwise('/')
});

app.controller("DemoCtrl", function($scope, $http, $q) {

  $scope.connect = async function() {
    let address = await ethEnabled();
    accounts = await web3.eth.getAccounts()
    $scope.address = address[0] || accounts[0]
    $scope.$apply();
  }

  $scope.sign = async function() {
    signature = await web3.eth.personal.sign($scope.address, $scope.address);
    $scope.signature = signature;
    $scope.$apply();
  }

  $scope.download = function() {
    if (!$scope.address || !$scope.signature) {
      alert("Please ensure both address and signature are present.")
      return;
    }
    var data = {
      "address": $scope.address,
      "signature": $scope.signature
    }
    saveData(data, "wallet.json");
  }

  $scope.uploadFile = function(event){
    var file = event.target.files[0]

    let fileReader = new FileReader();
    fileReader.onload = function(e) {

      const magic = buffer.Buffer(fileReader.result); // honestly as a web developer I do not fully appreciate the difference between buffer and arrayBuffer 
      ipfs.add(magic, (err, result) => {
        console.log(err, result);
        $scope.url = "https://gateway.ipfs.io/ipfs/" + result[0].hash;
        $scope.$apply();

        console.log($scope.url);

        makeRequest($scope.url).then(function(result) {
          if (result) {
            console.log("SIGNATURE VALID");
          }
        })

      });
    };
    fileReader.readAsArrayBuffer(file);

  };

  $scope.focus = function(selector) {
    $(selector).focus(); // Maybe not Angular way but much simpler: https://stackoverflow.com/questions/14833326/how-to-set-focus-on-input-field
  }


  function makeRequest(url) {
    let defer = $q.defer();

    // Full good file: https://polished-silence-366.fly.dev/verify?url=https://gateway.pinata.cloud/ipfs/QmVFST2tbVR6bokaMYXPxJJQXELwLfqWSrRaBgZqwaQT7Y/wallet.asicev
    let baseURL = "https://polished-silence-366.fly.dev/verify?url=";

    $http({
      method: 'GET',
      url: baseURL + url
    }).then(function successCallback(response) {
        let responseData = response.data;
        let signatureValid = responseData.indexOf("Signature method" !== -1) && responseData.indexOf("Signing time" !== -1) && responseData.indexOf("Signing cert" !== -1) && responseData.indexOf("Signed by" !== -1)

        defer.resolve(signatureValid);

      }, function errorCallback(response) {
        console.error(response.data);
        defer.reject(response.data)

      });

      return defer.promise;
  }

  async function ethEnabled() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      let result = await window.ethereum.enable();
      return result;
    }

    alert("Please ensure that you have MetaMask installed, we suggest Chrome or Brave");
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

});

// https://stackoverflow.com/a/19647381/775359
app.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.on('change', onChangeHandler);
      element.on('$destroy', function() {
        element.off();
      });

    }
  };
});









$("#sendgettodev").on("click", async function() {

  $.get("https://polished-silence-366.fly.dev/verify?url=https://gateway.pinata.cloud/ipfs/QmVFST2tbVR6bokaMYXPxJJQXELwLfqWSrRaBgZqwaQT7Y/wallet.asice", function(data) {
    console.log(data);
  });

})


$("#sendwebhook").on("click", sendMessage)

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