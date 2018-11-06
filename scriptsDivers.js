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