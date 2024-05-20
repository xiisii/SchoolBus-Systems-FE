import { createPlateEditor, deserializeHtml } from "@udecode/plate-common";
import plugins from "../plugins";
import _ from "lodash";

export const convertDocx2Editor = async (file: File): Promise<any[]> => {
  const container = document.createElement("div");
  container.style.display = "none";
  document.body.appendChild(container);
  const docx = await import("docx-preview");

  await docx.renderAsync(file, container, undefined, {
    inWrapper: false,
    experimental: true,
    breakPages: true,
    ignoreWidth: true,
    ignoreFonts: true,
  });
  const htmlContent = container.innerHTML;
  const htmlArticleString = htmlContent.substring(
    htmlContent.indexOf("<article>"),
    htmlContent.indexOf("</article>") + 11
  );

  const tmpEditor = createPlateEditor({ plugins });
  const blocks: any[] = deserializeHtml(tmpEditor, {
    element: htmlArticleString,
  });
  console.log("blocks", blocks);
  const cleanedBlocks = blocks.map((block) => cleanBlock(block));
  console.log("cleanedBlocks", cleanedBlocks);
  container.remove();
  return cleanedBlocks;
};

/**
 * Clean and normalize blocks:
 *  - Remove duplicate text children with same format
 *  - Convert color from rgb format to hex
 * @param block from deserialize html
 * @returns cleaned blocks
 */
export const cleanBlock = (block: any) => {
  if (!block.children) {
    return block;
  }
  const blockChildren: any[] = block.children;
  const newChildren: any[] = [];
  let currentChild: any | null = null;
  for (let i = 0; i < blockChildren.length; i++) {
    if (blockChildren[i].children || !blockChildren[i].text) {
      if (currentChild) {
        newChildren.push(currentChild);
        currentChild = null;
      }
      newChildren.push(cleanBlock(blockChildren[i]));
    } else if (
      currentChild &&
      _.isEqual(
        { ...currentChild, text: "" },
        { ...blockChildren[i], text: "" }
      )
    ) {
      currentChild.text += blockChildren[i].text || "";
    } else {
      if (currentChild) {
        newChildren.push(currentChild);
      }
      currentChild = blockChildren[i];
      currentChild.text = currentChild.text || "";
    }
  }
  if (currentChild != null) {
    newChildren.push(currentChild);
  }
  return {
    ...block,
    children: newChildren.map((child) =>
      child.color ? { ...child, color: rgbToHex(child.color) } : child
    ),
  };
};

export const cleanHtml = (content: string) => {
  let resultContent = "";
  let pos = 0;
  while (true) {
    const spanIndex = content.indexOf("<span", pos);
    if (spanIndex >= 0) {
      resultContent += content.substring(pos, spanIndex);
      const endIndex = content.indexOf(">", pos + 1);
      const spanContent = content.substring(spanIndex, endIndex + 1);
      let closeIndex = content.indexOf("</span>", endIndex + 1);
      let textContent = content.substring(endIndex + 1, closeIndex);
      while (true) {
        const nextSpanIndex = content.indexOf(spanContent, closeIndex + 1);
        if (nextSpanIndex != closeIndex + 7) {
          break;
        }
        closeIndex = content.indexOf("</span>", nextSpanIndex + 1);
        textContent += content.substring(
          nextSpanIndex + spanContent.length + 1,
          closeIndex
        );
      }
      resultContent += spanContent + textContent + "</span>";
      pos = closeIndex + 7;
    } else {
      resultContent += content.substring(pos);
      break;
    }
  }
};

function rgbToHex(rgb: string): string {
  // Extract the RGB values from the input string
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) {
    return rgb;
  }

  const red = parseInt(match[1], 10);
  const green = parseInt(match[2], 10);
  const blue = parseInt(match[3], 10);

  // Convert each RGB component to its hex representation
  const hexRed = red.toString(16).padStart(2, "0");
  const hexGreen = green.toString(16).padStart(2, "0");
  const hexBlue = blue.toString(16).padStart(2, "0");

  // Concatenate the hex values and return the result
  return `#${hexRed}${hexGreen}${hexBlue}`;
}
