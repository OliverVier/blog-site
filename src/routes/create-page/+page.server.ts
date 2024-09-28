import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../tutorials/[...slug]/$types";
import { WebPage } from "$lib/server/model/WebPage";
import { serialize } from "v8";

export const load = (async () => {

    let page = new WebPage("title", "name", "content", null)
    let webPages: WebPage[] = [];
    webPages.push(page)
    
    let stringified = JSON.stringify(webPages);
    
    return {stringified}
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({request}) => {

        let formData = await request.formData()
        
        let title = (formData.get('title'))?.toString
        let name = (formData.get('title'))?.toString
        let parent = (formData.get('title'))
        let content = (formData.get('title'))?.toString

        console.log("Executed")
    }
};