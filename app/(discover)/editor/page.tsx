"use client";
import { useState } from "react";
import { Masonry, Template } from "@/components/share";

enum Toolbar {
  COMPONENTS = "Components",
  ELEMENTS = "Elements",
  DATA = "Data",
  SEO = "SEO",
}

enum Data {
  GALLERY = "Gallery",
  DATA = "Data",
}

interface Open {
  toolbar: Toolbar;
  data: Data;
}

interface State {
  open: Open;
}

const initialState: State = {
  open: {
    toolbar: Toolbar.ELEMENTS,
    data: Data.DATA,
  },
};

const Editor = () => {
  const [state, setState] = useState(initialState);

  const open = (key: keyof Open, data: Toolbar | Data) => {
    setState((prev) => ({
      ...prev,
      open: {
        ...prev.open,
        [key]: data,
      },
    }));
  };

  return (
    <Template page="editor">
      <main className="editor page">
        <div className="overlap"></div>

        <div className={`overlap ${state.open.toolbar}`}>
          <div>
            <button
              className={
                state.open.toolbar === Toolbar.COMPONENTS ? "active" : undefined
              }
              onClick={() => open("toolbar", Toolbar.COMPONENTS)}
            >
              Components
            </button>
            <button
              className={
                state.open.toolbar === Toolbar.ELEMENTS ? "active" : undefined
              }
              onClick={() => open("toolbar", Toolbar.ELEMENTS)}
            >
              Elements
            </button>
            <button
              className={
                state.open.toolbar === Toolbar.DATA ? "active" : undefined
              }
              onClick={() => open("toolbar", Toolbar.DATA)}
            >
              Data
            </button>
            <button
              className={
                state.open.toolbar === Toolbar.SEO ? "active" : undefined
              }
              onClick={() => open("toolbar", Toolbar.SEO)}
            >
              SEO
            </button>
          </div>

          {/*  */}

          {state.open.toolbar === Toolbar.COMPONENTS && (
            <div className="blink">COMPONENTS</div>
          )}
          {state.open.toolbar === Toolbar.ELEMENTS && (
            <div className="blink">ELEMENTS</div>
          )}
          {state.open.toolbar === Toolbar.DATA && (
            <>
              {state.open.data === Data.DATA && (
                <div className={Data.DATA + " scrollbar"}></div>
              )}

              {state.open.data === Data.GALLERY && <Masonry className="scrollbar" images={[""]} />}

              <div className="blink">
                <button
                  className={
                    state.open.data === Data.GALLERY ? "active" : undefined
                  }
                  onClick={() => open("data", Data.GALLERY)}
                >
                  <span>Gallery</span>
                </button>
                <button
                  className={
                    state.open.data === Data.DATA ? "active" : undefined
                  }
                  onClick={() => open("data", Data.DATA)}
                >
                  <span>Data</span>
                </button>
              </div>
            </>
          )}
          {state.open.toolbar === Toolbar.SEO && (
            <div className="blink">SEO</div>
          )}
        </div>
      </main>
    </Template>
  );
};

export default Editor;
