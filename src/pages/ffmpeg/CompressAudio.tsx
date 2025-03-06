import { useState, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

const baseURL = "https://cdn.jsdelivr.net/npm/@ffmpeg/core-mt@0.12.9/dist/esm";

export default function App() {
  const [message, setMessage] = useState("Click Start to Transcode");
  const [audioUrl, setAudioUrl] = useState("");
  const ffmpeg = useRef(new FFmpeg());

  async function transcode() {
    setMessage("Loading ffmpeg-core.js");
    ffmpeg.current.on("log", ({ message }) => setMessage(message));
    
    await ffmpeg.current.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
      workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, "text/javascript"),
    });
    
    setMessage("Start transcoding");
    // await ffmpeg.writeFile("test.avi", await fetchFile(videoURL));
    // await ffmpeg.exec(["-i", "test.avi", "test.mp4"]);
    setMessage("Complete transcoding");
    
    // const data = await ffmpeg.readFile("test.mp4");
    // setVideo(URL.createObjectURL(new Blob([(data as Uint8Array).buffer], { type: "video/mp4" })));
  }

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = await compressAudio(file);
      setAudioUrl(url || "");
    }
  };

  async function compressAudio(inputFile: File) {
    console.time("压缩为aac文件");
    console.log('ffmpeg', ffmpeg)
    if (!ffmpeg.current) {
      console.error("FFmpeg is not loaded yet.");
      return;
    }
    try {
      await ffmpeg.current.writeFile(inputFile.name, await fetchFile(inputFile));
      await ffmpeg.current.exec(["-i", inputFile.name, "-c:a", "aac", "-b:a", "128k", "output.aac"]);
      
      const data: any = await ffmpeg.current.readFile("output.aac");
      const audioBlob = new Blob([data.buffer], { type: "audio/aac" });
      console.timeEnd("压缩为aac文件");
      return URL.createObjectURL(audioBlob);
    } catch (err) {
      console.timeEnd("压缩为aac文件");
      console.error("压缩失败", err);
    }
  }

  return (
    <div className="p-6 text-center">
      <button onClick={transcode} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Start
      </button>
      <p className="mt-2 text-gray-700">{message}</p>
      
      <div className="mt-6">
        <h1 className="text-xl font-bold">音频文件压缩与转码为 AAC 格式</h1>
        <input type="file" onChange={onFileChange} className="mt-2 p-2 border" />
        <br />
        {audioUrl ? (
          <audio src={audioUrl} controls className="mt-4" />
        ) : (
          <p className="mt-4 text-gray-600">请上传一个音频文件，它将被压缩并转码为 AAC 格式。</p>
        )}
      </div>
    </div>
  );
}
