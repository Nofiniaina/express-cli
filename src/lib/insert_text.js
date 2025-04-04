import * as fsPromises from "fs/promises";

export default async function insertText(filePath, text, textBefore) {
    const fileContent = await fsPromises.readFile(filePath, "utf-8");
    const textBeforePosition = fileContent.indexOf(textBefore) + textBefore.length;
    const addedContent = fileContent.slice(0, textBeforePosition) + 
        "\n" + text + fileContent.slice(textBeforePosition);
        
    await fsPromises.writeFile(filePath, addedContent);
}