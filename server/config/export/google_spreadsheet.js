var GoogleSpreadsheet=require("google-spreadsheet");

var Spreadsheet= new GoogleSpreadsheet("1YuSfGxRy66MShBhAETfm2RBJJ-YuMRSK0FPOBm_fFmg");


var acctInfo={
  "type": "service_account",
  "project_id": "ashi-147417",
  "private_key_id": "860be3f7620b8113b120236d9302a0a19ab43e64",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC3HbVueTxjCkGR\nQ/MQmT93GsrJq1ST9PFPK5BAZZI3rCwm6ruyQod0J+fGxm9dbcwAjlgqAf5JPkxg\nmES5QPPWDyzkmpM79jlnh+WzhjeVwx3miPmfe8rE77MFHUgvSpRpx1V3/JbyHz8I\najLaO21WfcSLW5e7rh98iO3rhf9YIletOD59Tos3txPBLfsIPjxfAREWmzNi7N+H\nHs1ByLQyiSmy/fxCS+C3zkrMI7nZ211JcgBMZaedu1BdgsaUrPSlrtrH54Qptl7a\nCDRZzOfQZMGumhBDsxhvumVGnvHOnGhpXz7+JUeooIFwb6FBFNsOmY7CPpRU8Zcr\n0MkwQaSNAgMBAAECggEBALGg4v9gIWDdcQ8N//nI/pR16+LHDQtdXrtywcKGBNl2\nbXnu19YqzSSzFRVwJlVWDb84VXOibV31Tbeh3YBq7l1maSD0hQB0b+jrHboQ51ii\nZh3cH3FCb0asUlcSuZQOX3tgvpre7jm+b7Gk+uFRJlXxODgKyFxpoud2GH0Qhcqi\nGCeW0Cta+RFcn+DFLWaVWgNUvY64NyZv/aXBzodF0mAKSA9TwWbKIegsA58Qyu6j\nSw1iJqCQeKSmIUNuBUbg2rFYA9dhkETFagwpmWJmialRZ3EKlanWxkFdZ6mJ+pdS\nJou3GctwEa5T+1qDtaumZWhKQw5pL9yuZPsPVddRT20CgYEA65Q0NqUeuKC+bj2N\nDFM3Q0fnPlKPhN96dEZVdntopQWqVJOf8/M+a2z+xzMtWOW5vcMVRrakbnrla3fS\nYAMdu9vHFVHrWHDktrykeAoxiqJgGTHyR/gd6lLvHqT1wjGnYxCVIsD6kKyVly7l\nlD+VdqtIUO8GPAJTkYgtCcE94UcCgYEAxv1JcE4EMZ9YKKjaT4KMJKNXbkgTTyFm\ndXVKfMvXoWU4QsFr13gA75MqaMlLlEUx/lzmmMVsp3SkaY9iVT3Ly7IwM6uscsM4\nvb6rykaxFKPuwco7njBJcDuqVgW75v/bpew26gioNSQBsd+0zq0y7P0Un6nEPL09\nV6P39DkmlYsCgYEA6JWp90mOyznoyW57k2+VYBfdduqMR+NcQvAt8IxnBIZTZK1b\nfr7pIaa65HDilKI6f9/bYbVxIqKzXyctzR1GffK+243FjcvoA4K73sgxoW4u8rEd\nQ3D0GCVJcDfta40adfQpSea9e5jpGBp1D6i3KDJzc3SJ8zVYzJZl4Puo3IECgYEA\nrakhLWS43kGtI5bxJ5DME7GFvRYj29xPWdTqE+2mGxGGPyQkpJ/zWSH7UgXS8uxM\njCuxh8RMZfwy/HkJHVFYCUZSMNXzIxji7R15OYfmRRgoZ3HCA/UqMkuwBXDtotTK\ncYysBCVX/0CURhLw7apUFmVsWUdEnqmc3l6YJ8i0tq8CgYB8+D6/95iPTAcPLlci\nLGXpU4p1Th3TaptSsTPJQc9Or/yTK+/cJck0gWEXBDzoOi+dLUeSwt2ormw4h8sH\nCmjaVCPxQy/8RFThWrB0ZQ+RWIdgr6ng75hprBS7Ov5H3u4bLyebJSZZAGAUSSrP\nv1CIRlEis0HRCfdUutEwm2dWrg==\n-----END PRIVATE KEY-----\n",
  "client_email": "ashi-147417@appspot.gserviceaccount.com",
  "client_id": "107528736366245268261",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/ashi-147417%40appspot.gserviceaccount.com"
}

function getIndex(type){
	if(type=="player"){
		return 0;
	}else if(type=="coach"){
		return 1;
	}else{
		return 2
	}
}

module.exports=function(type,data,next){
	var i=getIndex(type);

	var fields=require("./fields/"+type).googleSpreadsheet(data);

	Spreadsheet.useServiceAccountAuth(acctInfo,function(){
		Spreadsheet.getInfo(function(err,doc){
			var w=doc.worksheets[i];
			
			w.addRow(fields,function(e){
				
				if(e) return next(e);

				return next(null,doc.worksheets)	
				
			})
		})
	});
		
}
