if (!String.prototype.supplant) {
	String.prototype.supplant = function (o) {
		return this.replace(/\{([^{}]*)\}/g,
			function (a, b) {
				var r = o[b];
				return typeof r === 'string' || typeof r === 'number' ? r : a;
			});
	};
}

String.prototype.replaceAll = function (find, replace) {
	var str = this;
	return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};
Array.prototype.pushUnique = function (item) {
	if (this.indexOf(item) == -1) {
		//if(jQuery.inArray(item, this) == -1) {
		this.push(item);
		return true;
	}
	return false;
}

const fs = require('fs')
const path = require('path')

const regImport = /import ['"]?([^'"]*)/g

function getImports(c) {
	let imports
	let ret = []
	do {
		imports = regImport.exec(c)
		if (imports) {
			ret.push(imports[1])
		}
	} while (imports)
	return ret
}
let ret = []

function load_sol(fpath) {
	let content = fs.readFileSync(fpath, 'utf8')
	console.log('load ' + fpath)
	const imports = getImports(content)
	const parentPath = path.parse(fpath).dir
	if (imports.length > 0) {
		imports.forEach((f) => {
			if (f.indexOf('./') >= 0)
				(load_sol(parentPath + '/' + f))
			else
				(load_sol('./node_modules/' + f))
		})
	}
	ret.pushUnique(path.normalize(fpath))
	// ret.push(path.resolve(fpath))
}

load_sol('./contracts/SampleToken.sol')
console.log('-->', ret)
for (let i = 0; i < ret.length; i++) {
	let f = ret[i]
	let rd = fs.readFileSync(f, 'utf8')
	if (i > 0) {
		rd = rd.replaceAll('pragma', '//pragma')
		rd = rd.replaceAll('import', '//import')
		fs.appendFileSync('out.sol', rd, 'utf8')
	} else {
		fs.writeFileSync('out.sol', rd, 'utf8')
	}
}
console.log('done')
