import { Template } from "@/components/share";

const FileManager = () => {
  return (
    <Template>
      <main className="file-manager">
        <div className="overlap">
          <div>
            <div>
              <h4>Quick Access</h4>

              <nav>
                <button>
                  <span>Documents</span>
                </button>
                <button>
                  <span>Pictures</span>
                </button>
                <button>
                  <span>Videos</span>
                </button>
              </nav>
            </div>

            <div>
              <h4>File Manager</h4>

              <nav>
                <button>
                  <span>Documents</span>
                </button>
                <button>
                  <span>Pictures</span>
                </button>
                <button>
                  <span>Videos</span>
                </button>
              </nav>
            </div>
          </div>

          <div>
            <img src="/icons/real-media-library.svg" alt="" />
            <h2>File Manager</h2>
            <p>
              Quickly organize, search, and manage your files with a
              user-friendly interface.
            </p>
          </div>
        </div>

        <div className="overlap"></div>

        <div className="overlap"></div>
      </main>
    </Template>
  );
};

export default FileManager;
