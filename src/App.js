import "./App.css";
import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import {
  Timestamp,
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  where,
  doc,
} from "firebase/firestore";
import { storage, db } from "./firebase";
import { v4 } from "uuid";
import excel from "./img/excel.png";
import img from "./img/img.png";
import pdf from "./img/pdf.png";
import txt from "./img/txt.png";
import word from "./img/word.png";
import unknown from "./img/unknown.png";

function App() {
  const [fileUpload, setFileUpload] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [fileInfo, setFileInfo] = useState({});

  const fileRef = ref(storage, "file/");
  const fileListRef = collection(db, "fileList");

  const uploadFile = () => {
    if (fileUpload == null) return;
    const fileRef = ref(storage, `file/${fileUpload.name + v4()}`);
    uploadBytes(fileRef, fileUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // setFileList((prev) => [...prev, url]);

        addDoc(fileListRef, {
          name: fileInfo.name,
          fileUrl: url,
          type: fileInfo.type,
          createDate: new Date(),
        })
          .then(() => {
            alert("upload successful");
          })
          .catch((err) => {
            alert("Error : " + err);
          });
      });
    });
  };

  useEffect(() => {
    // listAll(fileListRef).then((response) => {
    //   response.items.forEach((item) => {
    //     console.log(item);
    //     // getDownloadURL(item).then((url) => {
    //     //   setFileList((prev) => [...prev, url]);
    //     // });
    //   });
    // });

    // q = query(
    //   fileListRef,
    //   orderBy("createDate", "desc")
    // );

    onSnapshot(fileListRef, (snapshot) => {
      let docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFileList(docs);
    });
  }, []);

  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setFileUpload(event.target.files[0]);
          setFileInfo(event.target.files[0]);
        }}
      />
      {fileInfo && fileInfo.type}
      <button onClick={uploadFile}> Upload File</button>

      {/* //show list */}
      <div>
        {fileList.map((file) => {
          let d = new Date(file.createDate.seconds * 1000);
          let date =
            d.getDate() +
            "/" +
            `${d.getMonth() + 1}` +
            "/" +
            d.getFullYear() +
            " " +
            d.getHours() +
            ":" +
            d.getMinutes();

          let type = unknown;
          switch (file.name.split(".")[1]) {
            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
            case "tiff":
            case "raw":
              type = img;
              break;
            case "pdf":
              type = pdf;
              break;
            case "doc":
            case "docx":
              type = word;
              break;
            case "xls":
            case "xlsx":
              type = excel;
            case "txt":
              type = txt;
          }

          return (
            <div key={file.name}>
              <img src={type} alt="type" />
              <span>{file.type.indexOf("img") > 0 ? "true" : "false"}</span>
              <span>{file.name}</span>
              {/* <img src={file.fileUrl} /> */}
              <span>{date}</span>
              <span>{file.type}</span>
              <img src={file.fileUrl} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
