export function articleAddMainImg(mainImg) {
    return {
        type: "ARTICLE_ADD_MAIN_IMG",
        data: mainImg
    }
}

export function articleRemoveMainImg(mainImg) {
    return {
        type: "ARTICLE_REMOVE_MAIN_IMG",
        data: mainImg
    }
}

export function articleTitle(title) {
    return {
        type: "ARTICLE_TITLE",
        data: title
    }
}

export function articleCorpus(corpus) {
    return {
        type: "ARTICLE_CORPUS",
        data: corpus
    }
}

export function articleDate(date) {
    return {
        type: "ARTICLE_DATE",
        data: date
    }
}

export function articleHour(hour) {
    return {
        type: "ARTICLE_HOUR",
        data: hour
    }
}


export function articleAddTag(tag) {
    return {
        type: "ARTICLE_ADD_TAG",
        data: tag
    }
}