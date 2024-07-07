/**
 * Renders a template with given properties.
 *
 * @param {HTMLTemplateElement|string} template - The HTML template to be rendered.
 * @param {Object} props - An object containing properties to be interpolated into the template.
 * @returns {string} The rendered HTML string with properties interpolated.
 */
function fill(t,n){t=t instanceof HTMLElement?t.innerHTML:String(t);return new Function("html","raw",...Object.keys(n),`return html\`${t}\``)(html,raw,...Object.values(n))}
/**
 * A tag function for template literals that escapes HTML special characters in
 * values unless they are marked as raw.
 *
 * @param {TemplateStringsArray} strings - An array of string literals.
 * @param {...any} values - The values to be interpolated into the template.
 * @returns {string} The final string with values safely interpolated.
 */function html(t,...n){return t.reduce(((t,e,r)=>{const a=n[r]?n[r].raw?n[r]:escape(n[r]):"";return t+e+a}),"")}const t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};
/**
 * Escapes special characters in a string for use in HTML.
 * The characters escaped are: & < > " ' ` = /
 *
 * @param {string} string - The input string to escape.
 * @returns {string} - The escaped string.
 */function escape(n){return String(n).replace(/[&<>"'`=\/]/g,(n=>t[n]))}
/**
 * Marks a string as raw HTML to prevent escaping of special characters.
 *
 * @param {string} html - The HTML string to wrap.
 * @returns {RawString} - The wrapped HTML string as a RawString object.
 */function raw(t){return new RawString(t)}class RawString extends String{raw=true}export{escape,fill,raw};

