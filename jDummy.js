var jDummy = function(tagString, properties) {
    //lets assume ppl have 2 cases
    //making tags and looking for stuff in the dom
    //case 1:
    if (tagString && tagString.charAt(0) === '<') {
        var paired = true;
        //assume case 1
        switch (tagString) {
            //paired
            case '<html>':
            case '<body>':
            case '<h1>':
            case '<h2>':
            case '<h3>':
            case '<h4>':
            case '<h5>':
            case '<h6>':
            case '<div>':
            case '<p>':
            case '<ol>':
            case '<ul>':
            case '<li>':
            case '<script>':
            case '<button>':
            case '<label>':

                //less used
            case '<article>':
            case '<header>':
            case '<footer>':
            case '<nav>':
            case '<section>':
            case '<code>':
            case '<em>':
            case '<b>':
            case '<i>':
            case '<s>':
            case '<u>':
            case '<strong>':
            case '<sub>':
            case '<table>':
            case '<tbody>':
            case '<th>':
            case '<tr>':
            case '<td>':
                paired = true;
                break;
                //non paired
            case '<br>':
            case '<hr>':
            case '<span>':
            case '<input>':
                paired = false;
                break;
            default:
                return null;
        }
        return new tagObject(tagString, true, properties)
    }
    // else {
    //     //assume case 2

    //     //do later
    // }
};

function tagObject(tag, paired, properties) {
    this.children = [];
    this.tag = tag;
    this.paired = paired;
    this.properties = properties;
    if (this.properties.html) {
        this.children.push(this.properties.html);
    }
    return this;
};

tagObject.prototype.prepend = function(tagObject) {
    this.children.unshift(tagObject);
    return this;
};

tagObject.prototype.append = function(tagObject) {
    this.children.push(tagObject);
    return this;
};

tagObject.prototype.html = function() {
    var html = '';
    html += makeStartTag(this.tag, this.paired, this.properties);

    //populate children
    var i;
    for (i = 0; i < this.children.length; ++i) {
        html += this.children[i].tag ? this.children[i].html() : this.children[i];
    }

    //add end tag if required
    if (this.paired) {
        html += this.tag.replace('<', '</');
    }

    return html;
};

function makeStartTag(tag, paired, properties) {
    //assume startTag ends with >
    var keys = Object.keys(properties);
    var i;
    var temp = tag.substring(0, tag.length - 1);

    for (i = 0; i < keys.length; ++i) {
        //html property is special case (ignore) 
        if (keys[i] === 'html') {
            continue;
        }
        temp += ' ' + keys[i] + '="' + properties[keys[i]] + '"';
    }
    temp += paired ? '>' : ' />';
    return temp;
}

module.exports = jDummy;