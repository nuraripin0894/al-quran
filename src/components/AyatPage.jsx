import { useState, useEffect, useCallback } from "react";
import duaData from "../../doa.json";
import axiosInstance from "../api/axiosInstance";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ModalContent from "./ModalContent";
import bracket from "../../public/images/bracket.png";
import basmalah from "../../public/images/bismillah.png";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { PauseSharp } from "@mui/icons-material";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AyatPage = () => {
  const [surah, setSurah] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [versesPerPage] = useState(20);
  const [selectedContent, setSelectedContent] = useState(null);
  const [contentType, setContentType] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [surahList, setSurahList] = useState([]);
  const [globalVerseNumber, setGlobalVerseNumber] = useState(0);
  const [currentPlayingVerse, setCurrentPlayingVerse] = useState(null);
  const [audioSrc, setAudioSrc] = useState("");
  const [loading, setLoading] = useState(true);

  const updateGlobalVerseNumber = useCallback(
    (currentSurah) => {
      const totalVersesBefore = surahList.reduce((acc, surah) => {
        return parseInt(surah.number, 10) < currentSurah
          ? acc + parseInt(surah.number_of_ayah, 10)
          : acc;
      }, 0);
      setGlobalVerseNumber(totalVersesBefore);
    },
    [surahList]
  );

  const fetchSurahData = useCallback(
    (surahNumber) => {
      setLoading(true); // Start loading
      axiosInstance
        .get(`/${surahNumber}`)
        .then((result) => {
          setSurah(result.data);
          updateGlobalVerseNumber(surahNumber);
          setCurrentPage(1);
          setLoading(false); // End loading
        })
        .catch((error) => {
          console.error("Failed to fetch surah data", error);
          setLoading(false); // End loading in case of error
        });
    },
    [updateGlobalVerseNumber]
  );

  useEffect(() => {
    const fetchSurahNames = async () => {
      try {
        const promises = [];
        for (let i = 1; i <= 114; i++) {
          promises.push(axiosInstance.get(`/${i}`));
        }
        const results = await Promise.all(promises);
        const surahs = results.map((result) => ({
          number: result.data.number,
          name_latin: result.data.name_latin,
          number_of_ayah: result.data.number_of_ayah,
          totalVerses: Object.keys(result.data.text).length,
        }));

        setSurahList(surahs);
      } catch (error) {
        console.error("Failed to fetch surah names", error);
      }
    };
    fetchSurahNames();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    fetchSurahData(selectedSurah);
  }, [selectedSurah, fetchSurahData]);

  const numLatinToAr = (n) =>
    n.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]).replace(/\./g, "٫");

  const { tafsir, name_latin, name, translations, text } = surah;

  const verses = Object.keys(surah.text || {});
  const indexOfLastVerse = currentPage * versesPerPage;
  const indexOfFirstVerse = indexOfLastVerse - versesPerPage;
  const currentVerses = verses.slice(indexOfFirstVerse, indexOfLastVerse);

  const totalPages = Math.ceil(verses.length / versesPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const generateDua = () => {
    const randomIndex = Math.floor(Math.random() * duaData.length);
    setSelectedContent(duaData[randomIndex]);
    setContentType("dua");
    setModalOpen(true);
  };

  const handleOpen = (verseKey) => {
    setSelectedContent({
      head: name_latin + ` ayat ke-` + verseKey,
      content: tafsir?.id.kemenag.text[verseKey],
    });
    setContentType("verse");
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedContent(null);
    setContentType(null);
  };

  const getAudioUrl = (verseNumber) => {
    const verseNumberInt = parseInt(verseNumber, 10);
    if (isNaN(verseNumberInt)) {
      console.error("Invalid verse number:", verseNumber);
      return "";
    }
    const globalNumber = globalVerseNumber + verseNumberInt;
    return `https://cdn.islamic.network/quran/audio/64/ar.alafasy/${globalNumber}.mp3`;
  };

  const handlePlayPauseAudio = (verseKey) => {
    const url = getAudioUrl(verseKey);
    if (!url) return;

    if (currentPlayingVerse === verseKey) {
      setCurrentPlayingVerse(null);
      setAudioSrc("");
    } else {
      setCurrentPlayingVerse(verseKey);
      setAudioSrc(url);
    }
  };

  return (
    <div className="flex-grow p-5 box-border">
      <div className="max-h-[h-3/4] max-w-[w-3/4] border border-gray-300 rounded-lg">
        <div className="p-4 mt-4">
          <div style={buttonContainer}>
            <button
              onClick={generateDua}
              className=" text-black hover:text-gray-600 border border-black hover:border-gray-600 hover:bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
            >
              Daily Duas
            </button>
            <FormControl variant="outlined" className="me-2 mb-2 ">
              <InputLabel id="surah-select-label">Surah</InputLabel>
              <Select
                labelId="surah-select-label"
                id="surah-select"
                value={selectedSurah}
                onChange={(e) => setSelectedSurah(e.target.value)}
                label="Surah"
                className="w-36"
                MenuProps={menuProps}
              >
                {surahList.map((surah) => (
                  <MenuItem key={surah.number} value={surah.number}>
                    {surah.name_latin}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {loading ? (
            <>
              <Skeleton height={60} width={210} />
              <Skeleton height={300} />
              <Skeleton height={40} />
              <Skeleton count={3} height={50} />
              <Skeleton height={50} />
            </>
          ) : (
            <>
              <div style={containerStyle}>
                <img
                  src={bracket}
                  alt="Left Bracket"
                  style={leftBracketStyle}
                />
                <h1 style={headingStyle} className="px-2">
                  {name || ""}
                </h1>
                <img src={bracket} alt="Right Bracket" style={imageStyle} />
              </div>
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontFamily: "uthmanScript",
                  color: "DimGrey",
                }}
                className="px-2"
              >
                {name_latin || ""}
              </h1>
              <h2 className="font-uthman text-center text-2xl mt-4">
                {" "}
                {"- " + (translations?.id?.name || "") + " -"}
              </h2>
              {![1, 9].includes(+selectedSurah) && (
                <div style={gridContainerStyle}>
                  <img src={basmalah} style={basmalahText} />
                </div>
              )}
              <div className="mt-4">
                {currentVerses.map((verseKey) => (
                  <div
                    key={verseKey}
                    className={`border-solid ${
                      parseInt(verseKey) % 2 === 0 ? "bg-gray-100" : ""
                    } border-zinc-800 border-b p-2`}
                  >
                    <p className="font-uthmanScript text-5xl p-4 text-right leading-relaxed">
                      {text[verseKey]}{" "}
                      <span style={{ color: "DarkGoldenRod" }}>
                        {numLatinToAr(verseKey)}
                      </span>
                    </p>
                    <div className="flex flex-row-reverse">
                      <div className="w-full">
                        <p className="font-serif semi-bold italic text-xl p-4 text-right text-gray-600">
                          {'"' + (translations?.id?.text[verseKey] || "") + '"'}
                        </p>
                      </div>
                      <div className="flex flex-row items-end">
                        <button
                          onClick={() => handleOpen(verseKey)}
                          className=" text-black hover:text-gray-600 border border-black hover:border-gray-600 hover:bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  max-h-14"
                        >
                          <LibraryBooksIcon />
                        </button>
                        <button
                          className=" text-black hover:text-gray-600 border border-black hover:border-gray-600 hover:bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  max-h-14"
                          onClick={() => handlePlayPauseAudio(verseKey)}
                        >
                          {currentPlayingVerse === verseKey && audioSrc ? (
                            <PauseSharp />
                          ) : (
                            <PlayArrowIcon />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <Stack spacing={2}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    shape="rounded"
                    variant="outlined"
                    onChange={handlePageChange}
                  />
                </Stack>
              </div>
            </>
          )}
        </div>
      </div>

      {audioSrc && (
        <div
          className="p-4 bg-white border-t border-gray-300"
          style={{ flexShrink: 0 }}
        >
          <AudioPlayer
            autoPlay
            src={audioSrc}
            onPlay={() => console.log("onPlay")}
            className="audio-player"
            showFilledVolume="true"
          />
        </div>
      )}
      <ModalContent
        open={modalOpen}
        onClose={handleClose}
        contentType={contentType}
        content={selectedContent}
      />
    </div>
  );
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const buttonContainer = {
  display: "flex",
  gap: "8px",
  marginLeft: "8px",
  marginBottom: "20px",
};

const menuProps = {
  PaperProps: {
    style: {
      maxHeight: 225,
      width: 144,
    },
  },
};

const imageStyle = {
  width: "96px",
  height: "64px",
};

const gridContainerStyle = {
  display: "grid",
  placeItems: "center",
};

const basmalahText = {
  width: "300px",
  height: "auto",
  marginTop: "40px",
  opacity: 0.5,
};

const leftBracketStyle = {
  ...imageStyle,
  transform: "scaleX(-1)",
};

const headingStyle = {
  fontFamily: "uthman",
  fontSize: "3.5rem",
  textAlign: "center",
};

export default AyatPage;
