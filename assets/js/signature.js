var app = angular.module("app", ["ngRoute"]);

const ipfs = window.IpfsHttpClient('ipfs.infura.io', '5001', { protocol: 'https' });

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'pages/home.html',
      controller: function($scope) {
        var myearth;
        var sprites = [];

        // window.addEventListener( 'load', function() {

          myearth = new Earth( document.getElementById('myearth'), {
          
            light: 'none',
            
            texture: 'hologram/hologram-map.svg',
            transparent: true,
            
            location: { lat: 0, lng : 0 },
            
            autoRotate : true,
            autoRotateSpeed: 1.2,
            autoRotateDelay: 100,
            autoRotateStart: 2000,			
            
          } );
          
          
          myearth.addEventListener( "ready", function() {
        
            this.startAutoRotate();
            
            // connections
            
            var line = {
              color : 'white',
              opacity: 0.2,
              hairline: true,
              offset: -0.5
            };
            
            // for ( var i in connections ) {			
            // 	line.locations = [ { lat: connections[i][0], lng: connections[i][1] }, { lat: connections[i][2], lng: connections[i][3] } ];
            // 	this.addLine( line );
            // }
            
            
            
            // add 5 shine sprites
            
            for ( var i=0; i < 5; i++ ) {
              sprites[i] = this.addSprite( {
                image: 'hologram/hologram-shine.svg',
                scale: 0.01,
                offset: -0.5
              } );
              pulse( i );
              //setTimeout( function() { pulse( 1 ); }, 300 );
            }
            
            
          } );
          
          
        // } );
        
        
        function getRandomInt(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min)) + min;
        }
        
        
        function pulse( index ) {
          var random_location = connections[ getRandomInt(0, connections.length-1) ];
          sprites[index].location = { lat: random_location[0] , lng: random_location[1] };
          
          sprites[index].animate( 'scale', 0.6, { easing: 'out-quad', duration: 300, complete : function(){
            this.animate( 'scale', 0.01, { easing: 'in-quad', duration: 300, complete : function(){
              setTimeout( function(){ pulse( index ); }, getRandomInt(100, 400) );
            } });
          } });
        }
        
        
        var connections = [
          [59.651901245117,17.918600082397,	41.8002778,12.2388889],
          [59.651901245117,17.918600082397,	51.4706,-0.461941],
          
          [13.681099891662598,100.74700164794922,	-6.1255698204,106.65599823],
          [13.681099891662598,100.74700164794922,	28.566499710083008,77.10310363769531],
          
          [30.12190055847168,31.40559959411621, -1.31923997402,36.9277992249],
          [30.12190055847168,31.40559959411621, 25.2527999878,55.3643989563],
          [30.12190055847168,31.40559959411621, 41.8002778,12.2388889],
        
          [28.566499710083008,77.10310363769531,	7.180759906768799,79.88410186767578],
          [28.566499710083008,77.10310363769531,	40.080101013183594,116.58499908447266],
          [28.566499710083008,77.10310363769531,	25.2527999878,55.3643989563],
        
          [-33.9648017883,18.6016998291, -1.31923997402,36.9277992249],
          
          [-1.31923997402,36.9277992249, 25.2527999878,55.3643989563],
          
          [41.8002778,12.2388889, 51.4706,-0.461941],
          [41.8002778,12.2388889, 40.471926,-3.56264],
        
          [19.4363,-99.072098,	25.79319953918457,-80.29060363769531],
          [19.4363,-99.072098,	33.94250107,-118.4079971],
          [19.4363,-99.072098,	-12.0219,-77.114304],
          
          [-12.0219,-77.114304,	-33.393001556396484,-70.78579711914062],
          [-12.0219,-77.114304, -34.8222,-58.5358],
          [-12.0219,-77.114304, -22.910499572799996,-43.1631011963],
          
          [-34.8222,-58.5358, -33.393001556396484,-70.78579711914062],
          [-34.8222,-58.5358, -22.910499572799996,-43.1631011963],
          
          [22.3089008331,113.915000916, 13.681099891662598,100.74700164794922],
          [22.3089008331,113.915000916, 40.080101013183594,116.58499908447266],
          [22.3089008331,113.915000916, 31.143400192260742,121.80500030517578],
          
          [35.552299,139.779999, 40.080101013183594,116.58499908447266],
          [35.552299,139.779999, 31.143400192260742,121.80500030517578],
          
          [33.94250107,-118.4079971,	40.63980103,-73.77890015],
          [33.94250107,-118.4079971,	25.79319953918457,-80.29060363769531],
          [33.94250107,-118.4079971,	49.193901062,-123.183998108],
          
          [40.63980103,-73.77890015, 25.79319953918457,-80.29060363769531],
          [40.63980103,-73.77890015, 51.4706,-0.461941],
          
          [51.4706,-0.461941, 40.471926,-3.56264],
          
          [40.080101013183594,116.58499908447266,	31.143400192260742,121.80500030517578],
          
          [-33.94609832763672,151.177001953125,	-41.3272018433,174.804992676],
          [-33.94609832763672,151.177001953125,	-6.1255698204,106.65599823],
          
          [55.5914993286,37.2615013123, 59.651901245117,17.918600082397],
          [55.5914993286,37.2615013123, 41.8002778,12.2388889],
          [55.5914993286,37.2615013123, 40.080101013183594,116.58499908447266],
          [55.5914993286,37.2615013123, 25.2527999878,55.3643989563],
        ];
        



      }
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

  $scope.uploadFile = function(event) {
    $scope.ipfsuploading = true;
    $scope.$apply();

    var file = event.target.files[0]

    let fileReader = new FileReader();
    fileReader.onload = function(e) {
      const magic = buffer.Buffer(fileReader.result); // honestly as a web developer I do not fully appreciate the difference between buffer and arrayBuffer 
      ipfs.add(magic, (err, result) => {

        $scope.ipfsuploading = false;
        $scope.checkingsignanture = true;

        console.log(err, result);
        $scope.url = "https://gateway.ipfs.io/ipfs/" + result[0].hash;
        $scope.$apply();

        console.log($scope.url);

        makeRequest($scope.url).then(function(result) {
          $scope.checkingsignanture = false;
          $scope.signatureData = result.data.replace("<html><body><pre><code>","").replace("</code></pre></body></html>","");

          if (result.valid) {
            console.log("SIGNATURE VALID");
            $scope.signatureValid = true;
            sendMessage($scope.url); // SENDING WEBHOOK TO DISCORD
          } else {
            $scope.signatureValid = false;
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
        let signatureValid = responseData.indexOf("Signature method") !== -1 && responseData.indexOf("Signing time") !== -1 && responseData.indexOf("Signing cert") !== -1 && responseData.indexOf("Signed by") !== -1;

        defer.resolve({
          valid : signatureValid,
          data: responseData
        });

      }, function errorCallback(response) {
        alert(response.data);
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


  function sendMessage(url) {
    var request = new XMLHttpRequest();
    request.open("POST", "https://discordapp.com/api/webhooks/701899272559263765/EkB77Z-LNW9DWm2VMcgd-J6iFO11DBfYhn-gX7X5y40Dlqo1YwKR8vnqMmAejyR3_r2F");
  
    request.setRequestHeader('Content-type', 'application/json');
  
    var params = {
      username: "IPFS upload from the website",
      avatar_url: "",
      content: url
    }
  
    request.send(JSON.stringify(params));
  }

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