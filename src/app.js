import {templ} from './template.js';
import {nums} from './template.js';
const html = _.template(templ);
console.log(html({nums: nums}));
