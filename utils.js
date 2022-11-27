import {
  DocumentIcon,
  ImageIcon,
  MusicIcon,
  UnknownIcon,
  VideoIcon,
} from "./components/icons";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function getIconFileType(extension) {
  const imageExtension = ["png", "jpeg", "jpg", "ico"];
  const videoExtension = ["mpg", "mkv", "mp4"];
  const musicExtension = ["mp3"];
  const documentExtension = [
    "pdf",
    "doc",
    "docx",
    "ppt",
    "pptx",
    "xls",
    "xlsx",
  ];

  if (imageExtension.includes(extension)) {
    return <ImageIcon />;
  } else if (videoExtension.includes(extension)) {
    return <VideoIcon />;
  } else if (musicExtension.includes(extension)) {
    return <MusicIcon />;
  } else if (documentExtension.includes(extension)) {
    return <DocumentIcon />;
  } else {
    return <UnknownIcon />;
  }
}
