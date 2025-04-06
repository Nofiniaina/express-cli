import * as fsPromises from "fs/promises";

export default async function changeText(filePath, text, newText) {
    const fileContent = await fsPromises.readFile(filePath, "utf-8");
    const textPosition = fileContent.indexOf(text);

    if(textPosition === -1) {
        throw new Error(`Text "${text}" not found in file "${filePath}"`);
    }

    const updatedContent = fileContent.slice(0, textPosition) + 
        newText + fileContent.slice(textPosition + text.length);
    await fsPromises.writeFile(filePath, updatedContent);
}