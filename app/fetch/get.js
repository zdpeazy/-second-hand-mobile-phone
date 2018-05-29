import 'whatwg-fetch'
import 'es6-promise'
import { selfJsonp } from '../util'
import * as configInfo from '../configInfo';


// 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
const obj1params = (obj)=> {
    let result = ''
    for (let item in obj) {
        result += '&' + item + '=' + encodeURIComponent(obj[item])
    }

    if (result) {
        result = result.slice(1)
    }

    return result
}

export function get(url, paramsObj) {
	let getParams = obj1params(paramsObj);
	let headers = new Headers({
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'text/plain; application/json; charset=utf8'
	})
  let result = fetch(url + '?' + getParams, {
		headers
  })

  return result
}

export function getByJsonp(url, cb='cb') {
	// alert(url)
	return new Promise((resolve, reject)=>{
		selfJsonp(url, (data)=>{
			resolve(data)
		}, cb)
	})
}