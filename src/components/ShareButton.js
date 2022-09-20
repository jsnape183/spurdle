import "../share.css";
import { toBlob } from "html-to-image";

const ShareButton = ({ attempts }) => {
  const generateClassName = (letter) => {
    if (letter.correctLetter && letter.correctPosition) {
      return "correct";
    }

    if (letter.correctLetter && !letter.correctPosition) {
      return "partial";
    }

    return "incorrect";
  };

  const handleShareClick = () => {
    toBlob(document.getElementById("swordleShareContent")).then(function (
      blob
    ) {
      const toShare = {
        title: `Spurdle ${attempts.length} / 6`,
        text: `Spurdle ${attempts.length} / 6`,
        files: [
          new File([blob], "swordle.png", {
            type: "image/png",
            lastModified: new Date().getTime()
          })
        ]
      };
      try {
        navigator.share(toShare);
      } catch {
        navigator.clipboard.write([
          new ClipboardItem({
            "image/png": blob
          })
        ]);
      }
    });
  };

  return (
    <>
      <button style={{ cursor: "pointer" }} onClick={handleShareClick}>
        Share
      </button>
      <div id="swordleShareContent" className="share-container">
        <p className="share-text">Spurdle {attempts.length} / 6</p>
        <div>
          {attempts.map((a, i) => (
            <div key={i} className="share-row">
              {a.letters.map((l, i) => (
                <div
                  key={i}
                  className={`share-box ${generateClassName(l)}`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShareButton;
