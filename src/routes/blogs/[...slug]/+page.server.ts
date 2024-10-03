import path from 'path';
import * as fs from 'node:fs';
import type { PageServerLoad } from './$types';
import {BASEPATH} from '$env/static/private'
import * as converter from '$lib/server/util/file-converter/MarkdownConverter'

export const load = (async ({params}) => {
    let title = null
    let content = null
    if(params.slug) {

        // does entry exist?
        // check for content.html
        // if content.html does not exist, converter content.md to content.html


        let filepath = path.join(BASEPATH,"src/blogs",params.slug)
        if(!fs.existsSync(filepath)) {
            return;
        }

        let html_filepath = path.join(BASEPATH,"src/blogs",params.slug,"content.html")
        if(!fs.existsSync(html_filepath)) {
            converter.convert(path.join(html_filepath,"..","content.md"), html_filepath)
        }

        try {
            let contentPath = path.join(BASEPATH,"src/blogs",params.slug,"content.html");
            content = fs.readFileSync(contentPath).toString()      
            title = params.slug
        } catch (error) {}
    }
    return {title,content};
}) satisfies PageServerLoad;