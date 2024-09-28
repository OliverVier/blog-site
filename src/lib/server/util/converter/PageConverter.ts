import { Converter} from "showdown";
import * as parser from 'node-html-parser'
import * as fs from 'node:fs';
import hljs from 'highlight.js';
import * as path from "node:path";

// basic html template
const html_template: string = `<article>%article-content%</article>`;

/**
 * Converts markdown content to new html page.
 * @param inPath filepath to markdown file
 * @param outPath filepath for html file
 */
function convert(inPath: string, outPath: string): WebPage {
	
	const index = inPath.lastIndexOf("/");
	const inFilepath: string = inPath.substring(0,index)
	const inFilename: string = inPath.substring(index, inPath.length);
	
	const converter = new Converter()

	const mdFile: string = fs.readFileSync(inFilepath+inFilename, {encoding: 'utf-8'});
	let mdHtml: string = converter.makeHtml(mdFile);

	// Replace variables with dynamic content
	let html: string = html_template;
	html = html.replace("%article-title%", inFilename)
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
	
	return new WebPage("title", "name", dom.innerHTML, null);
}

//folder content to be converted -> relative filepaths to /src
const markdownFilepaths = ["tutorials", "blogs"] as const ;
const srcPath = path.join(__dirname, "../..")

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