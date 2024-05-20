import { ChangeEventHandler, useCallback, useRef, useState } from "react";
import PlateEditor from "src/modules/Editor";
import { convertDocx2Editor } from "src/modules/Editor/utils";
import type { Page as PageType } from "src/types/page";

const Page: PageType = () => {
  const docxContainer = useRef<HTMLDivElement | null>(null);
  const [searchText, setSearchText] = useState("");
  const [plateValue, setPlateValue] = useState<any[]>([
    { type: "p", children: [{ text: "" }] },
  ]);

  const handleUpload: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (e) => {
      const file = e.target.files?.[0];

      if (file) {
        const value = await convertDocx2Editor(file);
        setPlateValue(value);
      }
    },
    []
  );

  return (
    <div>
      <div className="flex">
        <input type="file" onChange={handleUpload} />
        <input
          className="input input-sm input-bordered w-full max-w-xs"
          placeholder="search"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div>
        <div className="hidden" ref={docxContainer} />
      </div>
      <div className="card">
        <div className="card-content">
          <PlateEditor
            key={plateValue.toString()}
            initialValue={plateValue}
            searchText={searchText}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
