const { getDB } = require("../utils/database");
const mongodb = require('mongodb');

class Notes {
    constructor(userId, labelId, title, summary, content, isArchived) {
        this.userId = userId;
        this.lableId = labelId;
        this.data = {
            title: title,
            summary: summary,
            content: content
        };
        this.isArchived = isArchived;
    }
}

module.exports = Notes;