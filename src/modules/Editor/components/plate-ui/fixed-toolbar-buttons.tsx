import {
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import {
  focusEditor,
  setMarks,
  useEditorReadOnly,
  useEditorState,
} from "@udecode/plate-common";
import {
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
  BiBold,
  BiItalic,
  BiUnderline,
} from "react-icons/bi";

import {
  useAlignDropdownMenu,
  useAlignDropdownMenuState,
} from "@udecode/plate-alignment";
import { MarkToolbarButton } from "./mark-toolbar-button";
import { ToolbarButton } from "./toolbar";
import clsx from "clsx";
import Autocomplete from "src/components/Autocomplete";
import { useCallback, useEffect, useRef, useState } from "react";
import { BaseText } from "slate";
import { fontSizeOptions, highlightOptions } from "../../configs";
import { BsCardText } from "react-icons/bs";

const alignmentItems = [
  {
    value: "left",
    tooltip: "Align left",
    icon: BiAlignLeft,
  },
  {
    value: "center",
    tooltip: "Align center",
    icon: BiAlignMiddle,
  },
  {
    value: "right",
    tooltip: "Align right",
    icon: BiAlignRight,
  },
];

export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly();
  const state = useAlignDropdownMenuState();
  const { radioGroupProps } = useAlignDropdownMenu(state);
  const editorState = useEditorState();
  const [selectionMark, setSelectionMark] = useState<Omit<
    BaseText & { fontSize?: number },
    "text"
  > | null>(null);

  useEffect(() => {
    setSelectionMark(editorState.getMarks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorState.selection]);

  const handleChangeFontSize = useCallback(
    (value: string) => {
      setMarks(editorState, { fontSize: value, note: "abc" });
      focusEditor(editorState);
    },
    [editorState]
  );

  const handleChangeHighlight = useCallback(
    (mark: { fontSize: number; color: string }) => {
      setMarks(editorState, mark);
      focusEditor(editorState);
    },
    [editorState]
  );

  return (
    <div className="relative w-full py-2">
      <div
        className="relative flex flex-wrap items-center"
        style={{
          transform: "translateX(calc(-1px))",
        }}
      >
        {!readOnly && (
          <>
            <div className="grow" />

            <div className="flex gap-4 px-3">
              <div className="flex gap-1 items-center">
                {highlightOptions.map((highlightOption) => (
                  <div
                    key={highlightOption.color + highlightOption.fontSize}
                    className="tooltip tooltip-bottom"
                    data-tip={highlightOption.tooltip}
                  >
                    <button
                      className={clsx("btn btn-circle btn-sm border-none")}
                      style={{ backgroundColor: highlightOption.color }}
                      onClick={() => handleChangeHighlight(highlightOption)}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-1">
                <MarkToolbarButton
                  nodeType={MARK_BOLD}
                  className="border-[1px] py-3 px-4"
                >
                  <BiBold />
                </MarkToolbarButton>
                <MarkToolbarButton
                  nodeType={MARK_ITALIC}
                  className="border-[1px] py-3 px-4"
                >
                  <BiItalic />
                </MarkToolbarButton>
                <MarkToolbarButton
                  nodeType={MARK_UNDERLINE}
                  className="border-[1px] py-3 px-4"
                >
                  <BiUnderline size={0} />
                </MarkToolbarButton>
              </div>
              <div className="flex gap-1">
                {alignmentItems.map((item) => (
                  <ToolbarButton
                    className={clsx("border-[1px] py-3 px-4")}
                    pressed={item.value == state.value}
                    key={item.value}
                    onClick={() => radioGroupProps.onValueChange(item.value)}
                  >
                    {<item.icon />}
                  </ToolbarButton>
                ))}
              </div>
              <div className="flex gap-1 items-center">
                <Autocomplete
                  className="w-[120px]"
                  placeholder="Kích thước"
                  options={fontSizeOptions.map((fontSize) => ({
                    value: `${fontSize}pt`,
                    label: `${fontSize}pt`,
                  }))}
                  value={selectionMark?.fontSize || undefined}
                  onChange={handleChangeFontSize}
                ></Autocomplete>
              </div>
              <div className="flex gap-1 items-center">
                <div className="btn p-3 btn-md">
                  Thêm ghi chú
                  <BsCardText className="h-4 w-4" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
