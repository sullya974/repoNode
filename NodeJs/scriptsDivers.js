var fs = require('fs');
var cache = {};

//Le défaut de la function ci-dessous est qu'il est dans un cas synchrone et dans un autre asynchrone
function inconsistentRead(filename, callback) {
    if (cache[filename]) {
        //invoked synchronously
        callback(cache[filename]);
    } else {
        //asynchronous function
        fs.readFile(filename, 'utf8', function (err, data) {
            cache[filename] = data;
            callback(data);
        });
    }
}

//SOLUTION 1 : Rendre synchrone dans tous les cas
function consistentReadSync(filename) {
    if (cache[filename]) {
        return cache[filename];
    } else {
        cache[filename] = fs.readFileSync(filename, 'utf8');
        return cache[filename];
    }
}

function createFileReader(filename) {
    var listeners = [];
    inconsistentRead(filename, function (value) {
        listeners.forEach(function (listener) {
            listener(value);
        });
    });
    return {
        onDataReady: function (listener) {
            listeners.push(listener);
        }
    };
}

var reader1 = createFileReader("toto.txt");

reader1.onDataReady(function (data) {
    console.log("First call data : " + data);

    var reader2 = createFileReader("toto1.txt");
    reader2.onDataReady(function (data) {
        console.log("Second call data : " + data);
    });
});