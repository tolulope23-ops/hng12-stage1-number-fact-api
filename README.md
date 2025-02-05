PROJECT DESCRIPTION
  The numberApi provides interesting mathematical properties (isPrime, isPerfect, isDigitSum and funfact using the number API) about a given number. Its returns a data in json format, CORS enabled for public access.

API ENDPOINT
	get /api/classify-number?num=371

RESPONSES
  {
  "number": 371,
  "isPrime":false,
  "isPerfect":false,
  "properties":["armstrong", "odd"],
  "digit_sum":11
  "fun_fact":"371 is an Armsrong number because 3^3 + 7^3 + 1^3"
  }

INSTALLATION & SETUP
  git clone https://github.com/tolulope23-ops/numberApi.git

Install dependencies: npm install
Start the Server: npm start

DEPLOYMENT
  https://numberapi-97s8.onrender.com/api/classify-number?num=371

	