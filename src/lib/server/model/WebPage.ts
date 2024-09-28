export class WebPage {
	
	title: string;
	name: string;
	content: string;
	parent: WebPage | null;

	constructor(title: string, name:string, content: string, parent: WebPage | null) {
		this.title = title;
		this.name = name;
		this.content = content;
		this.parent = parent;
	}
}