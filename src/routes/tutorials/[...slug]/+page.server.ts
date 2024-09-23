import path from 'path';
import * as fs from 'node:fs';
import type { PageServerLoad } from './$types';
import {BASEPATH} from '$env/static/private'

export const load = (async ({params}) => {
    let content = null 
    if(params.slug) {
        if(!params.slug.endsWith(".html")) {
            params.slug += ".html";
        }
        try {
            content = fs.readFileSync(path.join(BASEPATH,"src/tutorials",params.slug)).toString()      
        } catch (error) {
            //Could not read file
        }
    }
    return {content};
}) satisfies PageServerLoad;