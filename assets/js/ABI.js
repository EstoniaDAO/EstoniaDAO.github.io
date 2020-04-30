window.address = "0x93e08dae8c1ede9c085f404d7162fd19ef7fe513";

window.ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "EnsSubdomainFactoryAddress",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "EnsSubdomainFactory",
		"outputs": [
			{
				"internalType": "contract IEnsSubdomainFactory",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ppm",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "beneficiary",
				"type": "address"
			},
			{
				"internalType": "address payable",
				"name": "DAOPoolUBI",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "domain",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "subdomain",
				"type": "string"
			}
		],
		"name": "deployNew",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "treasury",
				"type": "address"
			}
		],
		"name": "getCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "voluntaryTaxDeployments",
		"outputs": [
			{
				"internalType": "address",
				"name": "deployer",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "beneficiary",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "deployed",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "subdomain",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "domain",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "ppm",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];