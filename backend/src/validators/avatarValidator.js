const { buildCheckFunction } = require('express-validator');
const files = buildCheckFunction(['files']);
const allowedExtensions = ['png', 'jpg', 'jpeg'];
const maxSize = 100000;

function getExtension(fileName) {
    return fileName.split('.').slice(-1).join().toLowerCase();
}

function isCorrectExtension(fileExtension) {
    return allowedExtensions.includes(fileExtension.trim());
}

async function checkSize(file) {
    if (file.size > maxSize) {
        return Promise.reject(`File is too big. Maximal size is: ${maxSize}`);
    }
}

async function checkExtension(file) {
    const extension = await getExtension(file.name);

    if (!(await isCorrectExtension(extension))) {
        return Promise.reject(
            `Wrong file name.Extension should be one of : ${allowedExtensions.join(
                ' , '
            )}`
        );
    }
}

const update = [
    files('avatar')
        .optional()
        .custom(file => checkExtension(file))
        .custom(file => checkSize(file))
];

module.exports = { update };
