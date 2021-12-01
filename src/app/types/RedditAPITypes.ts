
export interface RedditAPISubRule {
    short: string,
    description: string,
    priority: number,
    violationReason: string
}

export interface RedditAPIPost {
    id: string,
    flair: RedditAPIFlair | null,
    thumbnail: string
    title: string
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