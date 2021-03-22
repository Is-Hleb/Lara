const block = document.getElementById("editBlock");
const article = document.getElementById("article");

let articleHTMLContent = "";
let cur_el = 0;
let cur_page = [];
let out_page = [];
let article_data = {};
let make_edit_url = "";

function add_to_article_button() {
    return `<button class="btn btn-success mt-2" type="button" id="addButton">Добавить</button>`;
}

function textarea(content = "") {
    return `<textarea class="form-control" id="textarea" rows="10">${content}</textarea>`;
}

function delete_button(id) {
    return `<button class="btn btn-warning mt-0" type="button" onclick="delete_el(${id})">Удалить</button>`;
}

function edit_button(id) {
    return `<button class="btn btn-primary mt-0" type="button" onclick="edit_el(${id})">Редактировать</button>`;

}

function save_button() {
    return `<button class="btn btn-success mt-0" type="button" id="save_el">Сохранить</button>`;
}

function text_input(placeholder) {
    return `<input type="text" class="form-control" id="text_input" placeholder="${placeholder}">`;
}


function stringToHtml(str) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, "text/html");
    return doc.body.firstChild;
}


function getElValue(id) {
    if(document.getElementById(id.toString()))
        return document.getElementById(id.toString()).value ?? document.getElementById(id.toString()).textContent;
    return "";
}

function show(text) {
    block.classList.remove("d-none")
    block.innerHTML += text;
}

function render() {
    article.innerHTML = "";
    articleHTMLContent = "";
    for (let i = 0; i < cur_page.length; i++) {
        if(!out_page[i])
            continue;
        article.innerHTML += cur_page[i];
        articleHTMLContent += out_page[i];
    }
}

function clean() {
    block.innerHTML = "";
    block.classList.add("d-none");
}

function add_one_tag_to_article(tag, props) {
    out_page[cur_el] = `<${tag} ${props} id="${cur_el}"/>`;
    cur_page[cur_el] = `<${tag} ${props} id="${cur_el}"/>` + delete_button(cur_el);
    article.innerHTML += cur_page[cur_el];
    cur_el++;
    clean();
    saveChanges();
}

function add_to_article(input_id, tag, props) {
    let addButton = document.getElementById("addButton");
    addButton.addEventListener("click", function (e) {
        let text = getElValue(input_id);
        out_page[cur_el] = `<${tag} ${props} id="${cur_el}">${text}</${tag}>`;
        cur_page[cur_el] = `<${tag} ${props} id="${cur_el}">${text}</${tag}>` + delete_button(cur_el) + edit_button(cur_el);
        article.innerHTML += cur_page[cur_el];
        cur_el++;
        console.log(out_page);
        clean();
        saveChanges();
    });
}

window.delete_el = function (id) {
    cur_page[id] = "";
    out_page[id] = "";
    render();
    saveChanges();
}

window.edit_el = function (id) {
    clean();
    show(textarea(getElValue(id)));
    show(save_button());
    let saveButton = document.getElementById("save_el");
    saveButton.addEventListener("click", function () {
        let content = getElValue("textarea");
        let new_el = stringToHtml(out_page[id]);

        new_el.textContent = content;
        out_page[id] = new_el.outerHTML;
        cur_page[id] = new_el.outerHTML + delete_button(id) + edit_button(id);
        saveChanges();
        render();
        clean();
    });
}

function addTag(tag, props) {
    clean();
    add_to_article("textarea", tag, props);
    saveChanges();
}



function addTextareaTag(tag, props = "") {
    clean();
    show(textarea());
    show(add_to_article_button());
    add_to_article("textarea", tag, props);
}

function addTextInputTag(tag, props = "") {
    clean();
    show(text_input("Заголовок"));
    show(add_to_article_button());
    add_to_article("text_input", tag, props);
}

function preferData() {

    article_data.content = "";
    article_data.prodution = false;
    article_data._token = document.getElementsByName("_token")[0].value;
    article_data.content = JSON.stringify(out_page);
}

function saveChanges()
{
    preferData();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': article_data._token,
        }
    });
    $.ajax({
        type: "POST",
        url: make_edit_url,
        data: article_data,
        dataType: 'json',
        success: function(data) {
            console.log(data);
        },
        error: (data) => {
            // console.log(data);
        }
    })
}


window.onload = function(){
    console.log(1);
    let data = document.querySelector('meta[name="article_content"]').content;
    make_edit_url = document.querySelector('meta[name="make_edit_url"]').content;
    article_data.id = document.querySelector('meta[name="article_id"]').content;
    if(data !== "")
    {
        out_page = JSON.parse(data);
        console.log(data);
        cur_el = out_page.length + 1;
        cur_page = [];
        for(let i = 0; i < out_page.length; i++)
        {
            let cur = out_page[i];
            if(cur)
            {
                cur_page[i] = cur + delete_button(i) + edit_button(i);
            }
        }
        render();
    }

}

window.save_article = function() {
    saveChanges();
}

window.addTitle = (tag) => {
    addTextInputTag(tag, `class="text-center border-bottom"`)
};
window.addParagraph = () => {
    addTextareaTag('p')
};
window.addHr = () => {
    add_one_tag_to_article('hr', "")
};
























