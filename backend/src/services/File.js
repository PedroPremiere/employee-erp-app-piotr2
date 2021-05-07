const { v4: uuidv4 } = require('uuid');
const { promises: fs } = require('fs');
const __basedir = process.cwd();

class FileService {
    async exists(path) {
        try {
            await fs.access(path);

            return true;
        } catch {
            return false;
        }
    }

    getExtension(fileName) {
        return fileName.split('.').slice(-1).join();
    }

    getUploadPath() {
        return `${__basedir}/public/`;
    }

    async save(file) {
        const fileExtention = this.getExtension(file.name);
        const newFilename = `${uuidv4()}.${fileExtention}`;
        const uploadPath = `${this.getUploadPath()}${newFilename}`;
        await file.mv(uploadPath);

        return newFilename;
    }

    async delete(fileName) {
        const pathToDelete = this.getUploadPath() + fileName;
        const fileExists = await this.exists(pathToDelete);

        if (fileExists) {
            await fs.unlink(pathToDelete);
        }
    }
}

module.exports = FileService;
