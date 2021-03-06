var app = angular.module("app", ["ngRoute"]);

const ipfs = window.IpfsHttpClient('ipfs.infura.io', '5001', { protocol: 'https' });

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/hi8olE2lF8OqjyBSdtSm "));
}
contract = new web3.eth.Contract(ABI, address);

var current_marker, auto_rotate;

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'pages/home.html',
      controller: "HomeCtrl"
    })
    .when('/demo', {
      templateUrl: 'pages/demo.html',
      controller: "DemoCtrl"
    })
    .otherwise('/')
});

function closePhoto() {
        
  if ( ! current_marker ) return;
  
  document.getElementById('photo').className = '';
  
  setTimeout( (function(){
    document.getElementById('photo').style.backgroundImage = 'none';
    photo_overlay.visible = false;
    this.opacity = 0.7;
    this.animate( 'scale', 1, { duration: 150 } );
  }).bind(current_marker), 100 );
  
  current_marker = false;
  
}

app.controller("HomeCtrl", function($scope) {

  $scope.results = []

  function retrieveData() {
    contract.methods.getCount(TREASURY).call().then(function(result) { 
      console.log(result) 

      for (let i=0; i<result; i++) {
        contract.methods.voluntaryTaxDeployments(TREASURY , i).call().then(function(result2) {

          window.Box.getProfile(result2.deployer, {}).then(profile => {
            let merged = {...result2, ...profile};
            $scope.results.push(merged);
            console.log($scope.results);

            
// 0: "0x315f80C7cAaCBE7Fb1c14E65A634db89A33A9637"
// 1: "0x315f80C7cAaCBE7Fb1c14E65A634db89A33A9637"
// 2: "0xF4bCd3FEC3e330054603F329FA54CfDa6171e619"
// 3: "mars2"
// 4: "estoniaropsten"
// 5: "10000"
// beneficiary: "0x315f80C7cAaCBE7Fb1c14E65A634db89A33A9637"
// deployed: "0xF4bCd3FEC3e330054603F329FA54CfDa6171e619"
// deployer: "0x315f80C7cAaCBE7Fb1c14E65A634db89A33A9637"
// domain: "estoniaropsten"
// emoji: "🌈"
// image: [{…}]
// name: "Hack the planet"
// ppm: "10000"
// proof_did: "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJpYXQiOjE1ODgyNjk2NDUsImlzcyI6ImRpZDozOmJhZnlyZWliZG9wdDRhaWlkeXZvZXJkMzdndGQ0aXoycm00YnJweTNncGU1c2h3eGVtbHBwdm9tZWJlIn0.Y1mQxrmgI0zwjYY8F5k2NBmUWFTPy3v93TpRAZIQmjGAEBXXcOhwoktWFh414ZHOYCfXQlCr_h1P0SprPvpGVw"
// subdomain: "mars2"

            let calculatedLocation;

            if (merged.lat && merged.lon) {
              calculatedLocation = {
                lat: merged.lat, 
                lng: merged.lon
              }
            } else {
              calculatedLocation = photos.pop().location;
            }

            console.log(calculatedLocation);

            var marker = myearthTHIS.addMarker( {
      
              mesh : "Marker",
              color: (i % 2 == 0) ? '#3a6a39' : '#6a5739',
              location : calculatedLocation,
              scale: 0.01,
              offset: 1.6,
              visible: false,
              transparent: true,
              hotspotRadius : 0.6,
              hotspotHeight : 1.25,						
              
              // custom property
              photo_info: {
                src: 'https://gateway.ipfs.io/ipfs/' + merged.image[0].contentUrl["/"],
                name: merged.name,
                emoji: merged.emoji,
                services: merged.services,
                subdomain: merged.subdomain,
                tax:  merged.ppm / 10000
              }
              
            } );
            
            marker.addEventListener('click', openPhoto);
            
            setTimeout( (function() {
              this.visible = true;
              this.animate( 'scale', 1, { duration: 140 } );
              this.animate( 'offset', 0, { duration: 1100, easing: 'bounce' } );
            }).bind(marker), 300 * i );



          })




        });
      }



    });
  }
  retrieveData();


  $scope.getData = function() {
    // getProfile.addEventListener('click', () => {
    //   console.log(ethAddr.value)
      window.Box.getProfile($scope.address, {}).then(profile => {
        console.log(profile)
        Object.entries(profile).map(kv => {
          getProfileData.innerHTML += kv[0] + ': ' + kv[1] + '<br />'
        })
      })
    // })
  }


  var myearth;
  var sprites = [];

  var photos = [
    { location: { lat: 28.7, lng: 82.6 }, src: 'http://genesis.re/www/images/mars-robertson.jpg' },
    { location: { lat: -2.9, lng: 38.4 }, src: 'http://genesis.re/www/images/mars-robertson.jpg' },
    { location: { lat: 64.0, lng: -19.7 }, src: 'http://genesis.re/www/images/mars-robertson.jpg' },
    { location: { lat: 9.5, lng: 99.9 }, src: 'http://genesis.re/www/images/mars-robertson.jpg' },
    { location: { lat: -38.6, lng: 143.7 }, src: 'http://genesis.re/www/images/mars-robertson.jpg' },
    { location: { lat: 46.7, lng: 9.8 }, src: 'http://genesis.re/www/images/mars-robertson.jpg' },
    { location: { lat: 37.7, lng: -119.5 }, src: 'http://genesis.re/www/images/mars-robertson.jpg' },
    { location: { lat: 19.5, lng: -155.6 }, src: 'http://genesis.re/www/images/mars-robertson.jpg' },
    { location: { lat: 34.6, lng: 135.4 }, src: 'http://genesis.re/www/images/mars-robertson.jpg' },
    { location: { lat: 24.2, lng: -77.8 }, src: 'http://genesis.re/www/images/mars-robertson.jpg' },
    { location: { lat: -13.1, lng: -72.5 }, src: 'http://genesis.re/www/images/mars-robertson.jpg' },
  ];

  myearth = new Earth( document.getElementById('myearth'), {
    location: { lat: 30, lng: 60 },
    light: 'none',
    texture: 'hologram/hologram-map.svg',
    transparent: true,   
    autoRotate : true,
    autoRotateSpeed: 1.2,
    autoRotateDelay: 100,
    autoRotateStart: 2000,			
  } );
  
  window.myearthTHIS = null;

  myearth.addEventListener( "ready", function() {
    myearthTHIS = this;

    this.startAutoRotate();
    
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


    // add photo overlay
        
    photo_overlay = this.addOverlay( {
      content: `<div id="photo" style="font-size: 1.3em">
                  <img id="img-src">
                  <div id="close-photo" onclick="closePhoto(); event.stopPropagation();"></div>
                  <p>
                    <span id="photo-name"></span>
                    <span id="photo-domain"></span>
                    <span id="photo-services"></span>
                    <span id="photo-tax"></span>
                  </p>
                </div>`,
      visible: false,
      elementScale: 1,
      depthScale: 0.5
    } );	

    /*
    // add photo pins
    for ( var i=0; i < photos.length; i++ ) {

      var marker = this.addMarker( {
      
        mesh : "Marker",
        color: (i % 2 == 0) ? '#3a6a39' : '#6a5739',
        location : photos[i].location,
        scale: 0.01,
        offset: 1.6,
        visible: false,
        transparent: true,
        hotspotRadius : 0.6,
        hotspotHeight : 1.25,						
        
        // custom property
        photo_info: photos[i]
        
      } );
      
      marker.addEventListener('click', openPhoto);
      
      setTimeout( (function() {
        this.visible = true;
        this.animate( 'scale', 1, { duration: 140 } );
        this.animate( 'offset', 0, { duration: 1100, easing: 'bounce' } );
      }).bind(marker), 300 * i );
      
    }
    */
    
    
  } );
  
  myearth.addEventListener( "change", function() {

    if ( ! current_marker || auto_rotate ) return;

    if ( Earth.getAngle( myearth.location, current_marker.location ) > 45 ) {
      closePhoto();
    }
    
  } );         

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
  
  function openPhoto() {
  
    // close current photo
    if ( current_marker ) {
      
      closePhoto();
      window.setTimeout( openPhoto.bind(this), 120 );
      
      return;
    }
    
    // rotate earth if needed
    if ( myearth.goTo( this.location, { relativeDuration: 100, approachAngle: 12, end: function(){auto_rotate=false;} } ) ) {
      auto_rotate = true;
    }
    
    
    // document.getElementById('photo').style.backgroundImage = "url("+ this.photo_info.src +")";
    document.getElementById('img-src').src = this.photo_info.src;
    $('#photo-name').html("<h3 style='font-weight:bold; font-size: 1.2em'>" + this.photo_info.emoji + this.photo_info.name + "</h3>");
    $('#photo-domain').html("<code>" + this.photo_info.subdomain + ".estoniaropsten.eth</code><br>");
    $('#photo-services').html("<strong>Services:</strong> " + this.photo_info.services + "<br>");
    $('#photo-tax').html("<strong>Voluntary tax:</strong> " + this.photo_info.tax.toFixed(2) + "%");
    
    photo_overlay.location = this.location;
    photo_overlay.visible = true;
    
    setTimeout( function(){
      document.getElementById('photo').className = 'photo-appear';
    }, 120);
    
    this.animate( 'scale', 0.001, { duration: 150 } );
    current_marker = this;
    
  }
      
})

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

  $scope.deploy = function() {
    if (!$scope.subdomain) {
      alert("Please ensure you selected a subdomain.")
      return;
    }   
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

  $scope.domain = "estoniaropsten";

  $scope.deploy = async function() {
    await $scope.connect();

    deployed = contract.methods.deployNew($scope.taxrate * 10000, $scope.address, TREASURY, $scope.domain, $scope.subdomain)
                       .send({from: accounts[0]}, function(response) {
                          if (response.message) {
                            $scope.message = response.message;
                            $scope.$apply();
                          }

                       })
  }

  $scope.auth3box = async function() {
    $("#authenticating").show();
    await $scope.connect();

    const provider = await Box.get3idConnectProvider() // recommended provider
    $scope.box = await Box.openBox($scope.address, provider)
    $scope.boxData = await $scope.box.public.all()

    $("#authenticating").hide();
    console.log($scope.boxData);

    $scope.authenticated = true;
    $scope.$apply();
  }

  $scope.save3box = async function() {
    $("#saving").show();

    await $scope.box.public.setMultiple(
      ['name', 'services', 'lat', 'lon'],
      [ $scope.boxData.name, $scope.boxData.services, $scope.boxData.lat, $scope.boxData.lon]
    )

    $("#saving").hide();
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

async function ethEnabled() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    let result = await window.ethereum.enable();
    return result;
  }

  alert("Please ensure that you have MetaMask installed, we suggest Chrome or Brave");
  return false;
}