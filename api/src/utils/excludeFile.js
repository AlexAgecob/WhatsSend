const fs = require('fs');

const excludeFile = async (folder) => {
    const verifyFolder = fs.existsSync(folder);

    if (verifyFolder) {
        fs.unlinkSync(folder)
    }
}

module.exports = {
    excludeFile
} 