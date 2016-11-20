module.exports = {
	notEqual: (a,b,options)=>{
	  if(Array.isArray(b) && b.indexOf(a)==-1 || !Array.isArray(b) && a !== b) {
	    return options.fn(this);
	  }
	  return options.inverse(this);
	},

	isEqual: (a,b,options) => {
	  if(a == b) {
	    return options.fn(this);
	  }
	  return options.inverse(this);	
	}
}