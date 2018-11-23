//A simple callback example
var text = "Domo Ariato !";
report("Before defining functions");

function useless(ninjaCallBack){
    report("In useless function");
    return ninjaCallBack();
}

function getText(){
    report("In getText function");
    return text;
}

report("Before making all the calls");

assert(useless(getText) === text,
    "The useless function works! " + text);

    report("After the calls have been made");