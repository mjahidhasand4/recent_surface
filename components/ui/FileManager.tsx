interface Props {
  className?: string;
}

export const FileManager: React.FC<Props> = (props) => {
  const { className } = props;
  const _className = className ? `file-explorer ${className}` : "file-explorer";

  return (
    <div className={_className}>
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
          <img src="/icons/pictures-folder.png" alt="" />
          <span>Insert files</span>
          <input type="file" />
        </div>
      </div>

      <div className="overlap"></div>
    </div>
  );
};
