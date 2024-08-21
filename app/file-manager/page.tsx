import { Template } from "@/components/share";

const FileManager = () => {
  return (
    <Template>
      <main className="file-manager">
        <div className="overlap">
          <div className="scrollbar">
            <div>
              <h4>
                <img src="/icons/quick-mode.png" alt="" />
                <span>Quick Access</span>
              </h4>

              <nav>
                <button>
                  <img src="/icons/user-folder.png" alt="" />
                  <span>My Folder</span>
                </button>
                <button>
                  <img src="/icons/favorite-folder.png" alt="" />
                  <span>Favorite</span>
                </button>
                <button>
                  <img src="/icons/documents.png" alt="" />
                  <span>Documents</span>
                </button>
                <button>
                  <img src="/icons/gallery.png" alt="" />
                  <span>Pictures</span>
                </button>
                <button>
                  <img src="/icons/music-heart.png" alt="" />
                  <span>Music</span>
                </button>
                <button>
                  <img src="/icons/video.png" alt="" />
                  <span>Videos</span>
                </button>
              </nav>
            </div>

            <div>
              <h4>
                <img src="/icons/file-explorer.png" alt="" />
                <span>File Explorer</span>
              </h4>

              <nav>
                <button>
                  <img src="/icons/gallery.png" alt="" />
                  <span>Pictures</span>
                </button>
                <button>
                  <img src="/icons/video.png" alt="" />
                  <span>Videos</span>
                </button>
              </nav>
            </div>
          </div>

          <div>
            <img src="/icons/real-media-library.svg" alt="" />
            <h2>File Explorer</h2>
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
