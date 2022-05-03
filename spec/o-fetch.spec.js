var expect = require("expect")
var oFetch = require("../o-fetch.js")

describe("oFetch basics", function(){
    it("Can fetch one or more direct child properties from an object", function(){
        var exampleObject = {
            hello: "world",
            hi: "earth"
        };

        expect(oFetch(exampleObject, "hello")).toEqual("world");
        expect(oFetch(exampleObject, "hello", "hi")).toEqual(["world", "earth"]);
        expect(oFetch(exampleObject, "hi", "hello")).toEqual(["earth", "world"]);
    });

    it("Throws an exception if the requested property doesn't exist", function(){
        var exampleObject = {};
        expect(() => oFetch(exampleObject, "test")).toThrow("Property 'test' is undefined");
    });
});

describe("oFetch nested access support", function(){
    it("Can fetch a nested property value", function(){
        var deepObject = {
            parent: {
                child: {
                    grandchild: "cookie"
                }
            }
        }
        expect(oFetch(deepObject, "parent.child.grandchild")).toBe("cookie");
    });

    it("Throws an exception when a deeply nested value is undefined", function(){
        var object = {
            test: {}
        };
        expect(oFetch(object, "test")).toEqual({});
        expect(() => oFetch(object, "test.a")).toThrow("Property 'test.a' is undefined");
        expect(() => oFetch(object, "test.a.b")).toThrow("Property 'test.a' is undefined (fetching 'test.a.b')");
    });
})

describe("oFetch can handle numeric lookups", function(){
    it("Can look up values using a number as the key", function(){
        var obj = {"0": "test"};
        expect(oFetch(obj, 0)).toBe("test");
    });

    it("It says what key can't be found if the numeric object lookup fails", function(){
        var obj = {};
        expect(() => oFetch(obj, 0)).toThrow("Property '0' is undefined");
    })
})

describe("oFetch throws an error if either the object or the key is undefined", function(){
    it("Throws an error if the object is undefined", function(){
        expect(() => oFetch(undefined ,"sth")).toThrow("Object argument passed into oFetch is undefined");
    });
    it("Throws an error if the key is undefined", function(){
        expect(() => oFetch({} ,undefined)).toThrow("Key argument passed into oFetch is undefined");
    });
})