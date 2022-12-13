import fs from 'fs';

const excludeFile = async (folder) => {
    const verifyFolder = fs.existsSync(folder);

    if (verifyFolder) {
        fs.unlinkSync(folder)
    }
}

export { excludeFile }