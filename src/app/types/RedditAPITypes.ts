import * as Snoowrap from "snoowrap";

export interface RedditAPISubRule {
    short: string,
    description: string,
    priority: number,
    violationReason: string
}

export interface RedditAPIPostResponse {
    listing: Snoowrap.Listing<Snoowrap.Submission>,
    posts: RedditAPIPost[]
}

export interface RedditAPIPost {
    id: string,
    flair: RedditAPIFlair | null,
    thumbnail: string
    title: string,
    url: string
}

export function getEmptyRedditAPIPost(): RedditAPIPost {
    return {
        id: "",
        flair: {
            id: "",
            text: ""
        },
        thumbnail: "",
        title: "",
        url: ""
    }
}

export interface RedditAPIFlair {
    id: string,
    text: string | null
}

export interface RedditAPIComment {
    id: string,
    author: string
}

export interface RedditAPIWikiPage {
    name: string,
    html: string
}

export interface RedditAPIUser {
    id: string,
    name: string,
    iconUrl: string,
    karma: number
}

export interface RedditAPITokenResponse {
    access_token: string
    expires_in: number
    refresh_token: string
    scope: string
    token_type: string
}