import pkg from "showdown";
const {Converter} = pkg
import * as parser from 'node-html-parser'
import * as fs from 'node:fs';
import hljs from 'highlight.js';
import * as path from "node:path";
import {BASEPATH} from '$env/static/private'

// basic html template
const html_template: string = `%article-content%`;

/**
 * Converts markdown content to new html page.
 * @param inPath filepath to markdown file
 * @param outPath filepath for html file
 */
export function convert(inPath: string, outPath: string) {
	
	const index = inPath.lastIndexOf("/");
	const inFilepath: string = inPath.substring(0,index)
	const inFilename: string = inPath.substring(index, inPath.length);
	
	const converter = new Converter()

	const mdFile: string = fs.readFileSync(inFilepath+inFilename, {encoding: 'utf-8'});
	let mdHtml: string = converter.makeHtml(mdFile);

	// Replace variables with dynamic content
	let html: string = html_template;
	//html = html.replace("%article-title%", inFilename)
	html = html.replace("%article-content%", mdHtml)
	
	let dom = parser.parse(html)

	let preElements = dom.querySelectorAll('pre')

	for(let i = 0; i < preElements.length; i++) {
		let pre = preElements[i];	
		let code = parser.parse(pre.innerHTML)
		if(code) {
			if(code.firstChild) {
				code.firstChild.textContent = hljs.highlight(code.firstChild.text, {language: 'java'}).value
				pre.removeChild(pre.firstChild!)
				pre.appendChild(code)
			} else {
				console.error("no text node found on code element");
			}
		}
	}

	fs.writeFileSync(outPath, dom.innerHTML)
	
	// ----------------------------------------------------
	// Read content of markdown file
	// When content is read, maybe add a litte bit of highlighting for code if exists (-> look at highlight.js)
	// Read entire text and find out important text passages or tags for searching the article
	// After highlighting is added, create new html file and add content to article tag in html
}

//folder content to be converted -> relative filepaths to /src
const markdownFilepaths = ["tutorials", "blogs"] as const ;
const srcPath = path.join(BASEPATH, "../..")

// this function is run via npm script.
function startConvert() {

	//Go into src folder, from there look up the paths
	for(let filepath of markdownFilepaths) {

		let absolutePath = path.join(srcPath, filepath)
		
		//Read files in filepath
		let contents = fs.readdirSync(absolutePath)

		for(let mdFileName of contents) {
			let markdownPath = path.join(absolutePath, mdFileName);
			console.log(markdownPath);
			convert(markdownPath, markdownPath.replace(".md",".html"))
		}
	}
}

//startConvert()
//convert("src/testmd.md", "src/html.html")