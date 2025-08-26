import { systemFolder } from "../../../constants.mjs";

export const preloadHandlebarsTemplates = async function() {
    return loadTemplates([
        /**
         * Actor partials.
         */

        // Partials go here.

        /**
         * Item Handlebar Partials.
         */

        // Partials go here.

        /**
         * Roll partials.
         */
        
        // Partials go here.
    ]);
};

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

// Converts the first letter of a string to uppercase.
Handlebars.registerHelper('toFirstUppercase', function (str) {    
    return str.charAt(0).toUpperCase() + str.slice(1);
});

// Capitalizes the first letter in each word in a string. 
// The del variable is the delimiter for finding words and is
// replaced with joinChar before the string is returned.
// Ex: "weapon_skill" "_" " " would produce "Weapon Skill".
Handlebars.registerHelper('toTitlecase', function (str, del, joinChar, options) {
    joinChar = typeof(joinChar) === "object" ? " " : joinChar;

    const S = str.split(del);

    for(let i=0; i < S.length; i++)
        S[i] = S[i].charAt(0).toUpperCase() + S[i].slice(1);

    return S.join(joinChar);
});

// Grab the URL for a partial page, where "page" is the name of a page,
// "type" is actor or item, and "sub" is the type's subtype (e.g. weapon).
Handlebars.registerHelper('GetPartialURL', function (page, type, sub) {    
    return `systems/${systemFolder}/src/sheets/templates/${type}s/${type}-bodies/${sub}s/attributes-${page.replace("_", "-")}.hbs`;
});

// Compare one string to another string for equality. Hacky.
Handlebars.registerHelper('ifequal', function (a, b, options) {
    return (a === b ? options.fn(this) : options.inverse(this));
});

// Compare one string to another string for inequality. Hacky.
Handlebars.registerHelper('ifnequal', function(a, b, options) {
    return (a !== b ? options.fn(this) : options.inverse(this));
});

// Adds all arithmetic comparisons and logical operators as helpers.
Handlebars.registerHelper({
    // Logic
    eq: (v1, v2) => v1 === v2,
    ne: (v1, v2) => v1 !== v2,
    lt: (v1, v2) => v1 < v2,
    gt: (v1, v2) => v1 > v2,
    lte: (v1, v2) => v1 <= v2,
    gte: (v1, v2) => v1 >= v2,
    and: (v1, v2) => v1 && v2,
    or: (v1, v2) => v1 || v2,
    
    // Arithmetic
    add: (v1, v2) => v1 + v2,
    sub: (v1, v2) => v1 - v2,
    mul: (v1, v2) => v1 * v2,
    div: (v1, v2) => v1 / v2,
});

// Get the number of elements in an object.
Handlebars.registerHelper('ElementCount', function(object) {
    if(object == null) return -1;

    return Object.keys(object).length;
});

// Add a plus sign to a given value or higher.
Handlebars.registerHelper('PlusAdded', function(value, start) {
    return `${value >= start ? "+" : ""}${value}`;
});